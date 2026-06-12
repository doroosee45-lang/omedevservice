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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-10 max-w-md w-full text-center"
      >
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-300">Traitement en cours…</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Désabonnement effectué</h1>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Vous avez été retiré de notre liste de diffusion. Vous ne recevrez plus nos emails.
            </p>
            <p className="text-gray-500 text-xs mb-6">
              Vous avez changé d'avis ? Abonnez-vous à nouveau depuis notre site.
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Lien invalide</h1>
            <p className="text-gray-400 text-sm mb-6">
              Ce lien de désabonnement est invalide ou a déjà été utilisé.
            </p>
          </>
        )}

        {status === 'no_token' && (
          <>
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-5">
              <Mail className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Lien manquant</h1>
            <p className="text-gray-400 text-sm mb-6">
              Aucun token de désabonnement trouvé. Utilisez le lien reçu dans l'email.
            </p>
          </>
        )}

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm transition-all"
        >
          Retour au site
        </Link>
      </motion.div>
    </div>
  )
}

export default NewsletterUnsubscribe
