import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'

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
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
`;

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [tokenError, setTokenError] = useState(false)
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password')
  
  const token = searchParams.get('token')

  useEffect(() => {
    // Vérification de la présence du token (simulation)
    if (!token) {
      setTokenError(true)
    } else {
      // En production, vérifier la validité du token auprès du backend
      console.log(`Token reçu : ${token}`)
      // Simuler une validation de token (par exemple, non expiré)
      const isValid = token.startsWith('fake-token-')
      if (!isValid) setTokenError(true)
    }
  }, [token])

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    // Simulation d'appel API pour la réinitialisation
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log(`🔐 Réinitialisation du mot de passe pour le token : ${token}`)
    console.log(`Nouveau mot de passe : ${data.password}`)
    
    // En production, envoyer le token et le nouveau mot de passe au backend
    
    setIsSuccess(true)
    setIsLoading(false)
    
    // Redirection vers login après 3 secondes
    setTimeout(() => {
      navigate('/login')
    }, 3000)
  }

  // Affichage erreur token
  if (tokenError) {
    return (
      <>
        <style>{globalStyles}</style>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 text-center max-w-md"
          >
            <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold font-syne text-white mb-2">Lien invalide</h2>
            <p className="text-gray-300 mb-6">
              Le lien de réinitialisation est invalide ou a expiré.
            </p>
            <Link to="/forgot-password" className="inline-block px-6 py-2 bg-amber-500 rounded-xl hover:bg-amber-600 transition">
              Nouvelle demande
            </Link>
            <div className="mt-4">
              <Link to="/login" className="text-sm text-gray-400 hover:text-white">
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
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center max-w-md"
          >
            <div className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold font-syne text-white mb-2">Mot de passe modifié</h2>
            <p className="text-gray-300 mb-4">
              Votre mot de passe a été mis à jour avec succès.
            </p>
            <p className="text-sm text-gray-400">
              Redirection vers la page de connexion...
            </p>
            <Link to="/login" className="inline-block mt-6 text-blue-400 hover:text-blue-300">
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
      
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute w-96 h-96 bg-blue-600/20 top-20 -left-20 rounded-full filter blur-[80px] animate-float" />
        <div className="absolute w-72 h-72 bg-indigo-700/15 bottom-20 right-10 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-4">
                  <Lock className="w-8 h-8 text-blue-400" />
                </div>
                <h1 className="text-2xl font-bold font-syne">Nouveau mot de passe</h1>
                <p className="text-gray-400 text-sm mt-1">
                  Choisissez un mot de passe sécurisé
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nouveau mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', { 
                        required: 'Mot de passe requis', 
                        minLength: { value: 6, message: 'Minimum 6 caractères' } 
                      })}
                      className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Confirmer le mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword', { 
                        required: 'Confirmation requise', 
                        validate: value => value === password || 'Les mots de passe ne correspondent pas'
                      })}
                      className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Réinitialiser le mot de passe <CheckCircle size={18} /></>
                  )}
                </button>

                <div className="text-center">
                  <Link to="/login" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition">
                    <ArrowLeft size={14} /> Retour à la connexion
                  </Link>
                </div>
              </form>
            </motion.div>

            <div className="text-center mt-6 text-xs text-gray-500">
              🔒 Utilisez un mot de passe unique et difficile à deviner
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ResetPassword