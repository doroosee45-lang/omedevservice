import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react'

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

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    // Simulation d'appel API pour l'envoi de l'email de réinitialisation
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log(`📧 Email de réinitialisation envoyé à ${data.email}`)
    console.log(`🔗 Lien de réinitialisation (simulation): http://localhost:3000/reset-password?token=fake-token-${Date.now()}`)
    
    setSubmittedEmail(data.email)
    setEmailSent(true)
    setIsLoading(false)
  }

  if (emailSent) {
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
            <h2 className="text-2xl font-bold font-syne text-white mb-2">Email envoyé !</h2>
            <p className="text-gray-300 mb-4">
              Un lien de réinitialisation a été envoyé à <strong>{submittedEmail}</strong>.
            </p>
            <p className="text-sm text-gray-400">
              Cliquez sur le lien dans l'email pour définir un nouveau mot de passe.
            </p>
            <Link to="/login" className="inline-block mt-6 text-blue-400 hover:text-blue-300">
              Retour à la connexion →
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
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-4">
                  <Mail className="w-8 h-8 text-amber-400" />
                </div>
                <h1 className="text-2xl font-bold font-syne">Mot de passe oublié ?</h1>
                <p className="text-gray-400 text-sm mt-1">
                  Entrez votre email pour recevoir un lien de réinitialisation
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email requis', 
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email invalide' } 
                      })}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400"
                      placeholder="votre@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Envoyer le lien <Send size={18} /></>
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
              🔒 Un lien sécurisé vous sera envoyé par email
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ForgotPassword


import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, Lock, LogIn, Eye, EyeOff, Shield, Users } from 'lucide-react'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #e2e8f0; overflow-x: hidden; }
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
  .animate-float { animation: float 6s ease-in-out infinite; }
