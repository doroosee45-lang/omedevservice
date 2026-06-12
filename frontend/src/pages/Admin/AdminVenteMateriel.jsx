import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingBag, Package, Clock, Truck, X, Plus, Edit2, Trash2, Eye,
  Search, RefreshCw, DollarSign, Save, ToggleLeft, ToggleRight,
  AlertCircle, CheckCircle, Loader2, Image as ImageIcon, Tag,
  CreditCard, Smartphone, Building2, MapPin, Mail, Phone, User,
  LayoutGrid, List, ChevronDown,
} from 'lucide-react'
import { venteMateriel as vmApi } from '../../services/api'

// ─── Constantes ───────────────────────────────────────────────────────────────

const CATEGORIES = ['Ordinateurs', 'Climatisation', 'Sécurité', 'Réseau', 'Composants', 'Accessoires', 'Serveurs', 'Autre']

const ORDER_STATUSES = [
  { value: 'pending',    label: 'En attente',    color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { value: 'confirmed',  label: 'Confirmée',     color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { value: 'processing', label: 'En préparation',color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { value: 'shipped',    label: 'Expédiée',      color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
  { value: 'delivered',  label: 'Livrée',        color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  { value: 'cancelled',  label: 'Annulée',       color: 'bg-red-500/20 text-red-400 border-red-500/30' },
]

const PAYMENT_STATUSES = [
  { value: 'pending',  label: 'En attente', color: 'text-amber-400' },
  { value: 'paid',     label: 'Payé',       color: 'text-emerald-400' },
  { value: 'failed',   label: 'Échoué',     color: 'text-red-400' },
  { value: 'refunded', label: 'Remboursé',  color: 'text-purple-400' },
]

const PAYMENT_ICONS = { card: CreditCard, mobile: Smartphone, bank: Building2 }
const PAYMENT_LABELS = { card: 'Carte bancaire', mobile: 'Mobile Money', bank: 'Virement' }

const getStatusConfig = (v) => ORDER_STATUSES.find(s => s.value === v) || ORDER_STATUSES[0]

// ─── Petits composants ────────────────────────────────────────────────────────

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 border border-white/10 rounded-2xl p-5">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <p className="text-2xl font-bold text-white font-syne">{value}</p>
    <p className="text-gray-400 text-sm mt-0.5">{label}</p>
    {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
  </motion.div>
)

const StatusBadge = ({ status }) => {
  const c = getStatusConfig(status)
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${c.color}`}>{c.label}</span>
}

const Toast = ({ msg, type = 'success', onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t) }, [])
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border text-sm font-medium
        ${type === 'success' ? 'bg-emerald-900/90 border-emerald-500/40 text-emerald-300' : 'bg-red-900/90 border-red-500/40 text-red-300'}`}>
      {type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {msg}
    </motion.div>
  )
}

// ─── Modal Produit ────────────────────────────────────────────────────────────

const EMPTY_PRODUCT = { name: '', category: 'Ordinateurs', description: '', price: '', stock: 0, image: '', specifications: '', isActive: true }

const ProductModal = ({ product, onClose, onSave }) => {
  const isEdit = !!product?._id
  const [form, setForm] = useState({ ...EMPTY_PRODUCT, ...product })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [imgOk, setImgOk] = useState(!!product?.image)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    if (!form.name.trim())        return 'Le nom du produit est requis.'
    if (!form.description.trim()) return 'La description est requise.'
    if (!form.price || Number(form.price) <= 0) return 'Un prix valide est requis.'
    return null
  }

  const handleSave = async () => {
    const err = validate()
    if (err) { setError(err); return }
    setSaving(true); setError('')
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock) || 0,
        specifications: form.specifications.trim(),
      }
      if (isEdit) {
        await vmApi.updateProduct(product._id, payload)
      } else {
        await vmApi.createProduct(payload)
      }
      onSave(isEdit ? 'Produit mis à jour avec succès.' : 'Produit ajouté au catalogue.')
    } catch (e) {
      setError(e.response?.data?.message || 'Erreur lors de l\'enregistrement.')
    } finally {
      setSaving(false)
    }
  }

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/60 transition placeholder-gray-600'
  const labelCls = 'block text-xs font-medium text-gray-400 mb-1.5'

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-xl max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-syne">{isEdit ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
              {isEdit && <p className="text-xs text-gray-500 font-mono">{product.reference}</p>}
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corps du formulaire */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">

          {/* Nom */}
          <div>
            <label className={labelCls}>Nom du produit <span className="text-red-400">*</span></label>
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ex : Ordinateur portable Dell XPS 15"
              className={inputCls} />
          </div>

          {/* Catégorie + Prix */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Catégorie <span className="text-red-400">*</span></label>
              <select value={form.category} onChange={e => set('category', e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/60">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Prix (€) <span className="text-red-400">*</span></label>
              <input type="number" min="0" step="0.01" value={form.price} onChange={e => set('price', e.target.value)}
                placeholder="0.00" className={inputCls} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description <span className="text-red-400">*</span></label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3}
              placeholder="Description courte affichée dans le catalogue…"
              className={`${inputCls} resize-none`} />
          </div>

          {/* Stock */}
          <div>
            <label className={labelCls}>Stock disponible</label>
            <div className="flex items-center gap-3">
              <button onClick={() => set('stock', Math.max(0, (Number(form.stock) || 0) - 1))}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 flex items-center justify-center font-bold text-lg transition">−</button>
              <input type="number" min="0" value={form.stock} onChange={e => set('stock', e.target.value)}
                className="flex-1 text-center bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/60 transition" />
              <button onClick={() => set('stock', (Number(form.stock) || 0) + 1)}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 flex items-center justify-center font-bold text-lg transition">+</button>
            </div>
            <p className="text-xs text-gray-600 mt-1">Mettre 0 pour afficher "Rupture de stock"</p>
          </div>

          {/* Image */}
          <div>
            <label className={labelCls}>URL de l'image</label>
            <input value={form.image} onChange={e => { set('image', e.target.value); setImgOk(false) }}
              onBlur={() => setImgOk(!!form.image)}
              placeholder="https://exemple.com/image.jpg"
              className={inputCls} />
            {/* Prévisualisation */}
            <AnimatePresence>
              {form.image && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="mt-2 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                  <img src={form.image} alt="Prévisualisation"
                    onLoad={() => setImgOk(true)} onError={() => setImgOk(false)}
                    className="w-full h-40 object-cover" />
                  {!imgOk && (
                    <div className="flex items-center gap-2 px-3 py-2 text-xs text-red-400">
                      <AlertCircle className="w-3.5 h-3.5" /> URL invalide ou image introuvable
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Spécifications */}
          <div>
            <label className={labelCls}>Spécifications techniques</label>
            <textarea value={form.specifications} onChange={e => set('specifications', e.target.value)} rows={4}
              placeholder="RAM: 16 Go&#10;Processeur: Intel Core i7&#10;Stockage: SSD 512 Go&#10;Écran: 15.6 FHD"
              className={`${inputCls} resize-none font-mono text-xs`} />
            <p className="text-xs text-gray-600 mt-1">Une spécification par ligne · Format : <span className="font-mono text-gray-500">Clé: Valeur</span></p>
          </div>

          {/* Produit actif */}
          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
            <div>
              <p className="text-sm font-medium text-white">Produit actif (visible en boutique)</p>
              <p className="text-xs text-gray-500 mt-0.5">Désactiver cache le produit du catalogue public</p>
            </div>
            <button onClick={() => set('isActive', !form.isActive)} className="transition-transform hover:scale-110">
              {form.isActive
                ? <ToggleRight className="w-8 h-8 text-emerald-400" />
                : <ToggleLeft className="w-8 h-8 text-gray-500" />}
            </button>
          </div>

          {/* Erreur */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-white/10 flex-shrink-0">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 transition text-sm">
            Annuler
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm hover:from-blue-600 hover:to-cyan-600 transition disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Enregistrement…' : isEdit ? 'Mettre à jour' : 'Ajouter au catalogue'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Modal Détail Commande ─────────────────────────────────────────────────────

const OrderModal = ({ order, onClose, onSaved }) => {
  const [status, setStatus]           = useState(order.status)
  const [paymentStatus, setPayment]   = useState(order.paymentStatus)
  const [adminNotes, setNotes]        = useState(order.adminNotes || '')
  const [saving, setSaving]           = useState(false)
  const [error, setError]             = useState('')

  const handleSave = async () => {
    setSaving(true); setError('')
    try {
      await vmApi.updateOrderStatus(order._id, { status, paymentStatus, adminNotes })
      onSaved('Commande mise à jour.')
    } catch (e) {
      setError(e.response?.data?.message || 'Erreur lors de la mise à jour.')
    } finally {
      setSaving(false)
    }
  }

  const PayIcon = PAYMENT_ICONS[order.paymentMethod] || CreditCard

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-white font-syne font-mono">{order.orderNumber}</h2>
            <p className="text-gray-400 text-xs mt-0.5">{new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={order.status} />
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          {/* Produit + client */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Produit commandé</p>
              <p className="font-semibold text-white">{order.productSnapshot?.name || '—'}</p>
              <p className="text-blue-400 text-xs mt-0.5">{order.productSnapshot?.category}</p>
              <div className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Réf. produit</span><span className="font-mono text-gray-300 text-xs">{order.productSnapshot?.reference}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Prix unitaire</span><span className="text-white">{order.unitPrice?.toLocaleString('fr-FR')} €</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Quantité</span><span className="text-white">× {order.quantity}</span></div>
                <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                  <span className="font-bold text-white">Total</span>
                  <span className="text-emerald-400 font-bold text-base">{order.totalPrice?.toLocaleString('fr-FR')} €</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Informations client</p>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-2.5 text-gray-200"><User className="w-4 h-4 text-blue-400 flex-shrink-0" />{order.fullName}</div>
                <div className="flex items-center gap-2.5 text-gray-200"><Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />{order.email}</div>
                <div className="flex items-center gap-2.5 text-gray-200"><Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />{order.phone}</div>
                <div className="flex items-start gap-2.5 text-gray-200"><MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{order.address}<br />{order.city}{order.postalCode ? ` ${order.postalCode}` : ''}, {order.country}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-200">
                  <PayIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  {PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}
                </div>
              </div>
            </div>
          </div>

          {/* Gestion */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Gestion de la commande</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Statut commande</label>
                <select value={status} onChange={e => setStatus(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/60">
                  {ORDER_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Statut paiement</label>
                <select value={paymentStatus} onChange={e => setPayment(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/60">
                  {PAYMENT_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Notes internes (visibles seulement par l'admin)</label>
              <textarea value={adminNotes} onChange={e => setNotes(e.target.value)} rows={3}
                placeholder="Ex : Client contacté le 12/06, livraison prévue demain..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/60 resize-none" />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}
        </div>

        <div className="flex gap-3 p-5 border-t border-white/10 flex-shrink-0">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 transition text-sm">Fermer</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm hover:from-blue-600 hover:to-cyan-600 transition disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Enregistrement…' : 'Mettre à jour'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Composant principal ───────────────────────────────────────────────────────

export default function AdminVenteMateriel() {
  const [activeTab, setActiveTab]       = useState('products')
  const [stats, setStats]               = useState(null)
  const [orders, setOrders]             = useState([])
  const [products, setProducts]         = useState([])
  const [loading, setLoading]           = useState(true)

  // Produits — filtres + vue
  const [prodSearch, setProdSearch]     = useState('')
  const [prodCategory, setProdCategory] = useState('Tous')
  const [viewMode, setViewMode]         = useState('grid') // 'grid' | 'table'

  // Commandes — filtres
  const [orderSearch, setOrderSearch]   = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Modals
  const [orderModal, setOrderModal]     = useState(null)
  const [productModal, setProductModal] = useState(undefined) // undefined = fermé, null = nouveau, obj = édition

  // Toast
  const [toast, setToast]               = useState(null)

  const showToast = (msg, type = 'success') => setToast({ msg, type })

  const loadData = async () => {
    setLoading(true)
    try {
      const [sR, oR, pR] = await Promise.allSettled([
        vmApi.getStats(),
        vmApi.getAllOrders({ status: statusFilter !== 'all' ? statusFilter : undefined }),
        vmApi.getAllProducts(),
      ])
      if (sR.status === 'fulfilled') setStats(sR.value.data)
      if (oR.status === 'fulfilled') setOrders(oR.value.data || [])
      if (pR.status === 'fulfilled') setProducts(pR.value.data || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  useEffect(() => { loadData() }, [statusFilter])

  // ── Filtres locaux ────

  const filteredProducts = products.filter(p => {
    const q = prodSearch.toLowerCase()
    const matchSearch = !q || p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.reference?.toLowerCase().includes(q)
    const matchCat = prodCategory === 'Tous' || p.category === prodCategory
    return matchSearch && matchCat
  })

  const filteredOrders = orders.filter(o => {
    const q = orderSearch.toLowerCase()
    return !q || o.orderNumber?.toLowerCase().includes(q) || o.fullName?.toLowerCase().includes(q) || o.email?.toLowerCase().includes(q) || o.productSnapshot?.name?.toLowerCase().includes(q)
  })

  // ── Actions ────

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Supprimer définitivement ce produit ?')) return
    try { await vmApi.deleteProduct(id); showToast('Produit supprimé.'); loadData() }
    catch { showToast('Erreur lors de la suppression.', 'error') }
  }

  const handleToggleProduct = async (product) => {
    try {
      await vmApi.updateProduct(product._id, { isActive: !product.isActive })
      showToast(product.isActive ? 'Produit désactivé.' : 'Produit activé.')
      loadData()
    } catch { showToast('Erreur.', 'error') }
  }

  const handleDeleteOrder = async (id) => {
    if (!window.confirm('Supprimer cette commande ?')) return
    try { await vmApi.deleteOrder(id); showToast('Commande supprimée.'); loadData() }
    catch { showToast('Erreur.', 'error') }
  }

  const catCounts = CATEGORIES.reduce((acc, c) => { acc[c] = products.filter(p => p.category === c).length; return acc }, {})

  // ──────────────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-syne flex items-center gap-3">
            <ShoppingBag className="w-7 h-7 text-blue-400" /> Vente de Matériel
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Catalogue produits &amp; gestion des commandes clients</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadData} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 transition text-sm">
            <RefreshCw className="w-4 h-4" /> Actualiser
          </button>
          {activeTab === 'products' && (
            <button onClick={() => setProductModal(null)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm hover:from-blue-600 hover:to-cyan-600 transition shadow-lg">
              <Plus className="w-4 h-4" /> Ajouter un produit
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Package}     label="Produits actifs"       value={stats?.productsCount ?? products.filter(p => p.isActive).length} color="bg-blue-500/20 text-blue-400" />
        <StatCard icon={ShoppingBag} label="Total commandes"       value={stats?.total ?? orders.length}                                   color="bg-purple-500/20 text-purple-400" />
        <StatCard icon={Clock}       label="Commandes en attente"  value={stats?.pending ?? '—'} sub={`${stats?.confirmed ?? 0} confirmées`} color="bg-amber-500/20 text-amber-400" />
        <StatCard icon={DollarSign}  label="Chiffre d'affaires"    value={stats ? `${(stats.revenue || 0).toLocaleString('fr-FR')} €` : '—'} sub={`${stats?.delivered ?? 0} livrées`} color="bg-emerald-500/20 text-emerald-400" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/10 pb-1">
        {[
          { id: 'products', label: 'Catalogue produits', icon: Package,     count: products.length  },
          { id: 'orders',   label: 'Commandes',          icon: ShoppingBag, count: orders.length    },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-sm font-medium transition-all border-b-2 -mb-px ${activeTab === tab.id ? 'text-blue-400 border-blue-500 bg-blue-500/10' : 'text-gray-400 border-transparent hover:text-gray-200'}`}>
            <tab.icon className="w-4 h-4" />
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-blue-500/30 text-blue-300' : 'bg-white/10 text-gray-500'}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* ===== ONGLET PRODUITS ===== */}
      {activeTab === 'products' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">

          {/* Barre de filtres */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input value={prodSearch} onChange={e => setProdSearch(e.target.value)}
                placeholder="Rechercher par nom, référence…"
                className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500/50 placeholder-gray-600" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setViewMode('grid')} title="Vue cartes"
                className={`p-2.5 rounded-xl border text-sm transition ${viewMode === 'grid' ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' : 'border-white/10 text-gray-500 hover:text-gray-200'}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('table')} title="Vue liste"
                className={`p-2.5 rounded-xl border text-sm transition ${viewMode === 'table' ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' : 'border-white/10 text-gray-500 hover:text-gray-200'}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filtres catégorie */}
          <div className="flex flex-wrap gap-2">
            {['Tous', ...CATEGORIES].map(cat => (
              <button key={cat} onClick={() => setProdCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition ${prodCategory === cat ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'}`}>
                {cat}{cat !== 'Tous' && catCounts[cat] ? ` (${catCounts[cat]})` : ''}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-blue-400 animate-spin" /></div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Aucun produit trouvé.</p>
              <button onClick={() => setProductModal(null)} className="mt-4 text-blue-400 text-sm hover:underline">+ Ajouter le premier produit</button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Vue cartes */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map(product => (
                <motion.div key={product._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all group">
                  {/* Image */}
                  <div className="relative h-40 bg-slate-800 overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <span className="bg-blue-600/90 text-white text-xs font-bold px-2 py-0.5 rounded-full">{product.category}</span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <button onClick={() => handleToggleProduct(product)} title="Activer / désactiver"
                        className={`text-xs font-bold px-2 py-0.5 rounded-full border transition ${product.isActive ? 'bg-emerald-500/80 border-emerald-500 text-white' : 'bg-gray-600/80 border-gray-500 text-gray-300'}`}>
                        {product.isActive ? 'Actif' : 'Inactif'}
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-semibold text-white text-sm leading-tight">{product.name}</p>
                      <span className="text-emerald-400 font-bold text-sm flex-shrink-0">{product.price?.toLocaleString('fr-FR')} €</span>
                    </div>
                    <p className="text-xs text-gray-500 font-mono mb-2">{product.reference}</p>
                    <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${product.stock <= 2 ? 'text-red-400' : product.stock <= 5 ? 'text-amber-400' : 'text-gray-400'}`}>
                        Stock: {product.stock} unité{product.stock !== 1 ? 's' : ''}
                      </span>
                      <div className="flex gap-2">
                        <button onClick={() => setProductModal(product)}
                          className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition" title="Modifier">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteProduct(product._id)}
                          className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition" title="Supprimer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* Carte "Ajouter" */}
              <motion.button onClick={() => setProductModal(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="h-full min-h-60 flex flex-col items-center justify-center gap-3 bg-white/3 border-2 border-dashed border-white/15 rounded-2xl hover:border-blue-500/40 hover:bg-blue-500/5 transition-all text-gray-500 hover:text-blue-400 group">
                <div className="w-12 h-12 rounded-xl border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Ajouter un produit</span>
              </motion.button>
            </div>
          ) : (
            /* Vue tableau */
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      {['Réf.', 'Produit', 'Catégorie', 'Prix', 'Stock', 'Statut', 'Actions'].map(h => (
                        <th key={h} className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredProducts.map(product => (
                      <tr key={product._id} className="hover:bg-white/5 transition">
                        <td className="px-4 py-3 font-mono text-xs text-gray-500">{product.reference}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {product.image
                              ? <img src={product.image} alt="" className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                              : <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0"><ImageIcon className="w-4 h-4 text-gray-500" /></div>
                            }
                            <div>
                              <p className="text-white text-sm font-medium">{product.name}</p>
                              <p className="text-gray-500 text-xs truncate max-w-48">{product.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">{product.category}</span>
                        </td>
                        <td className="px-4 py-3 text-emerald-400 font-semibold text-sm">{product.price?.toLocaleString('fr-FR')} €</td>
                        <td className="px-4 py-3">
                          <span className={`text-sm font-medium ${product.stock <= 2 ? 'text-red-400' : product.stock <= 5 ? 'text-amber-400' : 'text-gray-300'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => handleToggleProduct(product)}>
                            {product.isActive
                              ? <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-medium">Actif</span>
                              : <span className="text-xs bg-gray-500/20 text-gray-400 border border-gray-500/30 px-2.5 py-1 rounded-full font-medium">Inactif</span>
                            }
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => setProductModal(product)} className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition" title="Modifier"><Edit2 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => handleDeleteProduct(product._id)} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition" title="Supprimer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* ===== ONGLET COMMANDES ===== */}
      {activeTab === 'orders' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Filtres */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input value={orderSearch} onChange={e => setOrderSearch(e.target.value)}
                placeholder="N° commande, nom client, email, produit…"
                className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500/50 placeholder-gray-600" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none min-w-40">
              <option value="all">Tous les statuts</option>
              {ORDER_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-blue-400 animate-spin" /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      {['N° Commande', 'Client', 'Produit', 'Qté', 'Total', 'Paiement', 'Statut', 'Date', 'Actions'].map(h => (
                        <th key={h} className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredOrders.length === 0 ? (
                      <tr><td colSpan={9} className="text-center text-gray-500 py-14">Aucune commande trouvée.</td></tr>
                    ) : filteredOrders.map(order => {
                      const pc = PAYMENT_STATUSES.find(s => s.value === order.paymentStatus)
                      return (
                        <tr key={order._id} className="hover:bg-white/5 transition cursor-pointer" onClick={() => setOrderModal(order)}>
                          <td className="px-4 py-3"><span className="font-mono text-blue-400 text-sm font-medium">{order.orderNumber}</span></td>
                          <td className="px-4 py-3">
                            <p className="text-white text-sm font-medium">{order.fullName}</p>
                            <p className="text-gray-500 text-xs">{order.email}</p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-gray-300 text-sm">{order.productSnapshot?.name || '—'}</p>
                            <p className="text-gray-500 text-xs">{order.productSnapshot?.category}</p>
                          </td>
                          <td className="px-4 py-3 text-gray-300 text-sm">×{order.quantity}</td>
                          <td className="px-4 py-3"><span className="text-emerald-400 font-semibold text-sm">{order.totalPrice?.toLocaleString('fr-FR')} €</span></td>
                          <td className="px-4 py-3"><span className={`text-xs font-medium ${pc?.color || 'text-gray-400'}`}>{pc?.label || '—'}</span></td>
                          <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                          <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
                          <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                            <div className="flex gap-2">
                              <button onClick={() => setOrderModal(order)} className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition" title="Voir / modifier"><Eye className="w-3.5 h-3.5" /></button>
                              <button onClick={() => handleDeleteOrder(order._id)} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition" title="Supprimer"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {orderModal && (
          <OrderModal
            order={orderModal}
            onClose={() => setOrderModal(null)}
            onSaved={(msg) => { setOrderModal(null); showToast(msg); loadData() }}
          />
        )}
        {productModal !== undefined && (
          <ProductModal
            product={productModal}
            onClose={() => setProductModal(undefined)}
            onSave={(msg) => { setProductModal(undefined); showToast(msg); loadData() }}
          />
        )}
        {toast && <Toast key={toast.msg} msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  )
}
