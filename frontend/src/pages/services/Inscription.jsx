import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { inscriptions } from '../../services/api'
import PublicHero from '../../components/Public/PublicHero'
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
  ArrowLeft,
} from 'lucide-react'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');

  .omedev-inscription {
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
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
  }

  .omedev-inscription .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .omedev-inscription .hero {
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

  .omedev-inscription .hero-grid {
    background-image:
      linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  .omedev-inscription .section-badge {
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

  .omedev-inscription .hero-badge {
    background: rgba(255,255,255,.10);
    color: #fff;
    border-color: rgba(255,255,255,.28);
    backdrop-filter: blur(8px);
  }

  .omedev-inscription .section-title {
    font-family: 'Syne', sans-serif;
    color: #053876;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
  }

  .omedev-inscription .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(
      90deg,
      #0B74C1,
      #2AACB2,
      #55DDB5
    );
    border-radius: 99px;
  }

  .omedev-inscription .form-card {
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 20px;
    box-shadow: 0 16px 45px rgba(5,56,118,.08);
    transition:
      transform .35s ease,
      box-shadow .35s ease,
      border-color .35s ease;
  }

  .omedev-inscription .form-card:hover {
    box-shadow: 0 24px 55px rgba(11,116,193,.12);
    border-color: rgba(42,172,178,.25);
  }

  .omedev-inscription .field-label {
    display: flex;
    align-items: center;
    gap: .4rem;
    font-size: .72rem;
    font-weight: 700;
    color: #053876;
    text-transform: uppercase;
    letter-spacing: .07em;
    margin-bottom: .55rem;
    font-family: 'Syne', sans-serif;
  }

  .omedev-inscription .field-label svg {
    color: #0B74C1;
  }

  .omedev-inscription .field {
    width: 100%;
    padding: .9rem 1rem;
    border-radius: 12px;
    border: 1px solid rgba(5,56,118,.14);
    background: #F6F6F7;
    color: #0B1213;
    font-family: 'DM Sans', sans-serif;
    font-size: .9rem;
    outline: none;
    transition:
      border-color .25s ease,
      box-shadow .25s ease,
      background .25s ease;
  }

  .omedev-inscription .field::placeholder {
    color: #8A98A8;
  }

  .omedev-inscription .field:focus {
    background: #fff;
    border-color: #2AACB2;
    box-shadow: 0 0 0 4px rgba(42,172,178,.10);
  }

  .omedev-inscription select.field {
    cursor: pointer;
  }

  .omedev-inscription .progress-track {
    height: 7px;
    border-radius: 999px;
    background: #E7ECF0;
    overflow: hidden;
  }

  .omedev-inscription .progress-bar {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      #0B74C1,
      #2AACB2,
      #55DDB5
    );
  }

  .omedev-inscription .submit-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    border: none;
    border-radius: 12px;
    padding: 1rem 1.5rem;
    color: #fff;
    background: linear-gradient(
      135deg,
      #0B74C1 0%,
      #2AACB2 55%,
      #55DDB5 100%
    );
    font-family: 'Syne', sans-serif;
    font-size: .9rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 10px 28px rgba(11,116,193,.20);
    transition: all .3s ease;
  }

  .omedev-inscription .submit-button:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  .omedev-inscription .submit-button:disabled {
    opacity: .65;
    cursor: not-allowed;
  }

  .omedev-inscription .info-card {
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    padding: 1.5rem;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }

  .omedev-inscription .info-icon {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(11,116,193,.08);
    color: #0B74C1;
    margin-bottom: .9rem;
  }

  .omedev-inscription .success-icon {
    width: 82px;
    height: 82px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    background: rgba(85,221,181,.14);
    color: #2AACB2;
  }

  .omedev-inscription .dark-section {
    background: linear-gradient(
      135deg,
      #053876 0%,
      #1D5B9B 55%,
      #0B74C1 100%
    );
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-16px);
    }
  }

  .omedev-inscription .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    .omedev-inscription .container {
      padding: 0 1rem;
    }
  }
