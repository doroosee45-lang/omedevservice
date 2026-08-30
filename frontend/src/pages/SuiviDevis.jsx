import { useState, useEffect, useCallback } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Loader2, AlertCircle, CheckCircle, Clock, Phone,
  FileText, XCircle, Calendar, RefreshCw, ArrowRight, ShieldCheck,
} from 'lucide-react'
import { quoteRequests as quoteApi } from '../services/api'

const SERVICE_LABELS = {
  'site-web':    'Site web',
  'ecommerce':   'E-commerce',
  'application': 'Application',
  'reseau':      'Réseau',
  'securite':    'Sécurité',
  'cloud':       'Cloud',
  'energie':     'Énergie',
  'formation':   'Formation',
  'audit':       'Audit',
  'conseil':     'Conseil',
  'autre':       'Autre',
}

// Progression positive du dossier — reflète exactement les statuts existants
// dans le modèle backend (QuoteRequest.status). "lost" est un statut terminal
// à part, affiché séparément plutôt que comme une étape de la progression.
const STEPS = [
  { key: 'pending',   label: 'Demande reçue',      icon: FileText },
  { key: 'contacted', label: 'Contact client',      icon: Phone },
  { key: 'quoted',    label: 'Devis envoyé',        icon: FileText },
  { key: 'converted', label: 'Dossier accepté',     icon: CheckCircle },
]

const fmtDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'
const fmtDateTime = (d) => d ? new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'

