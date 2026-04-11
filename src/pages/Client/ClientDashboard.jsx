import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FileText,
  FolderKanban,
  Clock,
  Euro,
  ArrowRight,
  User,
  Bell,
  Menu,
  X,
  History,
  CreditCard,
  Briefcase,
  MessageSquare
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const StatCard = ({ icon: Icon, title, value, color, trend, trendValue }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-cyan-500';
      case 'green': return 'from-emerald-500 to-teal-500';
      case 'orange': return 'from-orange-500 to-amber-500';
      case 'purple': return 'from-purple-500 to-pink-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  }

  return (
    <motion.div
      variants={fadeUp}
      className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/15"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getColorClasses()} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-full">
            +{trendValue}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white font-syne">{value}</div>
      <div className="text-gray-400 text-sm mt-1">{title}</div>
    </motion.div>
  )
}

const ClientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userName, setUserName] = useState('Client')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // Récupérer les informations de l'utilisateur connecté depuis localStorage
    const name = localStorage.getItem('userName')
    const email = localStorage.getItem('userEmail')

    if (name) {
      setUserName(name)
    } else {
      // Fallback: essayer de récupérer depuis les utilisateurs stockés
      const users = JSON.parse(localStorage.getItem('omdeve_users') || '[]')
      const userEmailStored = localStorage.getItem('userEmail')
      const user = users.find(u => u.email === userEmailStored)
      if (user && user.name) {
        setUserName(user.name)
      }
    }

    if (email) {
      setUserEmail(email)
    }
  }, [])

  const stats = [
    { icon: FileText, title: 'Demandes en cours', value: '3', color: 'blue' },
    { icon: FolderKanban, title: 'Projets actifs', value: '2', color: 'green' },
    { icon: Clock, title: 'En attente', value: '1', color: 'orange' },
    { icon: Euro, title: 'Total facturé', value: '12 450€', color: 'purple', trend: true, trendValue: '15' },
  ]

  const recentDemandes = [
    { id: 'DEV-001', service: 'Développement Digital', date: '15/04/2026', status: 'pending', amount: '5 000€' },
    { id: 'DEV-002', service: 'Réseau & Infrastructure', date: '10/04/2026', status: 'approved', amount: '3 200€' },
    { id: 'DEV-003', service: 'Sécurité', date: '05/04/2026', status: 'completed', amount: '2 800€' },
  ]

  const activeProjects = [
    { id: 'PRJ-001', name: 'Site E-commerce', progress: 75, status: 'in_progress', nextMilestone: 'Livraison prévue le 30/05' },
    { id: 'PRJ-002', name: 'Installation Réseau', progress: 40, status: 'in_progress', nextMilestone: 'Validation câblage' },
  ]

  const quickLinks = [
    { icon: FileText, label: 'Mes demandes', path: '/client/demandes', color: 'from-blue-500 to-cyan-500' },
    { icon: Briefcase, label: 'Mes projets', path: '/client/projets', color: 'from-emerald-500 to-teal-500' },
    { icon: History, label: 'Historique', path: '/client/historique', color: 'from-purple-500 to-pink-500' },
    { icon: User, label: 'Mon profil', path: '/client/profil', color: 'from-orange-500 to-amber-500' },
    { icon: CreditCard, label: 'Paiements', path: '/client/paiements', color: 'from-indigo-500 to-purple-500' },
    { icon: MessageSquare, label: 'Support', path: '/client/support', color: 'from-cyan-500 to-blue-500' },
  ]

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: 'En attente', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
      approved: { label: 'Approuvé', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
      completed: { label: 'Terminé', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      in_progress: { label: 'En cours', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    }
    return badges[status] || badges.pending
  }

  // Fonction pour obtenir les initiales du nom
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
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

              {/* Welcome Section avec nom dynamique */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">
                  Bonjour, {userName} ! 👋
                </h1>
                <p className="text-gray-400 mt-1">
                  Bienvenue sur votre espace client OMDEVE Services
                </p>
                {userEmail && (
                  <p className="text-xs text-gray-500 mt-1">{userEmail}</p>
                )}
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              >
                {stats.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Demands */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all"
                >
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-white">Dernières demandes</h2>
                      <Link to="/client/demandes" className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                        Voir tout
                      </Link>
                    </div>
                  </div>
                  <div className="divide-y divide-white/10">
                    {recentDemandes.map((demande, idx) => {
                      const status = getStatusBadge(demande.status)
                      return (
                        <motion.div
                          key={demande.id}
                          className="p-4 hover:bg-white/5 transition cursor-pointer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-white">{demande.id}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                              {status.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">{demande.service}</p>
                          <div className="flex items-center justify-between mt-2 text-sm">
                            <span className="text-gray-500">{demande.date}</span>
                            <span className="font-medium text-blue-400">{demande.amount}</span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Active Projects */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all"
                >
                  <div className="p-6 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-white">Projets en cours</h2>
                  </div>
                  <div className="p-6 space-y-6">
                    {activeProjects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white">{project.name}</h3>
                          <span className="text-sm font-medium text-blue-400">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full h-2"
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{project.nextMilestone}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Quick Links */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-8"
              >
                <h2 className="text-lg font-semibold text-white mb-4">Accès rapides</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {quickLinks.map((link, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all hover:-translate-y-1 group"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110`}>
                          <link.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{link.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Action CTA */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-8 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-6 border border-white/10"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white font-syne mb-1">Besoin d'un nouveau service ?</h3>
                    <p className="text-gray-400">Demandez un devis gratuitement en quelques clics</p>
                  </div>
                  <Link to="/demander-devis">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg"
                    >
                      Nouvelle demande
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClientDashboard