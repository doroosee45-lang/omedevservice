import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, Lock, LogIn, Eye, EyeOff, Shield, Users } from 'lucide-react'

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

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()

  // Fonction pour forcer la création des utilisateurs par défaut
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
    console.log('✅ Utilisateurs par défaut créés:', defaultUsers)
    return defaultUsers
  }

  // Récupérer les utilisateurs depuis localStorage
  const getUsers = () => {
    const users = localStorage.getItem('omdeve_users')
    if (!users) {
      return initializeDefaultUsers()
    }
    const parsedUsers = JSON.parse(users)
    
    // Vérifier si l'admin existe, sinon le recréer
    const hasAdmin = parsedUsers.some(u => u.role === 'super_admin' || u.role === 'admin')
    if (!hasAdmin) {
      console.log('⚠️ Aucun admin trouvé, recréation...')
      return initializeDefaultUsers()
    }
    
    return parsedUsers
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError('')
    
    console.log('🔐 Tentative de connexion avec:', data.email)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const users = getUsers()
    console.log('📋 Tous les utilisateurs:', users.map(u => ({ email: u.email, role: u.role })))
    
    // Chercher l'utilisateur
    const user = users.find(u => u.email === data.email && u.password === data.password)
    
    console.log('👤 Utilisateur trouvé:', user ? { email: user.email, role: user.role } : 'Aucun')
    
    if (user) {
      if (user.status === 'inactive') {
        setError('Votre compte est désactivé. Veuillez contacter l\'administrateur.')
        setIsLoading(false)
        return
      }
      
      // Stocker les informations de session
      localStorage.setItem('accessToken', `fake-token-${Date.now()}`)
      localStorage.setItem('userRole', user.role)
      localStorage.setItem('userEmail', user.email)
      localStorage.setItem('userName', user.name)
      localStorage.setItem('userId', user.id)
      
      console.log('💾 Session stockée:', {
        role: user.role,
        email: user.email,
        name: user.name
      })
      
      // Redirection selon le rôle
      if (user.role === 'super_admin' || user.role === 'admin') {
        console.log('🚀 Redirection ADMIN vers /admin/dashboard')
        window.location.href = '/admin/dashboard'
      } else {
        console.log('🚀 Redirection CLIENT vers /client/dashboard')
        window.location.href = '/client/dashboard'
      }
    } else {
      setError('Email ou mot de passe incorrect')
      console.log('❌ Aucun utilisateur trouvé avec ces identifiants')
    }
    
    setIsLoading(false)
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
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      {...register('email', { required: 'Email requis', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email invalide' } })}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                      placeholder="votre@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Se connecter <LogIn size={18} /></>
                  )}
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
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div 
                      className="bg-white/5 rounded-lg p-2 text-center hover:bg-white/10 transition cursor-pointer"
                      onClick={() => {
                        const emailInput = document.querySelector('input[name="email"]')
                        const passwordInput = document.querySelector('input[name="password"]')
                        if (emailInput) emailInput.value = 'client@omdeve.com'
                        if (passwordInput) passwordInput.value = 'client123'
                      }}
                    >
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="w-3 h-3 text-emerald-400" />
                        <p className="text-emerald-400 font-medium">Client</p>
                      </div>
                      <p className="text-gray-500 text-xs">client@omdeve.com</p>
                      <p className="text-gray-500 text-xs">client123</p>
                    </div>
                    <div 
                      className="bg-white/5 rounded-lg p-2 text-center hover:bg-white/10 transition cursor-pointer"
                      onClick={() => {
                        const emailInput = document.querySelector('input[name="email"]')
                        const passwordInput = document.querySelector('input[name="password"]')
                        if (emailInput) emailInput.value = 'admin@omdeve.com'
                        if (passwordInput) passwordInput.value = 'admin123'
                      }}
                    >
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Shield className="w-3 h-3 text-purple-400" />
                        <p className="text-purple-400 font-medium">Admin</p>
                      </div>
                      <p className="text-gray-500 text-xs">admin@omdeve.com</p>
                      <p className="text-gray-500 text-xs">admin123</p>
                    </div>
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