
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import PublicHero from '../components/Public/PublicHero'
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
  TrendingUp,
  ArrowRight,
  Briefcase,
  MapPin,
  Euro,
  FileUp,
  Send,
  X,
  FileText,
  Mail,
  Phone,
  User,
  Clock,
  Lock,
  Sparkles
} from 'lucide-react'

import api from '../services/api'

/* ============================================================
   DESIGN SYSTEM — HARMONISÉ AVEC LA PAGE ABOUT
============================================================ */

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');

  .omedev-devis {
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

    background: var(--omedev-white);
    color: var(--omedev-dark);
    min-height: 100vh;
    overflow-x: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  .omedev-devis * {
    box-sizing: border-box;
  }

  .omedev-devis .container {
    max-width: 1280px;
    margin: 0 auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media (max-width: 768px) {
    .omedev-devis .container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  /* ============================================================
     ANIMATIONS
  ============================================================ */

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-16px);
    }
  }

  @keyframes pulse-ring {
    0% {
      transform: scale(.85);
      opacity: .8;
    }
    70% {
      transform: scale(1.25);
      opacity: 0;
    }
    100% {
      transform: scale(1.25);
      opacity: 0;
    }
  }

  .omedev-devis .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .omedev-devis .pulse-ring {
    animation: pulse-ring 2s ease-out infinite;
  }

  /* ============================================================
     HERO
  ============================================================ */

  .omedev-devis .devis-hero {
    position: relative;
    overflow: hidden;
    background:
      linear-gradient(
        135deg,
        #053876 0%,
        #1D5B9B 35%,
        #4681B7 60%,
        #72A5CE 80%,
        #A6C3D7 100%
      );
  }

  .omedev-devis .hero-grid {
    background-image:
      linear-gradient(rgba(255,255,255,.09) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.09) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  /* ============================================================
     BUTTONS
  ============================================================ */

  .omedev-devis .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;

    background:
      linear-gradient(
        135deg,
        #0B74C1 0%,
        #2AACB2 55%,
        #55DDB5 100%
      );

    color: #fff;
    font-size: .9rem;
    font-weight: 700;

    padding: .95rem 1.7rem;
    border-radius: 12px;

    border: none;
    cursor: pointer;

    transition: all .3s ease;

    font-family: 'Syne', sans-serif;

    box-shadow:
      0 10px 28px rgba(11,116,193,.20);
  }

  .omedev-devis .btn-primary:hover {
    transform: translateY(-3px);

    box-shadow:
      0 16px 36px rgba(42,172,178,.28);
  }

  .omedev-devis .btn-primary:disabled {
    opacity: .65;
    cursor: not-allowed;
    transform: none;
  }

  .omedev-devis .btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;

    background: #fff;

    color: #053876;

    font-size: .9rem;
    font-weight: 700;

    padding: .9rem 1.6rem;

    border-radius: 12px;

    border: 1px solid rgba(5,56,118,.18);

    cursor: pointer;

    transition: all .3s ease;

    font-family: 'Syne', sans-serif;
  }

  .omedev-devis .btn-outline:hover {
    border-color: #2AACB2;
    color: #0B74C1;

    background:
      rgba(85,221,181,.08);

    transform: translateY(-3px);
  }

  /* ============================================================
     PROGRESS
  ============================================================ */

  .omedev-devis .progress-section {
    background: #fff;
    border-bottom: 1px solid rgba(5,56,118,.08);
  }

  .omedev-devis .progress-step {
    position: relative;
    z-index: 2;
  }

  .omedev-devis .progress-circle {
    width: 48px;
    height: 48px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Syne', sans-serif;
    font-weight: 700;

    transition: all .35s ease;
  }

  .omedev-devis .progress-circle.pending {
    background: #fff;
    color: #4681B7;

    border: 1px solid rgba(5,56,118,.16);
  }

  .omedev-devis .progress-circle.active {
    background:
      linear-gradient(
        135deg,
        #0B74C1,
        #2AACB2
      );

    color: white;

    box-shadow:
      0 0 0 7px rgba(42,172,178,.12),
      0 10px 24px rgba(11,116,193,.25);
  }

  .omedev-devis .progress-circle.completed {
    background:
      linear-gradient(
        135deg,
        #2AACB2,
        #55DDB5
      );

    color: white;

    box-shadow:
      0 8px 20px rgba(42,172,178,.22);
  }

  /* ============================================================
     FORM CARD
  ============================================================ */

  .omedev-devis .form-card {
    background: #fff;

    border:
      1px solid rgba(5,56,118,.09);

    border-radius: 20px;

    box-shadow:
      0 12px 36px rgba(5,56,118,.08);

    overflow: hidden;
  }

  .omedev-devis .form-header {
    padding: 2rem 2rem 1.5rem;

    border-bottom:
      1px solid rgba(5,56,118,.07);

    background:
      linear-gradient(
        135deg,
        rgba(11,116,193,.035),
        rgba(42,172,178,.035)
      );
  }

  .omedev-devis .form-body {
    padding: 2rem;
  }

  .omedev-devis .form-footer {
    padding: 1.25rem 2rem;

    background: #F6F6F7;

    border-top:
      1px solid rgba(5,56,118,.08);
  }

  /* ============================================================
     SERVICE CARDS
  ============================================================ */

  .omedev-devis .service-card {
    position: relative;

    display: flex;
    align-items: center;

    gap: 1rem;

    padding: 1.15rem;

    background: #fff;

    border:
      1px solid rgba(5,56,118,.11);

    border-radius: 16px;

    cursor: pointer;

    transition:
      transform .3s ease,
      box-shadow .3s ease,
      border-color .3s ease,
      background .3s ease;
  }

  .omedev-devis .service-card:hover {
    transform: translateY(-4px);

    border-color:
      rgba(42,172,178,.45);

    box-shadow:
      0 16px 32px rgba(11,116,193,.10);
  }

  .omedev-devis .service-card.selected {
    background:
      linear-gradient(
        135deg,
        rgba(11,116,193,.06),
        rgba(42,172,178,.07)
      );

    border-color: #2AACB2;

    box-shadow:
      0 12px 30px rgba(42,172,178,.14);
  }

  .omedev-devis .service-icon {
    width: 48px;
    height: 48px;

    flex-shrink: 0;

    border-radius: 14px;

    display: flex;
    align-items: center;
    justify-content: center;

    background:
      rgba(11,116,193,.09);

    color: #0B74C1;

    transition: all .3s ease;
  }

  .omedev-devis .service-card.selected .service-icon {
    background:
      linear-gradient(
        135deg,
        #0B74C1,
        #2AACB2
      );

    color: white;
  }

  /* ============================================================
     FORM FIELDS
  ============================================================ */

  .omedev-devis .form-label {
    display: block;

    margin-bottom: .55rem;

    color: #053876;

    font-size: .9rem;

    font-weight: 700;
  }

  .omedev-devis .form-input {
    width: 100%;

    padding: .9rem 1rem;

    background: #fff;

    color: #0B1213;

    border:
      1px solid rgba(5,56,118,.15);

    border-radius: 12px;

    font-family: 'DM Sans', sans-serif;

    transition: all .25s ease;

    outline: none;
  }

  .omedev-devis .form-input::placeholder {
    color: #8A99A8;
  }

  .omedev-devis .form-input:focus {
    border-color: #2AACB2;

    box-shadow:
      0 0 0 4px rgba(42,172,178,.12);
  }

  .omedev-devis textarea.form-input {
    resize: vertical;
  }

  /* ============================================================
     UPLOAD
  ============================================================ */

  .omedev-devis .upload-zone {
    padding: 2.5rem 1.5rem;

    text-align: center;

    border:
      2px dashed rgba(11,116,193,.28);

    border-radius: 18px;

    background:
      linear-gradient(
        135deg,
        rgba(11,116,193,.035),
        rgba(42,172,178,.06)
      );

    transition: all .3s ease;
  }

  .omedev-devis .upload-zone:hover {
    border-color: #2AACB2;

    background:
      rgba(42,172,178,.06);
  }

  .omedev-devis .file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 1rem;

    padding: .85rem 1rem;

    background: #fff;

    border:
      1px solid rgba(5,56,118,.09);

    border-radius: 12px;

    box-shadow:
      0 6px 18px rgba(5,56,118,.04);
  }

  /* ============================================================
     RESPONSIVE
  ============================================================ */

  @media (max-width: 640px) {

    .omedev-devis .form-header,
    .omedev-devis .form-body,
    .omedev-devis .form-footer {
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    }

    .omedev-devis .progress-circle {
      width: 42px;
      height: 42px;
      font-size: .8rem;
    }

  }
