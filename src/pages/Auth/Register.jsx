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