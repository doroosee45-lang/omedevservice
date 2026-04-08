import { useState } from 'react'
import { Link } from 'react-router-dom'
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
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Lock,
  Headphones,
  MessageCircle,
  Rocket,
  FileText
} from 'lucide-react'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    font-family: 'DM Sans', sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    overflow-x: hidden;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    70% { transform: scale(1.3); opacity: 0; }
    100% { transform: scale(0.8); opacity: 0; }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
  .shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.68, 0, 1] } }
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1] } }
};

const floatVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] }
  },
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: [0.22, 0.68, 0, 1] }
  }
};

const VenteMateriel = () => {
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'RDC',
    paymentMethod: 'card'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const products = [
    { id: 1, name: "Ordinateur Portable Professionnel", category: "Ordinateurs", description: "PC portable 15.6\" Intel Core i7, 16 Go RAM, SSD 512 Go", price: 899, priceFormatted: "899 €", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop", icon: Computer, gradient: "from-blue-500 to-blue-600" },
    { id: 2, name: "Climatiseur Mobile 12000 BTU", category: "Climatisation", description: "Climatiseur monobloc, mode froid/chauffage", price: 449, priceFormatted: "449 €", image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=250&fit=crop", icon: Wind, gradient: "from-cyan-500 to-cyan-600" },
    { id: 3, name: "Caméra de Surveillance 4K", category: "Sécurité", description: "Caméra IP extérieure, vision nocturne, détection mouvement", price: 129, priceFormatted: "129 €", image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=400&h=250&fit=crop", icon: Camera, gradient: "from-indigo-500 to-indigo-600" },
    { id: 4, name: "Switch Gigabit 24 ports", category: "Réseau", description: "Switch administrable, 24 ports Gigabit, PoE+", price: 349, priceFormatted: "349 €", image: "https://images.unsplash.com/photo-1611095556210-4f2e6a8b4e1a?w=400&h=250&fit=crop", icon: Wifi, gradient: "from-purple-500 to-purple-600" },
    { id: 5, name: "SSD NVMe 1 To", category: "Composants", description: "Disque SSD ultra-rapide, lecture 7000 Mo/s", price: 109, priceFormatted: "109 €", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=250&fit=crop", icon: HardDrive, gradient: "from-blue-500 to-cyan-500" },
    { id: 6, name: "Souris & Clavier sans fil", category: "Accessoires", description: "Set ergonomique, connexion 2.4 GHz", price: 49, priceFormatted: "49 €", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=250&fit=crop", icon: Mouse, gradient: "from-emerald-500 to-emerald-600" },
    { id: 7, name: "Serveur Tour Dell PowerEdge", category: "Serveurs", description: "Intel Xeon, 32 Go RAM, 4 baies SAS", price: 1899, priceFormatted: "1 899 €", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=250&fit=crop", icon: Server, gradient: "from-blue-500 to-indigo-500" },
    { id: 8, name: "Kit Caméras Wi-Fi (4 caméras)", category: "Sécurité", description: "Pack 4 caméras intérieures, vision 360°", price: 199, priceFormatted: "199 €", image: "https://images.unsplash.com/photo-1580128665081-1fbf9b8a1c3d?w=400&h=250&fit=crop", icon: Camera, gradient: "from-cyan-500 to-indigo-500" },
    { id: 9, name: "Climatiseur Réversible Gainable", category: "Climatisation", description: "Puissance 18000 BTU, silence, gain énergétique", price: 2290, priceFormatted: "2 290 €", image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=250&fit=crop", icon: Wind, gradient: "from-teal-500 to-cyan-500" }
  ]

  const features = [
    { icon: Computer, title: 'Ordinateurs & périphériques', desc: 'PC, Mac, écrans, claviers, souris', gradient: 'from-blue-500 to-blue-600' },
    { icon: Server, title: 'Serveurs & stockage', desc: 'HP, Dell, Lenovo, Synology', gradient: 'from-cyan-500 to-cyan-600' },
    { icon: Wifi, title: 'Équipements réseau', desc: 'Routeurs, switches, bornes Wi-Fi', gradient: 'from-indigo-500 to-indigo-600' },
    { icon: HardDrive, title: 'Composants & upgrades', desc: 'RAM, SSD, cartes graphiques', gradient: 'from-purple-500 to-purple-600' },
    { icon: ShoppingBag, title: 'Licences logicielles', desc: 'Microsoft, Adobe, antivirus', gradient: 'from-emerald-500 to-emerald-600' },
    { icon: Truck, title: 'Livraison rapide', desc: 'Sous 48h en France métropolitaine', gradient: 'from-amber-500 to-amber-600' }
  ]

  const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0
  const totalFormatted = totalPrice.toLocaleString('fr-FR') + ' €'

  const openOrderForm = (product) => {
    setSelectedProduct(product)
    setQuantity(1)
    setStep(1)
    setShowOrderForm(true)
    setOrderComplete(false)
    setFormData({ fullName: '', email: '', phone: '', address: '', city: '', postalCode: '', country: 'RDC', paymentMethod: 'card' })
    setTimeout(() => {
      document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const closeOrderForm = () => {
    setShowOrderForm(false)
    setSelectedProduct(null)
    setStep(1)
    setOrderComplete(false)
  }

  const nextStep = () => {
    if (step === 1 && !selectedProduct) { alert('Veuillez sélectionner un produit'); return }
    if (step === 2 && quantity < 1) { alert('Quantité invalide'); return }
    setStep(step + 1)
    setTimeout(() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  const prevStep = () => {
    setStep(step - 1)
    setTimeout(() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const submitOrder = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    const newOrderNumber = 'CMD-' + Math.floor(Math.random() * 1000000)
    setOrderNumber(newOrderNumber)
    setOrderComplete(true)
    setIsSubmitting(false)
    console.log('Commande envoyée', { product: selectedProduct, quantity, ...formData, total: totalPrice, orderNumber: newOrderNumber })
  }

  const steps = [
    { number: 1, title: 'Produit', icon: ShoppingCart },
    { number: 2, title: 'Quantité', icon: Truck },
    { number: 3, title: 'Livraison', icon: MapPin },
    { number: 4, title: 'Paiement', icon: CreditCard },
    { number: 5, title: 'Confirmation', icon: CheckCircle }
  ]

  return (
    <>
      <style>{globalStyles}</style>

    {/* Hero Section - Vente de Matériel (500px) */}
<section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-24 pb-12">
  
  {/* Image d'arrière-plan avec overlay */}
  <div className="absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-slow-zoom"
      style={{
        backgroundImage: `url('https://img.freepik.com/photos-gratuite/contexte-energie-nucleaire-ia-innovation-future-technologie-rupture_53876-129783.jpg?semt=ais_hybrid&w=740&q=80')`
      }}
    />
    <div className="absolute inset-0 bg-black/65"></div>
  </div>

  <div className="absolute inset-0 opacity-20" style={{
    backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
    backgroundSize: '60px 60px'
  }} />
  
  <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#3b82f645_0%,transparent_65%)]" />
  
  <motion.div 
    className="absolute w-80 h-80 bg-blue-600/20 top-16 -left-20 rounded-full filter blur-[80px]"
    animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  />
  <motion.div 
    className="absolute w-64 h-64 bg-indigo-700/15 bottom-16 right-10 rounded-full filter blur-[80px]"
    animate={{ x: [0, -15, 0], y: [0, -15, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
  />
  <motion.div 
    className="absolute w-36 h-36 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px]"
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  />

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/30"
      >
        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-ring" />
        <span className="text-blue-300 font-semibold text-[10px] tracking-wide font-syne">Vente de Matériel</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.68, 0, 1] }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 font-syne"
      >
        Le matériel qu’il vous faut,{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
            au meilleur prix
          </span>
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 rounded-full mx-auto mb-3"
      />

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-gray-300 text-sm md:text-base mb-5 max-w-2xl mx-auto"
      >
        Ordinateurs, climatiseurs, caméras, serveurs, accessoires... Livraison rapide et support technique inclus.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Link to="/devis" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all hover:shadow-xl">
            Demander un devis <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Link to="/contact" className="group border-2 border-white/30 hover:border-white px-5 py-2 rounded-xl font-semibold text-white hover:bg-white/10 transition-all text-sm">
            Contacter un commercial <CheckCircle size={14} />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-8 flex justify-center"
      >
        <motion.div 
          className="animate-bounce"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center">
            <div className="w-1 h-1.5 bg-white/50 rounded-full mt-1.5 animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>

  <div className="absolute bottom-0 left-0 right-0 text-white/10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-8">
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
    </svg>
  </div>
</section>
      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={floatVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                custom={idx}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/10 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:via-blue-500/5 transition-all duration-700" />
                  <motion.div 
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-4`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 text-base group-hover:text-gray-300 transition-colors">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue Produits */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              🛒 Catalogue
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos meilleures ventes</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
            <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">Découvrez notre sélection de matériel informatique, climatisation et sécurité.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                variants={floatVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                custom={idx}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-blue-500/50 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute top-2 right-2 bg-blue-600/95 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    {product.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div 
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <product.icon className="w-4 h-4 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{product.name}</h3>
                  </div>
                  <p className="text-gray-400 text-base mb-3 leading-relaxed group-hover:text-gray-300 transition-colors">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-blue-400">{product.priceFormatted}</span>
                    <motion.button 
                      onClick={() => openOrderForm(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-md"
                    >
                      <ShoppingCart size={16} /> Acheter
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire d'achat */}
      {showOrderForm && (
        <section id="order-form" className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
          <div className="container mx-auto max-w-4xl px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                📝 Commande
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-syne text-white mb-2">Formulaire d'achat</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-4" />
              <p className="text-gray-300 text-lg">Commandez en quelques étapes et recevez votre matériel sous 48h.</p>
              <button onClick={closeOrderForm} className="absolute right-4 top-4 text-gray-400 hover:text-white text-2xl">✕</button>
            </motion.div>

            {/* Barre de progression */}
            <div className="flex justify-between items-center mb-8 relative">
              {steps.map((s, idx) => (
                <div key={s.number} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        step > s.number ? 'bg-emerald-500 text-white' : step === s.number ? 'bg-blue-500 text-white ring-4 ring-blue-500/30' : 'bg-white/10 text-gray-400 border border-white/20'
                      }`}
                      animate={step === s.number ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {step > s.number ? <CheckCircle className="w-5 h-5" /> : s.number}
                    </motion.div>
                    <span className="text-xs mt-2 text-gray-400 hidden sm:block">{s.title}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`absolute top-5 left-1/2 w-full h-0.5 transition-all duration-300 ${step > s.number ? 'bg-emerald-500' : 'bg-white/20'}`} style={{ right: '-50%' }} />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
                <div className="p-6 md:p-8">
                  {orderComplete ? (
                    <div className="text-center py-8">
                      <motion.div 
                        className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-10 h-10 text-emerald-400" />
                      </motion.div>
                      <h2 className="text-2xl font-bold font-syne text-white mb-2">Commande confirmée !</h2>
                      <p className="text-gray-300 mb-4">Votre commande a été enregistrée sous le numéro :</p>
                      <div className="text-2xl font-mono font-bold text-blue-400 bg-white/10 inline-block px-6 py-2 rounded-xl mb-6">{orderNumber}</div>
                      <p className="text-gray-300">Un email de confirmation vous a été envoyé à <strong>{formData.email}</strong>.</p>
                      <button onClick={closeOrderForm} className="mt-8 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition">Nouvelle commande</button>
                    </div>
                  ) : (
                    <>
                      {step === 1 && (
                        <div>
                          <h2 className="text-xl font-bold mb-4 text-white flex items-center"><ShoppingCart className="w-5 h-5 mr-2 text-blue-400" />Choisissez votre produit</h2>
                          <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
                            {products.map(prod => (
                              <motion.div 
                                key={prod.id} 
                                onClick={() => setSelectedProduct(prod)} 
                                className={`cursor-pointer p-4 rounded-xl border transition-all ${selectedProduct?.id === prod.id ? 'bg-blue-500/20 border-blue-500' : 'bg-white/5 border-white/20 hover:bg-white/10'}`}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${prod.gradient} flex items-center justify-center`}>
                                    <prod.icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-bold text-white">{prod.name}</h3>
                                    <p className="text-sm text-gray-400">{prod.description.substring(0, 60)}...</p>
                                  </div>
                                  <div className="text-lg font-bold text-blue-400">{prod.priceFormatted}</div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 2 && selectedProduct && (
                        <div>
                          <h2 className="text-xl font-bold mb-4 text-white flex items-center"><Truck className="w-5 h-5 mr-2 text-blue-400" />Quantité souhaitée</h2>
                          <div className="bg-white/5 rounded-xl p-6">
                            <div className="flex justify-between items-center mb-4"><span className="text-gray-300">Produit :</span><span className="font-semibold text-white">{selectedProduct.name}</span></div>
                            <div className="flex justify-between items-center mb-4"><span className="text-gray-300">Prix unitaire :</span><span className="font-semibold text-blue-400">{selectedProduct.priceFormatted}</span></div>
                            <div className="flex items-center justify-between gap-4 mt-4">
                              <label className="text-gray-300">Quantité :</label>
                              <div className="flex items-center gap-3">
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20">-</motion.button>
                                <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-20 text-center bg-white/10 border border-white/20 rounded-lg py-2 text-white" />
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20">+</motion.button>
                              </div>
                            </div>
                            <div className="border-t border-white/20 mt-6 pt-4 flex justify-between">
                              <span className="text-lg font-bold text-white">Total :</span>
                              <span className="text-2xl font-bold text-blue-400">{totalFormatted}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                          <h2 className="text-xl font-bold mb-4 text-white flex items-center"><MapPin className="w-5 h-5 mr-2 text-blue-400" />Adresse de livraison</h2>
                          <div className="space-y-4">
                            <div><label className="block text-sm text-gray-300 mb-1">Nom complet *</label><input value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" placeholder="Jean Dupont" /></div>
                            <div><label className="block text-sm text-gray-300 mb-1">Email *</label><input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" placeholder="contact@exemple.com" /></div>
                            <div><label className="block text-sm text-gray-300 mb-1">Téléphone *</label><input value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" placeholder="+243 XXX XXX XXX" /></div>
                            <div><label className="block text-sm text-gray-300 mb-1">Adresse *</label><input value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" placeholder="Numéro et rue" /></div>
                            <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm text-gray-300 mb-1">Ville *</label><input value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" /></div><div><label className="block text-sm text-gray-300 mb-1">Code postal *</label><input value={formData.postalCode} onChange={(e) => handleInputChange('postalCode', e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" /></div></div>
                            <div><label className="block text-sm text-gray-300 mb-1">Pays</label><input value={formData.country} onChange={(e) => handleInputChange('country', e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" /></div>
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div>
                          <h2 className="text-xl font-bold mb-4 text-white flex items-center"><CreditCard className="w-5 h-5 mr-2 text-blue-400" />Mode de paiement</h2>
                          <div className="space-y-4">
                            <div className="flex gap-4 flex-wrap">
                              {['card', 'mobile', 'bank'].map(method => (
                                <label key={method} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full cursor-pointer hover:bg-white/20 transition">
                                  <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod === method} onChange={() => handleInputChange('paymentMethod', method)} /> 
                                  {method === 'card' ? 'Carte bancaire' : method === 'mobile' ? 'Mobile Money' : 'Virement bancaire'}
                                </label>
                              ))}
                            </div>
                            {formData.paymentMethod === 'card' && (
                              <div className="bg-white/5 p-4 rounded-xl mt-4">
                                <div className="flex items-center gap-2 mb-3"><Lock className="w-4 h-4 text-blue-400" /><span className="text-sm">Paiement sécurisé</span></div>
                                <div><input type="text" placeholder="Numéro de carte" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white mb-2" /></div>
                                <div className="grid grid-cols-2 gap-2"><input type="text" placeholder="MM/AA" className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" /><input type="text" placeholder="CVV" className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" /></div>
                                <p className="text-xs text-gray-400 mt-2">Simulation de paiement - Aucune carte n'est débitée</p>
                              </div>
                            )}
                            {formData.paymentMethod === 'mobile' && (
                              <div className="bg-white/5 p-4 rounded-xl mt-4"><input type="text" placeholder="Numéro de téléphone (M-Pesa, Airtel Money)" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" /><p className="text-xs text-gray-400 mt-2">Vous recevrez une demande de paiement sur votre téléphone.</p></div>
                            )}
                            {formData.paymentMethod === 'bank' && (
                              <div className="bg-white/5 p-4 rounded-xl mt-4"><p className="text-sm">IBAN : OMDEVE******<br />Vous recevrez les coordonnées bancaires complètes par email.</p></div>
                            )}
                            <div className="border-t border-white/20 pt-4 mt-4 flex justify-between">
                              <span className="font-bold text-white">Total à payer :</span>
                              <span className="text-2xl font-bold text-blue-400">{totalFormatted}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 5 && selectedProduct && (
                        <div>
                          <h2 className="text-xl font-bold mb-4 text-white flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-blue-400" />Confirmation de commande</h2>
                          <div className="bg-white/5 rounded-xl p-5 space-y-3">
                            <div className="flex justify-between"><span className="text-gray-300">Produit :</span><span className="font-semibold text-white">{selectedProduct.name}</span></div>
                            <div className="flex justify-between"><span className="text-gray-300">Quantité :</span><span className="font-semibold text-white">{quantity}</span></div>
                            <div className="flex justify-between"><span className="text-gray-300">Prix unitaire :</span><span className="font-semibold text-white">{selectedProduct.priceFormatted}</span></div>
                            <div className="flex justify-between"><span className="text-gray-300">Total :</span><span className="text-xl font-bold text-blue-400">{totalFormatted}</span></div>
                            <div className="border-t border-white/20 my-3"></div>
                            <div><span className="text-gray-300">Livraison :</span> <span className="text-white">{formData.address}, {formData.city}</span></div>
                            <div><span className="text-gray-300">Contact :</span> <span className="text-white">{formData.fullName} - {formData.email}</span></div>
                            <div><span className="text-gray-300">Paiement :</span> <span className="text-white">{formData.paymentMethod === 'card' ? 'Carte bancaire' : formData.paymentMethod === 'mobile' ? 'Mobile Money' : 'Virement bancaire'}</span></div>
                          </div>
                          <p className="text-sm text-gray-400 mt-4 text-center">En cliquant sur "Confirmer", vous acceptez nos conditions générales de vente.</p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {!orderComplete && (
                  <div className="px-6 md:px-8 py-4 bg-white/5 border-t border-white/20 flex justify-between">
                    {step > 1 && <button onClick={prevStep} className="flex items-center px-4 py-2 border border-white/20 rounded-xl text-white hover:bg-white/10 transition"><ChevronLeft size={16} className="mr-1" /> Précédent</button>}
                    {step < 5 && <button onClick={nextStep} className="flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl font-semibold ml-auto transition">Suivant <ChevronRight size={16} className="ml-1" /></button>}
                    {step === 5 && <button onClick={submitOrder} disabled={isSubmitting} className="flex items-center px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold ml-auto transition disabled:opacity-50">{isSubmitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> : 'Confirmer'} <CheckCircle size={16} className="ml-1" /></button>}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Partenaires officiels */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              🤝 Partenaires
            </div>
            <h2 className="text-3xl font-bold font-syne text-white mb-4">Partenaires officiels</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-8" />
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['HP', 'Dell', 'Lenovo', 'Cisco', 'Microsoft', 'Synology', 'Mitsubishi', 'Hikvision'].map((brand, idx) => (
                <motion.span 
                  key={brand} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold text-white shadow-sm cursor-pointer transition-all hover:bg-white/30"
                >
                  {brand}
                </motion.span>
              ))}
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md">
                Contacter un commercial <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default VenteMateriel