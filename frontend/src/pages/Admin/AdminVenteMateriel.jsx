import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingBag, Package, TrendingUp, Clock, CheckCircle, Truck,
  XCircle, Search, Filter, Plus, Edit2, Trash2, Eye, X,
  ChevronDown, AlertCircle, RefreshCw, DollarSign, Box,
  CreditCard, Smartphone, Building2, MapPin, Mail, Phone, User,
  Tag, BarChart2, Save, ToggleLeft, ToggleRight
} from 'lucide-react'
import { venteMateriel as vmApi } from '../../services/api'

const CATEGORIES = ['Ordinateurs', 'Climatisation', 'Sécurité', 'Réseau', 'Composants', 'Accessoires', 'Serveurs', 'Autre']

const ORDER_STATUSES = [
  { value: 'pending',    label: 'En attente',   color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { value: 'confirmed',  label: 'Confirmée',    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { value: 'processing', label: 'En cours',     color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { value: 'shipped',    label: 'Expédiée',     color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
  { value: 'delivered',  label: 'Livrée',       color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  { value: 'cancelled',  label: 'Annulée',      color: 'bg-red-500/20 text-red-400 border-red-500/30' },
]

const PAYMENT_STATUSES = [
  { value: 'pending',  label: 'En attente', color: 'text-amber-400' },
  { value: 'paid',     label: 'Payé',       color: 'text-emerald-400' },
  { value: 'failed',   label: 'Échoué',     color: 'text-red-400' },
  { value: 'refunded', label: 'Remboursé',  color: 'text-purple-400' },
]

const PAYMENT_METHODS = { card: 'Carte bancaire', mobile: 'Mobile money', bank: 'Virement bancaire' }

const getStatusConfig = (value) => ORDER_STATUSES.find(s => s.value === value) || ORDER_STATUSES[0]

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
  >
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <p className="text-2xl font-bold text-white font-syne">{value}</p>
    <p className="text-gray-400 text-sm mt-0.5">{label}</p>
    {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
  </motion.div>
)

// ===== MODAL PRODUIT =====
const ProductModal = ({ product, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: '', category: 'Ordinateurs', description: '', price: '', stock: '', image: '', specifications: '', isActive: true,
    ...product,
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!form.name || !form.price) return
    setSaving(true)
    try {
      if (product?._id) {
        await vmApi.updateProduct(product._id, { ...form, price: Number(form.price), stock: Number(form.stock) })
      } else {
        await vmApi.createProduct({ ...form, price: Number(form.price), stock: Number(form.stock) })
      }
      onSave()
    } catch (e) { console.error(e) }
    setSaving(false)
  }

  const field = (label, key, type = 'text', extra = {}) => (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={form[key] || ''}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 resize-none"
        />
      ) : type === 'select' ? (
        <select
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50"
        >
          {extra.options?.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type}
          value={form[key] || ''}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50"
        />
      )}
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-lg font-bold text-white font-syne">{product?._id ? 'Modifier le produit' : 'Nouveau produit'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          {field('Nom du produit *', 'name')}
          <div className="grid grid-cols-2 gap-3">
            {field('Catégorie', 'category', 'select', { options: CATEGORIES })}
            {field('Prix (€) *', 'price', 'number')}
          </div>
          {field('Description *', 'description', 'textarea')}
          <div className="grid grid-cols-2 gap-3">
            {field('Stock', 'stock', 'number')}
            {field('URL Image', 'image')}
          </div>
          {field('Spécifications', 'specifications', 'textarea')}
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
            <span className="text-sm text-gray-300">Produit actif</span>
            <button onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}>
              {form.isActive
                ? <ToggleRight className="w-7 h-7 text-emerald-400" />
                : <ToggleLeft className="w-7 h-7 text-gray-500" />}
            </button>
          </div>
        </div>
        <div className="flex gap-3 p-5 border-t border-white/10">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 transition-all text-sm">Annuler</button>
          <button
            onClick={handleSave}
            disabled={saving || !form.name || !form.price}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-sm hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ===== MODAL DÉTAIL COMMANDE =====
const OrderDetailModal = ({ order, onClose, onStatusChange }) => {
  const [status, setStatus] = useState(order.status)
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus)
  const [adminNotes, setAdminNotes] = useState(order.adminNotes || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await vmApi.updateOrderStatus(order._id, { status, paymentStatus, adminNotes })
      onStatusChange()
    } catch (e) { console.error(e) }
    setSaving(false)
  }

  const statusCfg = getStatusConfig(status)

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold text-white font-syne">{order.orderNumber}</h2>
            <p className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-5 grid md:grid-cols-2 gap-5">
          {/* Produit */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Produit commandé</h3>
            <p className="font-semibold text-white">{order.productSnapshot?.name || order.product?.name}</p>
            <p className="text-gray-400 text-sm">{order.productSnapshot?.category}</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-gray-400">Qté × Prix unitaire</span>
              <span className="text-white">{order.quantity} × {order.unitPrice?.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm font-bold">
              <span className="text-gray-300">Total</span>
              <span className="text-emerald-400 text-base">{order.totalPrice?.toLocaleString('fr-FR')} €</span>
            </div>
          </div>

          {/* Client */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Client</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-300"><User className="w-4 h-4 text-blue-400" /> {order.fullName}</div>
              <div className="flex items-center gap-2 text-gray-300"><Mail className="w-4 h-4 text-blue-400" /> {order.email}</div>
              <div className="flex items-center gap-2 text-gray-300"><Phone className="w-4 h-4 text-blue-400" /> {order.phone}</div>
              <div className="flex items-center gap-2 text-gray-300"><MapPin className="w-4 h-4 text-blue-400" /> {order.address}, {order.city}, {order.country}</div>
              <div className="flex items-center gap-2 text-gray-300">
                {order.paymentMethod === 'card' ? <CreditCard className="w-4 h-4 text-blue-400" /> :
                 order.paymentMethod === 'mobile' ? <Smartphone className="w-4 h-4 text-blue-400" /> :
                 <Building2 className="w-4 h-4 text-blue-400" />}
                {PAYMENT_METHODS[order.paymentMethod] || order.paymentMethod}
              </div>
            </div>
          </div>
        </div>

        {/* Gestion statut */}
        <div className="px-5 pb-5 space-y-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Gestion de la commande</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Statut commande</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none"
                >
                  {ORDER_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Statut paiement</label>
                <select
                  value={paymentStatus}
                  onChange={e => setPaymentStatus(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none"
                >
                  {PAYMENT_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Notes admin</label>
              <textarea
                value={adminNotes}
                onChange={e => setAdminNotes(e.target.value)}
                rows={2}
                placeholder="Remarques internes..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none resize-none"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 transition-all text-sm">Fermer</button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-sm hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Enregistrement...' : 'Mettre à jour'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ===== COMPOSANT PRINCIPAL =====
export default function AdminVenteMateriel() {
  const [activeTab, setActiveTab] = useState('orders')
  const [stats, setStats] = useState(null)
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Filtres commandes
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Modals
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showProductModal, setShowProductModal] = useState(false)

  const loadData = async () => {
    setLoading(true)
    try {
      const [statsRes, ordersRes, productsRes] = await Promise.allSettled([
        vmApi.getStats(),
        vmApi.getAllOrders({ status: statusFilter !== 'all' ? statusFilter : undefined, search: search || undefined }),
        vmApi.getAllProducts(),
      ])
      if (statsRes.status === 'fulfilled') setStats(statsRes.value.data)
      if (ordersRes.status === 'fulfilled') setOrders(ordersRes.value.data)
      if (productsRes.status === 'fulfilled') setProducts(productsRes.value.data)
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  useEffect(() => { loadData() }, [statusFilter])

  const handleSearch = (e) => {
    if (e.key === 'Enter') loadData()
  }

  const handleDeleteOrder = async (id) => {
    if (!window.confirm('Supprimer cette commande ?')) return
    try { await vmApi.deleteOrder(id); loadData() } catch (e) { console.error(e) }
  }

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return
    try { await vmApi.deleteProduct(id); loadData() } catch (e) { console.error(e) }
  }

  const handleToggleProduct = async (product) => {
    try {
      await vmApi.updateProduct(product._id, { isActive: !product.isActive })
      loadData()
    } catch (e) { console.error(e) }
  }

  const filteredOrders = orders.filter(o => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      o.orderNumber?.toLowerCase().includes(q) ||
      o.fullName?.toLowerCase().includes(q) ||
      o.email?.toLowerCase().includes(q) ||
      o.productSnapshot?.name?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-syne flex items-center gap-3">
            <ShoppingBag className="w-7 h-7 text-blue-400" />
            Vente de Matériel
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Gestion du catalogue produits et des commandes clients</p>
        </div>
        <button
          onClick={loadData}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 transition-all text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Actualiser
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={ShoppingBag} label="Total commandes" value={stats?.total ?? '—'} color="bg-blue-500/20 text-blue-400" />
        <StatCard icon={Clock} label="En attente" value={stats?.pending ?? '—'} sub={`${stats?.confirmed ?? 0} confirmées`} color="bg-amber-500/20 text-amber-400" />
        <StatCard icon={Truck} label="Expédiées / Livrées" value={`${stats?.shipped ?? 0} / ${stats?.delivered ?? 0}`} color="bg-cyan-500/20 text-cyan-400" />
        <StatCard icon={DollarSign} label="Chiffre d'affaires" value={stats ? `${(stats.revenue || 0).toLocaleString('fr-FR')} €` : '—'} sub={`${stats?.productsCount ?? 0} produits actifs`} color="bg-emerald-500/20 text-emerald-400" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'orders', label: 'Commandes', icon: ShoppingBag },
          { id: 'products', label: 'Catalogue produits', icon: Package },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-gray-400 border border-white/10 hover:border-white/20'}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===== ONGLET COMMANDES ===== */}
      {activeTab === 'orders' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Filtres */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Rechercher (N° commande, nom, email…) puis Entrée"
                className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500/50"
              />
            </div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none"
            >
              <option value="all">Tous les statuts</option>
              {ORDER_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          {/* Table */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
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
                  {loading ? (
                    <tr><td colSpan={9} className="text-center text-gray-500 py-12">Chargement...</td></tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr><td colSpan={9} className="text-center text-gray-500 py-12">Aucune commande</td></tr>
                  ) : filteredOrders.map(order => {
                    const sc = getStatusConfig(order.status)
                    const pc = PAYMENT_STATUSES.find(s => s.value === order.paymentStatus)
                    return (
                      <tr key={order._id} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-mono text-blue-400 text-sm font-medium">{order.orderNumber}</span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-white text-sm font-medium">{order.fullName}</p>
                          <p className="text-gray-500 text-xs">{order.email}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-gray-300 text-sm">{order.productSnapshot?.name || '—'}</p>
                          <p className="text-gray-500 text-xs">{order.productSnapshot?.category}</p>
                        </td>
                        <td className="px-4 py-3 text-gray-300 text-sm">{order.quantity}</td>
                        <td className="px-4 py-3">
                          <span className="text-emerald-400 font-semibold text-sm">{order.totalPrice?.toLocaleString('fr-FR')} €</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium ${pc?.color || 'text-gray-400'}`}>{pc?.label || '—'}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${sc.color}`}>{sc.label}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                              title="Voir / modifier"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteOrder(order._id)}
                              className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ===== ONGLET PRODUITS ===== */}
      {activeTab === 'products' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => { setSelectedProduct(null); setShowProductModal(true) }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-sm hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              Nouveau produit
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    {['Réf', 'Produit', 'Catégorie', 'Prix', 'Stock', 'Statut', 'Actions'].map(h => (
                      <th key={h} className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr><td colSpan={7} className="text-center text-gray-500 py-12">Chargement...</td></tr>
                  ) : products.length === 0 ? (
                    <tr><td colSpan={7} className="text-center text-gray-500 py-12">Aucun produit</td></tr>
                  ) : products.map(product => (
                    <tr key={product._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-mono text-gray-400 text-xs">{product.reference}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {product.image && (
                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          )}
                          <div>
                            <p className="text-white text-sm font-medium">{product.name}</p>
                            <p className="text-gray-500 text-xs truncate max-w-48">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-400 border border-blue-500/20">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-emerald-400 font-semibold text-sm">{product.price?.toLocaleString('fr-FR')} €</td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-medium ${product.stock <= 2 ? 'text-red-400' : product.stock <= 5 ? 'text-amber-400' : 'text-gray-300'}`}>
                          {product.stock} unités
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleToggleProduct(product)} title="Activer / désactiver">
                          {product.isActive
                            ? <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Actif</span>
                            : <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border bg-gray-500/20 text-gray-400 border-gray-500/30">Inactif</span>
                          }
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setSelectedProduct(product); setShowProductModal(true) }}
                            className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                            title="Modifier"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onStatusChange={() => { setSelectedOrder(null); loadData() }}
          />
        )}
        {showProductModal && (
          <ProductModal
            product={selectedProduct}
            onClose={() => { setShowProductModal(false); setSelectedProduct(null) }}
            onSave={() => { setShowProductModal(false); setSelectedProduct(null); loadData() }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