`

const Login = () => {
  // FIX : useNavigate pour la redirection (React Router-aware)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  const initializeDefaultUsers = () => {
    const defaultUsers = [
      {
        id: 1,
        name: 'Super Admin',
        email: 'admin@omdeve.com',
        phone: '+243 000 000 000',
        password: 'admin123',
        role: 'super_admin',
        status: 'active',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Jean Client',
        email: 'client@omdeve.com',
        phone: '+243 000 000 001',
        password: 'client123',
        role: 'client',
        status: 'active',
        createdAt: new Date().toISOString()
      }
    ]
    localStorage.setItem('omdeve_users', JSON.stringify(defaultUsers))
    return defaultUsers
  }

  const getUsers = () => {
    const stored = localStorage.getItem('omdeve_users')
    if (!stored) return initializeDefaultUsers()
    const parsed = JSON.parse(stored)
    const hasAdmin = parsed.some(u => u.role === 'super_admin' || u.role === 'admin')
    if (!hasAdmin) return initializeDefaultUsers()
    return parsed
  }

  // Remplir les champs démo via setValue (synchronise react-hook-form)
  const fillDemoAccount = (email, password) => {
    setValue('email', email, { shouldValidate: true })
    setValue('password', password, { shouldValidate: true })
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError('')

    await new Promise(resolve => setTimeout(resolve, 1000))

    const users = getUsers()
    const user = users.find(u => u.email === data.email && u.password === data.password)

    if (user) {
      if (user.status === 'inactive') {
        setError('Votre compte est désactivé. Veuillez contacter l\'administrateur.')
        setIsLoading(false)
        return
      }

      // Stocker la session
      localStorage.setItem('accessToken', `fake-token-${Date.now()}`)
      localStorage.setItem('userRole',  user.role)
      localStorage.setItem('userEmail', user.email)
      localStorage.setItem('userName',  user.name)
      localStorage.setItem('userId',    String(user.id))

      // FIX : navigate() au lieu de window.location.href
      // → garde React Router en vie, ProtectedRoute peut lire le localStorage immédiatement
      if (user.role === 'super_admin' || user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true })
      } else {
        navigate('/client/dashboard', { replace: true })
      }
    } else {
      setError('Email ou mot de passe incorrect')
      setIsLoading(false)
    }
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
                  <LogIn className="w-8 h-8 text-blue-400" />
                </div>
                <h1 className="text-2xl font-bold font-syne">Connexion</h1>
                <p className="text-gray-400 text-sm mt-1">Accédez à votre espace personnel</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email requis',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email invalide' }
                      })}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                      placeholder="votre@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Mot de passe */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', { required: 'Mot de passe requis' })}
                      className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
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

                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading
                    ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <><span>Se connecter</span> <LogIn size={18} /></>
                  }
                </button>

                <div className="text-center mt-4">
                  <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition">
                    Mot de passe oublié ?
                  </Link>
                </div>

                <div className="text-center text-sm text-gray-400">
                  Pas encore de compte ?{' '}
                  <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                    Créer un compte
                  </Link>
                </div>

                {/* Comptes de démonstration */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-xs text-center text-gray-500 mb-3">Comptes de démonstration :</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => fillDemoAccount('client@omdeve.com', 'client123')}
                      className="bg-white/5 rounded-lg p-2 text-center hover:bg-white/10 transition"
                    >
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 text-xs font-medium">Client</span>
                      </div>
                      <p className="text-gray-500 text-xs">client@omdeve.com</p>
                      <p className="text-gray-500 text-xs">client123</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemoAccount('admin@omdeve.com', 'admin123')}
                      className="bg-white/5 rounded-lg p-2 text-center hover:bg-white/10 transition"
                    >
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Shield className="w-3 h-3 text-purple-400" />
                        <span className="text-purple-400 text-xs font-medium">Admin</span>
                      </div>
                      <p className="text-gray-500 text-xs">admin@omdeve.com</p>
                      <p className="text-gray-500 text-xs">admin123</p>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    💡 Cliquez sur un compte pour le remplir automatiquement
                  </p>
                </div>

              </form>
            </motion.div>

            <div className="text-center mt-6 text-xs text-gray-500">
              🔒 Connexion sécurisée • Support 24/7
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login


import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { User, Mail, Phone, Lock, Eye, EyeOff, UserPlus, CheckCircle, Shield, Users } from 'lucide-react'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #e2e8f0; overflow-x: hidden; }
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
  .animate-float { animation: float 6s ease-in-out infinite; }
`

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [error, setError] = useState('')

  // FIX : register('role') dans le hook + setValue pour synchroniser avec les boutons
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: { role: 'client' }
  })

  const password = watch('password')
  const selectedRole = watch('role') // lecture réactive du rôle courant

  const getUsers = () => {
    const users = localStorage.getItem('omdeve_users')
    return users ? JSON.parse(users) : []
  }

  const saveUser = (user) => {
    const users = getUsers()
    users.push(user)
    localStorage.setItem('omdeve_users', JSON.stringify(users))
  }

  const emailExists = (email) => getUsers().some(u => u.email === email)

  const isFirstUser = () => getUsers().length === 0

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError('')

    await new Promise(resolve => setTimeout(resolve, 1500))

    if (emailExists(data.email)) {
      setError('Cet email est déjà utilisé. Veuillez vous connecter.')
      setIsLoading(false)
      return
    }

    // Premier utilisateur → super_admin automatiquement
    // Sinon on utilise data.role qui est maintenant correctement synchronisé
    const role = isFirstUser() ? 'super_admin' : data.role

    const newUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role,
      status: 'active',
      createdAt: new Date().toISOString()
    }

    saveUser(newUser)

    console.log(`✅ Utilisateur créé: ${newUser.email} | Rôle: ${newUser.role}`)

    setRegistered(true)
    setIsLoading(false)

    setTimeout(() => navigate('/login'), 3000)
  }

  // ── Écran de succès ───────────────────────────────────────────────
  if (registered) {
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
            <h2 className="text-2xl font-bold font-syne text-white mb-2">Inscription réussie !</h2>
            <p className="text-gray-300 mb-4">
              Votre compte a été créé. Redirection vers la connexion...
            </p>
            <Link to="/login" className="inline-block mt-2 text-blue-400 hover:text-blue-300 text-sm">
              Se connecter maintenant →
            </Link>
          </motion.div>
        </div>
      </>
    )
  }

  // ── Formulaire ────────────────────────────────────────────────────
  return (
    <>
      <style>{globalStyles}</style>

      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden min-h-screen flex items-center py-12">
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
                  <UserPlus className="w-8 h-8 text-blue-400" />
                </div>
                <h1 className="text-2xl font-bold font-syne">Créer un compte</h1>
                <p className="text-gray-400 text-sm mt-1">Rejoignez OMDEVE Services</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nom complet</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      {...register('name', { required: 'Nom requis', minLength: { value: 2, message: 'Minimum 2 caractères' } })}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email requis',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email invalide' }
                      })}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                      placeholder="contact@omdeve.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      {...register('phone', { required: 'Téléphone requis' })}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                      placeholder="+243 XXX XXX XXX"
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* Sélection du rôle — uniquement si ce n'est pas le premier utilisateur */}
                {!isFirstUser() ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Type de compte</label>

                    {/* FIX : champ role enregistré dans react-hook-form, boutons appellent setValue */}
                    <input type="hidden" {...register('role', { required: true })} />

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setValue('role', 'client', { shouldValidate: true })}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                          selectedRole === 'client'
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                            : 'bg-white/10 border-white/20 text-gray-400 hover:bg-white/20'
                        }`}
                      >
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">Client</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setValue('role', 'admin', { shouldValidate: true })}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                          selectedRole === 'admin'
                            ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                            : 'bg-white/10 border-white/20 text-gray-400 hover:bg-white/20'
                        }`}
                      >
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-medium">Administrateur</span>
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      {selectedRole === 'admin'
                        ? "⚠️ L'administrateur a accès à la gestion des utilisateurs, devis et projets."
                        : "✅ Le client a accès à son espace personnel, ses projets et demandes."}
                    </p>
                  </div>
                ) : (
                  /* Premier utilisateur : super_admin automatique */
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-purple-400" />
                      <p className="text-sm text-purple-300">
                        Premier utilisateur — vous serez automatiquement Super Admin
                      </p>
                    </div>
                  </div>
                )}

                {/* Mot de passe */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Mot de passe requis',
                        minLength: { value: 6, message: 'Minimum 6 caractères' }
                      })}
                      className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                </div>

                {/* Confirmation */}
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
                      className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading
                    ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <><span>Créer mon compte</span> <UserPlus size={18} /></>
                  }
                </button>

                <div className="text-center text-sm text-gray-400">
                  Déjà inscrit ?{' '}
                  <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Se connecter</Link>
                </div>

              </form>
            </motion.div>

            <div className="text-center mt-6 text-xs text-gray-500">
              🔒 Vos données sont confidentielles • Email de confirmation envoyé après inscription
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register

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





