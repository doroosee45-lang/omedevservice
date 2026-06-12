import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  GraduationCap,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  MessageSquare,
  Send,
  CheckCircle,
  ArrowRight,
  ArrowLeft
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

const Inscription = () => {
  const [formData, setFormData] = useState({
    nom: '', email: '', telephone: '', formation: '',
    centre: '', disponibilite: '', financement: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ nom:'', email:'', telephone:'', formation:'', centre:'', disponibilite:'', financement:'', message:'' })
      }, 4000)
    }, 1600)
  }

  const formationsList    = ["Réseaux & Infrastructure","Cybersécurité","Cloud & Virtualisation","Développement DevOps","Soft skills IT","Préparation certifications"]
  const centresList       = ["Paris","Lyon","Bordeaux"]
  const disponibilitesList= ["Matin (9h–12h)","Après-midi (14h–17h)","Soir (18h–21h)","Week-end","Intra-entreprise (dates à définir)"]
  const financementsList  = ["Entreprise (OPCO, plan de formation)","CPF (Compte Personnel de Formation)","Financement personnel","Pôle Emploi / AIF","Je ne sais pas encore"]

  const fields     = ['nom','email','telephone','formation','centre','disponibilite','financement']
  const filled     = fields.filter(k => formData[k]).length
  const pct        = Math.round((filled / fields.length) * 100)

  return (
    <>
      <style>{globalStyles}</style>

      {/* Hero Section - style Contact (bleu) */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        <motion.div 
          className="absolute w-96 h-96 bg-blue-600/20 top-20 -left-20 rounded-full filter blur-[80px]"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-72 h-72 bg-indigo-700/15 bottom-20 right-10 rounded-full filter blur-[80px]"
          animate={{ x: [0, -15, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute w-48 h-48 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-ring" />
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Formulaire d'inscription</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.68, 0, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 font-syne"
            >
              Rejoignez{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
                  nos formations
                </span>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-24 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 rounded-full mx-auto mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-gray-300 text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              Remplissez le formulaire ci-dessous. Un conseiller vous recontactera
              sous <strong className="text-white">24h</strong> pour valider votre inscription.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-16 flex justify-center"
            >
              <motion.div 
                className="animate-bounce"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
                  <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-white/10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Formulaire d'inscription */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10 shadow-2xl"
          >
            {/* Barre de progression */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-blue-300">Progression</span>
                <span className="text-xs font-bold text-blue-400">{pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <motion.div 
                  className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </motion.div>
                <h3 className="text-2xl font-bold font-syne text-white mb-3">
                  Inscription envoyée !
                </h3>
                <p className="text-gray-300 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                  Merci, notre équipe vous recontactera dans les plus brefs délais.
                </p>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link to="/formation"
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    Retour aux formations <ArrowRight size={15} />
                  </Link>
                </motion.div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <User size={13} className="text-blue-400" /> Nom complet *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <Mail size={13} className="text-blue-400" /> Email professionnel *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                      placeholder="jean@entreprise.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <Phone size={13} className="text-blue-400" /> Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <GraduationCap size={13} className="text-blue-400" /> Formation souhaitée *
                    </label>
                    <select
                      name="formation"
                      value={formData.formation}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                    >
                      <option value="">Sélectionnez une formation</option>
                      {formationsList.map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <MapPin size={13} className="text-blue-400" /> Centre de formation *
                    </label>
                    <select
                      name="centre"
                      value={formData.centre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                    >
                      <option value="">Choisissez un centre</option>
                      {centresList.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <Calendar size={13} className="text-blue-400" /> Disponibilité *
                    </label>
                    <select
                      name="disponibilite"
                      value={formData.disponibilite}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                    >
                      <option value="">Choisissez une période</option>
                      {disponibilitesList.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                    <DollarSign size={13} className="text-blue-400" /> Mode de financement *
                  </label>
                  <select
                    name="financement"
                    value={formData.financement}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="">Sélectionnez un mode de financement</option>
                    {financementsList.map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                    <MessageSquare size={13} className="text-blue-400" /> Message complémentaire
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-y"
                    placeholder="Informations supplémentaires, besoins spécifiques…"
                  />
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full rounded-xl py-4 text-sm font-semibold text-white flex items-center justify-center gap-2.5 overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 shadow-lg"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      Envoyer ma demande d'inscription
                      <Send size={15} />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-gray-500 leading-relaxed">
                  En soumettant ce formulaire, vous acceptez que vos données soient traitées pour vous recontacter.<br/>
                  Conformément au RGPD, vous disposez d'un droit d'accès et de suppression.
                </p>
              </form>
            )}
          </motion.div>

          {/* Lien retour */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
              <Link to="/formation"
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-400 transition-colors duration-200">
                <ArrowLeft size={14} />
                Retour aux formations
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Inscription