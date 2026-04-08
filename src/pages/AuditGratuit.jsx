import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Shield,
  Server,
  Zap,
  Users,
  Building,
  AlertCircle,
  Download,
  Mail,
  Phone,
  User,
  TrendingUp,
  ArrowRight,
  Clock
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
  
  @keyframes slow-zoom {
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
  .animate-slow-zoom { animation: slow-zoom 20s ease-out forwards; }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const AuditGratuit = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: '',
    sector: '',
    employeeCount: '',
    hasNetwork: '',
    hasServer: '',
    hasFirewall: '',
    internetSpeed: '',
    hasAntivirus: '',
    hasBackup: '',
    hasCyberPolicy: '',
    lastAudit: '',
    mainIssues: [],
    priorityServices: [],
    budget: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    preferredContact: '',
    newsletter: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [auditResult, setAuditResult] = useState(null)
  const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm()

  const sectors = [
    'Commerce / Distribution',
    'Industrie / Manufacturing',
    'Services / Consulting',
    'Banque / Finance',
    'Santé / Medical',
    'Éducation / Formation',
    'ONG / Association',
    'Administration publique',
    'Autre'
  ]

  const employeeRanges = ['1-10', '11-50', '51-200', '201-500', '500+']
  const internetSpeeds = ['< 10 Mbps', '10-50 Mbps', '50-100 Mbps', '100-500 Mbps', '> 500 Mbps', 'Je ne sais pas']
  const auditOptions = ['moins-6-mois', '6-12-mois', '1-2-ans', 'plus-2-ans', 'jamais']
  const auditLabels = {
    'moins-6-mois': 'Moins de 6 mois',
    '6-12-mois': '6 à 12 mois',
    '1-2-ans': '1 à 2 ans',
    'plus-2-ans': 'Plus de 2 ans',
    'jamais': 'Jamais réalisé'
  }
  const mainIssuesOptions = [
    'Lenteur du réseau',
    'Problèmes de sécurité',
    'Pannes fréquentes',
    'Manque de sauvegarde',
    'Site internet obsolète',
    'Absence de visibilité en ligne',
    'Gestion client inefficace',
    'Consommation énergétique élevée'
  ]
  const priorityServicesOptions = [
    'Réseau & Infrastructure',
    'Sécurité informatique',
    'Développement web',
    'Cloud & Hébergement',
    'Solutions énergétiques',
    'Formation IT'
  ]
  const budgetRanges = ['< 5 000 €', '5 000 - 15 000 €', '15 000 - 30 000 €', '30 000 - 50 000 €', '> 50 000 €', 'À déterminer']

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setValue(field, value)
  }

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => {
      const current = prev[field]
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      return { ...prev, [field]: updated }
    })
  }

  const handleRadioChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setValue(field, value)
  }

  const nextStep = async () => {
    let isValid = true
    if (step === 1) isValid = await trigger(['companyName', 'sector', 'employeeCount'])
    if (step === 2) isValid = await trigger(['hasNetwork', 'hasServer', 'hasFirewall', 'internetSpeed'])
    if (step === 3) isValid = await trigger(['hasAntivirus', 'hasBackup', 'hasCyberPolicy', 'lastAudit'])
    if (step === 5) isValid = await trigger(['name', 'email', 'phone'])
    if (isValid) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const calculateAuditScore = () => {
    let score = 0
    if (formData.hasNetwork === 'yes') score += 10
    if (formData.hasServer === 'yes') score += 10
    if (formData.hasFirewall === 'yes') score += 10
    if (formData.hasAntivirus === 'yes') score += 10
    if (formData.hasBackup === 'yes') score += 15
    if (formData.hasCyberPolicy === 'yes') score += 10
    if (formData.lastAudit === 'moins-6-mois') score += 5
    else if (formData.lastAudit === '6-12-mois') score += 3
    else if (formData.lastAudit === '1-2-ans') score += 1
    score -= formData.mainIssues.length * 2
    return Math.max(0, Math.min(100, score))
  }

  const getAuditRecommendations = (score) => {
    if (score >= 80) {
      return {
        level: 'Excellent',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-500/30',
        icon: '🏆',
        message: 'Votre infrastructure est très bien configurée. Quelques optimisations mineures peuvent encore améliorer vos performances.',
        recommendations: [
          'Mettre en place une veille technologique régulière',
          'Former les équipes aux bonnes pratiques',
          'Envisager une migration vers le cloud pour plus d\'agilité',
          'Automatiser les processus de sauvegarde'
        ]
      }
    } else if (score >= 60) {
      return {
        level: 'Bon',
        color: 'text-blue-400',
        bg: 'bg-blue-500/20',
        border: 'border-blue-500/30',
        icon: '👍',
        message: 'Votre infrastructure est fonctionnelle mais présente des axes d\'amélioration significatifs.',
        recommendations: [
          'Renforcer la sécurité réseau avec un firewall nouvelle génération',
          'Mettre en place des sauvegardes automatisées',
          'Auditer les accès et les permissions utilisateurs',
          'Optimiser la bande passante internet'
        ]
      }
    } else if (score >= 40) {
      return {
        level: 'Moyen',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/20',
        border: 'border-yellow-500/30',
        icon: '⚠️',
        message: 'Des vulnérabilités importantes ont été identifiées. Une action rapide est recommandée.',
        recommendations: [
          'Installer un antivirus centralisé',
          'Mettre en place une politique de mots de passe stricts',
          'Réaliser un audit de sécurité complet',
          'Former les employés à la cybersécurité',
          'Mettre en place des sauvegardes régulières'
        ]
      }
    } else {
      return {
        level: 'Critique',
        color: 'text-red-400',
        bg: 'bg-red-500/20',
        border: 'border-red-500/30',
        icon: '🚨',
        message: 'Votre infrastructure présente des risques majeurs. Une intervention urgente est nécessaire.',
        recommendations: [
          'Audit complet de l\'infrastructure IT',
          'Mise en place d\'une solution de sécurité globale',
          'Migration vers une infrastructure moderne',
          'Formation cybersécurité pour toute l\'équipe',
          'Mise en place d\'un plan de reprise d\'activité'
        ]
      }
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    const score = calculateAuditScore()
    const recommendations = getAuditRecommendations(score)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setAuditResult({ score, recommendations, ...formData })
    setStep(6)
    setIsSubmitting(false)
  }

  const downloadPDFReport = () => {
    alert("Le rapport PDF sera généré et téléchargé.")
  }

  const steps = [
    { number: 1, title: 'Entreprise', icon: Building },
    { number: 2, title: 'Infrastructure', icon: Server },
    { number: 3, title: 'Sécurité', icon: Shield },
    { number: 4, title: 'Besoins', icon: Users },
    { number: 5, title: 'Contact', icon: User }
  ]

  if (auditResult && step === 6) {
    const rec = auditResult.recommendations
    return (
      <>
        <style>{globalStyles}</style>
        <div className="pt-24 pb-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 min-h-screen">
          <div className="container mx-auto max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className={`p-8 text-center ${rec.bg} relative overflow-hidden border-b border-white/10`}>
                <div className="relative z-10">
                  <div className="text-6xl mb-4">{rec.icon}</div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white font-syne mb-2">Rapport d'Audit</h1>
                  <p className="text-gray-300">{auditResult.companyName || 'Votre entreprise'}</p>
                  <p className="text-sm text-gray-400 mt-1">Généré le {new Date().toLocaleDateString('fr-FR')}</p>
                </div>
              </div>

              <div className="p-8 border-b border-white/10">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center relative">
                    <svg className="w-36 h-36">
                      <circle className="text-white/10" strokeWidth="8" stroke="currentColor" fill="transparent" r="62" cx="72" cy="72" />
                      <circle
                        className="text-blue-400 transition-all duration-1000"
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 62}
                        strokeDashoffset={2 * Math.PI * 62 * (1 - auditResult.score / 100)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="62"
                        cx="72"
                        cy="72"
                        transform="rotate(-90 72 72)"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-3xl font-bold text-blue-400">{auditResult.score}</span>
                      <span className="text-gray-400">/100</span>
                    </div>
                  </div>
                  <h2 className={`text-xl font-bold ${rec.color} mt-4`}>Niveau: {rec.level}</h2>
                  <p className="text-gray-300 max-w-md mx-auto mt-2">{rec.message}</p>
                </div>
              </div>

              <div className="p-8 border-b border-white/10 bg-white/5">
                <h2 className="text-lg font-bold text-white mb-4">Synthèse de l'audit</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-sm text-gray-400">Secteur d'activité</p>
                    <p className="font-semibold text-white">{auditResult.sector || 'Non spécifié'}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-sm text-gray-400">Effectif</p>
                    <p className="font-semibold text-white">{auditResult.employeeCount || 'Non spécifié'} employés</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-sm text-gray-400">Problèmes identifiés</p>
                    <p className="font-semibold text-white">{auditResult.mainIssues.length} point(s)</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-sm text-gray-400">Budget envisagé</p>
                    <p className="font-semibold text-white">{auditResult.budget || 'À déterminer'}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 border-b border-white/10">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-blue-400" />
                  Recommandations prioritaires
                </h2>
                <ul className="space-y-3">
                  {rec.recommendations.map((recItem, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{recItem}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {auditResult.priorityServices.length > 0 && (
                <div className="p-8 border-b border-white/10">
                  <h2 className="text-lg font-bold text-white mb-4">Services qui pourraient vous intéresser</h2>
                  <div className="flex flex-wrap gap-2">
                    {auditResult.priorityServices.map((service, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-8 bg-white/5 border-t border-white/10">
                <h2 className="text-lg font-bold text-white mb-4">Prochaines étapes</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link
                    to="/demander-devis"
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group border border-white/10"
                  >
                    <div>
                      <p className="font-semibold text-white">Demander un devis personnalisé</p>
                      <p className="text-sm text-gray-400">Obtenez une offre sur mesure</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition" />
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group border border-white/10"
                  >
                    <div>
                      <p className="font-semibold text-white">Planifier un appel avec un expert</p>
                      <p className="text-sm text-gray-400">Discussion gratuite de 30 min</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </div>

              <div className="p-8 text-center border-t border-white/10">
                <button
                  onClick={downloadPDFReport}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Télécharger le rapport PDF
                </button>
                <p className="text-xs text-gray-400 mt-4">
                  Un email avec le rapport vous sera également envoyé à {auditResult.email}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </>
    )
  }

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
        <div className="absolute w-48 h-48 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-ring" />
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Diagnostic gratuit</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight mb-6 font-syne"
            >
              Audit{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
                  Gratuit
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
              Diagnostiquez gratuitement l'état de votre infrastructure IT et obtenez un rapport personnalisé avec nos recommandations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
                Nous contacter <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/solutions" className="group border-2 border-white/30 hover:border-white px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
                Voir nos solutions <CheckCircle size={18} />
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-white/10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 -mt-16 relative z-10 pb-8">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex justify-between items-center relative">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: step === s.number ? 1.1 : 1,
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-md ${
                      step > s.number
                        ? 'bg-emerald-500 text-white'
                        : step === s.number
                        ? 'bg-blue-600 text-white ring-4 ring-blue-500/30'
                        : 'bg-white/10 text-gray-400 border border-white/20'
                    }`}
                  >
                    {step > s.number ? <CheckCircle className="w-5 h-5" /> : s.number}
                  </motion.div>
                  <span className="text-xs mt-2 text-gray-400 hidden sm:block">{s.title}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-0.5 transition-all duration-300 ${
                      step > s.number ? 'bg-emerald-500' : 'bg-white/20'
                    }`}
                    style={{ right: '-50%' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto max-w-4xl px-4 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6 md:p-8">
                  {/* Step 1 - Company Info */}
                  {step === 1 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                        <Building className="w-6 h-6 mr-2 text-blue-400" />
                        Informations de l'entreprise
                      </h2>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Nom de l'entreprise <span className="text-red-400">*</span>
                          </label>
                          <input
                            {...register('companyName', { required: 'Champ requis' })}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all"
                            placeholder="OMDEVE Services"
                          />
                          {errors.companyName && <p className="text-red-400 text-xs mt-1">{errors.companyName.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Secteur d'activité <span className="text-red-400">*</span>
                          </label>
                          <select
                            {...register('sector', { required: 'Champ requis' })}
                            onChange={(e) => handleInputChange('sector', e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                          >
                            <option value="" className="bg-slate-800">Sélectionnez un secteur</option>
                            {sectors.map(s => <option key={s} value={s} className="bg-slate-800">{s}</option>)}
                          </select>
                          {errors.sector && <p className="text-red-400 text-xs mt-1">{errors.sector.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Nombre d'employés <span className="text-red-400">*</span>
                          </label>
                          <select
                            {...register('employeeCount', { required: 'Champ requis' })}
                            onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                          >
                            <option value="" className="bg-slate-800">Sélectionnez une tranche</option>
                            {employeeRanges.map(r => <option key={r} value={r} className="bg-slate-800">{r} employés</option>)}
                          </select>
                          {errors.employeeCount && <p className="text-red-400 text-xs mt-1">{errors.employeeCount.message}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2 - Infrastructure IT */}
                  {step === 2 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                        <Server className="w-6 h-6 mr-2 text-blue-400" />
                        Infrastructure IT
                      </h2>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Disposez-vous d'un réseau informatique ?</label>
                          <div className="flex gap-4">
                            {['yes', 'no', 'partial'].map(opt => (
                              <label key={opt} className="flex items-center text-gray-300">
                                <input type="radio" value={opt} checked={formData.hasNetwork === opt} onChange={() => handleRadioChange('hasNetwork', opt)} className="mr-2 text-blue-600" />
                                <span>{opt === 'yes' ? 'Oui' : opt === 'no' ? 'Non' : 'Partiellement'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Avez-vous des serveurs ?</label>
                          <div className="flex gap-4">
                            {['yes', 'no', 'cloud'].map(opt => (
                              <label key={opt} className="flex items-center text-gray-300">
                                <input type="radio" value={opt} checked={formData.hasServer === opt} onChange={() => handleRadioChange('hasServer', opt)} className="mr-2 text-blue-600" />
                                <span>{opt === 'yes' ? 'Oui' : opt === 'no' ? 'Non' : 'Cloud uniquement'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Disposez-vous d'un pare-feu ?</label>
                          <div className="flex gap-4">
                            {['yes', 'no', 'basic'].map(opt => (
                              <label key={opt} className="flex items-center text-gray-300">
                                <input type="radio" value={opt} checked={formData.hasFirewall === opt} onChange={() => handleRadioChange('hasFirewall', opt)} className="mr-2 text-blue-600" />
                                <span>{opt === 'yes' ? 'Oui' : opt === 'no' ? 'Non' : 'Basique'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Débit internet</label>
                          <select onChange={(e) => handleInputChange('internetSpeed', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                            <option value="" className="bg-slate-800">Sélectionnez le débit</option>
                            {internetSpeeds.map(s => <option key={s} value={s} className="bg-slate-800">{s}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3 - Sécurité */}
                  {step === 3 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                        <Shield className="w-6 h-6 mr-2 text-blue-400" />
                        Sécurité Informatique
                      </h2>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Utilisez-vous un antivirus ?</label>
                          <div className="flex gap-4">
                            {['yes', 'no', 'basic'].map(opt => (
                              <label key={opt} className="flex items-center text-gray-300">
                                <input type="radio" value={opt} checked={formData.hasAntivirus === opt} onChange={() => handleRadioChange('hasAntivirus', opt)} className="mr-2 text-blue-600" />
                                <span>{opt === 'yes' ? 'Oui, centralisé' : opt === 'no' ? 'Non' : 'Basique / individuel'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Avez-vous un système de sauvegarde ?</label>
                          <div className="flex gap-4">
                            {['yes', 'no', 'partial'].map(opt => (
                              <label key={opt} className="flex items-center text-gray-300">
                                <input type="radio" value={opt} checked={formData.hasBackup === opt} onChange={() => handleRadioChange('hasBackup', opt)} className="mr-2 text-blue-600" />
                                <span>{opt === 'yes' ? 'Oui' : opt === 'no' ? 'Non' : 'Partiel'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Existe-t-il une politique de cybersécurité ?</label>
                          <div className="flex gap-4">
                            {['yes', 'no', 'inprogress'].map(opt => (
                              <label key={opt} className="flex items-center text-gray-300">
                                <input type="radio" value={opt} checked={formData.hasCyberPolicy === opt} onChange={() => handleRadioChange('hasCyberPolicy', opt)} className="mr-2 text-blue-600" />
                                <span>{opt === 'yes' ? 'Oui' : opt === 'no' ? 'Non' : 'En cours'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Date du dernier audit de sécurité</label>
                          <select onChange={(e) => handleInputChange('lastAudit', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                            <option value="" className="bg-slate-800">Sélectionnez</option>
                            {auditOptions.map(opt => <option key={opt} value={opt} className="bg-slate-800">{auditLabels[opt]}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4 - Besoins */}
                  {step === 4 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                        <Users className="w-6 h-6 mr-2 text-blue-400" />
                        Vos besoins
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Quels sont vos principaux problèmes ?</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {mainIssuesOptions.map(issue => (
                              <label key={issue} className="flex items-center text-gray-300">
                                <input type="checkbox" checked={formData.mainIssues.includes(issue)} onChange={() => handleCheckboxChange('mainIssues', issue)} className="mr-2 text-blue-600 rounded" />
                                <span className="text-sm">{issue}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Services prioritaires</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {priorityServicesOptions.map(service => (
                              <label key={service} className="flex items-center text-gray-300">
                                <input type="checkbox" checked={formData.priorityServices.includes(service)} onChange={() => handleCheckboxChange('priorityServices', service)} className="mr-2 text-blue-600 rounded" />
                                <span className="text-sm">{service}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Budget envisagé</label>
                          <select onChange={(e) => handleInputChange('budget', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                            <option value="" className="bg-slate-800">Sélectionnez un budget</option>
                            {budgetRanges.map(b => <option key={b} value={b} className="bg-slate-800">{b}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5 - Contact */}
                  {step === 5 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                        <User className="w-6 h-6 mr-2 text-blue-400" />
                        Vos coordonnées
                      </h2>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Nom complet <span className="text-red-400">*</span></label>
                          <input {...register('name', { required: 'Champ requis' })} onChange={(e) => handleInputChange('name', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400" placeholder="Jean Dupont" />
                          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Email <span className="text-red-400">*</span></label>
                          <input type="email" {...register('email', { required: 'Champ requis', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Email invalide' } })} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400" placeholder="contact@omdeve.com" />
                          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Téléphone <span className="text-red-400">*</span></label>
                          <input type="tel" {...register('phone', { required: 'Champ requis' })} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400" placeholder="+243 XXX XXX XXX" />
                          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Poste / Fonction</label>
                          <input onChange={(e) => handleInputChange('position', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400" placeholder="Directeur IT" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Préférence de contact</label>
                          <div className="flex gap-4">
                            {['email', 'phone'].map(opt => (
                              <label key={opt} className="flex items-center text-gray-300">
                                <input type="radio" value={opt} checked={formData.preferredContact === opt} onChange={() => handleRadioChange('preferredContact', opt)} className="mr-2 text-blue-600" />
                                <span className="flex items-center">{opt === 'email' ? <Mail className="w-4 h-4 mr-1" /> : <Phone className="w-4 h-4 mr-1" />}{opt === 'email' ? 'Email' : 'Téléphone'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="flex items-center text-gray-300">
                            <input type="checkbox" checked={formData.newsletter} onChange={(e) => handleInputChange('newsletter', e.target.checked)} className="mr-2 text-blue-600 rounded" />
                            <span className="text-sm">Je souhaite recevoir la newsletter et les offres spéciales</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="px-6 md:px-8 py-4 bg-white/5 border-t border-white/10 flex justify-between">
                  {step > 1 && (
                    <button type="button" onClick={prevStep} className="flex items-center px-5 py-2.5 border border-white/20 rounded-xl font-medium text-white hover:bg-white/10 transition">
                      <ChevronLeft className="w-4 h-4 mr-1" /> Précédent
                    </button>
                  )}
                  {step < 5 && (
                    <button type="button" onClick={nextStep} className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition ml-auto">
                      Suivant <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  )}
                  {step === 5 && (
                    <button type="submit" disabled={isSubmitting} className="flex items-center px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 transition ml-auto disabled:opacity-50">
                      {isSubmitting ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>Génération...</> : <>Générer mon audit <ChevronRight className="w-4 h-4 ml-1" /></>}
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </AnimatePresence>

          {/* Trust Badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-center">
            <p className="text-sm text-gray-400 mb-3">Plus de 500 entreprises nous font confiance</p>
            <div className="flex justify-center gap-6">
              <span className="text-xs text-gray-500">🔒 Données confidentielles</span>
              <span className="text-xs text-gray-500">⚡ Rapport instantané</span>
              <span className="text-xs text-gray-500">💯 Sans engagement</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Double */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.3) 0%, transparent 60%),
                            radial-gradient(circle at 80% 70%, rgba(6,182,212,0.2) 0%, transparent 60%)`
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                <Shield size={28} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Sécurisez votre entreprise</h3>
              <p className="text-gray-300 mb-6">
                Découvrez nos solutions de cybersécurité adaptées à votre secteur d'activité.
              </p>
              <Link to="/solutions" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105">
                Voir les solutions <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/50 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                <Users size={28} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Accompagnement expert</h3>
              <p className="text-gray-300 mb-6">
                Bénéficiez d'un accompagnement personnalisé par nos experts en IT et énergie.
              </p>
              <Link to="/demander-devis" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105">
                Prendre rendez-vous <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AuditGratuit