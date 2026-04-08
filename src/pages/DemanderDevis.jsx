



import { useState, useRef } from 'react'
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
  Clock,
  Briefcase,
  MapPin,
  Euro,
  FileUp,
  Send,
  X,
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

const Devis = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    services: [],
    description: '',
    budget: '',
    location: '',
    fullName: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  })
  const [files, setFiles] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedRequest, setSubmittedRequest] = useState(null)
  const fileInputRef = useRef(null)
  const { register, handleSubmit, formState: { errors }, trigger, setValue, watch } = useForm()

  // Liste des services disponibles
  const serviceOptions = [
    { id: 'reseau', label: 'Réseau & Infrastructure', icon: Server },
    { id: 'securite', label: 'Sécurité informatique', icon: Shield },
    { id: 'web', label: 'Développement web', icon: Zap },
    { id: 'cloud', label: 'Cloud & Hébergement', icon: TrendingUp },
    { id: 'energie', label: 'Solutions énergétiques', icon: Building },
    { id: 'formation', label: 'Formation IT', icon: Users },
    { id: 'audit', label: 'Audit de sécurité', icon: AlertCircle },
    { id: 'conseil', label: 'Conseil stratégique IT', icon: Briefcase }
  ]

  const budgetRanges = ['< 5 000 €', '5 000 - 15 000 €', '15 000 - 30 000 €', '30 000 - 50 000 €', '> 50 000 €', 'À déterminer']

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => {
      const updated = prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
      setValue('services', updated)
      return { ...prev, services: updated }
    })
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setValue(field, value)
  }

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files)
    setFiles(prev => [...prev, ...selected])
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const nextStep = async () => {
    let isValid = true
    if (step === 1) isValid = formData.services.length > 0
    if (step === 2) isValid = await trigger('description')
    if (step === 3) isValid = formData.budget !== '' && formData.location !== ''
    if (step === 4) isValid = true // fichiers optionnels
    if (isValid) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (step === 1 && !isValid) {
      alert('Veuillez sélectionner au moins un service.')
    } else if (step === 3 && !isValid) {
      alert('Veuillez renseigner le budget estimé et la localisation.')
    }
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Génération d'un numéro de demande unique DEV-XXXXXX
  const generateRequestNumber = () => {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `DEV-${timestamp}${random}`
  }

  // Simulation d'envoi d'email à l'équipe
  const sendEmailToTeam = async (requestNumber, data, filesList) => {
    // Dans un vrai projet, on enverrait ces données à un endpoint backend
    console.log('📧 Envoi email à l\'équipe OMDEVE', {
      requestNumber,
      ...data,
      files: filesList.map(f => f.name)
    })
    // Simulation d'un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Email envoyé avec succès' })
      }, 500)
    })
  }

  // Relance programmée (simulation - backend réel requis)
  const scheduleReminder = (requestNumber, email) => {
    console.log(`⏰ Relance programmée pour ${email} (dossier ${requestNumber}) dans 48h si pas de réponse.`)
    // Ici, on enverrait une requête à un backend qui planifie un job cron
    // Pour la démo, on affiche simplement un message dans la console.
  }

  const onSubmit = async () => {
    if (formData.services.length === 0) {
      alert('Veuillez sélectionner au moins un service.')
      return
    }
    if (!formData.description) {
      alert('Veuillez décrire votre besoin.')
      return
    }
    if (!formData.budget || !formData.location) {
      alert('Veuillez renseigner le budget et la localisation.')
      return
    }
    setIsSubmitting(true)
    
    try {
      const requestNumber = generateRequestNumber()
      // Simuler l'envoi de l'email à l'équipe
      await sendEmailToTeam(requestNumber, formData, files)
      // Simuler la planification d'une relance (backend)
      scheduleReminder(requestNumber, formData.email)
      
      // Ici vous pouvez également envoyer les fichiers vers un serveur via FormData
      // const formDataToSend = new FormData()
      // files.forEach(file => formDataToSend.append('files', file))
      // etc.
      
      setSubmittedRequest({ number: requestNumber, email: formData.email })
      setStep(6) // écran de confirmation
    } catch (error) {
      console.error('Erreur lors de l\'envoi :', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { number: 1, title: 'Service', icon: Briefcase },
    { number: 2, title: 'Description', icon: FileText },
    { number: 3, title: 'Budget & Lieu', icon: Euro },
    { number: 4, title: 'Fichiers', icon: FileUp },
    { number: 5, title: 'Confirmation', icon: Send }
  ]

  // Écran de confirmation après soumission
  if (submittedRequest && step === 6) {
    return (
      <>
        <style>{globalStyles}</style>
        <div className="pt-24 pb-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 min-h-screen">
          <div className="container mx-auto max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden text-center p-8"
            >
              <div className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white font-syne mb-2">Demande envoyée !</h1>
              <p className="text-gray-300 mb-4">
                Votre demande de devis a bien été enregistrée sous le numéro :
              </p>
              <div className="text-3xl font-mono font-bold text-blue-400 bg-white/10 inline-block px-6 py-2 rounded-xl mb-6">
                {submittedRequest.number}
              </div>
              <p className="text-gray-300 max-w-md mx-auto">
                Un email de confirmation a été envoyé à <strong>{submittedRequest.email}</strong>. Notre équipe vous recontactera dans les plus brefs délais.
              </p>
              <div className="mt-8 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-sm text-gray-300">
                ⏰ <strong>Relance automatique :</strong> Si vous n’avez pas de réponse sous 48h, un email de relance vous sera envoyé.
              </div>
              <div className="mt-8 flex justify-center gap-4">
                <Link to="/" className="px-6 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition">
                  Retour à l'accueil
                </Link>
                <Link to="/solutions" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 transition">
                  Découvrir nos solutions
                </Link>
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
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-ring" />
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Demande de devis personnalisé</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight mb-6 font-syne"
            >
              Devis{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
                  Sur-Mesure
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
              Remplissez ce formulaire intelligent et recevez un devis adapté à vos besoins en moins de 48h.
            </motion.p>
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
              <div className="p-6 md:p-8">
                {/* Step 1 - Sélection du service */}
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                      <Briefcase className="w-6 h-6 mr-2 text-blue-400" />
                      Quel service vous intéresse ?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {serviceOptions.map(service => (
                        <label
                          key={service.id}
                          className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${
                            formData.services.includes(service.id)
                              ? 'bg-blue-600/20 border-blue-500 shadow-md'
                              : 'bg-white/5 border-white/20 hover:bg-white/10'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.services.includes(service.id)}
                            onChange={() => handleServiceToggle(service.id)}
                            className="mr-3 text-blue-600 rounded"
                          />
                          <service.icon className="w-5 h-5 mr-2 text-blue-400" />
                          <span className="text-gray-200">{service.label}</span>
                        </label>
                      ))}
                    </div>
                    {formData.services.length === 0 && (
                      <p className="text-amber-400 text-sm mt-4">Sélectionnez au moins un service</p>
                    )}
                  </div>
                )}

                {/* Step 2 - Description détaillée */}
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                      <FileText className="w-6 h-6 mr-2 text-blue-400" />
                      Décrivez votre besoin
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description détaillée <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        {...register('description', { required: 'Ce champ est requis' })}
                        rows={6}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                        placeholder="Objectifs, contraintes techniques, délais, etc."
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                      {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
                    </div>
                    <div className="mt-5">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Informations complémentaires (optionnel)
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                        placeholder="Références, prérequis, etc."
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3 - Budget & Localisation */}
                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                      <Euro className="w-6 h-6 mr-2 text-blue-400" />
                      Budget estimé et localisation
                    </h2>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Budget envisagé <span className="text-red-400">*</span>
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        >
                          <option value="" className="bg-slate-800">Sélectionnez une tranche</option>
                          {budgetRanges.map(b => (
                            <option key={b} value={b} className="bg-slate-800">{b}</option>
                          ))}
                        </select>
                        {!formData.budget && <p className="text-amber-400 text-xs mt-1">Champ requis</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Localisation géographique <span className="text-red-400">*</span>
                        </label>
                        <div className="flex gap-3">
                          <MapPin className="w-5 h-5 text-gray-400 mt-3" />
                          <input
                            type="text"
                            placeholder="Ville, Pays"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                          />
                        </div>
                        {!formData.location && <p className="text-amber-400 text-xs mt-1">Champ requis</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4 - Upload de fichiers */}
                {step === 4 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                      <FileUp className="w-6 h-6 mr-2 text-blue-400" />
                      Documents joints (optionnel)
                    </h2>
                    <div className="border-2 border-dashed border-white/30 rounded-xl p-6 text-center hover:border-blue-500 transition">
                      <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2 rounded-xl transition">
                        <FileUp size={18} />
                        Sélectionner des fichiers
                      </label>
                      <p className="text-xs text-gray-400 mt-2">PDF, DOC, XLS, JPG, PNG (max 10 Mo par fichier)</p>
                    </div>
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium text-gray-300">Fichiers sélectionnés :</p>
                        {files.map((file, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                            <span className="text-sm truncate">{file.name}</span>
                            <button type="button" onClick={() => removeFile(idx)} className="text-red-400 hover:text-red-300">
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 5 - Confirmation et coordonnées */}
                {step === 5 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                      <Send className="w-6 h-6 mr-2 text-blue-400" />
                      Confirmation & coordonnées
                    </h2>
                    <div className="space-y-4">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <h3 className="font-semibold text-white mb-2">Récapitulatif</h3>
                        <p><strong>Services :</strong> {formData.services.map(s => serviceOptions.find(opt => opt.id === s)?.label).join(', ') || 'Aucun'}</p>
                        <p><strong>Description :</strong> {formData.description.substring(0, 100)}...</p>
                        <p><strong>Budget :</strong> {formData.budget}</p>
                        <p><strong>Localisation :</strong> {formData.location}</p>
                        <p><strong>Fichiers joints :</strong> {files.length} fichier(s)</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Nom complet <span className="text-red-400">*</span></label>
                        <input
                          {...register('fullName', { required: 'Champ requis' })}
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl"
                          placeholder="Jean Dupont"
                        />
                        {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email <span className="text-red-400">*</span></label>
                        <input
                          type="email"
                          {...register('email', { required: 'Champ requis', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email invalide' } })}
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl"
                          placeholder="contact@omdeve.com"
                        />
                        {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Téléphone <span className="text-red-400">*</span></label>
                        <input
                          {...register('phone', { required: 'Champ requis' })}
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl"
                          placeholder="+243 XXX XXX XXX"
                        />
                        {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Entreprise / Organisation</label>
                        <input
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl"
                          placeholder="OMDEVE Services"
                        />
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
                  <button
                    type="button"
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="flex items-center px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 transition ml-auto disabled:opacity-50"
                  >
                    {isSubmitting ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>Envoi...</> : <>Envoyer la demande <Send className="w-4 h-4 ml-2" /></>}
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Trust Badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-center">
            <p className="text-sm text-gray-400 mb-3">Devis sous 48h • Accompagnement personnalisé</p>
            <div className="flex justify-center gap-6">
              <span className="text-xs text-gray-500">🔒 Données confidentielles</span>
              <span className="text-xs text-gray-500">⚡ Réponse rapide</span>
              <span className="text-xs text-gray-500">💯 Sans engagement</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Double (identique à AuditGratuit) */}
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
              <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105">
                Prendre rendez-vous <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Devis