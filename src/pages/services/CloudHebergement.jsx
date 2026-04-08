import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Cloud,
  Database,
  Server,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Clock,
  DollarSign,
  Users,
  Star,
  Zap,
  HardDrive,
  Activity,
  Award
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
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
`;

const CloudHebergement = () => {
  // Services cloud détaillés
  const cloudServices = [
    { icon: Database, title: 'Hébergement cloud scalable', desc: 'AWS, Azure, Google Cloud, OVH – ressources élastiques' },
    { icon: Server, title: 'Serveurs dédiés & VPS', desc: 'Performances garanties, bare metal ou virtualisation' },
    { icon: Shield, title: 'Sécurité & sauvegarde', desc: 'Backups automatiques, chiffrement, conformité RGPD' },
    { icon: Clock, title: 'Disponibilité 99.9%', desc: 'SLA strict, monitoring 24/7 et redondance' },
    { icon: DollarSign, title: 'Paiement à l’usage', desc: 'Optimisez vos coûts, pas de surprises' },
    { icon: TrendingUp, title: 'Migration assistée', desc: 'Transition en douceur vers le cloud' }
  ]

  // Avantages spécifiques
  const benefits = [
    'Infrastructure certifiée ISO 27001',
    'Support technique 24/7 par des experts cloud',
    'Architecture multi-régions pour une haute disponibilité',
    'Migration sans interruption de service',
    'Facturation transparente et devis personnalisé'
  ]

  // Statistiques
  const stats = [
    { value: '99.99%', label: 'Disponibilité garantie', icon: Activity },
    { value: '50+', label: 'Projets migrés', icon: Cloud },
    { value: '24/7', label: 'Support technique', icon: Clock },
    { value: '100%', label: 'Satisfaction client', icon: Star }
  ]

  // Témoignages
  const testimonials = [
    {
      name: 'Nicolas R.',
      role: 'CTO, FinTech',
      quote: 'La migration de notre infrastructure legacy vers AWS a été fluide et sans downtime. OMDEVE a fait preuve d’un professionnalisme exceptionnel.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      name: 'Claire M.',
      role: 'Directrice Technique, E-commerce',
      quote: 'Leur solution d’hébergement cloud nous permet de scaler pendant les pics de trafic sans souci. Je recommande vivement.',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    }
  ]

  // Images pour galerie
  const galleryImages = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop'
  ]

  // Offres packagées
  const packs = [
    { name: 'Pack Start', price: '49€/mois', features: ['1 vCPU', '2 Go RAM', '20 Go SSD', '1 To trafic'] },
    { name: 'Pack Business', price: '129€/mois', features: ['4 vCPU', '8 Go RAM', '100 Go SSD', '5 To trafic', 'Backup quotidien'] },
    { name: 'Pack Enterprise', price: 'Sur devis', features: ['Dédié', 'Stockage illimité', 'SLA 99.99%', 'Support prioritaire', 'Architecture multi-AZ'] }
  ]

  return (
    <>
      <style>{globalStyles}</style>

     {/* Hero Section */}
{/* Hero Section - Cloud & Hébergement (450px) */}



{/* Hero Section - Cloud & Hébergement (500px) */}
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

  {/* Grille de fond */}
  <div className="absolute inset-0 opacity-20" style={{
    backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
    backgroundSize: '60px 60px'
  }} />
  
  {/* Effet lumineux */}
  <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#3b82f645_0%,transparent_65%)]" />
  
  {/* Orbes flottants (ajustés pour 500px) */}
  <div className="absolute w-72 h-72 bg-cyan-600/20 top-12 -left-20 rounded-full filter blur-[80px] animate-float" />
  <div className="absolute w-56 h-56 bg-blue-700/15 bottom-12 right-10 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
  <div className="absolute w-36 h-36 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-3xl mx-auto text-center">
      
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-cyan-600/15 border border-cyan-500/30"
      >
        <Cloud className="w-3 h-3 text-cyan-400" />
        <span className="text-cyan-300 font-semibold text-[10px] tracking-wide font-syne">Cloud & Hébergement</span>
      </motion.div>

      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 font-syne"
      >
        Passez au{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            cloud
          </span>
        </span>
      </motion.h1>

      {/* Ligne décorative */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-400 rounded-full mx-auto mb-3"
      />

      {/* Paragraphe */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-gray-300 text-sm md:text-base mb-5 max-w-2xl mx-auto"
      >
        Solutions d’hébergement flexibles, sécurisées et performantes pour toutes vos applications.
      </motion.p>

      {/* Boutons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <Link to="/devis" className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-5 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all hover:scale-105">
          Migrez dès maintenant <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
        </Link>
        <Link to="/contact" className="group border-2 border-white/30 hover:border-white px-5 py-2 rounded-xl font-semibold text-white hover:bg-white/10 transition-all text-sm">
          Contacter un expert
        </Link>
      </motion.div>

      {/* Flèche de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 flex justify-center"
      >
        <div className="animate-bounce">
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center">
            <div className="w-1 h-1.5 bg-white/50 rounded-full mt-1.5 animate-pulse" />
          </div>
        </div>
      </motion.div>
    </div>
  </div>

  {/* Vague décorative */}
  <div className="absolute bottom-0 left-0 right-0 text-white/10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-8">
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
    </svg>
  </div>
</section>
















      {/* Services Cloud (grille) */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos prestations cloud</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cloudServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all hover:-translate-y-1"
              >
                <service.icon className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi OMDEVE Cloud */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold font-syne mb-4">Pourquoi OMDEVE Cloud ?</h2>
              <div className="w-20 h-1 bg-cyan-500 rounded-full mb-6" />
              <ul className="space-y-4">
                {benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/devis" className="inline-flex items-center gap-2 mt-8 text-cyan-400 hover:text-cyan-300 font-semibold">
                Demander un devis cloud <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-white/10 text-center"
            >
              <Cloud className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <p className="text-gray-300 italic">
                "Avec OMDEVE, notre infrastructure cloud est devenue plus robuste et économique. Leur expertise AWS nous a fait gagner 30% sur notre facture."
              </p>
              <p className="text-sm text-gray-400 mt-4">— Directeur Technique, Scale-up SaaS</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offres packagées */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos packs cloud clé en main</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full mx-auto" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {packs.map((pack, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-white mb-2">{pack.name}</h3>
                <div className="text-3xl font-bold text-cyan-400 my-4">{pack.price}</div>
                <ul className="space-y-2 mb-6">
                  {pack.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400" /> {feat}
                    </li>
                  ))}
                </ul>
                <Link to="/devis-cloud" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold">
                  Choisir ce pack <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Statistiques */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/10"
              >
                <stat.icon className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                <div className="text-4xl font-bold text-white font-syne">{stat.value}</div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie d'infrastructures */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos infrastructures & datacenters</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <img src={img} alt="Infrastructure cloud" className="w-full h-48 object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <p className="text-gray-300 italic mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400" />
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold font-syne mb-4">Prêt à migrer vers le cloud ?</h2>
            <p className="text-gray-300 mb-6">Bénéficiez d’un audit de votre infrastructure et d’un plan de migration personnalisé.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/audit-gratuit" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                Audit gratuit <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 px-6 py-3 rounded-xl font-semibold transition">
                Contacter un expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CloudHebergement