`

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

const staggerContainer = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const colors = {
  navy: '#053876',
  blue: '#0B74C1',
  blueLight: '#4681B7',
  turquoise: '#2AACB2',
  energy: '#55DDB5'
}

const Inscription = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    formation: '',
    centre: '',
    disponibilite: '',
    financement: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [inscriptionNumber, setInscriptionNumber] = useState('')
  const [emailStatus, setEmailStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await inscriptions.create({
        fullName: formData.nom,
        email: formData.email,
        phone: formData.telephone,
        formation: formData.formation,
        centre: formData.centre,
        disponibilite: formData.disponibilite,
        financement: formData.financement,
        message: formData.message,
      })

      // La base de données est la source de vérité : on n'arrive ici que si
      // l'inscription a bien été enregistrée, quel que soit le sort de l'email.
      setInscriptionNumber(response.data.inscriptionNumber || '')
      setEmailStatus(response.data.emailStatus || 'pending')
      setSubmitted(true)

      setTimeout(() => {
        setSubmitted(false)

        setFormData({
          nom: '',
          email: '',
          telephone: '',
          formation: '',
          centre: '',
          disponibilite: '',
          financement: '',
          message: ''
        })
      }, 6000)

    } catch (err) {
      console.error('Erreur inscription formation:', err)
      setError(
        err.response?.data?.message ||
        'Une erreur est survenue lors de l\'envoi de votre inscription. Veuillez réessayer.'
      )
    } finally {
      setLoading(false)
    }
  }

  const formationsList = [
    'Réseaux & Infrastructure',
    'Cybersécurité',
    'Cloud & Virtualisation',
    'Développement DevOps',
    'Soft skills IT',
    'Préparation certifications'
  ]

  const centresList = [
    'Kinshasa',
    'Lubumbashi',
    'Bulungu'
  ]

  const disponibilitesList = [
    'Matin (9h–12h)',
    'Après-midi (14h–17h)',
    'Soir (18h–21h)',
    'Week-end',
    'Intra-entreprise (dates à définir)'
  ]

  const financementsList = [
    'Entreprise (OPCO, plan de formation)',
    'CPF (Compte Personnel de Formation)',
    'Financement personnel',
    'Pôle Emploi / AIF',
    'Je ne sais pas encore'
  ]

  const fields = [
    'nom',
    'email',
    'telephone',
    'formation',
    'centre',
    'disponibilite',
    'financement'
  ]

  const filled = fields.filter(
    (key) => formData[key]
  ).length

  const pct = Math.round(
    (filled / fields.length) * 100
  )

  return (
    <div className="omedev-inscription">
      <style>{globalStyles}</style>

      {/* ==================== HERO ==================== */}

      <PublicHero
        badge="Formulaire d'inscription"
        title="Rejoignez nos formations"
        highlight="nos formations"
        subtitle={<>Remplissez le formulaire ci-dessous. Un conseiller vous recontactera sous<strong className="text-white"> 24h</strong> pour valider votre inscription.</>}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {['Formation professionnelle', 'Présentiel & distance', 'Accompagnement personnalisé'].map((tag) => (
            <div key={tag} className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white/80">
              {tag}
            </div>
          ))}
        </motion.div>
      </PublicHero>

      {/* ==================== FORMULAIRE ==================== */}

      <section className="py-24 bg-[#F6F6F7]">

        <div className="container">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]
            gap-8 items-start">

            {/* FORMULAIRE */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="form-card p-6 md:p-10"
            >

              {submitted ? (

                <motion.div
                  initial={{ opacity: 0, scale: .9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-14"
                >

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200
                    }}
                    className="success-icon"
                  >
                    <CheckCircle size={42} />
                  </motion.div>

                  <h2
                    className="text-3xl font-bold mb-3"
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      color: colors.navy
                    }}
                  >
                    Inscription enregistrée !
                  </h2>

                  <div className="divider mx-auto mb-5" />

                  <p className="text-[#25364A]
                    max-w-md mx-auto leading-relaxed"
                  >
                    Merci pour votre demande{inscriptionNumber ? <> — votre numéro d'inscription est <strong style={{ color: colors.blue }}>{inscriptionNumber}</strong></> : ''}.
                    Notre équipe vous recontactera
                    dans les plus brefs délais afin
                    de finaliser votre inscription.
                  </p>

                  {emailStatus === 'failed' || emailStatus === 'pending' ? (
                    <p className="text-[#B7791F] bg-[#FFF7E6] border border-[#F2C94C]/40 rounded-xl px-4 py-3 max-w-md mx-auto mt-4 text-sm leading-relaxed">
                      Votre inscription est bien enregistrée. L'email de confirmation n'a pas pu être envoyé pour le moment, mais cela ne remet pas en cause votre inscription — notre équipe vous contactera directement.
                    </p>
                  ) : null}

                  <Link
                    to="/formation"
                    className="inline-flex items-center
                      gap-2 mt-8 font-bold"
                    style={{ color: colors.blue }}
                  >
                    Retour aux formations
                    <ArrowRight size={16} />
                  </Link>

                </motion.div>

              ) : (

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  {error && (
                    <div className="mb-2 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                      {error}
                    </div>
                  )}

                  {/* Progression */}

                  <div className="mb-8">

                    <div className="flex items-center
                      justify-between mb-2"
                    >
                      <span
                        className="text-xs font-bold
                          uppercase tracking-wider"
                        style={{
                          color: colors.navy,
                          fontFamily: 'Syne, sans-serif'
                        }}
                      >
                        Progression
                      </span>

                      <span
                        className="text-sm font-bold"
                        style={{ color: colors.blue }}
                      >
                        {pct}%
                      </span>
                    </div>

                    <div className="progress-track">
                      <motion.div
                        className="progress-bar"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${pct}%`
                        }}
                        transition={{ duration: .4 }}
                      />
                    </div>

                  </div>

                  {/* Nom + Email */}

                  <div className="grid md:grid-cols-2 gap-5">

                    <div>
                      <label className="field-label">
                        <User size={14} />
                        Nom complet *
                      </label>

                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className="field"
                        placeholder="Jean Dupont"
                      />
                    </div>

                    <div>
                      <label className="field-label">
                        <Mail size={14} />
                        Email professionnel *
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="field"
                        placeholder="jean@entreprise.com"
                      />
                    </div>

                  </div>

                  {/* Téléphone + Formation */}

                  <div className="grid md:grid-cols-2 gap-5">

                    <div>
                      <label className="field-label">
                        <Phone size={14} />
                        Téléphone *
                      </label>

                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                        className="field"
                        placeholder="+243 81 234 56 78"
                      />
                    </div>

                    <div>
                      <label className="field-label">
                        <GraduationCap size={14} />
                        Formation souhaitée *
                      </label>

                      <select
                        name="formation"
                        value={formData.formation}
                        onChange={handleChange}
                        required
                        className="field"
                      >
                        <option value="">
                          Sélectionnez une formation
                        </option>

                        {formationsList.map((formation) => (
                          <option
                            key={formation}
                            value={formation}
                          >
                            {formation}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  {/* Centre + disponibilité */}

                  <div className="grid md:grid-cols-2 gap-5">

                    <div>
                      <label className="field-label">
                        <MapPin size={14} />
                        Centre de formation *
                      </label>

                      <select
                        name="centre"
                        value={formData.centre}
                        onChange={handleChange}
                        required
                        className="field"
                      >
                        <option value="">
                          Choisissez un centre
                        </option>

                        {centresList.map((centre) => (
                          <option
                            key={centre}
                            value={centre}
                          >
                            {centre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="field-label">
                        <Calendar size={14} />
                        Disponibilité *
                      </label>

                      <select
                        name="disponibilite"
                        value={formData.disponibilite}
                        onChange={handleChange}
                        required
                        className="field"
                      >
                        <option value="">
                          Choisissez une période
                        </option>

                        {disponibilitesList.map(
                          (disponibilite) => (
                            <option
                              key={disponibilite}
                              value={disponibilite}
                            >
                              {disponibilite}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                  </div>

                  {/* Financement */}

                  <div>
                    <label className="field-label">
                      <DollarSign size={14} />
                      Mode de financement *
                    </label>

                    <select
                      name="financement"
                      value={formData.financement}
                      onChange={handleChange}
                      required
                      className="field"
                    >
                      <option value="">
                        Sélectionnez un mode de financement
                      </option>

                      {financementsList.map(
                        (financement) => (
                          <option
                            key={financement}
                            value={financement}
                          >
                            {financement}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* Message */}

                  <div>
                    <label className="field-label">
                      <MessageSquare size={14} />
                      Message complémentaire
                    </label>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="field resize-y"
                      placeholder="Informations supplémentaires, besoins spécifiques..."
                    />
                  </div>

                  <div className="h-px bg-gradient-to-r
                    from-transparent
                    via-[#D5DCE1]
                    to-transparent"
                  />

                  {/* Bouton */}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{
                      scale: loading ? 1 : 1.01
                    }}
                    whileTap={{
                      scale: loading ? 1 : .99
                    }}
                    className="submit-button"
                  >

                    {loading ? (
                      <>
                        <div className="w-4 h-4
                          border-2 border-white
                          border-t-transparent
                          rounded-full animate-spin"
                        />

                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer ma demande d'inscription
                        <Send size={16} />
                      </>
                    )}

                  </motion.button>

                  <p className="text-center text-xs
                    text-[#718096] leading-relaxed"
                  >
                    En soumettant ce formulaire,
                    vous acceptez que vos données soient
                    traitées pour vous recontacter.
                    <br />
                    Conformément au RGPD, vous disposez
                    d'un droit d'accès et de suppression.
                  </p>

                </form>
              )}

            </motion.div>

            {/* COLONNE INFORMATION */}

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .7, delay: .1 }}
              className="space-y-5"
            >

              <div className="info-card">

                <div className="info-icon">
                  <GraduationCap size={23} />
                </div>

                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    color: colors.navy,
                    fontFamily: 'Syne, sans-serif'
                  }}
                >
                  Pourquoi nous rejoindre ?
                </h3>

                <p className="text-[#25364A]
                  text-sm leading-relaxed"
                >
                  Développez vos compétences grâce
                  à des formations professionnelles
                  adaptées aux besoins du marché IT.
                </p>

              </div>

              <div className="info-card">

                <div
                  className="info-icon"
                  style={{
                    background: 'rgba(42,172,178,.10)',
                    color: colors.turquoise
                  }}
                >
                  <CheckCircle size={23} />
                </div>

                <h3
                  className="text-lg font-bold mb-3"
                  style={{
                    color: colors.navy,
                    fontFamily: 'Syne, sans-serif'
                  }}
                >
                  Votre inscription
                </h3>

                <ul className="space-y-3 text-sm
                  text-[#25364A]"
                >
                  <li className="flex gap-2">
                    <span className="text-[#2AACB2]">✓</span>
                    Remplissez le formulaire
                  </li>

                  <li className="flex gap-2">
                    <span className="text-[#2AACB2]">✓</span>
                    Notre conseiller vous contacte
                  </li>

                  <li className="flex gap-2">
                    <span className="text-[#2AACB2]">✓</span>
                    Validation de votre formation
                  </li>

                  <li className="flex gap-2">
                    <span className="text-[#2AACB2]">✓</span>
                    Confirmation de votre session
                  </li>
                </ul>

              </div>

              <div
                className="info-card"
                style={{
                  background:
                    'linear-gradient(135deg, #053876, #1D5B9B)',
                  border: 'none'
                }}
              >

                <div
                  className="w-11 h-11 rounded-xl
                    flex items-center justify-center
                    mb-4"
                  style={{
                    background: 'rgba(255,255,255,.12)',
                    color: '#55DDB5'
                  }}
                >
                  <Phone size={20} />
                </div>

                <h3
                  className="text-lg font-bold text-white mb-2"
                  style={{
                    fontFamily: 'Syne, sans-serif'
                  }}
                >
                  Besoin d'aide ?
                </h3>

                <p className="text-white/75
                  text-sm leading-relaxed mb-4"
                >
                  Notre équipe est disponible pour
                  vous accompagner dans le choix
                  de votre formation.
                </p>

                <Link
                  to="/contact"
                  className="inline-flex items-center
                    gap-2 text-sm font-bold
                    text-[#55DDB5]"
                >
                  Contacter un conseiller
                  <ArrowRight size={15} />
                </Link>

              </div>

            </motion.div>

          </div>

          {/* RETOUR */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >

            <Link
              to="/formation"
              className="inline-flex items-center
                gap-2 text-sm font-bold
                transition-all hover:-translate-x-1"
              style={{ color: colors.blue }}
            >
              <ArrowLeft size={15} />
              Retour aux formations
            </Link>

          </motion.div>

        </div>
      </section>

      {/* ==================== CTA ==================== */}

      <section className="dark-section py-20 relative overflow-hidden">

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at 25% 40%,
                rgba(11,116,193,.35) 0%,
                transparent 60%
              ),
              radial-gradient(
                circle at 80% 70%,
                rgba(42,172,178,.30) 0%,
                transparent 60%
              )
            `
          }}
        />

        <div className="container relative z-10 text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
          >

            <span className="section-badge hero-badge">
              Formation professionnelle OMEDEV
            </span>

            <h2
              className="text-3xl md:text-4xl
                font-extrabold text-white mt-5 mb-4"
              style={{
                fontFamily: 'Syne, sans-serif'
              }}
            >
              Votre montée en compétences
              commence ici.
            </h2>

            <p className="text-white/75
              max-w-xl mx-auto mb-8"
            >
              Choisissez votre formation et
              construisons ensemble votre parcours
              professionnel.
            </p>

            <Link
              to="/formation"
              className="inline-flex items-center
                gap-2 px-7 py-4 rounded-xl
                font-bold text-white
                transition-all hover:-translate-y-1"
              style={{
                background:
                  'linear-gradient(135deg,#0B74C1,#2AACB2,#55DDB5)',
                boxShadow:
                  '0 12px 30px rgba(11,116,193,.25)',
                fontFamily: 'Syne, sans-serif'
              }}
            >
              Découvrir les formations
              <ArrowRight size={17} />
            </Link>

          </motion.div>

        </div>

      </section>

    </div>
  )
}

export default Inscription