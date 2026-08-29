import { useState, useRef, useEffect } from 'react'
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
import axios from 'axios'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .omedev-vm {
    --omedev-navy: #053876;
    --omedev-blue-dark: #1D5B9B;
    --omedev-blue: #0B74C1;
    --omedev-blue-light: #4681B7;
    --omedev-cyan: #72A5CE;
    --omedev-cyan-light: #A6C3D7;
    --omedev-turquoise: #2AACB2;
    --omedev-energy: #55DDB5;
    --omedev-white: #F6F6F7;
    --omedev-gray: #D5DCE1;
    --omedev-dark: #0B1213;
    --omedev-text-secondary: #25364A;
    background: #F6F6F7;
    color: #0B1213;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }
  .omedev-vm * { box-sizing: border-box; }

  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
  .omedev-vm .animate-float { animation: float 6s ease-in-out infinite; }
`

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
    nom: localStorage.getItem('userName') || 'Jean Dupont',
    email: localStorage.getItem('userEmail') || 'jean.dupont@email.com',
    telephone: '',
    adresse: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      const baseURL = import.meta?.env?.VITE_API_URL || 'http://localhost:5000/api'
      axios.get(`${baseURL}/auth/profile`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          const u = res.data
          setProfile(p => ({
            ...p,
            nom: u.name || p.nom,
            email: u.email || p.email,
            telephone: u.phone || '',
            adresse: u.address || ''
          }))
          if (u.name) localStorage.setItem('userName', u.name)
          if (u.email) localStorage.setItem('userEmail', u.email)
        })
        .catch(() => {
          const name = localStorage.getItem('userName')
          const email = localStorage.getItem('userEmail')
          if (name || email) setProfile(p => ({ ...p, nom: name || p.nom, email: email || p.email }))
        })
    } else {
      const name = localStorage.getItem('userName')
      const email = localStorage.getItem('userEmail')
      if (name || email) setProfile(p => ({ ...p, nom: name || p.nom, email: email || p.email }))
    }
  }, [])

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
    try {
      const token = localStorage.getItem('accessToken')
      const baseURL = import.meta?.env?.VITE_API_URL || 'http://localhost:5000/api'
      await axios.put(`${baseURL}/auth/profile`, {
        name: profile.nom,
        email: profile.email,
        phone: profile.telephone,
        address: profile.adresse,
      }, { headers: { Authorization: `Bearer ${token}` } })
      localStorage.setItem('userName', profile.nom)
      localStorage.setItem('userEmail', profile.email)
      setSuccessMessage('Profil mis à jour avec succès !')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      console.error('Erreur mise à jour profil:', err)
      setSuccessMessage('Erreur lors de la mise à jour.')
      setTimeout(() => setSuccessMessage(''), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      alert('Les mots de passe ne correspondent pas')
      return
    }
    try {
      const token = localStorage.getItem('accessToken')
      const baseURL = import.meta?.env?.VITE_API_URL || 'http://localhost:5000/api'
      await axios.put(`${baseURL}/auth/change-password`, {
        currentPassword: passwords.current,
        newPassword: passwords.new,
      }, { headers: { Authorization: `Bearer ${token}` } })
      alert('Mot de passe changé avec succès !')
      setPasswords({ current: '', new: '', confirm: '' })
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors du changement de mot de passe.')
    }
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
    <div className="omedev-vm">
      <style>{globalStyles}</style>

      <div className="min-h-screen" style={{ background: '#F6F6F7' }}>

        {/* Header */}
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
          {/* Sidebar */}
          <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
            <ClientSidebar />
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-[#0B1213]/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
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
                <h1 className="text-2xl md:text-3xl font-bold text-[#053876] font-syne">Mon profil</h1>
                <p className="text-[#25364A]/70 mt-1">Gérez vos informations personnelles et préférences</p>
              </motion.div>

              <div className="grid lg:grid-cols-4 gap-6">
                {/* Sidebar Tabs */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-1"
                >
                  <div className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl p-4 shadow-[0_10px_30px_rgba(5,56,118,0.06)]">
                    {tabs.map((tab) => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                            activeTab === tab.id
                              ? 'bg-[#0B74C1]/12 text-[#0B74C1] border border-[#0B74C1]/30'
                              : 'text-[#25364A]/70 hover:bg-[#F6F6F7] hover:text-[#053876]'
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
                  <div className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(5,56,118,0.06)]">

                    {/* Success Message */}
                    {successMessage && (
                      <div className="m-6 p-3 bg-[#2AACB2]/15 border border-[#2AACB2]/30 rounded-xl text-[#2AACB2] text-sm">
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
                              className="w-28 h-28 rounded-2xl bg-gradient-to-r from-[#0B74C1] to-[#2AACB2] flex items-center justify-center text-white text-3xl font-bold shadow-lg overflow-hidden cursor-pointer"
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
                              className="absolute -bottom-2 -right-2 p-2 bg-[#F6F6F7] rounded-full border border-[rgba(5,56,118,0.18)] hover:scale-110 transition-all duration-300 group-hover:bg-[#0B74C1]/10"
                            >
                              <Camera className="w-4 h-4 text-[#0B74C1]" />
                            </button>

                            {/* Bouton supprimer (si photo présente) */}
                            {avatarPreview && (
                              <button
                                onClick={handleRemoveAvatar}
                                className="absolute -top-2 -right-2 p-1.5 bg-red-500/80 rounded-full border border-white/20 hover:scale-110 transition-all duration-300"
                              >
                                <X className="w-3 h-3 text-white" />
                              </button>
                            )}
                          </div>

                          <p className="text-xs text-[#25364A]/60 mt-3">
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
                            <label className="block text-sm text-[#25364A]/70 mb-1">Nom complet</label>
                            <input
                              type="text"
                              value={profile.nom}
                              onChange={(e) => handleProfileChange('nom', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(5,56,118,0.18)] text-[#0B1213] focus:outline-none focus:border-[#2AACB2] transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-[#25364A]/70 mb-1">Email</label>
                            <input
                              type="email"
                              value={profile.email}
                              onChange={(e) => handleProfileChange('email', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(5,56,118,0.18)] text-[#0B1213] focus:outline-none focus:border-[#2AACB2] transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-[#25364A]/70 mb-1">Téléphone</label>
                            <input
                              type="tel"
                              value={profile.telephone}
                              onChange={(e) => handleProfileChange('telephone', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(5,56,118,0.18)] text-[#0B1213] focus:outline-none focus:border-[#2AACB2] transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-[#25364A]/70 mb-1">Adresse</label>
                            <input
                              type="text"
                              value={profile.adresse}
                              onChange={(e) => handleProfileChange('adresse', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(5,56,118,0.18)] text-[#0B1213] focus:outline-none focus:border-[#2AACB2] transition-all"
                            />
                          </div>
                          <button
                            onClick={handleSaveProfile}
                            disabled={isLoading}
                            className="w-full mt-4 bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white py-3 rounded-full font-semibold transition-all duration-300 shadow-[0_10px_28px_rgba(11,116,193,0.2)] hover:shadow-[0_16px_36px_rgba(42,172,178,0.28)] flex items-center justify-center gap-2 disabled:opacity-70"
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
                          <h3 className="text-lg font-semibold text-[#053876] mb-4 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-[#0B74C1]" />
                            Changer le mot de passe
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm text-[#25364A]/70 mb-1">Mot de passe actuel</label>
                              <div className="relative">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  value={passwords.current}
                                  onChange={(e) => handlePasswordChange('current', e.target.value)}
                                  className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(5,56,118,0.18)] text-[#0B1213] focus:outline-none focus:border-[#2AACB2] transition-all pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#25364A]/50"
                                >
                                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm text-[#25364A]/70 mb-1">Nouveau mot de passe</label>
                              <div className="relative">
                                <input
                                  type={showNewPassword ? 'text' : 'password'}
                                  value={passwords.new}
                                  onChange={(e) => handlePasswordChange('new', e.target.value)}
                                  className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(5,56,118,0.18)] text-[#0B1213] focus:outline-none focus:border-[#2AACB2] transition-all pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#25364A]/50"
                                >
                                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm text-[#25364A]/70 mb-1">Confirmation</label>
                              <input
                                type="password"
                                value={passwords.confirm}
                                onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(5,56,118,0.18)] text-[#0B1213] focus:outline-none focus:border-[#2AACB2] transition-all"
                              />
                            </div>
                            <button
                              onClick={handleChangePassword}
                              className="w-full bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white py-3 rounded-xl font-semibold transition-all shadow-[0_10px_28px_rgba(11,116,193,0.2)]"
                            >
                              Changer le mot de passe
                            </button>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-[rgba(5,56,118,0.1)]">
                          <h3 className="text-lg font-semibold text-[#053876] mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-[#0B74C1]" />
                            Sessions actives
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-[#F6F6F7] border border-[rgba(5,56,118,0.12)]">
                              <div>
                                <p className="font-medium text-[#053876]">Chrome sur Windows</p>
                                <p className="text-sm text-[#25364A]/60">Kinshasa, RDC • Dernière activité: aujourd'hui</p>
                              </div>
                              <button className="text-red-500 text-sm hover:text-red-600 transition">Déconnecter</button>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-[#F6F6F7] border border-[rgba(5,56,118,0.12)]">
                              <div>
                                <p className="font-medium text-[#053876]">Safari sur iPhone</p>
                                <p className="text-sm text-[#25364A]/60">Kinshasa, RDC • Il y a 2 jours</p>
                              </div>
                              <button className="text-red-500 text-sm hover:text-red-600 transition">Déconnecter</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                      <div className="p-6">
                        <div className="space-y-6">
                          <div className="flex items-center justify-between p-4 rounded-xl bg-[#F6F6F7] border border-[rgba(5,56,118,0.12)]">
                            <div>
                              <h3 className="font-medium text-[#053876]">Notifications email</h3>
                              <p className="text-sm text-[#25364A]/60">Recevez les mises à jour par email</p>
                            </div>
                            <div
                              onClick={() => setNotifications({...notifications, email: !notifications.email})}
                              className={`w-12 h-6 rounded-full transition-all cursor-pointer ${notifications.email !== false ? 'bg-[#2AACB2]' : 'bg-[rgba(5,56,118,0.18)]'}`}
                            >
                              <div className={`w-5 h-5 rounded-full bg-white transition-all mt-0.5 ${notifications.email !== false ? 'translate-x-6' : 'translate-x-0.5'}`} />
                            </div>
                          </div>

                          <div className="space-y-3 pl-4">
                            <div className="flex items-center justify-between py-2">
                              <span className="text-[#25364A]">Nouveaux devis</span>
                              <div
                                onClick={() => handleNotificationChange('devis')}
                                className={`w-12 h-6 rounded-full transition-all cursor-pointer ${notifications.devis ? 'bg-[#2AACB2]' : 'bg-[rgba(5,56,118,0.18)]'}`}
                              >
                                <div className={`w-5 h-5 rounded-full bg-white transition-all mt-0.5 ${notifications.devis ? 'translate-x-6' : 'translate-x-0.5'}`} />
                              </div>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <span className="text-[#25364A]">Avancement des projets</span>
                              <div
                                onClick={() => handleNotificationChange('projets')}
                                className={`w-12 h-6 rounded-full transition-all cursor-pointer ${notifications.projets ? 'bg-[#2AACB2]' : 'bg-[rgba(5,56,118,0.18)]'}`}
                              >
                                <div className={`w-5 h-5 rounded-full bg-white transition-all mt-0.5 ${notifications.projets ? 'translate-x-6' : 'translate-x-0.5'}`} />
                              </div>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <span className="text-[#25364A]">Nouveaux messages</span>
                              <div
                                onClick={() => handleNotificationChange('messages')}
                                className={`w-12 h-6 rounded-full transition-all cursor-pointer ${notifications.messages ? 'bg-[#2AACB2]' : 'bg-[rgba(5,56,118,0.18)]'}`}
                              >
                                <div className={`w-5 h-5 rounded-full bg-white transition-all mt-0.5 ${notifications.messages ? 'translate-x-6' : 'translate-x-0.5'}`} />
                              </div>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <span className="text-[#25364A]">Newsletter OMDEVE</span>
                              <div
                                onClick={() => handleNotificationChange('newsletter')}
                                className={`w-12 h-6 rounded-full transition-all cursor-pointer ${notifications.newsletter ? 'bg-[#2AACB2]' : 'bg-[rgba(5,56,118,0.18)]'}`}
                              >
                                <div className={`w-5 h-5 rounded-full bg-white transition-all mt-0.5 ${notifications.newsletter ? 'translate-x-6' : 'translate-x-0.5'}`} />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-[rgba(5,56,118,0.1)]">
                            <div>
                              <h3 className="font-medium text-[#053876]">Notifications push</h3>
                              <p className="text-sm text-[#25364A]/60">Recevez des notifications sur votre navigateur</p>
                            </div>
                            <div className="w-12 h-6 rounded-full bg-[rgba(5,56,118,0.18)]">
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
                          <h3 className="text-lg font-semibold text-[#053876] mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-[#0B74C1]" />
                            Moyens de paiement
                          </h3>
                          <div className="p-4 rounded-xl bg-[#F6F6F7] border border-[rgba(5,56,118,0.12)] mb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#0B74C1] to-[#2AACB2] flex items-center justify-center">
                                  <CreditCard className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="font-medium text-[#053876]">Carte •••• 4242</p>
                                  <p className="text-xs text-[#25364A]/60">Expire le 12/28</p>
                                </div>
                              </div>
                              <div className="flex gap-3">
                                <button className="text-xs text-[#0B74C1] hover:text-[#053876] transition-colors">Modifier</button>
                                <button className="text-xs text-red-500 hover:text-red-600 transition">Supprimer</button>
                              </div>
                            </div>
                          </div>
                          <button className="w-full bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white py-3 rounded-xl font-semibold transition-all shadow-[0_10px_28px_rgba(11,116,193,0.2)]">
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
    </div>
  )
}

export default Profil
