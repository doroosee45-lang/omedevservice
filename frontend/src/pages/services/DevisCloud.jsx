import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import PublicHero from '../../components/Public/PublicHero'
import {
  Send,
  CheckCircle,
  ChevronLeft,
  User,
  Mail,
  Phone,
  Building2,
  Activity,
  DollarSign,
  Calendar,
  FileText,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react'

import { quoteRequests } from '../../services/api'

/* ============================================================
   DESIGN SYSTEM — IDENTIQUE À LA PAGE ABOUT
   ============================================================ */

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,0..40,300&display=swap');

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

    min-height: 100vh;
    background: #F6F6F7;
    color: #0B1213;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  .omedev-devis *,
  .omedev-devis *::before,
  .omedev-devis *::after {
    box-sizing: border-box;
  }

  .omedev-devis .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* ==========================================================
     HERO
     ========================================================== */

  .omedev-devis .omedev-hero {
    background:
      linear-gradient(
        135deg,
        #053876 0%,
        #1D5B9B 35%,
        #4681B7 60%,
        #72A5CE 80%,
        #A6C3D7 100%
      );
    position: relative;
    overflow: hidden;
  }

  .omedev-devis .hero-grid {
    background-image:
      linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  .omedev-devis .hero-glow {
    position: absolute;
    border-radius: 999px;
    filter: blur(100px);
    pointer-events: none;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-16px);
    }
  }

  .omedev-devis .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  /* ==========================================================
     TYPOGRAPHIE
     ========================================================== */

  .omedev-devis .font-syne {
    font-family: 'Syne', sans-serif;
  }

  .omedev-devis .section-badge {
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

  .omedev-devis .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
    font-family: 'Syne', sans-serif;
    color: #053876;
  }

  .omedev-devis .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(
      90deg,
      #0B74C1,
      #2AACB2,
      #55DDB5
    );
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  /* ==========================================================
     FORM CARD
     ========================================================== */

  .omedev-devis .form-card {
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 22px;
    box-shadow: 0 18px 55px rgba(5,56,118,.09);
  }

  .omedev-devis .form-section {
    padding: 0;
  }

  .omedev-devis .section-heading {
    display: flex;
    align-items: center;
    gap: .9rem;
    margin-bottom: 1.5rem;
  }

  .omedev-devis .section-icon {
    width: 46px;
    height: 46px;
    flex-shrink: 0;
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(11,116,193,.10);
    color: #0B74C1;
  }

  .omedev-devis .section-heading h2 {
    margin: 0;
    font-family: 'Syne', sans-serif;
    color: #053876;
    font-size: 1.35rem;
    font-weight: 700;
  }

  .omedev-devis .section-heading p {
    margin: 3px 0 0;
    color: #64748b;
    font-size: .82rem;
  }

  .omedev-devis .form-divider {
    height: 1px;
    background: rgba(5,56,118,.08);
    margin: 2rem 0;
  }

  /* ==========================================================
     CHAMPS
     ========================================================== */

  .omedev-devis .field {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  .omedev-devis .field label {
    display: flex;
    align-items: center;
    gap: .45rem;
    color: #25364A;
    font-size: .78rem;
    font-weight: 600;
  }

  .omedev-devis .field label svg {
    color: #0B74C1;
  }

  .omedev-devis .required {
    color: #2AACB2;
    font-weight: 800;
  }

  .omedev-devis .fc-input,
  .omedev-devis .fc-select,
  .omedev-devis .fc-textarea {
    width: 100%;
    border: 1px solid rgba(5,56,118,.14);
    background: #F6F6F7;
    border-radius: 12px;
    padding: .85rem 1rem;
    color: #053876;
    font-family: 'DM Sans', sans-serif;
    font-size: .9rem;
    outline: none;
    transition:
      border-color .25s ease,
      box-shadow .25s ease,
      background .25s ease,
      transform .25s ease;
  }

  .omedev-devis .fc-input:hover,
  .omedev-devis .fc-select:hover,
  .omedev-devis .fc-textarea:hover {
    border-color: rgba(11,116,193,.30);
  }

  .omedev-devis .fc-input:focus,
  .omedev-devis .fc-select:focus,
  .omedev-devis .fc-textarea:focus {
    border-color: #2AACB2;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(42,172,178,.09);
  }

  .omedev-devis .fc-input::placeholder,
  .omedev-devis .fc-textarea::placeholder {
    color: #94a3b8;
  }

  .omedev-devis .fc-select {
    appearance: none;
    cursor: pointer;
    padding-right: 2.8rem;
    background-image:
      linear-gradient(45deg, transparent 50%, #0B74C1 50%),
      linear-gradient(135deg, #0B74C1 50%, transparent 50%);
    background-position:
      calc(100% - 18px) 52%,
      calc(100% - 13px) 52%;
    background-size: 5px 5px, 5px 5px;
    background-repeat: no-repeat;
  }

  .omedev-devis .fc-select option {
    color: #053876;
    background: #fff;
  }

  .omedev-devis .fc-textarea {
    resize: vertical;
    min-height: 135px;
    line-height: 1.65;
  }

  .omedev-devis .fc-input[type="date"] {
    color: #053876;
  }

  /* ==========================================================
     BOUTON
     ========================================================== */

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
    padding: .9rem 1.7rem;
    border-radius: 12px;
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    border: none;
    font-family: 'Syne', sans-serif;
    box-shadow: 0 10px 28px rgba(11,116,193,.20);
  }

  .omedev-devis .btn-primary:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  .omedev-devis .btn-primary:disabled {
    opacity: .65;
    cursor: not-allowed;
    box-shadow: none;
  }

  .omedev-devis .btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    background: transparent;
    color: #053876;
    font-size: .9rem;
    font-weight: 700;
    padding: .9rem 1.7rem;
    border-radius: 12px;
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    border: 1.5px solid rgba(5,56,118,.2);
    font-family: 'Syne', sans-serif;
  }

  .omedev-devis .btn-outline:hover {
    border-color: #2AACB2;
    color: #0B74C1;
    background: rgba(42,172,178,.06);
  }

  .omedev-devis .btn-full {
    width: 100%;
    padding: 1rem 1.5rem;
    border-radius: 13px;
    font-size: .95rem;
  }

  /* ==========================================================
     INFO CARDS
     ========================================================== */

  .omedev-devis .info-card {
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
    transition:
      transform .35s ease,
      box-shadow .35s ease,
      border-color .35s ease;
  }

  .omedev-devis .info-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 22px 48px rgba(11,116,193,.13);
    border-color: rgba(42,172,178,.35);
  }

  .omedev-devis .info-icon {
    width: 48px;
    height: 48px;
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* ==========================================================
     CONFIRMATION
     ========================================================== */

  .omedev-devis .success-box {
    text-align: center;
    padding: 4rem 2rem;
  }

  .omedev-devis .success-icon {
    width: 86px;
    height: 86px;
    border-radius: 50%;
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background:
      linear-gradient(
        135deg,
        #0B74C1,
        #2AACB2,
        #55DDB5
      );
    box-shadow: 0 18px 45px rgba(42,172,178,.25);
  }

  /* ==========================================================
     RESPONSIVE
     ========================================================== */

  @media (max-width: 768px) {
    .omedev-devis .container {
      padding: 0 1rem;
    }

    .omedev-devis .form-card {
      border-radius: 17px;
    }
  }

  @media (max-width: 640px) {
    .omedev-devis .hero-content {
      padding-top: 7rem !important;
      padding-bottom: 5rem !important;
    }

    .omedev-devis .form-padding {
      padding: 1.25rem !important;
    }

    .omedev-devis .success-box {
      padding: 3rem 1.25rem;
    }
  }
`

/* ============================================================
   DONNÉES DU FORMULAIRE
   ============================================================ */

const SERVICES = [
  'Hébergement cloud scalable (AWS/Azure/GCP)',
  'Serveurs dédiés & VPS',
  'Sécurité & sauvegarde cloud',
  'Migration assistée vers le cloud',
  'Pack Start (49€/mois)',
  'Pack Business (129€/mois)',
  'Pack Enterprise (Sur devis)',
  'Solution personnalisée',
]

const BUDGETS = [
  'Moins de 500€ / mois',
  '500€ – 1 000€ / mois',
  '1 000€ – 5 000€ / mois',
  '5 000€ – 10 000€ / mois',
  'Plus de 10 000€ / mois',
  'Je ne sais pas encore',
]

const TYPES_PROJET = [
  'Migration complète',
  'Nouvelle infrastructure',
  'Optimisation des coûts',
  'Sécurité & conformité',
  'Autre',
]

const EMPTY_FORM = {
  nom: '',
  email: '',
  telephone: '',
  entreprise: '',
  service: '',
  budget: '',
  dateSouhaitee: '',
  typeProjet: '',
  message: '',
}

/* ============================================================
   COMPOSANTS
   ============================================================ */

const Field = ({
  label,
  required = false,
  icon: Icon,
  children,
}) => (
  <div className="field">
    <label>
      {Icon && <Icon size={14} strokeWidth={2} />}
      <span>{label}</span>
      {required && <span className="required">*</span>}
    </label>
    {children}
  </div>
)

const FormSectionHeader = ({
  icon: Icon,
  title,
  description,
}) => (
  <div className="section-heading">
    <div className="section-icon">
      <Icon size={22} />
    </div>

    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  </div>
)

/* ============================================================
   COMPOSANT PRINCIPAL
   ============================================================ */

const DevisCloud = () => {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [submittedRequest, setSubmittedRequest] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return

    setLoading(true)
    setError('')

    try {
      const res = await quoteRequests.create({
        fullName: formData.nom,
        email: formData.email,
        phone: formData.telephone,
        company: formData.entreprise,
        serviceType: 'cloud',
        budget: formData.budget,
        description:
          `Type de projet: ${formData.typeProjet || 'Non précisé'} | ` +
          `Date souhaitée: ${formData.dateSouhaitee || 'Non précisée'}\n\n` +
          formData.message,
      })

      setSubmittedRequest({
        number: res.data?.requestNumber || null,
        email: formData.email,
      })
      setSubmitted(true)
      setFormData(EMPTY_FORM)
    } catch (err) {
      console.error('Erreur devis cloud:', err)
      setError(
        err.response?.data?.message ||
        'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.'
      )
    } finally {
      setLoading(false)
    }
  }

  const row2 = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
    gap: '1.25rem',
    marginBottom: '1.25rem',
  }

  return (
    <div className="omedev-devis">
      <style>{globalStyles}</style>

      {/* ======================================================
          HERO
          ====================================================== */}

      <PublicHero
        badge="Demande de devis"
        title="Votre projet Cloud & Hébergement"
        highlight="Cloud & Hébergement"
        subtitle="Décrivez-nous votre projet et recevez une proposition personnalisée adaptée à vos besoins, vos objectifs et votre budget."
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {[
            { icon: Clock, text: 'Réponse sous 24h' },
            { icon: ShieldCheck, text: 'Données protégées' },
            { icon: Sparkles, text: 'Offre personnalisée' },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="inline-flex items-center gap-1.5 text-white/85 text-xs px-3.5 py-2 rounded-full"
              style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.14)' }}
            >
              <Icon size={14} />
              {text}
            </div>
          ))}
        </motion.div>
      </PublicHero>

      {/* ======================================================
          FORMULAIRE
          ====================================================== */}

      <section
        style={{
          background: '#F6F6F7',
          padding: '5rem 0',
        }}
      >
        <div className="container">

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: '-80px',
            }}
            transition={{
              duration: .7,
            }}
            className="form-card"
          >
            {submitted ? (
              /* =================================================
                 CONFIRMATION
                 ================================================= */

              <motion.div
                initial={{
                  opacity: 0,
                  scale: .95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="success-box"
              >
                <div className="success-icon">
                  <CheckCircle size={42} />
                </div>

                <h2
                  className="font-syne"
                  style={{
                    color: '#053876',
                    fontSize: 'clamp(1.8rem,4vw,2.5rem)',
                    fontWeight: 800,
                    marginBottom: '.75rem',
                  }}
                >
                  Demande envoyée !
                </h2>

                <div className="divider" />

                <p
                  style={{
                    maxWidth: 520,
                    margin: '0 auto 1.75rem',
                    color: '#25364A',
                    lineHeight: 1.7,
                    fontSize: '.95rem',
                  }}
                >
                  Merci pour votre confiance. Notre équipe va étudier
                  votre projet et vous contacter sous 24h ouvrées avec
                  une proposition personnalisée.
                </p>

                {submittedRequest?.number && (
                  <div
                    style={{
                      display: 'inline-block',
                      margin: '0 auto 1.5rem',
                      padding: '1rem 1.5rem',
                      borderRadius: '1rem',
                      background: 'linear-gradient(135deg, rgba(11,116,193,.1), rgba(42,172,178,.1))',
                      border: '1px solid rgba(42,172,178,.25)',
                    }}
                  >
                    <p style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 700, color: '#4681B7', marginBottom: '.25rem' }}>
                      Numéro de votre demande
                    </p>
                    <div className="font-syne" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#053876' }}>
                      {submittedRequest.number}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2 mb-2">
                  <Link
                    to="/services/cloud-hebergement"
                    className="btn-outline"
                  >
                    <ChevronLeft size={17} />
                    Retour à Cloud & Hébergement
                  </Link>

                  {submittedRequest?.number && (
                    <Link
                      to={`/suivi-devis/${submittedRequest.number}?email=${encodeURIComponent(submittedRequest.email)}`}
                      className="btn-primary"
                    >
                      Suivre ma demande
                      <ArrowRight size={17} />
                    </Link>
                  )}
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="form-padding"
                style={{
                  padding: '2.75rem',
                }}
              >
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                    {error}
                  </div>
                )}

                {/* =============================================
                    COORDONNÉES
                    ============================================= */}

                <FormSectionHeader
                  icon={User}
                  title="Vos coordonnées"
                  description="Comment pouvons-nous vous contacter ?"
                />

                <div style={row2}>
                  <Field
                    label="Nom complet"
                    required
                    icon={User}
                  >
                    <input
                      className="fc-input"
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      placeholder="Nom complet"
                    />
                  </Field>

                  <Field
                    label="Email professionnel"
                    required
                    icon={Mail}
                  >
                    <input
                      className="fc-input"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder="Adresse email"
                    />
                  </Field>
                </div>

                <div style={row2}>
                  <Field
                    label="Téléphone"
                    required
                    icon={Phone}
                  >
                    <input
                      className="fc-input"
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                      placeholder="+243 81 659 07 88"
                    />
                  </Field>

                  <Field
                    label="Entreprise / Organisation"
                    icon={Building2}
                  >
                    <input
                      className="fc-input"
                      type="text"
                      name="entreprise"
                      value={formData.entreprise}
                      onChange={handleChange}
                      autoComplete="organization"
                      placeholder="Nom de votre entreprise"
                    />
                  </Field>
                </div>

                <div className="form-divider" />

                {/* =============================================
                    DÉTAILS PROJET
                    ============================================= */}

                <FormSectionHeader
                  icon={Activity}
                  title="Votre projet"
                  description="Aidez-nous à comprendre précisément vos besoins."
                />

                <div style={row2}>
                  <Field
                    label="Service souhaité"
                    required
                    icon={Activity}
                  >
                    <select
                      className="fc-select"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Sélectionnez un service
                      </option>

                      {SERVICES.map((service) => (
                        <option
                          key={service}
                          value={service}
                        >
                          {service}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label="Budget estimé"
                    required
                    icon={DollarSign}
                  >
                    <select
                      className="fc-select"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Sélectionnez un budget
                      </option>

                      {BUDGETS.map((budget) => (
                        <option
                          key={budget}
                          value={budget}
                        >
                          {budget}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div style={row2}>
                  <Field
                    label="Date de mise en production"
                    icon={Calendar}
                  >
                    <input
                      className="fc-input"
                      type="date"
                      name="dateSouhaitee"
                      value={formData.dateSouhaitee}
                      onChange={handleChange}
                    />
                  </Field>

                  <Field
                    label="Type de projet"
                    icon={FileText}
                  >
                    <select
                      className="fc-select"
                      name="typeProjet"
                      value={formData.typeProjet}
                      onChange={handleChange}
                    >
                      <option value="">
                        Sélectionnez
                      </option>

                      {TYPES_PROJET.map((type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field
                  label="Description & besoins spécifiques"
                  icon={MessageSquare}
                >
                  <textarea
                    className="fc-textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre infrastructure actuelle, vos contraintes techniques, vos objectifs, le nombre d'utilisateurs, vos besoins en sécurité, sauvegarde, migration..."
                  />
                </Field>

                <div className="form-divider" />

                {/* =============================================
                    ENVOI
                    ============================================= */}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary btn-full"
                >
                  {loading ? (
                    <>
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          border:
                            '2px solid rgba(255,255,255,.35)',
                          borderTopColor: '#fff',
                          animation:
                            'spin .8s linear infinite',
                        }}
                      />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      Envoyer ma demande de devis
                      <Send size={17} />
                    </>
                  )}
                </button>

                <p
                  style={{
                    textAlign: 'center',
                    color: '#64748b',
                    fontSize: '.72rem',
                    lineHeight: 1.6,
                    maxWidth: 680,
                    margin: '1rem auto 0',
                  }}
                >
                  En soumettant ce formulaire, vous acceptez que vos
                  données soient traitées uniquement afin de vous
                  recontacter concernant votre demande. Un devis
                  personnalisé vous sera envoyé sous 24h ouvrées.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          INFORMATIONS / GARANTIES
          ====================================================== */}

      {!submitted && (
        <section
          style={{
            background: '#fff',
            padding: '1rem 0 5rem',
          }}
        >
          <div className="container">

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: .6,
              }}
              style={{
                textAlign: 'center',
                marginBottom: '2.5rem',
              }}
            >
              <span className="section-badge">
                Pourquoi nous choisir ?
              </span>

              <h2
                className="section-title"
                style={{
                  marginTop: '1rem',
                }}
              >
                Un accompagnement de proximité
              </h2>

              <div className="divider" />

              <p
                style={{
                  maxWidth: 650,
                  margin: '0 auto',
                  color: '#25364A',
                  lineHeight: 1.7,
                  fontSize: '.95rem',
                }}
              >
                Notre équipe vous accompagne de l'analyse de vos besoins
                jusqu'au déploiement et au suivi de votre infrastructure.
              </p>
            </motion.div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {[
                {
                  icon: Clock,
                  title: 'Réponse rapide',
                  text: 'Votre demande est étudiée rapidement par notre équipe.',
                  color: '#0B74C1',
                },
                {
                  icon: ShieldCheck,
                  title: 'Sécurité',
                  text: 'Vos informations restent confidentielles et protégées.',
                  color: '#053876',
                },
                {
                  icon: Sparkles,
                  title: 'Sur mesure',
                  text: 'Chaque proposition est adaptée à votre contexte.',
                  color: '#2AACB2',
                },
                {
                  icon: CheckCircle,
                  title: 'Transparence',
                  text: 'Une proposition claire, détaillée et sans engagement.',
                  color: '#4681B7',
                },
              ].map((item, index) => {
                const Icon = item.icon

                return (
                  <motion.div
                    key={item.title}
                    initial={{
                      opacity: 0,
                      y: 35,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * .08,
                    }}
                    className="info-card"
                    style={{
                      padding: '1.5rem',
                    }}
                  >
                    <div
                      className="info-icon"
                      style={{
                        background: `${item.color}15`,
                        color: item.color,
                        marginBottom: '1rem',
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <h3
                      className="font-syne"
                      style={{
                        color: '#053876',
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        marginBottom: '.5rem',
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        color: '#25364A',
                        fontSize: '.83rem',
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {item.text}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          CTA FINAL
          ====================================================== */}

      {!submitted && (
        <section
          style={{
            background:
              'linear-gradient(135deg,#053876 0%,#0B74C1 55%,#2AACB2 100%)',
            position: 'relative',
            overflow: 'hidden',
            padding: '5rem 0',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: .2,
              backgroundImage:
                'radial-gradient(circle at 20% 40%, rgba(85,221,181,.5) 0%, transparent 45%), radial-gradient(circle at 80% 60%, rgba(255,255,255,.25) 0%, transparent 45%)',
            }}
          />

          <div
            className="container"
            style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <h2
                className="font-syne"
                style={{
                  color: '#fff',
                  fontSize: 'clamp(2rem,4vw,3rem)',
                  fontWeight: 800,
                  marginBottom: '1rem',
                }}
              >
                Une question avant votre devis ?
              </h2>

              <p
                style={{
                  maxWidth: 600,
                  margin: '0 auto 1.75rem',
                  color: 'rgba(255,255,255,.78)',
                  lineHeight: 1.7,
                }}
              >
                Notre équipe est disponible pour vous conseiller et
                vous orienter vers la solution cloud la plus adaptée.
              </p>

              <Link
                to="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.6rem',
                  background: '#fff',
                  color: '#053876',
                  padding: '.9rem 1.6rem',
                  borderRadius: 12,
                  textDecoration: 'none',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '.9rem',
                  transition: 'all .3s ease',
                }}
              >
                Nous contacter
                <ArrowRight size={17} />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ======================================================
          RETOUR CLOUD
          ====================================================== */}

      {!submitted && (
        <div
          style={{
            background: '#F6F6F7',
            textAlign: 'center',
            padding: '1.5rem 1rem 2rem',
          }}
        >
          <Link
            to="/services/cloud-hebergement"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.4rem',
              color: '#64748b',
              fontSize: '.82rem',
              textDecoration: 'none',
              transition: 'color .2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#0B74C1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#64748b'
            }}
          >
            <ChevronLeft size={16} />
            Retour à la page Cloud & Hébergement
          </Link>
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  )
}

export default DevisCloud