`

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.65,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

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

  const {
    register,
    formState: { errors },
    trigger,
    setValue
  } = useForm()

  /* ============================================================
     SERVICES
  ============================================================ */

  const serviceOptions = [
    {
      id: 'reseau',
      label: 'Réseau & Infrastructure',
      icon: Server
    },
    {
      id: 'securite',
      label: 'Sécurité informatique',
      icon: Shield
    },
    {
      id: 'web',
      label: 'Développement web',
      icon: Zap
    },
    {
      id: 'cloud',
      label: 'Cloud & Hébergement',
      icon: TrendingUp
    },
    {
      id: 'energie',
      label: 'Solutions énergétiques',
      icon: Building
    },
    {
      id: 'formation',
      label: 'Formation IT',
      icon: Users
    },
    {
      id: 'audit',
      label: 'Audit de sécurité',
      icon: AlertCircle
    },
    {
      id: 'conseil',
      label: 'Conseil stratégique IT',
      icon: Briefcase
    }
  ]

  const budgetRanges = [
    '< 5 000 €',
    '5 000 - 15 000 €',
    '15 000 - 30 000 €',
    '30 000 - 50 000 €',
    '> 50 000 €',
    'À déterminer'
  ]

  const steps = [
    {
      number: 1,
      title: 'Service',
      icon: Briefcase
    },
    {
      number: 2,
      title: 'Description',
      icon: FileText
    },
    {
      number: 3,
      title: 'Budget & Lieu',
      icon: Euro
    },
    {
      number: 4,
      title: 'Documents',
      icon: FileUp
    },
    {
      number: 5,
      title: 'Confirmation',
      icon: Send
    }
  ]

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleServiceToggle = (serviceId) => {

    setFormData(prev => {

      const updated =
        prev.services.includes(serviceId)
          ? prev.services.filter(s => s !== serviceId)
          : [...prev.services, serviceId]

      setValue('services', updated)

      return {
        ...prev,
        services: updated
      }

    })

  }

  const handleInputChange = (field, value) => {

    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    setValue(field, value)

  }

  const handleFileChange = (e) => {

    const selected = Array.from(e.target.files)

    setFiles(prev => [
      ...prev,
      ...selected
    ])

  }

  const removeFile = (index) => {

    setFiles(prev =>
      prev.filter((_, i) => i !== index)
    )

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

  }

  /* ============================================================
     NAVIGATION
  ============================================================ */

  const nextStep = async () => {

    let isValid = true

    if (step === 1) {
      isValid = formData.services.length > 0
    }

    if (step === 2) {
      isValid = await trigger('description')
    }

    if (step === 3) {
      isValid =
        formData.budget !== '' &&
        formData.location !== ''
    }

    if (step === 4) {
      isValid = true
    }

    if (isValid) {

      setStep(step + 1)

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })

    } else if (step === 1) {

      alert('Veuillez sélectionner au moins un service.')

    } else if (step === 3) {

      alert(
        'Veuillez renseigner le budget estimé et la localisation.'
      )

    }

  }

  const prevStep = () => {

    setStep(step - 1)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

  }

  /* ============================================================
     SUBMIT
  ============================================================ */

  const onSubmit = async () => {

    const isContactValid = await trigger([
      'fullName',
      'email',
      'phone'
    ])

    if (!isContactValid) {
      return
    }

    if (formData.services.length === 0) {

      alert(
        'Veuillez sélectionner au moins un service.'
      )

      return

    }

    if (!formData.description) {

      alert(
        'Veuillez décrire votre besoin.'
      )

      return

    }

    if (!formData.budget || !formData.location) {

      alert(
        'Veuillez renseigner le budget et la localisation.'
      )

      return

    }

    setIsSubmitting(true)

    try {

      const serviceTypeMap = {

        reseau: 'reseau',
        securite: 'securite',
        web: 'site-web',
        cloud: 'cloud',
        energie: 'energie',
        formation: 'formation',
        audit: 'autre',
        conseil: 'autre'

      }

      const mappedServiceType =
        serviceTypeMap[formData.services[0]]
        || 'autre'

      const payload = {

        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,

        serviceType: mappedServiceType,

        description: formData.description,

        budget: formData.budget,

        timeline: formData.notes || null

      }

      const response =
        await api.post(
          '/quote-requests',
          payload
        )

      // Ne jamais fabriquer un faux numéro : si l'API n'en renvoie pas, le
      // dossier a bien été créé mais on ne peut pas promettre un numéro de
      // suivi qui n'existerait pas réellement en base (voir affichage plus
      // bas, qui masque le bloc numéro/suivi dans ce cas).
      const requestNumber = response.data?.requestNumber || null

      setSubmittedRequest({

        number: requestNumber,

        email: formData.email

      })

      setStep(6)

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })

    } catch (error) {

      console.error(
        'Erreur lors de l’envoi :',
        error
      )

      const msg =
        error.response?.data?.message
        || 'Une erreur est survenue. Veuillez réessayer.'

      alert(msg)

    } finally {

      setIsSubmitting(false)

    }

  }

  /* ============================================================
     SUCCESS PAGE
  ============================================================ */

  if (submittedRequest && step === 6) {

    return (

      <div className="omedev-devis">

        <style>{globalStyles}</style>

        <section className="devis-hero relative min-h-screen flex items-center py-32">

          <div className="hero-grid absolute inset-0 opacity-[0.25]" />

          <div className="absolute w-[26rem] h-[26rem] bg-cyan-300/25 top-10 -left-24 rounded-full blur-[100px] animate-float" />

          <div
            className="absolute w-[22rem] h-[22rem] bg-teal-300/25 bottom-0 right-0 rounded-full blur-[110px] animate-float"
            style={{ animationDelay: '2s' }}
          />

          <div className="container relative z-10">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl mx-auto"
            >

              <div className="bg-white rounded-[24px] p-8 md:p-12 text-center shadow-2xl">

                <div className="relative w-24 h-24 mx-auto mb-7">

                  <div className="absolute inset-0 rounded-full bg-[#55DDB5]/30 pulse-ring" />

                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#2AACB2] to-[#55DDB5] flex items-center justify-center shadow-lg">

                    <CheckCircle
                      size={46}
                      className="text-white"
                    />

                  </div>

                </div>

                <h1 className="font-syne text-3xl md:text-4xl font-extrabold text-[#053876] mb-4">

                  Demande envoyée !

                </h1>

                <p className="text-[#25364A] leading-relaxed mb-5">

                  Votre demande de devis a bien été enregistrée.
                  Notre équipe va analyser votre besoin et vous
                  recontactera dans les meilleurs délais.

                </p>

                {submittedRequest.number && (

                  <div className="inline-block mb-6 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#0B74C1]/10 to-[#2AACB2]/10 border border-[#2AACB2]/25">

                    <p className="text-xs uppercase tracking-wider font-bold text-[#4681B7] mb-1">

                      Numéro de votre demande

                    </p>

                    <div className="font-syne text-2xl md:text-3xl font-extrabold text-[#053876]">

                      {submittedRequest.number}

                    </div>

                  </div>

                )}

                <p className="text-sm text-[#25364A] max-w-lg mx-auto">

                  Une confirmation {submittedRequest.number ? 'avec votre lien de suivi ' : ''}sera envoyée à :

                  {' '}

                  <strong className="text-[#0B74C1]">

                    {submittedRequest.email}

                  </strong>

                </p>

                {submittedRequest.number && (

                  <Link
                    to={`/suivi-devis/${submittedRequest.number}?email=${encodeURIComponent(submittedRequest.email)}`}
                    className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-[#0B74C1] hover:text-[#053876] transition-colors"
                  >
                    Suivre ma demande dès maintenant
                    <ArrowRight size={16} />
                  </Link>

                )}

                <div className="mt-8 p-5 rounded-2xl bg-[#F6F6F7] border border-[#053876]/10 flex gap-3 text-left">

                  <Clock
                    size={22}
                    className="text-[#2AACB2] flex-shrink-0 mt-0.5"
                  />

                  <div>

                    <h3 className="font-syne font-bold text-[#053876] mb-1">

                      Réponse rapide

                    </h3>

                    <p className="text-sm text-[#25364A]">

                      Notre équipe s'engage à examiner votre demande
                      et à vous répondre dans les meilleurs délais.

                    </p>

                  </div>

                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

                  <Link
                    to="/"
                    className="btn-outline"
                  >

                    Retour à l'accueil

                  </Link>

                  <Link
                    to="/solutions"
                    className="btn-primary"
                  >

                    Découvrir nos solutions

                    <ArrowRight size={18} />

                  </Link>

                </div>

              </div>

            </motion.div>

          </div>

        </section>

      </div>

    )

  }

  /* ============================================================
     MAIN PAGE
  ============================================================ */

  return (

    <div className="omedev-devis">

      <style>{globalStyles}</style>

      {/* ========================================================
          HERO
      ======================================================== */}

      <PublicHero
        badge="Demande de devis personnalisé"
        title="Votre projet mérite un devis sur-mesure"
        highlight="un devis sur-mesure"
        subtitle="Décrivez votre projet en quelques étapes et recevez une proposition personnalisée adaptée à vos besoins."
      />

      {/* ========================================================
          PROGRESS STEPS
      ======================================================== */}

      <section className="progress-section py-8 sticky top-0 z-30">

        <div className="container max-w-5xl">

          <div className="flex items-start justify-between relative">

            <div className="absolute top-6 left-[8%] right-[8%] h-[2px] bg-[#D5DCE1] hidden sm:block" />

            <motion.div
              className="absolute top-6 left-[8%] h-[2px] hidden sm:block origin-left bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5]"
              initial={{ width: '0%' }}
              animate={{
                width: `${((step - 1) / 4) * 84}%`
              }}
              transition={{ duration: 0.5 }}
            />

            {steps.map((item) => {

              const Icon = item.icon

              const status =
                step > item.number
                  ? 'completed'
                  : step === item.number
                    ? 'active'
                    : 'pending'

              return (

                <div
                  key={item.number}
                  className="progress-step flex flex-col items-center flex-1"
                >

                  <motion.div
                    animate={{
                      scale:
                        step === item.number
                          ? 1.08
                          : 1
                    }}
                    className={`progress-circle ${status}`}
                  >

                    {step > item.number
                      ? (
                        <CheckCircle size={21} />
                      )
                      : (
                        <Icon size={20} />
                      )
                    }

                  </motion.div>

                  <span
                    className={`mt-3 text-[10px] sm:text-xs font-bold text-center ${
                      step === item.number
                        ? 'text-[#0B74C1]'
                        : 'text-[#4681B7]'
                    }`}
                  >

                    {item.title}

                  </span>

                </div>

              )

            })}

          </div>

        </div>

      </section>

      {/* ========================================================
          FORM
      ======================================================== */}

      <section className="py-16 md:py-20 bg-[#F6F6F7]">

        <div className="container max-w-4xl">

          <AnimatePresence mode="wait">

            <motion.div
              key={step}
              initial={{
                opacity: 0,
                x: 25
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -25
              }}
              transition={{
                duration: 0.35
              }}
              className="form-card"
            >

              {/* ================================================
                  FORM HEADER
              ================================================ */}

              <div className="form-header">

                {step === 1 && (

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-[#0B74C1]/10 text-[#0B74C1] flex items-center justify-center">

                      <Briefcase size={25} />

                    </div>

                    <div>

                      <span className="text-xs font-bold uppercase tracking-[.16em] text-[#2AACB2]">

                        Étape 01

                      </span>

                      <h2 className="font-syne text-2xl md:text-3xl font-bold text-[#053876]">

                        Quel service vous intéresse ?

                      </h2>

                    </div>

                  </div>

                )}

                {step === 2 && (

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-[#2AACB2]/10 text-[#2AACB2] flex items-center justify-center">

                      <FileText size={25} />

                    </div>

                    <div>

                      <span className="text-xs font-bold uppercase tracking-[.16em] text-[#2AACB2]">

                        Étape 02

                      </span>

                      <h2 className="font-syne text-2xl md:text-3xl font-bold text-[#053876]">

                        Décrivez votre besoin

                      </h2>

                    </div>

                  </div>

                )}

                {step === 3 && (

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-[#4681B7]/10 text-[#4681B7] flex items-center justify-center">

                      <Euro size={25} />

                    </div>

                    <div>

                      <span className="text-xs font-bold uppercase tracking-[.16em] text-[#2AACB2]">

                        Étape 03

                      </span>

                      <h2 className="font-syne text-2xl md:text-3xl font-bold text-[#053876]">

                        Budget et localisation

                      </h2>

                    </div>

                  </div>

                )}

                {step === 4 && (

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-[#0B74C1]/10 text-[#0B74C1] flex items-center justify-center">

                      <FileUp size={25} />

                    </div>

                    <div>

                      <span className="text-xs font-bold uppercase tracking-[.16em] text-[#2AACB2]">

                        Étape 04

                      </span>

                      <h2 className="font-syne text-2xl md:text-3xl font-bold text-[#053876]">

                        Documents complémentaires

                      </h2>

                    </div>

                  </div>

                )}

                {step === 5 && (

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-[#55DDB5]/15 text-[#2AACB2] flex items-center justify-center">

                      <Send size={25} />

                    </div>

                    <div>

                      <span className="text-xs font-bold uppercase tracking-[.16em] text-[#2AACB2]">

                        Dernière étape

                      </span>

                      <h2 className="font-syne text-2xl md:text-3xl font-bold text-[#053876]">

                        Confirmation et coordonnées

                      </h2>

                    </div>

                  </div>

                )}

              </div>

              {/* ================================================
                  FORM BODY
              ================================================ */}

              <div className="form-body">

                {/* ==============================================
                    STEP 1
                ============================================== */}

                {step === 1 && (

                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                  >

                    <p className="text-[#25364A] mb-7">

                      Sélectionnez un ou plusieurs services correspondant
                      à votre projet.

                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {serviceOptions.map((service) => {

                        const Icon = service.icon

                        const isSelected =
                          formData.services.includes(service.id)

                        return (

                          <label
                            key={service.id}
                            className={`service-card ${
                              isSelected
                                ? 'selected'
                                : ''
                            }`}
                          >

                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() =>
                                handleServiceToggle(service.id)
                              }
                              className="sr-only"
                            />

                            <div className="service-icon">

                              <Icon size={22} />

                            </div>

                            <div className="flex-1">

                              <span className="font-semibold text-[#053876]">

                                {service.label}

                              </span>

                            </div>

                            <div
                              className={`w-6 h-6 rounded-full border flex items-center justify-center transition ${
                                isSelected
                                  ? 'bg-[#2AACB2] border-[#2AACB2] text-white'
                                  : 'border-[#D5DCE1]'
                              }`}
                            >

                              {isSelected && (

                                <CheckCircle size={16} />

                              )}

                            </div>

                          </label>

                        )

                      })}

                    </div>

                    {formData.services.length === 0 && (

                      <p className="text-sm text-[#4681B7] mt-5">

                        Sélectionnez au moins un service pour continuer.

                      </p>

                    )}

                  </motion.div>

                )}

                {/* ==============================================
                    STEP 2
                ============================================== */}

                {step === 2 && (

                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >

                    <div>

                      <label className="form-label">

                        Description détaillée

                        <span className="text-red-500 ml-1">

                          *

                        </span>

                      </label>

                      <textarea
                        {...register('description', {
                          required: 'Ce champ est requis'
                        })}
                        rows={7}
                        className="form-input"
                        placeholder="Décrivez vos objectifs, vos contraintes techniques, vos besoins et les résultats attendus..."
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange(
                            'description',
                            e.target.value
                          )
                        }
                      />

                      {errors.description && (

                        <p className="text-red-500 text-xs mt-2">

                          {errors.description.message}

                        </p>

                      )}

                    </div>

                    <div>

                      <label className="form-label">

                        Informations complémentaires

                        <span className="font-normal text-[#8A99A8]">

                          {' '}(optionnel)

                        </span>

                      </label>

                      <textarea
                        rows={4}
                        className="form-input"
                        placeholder="Délais souhaités, références, prérequis ou toute autre information utile..."
                        value={formData.notes}
                        onChange={(e) =>
                          handleInputChange(
                            'notes',
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </motion.div>

                )}

                {/* ==============================================
                    STEP 3
                ============================================== */}

                {step === 3 && (

                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >

                    <div>

                      <label className="form-label">

                        Budget envisagé

                        <span className="text-red-500 ml-1">

                          *

                        </span>

                      </label>

                      <select
                        value={formData.budget}
                        onChange={(e) =>
                          handleInputChange(
                            'budget',
                            e.target.value
                          )
                        }
                        className="form-input"
                      >

                        <option value="">

                          Sélectionnez une tranche

                        </option>

                        {budgetRanges.map((budget) => (

                          <option
                            key={budget}
                            value={budget}
                          >

                            {budget}

                          </option>

                        ))}

                      </select>

                    </div>

                    <div>

                      <label className="form-label">

                        Localisation géographique

                        <span className="text-red-500 ml-1">

                          *

                        </span>

                      </label>

                      <div className="relative">

                        <MapPin
                          size={19}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2AACB2]"
                        />

                        <input
                          type="text"
                          placeholder="Ville, Pays"
                          value={formData.location}
                          onChange={(e) =>
                            handleInputChange(
                              'location',
                              e.target.value
                            )
                          }
                          className="form-input pl-12"
                        />

                      </div>

                    </div>

                    <div className="md:col-span-2 mt-2">

                      <div className="p-5 rounded-2xl bg-[#F6F6F7] border border-[#053876]/8 flex gap-4">

                        <Sparkles
                          size={23}
                          className="text-[#2AACB2] flex-shrink-0"
                        />

                        <div>

                          <h3 className="font-syne font-bold text-[#053876]">

                            Un budget indicatif suffit

                          </h3>

                          <p className="text-sm text-[#25364A] mt-1">

                            Ces informations nous permettent de vous proposer
                            une solution adaptée à vos besoins et à vos
                            contraintes.

                          </p>

                        </div>

                      </div>

                    </div>

                  </motion.div>

                )}

                {/* ==============================================
                    STEP 4
                ============================================== */}

                {step === 4 && (

                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                  >

                    <div className="upload-zone">

                      <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />

                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#0B74C1] to-[#2AACB2] text-white flex items-center justify-center shadow-lg">

                        <FileUp size={28} />

                      </div>

                      <h3 className="font-syne font-bold text-xl text-[#053876] mb-2">

                        Ajoutez vos documents

                      </h3>

                      <p className="text-sm text-[#25364A] mb-5">

                        Plans, cahiers des charges, documents techniques
                        ou autres fichiers utiles à votre demande.

                      </p>

                      <label
                        htmlFor="file-upload"
                        className="btn-primary cursor-pointer"
                      >

                        <FileUp size={18} />

                        Sélectionner des fichiers

                      </label>

                      <p className="text-xs text-[#8A99A8] mt-4">

                        PDF, DOC, XLS, JPG, PNG — maximum 10 Mo par fichier.

                      </p>

                    </div>

                    {files.length > 0 && (

                      <div className="mt-6">

                        <h4 className="font-syne font-bold text-[#053876] mb-4">

                          Fichiers sélectionnés ({files.length})

                        </h4>

                        <div className="space-y-3">

                          {files.map((file, index) => (

                            <motion.div
                              key={`${file.name}-${index}`}
                              initial={{
                                opacity: 0,
                                y: 10
                              }}
                              animate={{
                                opacity: 1,
                                y: 0
                              }}
                              className="file-item"
                            >

                              <div className="flex items-center gap-3 min-w-0">

                                <div className="w-10 h-10 rounded-xl bg-[#0B74C1]/10 text-[#0B74C1] flex items-center justify-center flex-shrink-0">

                                  <FileText size={19} />

                                </div>

                                <div className="min-w-0">

                                  <p className="text-sm font-semibold text-[#053876] truncate">

                                    {file.name}

                                  </p>

                                  <p className="text-xs text-[#8A99A8]">

                                    {(file.size / 1024 / 1024).toFixed(2)} Mo

                                  </p>

                                </div>

                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeFile(index)
                                }
                                className="w-9 h-9 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition"
                                title="Supprimer"
                              >

                                <X size={18} />

                              </button>

                            </motion.div>

                          ))}

                        </div>

                      </div>

                    )}

                  </motion.div>

                )}

                {/* ==============================================
                    STEP 5
                ============================================== */}

                {step === 5 && (

                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="space-y-7"
                  >

                    {/* RÉCAPITULATIF */}

                    <div className="rounded-2xl p-6 bg-[#F6F6F7] border border-[#053876]/8">

                      <div className="flex items-center gap-3 mb-5">

                        <div className="w-11 h-11 rounded-xl bg-[#2AACB2]/12 text-[#2AACB2] flex items-center justify-center">

                          <CheckCircle size={22} />

                        </div>

                        <div>

                          <h3 className="font-syne font-bold text-xl text-[#053876]">

                            Récapitulatif de votre demande

                          </h3>

                          <p className="text-sm text-[#25364A]">

                            Vérifiez vos informations avant l'envoi.

                          </p>

                        </div>

                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                        <div className="bg-white rounded-xl p-4 border border-[#053876]/8">

                          <p className="font-bold text-[#4681B7] mb-1">

                            Services

                          </p>

                          <p className="text-[#25364A]">

                            {formData.services
                              .map(
                                service =>
                                  serviceOptions.find(
                                    option =>
                                      option.id === service
                                  )?.label
                              )
                              .join(', ') || 'Aucun'}

                          </p>

                        </div>

                        <div className="bg-white rounded-xl p-4 border border-[#053876]/8">

                          <p className="font-bold text-[#4681B7] mb-1">

                            Budget

                          </p>

                          <p className="text-[#25364A]">

                            {formData.budget}

                          </p>

                        </div>

                        <div className="bg-white rounded-xl p-4 border border-[#053876]/8">

                          <p className="font-bold text-[#4681B7] mb-1">

                            Localisation

                          </p>

                          <p className="text-[#25364A]">

                            {formData.location}

                          </p>

                        </div>

                        <div className="bg-white rounded-xl p-4 border border-[#053876]/8">

                          <p className="font-bold text-[#4681B7] mb-1">

                            Documents

                          </p>

                          <p className="text-[#25364A]">

                            {files.length} fichier(s) joint(s)

                          </p>

                        </div>

                        <div className="bg-white rounded-xl p-4 border border-[#053876]/8 md:col-span-2">

                          <p className="font-bold text-[#4681B7] mb-1">

                            Description

                          </p>

                          <p className="text-[#25364A] leading-relaxed">

                            {formData.description}

                          </p>

                        </div>

                      </div>

                    </div>

                    {/* COORDONNÉES */}

                    <div>

                      <div className="flex items-center gap-3 mb-5">

                        <div className="w-11 h-11 rounded-xl bg-[#0B74C1]/10 text-[#0B74C1] flex items-center justify-center">

                          <User size={21} />

                        </div>

                        <h3 className="font-syne text-xl font-bold text-[#053876]">

                          Vos coordonnées

                        </h3>

                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div className="md:col-span-2">

                          <label className="form-label">

                            Nom complet

                            <span className="text-red-500 ml-1">

                              *

                            </span>

                          </label>

                          <div className="relative">

                            <User
                              size={18}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2AACB2]"
                            />

                            <input
                              {...register('fullName', {
                                required: 'Champ requis'
                              })}
                              value={formData.fullName}
                              onChange={(e) =>
                                handleInputChange(
                                  'fullName',
                                  e.target.value
                                )
                              }
                              className="form-input pl-12"
                              placeholder="Votre nom complet"
                            />

                          </div>

                          {errors.fullName && (

                            <p className="text-red-500 text-xs mt-2">

                              {errors.fullName.message}

                            </p>

                          )}

                        </div>

                        <div>

                          <label className="form-label">

                            Adresse email

                            <span className="text-red-500 ml-1">

                              *

                            </span>

                          </label>

                          <div className="relative">

                            <Mail
                              size={18}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2AACB2]"
                            />

                            <input
                              type="email"
                              {...register('email', {
                                required: 'Champ requis',
                                pattern: {
                                  value: /^\S+@\S+\.\S+$/,
                                  message: 'Email invalide'
                                }
                              })}
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange(
                                  'email',
                                  e.target.value
                                )
                              }
                              className="form-input pl-12"
                              placeholder="Adresse email"
                            />

                          </div>

                          {errors.email && (

                            <p className="text-red-500 text-xs mt-2">

                              {errors.email.message}

                            </p>

                          )}

                        </div>

                        <div>

                          <label className="form-label">

                            Téléphone

                            <span className="text-red-500 ml-1">

                              *

                            </span>

                          </label>

                          <div className="relative">

                            <Phone
                              size={18}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2AACB2]"
                            />

                            <input
                              {...register('phone', {
                                required: 'Champ requis'
                              })}
                              value={formData.phone}
                              onChange={(e) =>
                                handleInputChange(
                                  'phone',
                                  e.target.value
                                )
                              }
                              className="form-input pl-12"
                              placeholder="+243 XXX XXX XXX"
                            />

                          </div>

                          {errors.phone && (

                            <p className="text-red-500 text-xs mt-2">

                              {errors.phone.message}

                            </p>

                          )}

                        </div>

                        <div className="md:col-span-2">

                          <label className="form-label">

                            Entreprise / Organisation

                            <span className="font-normal text-[#8A99A8]">

                              {' '}(optionnel)

                            </span>

                          </label>

                          <input
                            value={formData.company}
                            onChange={(e) =>
                              handleInputChange(
                                'company',
                                e.target.value
                              )
                            }
                            className="form-input"
                            placeholder="Nom de votre entreprise ou organisation"
                          />

                        </div>

                      </div>

                    </div>

                  </motion.div>

                )}

              </div>

              {/* ================================================
                  NAVIGATION
              ================================================ */}

              <div className="form-footer flex items-center justify-between gap-4">

                {step > 1 ? (

                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-outline"
                  >

                    <ChevronLeft size={18} />

                    Précédent

                  </button>

                ) : (

                  <div />

                )}

                {step < 5 && (

                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary ml-auto"
                  >

                    Suivant

                    <ChevronRight size={18} />

                  </button>

                )}

                {step === 5 && (

                  <button
                    type="button"
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="btn-primary ml-auto"
                  >

                    {isSubmitting ? (

                      <>

                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

                        Envoi en cours...

                      </>

                    ) : (

                      <>

                        Envoyer la demande

                        <Send size={18} />

                      </>

                    )}

                  </button>

                )}

              </div>

            </motion.div>

          </AnimatePresence>

          {/* ====================================================
              TRUST BADGES
          ==================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{ once: true }}
            className="mt-10"
          >

            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm">

              <div className="flex items-center gap-2 text-[#25364A]">

                <div className="w-9 h-9 rounded-full bg-[#0B74C1]/10 text-[#0B74C1] flex items-center justify-center">

                  <Lock size={16} />

                </div>

                Données confidentielles

              </div>

              <div className="flex items-center gap-2 text-[#25364A]">

                <div className="w-9 h-9 rounded-full bg-[#2AACB2]/10 text-[#2AACB2] flex items-center justify-center">

                  <Clock size={16} />

                </div>

                Réponse rapide

              </div>

              <div className="flex items-center gap-2 text-[#25364A]">

                <div className="w-9 h-9 rounded-full bg-[#55DDB5]/15 text-[#2AACB2] flex items-center justify-center">

                  <CheckCircle size={16} />

                </div>

                Sans engagement

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* ========================================================
          CTA SECTION
      ======================================================== */}

      <section className="py-20 bg-white">

        <div className="container">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

            <motion.div
              initial={{
                opacity: 0,
                y: 35
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6
              }}
              className="group bg-[#F6F6F7] border border-[#053876]/8 rounded-[20px] p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#0B74C1]/10 text-[#0B74C1] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">

                <Shield size={29} />

              </div>

              <h3 className="font-syne text-2xl font-bold text-[#053876] mb-3">

                Découvrez nos solutions

              </h3>

              <p className="text-[#25364A] leading-relaxed mb-6">

                Explorez nos solutions professionnelles en infrastructure,
                cybersécurité, développement et énergie.

              </p>

              <Link
                to="/solutions"
                className="btn-outline"
              >

                Voir les solutions

                <ArrowRight size={17} />

              </Link>

            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 35
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.12
              }}
              className="group rounded-[20px] p-8 text-center text-white bg-gradient-to-br from-[#053876] via-[#0B74C1] to-[#2AACB2] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">

                <Users size={29} />

              </div>

              <h3 className="font-syne text-2xl font-bold mb-3">

                Besoin d'un accompagnement ?

              </h3>

              <p className="text-white/80 leading-relaxed mb-6">

                Notre équipe est disponible pour vous conseiller
                et vous accompagner dans votre projet.

              </p>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#053876] px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                Nous contacter

                <ArrowRight size={17} />

              </Link>

            </motion.div>

          </div>

        </div>

      </section>

    </div>

  )

}

export default Devis