import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { User, Mail, Phone, Lock, Eye, EyeOff, UserPlus, CheckCircle, Shield, Users } from 'lucide-react'
import api from '../../services/api'   // ← import du service API centralisé

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #e2e8f0; overflow-x: hidden; }
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
  .animate-float { animation: float 6s ease-in-out infinite; }
`

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: { role: 'client' }
  })

  const password = watch('password')
  const selectedRole = watch('role')

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError('')

    try {
      // Appel réel à l'API backend
      const response = await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      })

      // Si l'inscription réussit, le backend renvoie l'utilisateur et un token
      if (response.data) {
        setRegistered(true)
        setTimeout(() => navigate('/login'), 3000)
      }
    } catch (err) {
      console.error('Erreur inscription:', err)
      const message = err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  // Écran de succès
  if (registered) {
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
            <h2 className="text-2xl font-bold font-syne text-white mb-2">Inscription réussie !</h2>
            <p className="text-gray-300 mb-4">
              Votre compte a été créé. Redirection vers la connexion...
            </p>
            <Link to="/login" className="inline-block mt-2 text-blue-400 hover:text-blue-300 text-sm">
              Se connecter maintenant →
            </Link>
          </motion.div>
        </div>
      </>
    )
  }

  // Formulaire
  return (
    <>
      <style>{globalStyles}</style>

      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden min-h-screen flex items-center py-12">
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
                  <UserPlus className="w-8 h-8 text-blue-400" />
                </div>
                <h1 className="text-2xl font-bold font-syne">Créer un compte</h1>
                <p className="text-gray-400 text-sm mt-1">Rejoignez OMDEVE Services</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nom complet</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      {...register('name', { required: 'Nom requis', minLength: { value: 2, message: 'Minimum 2 caractères' } })}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email requis',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email invalide' }
                      })}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                      placeholder="contact@omdeve.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      {...register('phone', { required: 'Téléphone requis' })}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                      placeholder="+243 XXX XXX XXX"
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* Sélection du rôle (si pas premier utilisateur – le backend gère le premier utilisateur comme super_admin) */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type de compte</label>
                  <input type="hidden" {...register('role')} />
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setValue('role', 'client', { shouldValidate: true })}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                        selectedRole === 'client'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : 'bg-white/10 border-white/20 text-gray-400 hover:bg-white/20'
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">Client</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue('role', 'admin', { shouldValidate: true })}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                        selectedRole === 'admin'
                          ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                          : 'bg-white/10 border-white/20 text-gray-400 hover:bg-white/20'
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Administrateur</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {selectedRole === 'admin'
                      ? "⚠️ L'administrateur a accès à la gestion des utilisateurs, devis et projets."
                      : "✅ Le client a accès à son espace personnel, ses projets et demandes."}
                  </p>
                </div>

                {/* Mot de passe */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Mot de passe requis',
                        minLength: { value: 6, message: 'Minimum 6 caractères' }
                      })}
                      className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                </div>

                {/* Confirmation */}
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
                      className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading
                    ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <><span>Créer mon compte</span> <UserPlus size={18} /></>
                  }
                </button>

                <div className="text-center text-sm text-gray-400">
                  Déjà inscrit ?{' '}
                  <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Se connecter</Link>
                </div>

              </form>
            </motion.div>

            <div className="text-center mt-6 text-xs text-gray-500">
              🔒 Vos données sont confidentielles • Email de confirmation envoyé après inscription
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register