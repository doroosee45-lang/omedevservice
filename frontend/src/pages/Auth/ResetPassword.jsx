import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import api from '../../services/api'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
  body { font-family: 'DM Sans', sans-serif; }
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
  .animate-float { animation: float 6s ease-in-out infinite; }
`
const heroBg = 'linear-gradient(135deg, #053876 0%, #1D5B9B 35%, #4681B7 60%, #72A5CE 80%, #A6C3D7 100%)'

// Avec HashRouter, une query string ajoutée après le fragment
// (ex. /#/reset-password?token=...) se retrouve dans window.location.hash
// et n'est pas exposée par useSearchParams. On l'extrait donc manuellement.
const getTokenFromHash = () => {
  const hash = window.location.hash || ''
  const queryIndex = hash.indexOf('?')
  if (queryIndex === -1) return null
  const params = new URLSearchParams(hash.slice(queryIndex + 1))
  return params.get('token')
}

const ResetPassword = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [tokenError, setTokenError] = useState(false)
  const [error, setError] = useState('')
  const [token] = useState(getTokenFromHash)

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password')

  useEffect(() => {
    if (!token) {
      setTokenError(true)
    }
  }, [token])

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError('')
    try {
      await api.post('/auth/reset-password', {
        token,
        newPassword: data.password,
      })
      setIsSuccess(true)
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      const message = err.response?.data?.message || 'Token invalide ou expiré'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const BgDecorations = () => (
    <>
      <div className="absolute inset-0 opacity-[0.15]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
        backgroundSize: '56px 56px'
      }} />
      <div className="absolute w-96 h-96 bg-cyan-300/25 top-20 -left-20 rounded-full filter blur-[80px] animate-float" />
      <div className="absolute w-72 h-72 bg-teal-300/20 bottom-20 right-10 rounded-full filter blur-[90px] animate-float" style={{ animationDelay: '2s' }} />
    </>
  )

  if (tokenError) {
    return (
      <>
        <style>{globalStyles}</style>
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: heroBg }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-3xl p-8 text-center max-w-md backdrop-blur-xl"
            style={{
              background: 'linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
              border: '1px solid rgba(239,68,68,0.3)',
              boxShadow: '0 30px 80px -20px rgba(0,0,0,0.6)',
            }}
          >
            <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold font-syne text-white mb-2">Lien invalide</h2>
            <p className="text-white/80 mb-6">
              Le lien de réinitialisation est invalide ou a expiré.
            </p>
            <Link to="/forgot-password" className="inline-block px-6 py-2.5 text-white rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-lg" style={{ background: 'linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%)' }}>
              Nouvelle demande
            </Link>
            <div className="mt-4">
              <Link to="/login" className="text-sm text-white/50 hover:text-[#55DDB5] transition-colors">
                Retour à la connexion
              </Link>
            </div>
          </motion.div>
        </div>
      </>
    )
  }

  if (isSuccess) {
    return (
      <>
        <style>{globalStyles}</style>
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: heroBg }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-3xl p-8 text-center max-w-md backdrop-blur-xl"
            style={{
              background: 'linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 30px 80px -20px rgba(0,0,0,0.6)',
            }}
          >
            <div className="w-20 h-20 mx-auto bg-[#55DDB5]/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-[#55DDB5]" />
            </div>
            <h2 className="text-2xl font-bold font-syne text-white mb-2">Mot de passe modifié</h2>
            <p className="text-white/80 mb-4">Votre mot de passe a été mis à jour avec succès.</p>
            <p className="text-sm text-white/50">Redirection vers la page de connexion...</p>
            <Link to="/login" className="inline-block mt-6 text-[#55DDB5] hover:text-[#55DDB5] link-underline transition-colors">
              Se connecter maintenant →
            </Link>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{globalStyles}</style>
      <section className="relative text-white overflow-hidden min-h-screen flex items-center" style={{ background: heroBg }}>
        <BgDecorations />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="rounded-3xl p-8 backdrop-blur-xl"
              style={{
                background: 'linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 30px 80px -20px rgba(0,0,0,0.6)',
              }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#55DDB5]/15 border border-[#55DDB5]/30 mb-4">
                  <Lock className="w-8 h-8 text-[#55DDB5]" />
                </div>
                <h1 className="text-2xl font-bold font-syne">Nouveau mot de passe</h1>
                <p className="text-white/50 text-sm mt-1">Choisissez un mot de passe sécurisé</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Nouveau mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Mot de passe requis',
                        minLength: { value: 6, message: 'Minimum 6 caractères' }
                      })}
                      className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2AACB2] focus:border-transparent transition-all text-white"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#55DDB5] transition-colors">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Confirmer le mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword', {
                        required: 'Confirmation requise',
                        validate: value => value === password || 'Les mots de passe ne correspondent pas'
                      })}
                      className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2AACB2] focus:border-transparent transition-all text-white"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#55DDB5] transition-colors">
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 text-white rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
                  style={{ background: 'linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%)' }}
                >
                  {isLoading
                    ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <><span>Réinitialiser le mot de passe</span> <CheckCircle size={18} /></>
                  }
                </button>

                <div className="text-center">
                  <Link to="/login" className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-[#55DDB5] transition-colors">
                    <ArrowLeft size={14} /> Retour à la connexion
                  </Link>
                </div>
              </form>
            </motion.div>

            <div className="text-center mt-6 text-xs text-white/40">
              🔒 Utilisez un mot de passe unique et difficile à deviner
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ResetPassword