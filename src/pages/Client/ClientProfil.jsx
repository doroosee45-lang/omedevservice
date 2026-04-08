import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock,
  Bell,
  CreditCard,
  Save,
  Eye,
  EyeOff,
  Shield,
  Camera,
  X,
  Upload
} from 'lucide-react'
import ClientSidebar from '../../components/ClientSidebar'
import ClientHeader from '../../components/ClientHeader'

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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

const Profil = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const fileInputRef = useRef(null)

  const [profile, setProfile] = useState({
    nom: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    telephone: '+243 555 503 59',
    adresse: 'Avenue Kabmabre n°75, Lingwala, Kinshasa'
  })

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const [notifications, setNotifications] = useState({
    devis: true,
    projets: true,
    messages: true,
    newsletter: false
  })

  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value })
  }

  const handleNotificationChange = (field) => {
    setNotifications({ ...notifications, [field]: !notifications[field] })
  }

  const handlePasswordChange = (field, value) => {
    setPasswords({ ...passwords, [field]: value })
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveAvatar = () => {
    setAvatarPreview(null)
    setAvatarFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Ici vous pouvez envoyer l'avatar et les données du profil à votre API
    if (avatarFile) {
      console.log('Nouvelle photo de profil:', avatarFile)
    }
    
    setSuccessMessage('Profil mis à jour avec succès !')
    setTimeout(() => setSuccessMessage(''), 3000)
    setIsLoading(false)
  }

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert('Les mots de passe ne correspondent pas')
      return
    }
    alert('Mot de passe changé avec succès !')
    setPasswords({ current: '', new: '', confirm: '' })
  }

  const tabs = [
    { id: 'profile', label: 'Informations personnelles', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Paiements', icon: CreditCard },
  ]

  // Initiales pour l'avatar par défaut
  const getInitials = () => {
    return profile.nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <>
      <style>{globalStyles}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        
        {/* Header */}
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
          {/* Sidebar */}
          <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
            <ClientSidebar />
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Main content */}
          <div className="flex-1 lg:ml-64">
            <main className="p-6 md:p-8">
              
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Mon profil</h1>
                <p className="text-gray-400 mt-1">Gérez vos informations personnelles et préférences</p>
              </motion.div>

              <div className="grid lg:grid-cols-4 gap-6">
                {/* Sidebar Tabs */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-1"
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                    {tabs.map((tab) => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                            activeTab === tab.id
                              ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30'
                              : 'text-gray-400 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{tab.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Main Content */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-3"
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                    
                    {/* Success Message */}
                    {successMessage && (
                      <div className="m-6 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm">
                        {successMessage}
                      </div>
                    )}

                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                      <div className="p-6">
                        {/* Avatar avec upload */}
                        <div className="flex flex-col items-center mb-8">
                          <div className="relative group">
                            {/* Avatar Container */}
                            <div 
                              className="w-28 h-28 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg overflow-hidden cursor-pointer"
                              onClick={handleAvatarClick}
                            >
                              {avatarPreview ? (
                                <img 
                                  src={avatarPreview} 
                                  alt="Avatar" 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                getInitials()
                              )}
                            </div>
                            
                            {/* Bouton upload */}
                            <button
                              onClick={handleAvatarClick}
                              className="absolute -bottom-2 -right-2 p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:scale-110 transition-all duration-300 group-hover:bg-blue-500/20"
                            >
                              <Camera className="w-4 h-4 text-blue-400" />
                            </button>
                            
                            {/* Bouton supprimer (si photo présente) */}
                            {avatarPreview && (
                              <button
                                onClick={handleRemoveAvatar}
                                className="absolute -top-2 -right-2 p-1.5 bg-red-500/80 backdrop-blur-sm rounded-full border border-white/20 hover:scale-110 transition-all duration-300"
                              >
                                <X className="w-3 h-3 text-white" />
                              </button>
                            )}
                          </div>
                          
                          <p className="text-xs text-gray-500 mt-3">
                            Cliquez sur l'avatar pour changer la photo
                          </p>
                          
                          {/* Input file caché */}
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/*"
                            className="hidden"
                          />
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Nom complet</label>
                            <input
                              type="text"
                              value={profile.nom}
                              onChange={(e) => handleProfileChange('nom', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Email</label>
                            <input
                              type="email"
                              value={profile.email}
                              onChange={(e) => handleProfileChange('email', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Téléphone</label>
                            <input
                              type="tel"
                              value={profile.telephone}
                              onChange={(e) => handleProfileChange('telephone', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Adresse</label>
                            <input
                              type="text"
                              value={profile.adresse}
                              onChange={(e) => handleProfileChange('adresse', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all"
                            />
                          </div>
                          <button
                            onClick={handleSaveProfile}
                            disabled={isLoading}
                            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                          >
                            {isLoading ? (
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <><Save className="w-4 h-4" /> Enregistrer</>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                      <div className="p-6">
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-blue-400" />
                            Changer le mot de passe
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm text-gray-400 mb-1">Mot de passe actuel</label>
                              <div className="relative">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  value={passwords.current}
                                  onChange={(e) => handlePasswordChange('current', e.target.value)}
                                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm text-gray-400 mb-1">Nouveau mot de passe</label>
                              <div className="relative">
                                <input
                                  type={showNewPassword ? 'text' : 'password'}
                                  value={passwords.new}
                                  onChange={(e) => handlePasswordChange('new', e.target.value)}
                                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm text-gray-400 mb-1">Confirmation</label>
                              <input
                                type="password"
                                value={passwords.confirm}
                                onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all"
                              />
                            </div>
                            <button
                              onClick={handleChangePassword}
                              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 rounded-xl font-semibold transition-all"
                            >
                              Changer le mot de passe
                            </button>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-white/10">
                          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-400" />
                            Sessions actives
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                              <div>
                                <p className="font-medium text-white">Chrome sur Windows</p>
                                <p className="text-sm text-gray-500">Kinshasa, RDC • Dernière activité: aujourd'hui</p>
                              </div>
                              <button className="text-red-400 text-sm hover:text-red-300 transition">Déconnecter</button>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                              <div>
                                <p className="font-medium text-white">Safari sur iPhone</p>
                                <p className="text-sm text-gray-500">Kinshasa, RDC • Il y a 2 jours</p>
                              </div>
                              <button className="text-red-400 text-sm hover:text-red-300 transition">Déconnecter</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                      <div className="p-6">
                        <div className="space-y-6">
                          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                            <div>
                              <h3 className="font-medium text-white">Notifications email</h3>
                              <p className="text-sm text-gray-500">Recevez les mises à jour par email</p>
                            </div>
                            <div
                              onClick={() => setNotifications({...notifications, email: !notifications.email})}
                              className={`w-12 h-6 rounded-full transition-all cursor-pointer ${notifications.email !== false ? 'bg-blue-500' : 'bg-white/20'}`}
                            >
                              <div className={`w-5 h-5 rounded-full bg-white transition-all mt-0.5 ${notifications.email !== false ? 'translate-x-6' : 'translate-x-0.5'}`} />
                            </div>
                          </div>

                          <div className="space-y-3 pl-4">
                            <div className="flex items-center justify-between py-2">
                              <span className="text-gray-300">Nouveaux devis</span>
                              <div
                                onClick={() => handleNotificationChange('devis')}
                                className={`w-12 h-6 rounded-full transition-all cursor-pointer ${notifications.devis ? 'bg-blue-500' : 'bg-white/20'}`}
                              >
                                <div className={`w-5 h-5 rounded-full bg-white transition-all mt-0.5 ${notifications.devis ? 'translate-x-6' : 'translate-x-0.5'}`} />
                              </div>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <span className="text-gray-300">Avancement des projets</span>
                              <div
                                onClick={() => handleNotificationChange('projets')}
                                className={`w-12 h-6 rounded-full transition-all cursor-pointer ${notifications.projets ? 'bg-blue-500' : 'bg-white/20'}`}
                              >
                                <div className={`w-5 h-5 rounded-full bg-white transition-all mt-0.5 ${notifications.projets ? 'translate-x-6' : 'translate-x-0.5'}`} />
                              </div>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <span className="text-gray-300">Nouveaux messages</span>
                              <div
                                onClick={() => handleNotificationChange('messages')}
                                className={`w-12 h-6 rounded-full transition-all cursor-pointer ${notifications.messages ? 'bg-blue-500' : 'bg-white/20'}`}
                              >
                                <div className={`w-5 h-5 rounded-full bg-white transition-all mt-0.5 ${notifications.messages ? 'translate-x-6' : 'translate-x-0.5'}`} />
                              </div>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <span className="text-gray-300">Newsletter OMDEVE</span>
                              <div
                                onClick={() => handleNotificationChange('newsletter')}
                                className={`w-12 h-6 rounded-full transition-all cursor-pointer ${notifications.newsletter ? 'bg-blue-500' : 'bg-white/20'}`}
                              >
                                <div className={`w-5 h-5 rounded-full bg-white transition-all mt-0.5 ${notifications.newsletter ? 'translate-x-6' : 'translate-x-0.5'}`} />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <div>
                              <h3 className="font-medium text-white">Notifications push</h3>
                              <p className="text-sm text-gray-500">Recevez des notifications sur votre navigateur</p>
                            </div>
                            <div className="w-12 h-6 rounded-full bg-white/20">
                              <div className="w-5 h-5 rounded-full bg-white transition-all mt-0.5 translate-x-0.5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Payment Tab */}
                    {activeTab === 'payment' && (
                      <div className="p-6">
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-blue-400" />
                            Moyens de paiement
                          </h3>
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                                  <CreditCard className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="font-medium text-white">Carte •••• 4242</p>
                                  <p className="text-xs text-gray-500">Expire le 12/28</p>
                                </div>
                              </div>
                              <div className="flex gap-3">
                                <button className="text-xs text-blue-400 hover:text-blue-300 transition">Modifier</button>
                                <button className="text-xs text-red-400 hover:text-red-300 transition">Supprimer</button>
                              </div>
                            </div>
                          </div>
                          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all">
                            Ajouter une carte
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profil