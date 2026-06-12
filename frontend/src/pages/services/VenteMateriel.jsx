import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { venteMateriel as vmApi } from '../../services/api'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Computer,
  Server,
  Wifi,
  HardDrive,
  ShoppingBag,
  CheckCircle,
  ArrowRight,
  Truck,
  ShoppingCart,
  Camera,
  Wind,
  Mouse,
  ChevronRight,
  ChevronLeft,
  MapPin,
  CreditCard,
  Lock,
  Search,
  Package,
  Star,
  Shield,
  Headphones,
  Zap,
  X,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #e2e8f0; overflow-x: hidden; }
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
  @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 1; } 70% { transform: scale(1.3); opacity: 0; } 100% { transform: scale(0.8); opacity: 0; } }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
`

const CATEGORY_ICONS = {
  Ordinateurs: Computer,
  Climatisation: Wind,
  Sécurité: Camera,
  Réseau: Wifi,
  Composants: HardDrive,
  Accessoires: Mouse,
  Serveurs: Server,
  Autre: Package,
}
const CATEGORY_GRADIENTS = {
  Ordinateurs: 'from-blue-500 to-blue-600',
  Climatisation: 'from-cyan-500 to-cyan-600',
  Sécurité: 'from-indigo-500 to-indigo-600',
  Réseau: 'from-purple-500 to-purple-600',
  Composants: 'from-blue-500 to-cyan-500',
  Accessoires: 'from-emerald-500 to-emerald-600',
  Serveurs: 'from-blue-500 to-indigo-500',
  Autre: 'from-gray-500 to-gray-600',
}

const PAYMENT_LABELS = { card: 'Carte bancaire', mobile: 'Mobile Money', bank: 'Virement bancaire' }

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, hover: { y: -6, transition: { duration: 0.25 } } }

const STEPS = [
  { number: 1, title: 'Produit',      icon: ShoppingCart },
  { number: 2, title: 'Quantité',     icon: Package },
  { number: 3, title: 'Livraison',    icon: MapPin },
  { number: 4, title: 'Paiement',     icon: CreditCard },
  { number: 5, title: 'Confirmation', icon: CheckCircle },
]

const GUARANTEES = [
  { icon: Shield,     title: 'Garantie constructeur',   desc: '1 à 3 ans selon le produit'      },
  { icon: Truck,      title: 'Livraison rapide',         desc: '48h en ville, 5j en province'   },
  { icon: Headphones, title: 'Support technique',        desc: 'Équipe disponible 6j/7'          },
  { icon: RefreshCw,  title: 'Retours facilités',        desc: '14 jours si défaut constaté'     },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Choisissez votre matériel', desc: 'Parcourez notre catalogue et sélectionnez le produit qui correspond à vos besoins.' },
  { step: '02', title: 'Passez votre commande',      desc: 'Remplissez le formulaire en quelques minutes et choisissez votre mode de paiement.' },
  { step: '03', title: 'Réception & installation',   desc: 'Nous livrons et notre équipe peut assurer l\'installation sur site si nécessaire.' },
]

export default function VenteMateriel() {
  // Produits
  const [products, setProducts]         = useState([])
  const [loadingProducts, setLoading]   = useState(true)
  const [productError, setProductError] = useState(null)
  const [activeCategory, setCategory]   = useState('Tous')

  // Track order
  const [trackNumber, setTrackNumber]   = useState('')
  const [trackResult, setTrackResult]   = useState(null)
  const [tracking, setTracking]         = useState(false)
  const [trackError, setTrackError]     = useState('')

  // Order form
  const [showForm, setShowForm]         = useState(false)
  const [step, setStep]                 = useState(1)
  const [selectedProduct, setSelected]  = useState(null)
  const [quantity, setQuantity]         = useState(1)
  const [formData, setFormData]         = useState({
    fullName: '', email: '', phone: '', address: '', city: '',
    postalCode: '', country: 'RDC', paymentMethod: 'mobile',
  })
  const [isSubmitting, setSubmitting]   = useState(false)
  const [orderDone, setOrderDone]       = useState(false)
  const [orderNumber, setOrderNumber]   = useState('')
  const [orderError, setOrderError]     = useState('')

  useEffect(() => {
    vmApi.getProducts()
      .then(r => setProducts(r.data || []))
      .catch(() => setProductError('Impossible de charger le catalogue.'))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['Tous', ...Array.from(new Set(products.map(p => p.category)))]
  const filtered = activeCategory === 'Tous' ? products : products.filter(p => p.category === activeCategory)

  const total = selectedProduct ? selectedProduct.price * quantity : 0
  const totalFmt = total.toLocaleString('fr-FR') + ' €'

  const openForm = (product) => {
    setSelected(product)
    setQuantity(1)
    setStep(1)
    setOrderDone(false)
    setOrderError('')
    setFormData({ fullName: '', email: '', phone: '', address: '', city: '', postalCode: '', country: 'RDC', paymentMethod: 'mobile' })
    setShowForm(true)
    setTimeout(() => document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  const closeForm = () => { setShowForm(false); setSelected(null) }

  const nextStep = () => {
    if (step === 1 && !selectedProduct) return
    if (step === 3) {
      const { fullName, email, phone, address, city } = formData
      if (!fullName || !email || !phone || !address || !city) {
        setOrderError('Veuillez remplir tous les champs obligatoires.'); return
      }
    }
    setOrderError('')
    setStep(s => s + 1)
    setTimeout(() => document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }
  const prevStep = () => { setStep(s => s - 1); setOrderError('') }

  const submitOrder = async () => {
    setSubmitting(true)
    setOrderError('')
    try {
      const res = await vmApi.createOrder({
        productId:     selectedProduct._id,
        quantity,
        fullName:      formData.fullName,
        email:         formData.email,
        phone:         formData.phone,
        address:       formData.address,
        city:          formData.city,
        postalCode:    formData.postalCode,
        country:       formData.country,
        paymentMethod: formData.paymentMethod,
      })
      setOrderNumber(res.data?.orderNumber || res.data?.order?.orderNumber || 'CMD-' + Date.now())
      setOrderDone(true)
    } catch (err) {
      setOrderError(err.response?.data?.message || 'Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!trackNumber.trim()) return
    setTracking(true); setTrackError(''); setTrackResult(null)
    try {
      const res = await vmApi.trackOrder(trackNumber.trim())
      setTrackResult(res.data)
    } catch {
      setTrackError('Aucune commande trouvée avec ce numéro.')
    } finally {
      setTracking(false)
    }
  }

  const StatusBadge = ({ status }) => {
    const map = {
      pending:    { label: 'En attente',    cls: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
      confirmed:  { label: 'Confirmée',     cls: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      processing: { label: 'En préparation',cls: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
      shipped:    { label: 'Expédiée',      cls: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
      delivered:  { label: 'Livrée',        cls: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      cancelled:  { label: 'Annulée',       cls: 'bg-red-500/20 text-red-300 border-red-500/30' },
    }
    const s = map[status] || { label: status, cls: 'bg-white/10 text-gray-300 border-white/20' }
    return <span className={`px-3 py-1 rounded-full text-xs font-bold border ${s.cls}`}>{s.label}</span>
  }

  return (
    <>
      <style>{globalStyles}</style>

      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&fit=crop')` }} />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-ring" />
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Vente de Matériel IT</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 font-syne">
              Le matériel qu'il vous faut,{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">au meilleur prix</span>
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Ordinateurs, climatiseurs, caméras, serveurs, accessoires… Livraison rapide et support technique inclus sur chaque commande.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-3 justify-center">
              <a href="#catalogue" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-xl">
                <ShoppingBag size={16} /> Voir le catalogue
              </a>
              <a href="#suivi" className="border-2 border-white/30 hover:border-white px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition-all text-sm flex items-center gap-2">
                <Search size={16} /> Suivre ma commande
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
              {[{ val: '500+', lbl: 'Produits' }, { val: '48h', lbl: 'Livraison' }, { val: '24/7', lbl: 'Support' }].map(s => (
                <div key={s.lbl} className="text-center">
                  <div className="text-2xl font-bold text-blue-400 font-syne">{s.val}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.lbl}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── GARANTIES ─── */}
      <section className="py-14 bg-slate-900/60 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {GUARANTEES.map((g, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <g.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{g.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{g.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATALOGUE ─── */}
      <section id="catalogue" className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3">
              🛒 Notre catalogue
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-3">Matériel disponible</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-4" />
            <p className="text-gray-400 max-w-xl mx-auto">Sélectionnez un produit et commandez directement depuis la page.</p>
          </motion.div>

          {/* Filtres catégories */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'bg-blue-500 text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* État chargement */}
          {loadingProducts && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
            </div>
          )}
          {productError && (
            <div className="text-center py-12 text-red-400">
              <AlertCircle className="w-10 h-10 mx-auto mb-3" />
              <p>{productError}</p>
            </div>
          )}

          {!loadingProducts && !productError && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product, idx) => {
                const Icon = CATEGORY_ICONS[product.category] || Package
                const grad = CATEGORY_GRADIENTS[product.category] || 'from-gray-500 to-gray-600'
                const price = product.price?.toLocaleString('fr-FR') + ' €'
                const inStock = (product.stock ?? 1) > 0
                return (
                  <motion.div key={product._id || idx} variants={cardVariants} initial="hidden" whileInView="visible"
                    whileHover="hover" viewport={{ once: true }} custom={idx}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden bg-slate-800">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
                          <Icon className="w-16 h-16 text-white/40" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="bg-blue-600/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">{product.category}</span>
                      </div>
                      {!inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="bg-red-600/90 text-white text-sm font-bold px-4 py-2 rounded-full">Rupture de stock</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start gap-3 mb-2">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-bold text-white text-base leading-tight group-hover:text-blue-300 transition-colors">{product.name}</h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{product.description}</p>
                      {product.specifications && Object.keys(product.specifications).length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {Object.entries(product.specifications).slice(0, 3).map(([k, v]) => (
                            <span key={k} className="text-xs bg-white/5 border border-white/10 text-gray-400 px-2 py-0.5 rounded-md">{k}: {v}</span>
                          ))}
                        </div>
                      )}
                      {inStock && product.stock <= 5 && (
                        <p className="text-xs text-amber-400 mb-2">⚠ Plus que {product.stock} en stock</p>
                      )}
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-2xl font-bold text-blue-400">{price}</span>
                        <motion.button onClick={() => inStock && openForm(product)} disabled={!inStock}
                          whileHover={inStock ? { scale: 1.05 } : {}} whileTap={inStock ? { scale: 0.97 } : {}}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition shadow-md ${inStock ? 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white' : 'bg-white/10 text-gray-500 cursor-not-allowed'}`}>
                          <ShoppingCart size={15} /> {inStock ? 'Commander' : 'Indisponible'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
              {filtered.length === 0 && !loadingProducts && (
                <div className="col-span-3 text-center py-16 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p>Aucun produit dans cette catégorie.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─── FORMULAIRE DE COMMANDE ─── */}
      {showForm && (
        <section id="order-section" className="py-16 bg-slate-900 border-t border-white/10">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase mb-2">
                  📝 Commande
                </div>
                <h2 className="text-2xl font-bold text-white font-syne">Votre commande</h2>
              </div>
              <button onClick={closeForm} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition">
                <X size={18} />
              </button>
            </div>

            {/* Barre de progression */}
            <div className="flex items-center mb-8">
              {STEPS.map((s, idx) => (
                <div key={s.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <motion.div animate={step === s.number ? { scale: [1, 1.1, 1] } : {}}
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step > s.number ? 'bg-emerald-500 text-white' : step === s.number ? 'bg-blue-500 text-white ring-4 ring-blue-500/30' : 'bg-white/10 text-gray-500 border border-white/20'}`}>
                      {step > s.number ? <CheckCircle className="w-4 h-4" /> : s.number}
                    </motion.div>
                    <span className="text-xs mt-1.5 text-gray-400 hidden sm:block">{s.title}</span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 transition-all ${step > s.number ? 'bg-emerald-500' : 'bg-white/15'}`} />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 md:p-8">

                  {orderDone ? (
                    <div className="text-center py-10">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
                        className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-5">
                        <CheckCircle className="w-10 h-10 text-emerald-400" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white font-syne mb-2">Commande confirmée !</h3>
                      <p className="text-gray-400 mb-4">Numéro de suivi :</p>
                      <div className="text-xl font-mono font-bold text-blue-400 bg-white/10 inline-block px-6 py-2 rounded-xl mb-5">{orderNumber}</div>
                      <p className="text-gray-400 text-sm mb-2">Un email de confirmation a été envoyé à <strong className="text-white">{formData.email}</strong>.</p>
                      <p className="text-gray-500 text-xs mb-8">Conservez votre numéro pour suivre votre commande ci-dessous.</p>
                      <div className="flex gap-3 justify-center">
                        <button onClick={closeForm} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition">Nouvelle commande</button>
                        <button onClick={() => { closeForm(); setTrackNumber(orderNumber); setTimeout(() => document.getElementById('suivi')?.scrollIntoView({ behavior: 'smooth' }), 200) }}
                          className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-sm transition">Suivre ma commande</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Étape 1 — Choisir produit */}
                      {step === 1 && (
                        <div>
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5 text-blue-400" /> Choisissez votre produit
                          </h3>
                          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                            {products.map(prod => {
                              const Icon = CATEGORY_ICONS[prod.category] || Package
                              const grad = CATEGORY_GRADIENTS[prod.category] || 'from-gray-500 to-gray-600'
                              return (
                                <motion.div key={prod._id} onClick={() => setSelected(prod)} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                                  className={`cursor-pointer p-4 rounded-xl border transition-all ${selectedProduct?._id === prod._id ? 'bg-blue-500/20 border-blue-500' : 'bg-white/5 border-white/15 hover:bg-white/10'}`}>
                                  <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center flex-shrink-0`}>
                                      <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-semibold text-white text-sm truncate">{prod.name}</p>
                                      <p className="text-xs text-gray-400 truncate">{prod.description}</p>
                                    </div>
                                    <div className="text-base font-bold text-blue-400 flex-shrink-0">{prod.price?.toLocaleString('fr-FR')} €</div>
                                    {selectedProduct?._id === prod._id && <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />}
                                  </div>
                                </motion.div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {/* Étape 2 — Quantité */}
                      {step === 2 && selectedProduct && (
                        <div>
                          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                            <Package className="w-5 h-5 text-blue-400" /> Quantité souhaitée
                          </h3>
                          <div className="bg-white/5 rounded-xl p-5 space-y-4">
                            <div className="flex justify-between"><span className="text-gray-400">Produit</span><span className="text-white font-medium">{selectedProduct.name}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Prix unitaire</span><span className="text-blue-400 font-bold">{selectedProduct.price?.toLocaleString('fr-FR')} €</span></div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Quantité</span>
                              <div className="flex items-center gap-3">
                                <motion.button whileHover={{ scale: 1.1 }} onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                  className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-bold">−</motion.button>
                                <input type="number" min="1" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                  className="w-16 text-center bg-white/10 border border-white/20 rounded-lg py-1.5 text-white text-sm" />
                                <motion.button whileHover={{ scale: 1.1 }} onClick={() => setQuantity(q => q + 1)}
                                  className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-bold">+</motion.button>
                              </div>
                            </div>
                            <div className="border-t border-white/15 pt-4 flex justify-between">
                              <span className="text-white font-bold">Total</span>
                              <span className="text-2xl font-bold text-blue-400">{totalFmt}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Étape 3 — Livraison */}
                      {step === 3 && (
                        <div>
                          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-blue-400" /> Adresse de livraison
                          </h3>
                          <div className="grid grid-cols-1 gap-4">
                            {[
                              { field: 'fullName', label: 'Nom complet *',   placeholder: 'Jean Dupont',            type: 'text'  },
                              { field: 'email',    label: 'Email *',          placeholder: 'vous@exemple.com',        type: 'email' },
                              { field: 'phone',    label: 'Téléphone *',      placeholder: '+243 8XX XXX XXX',        type: 'tel'   },
                              { field: 'address',  label: 'Adresse *',        placeholder: 'Numéro et rue',          type: 'text'  },
                            ].map(({ field, label, placeholder, type }) => (
                              <div key={field}>
                                <label className="block text-xs text-gray-400 mb-1">{label}</label>
                                <input type={type} value={formData[field]} onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                                  placeholder={placeholder}
                                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition" />
                              </div>
                            ))}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs text-gray-400 mb-1">Ville *</label>
                                <input value={formData.city} onChange={e => setFormData(p => ({ ...p, city: e.target.value }))}
                                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition" />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-400 mb-1">Code postal</label>
                                <input value={formData.postalCode} onChange={e => setFormData(p => ({ ...p, postalCode: e.target.value }))}
                                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Pays</label>
                              <input value={formData.country} onChange={e => setFormData(p => ({ ...p, country: e.target.value }))}
                                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Étape 4 — Paiement */}
                      {step === 4 && (
                        <div>
                          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-blue-400" /> Mode de paiement
                          </h3>
                          <div className="space-y-3 mb-5">
                            {Object.entries(PAYMENT_LABELS).map(([val, lbl]) => (
                              <label key={val} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === val ? 'bg-blue-500/20 border-blue-500' : 'bg-white/5 border-white/15 hover:bg-white/10'}`}>
                                <input type="radio" name="paymentMethod" value={val} checked={formData.paymentMethod === val}
                                  onChange={() => setFormData(p => ({ ...p, paymentMethod: val }))} className="accent-blue-500" />
                                <span className="text-white font-medium">{lbl}</span>
                              </label>
                            ))}
                          </div>
                          {formData.paymentMethod === 'card' && (
                            <div className="bg-white/5 p-4 rounded-xl space-y-3">
                              <div className="flex items-center gap-2 text-sm text-gray-400 mb-1"><Lock className="w-4 h-4 text-blue-400" /> Paiement sécurisé (simulation)</div>
                              <input type="text" placeholder="Numéro de carte" className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm placeholder-gray-500" />
                              <div className="grid grid-cols-2 gap-3">
                                <input type="text" placeholder="MM/AA" className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm placeholder-gray-500" />
                                <input type="text" placeholder="CVV" className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm placeholder-gray-500" />
                              </div>
                            </div>
                          )}
                          {formData.paymentMethod === 'mobile' && (
                            <div className="bg-white/5 p-4 rounded-xl">
                              <input type="text" placeholder="N° Mobile Money (M-Pesa, Airtel…)" className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm placeholder-gray-500 mb-2" />
                              <p className="text-xs text-gray-500">Vous recevrez une demande sur votre téléphone.</p>
                            </div>
                          )}
                          {formData.paymentMethod === 'bank' && (
                            <div className="bg-white/5 p-4 rounded-xl text-sm text-gray-400">
                              Les coordonnées bancaires complètes vous seront envoyées par email après confirmation.
                            </div>
                          )}
                          <div className="flex justify-between items-center mt-5 border-t border-white/10 pt-4">
                            <span className="text-white font-bold">Total à payer</span>
                            <span className="text-2xl font-bold text-blue-400">{totalFmt}</span>
                          </div>
                        </div>
                      )}

                      {/* Étape 5 — Récapitulatif */}
                      {step === 5 && selectedProduct && (
                        <div>
                          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-400" /> Récapitulatif de commande
                          </h3>
                          <div className="bg-white/5 rounded-xl p-5 space-y-3 text-sm">
                            {[
                              ['Produit',      selectedProduct.name],
                              ['Quantité',     quantity],
                              ['Prix unitaire',`${selectedProduct.price?.toLocaleString('fr-FR')} €`],
                              ['Total',        totalFmt],
                            ].map(([k, v]) => (
                              <div key={k} className="flex justify-between">
                                <span className="text-gray-400">{k}</span>
                                <span className="font-semibold text-white">{v}</span>
                              </div>
                            ))}
                            <div className="border-t border-white/10 pt-3 space-y-2">
                              <div className="flex justify-between"><span className="text-gray-400">Livraison à</span><span className="text-white">{formData.city}, {formData.country}</span></div>
                              <div className="flex justify-between"><span className="text-gray-400">Contact</span><span className="text-white">{formData.fullName}</span></div>
                              <div className="flex justify-between"><span className="text-gray-400">Email</span><span className="text-white">{formData.email}</span></div>
                              <div className="flex justify-between"><span className="text-gray-400">Paiement</span><span className="text-white">{PAYMENT_LABELS[formData.paymentMethod]}</span></div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-4 text-center">En confirmant, vous acceptez nos conditions générales de vente.</p>
                        </div>
                      )}

                      {orderError && (
                        <div className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {orderError}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {!orderDone && (
                  <div className="px-6 md:px-8 py-4 bg-white/5 border-t border-white/10 flex justify-between">
                    {step > 1
                      ? <button onClick={prevStep} className="flex items-center gap-1 px-4 py-2 border border-white/20 rounded-xl text-white hover:bg-white/10 text-sm transition">
                          <ChevronLeft size={15} /> Précédent
                        </button>
                      : <div />
                    }
                    {step < 5
                      ? <button onClick={nextStep} disabled={step === 1 && !selectedProduct}
                          className={`flex items-center gap-1 px-5 py-2 rounded-xl font-semibold text-sm transition ${step === 1 && !selectedProduct ? 'bg-white/10 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white'}`}>
                          Suivant <ChevronRight size={15} />
                        </button>
                      : <button onClick={submitOrder} disabled={isSubmitting}
                          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold text-sm transition disabled:opacity-60">
                          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle size={16} />}
                          {isSubmitting ? 'Envoi…' : 'Confirmer la commande'}
                        </button>
                    }
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* ─── COMMENT ÇA MARCHE ─── */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-3">
              ⚡ Processus
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-3">Comment ça marche ?</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {HOW_IT_WORKS.map((h, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition-all">
                <div className="text-5xl font-black text-blue-500/20 font-syne mb-3">{h.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{h.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SUIVI DE COMMANDE ─── */}
      <section id="suivi" className="py-20 bg-slate-900/60 border-y border-white/5">
        <div className="container mx-auto px-4 max-w-xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-3">
              📦 Suivi
            </div>
            <h2 className="text-3xl font-bold font-syne mb-2">Suivre ma commande</h2>
            <p className="text-gray-400 text-sm">Entrez votre numéro de commande pour connaître son statut en temps réel.</p>
          </motion.div>

          <form onSubmit={handleTrack} className="flex gap-3">
            <input value={trackNumber} onChange={e => setTrackNumber(e.target.value)} placeholder="Ex : CMD-2406-0001"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition" />
            <motion.button type="submit" disabled={tracking} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold text-sm flex items-center gap-2 transition disabled:opacity-60">
              {tracking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search size={16} />}
              {tracking ? 'Recherche…' : 'Suivre'}
            </motion.button>
          </form>

          {trackError && (
            <div className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4" /> {trackError}
            </div>
          )}

          {trackResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Numéro de commande</p>
                  <p className="font-mono font-bold text-blue-400 text-lg">{trackResult.orderNumber}</p>
                </div>
                <StatusBadge status={trackResult.status} />
              </div>
              <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                <div className="flex justify-between"><span className="text-gray-400">Produit</span><span className="text-white">{trackResult.productSnapshot?.name || trackResult.productName}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Quantité</span><span className="text-white">{trackResult.quantity}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Total</span><span className="text-white font-bold">{trackResult.totalPrice?.toLocaleString('fr-FR')} €</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Livraison</span><span className="text-white">{trackResult.customer?.city}, {trackResult.customer?.country}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Date</span><span className="text-white">{new Date(trackResult.createdAt).toLocaleDateString('fr-FR')}</span></div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── PARTENAIRES ─── */}
      <section className="py-16 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">Partenaires officiels</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['HP', 'Dell', 'Lenovo', 'Cisco', 'Microsoft', 'Synology', 'Mitsubishi', 'Hikvision'].map((brand, i) => (
                <motion.span key={brand} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-semibold text-white border border-white/10 transition cursor-default">
                  {brand}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Zap className="w-12 h-12 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-3">Besoin d'un devis sur mesure ?</h2>
            <p className="text-blue-100 mb-8 max-w-lg mx-auto">Vous avez des besoins spécifiques en volume ou en configuration ? Notre équipe établit des offres personnalisées.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/demander-devis" className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition shadow-lg">
                <ArrowRight size={16} /> Demander un devis
              </Link>
              <Link to="/contact" className="border-2 border-white/60 hover:border-white text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-white/10 transition">
                <Headphones size={16} /> Parler à un expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
