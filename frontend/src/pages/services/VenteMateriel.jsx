import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { venteMateriel as vmApi } from '../../services/api'
import { motion, AnimatePresence } from 'framer-motion'
import PublicHero from '../../components/Public/PublicHero'
import CTASection from '../../components/Public/CTASection'
import PartnersCarousel from '../../components/Public/PartnersCarousel'
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

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — identique à la page About
   (navy/electric/turquoise/energy)
   ───────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .omedev-vm {
    --omedev-navy: #053876;
    --omedev-blue-dark: #1D5B9B;
    --omedev-blue: #0B74C1;
    --omedev-blue-light: #4681B7;
    --omedev-cyan: #72A5CE;
    --omedev-cyan-light: #A6C3D7;
    --omedev-turquoise: #2AACB2;
    --omedev-energy: #55DDB5;
    --omedev-white: #F6F6F7;
    --omedev-gray: #D5DCE1;
    --omedev-dark: #0B1213;
    --omedev-text-secondary: #25364A;
    background: #F6F6F7;
    color: #0B1213;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  .omedev-vm * { box-sizing: border-box; }

  .omedev-vm .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .omedev-vm .section-badge {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    padding: .5rem 1.1rem;
    border-radius: 999px;
    background: rgba(11,116,193,.08);
    color: #0B74C1;
    border: 1px solid rgba(11,116,193,.18);
    font-family: 'Syne', sans-serif;
  }

  .omedev-vm .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
    font-family: 'Syne', sans-serif;
    color: #053876;
  }

  .omedev-vm .section-subtitle {
    font-size: 1rem;
    color: #25364A;
    max-width: 52ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  .omedev-vm .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  .omedev-vm .btn-primary,
  .omedev-vm .btn-accent {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
    color: #fff;
    font-size: .9rem;
    font-weight: 700;
    padding: .9rem 1.7rem;
    border-radius: 12px;
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    border: none;
    font-family: 'Syne', sans-serif;
    box-shadow: 0 10px 28px rgba(11,116,193,.20);
  }

  .omedev-vm .btn-primary:hover,
  .omedev-vm .btn-accent:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  .omedev-vm .btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    background: #fff;
    color: #053876;
    font-size: .9rem;
    font-weight: 700;
    padding: .85rem 1.7rem;
    border-radius: 12px;
    border: 1px solid rgba(5,56,118,.18);
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
  }

  .omedev-vm .btn-outline:hover {
    border-color: #2AACB2;
    color: #0B74C1;
    background: rgba(85,221,181,.08);
    transform: translateY(-3px);
  }

  .omedev-vm .card-hover {
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }

  .omedev-vm .card-hover:hover {
    transform: translateY(-7px);
    box-shadow: 0 22px 48px rgba(11,116,193,.14);
    border-color: rgba(42,172,178,.35);
  }

  .omedev-vm .omedev-hero {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 35%, #4681B7 60%, #72A5CE 80%, #A6C3D7 100%);
    position: relative;
  }

  .omedev-vm .omedev-light-section { background: #F6F6F7; }
  .omedev-vm .omedev-white-section { background: #fff; }
  .omedev-vm .omedev-energy-section {
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
  }
  .omedev-vm .omedev-dark-section {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B74C1 100%);
  }

  .omedev-vm .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
  }
  .omedev-vm .animate-float { animation: float 6s ease-in-out infinite; }

  @media (max-width: 768px) {
    .omedev-vm .container { padding: 0 1rem; }
  }