const SuiviDevis = () => {
  const { requestNumber: paramNumber } = useParams()
  const [searchParams] = useSearchParams()

  const [numberInput, setNumberInput] = useState(paramNumber || '')
  const [emailInput, setEmailInput]   = useState(searchParams.get('email') || '')
  const [state, setState] = useState('idle') // idle | loading | found | not_found | error
  const [dossier, setDossier] = useState(null)

  const runSearch = useCallback(async (number, email) => {
    if (!number || !email) return
    setState('loading')
    try {
      const res = await quoteApi.track(number.trim().toUpperCase(), email.trim())
      setDossier(res.data)
      setState('found')
    } catch (err) {
      if (err.response?.status === 404) {
        setState('not_found')
      } else {
        setState('error')
      }
    }
  }, [])

  // Ouverture directe via un lien d'email : /suivi-devis/QR-...?email=...
  useEffect(() => {
    if (paramNumber && searchParams.get('email')) {
      runSearch(paramNumber, searchParams.get('email'))
    }
  }, [paramNumber, searchParams, runSearch])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Recherche manuelle : on ne touche PAS à l'URL. App.jsx utilise
    // `key={location.pathname}` sur <Routes> pour les transitions de page,
    // ce qui remonte entièrement ce composant (et perd l'état) au moindre
    // changement de chemin - naviguer ici annulerait la recherche en cours.
    // On évite aussi de mettre l'email en clair dans la barre d'adresse
    // lors d'une saisie manuelle (contrairement au lien reçu par email).
    runSearch(numberInput, emailInput)
  }

  const currentIndex = dossier ? STEPS.findIndex(s => s.key === dossier.status) : -1
  const isLost = dossier?.status === 'lost'

  return (
    <div className="min-h-screen" style={{ background: '#F6F6F7' }}>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4" style={{ background: 'linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B1213 100%)' }}>
        <div className="absolute w-96 h-96 bg-cyan-400/15 -top-20 -left-20 rounded-full blur-[100px]" />
        <div className="absolute w-96 h-96 bg-emerald-400/15 -bottom-20 -right-20 rounded-full blur-[100px]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-medium mb-5">
            <ShieldCheck className="w-3.5 h-3.5" /> Suivi de dossier
          </div>
          <h1 className="font-syne text-3xl md:text-4xl font-extrabold text-white mb-3">Suivre ma demande de devis</h1>
          <p className="text-white/70 text-sm md:text-base">
            Saisissez votre numéro de dossier et l'email utilisé lors de votre demande pour consulter son état.
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section className="px-4 -mt-10 relative z-10">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white rounded-2xl shadow-[0_20px_50px_rgba(5,56,118,0.12)] border border-[rgba(5,56,118,0.08)] p-6 md:p-8"
        >
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-[#25364A]/70 uppercase tracking-wide mb-1.5">Numéro de dossier</label>
              <input
                type="text"
                required
                value={numberInput}
                onChange={e => setNumberInput(e.target.value)}
                placeholder="QR-2608-0012"
                className="w-full px-4 py-3 rounded-xl border border-[rgba(5,56,118,0.18)] text-[#0B1213] font-mono placeholder-[#25364A]/40 focus:outline-none focus:border-[#2AACB2] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#25364A]/70 uppercase tracking-wide mb-1.5">Email utilisé</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                placeholder="vous@exemple.com"
                className="w-full px-4 py-3 rounded-xl border border-[rgba(5,56,118,0.18)] text-[#0B1213] placeholder-[#25364A]/40 focus:outline-none focus:border-[#2AACB2] transition-all"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={state === 'loading'}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
            style={{ background: 'linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%)', boxShadow: '0 10px 28px rgba(11,116,193,0.22)' }}
          >
            {state === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Suivre mon dossier
          </button>
          <p className="text-[#25364A]/50 text-xs text-center mt-3">
            Ces informations figurent dans l'email de confirmation que vous avez reçu.
          </p>
        </motion.form>
      </section>

      {/* Résultat */}
      <section className="px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {state === 'not_found' && (
              <motion.div key="nf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl p-8 text-center shadow-[0_10px_30px_rgba(5,56,118,0.06)]">
                <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h2 className="text-lg font-bold text-[#053876] mb-2">Dossier introuvable</h2>
                <p className="text-[#25364A]/70 text-sm">
                  Aucun dossier ne correspond à ce numéro. Vérifiez le numéro saisi et réessayez.
                </p>
              </motion.div>
            )}

            {state === 'error' && (
              <motion.div key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl p-8 text-center shadow-[0_10px_30px_rgba(5,56,118,0.06)]">
                <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-lg font-bold text-[#053876] mb-2">Une erreur est survenue</h2>
                <p className="text-[#25364A]/70 text-sm mb-4">
                  Impossible de récupérer votre dossier pour le moment. Merci de réessayer dans quelques instants.
                </p>
                <button onClick={() => runSearch(numberInput, emailInput)} className="inline-flex items-center gap-2 text-[#0B74C1] hover:text-[#053876] text-sm font-medium transition-colors">
                  <RefreshCw className="w-4 h-4" /> Réessayer
                </button>
              </motion.div>
            )}

            {state === 'found' && dossier && (
              <motion.div key="found" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl shadow-[0_10px_30px_rgba(5,56,118,0.06)] overflow-hidden">
                <div className="bg-gradient-to-r from-[#0B74C1]/12 to-[#55DDB5]/12 p-6 border-b border-[rgba(5,56,118,0.1)]">
                  <p className="text-xs text-[#25364A]/60 uppercase tracking-wide font-semibold mb-1">Numéro de dossier</p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="font-syne text-xl md:text-2xl font-extrabold text-[#053876]">{dossier.requestNumber}</h2>
                    {isLost ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-300/50">
                        <XCircle className="w-3.5 h-3.5" /> Sans suite
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#55DDB5]/15 text-[#1D5B9B] border border-[#55DDB5]/50">
                        <Clock className="w-3.5 h-3.5" /> {STEPS[currentIndex]?.label || dossier.status}
                      </span>
                    )}
                  </div>
                  <p className="text-[#25364A]/70 text-sm mt-1">Bonjour {dossier.fullName?.split(' ')[0] || ''}, voici l'état de votre demande.</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Infos générales */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#F6F6F7] rounded-xl p-3">
                      <p className="text-[#25364A]/60 text-xs mb-1 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Créé le</p>
                      <p className="text-[#053876] font-semibold text-sm">{fmtDate(dossier.createdAt)}</p>
                    </div>
                    <div className="bg-[#F6F6F7] rounded-xl p-3">
                      <p className="text-[#25364A]/60 text-xs mb-1 flex items-center gap-1"><RefreshCw className="w-3.5 h-3.5" /> Dernière mise à jour</p>
                      <p className="text-[#053876] font-semibold text-sm">{fmtDate(dossier.updatedAt)}</p>
                    </div>
                    <div className="bg-[#F6F6F7] rounded-xl p-3 col-span-2">
                      <p className="text-[#25364A]/60 text-xs mb-1">Type de demande</p>
                      <p className="text-[#053876] font-semibold text-sm">{SERVICE_LABELS[dossier.serviceType] || dossier.serviceType}</p>
                    </div>
                  </div>

                  {/* Progression */}
                  {!isLost && (
                    <div>
                      <p className="text-[#25364A]/60 text-xs font-bold uppercase tracking-wide mb-3">Progression du dossier</p>
                      <div className="space-y-2">
                        {STEPS.map((step, i) => {
                          const done = i <= currentIndex
                          const StepIcon = step.icon
                          return (
                            <div key={step.key} className="flex items-center gap-3">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${done ? 'bg-[#2AACB2]' : 'bg-[#E8EDF1] border border-[rgba(5,56,118,0.15)]'}`}>
                                {done ? <CheckCircle className="w-4 h-4 text-white" /> : <StepIcon className="w-3.5 h-3.5 text-[#25364A]/40" />}
                              </div>
                              <span className={`text-sm ${done ? 'text-[#053876] font-medium' : 'text-[#25364A]/50'}`}>{step.label}</span>
                            </div>
                          )
                        })}
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-[#E8EDF1] rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-[#2AACB2] to-[#55DDB5] rounded-full h-1.5 transition-all duration-700"
                            style={{ width: `${((currentIndex + 1) / STEPS.length) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {isLost && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                      Ce dossier a été classé sans suite. N'hésitez pas à nous recontacter pour toute nouvelle demande.
                    </div>
                  )}

                  {/* Historique */}
                  {dossier.statusHistory?.length > 0 && (
                    <div>
                      <p className="text-[#25364A]/60 text-xs font-bold uppercase tracking-wide mb-3">Historique</p>
                      <div className="space-y-2">
                        {dossier.statusHistory.map((h, i) => (
                          <div key={i} className="flex items-center justify-between text-xs bg-[#F6F6F7] rounded-lg px-3 py-2">
                            <span className="text-[#053876] font-medium">
                              {STEPS.find(s => s.key === h.status)?.label || (h.status === 'lost' ? 'Sans suite' : h.status)}
                            </span>
                            <span className="text-[#25364A]/50">{fmtDateTime(h.changedAt)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 pt-0">
                  <Link to="/contact" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[rgba(5,56,118,0.18)] text-[#25364A] text-sm font-medium hover:bg-[#F6F6F7] transition-all">
                    Une question ? Contactez-nous <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

export default SuiviDevis
