import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Server, 
  Wifi, 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Network,
  Zap,
  HardDrive
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

const ReseauInfrastructure = () => {
  const features = [
    { icon: Network, title: 'Architecture réseau sur mesure', desc: 'Conception et déploiement de réseaux adaptés à votre structure' },
    { icon: Shield, title: 'Sécurité avancée', desc: 'Protection contre les intrusions et filtrage de contenu' },
    { icon: Zap, title: 'Hautes performances', desc: 'Infrastructure optimisée pour la vitesse et la fiabilité' },
    { icon: HardDrive, title: 'Serveurs virtualisés', desc: 'Virtualisation et gestion centralisée de vos serveurs' },
    { icon: Wifi, title: 'Wi-Fi professionnel', desc: 'Couverture totale avec roaming et authentification' },
    { icon: TrendingUp, title: 'Évolutivité', desc: 'Solutions prêtes à grandir avec votre entreprise' }
  ]

  return (
    <>
      <style>{globalStyles}</style>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute w-96 h-96 bg-blue-600/20 top-20 -left-20 rounded-full filter blur-[80px] animate-float" />
        <div className="absolute w-72 h-72 bg-indigo-700/15 bottom-20 right-10 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30"
            >
              <Server className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Réseau & Infrastructure</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 font-syne"
            >
              Infrastructure{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
                  Hautes Performances
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-gray-300 text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              Conception, déploiement et maintenance de réseaux d'entreprise robustes, sécurisés et évolutifs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to="/devis" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105">
                Demander un devis <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/contact" className="group border-2 border-white/30 hover:border-white px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/10 transition-all">
                Contacter un expert
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Ce que nous vous apportons</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:-translate-y-1"
              >
                <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold font-syne mb-4">Pourquoi choisir OMDEVE ?</h2>
              <div className="w-20 h-1 bg-blue-500 rounded-full mb-6" />
              <ul className="space-y-4">
                {[
                  'Ingénieurs certifiés Cisco, MikroTik, Ubiquiti',
                  'Support technique 24/7',
                  'Audit et optimisation de votre réseau existant',
                  'Solutions hybrides (on-premise & cloud)',
                  'Contrats de maintenance adaptés'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/devis" className="inline-flex items-center gap-2 mt-8 text-blue-400 hover:text-blue-300 font-semibold">
                En savoir plus <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 border border-white/10 text-center"
            >
              <Server className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <p className="text-gray-300 italic">
                "OMDEVE a transformé notre infrastructure obsolète en un réseau hautement performant. Notre productivité a augmenté de 40%."
              </p>
              <p className="text-sm text-gray-400 mt-4">— Directeur IT, Groupe Industriel</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold font-syne mb-4">Prêt à moderniser votre infrastructure ?</h2>
            <p className="text-gray-300 mb-6">Obtenez un audit gratuit et un devis personnalisé sous 48h.</p>
            <Link to="/audit-gratuit" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
              Audit gratuit <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default ReseauInfrastructure