`

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } } }
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }),
  hover: { y: -7, transition: { duration: 0.35 } },
}

const SectionHeader = ({ badge, title, subtitle, light }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerContainer}
    style={{ textAlign: 'center', marginBottom: '3rem' }}
  >
    {badge && (
      <motion.div variants={fadeUp}>
        <span
          className="section-badge"
          style={light ? { background: 'rgba(255,255,255,.14)', color: '#fff', borderColor: 'rgba(255,255,255,.28)' } : {}}
        >
          {badge}
        </span>
      </motion.div>
    )}
    <motion.h2 variants={fadeUp} className="section-title" style={light ? { color: '#fff' } : {}}>
      {title}
    </motion.h2>
    <motion.div variants={fadeUp} className="divider" />
    {subtitle && (
      <motion.p variants={fadeUp} className="section-subtitle" style={light ? { color: 'rgba(255,255,255,.78)' } : {}}>
        {subtitle}
      </motion.p>
    )}
  </motion.div>
)

const colors = {
  navy: '#053876',
  blue: '#0B74C1',
  blueLight: '#4681B7',
  turquoise: '#2AACB2',
  energy: '#55DDB5',
}

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
// Déclinaisons de la palette OMEDEV pour chaque catégorie
const CATEGORY_GRADIENTS = {
  Ordinateurs: 'from-[#0B74C1] to-[#2AACB2]',
  Climatisation: 'from-[#2AACB2] to-[#55DDB5]',
  Sécurité: 'from-[#053876] to-[#4681B7]',
  Réseau: 'from-[#4681B7] to-[#72A5CE]',
  Composants: 'from-[#0B74C1] to-[#4681B7]',
  Accessoires: 'from-[#2AACB2] to-[#72A5CE]',
  Serveurs: 'from-[#053876] to-[#0B74C1]',
  Autre: 'from-[#1D5B9B] to-[#72A5CE]',
}

const PAYMENT_LABELS = { card: 'Carte bancaire', mobile: 'Mobile Money', bank: 'Virement bancaire' }

const STEPS = [
  { number: 1, title: 'Produit',      icon: ShoppingCart },
  { number: 2, title: 'Quantité',     icon: Package },
  { number: 3, title: 'Livraison',    icon: MapPin },
  { number: 4, title: 'Paiement',     icon: CreditCard },
  { number: 5, title: 'Confirmation', icon: CheckCircle },
]

const GUARANTEES = [
  { icon: Shield,     title: 'Garantie constructeur', desc: '1 à 3 ans selon le produit'     },
  { icon: Truck,      title: 'Livraison rapide',       desc: '48h en ville, 5j en province'  },
  { icon: Headphones, title: 'Support technique',      desc: 'Équipe disponible 6j/7'        },
  { icon: RefreshCw,  title: 'Retours facilités',      desc: '14 jours si défaut constaté'    },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Choisissez votre matériel', desc: 'Parcourez notre catalogue et sélectionnez le produit qui correspond à vos besoins.' },
  { step: '02', title: 'Passez votre commande',      desc: 'Remplissez le formulaire en quelques minutes et choisissez votre mode de paiement.' },
  { step: '03', title: 'Réception & installation',   desc: 'Nous livrons et notre équipe peut assurer l\'installation sur site si nécessaire.' },
]

export default function VenteMateriel() {
  // Ancre vers une section de la page. Un simple href="#id" casse la
  // navigation sous HashRouter (le routeur interprète tout après "#"
  // comme un chemin de route), donc on scrolle manuellement à la place.
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Produits
  const [products, setProducts]         = useState([])
  const [loadingProducts, setLoading]   = useState(true)
  const [productError, setProductError] = useState(null)
  const [activeCategory, setCategory]   = useState('Tous')

  // Track order
  const [trackNumber, setTrackNumber]   = useState('')
  const [trackEmail, setTrackEmail]     = useState('')
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
      // Ne jamais fabriquer un faux numéro : la commande est bien créée même
      // si l'API ne renvoie pas de orderNumber, mais promettre un numéro qui
      // n'existerait pas réellement en base le rendrait impossible à suivre.
      setOrderNumber(res.data?.orderNumber || '')
      setOrderDone(true)
    } catch (err) {
      setOrderError(err.response?.data?.message || 'Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!trackNumber.trim() || !trackEmail.trim()) return
    setTracking(true); setTrackError(''); setTrackResult(null)
    try {
      const res = await vmApi.trackOrder(trackNumber.trim(), trackEmail.trim())
      setTrackResult(res.data)
    } catch {
      setTrackError('Aucune commande ne correspond à ce numéro et cet email.')
    } finally {
      setTracking(false)
    }
  }

  const StatusBadge = ({ status }) => {
    const map = {
      pending:    { label: 'En attente',     cls: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30' },
      confirmed:  { label: 'Confirmée',      cls: 'bg-blue-500/20 text-blue-700 border-blue-500/30' },
      processing: { label: 'En préparation',  cls: 'bg-indigo-500/20 text-indigo-700 border-indigo-500/30' },
      shipped:    { label: 'Expédiée',       cls: 'bg-cyan-500/20 text-cyan-700 border-cyan-500/30' },
      delivered:  { label: 'Livrée',         cls: 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30' },
      cancelled:  { label: 'Annulée',        cls: 'bg-red-500/20 text-red-700 border-red-500/30' },
    }
    const s = map[status] || { label: status, cls: 'bg-gray-500/15 text-gray-700 border-gray-500/30' }
    return <span className={`px-3 py-1 rounded-full text-xs font-bold border ${s.cls}`}>{s.label}</span>
  }

  return (
    <div className="omedev-vm">
      <style>{globalStyles}</style>

      {/* ==================== HERO ==================== */}
      <PublicHero
        badge="Vente de Matériel IT"
        title="Le matériel qu'il vous faut, au meilleur prix"
        highlight="au meilleur prix"
        subtitle="Ordinateurs, climatiseurs, caméras, serveurs, accessoires… Livraison rapide et support technique inclus."
        primaryAction={{ label: 'Voir le catalogue', onClick: () => scrollToSection('catalogue'), icon: <ShoppingBag size={18} /> }}
        secondaryAction={{ label: 'Suivre ma commande', onClick: () => scrollToSection('suivi'), icon: <Search size={18} /> }}
      />

      {/* ==================== GARANTIES ==================== */}
      <section className="omedev-white-section py-14 border-b border-[rgba(5,56,118,0.08)]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {GUARANTEES.map((g, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex items-center gap-4 p-4 bg-[#F6F6F7] rounded-xl border border-[rgba(5,56,118,0.09)]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${colors.blue}18`, color: colors.blue }}>
                  <g.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#053876] text-sm">{g.title}</p>
                  <p className="text-xs text-[#25364A]/70 mt-0.5">{g.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CATALOGUE ==================== */}
      <section id="catalogue" className="omedev-light-section py-24">
        <div className="container">
          <SectionHeader
            badge="Notre catalogue"
            title="Matériel disponible"
            subtitle="Sélectionnez un produit et commandez directement depuis la page."
          />

          {/* Filtres catégories */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] text-white shadow-lg' : 'bg-white text-[#25364A] hover:bg-[#F6F6F7] hover:text-[#053876] border border-[rgba(5,56,118,0.12)]'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* État chargement */}
          {loadingProducts && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-[#0B74C1] animate-spin" />
            </div>
          )}
          {productError && (
            <div className="text-center py-12 text-red-500">
              <AlertCircle className="w-10 h-10 mx-auto mb-3" />
              <p>{productError}</p>
            </div>
          )}

          {!loadingProducts && !productError && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product, idx) => {
                const Icon = CATEGORY_ICONS[product.category] || Package
                const grad = CATEGORY_GRADIENTS[product.category] || 'from-[#1D5B9B] to-[#72A5CE]'
                const price = product.price?.toLocaleString('fr-FR') + ' €'
                const inStock = (product.stock ?? 1) > 0
                return (
                  <motion.div key={product._id || idx} variants={cardVariants} custom={idx}
                    initial="hidden" whileInView="visible" whileHover="hover" viewport={{ once: true }}
                    className="group bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(5,56,118,0.06)] hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(11,116,193,0.14)] hover:border-[rgba(42,172,178,0.35)] transition-all duration-300">
                    <div className="relative h-48 overflow-hidden bg-[#D5DCE1]">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
                          <Icon className="w-16 h-16 text-white/40" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#0B74C1] text-white text-xs font-bold px-2.5 py-1 rounded-full">{product.category}</span>
                      </div>
                      {!inStock && (
                        <div className="absolute inset-0 bg-[#0B1213]/60 flex items-center justify-center">
                          <span className="bg-red-600/90 text-white text-sm font-bold px-4 py-2 rounded-full">Rupture de stock</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start gap-3 mb-2">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-bold text-[#053876] text-base leading-tight group-hover:text-[#0B74C1] transition-colors">{product.name}</h3>
                      </div>
                      <p className="text-[#25364A] text-sm mb-4 leading-relaxed">{product.description}</p>
                      {product.specifications && Object.keys(product.specifications).length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {Object.entries(product.specifications).slice(0, 3).map(([k, v]) => (
                            <span key={k} className="text-xs bg-[#F6F6F7] border border-[rgba(5,56,118,0.12)] text-[#25364A] px-2 py-0.5 rounded-md">{k}: {v}</span>
                          ))}
                        </div>
                      )}
                      {inStock && product.stock <= 5 && (
                        <p className="text-xs text-amber-500 mb-2">⚠ Plus que {product.stock} en stock</p>
                      )}
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-2xl font-bold text-[#0B74C1]">{price}</span>
                        <motion.button onClick={() => inStock && openForm(product)} disabled={!inStock}
                          whileHover={inStock ? { scale: 1.05 } : {}} whileTap={inStock ? { scale: 0.97 } : {}}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition shadow-md ${inStock ? 'bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white' : 'bg-[#F6F6F7] text-[#25364A]/40 cursor-not-allowed'}`}>
                          <ShoppingCart size={15} /> {inStock ? 'Commander' : 'Indisponible'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
              {filtered.length === 0 && !loadingProducts && (
                <div className="col-span-3 text-center py-16 text-[#25364A]/50">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p>Aucun produit dans cette catégorie.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ==================== FORMULAIRE DE COMMANDE ==================== */}
      {showForm && (
        <section id="order-section" className="omedev-white-section py-16 border-y border-[rgba(5,56,118,0.08)]">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#0B74C1]/10 text-[#0B74C1] border border-[#0B74C1]/20 px-3 py-1 rounded-full text-xs font-bold uppercase mb-2">
                    📝 Commande
                  </div>
                  <h2 className="text-2xl font-bold text-[#053876] font-syne">Votre commande</h2>
                </div>
                <button onClick={closeForm} className="w-9 h-9 rounded-xl bg-[#F6F6F7] hover:bg-[#E8EDF1] flex items-center justify-center text-[#25364A] hover:text-[#053876] transition border border-[rgba(5,56,118,0.12)]">
                  <X size={18} />
                </button>
              </div>

              {/* Barre de progression */}
              <div className="flex items-center mb-8">
                {STEPS.map((s, idx) => (
                  <div key={s.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <motion.div animate={step === s.number ? { scale: [1, 1.1, 1] } : {}}
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step > s.number ? 'bg-[#2AACB2] text-white' : step === s.number ? 'bg-[#0B74C1] text-white ring-4 ring-[#0B74C1]/25' : 'bg-[#F6F6F7] text-[#25364A]/50 border border-[rgba(5,56,118,0.2)]'}`}>
                        {step > s.number ? <CheckCircle className="w-4 h-4" /> : s.number}
                      </motion.div>
                      <span className="text-xs mt-1.5 text-[#25364A]/60 hidden sm:block">{s.title}</span>
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-1 transition-all ${step > s.number ? 'bg-[#2AACB2]' : 'bg-[rgba(5,56,118,0.15)]'}`} />
                    )}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                  className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl shadow-[0_10px_30px_rgba(5,56,118,0.08)] overflow-hidden">
                  <div className="p-6 md:p-8">

                    {orderDone ? (
                      <div className="text-center py-10">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
                          className="w-20 h-20 mx-auto bg-[#55DDB5]/20 rounded-full flex items-center justify-center mb-5">
                          <CheckCircle className="w-10 h-10 text-[#2AACB2]" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-[#053876] font-syne mb-2">Commande confirmée !</h3>
                        {orderNumber && (
                          <>
                            <p className="text-[#25364A]/70 mb-4">Numéro de suivi :</p>
                            <div className="text-xl font-mono font-bold text-[#0B74C1] bg-[#F6F6F7] inline-block px-6 py-2 rounded-xl mb-5">{orderNumber}</div>
                          </>
                        )}
                        <p className="text-[#25364A]/70 text-sm mb-2">Un email de confirmation a été envoyé à <strong className="text-[#053876]">{formData.email}</strong>.</p>
                        <p className="text-[#25364A]/50 text-xs mb-8">Conservez votre numéro pour suivre votre commande ci-dessous.</p>
                        <div className="flex gap-3 justify-center">
                          <button onClick={closeForm} className="px-5 py-2 bg-[#0B74C1] hover:bg-[#053876] text-white rounded-xl font-semibold text-sm transition">Nouvelle commande</button>
                          {orderNumber && (
                            <button onClick={() => { closeForm(); setTrackNumber(orderNumber); setTrackEmail(formData.email); setTimeout(() => document.getElementById('suivi')?.scrollIntoView({ behavior: 'smooth' }), 200) }}
                              className="px-5 py-2 bg-white border border-[rgba(5,56,118,0.18)] hover:border-[#2AACB2] text-[#053876] hover:bg-[#F6F6F7] rounded-xl font-semibold text-sm transition">Suivre ma commande</button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Étape 1 — Choisir produit */}
                        {step === 1 && (
                          <div>
                            <h3 className="text-lg font-bold text-[#053876] mb-4 flex items-center gap-2">
                              <ShoppingCart className="w-5 h-5 text-[#0B74C1]" /> Choisissez votre produit
                            </h3>
                            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                              {products.map(prod => {
                                const Icon = CATEGORY_ICONS[prod.category] || Package
                                const grad = CATEGORY_GRADIENTS[prod.category] || 'from-[#1D5B9B] to-[#72A5CE]'
                                return (
                                  <motion.div key={prod._id} onClick={() => setSelected(prod)} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                                    className={`cursor-pointer p-4 rounded-xl border transition-all ${selectedProduct?._id === prod._id ? 'bg-[#0B74C1]/10 border-[#0B74C1]' : 'bg-white border-[rgba(5,56,118,0.15)] hover:bg-[#F6F6F7]'}`}>
                                    <div className="flex items-center gap-4">
                                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center flex-shrink-0`}>
                                        <Icon className="w-5 h-5 text-white" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-[#053876] text-sm truncate">{prod.name}</p>
                                        <p className="text-xs text-[#25364A]/70 truncate">{prod.description}</p>
                                      </div>
                                      <div className="text-base font-bold text-[#0B74C1] flex-shrink-0">{prod.price?.toLocaleString('fr-FR')} €</div>
                                      {selectedProduct?._id === prod._id && <CheckCircle className="w-5 h-5 text-[#0B74C1] flex-shrink-0" />}
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
                            <h3 className="text-lg font-bold text-[#053876] mb-5 flex items-center gap-2">
                              <Package className="w-5 h-5 text-[#0B74C1]" /> Quantité souhaitée
                            </h3>
                            <div className="bg-[#F6F6F7] rounded-xl p-5 space-y-4">
                              <div className="flex justify-between"><span className="text-[#25364A]/70">Produit</span><span className="text-[#053876] font-medium">{selectedProduct.name}</span></div>
                              <div className="flex justify-between"><span className="text-[#25364A]/70">Prix unitaire</span><span className="text-[#0B74C1] font-bold">{selectedProduct.price?.toLocaleString('fr-FR')} €</span></div>
                              <div className="flex items-center justify-between">
                                <span className="text-[#25364A]/70">Quantité</span>
                                <div className="flex items-center gap-3">
                                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-8 h-8 rounded-full bg-white border border-[rgba(5,56,118,0.15)] text-[#053876] hover:bg-[#F6F6F7] flex items-center justify-center font-bold">−</motion.button>
                                  <input type="number" min="1" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 text-center bg-white border border-[rgba(5,56,118,0.18)] rounded-lg py-1.5 text-[#0B1213] text-sm" />
                                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => setQuantity(q => q + 1)}
                                    className="w-8 h-8 rounded-full bg-white border border-[rgba(5,56,118,0.15)] text-[#053876] hover:bg-[#F6F6F7] flex items-center justify-center font-bold">+</motion.button>
                                </div>
                              </div>
                              <div className="border-t border-[rgba(5,56,118,0.12)] pt-4 flex justify-between">
                                <span className="text-[#053876] font-bold">Total</span>
                                <span className="text-2xl font-bold text-[#0B74C1]">{totalFmt}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Étape 3 — Livraison */}
                        {step === 3 && (
                          <div>
                            <h3 className="text-lg font-bold text-[#053876] mb-5 flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-[#0B74C1]" /> Adresse de livraison
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                              {[
                                { field: 'fullName', label: 'Nom complet *', placeholder: 'Nom complet',         type: 'text' },
                                { field: 'email',    label: 'Email *',        placeholder: 'Adresse email',    type: 'email' },
                                { field: 'phone',    label: 'Téléphone *',    placeholder: '+243 8XX XXX XXX',    type: 'tel'  },
                                { field: 'address',  label: 'Adresse *',      placeholder: 'Numéro et rue',       type: 'text' },
                              ].map(({ field, label, placeholder, type }) => (
                                <div key={field}>
                                  <label className="block text-xs text-[#25364A]/70 mb-1">{label}</label>
                                  <input type={type} value={formData[field]} onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                                    placeholder={placeholder}
                                    className="w-full px-4 py-2.5 bg-white border border-[rgba(5,56,118,0.18)] rounded-xl text-[#0B1213] placeholder-[#25364A]/45 text-sm focus:outline-none focus:border-[#2AACB2] transition" />
                                </div>
                              ))}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs text-[#25364A]/70 mb-1">Ville *</label>
                                  <input value={formData.city} onChange={e => setFormData(p => ({ ...p, city: e.target.value }))}
                                    className="w-full px-4 py-2.5 bg-white border border-[rgba(5,56,118,0.18)] rounded-xl text-[#0B1213] text-sm focus:outline-none focus:border-[#2AACB2] transition" />
                                </div>
                                <div>
                                  <label className="block text-xs text-[#25364A]/70 mb-1">Code postal</label>
                                  <input value={formData.postalCode} onChange={e => setFormData(p => ({ ...p, postalCode: e.target.value }))}
                                    className="w-full px-4 py-2.5 bg-white border border-[rgba(5,56,118,0.18)] rounded-xl text-[#0B1213] text-sm focus:outline-none focus:border-[#2AACB2] transition" />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs text-[#25364A]/70 mb-1">Pays</label>
                                <input value={formData.country} onChange={e => setFormData(p => ({ ...p, country: e.target.value }))}
                                  className="w-full px-4 py-2.5 bg-white border border-[rgba(5,56,118,0.18)] rounded-xl text-[#0B1213] text-sm focus:outline-none focus:border-[#2AACB2] transition" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Étape 4 — Paiement */}
                        {step === 4 && (
                          <div>
                            <h3 className="text-lg font-bold text-[#053876] mb-5 flex items-center gap-2">
                              <CreditCard className="w-5 h-5 text-[#0B74C1]" /> Mode de paiement
                            </h3>
                            <div className="space-y-3 mb-5">
                              {Object.entries(PAYMENT_LABELS).map(([val, lbl]) => (
                                <label key={val} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === val ? 'bg-[#0B74C1]/10 border-[#0B74C1]' : 'bg-white border-[rgba(5,56,118,0.15)] hover:bg-[#F6F6F7]'}`}>
                                  <input type="radio" name="paymentMethod" value={val} checked={formData.paymentMethod === val}
                                    onChange={() => setFormData(p => ({ ...p, paymentMethod: val }))} className="accent-[#0B74C1]" />
                                  <span className="text-[#053876] font-medium">{lbl}</span>
                                </label>
                              ))}
                            </div>
                            {formData.paymentMethod === 'card' && (
                              <div className="bg-[#F6F6F7] p-4 rounded-xl space-y-3">
                                <div className="flex items-center gap-2 text-sm text-[#25364A]/70 mb-1"><Lock className="w-4 h-4 text-[#0B74C1]" /> Paiement sécurisé (simulation)</div>
                                <input type="text" placeholder="Numéro de carte" className="w-full px-4 py-2.5 bg-white border border-[rgba(5,56,118,0.18)] rounded-xl text-[#0B1213] text-sm placeholder-[#25364A]/45" />
                                <div className="grid grid-cols-2 gap-3">
                                  <input type="text" placeholder="MM/AA" className="px-4 py-2.5 bg-white border border-[rgba(5,56,118,0.18)] rounded-xl text-[#0B1213] text-sm placeholder-[#25364A]/45" />
                                  <input type="text" placeholder="CVV" className="px-4 py-2.5 bg-white border border-[rgba(5,56,118,0.18)] rounded-xl text-[#0B1213] text-sm placeholder-[#25364A]/45" />
                                </div>
                              </div>
                            )}
                            {formData.paymentMethod === 'mobile' && (
                              <div className="bg-[#F6F6F7] p-4 rounded-xl">
                                <input type="text" placeholder="N° Mobile Money (M-Pesa, Airtel…)" className="w-full px-4 py-2.5 bg-white border border-[rgba(5,56,118,0.18)] rounded-xl text-[#0B1213] text-sm placeholder-[#25364A]/45 mb-2" />
                                <p className="text-xs text-[#25364A]/50">Vous recevrez une demande sur votre téléphone.</p>
                              </div>
                            )}
                            {formData.paymentMethod === 'bank' && (
                              <div className="bg-[#F6F6F7] p-4 rounded-xl text-sm text-[#25364A]/70">
                                Les coordonnées bancaires complètes vous seront envoyées par email après confirmation.
                              </div>
                            )}
                            <div className="flex justify-between items-center mt-5 border-t border-[rgba(5,56,118,0.12)] pt-4">
                              <span className="text-[#053876] font-bold">Total à payer</span>
                              <span className="text-2xl font-bold text-[#0B74C1]">{totalFmt}</span>
                            </div>
                          </div>
                        )}

                        {/* Étape 5 — Récapitulatif */}
                        {step === 5 && selectedProduct && (
                          <div>
                            <h3 className="text-lg font-bold text-[#053876] mb-5 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-[#0B74C1]" /> Récapitulatif de commande
                            </h3>
                            <div className="bg-[#F6F6F7] rounded-xl p-5 space-y-3 text-sm">
                              {[
                                ['Produit',      selectedProduct.name],
                                ['Quantité',     quantity],
                                ['Prix unitaire', `${selectedProduct.price?.toLocaleString('fr-FR')} €`],
                                ['Total',        totalFmt],
                              ].map(([k, v]) => (
                                <div key={k} className="flex justify-between">
                                  <span className="text-[#25364A]/70">{k}</span>
                                  <span className="font-semibold text-[#053876]">{v}</span>
                                </div>
                              ))}
                              <div className="border-t border-[rgba(5,56,118,0.12)] pt-3 space-y-2">
                                <div className="flex justify-between"><span className="text-[#25364A]/70">Livraison à</span><span className="text-[#053876]">{formData.city}, {formData.country}</span></div>
                                <div className="flex justify-between"><span className="text-[#25364A]/70">Contact</span><span className="text-[#053876]">{formData.fullName}</span></div>
                                <div className="flex justify-between"><span className="text-[#25364A]/70">Email</span><span className="text-[#053876]">{formData.email}</span></div>
                                <div className="flex justify-between"><span className="text-[#25364A]/70">Paiement</span><span className="text-[#053876]">{PAYMENT_LABELS[formData.paymentMethod]}</span></div>
                              </div>
                            </div>
                            <p className="text-xs text-[#25364A]/50 mt-4 text-center">En confirmant, vous acceptez nos conditions générales de vente.</p>
                          </div>
                        )}

                        {orderError && (
                          <div className="mt-4 flex items-center gap-2 text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {orderError}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {!orderDone && (
                    <div className="px-6 md:px-8 py-4 bg-[#F6F6F7] border-t border-[rgba(5,56,118,0.1)] flex justify-between">
                      {step > 1
                        ? <button onClick={prevStep} className="flex items-center gap-1 px-4 py-2 border border-[rgba(5,56,118,0.2)] rounded-xl text-[#053876] hover:bg-white text-sm transition">
                            <ChevronLeft size={15} /> Précédent
                          </button>
                        : <div />
                      }
                      {step < 5
                        ? <button onClick={nextStep} disabled={step === 1 && !selectedProduct}
                            className={`flex items-center gap-1 px-5 py-2 rounded-xl font-semibold text-sm transition ${step === 1 && !selectedProduct ? 'bg-[#F6F6F7] text-[#25364A]/40 cursor-not-allowed' : 'bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white'}`}>
                            Suivant <ChevronRight size={15} />
                          </button>
                        : <button onClick={submitOrder} disabled={isSubmitting}
                            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white rounded-xl font-semibold text-sm transition disabled:opacity-60">
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle size={16} />}
                            {isSubmitting ? 'Envoi…' : 'Confirmer la commande'}
                          </button>
                      }
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {/* ==================== COMMENT ÇA MARCHE ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <SectionHeader
            badge="Processus"
            title="Comment ça marche ?"
            subtitle="Trois étapes simples pour recevoir votre matériel."
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {HOW_IT_WORKS.map((h, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl p-6 shadow-[0_10px_30px_rgba(5,56,118,0.06)] hover:border-[rgba(42,172,178,0.4)] hover:-translate-y-1.5 transition-all">
                <div className="text-5xl font-black text-[#0B74C1]/15 font-syne mb-3">{h.step}</div>
                <h3 className="text-lg font-bold text-[#053876] mb-2">{h.title}</h3>
                <p className="text-[#25364A]/70 text-sm leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SUIVI DE COMMANDE ==================== */}
      <section id="suivi" className="omedev-light-section py-24">
        <div className="container max-w-xl">
          <SectionHeader
            badge="Suivi"
            title="Suivre ma commande"
            subtitle="Entrez votre numéro de commande et l'email utilisé lors de l'achat pour connaître son statut en temps réel."
          />

          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <input value={trackNumber} onChange={e => setTrackNumber(e.target.value)} placeholder="Ex : CMD-2406-0001"
              className="flex-1 px-4 py-3 bg-white border border-[rgba(5,56,118,0.18)] rounded-xl text-[#0B1213] placeholder-[#25364A]/45 text-sm focus:outline-none focus:border-[#2AACB2] transition" />
            <input type="email" value={trackEmail} onChange={e => setTrackEmail(e.target.value)} placeholder="Email utilisé lors de l'achat"
              className="flex-1 px-4 py-3 bg-white border border-[rgba(5,56,118,0.18)] rounded-xl text-[#0B1213] placeholder-[#25364A]/45 text-sm focus:outline-none focus:border-[#2AACB2] transition" />
            <motion.button type="submit" disabled={tracking} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-5 py-3 bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition disabled:opacity-60">
              {tracking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search size={16} />}
              {tracking ? 'Recherche…' : 'Suivre'}
            </motion.button>
          </form>

          {trackError && (
            <div className="mt-4 flex items-center gap-2 text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4" /> {trackError}
            </div>
          )}

          {trackResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl shadow-[0_10px_30px_rgba(5,56,118,0.06)] p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-[#25364A]/50 mb-1">Numéro de commande</p>
                  <p className="font-mono font-bold text-[#0B74C1] text-lg">{trackResult.orderNumber}</p>
                </div>
                <StatusBadge status={trackResult.status} />
              </div>
              <div className="space-y-2 text-sm border-t border-[rgba(5,56,118,0.12)] pt-4">
                <div className="flex justify-between"><span className="text-[#25364A]/70">Produit</span><span className="text-[#053876]">{trackResult.productSnapshot?.name || trackResult.productName}</span></div>
                <div className="flex justify-between"><span className="text-[#25364A]/70">Quantité</span><span className="text-[#053876]">{trackResult.quantity}</span></div>
                <div className="flex justify-between"><span className="text-[#25364A]/70">Total</span><span className="text-[#053876] font-bold">{trackResult.totalPrice?.toLocaleString('fr-FR')} €</span></div>
                <div className="flex justify-between"><span className="text-[#25364A]/70">Livraison</span><span className="text-[#053876]">{trackResult.customer?.city}, {trackResult.customer?.country}</span></div>
                <div className="flex justify-between"><span className="text-[#25364A]/70">Date</span><span className="text-[#053876]">{new Date(trackResult.createdAt).toLocaleDateString('fr-FR')}</span></div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ==================== PARTENAIRES ==================== */}
      <section className="omedev-white-section py-16">
        <div className="container">
          <PartnersCarousel
            items={['HP', 'Dell', 'Lenovo', 'Cisco', 'Microsoft', 'Synology', 'Mitsubishi', 'Hikvision']}
            badge="Partenaires officiels"
            perSlide={4}
            variant="light"
            autoplayMs={2000}
          />
        </div>
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Offre personnalisée"
        title="Besoin d'un devis sur mesure ?"
        highlight="sur mesure"
        subtitle="Vous avez des besoins spécifiques en volume ou en configuration ? Notre équipe établit des offres personnalisées."
        backgroundImage="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80"
        primaryAction={{ label: 'Demander un devis', to: '/demander-devis' }}
        secondaryAction={{ label: 'Parler à un expert', to: '/contact' }}
      />
    </div>
  )
}
