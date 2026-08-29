import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader2, Mail } from 'lucide-react'
import { newsletter as newsletterApi } from '../services/api'

const NewsletterUnsubscribe = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [status, setStatus] = useState('loading') // loading | success | error | no_token

  useEffect(() => {
    if (!token) { setStatus('no_token'); return }

    newsletterApi.unsubscribe(token)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B1213 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-white/[0.07] border border-white/15 backdrop-blur-md rounded-2xl p-10 max-w-md w-full text-center"
      >
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 text-[#72A5CE] animate-spin mx-auto mb-4" />
            <p className="text-white/70">Traitement en cours…</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 rounded-full bg-[#55DDB5]/15 border border-[#55DDB5]/30 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-[#55DDB5]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3 font-syne">Désabonnement effectué</h1>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              Vous avez été retiré de notre liste de diffusion. Vous ne recevrez plus nos emails.
            </p>
            <p className="text-white/50 text-xs mb-6">
              Vous avez changé d'avis ? Abonnez-vous à nouveau depuis notre site.
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3 font-syne">Lien invalide</h1>
            <p className="text-white/70 text-sm mb-6">
              Ce lien de désabonnement est invalide ou a déjà été utilisé.
            </p>
          </>
        )}

        {status === 'no_token' && (
          <>
            <div className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto mb-5">
              <Mail className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3 font-syne">Lien manquant</h1>
            <p className="text-white/70 text-sm mb-6">
              Aucun token de désabonnement trouvé. Utilisez le lien reçu dans l'email.
            </p>
          </>
        )}

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%)' }}
        >
          Retour au site
        </Link>
      </motion.div>
    </div>
  )
}

export default NewsletterUnsubscribe
