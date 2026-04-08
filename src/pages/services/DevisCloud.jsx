import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, CheckCircle, ChevronLeft } from 'lucide-react'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #0d1b2a;
    color: #e2e8f0;
    overflow-x: hidden;
  }

  .fc-badge-dot {
    width: 6px; height: 6px;
    background: #22d3ee;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .fc-input, .fc-select, .fc-textarea {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 11px 14px;
    color: #e2e8f0;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    transition: border-color 0.2s, background 0.2s;
    width: 100%;
    outline: none;
  }
  .fc-input:focus, .fc-select:focus, .fc-textarea:focus {
    border-color: rgba(34,211,238,0.5);
    background: rgba(34,211,238,0.04);
  }
  .fc-input::placeholder, .fc-textarea::placeholder { color: #475569; }

  .fc-select {
    appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2367e8f9' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
    background-color: rgba(255,255,255,0.03);
  }
  .fc-select option { background: #0d1b2a; color: #e2e8f0; }

  .fc-textarea { resize: vertical; min-height: 110px; line-height: 1.6; }

  .fc-input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(0.6) sepia(1) hue-rotate(160deg);
    cursor: pointer;
  }
`

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
  nom: '', email: '', telephone: '', entreprise: '',
  service: '', budget: '', dateSouhaitee: '', typeProjet: '', message: '',
}

/* ─── Sous-composants ─────────────────────────────────────── */

const SectionTitle = ({ children }) => (
  <div style={{
    fontFamily: "'Syne', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    color: '#22d3ee',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: '1.25rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid rgba(6,182,212,0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  }}>
    <span style={{
      display: 'block', width: 3, height: 14,
      background: 'linear-gradient(to bottom, #22d3ee, #60a5fa)',
      borderRadius: 2, flexShrink: 0,
    }} />
    {children}
  </div>
)

const Divider = () => (
  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '1.75rem 0' }} />
)

const Field = ({ label, required, icon, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{
      fontSize: 12, fontWeight: 500, color: '#94a3b8',
      display: 'flex', alignItems: 'center', gap: 5, letterSpacing: '0.03em',
    }}>
      {icon}
      {label}
      {required && <span style={{ color: '#22d3ee', fontSize: 10 }}>*</span>}
    </label>
    {children}
  </div>
)

/* ─── Icons inline (pas d'import lourd) ──────────────────── */
const Icon = ({ d, d2, cx, cy, r, type }) => {
  const props = { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, opacity: 0.7 }
  if (type === 'user') return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
  if (type === 'mail') return <svg {...props}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  if (type === 'phone') return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z"/></svg>
  if (type === 'building') return <svg {...props}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
  if (type === 'pulse') return <svg {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  if (type === 'dollar') return <svg {...props}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  if (type === 'calendar') return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  if (type === 'file') return <svg {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
  if (type === 'msg') return <svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  return null
}

/* ─── Composant principal ─────────────────────────────────── */
const DevisCloud = () => {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      console.log('Devis cloud :', formData)
      setSubmitted(true)
      setLoading(false)
      setTimeout(() => {
        setSubmitted(false)
        setFormData(EMPTY_FORM)
      }, 3500)
    }, 1500)
  }

  /* ── styles communs ── */
  const row2 = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.25rem',
  }

  return (
    <>
      <style>{globalStyles}</style>

      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0d1b2a 0%, #0a2a3d 50%, #0d1f35 100%)',
        padding: '5rem 1.5rem 3rem',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* grille décorative */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.15,
          backgroundImage: `linear-gradient(rgba(6,182,212,0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6,182,212,0.2) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />
        {/* halo */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 300,
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)',
              borderRadius: 20, padding: '6px 16px', marginBottom: '1.25rem',
            }}
          >
            <div className="fc-badge-dot" />
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: '#67e8f9', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Demande de devis
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.15, marginBottom: '0.75rem' }}
          >
            Devis{' '}
            <span style={{ background: 'linear-gradient(90deg,#22d3ee,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Cloud & Hébergement
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ color: '#94a3b8', fontSize: 15, fontWeight: 300 }}
          >
            Un expert cloud vous recontactera sous 24h avec une offre personnalisée.
          </motion.p>
        </div>
      </section>

      {/* ── Formulaire ── */}
      <section style={{ background: 'linear-gradient(180deg,#0a2a3d 0%,#0d1b2a 100%)', padding: '3rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20,
              padding: 'clamp(1.5rem,4vw,2.5rem)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {submitted ? (
              /* ── Confirmation ── */
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: 'center', padding: '3rem 1rem' }}
              >
                <CheckCircle size={64} color="#22d3ee" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>
                  Demande envoyée !
                </h3>
                <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: '1.5rem' }}>
                  Merci, nous vous contacterons sous 24h avec un devis personnalisé.
                </p>
                <Link
                  to="/cloud-hebergement"
                  style={{ color: '#22d3ee', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}
                >
                  <ChevronLeft size={16} /> Retour à la page Cloud
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>

                {/* Section 1 — Coordonnées */}
                <SectionTitle>Coordonnées</SectionTitle>

                <div style={{ ...row2, marginBottom: '1.25rem' }}>
                  <Field label="Nom complet" required icon={<Icon type="user" />}>
                    <input className="fc-input" type="text" name="nom" value={formData.nom} onChange={handleChange} required placeholder="Jean Dupont" />
                  </Field>
                  <Field label="Email professionnel" required icon={<Icon type="mail" />}>
                    <input className="fc-input" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="jean@entreprise.com" />
                  </Field>
                </div>

                <div style={{ ...row2, marginBottom: '1.25rem' }}>
                  <Field label="Téléphone" required icon={<Icon type="phone" />}>
                    <input className="fc-input" type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required placeholder="+33 6 12 34 56 78" />
                  </Field>
                  <Field label="Entreprise / Organisation" icon={<Icon type="building" />}>
                    <input className="fc-input" type="text" name="entreprise" value={formData.entreprise} onChange={handleChange} placeholder="Nom de votre entreprise" />
                  </Field>
                </div>

                <Divider />

                {/* Section 2 — Détails du projet */}
                <SectionTitle>Détails du projet</SectionTitle>

                <div style={{ ...row2, marginBottom: '1.25rem' }}>
                  <Field label="Service souhaité" required icon={<Icon type="pulse" />}>
                    <select className="fc-select" name="service" value={formData.service} onChange={handleChange} required>
                      <option value="">Sélectionnez un service</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Budget estimé" required icon={<Icon type="dollar" />}>
                    <select className="fc-select" name="budget" value={formData.budget} onChange={handleChange} required>
                      <option value="">Sélectionnez un budget</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </Field>
                </div>

                <div style={{ ...row2, marginBottom: '1.25rem' }}>
                  <Field label="Date de mise en production" icon={<Icon type="calendar" />}>
                    <input className="fc-input" type="date" name="dateSouhaitee" value={formData.dateSouhaitee} onChange={handleChange} />
                  </Field>
                  <Field label="Type de projet" icon={<Icon type="file" />}>
                    <select className="fc-select" name="typeProjet" value={formData.typeProjet} onChange={handleChange}>
                      <option value="">Sélectionnez</option>
                      {TYPES_PROJET.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Description & besoins spécifiques" icon={<Icon type="msg" />}>
                  <textarea
                    className="fc-textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre infrastructure actuelle, vos contraintes techniques, vos objectifs, le nombre d'utilisateurs..."
                  />
                </Field>

                <Divider />

                {/* Bouton */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: loading ? 'rgba(14,116,144,0.5)' : 'linear-gradient(135deg,#0e7490,#1d4ed8)',
                    border: 'none',
                    borderRadius: 12,
                    padding: '14px 20px',
                    color: '#fff',
                    fontFamily: "'Syne',sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    transition: 'opacity 0.2s',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? 'Envoi en cours…' : (
                    <>Envoyer ma demande de devis <Send size={16} /></>
                  )}
                </button>

                <p style={{ fontSize: 11, color: '#475569', textAlign: 'center', marginTop: '1rem', lineHeight: 1.6 }}>
                  En soumettant ce formulaire, vous acceptez que vos données soient traitées pour vous recontacter.
                  Un devis personnalisé vous sera envoyé sous 24h ouvrées.
                </p>
              </form>
            )}
          </motion.div>

          {/* Lien retour */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link
              to="/cloud-hebergement"
              style={{ color: '#64748b', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#22d3ee'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
            >
              <ChevronLeft size={16} /> Retour à la page Cloud & Hébergement
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default DevisCloud