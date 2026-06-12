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

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Download, 
  Printer,
  Calendar,
  Euro,
  Clock,
  User,
  FileText,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail
} from 'lucide-react'
import ClientSidebar from '../../components/ClientSidebar'
import ClientHeader from '../../components/ClientHeader'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const DemandeDetail = () => {
  const { id } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Simulation de données - À remplacer par appel API
  const demande = {
    id: id,
    service: 'Développement Digital',
    description: 'Site e-commerce complet avec paiement intégré, panier d\'achat, gestion de stock, et dashboard administrateur.',
    detailedDescription: `Le projet consiste à développer une plateforme e-commerce complète pour une boutique de vêtements. 
    Fonctionnalités requises :
    - Catalogue de produits avec filtres avancés
    - Panier d'achat et checkout
    - Intégration Stripe/PayPal
    - Dashboard administrateur (gestion produits, commandes, clients)
    - Espace client avec historique
    - SEO optimisé
    - Responsive design`,
    date: '15/04/2026',
    status: 'approved',
    amount: '5 000€',
    estimatedDelivery: '15/06/2026',
    technicalContact: 'Marc Technical',
    technicalEmail: 'marc@omedev.com',
    technicalPhone: '+243 555 503 60',
    timeline: [
      { step: 'Demande reçue', date: '15/04/2026', completed: true },
      { step: 'Analyse technique', date: '18/04/2026', completed: true },
      { step: 'Devis proposé', date: '20/04/2026', completed: true },
      { step: 'Début du projet', date: '25/04/2026', completed: true },
      { step: 'Livraison', date: '15/06/2026', completed: false },
    ]
  }

  const getStatusConfig = (status) => {
    const configs = {
      pending: { label: 'En attente', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
      approved: { label: 'Approuvé', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
      completed: { label: 'Terminé', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      rejected: { label: 'Refusé', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    }
    return configs[status] || configs.pending
  }

  const status = getStatusConfig(demande.status)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
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
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6 md:p-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link to="/client/demandes" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux demandes
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">{demande.id}</h1>
                <p className="text-gray-400 mt-1">{demande.service}</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 transition-all">
                  <Printer className="w-4 h-4" />
                  Imprimer
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all">
                  <Download className="w-4 h-4" />
                  Télécharger PDF
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">État de la demande</h2>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <div className="space-y-4">
                  {demande.timeline.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="relative">
                        {item.completed ? (
                          <CheckCircle className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-gray-500" />
                        )}
                        {index < demande.timeline.length - 1 && (
                          <div className={`absolute top-6 left-3 w-0.5 h-12 ${item.completed ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-white">{item.step}</p>
                        <p className="text-sm text-gray-400">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">Description détaillée</h2>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">{demande.detailedDescription}</p>
              </motion.div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Informations */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">Informations</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Date de demande</p>
                      <p className="font-medium text-white">{demande.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Euro className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Montant</p>
                      <p className="font-medium text-white">{demande.amount}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Livraison estimée</p>
                      <p className="font-medium text-white">{demande.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Technique */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">Contact technique</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Référent technique</p>
                      <p className="font-medium text-white">{demande.technicalContact}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-cyan-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="font-medium text-blue-400">{demande.technicalEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Téléphone</p>
                      <p className="font-medium text-white">{demande.technicalPhone}</p>
                    </div>
                  </div>
                </div>
                <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all">
                  <MessageCircle className="w-4 h-4" />
                  Contacter le support
                </button>
              </motion.div>

              {/* Documents */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">Documents</h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group">
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300 group-hover:text-white transition-colors">Devis_{demande.id}.pdf</span>
                    </span>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group">
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300 group-hover:text-white transition-colors">Cahier_des_charges.pdf</span>
                    </span>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DemandeDetail


import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Filter, Eye, Download, Calendar, Euro,
  Clock, CheckCircle, XCircle, AlertCircle, FileText,
  X, Send, MessageCircle, Building, User, MapPin,
  Phone, Mail, ChevronRight, Shield, TrendingUp,
  Package, Tag, Info, Printer
} from 'lucide-react'
import ClientSidebar from '../../components/ClientSidebar'
import ClientHeader from '../../components/ClientHeader'

/* ─── Styles globaux ──────────────────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #e2e8f0; overflow-x: hidden; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .modal-scroll::-webkit-scrollbar { width: 4px; }
  .modal-scroll::-webkit-scrollbar-track { background: transparent; }
  .modal-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
`

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
}
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 0.68, 0, 1] } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
}

/* ─── Entreprise ──────────────────────────────────────────────────────────── */
const ENTREPRISE = {
  nom: 'TechVision Solutions',
  siret: '842 391 027 00034',
  adresse: '14 Rue de la République, 75001 Paris',
  tel: '+33 1 42 86 00 00',
  email: 'contact@techvision.fr',
  tva: 'FR 83 842391027',
  logo: 'TV'
}

/* ─── Génération PDF devis ────────────────────────────────────────────────── */
const generateDevisPDF = async (demande) => {
  if (!window.jspdf) {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
      s.onload = resolve; s.onerror = reject
      document.head.appendChild(s)
    })
  }
  const { jsPDF } = window.jspdf
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210
  const navy=[15,23,42], blue=[59,130,246], cyan=[6,182,212], emerald=[16,185,129]
  const gray50=[248,250,252], gray100=[241,245,249], gray300=[203,213,225]
  const gray500=[100,116,139], gray700=[51,65,85], white=[255,255,255]

  // Fond
  doc.setFillColor(...white); doc.rect(0,0,W,297,'F')

  // Header navy
  doc.setFillColor(...navy); doc.rect(0,0,W,52,'F')
  doc.setFillColor(...blue); doc.rect(0,50,W,3,'F')

  // Logo
  doc.setFillColor(...blue); doc.circle(22,22,12,'F')
  doc.setTextColor(...white); doc.setFont('helvetica','bold'); doc.setFontSize(11)
  doc.text(ENTREPRISE.logo,22,26,{align:'center'})

  // Nom entreprise
  doc.setFontSize(18); doc.text(ENTREPRISE.nom,40,20)
  doc.setFont('helvetica','normal'); doc.setFontSize(8)
  doc.setTextColor(148,163,184)
  doc.text('Solutions Digitales & Infrastructures IT',40,27)

  // DEVIS + ID
  doc.setFont('helvetica','bold'); doc.setFontSize(26)
  doc.setTextColor(...white); doc.text('DEVIS',W-15,20,{align:'right'})
  doc.setFontSize(10); doc.setTextColor(...cyan)
  doc.text(demande.id,W-15,28,{align:'right'})

  // Badge statut
  const scfg = {
    pending:   { label:'EN ATTENTE', c:[245,158,11] },
    approved:  { label:'APPROUVE',   c:[16,185,129] },
    completed: { label:'TERMINE',    c:[59,130,246] },
    rejected:  { label:'REFUSE',     c:[239,68,68]  },
  }[demande.status] || { label:'EN ATTENTE', c:[245,158,11] }
  doc.setFillColor(...scfg.c)
  doc.roundedRect(W-52,33,37,10,2,2,'F')
  doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(...white)
  doc.text(scfg.label,W-33.5,39.5,{align:'center'})

  // Blocs info
  let y=65
  // Émetteur
  doc.setFillColor(...gray50); doc.roundedRect(12,y,85,46,3,3,'F')
  doc.setFillColor(...blue); doc.roundedRect(12,y,85,8,3,3,'F'); doc.rect(12,y+4,85,4,'F')
  doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...white)
  doc.text('EMETTEUR',20,y+5.5)
  doc.setFont('helvetica','bold'); doc.setFontSize(9.5); doc.setTextColor(...gray700)
  doc.text(ENTREPRISE.nom,17,y+15)
  doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(...gray500)
  ;[`SIRET : ${ENTREPRISE.siret}`,`TVA : ${ENTREPRISE.tva}`,ENTREPRISE.adresse,ENTREPRISE.tel,ENTREPRISE.email]
    .forEach((l,i)=>doc.text(l,17,y+22+i*5.5))

  // Client
  doc.setFillColor(...gray50); doc.roundedRect(110,y,88,46,3,3,'F')
  doc.setFillColor(...navy); doc.roundedRect(110,y,88,8,3,3,'F'); doc.rect(110,y+4,88,4,'F')
  doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...white)
  doc.text('CLIENT / DESTINATAIRE',118,y+5.5)
  doc.setFont('helvetica','bold'); doc.setFontSize(9.5); doc.setTextColor(...gray700)
  doc.text('Client Premium SAS',115,y+15)
  doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(...gray500)
  ;['Responsable : M. Jean Dupont','12 Avenue de l\'Innovation','69002 Lyon, France','contact@client.fr','+33 4 72 00 00 00']
    .forEach((l,i)=>doc.text(l,115,y+22+i*5.5))

  // Infos devis
  y=120
  doc.setFillColor(...gray100); doc.roundedRect(12,y,186,18,3,3,'F')
  ;[
    {x:25,label:"Date d'emission",val:demande.date},
    {x:82,label:"Validite",val:"30 jours"},
    {x:138,label:"Livraison estimee",val:demande.estimatedDelivery||'-'},
  ].forEach(({x,label,val})=>{
    doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...gray500)
    doc.text(label,x,y+6)
    doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...gray700)
    doc.text(val,x,y+13)
  })

  // Tableau
  y=148
  doc.setFillColor(...navy); doc.rect(12,y,186,9,'F')
  doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...white)
  doc.text('DESIGNATION',17,y+6)
  doc.text('QTE',120,y+6); doc.text('MONTANT HT',140,y+6); doc.text('TVA',168,y+6)
  doc.text('TOTAL TTC',W-15,y+6,{align:'right'})

  const montantTTC = parseFloat(demande.amount.replace(/[^0-9]/g,''))
  const montantHT  = Math.round(montantTTC/1.20)
  const tvaAmt     = montantTTC - montantHT

  const lignes=[
    {desc:`Prestation — ${demande.service}`,detail:demande.description.substring(0,70),qty:1,pu:montantHT,tva:'20%',total:montantTTC},
    {desc:'Suivi & support (1 mois)',detail:'Assistance technique post-livraison',qty:1,pu:0,tva:'20%',total:0},
  ]
  lignes.forEach((l,i)=>{
    const ly=y+9+i*16
    doc.setFillColor(i%2===0?255:250,i%2===0?255:251,i%2===0?255:253); doc.rect(12,ly,186,16,'F')
    doc.setFillColor(...blue); doc.rect(12,ly,2,16,'F')
    doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...gray700)
    doc.text(l.desc,17,ly+6)
    doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...gray500)
    doc.text(l.detail,17,ly+12)
    doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(...gray700)
    doc.text(String(l.qty),122,ly+8)
    doc.text(l.pu>0?`${l.pu.toLocaleString('fr-FR')} EUR`:'Inclus',140,ly+8)
    doc.text(l.tva,169,ly+8)
    doc.setFont('helvetica','bold')
    doc.text(l.total>0?`${l.total.toLocaleString('fr-FR')} EUR`:'0 EUR',W-15,ly+8,{align:'right'})
  })

  // Totaux
  y=y+9+lignes.length*16+6
  doc.setDrawColor(...gray300); doc.setLineWidth(0.3); doc.line(12,y,W-12,y)
  y+=6
  ;[{label:'Sous-total HT',val:`${montantHT.toLocaleString('fr-FR')} EUR`},{label:'TVA (20%)',val:`${tvaAmt.toLocaleString('fr-FR')} EUR`}]
    .forEach(({label,val})=>{
      doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(...gray500)
      doc.text(label,140,y)
      doc.setTextColor(...gray700); doc.text(val,W-15,y,{align:'right'})
      y+=7
    })
  doc.setFillColor(...navy); doc.roundedRect(120,y,78,14,3,3,'F')
  doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...white)
  doc.text('TOTAL TTC',128,y+9)
  doc.setFontSize(12); doc.setTextColor(...cyan)
  doc.text(`${montantTTC.toLocaleString('fr-FR')} EUR`,W-15,y+9,{align:'right'})

  // Conditions
  y+=22
  doc.setFillColor(...gray50); doc.roundedRect(12,y,186,22,3,3,'F')
  doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...navy)
  doc.text('CONDITIONS',17,y+7)
  doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(...gray500)
  doc.text('Ce devis est valable 30 jours. Acompte de 30% a la signature. Solde a la livraison.',17,y+14)
  doc.text(`Ref. devis : ${demande.id} — ${ENTREPRISE.nom} — SIRET ${ENTREPRISE.siret}`,17,y+19)

  // Footer
  doc.setFillColor(...navy); doc.rect(0,277,W,20,'F')
  doc.setFillColor(...blue); doc.rect(0,276,W,1.5,'F')
  doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(148,163,184)
  doc.text(`${ENTREPRISE.nom}  •  ${ENTREPRISE.adresse}`,W/2,284,{align:'center'})
  doc.text(`${ENTREPRISE.tel}  •  ${ENTREPRISE.email}`,W/2,290,{align:'center'})

  doc.save(`Devis-${demande.id}-${ENTREPRISE.nom.replace(/\s/g,'_')}.pdf`)
}

/* ─── Modal: Détails demande ──────────────────────────────────────────────── */
const ModalDetails = ({ demande, onClose, onDownload }) => {
  const statusMap = {
    pending:   { label: 'En attente', color: 'text-amber-400  bg-amber-500/15  border-amber-500/30',   icon: Clock,        desc: 'Votre demande est en cours d\'analyse par notre équipe.' },
    approved:  { label: 'Approuvé',   color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30', icon: CheckCircle,  desc: 'Votre devis a été approuvé. Les travaux vont démarrer prochainement.' },
    completed: { label: 'Terminé',    color: 'text-blue-400   bg-blue-500/15    border-blue-500/30',    icon: CheckCircle,  desc: 'Prestation terminée. Merci pour votre confiance !' },
    rejected:  { label: 'Refusé',     color: 'text-red-400    bg-red-500/15     border-red-500/30',     icon: XCircle,      desc: 'Votre demande n\'a pas pu être acceptée. Contactez-nous pour plus d\'informations.' },
  }
  const s = statusMap[demande.status] || statusMap.pending
  const StatusIcon = s.icon

  // Étapes du suivi
  const steps = [
    { label: 'Demande reçue',    done: true },
    { label: 'Analyse en cours', done: demande.status !== 'pending' },
    { label: 'Devis validé',     done: demande.status === 'approved' || demande.status === 'completed' },
    { label: 'En réalisation',   done: demande.status === 'completed' },
    { label: 'Livré',            done: demande.status === 'completed' },
  ]

  const montantTTC = parseFloat(demande.amount.replace(/[^0-9]/g,''))
  const montantHT  = Math.round(montantTTC / 1.20)
  const tvaAmt     = montantTTC - montantHT

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto modal-scroll"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/25 to-cyan-600/25 p-6 border-b border-white/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold text-white">{demande.service}</h2>
                  <span className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-0.5 rounded-full">{demande.id}</span>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.color}`}>
                  <StatusIcon className="w-3 h-3" /> {s.label}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all flex-shrink-0">
              <X className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">

          {/* Message statut */}
          <div className={`rounded-xl p-3 border ${s.color} flex items-start gap-2`}>
            <StatusIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{s.desc}</p>
          </div>

          {/* Description */}
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-2">Description de la demande</p>
            <p className="text-gray-300 text-sm leading-relaxed">{demande.description}</p>
          </div>

          {/* Infos clés */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">Date de demande</p>
              <p className="text-white font-semibold text-sm">{demande.date}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">Livraison estimée</p>
              <p className="text-white font-semibold text-sm">{demande.estimatedDelivery || '—'}</p>
            </div>
          </div>

          {/* Montant décomposé */}
          <div className="bg-white/5 rounded-xl overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wide">Détail financier</div>
            <div className="px-4 py-2 flex justify-between text-xs text-gray-400 border-b border-white/5">
              <span>Montant HT</span><span>{montantHT.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="px-4 py-2 flex justify-between text-xs text-gray-400 border-b border-white/5">
              <span>TVA 20%</span><span>+ {tvaAmt.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="px-4 py-3 bg-gradient-to-r from-emerald-600/15 to-teal-600/15 flex justify-between items-center">
              <span className="text-white font-bold text-sm">Total TTC</span>
              <span className="text-lg font-bold text-emerald-400">{demande.amount}</span>
            </div>
          </div>

          {/* Suivi étapes */}
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-3">Suivi de la demande</p>
            <div className="space-y-2">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${step.done ? 'bg-emerald-500' : 'bg-white/10 border border-white/20'}`}>
                    {step.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute" style={{ display: 'none' }} />
                  )}
                  <span className={`text-sm ${step.done ? 'text-white font-medium' : 'text-gray-500'}`}>{step.label}</span>
                  {step.done && <span className="text-xs text-emerald-400 ml-auto">✓</span>}
                </div>
              ))}
            </div>
            {/* Ligne de progression */}
            <div className="mt-3">
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full h-1.5 transition-all duration-700"
                  style={{ width: `${(steps.filter(s => s.done).length / steps.length) * 100}%` }} />
              </div>
              <p className="text-gray-500 text-xs mt-1">{steps.filter(s => s.done).length}/{steps.length} étapes complétées</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm hover:bg-white/10 transition-all">
            Fermer
          </button>
          {(demande.status === 'approved' || demande.status === 'completed') && (
            <button onClick={() => { onClose(); onDownload(demande) }}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold hover:scale-105 transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Télécharger PDF
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Modal: Télécharger PDF ──────────────────────────────────────────────── */
const ModalDownload = ({ demande, onClose }) => {
  const [status, setStatus] = useState('idle')

  const handleDownload = async () => {
    setStatus('loading')
    try {
      await generateDevisPDF(demande)
      setStatus('done')
      setTimeout(onClose, 1800)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Télécharger le devis</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <X className="w-4 h-4 text-gray-300" />
            </button>
          </div>

          <div className="bg-white/5 rounded-xl p-4 mb-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex flex-col items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
              <span className="text-white text-[9px] font-bold mt-0.5">PDF</span>
            </div>
            <div>
              <p className="text-white font-semibold">Devis-{demande.id}.pdf</p>
              <p className="text-gray-400 text-sm">{demande.service}</p>
              <p className="text-emerald-400 text-xs font-semibold mt-0.5">{demande.amount} TTC</p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-5 text-xs text-blue-300">
            📄 Devis professionnel avec détail HT/TVA, coordonnées, conditions et suivi de livraison.
          </div>

          {status === 'done' ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
              <p className="text-emerald-400 font-semibold">Téléchargement réussi !</p>
            </div>
          ) : status === 'error' ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <p className="text-red-400 text-sm">Erreur de génération</p>
              <button onClick={handleDownload} className="text-blue-400 text-xs underline">Réessayer</button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm hover:bg-white/10 transition-all">Annuler</button>
              <button onClick={handleDownload} disabled={status === 'loading'}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium hover:scale-105 transition-all disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2">
                {status === 'loading'
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Génération...</>
                  : <><Download className="w-4 h-4" /> Télécharger</>
                }
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Composant Principal ─────────────────────────────────────────────────── */
const Demandes = () => {
  const [sidebarOpen, setSidebarOpen]   = useState(false)
  const [searchTerm, setSearchTerm]     = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [modalDetails, setModalDetails] = useState(null)
  const [modalDownload, setModalDownload] = useState(null)

  const demandes = [
    { id: 'DEV-001', service: 'Développement Digital',   description: 'Site e-commerce complet avec paiement intégré, gestion de stock et livraison',                       date: '15/04/2026', status: 'pending',   amount: '5000€',  estimatedDelivery: '15/05/2026' },
    { id: 'DEV-002', service: 'Réseau & Infrastructure', description: 'Installation réseau complet pour 50 postes, câblage structuré et configuration VLAN',                 date: '10/04/2026', status: 'approved',  amount: '3200€',  estimatedDelivery: '10/05/2026' },
    { id: 'DEV-003', service: 'Sécurité',                description: 'Installation vidéosurveillance 16 caméras 4K avec enregistrement cloud',                             date: '05/04/2026', status: 'completed', amount: '2800€',  estimatedDelivery: '25/04/2026' },
    { id: 'DEV-004', service: 'Formation',               description: 'Formation Cybersécurité pour 10 personnes (5 jours)',                                                 date: '01/04/2026', status: 'rejected',  amount: '1500€',  estimatedDelivery: '-' },
    { id: 'DEV-005', service: 'Cloud & Hébergement',     description: 'Migration serveurs vers AWS + maintenance 24/7',                                                      date: '28/03/2026', status: 'approved',  amount: '4200€',  estimatedDelivery: '20/05/2026' },
    { id: 'DEV-006', service: 'Énergie & Équipements',   description: 'Installation 20 panneaux solaires + onduleurs',                                                      date: '20/03/2026', status: 'pending',   amount: '12500€', estimatedDelivery: '30/06/2026' },
  ]

  const getStatusConfig = (status) => ({
    pending:   { label: 'En attente', icon: Clock,        color: 'bg-amber-500/20  text-amber-400  border-amber-500/30'  },
    approved:  { label: 'Approuvé',   icon: CheckCircle,  color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    completed: { label: 'Terminé',    icon: CheckCircle,  color: 'bg-blue-500/20    text-blue-400    border-blue-500/30'   },
    rejected:  { label: 'Refusé',     icon: XCircle,      color: 'bg-red-500/20     text-red-400     border-red-500/30'    },
  }[status] || { label: 'En attente', icon: Clock, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' })

  const filteredDemandes = demandes.filter(d => {
    const matchSearch = d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        d.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === 'all' || d.status === statusFilter
    return matchSearch && matchStatus
  })

  // Stats rapides
  const stats = [
    { label: 'Total',      value: demandes.length, color: 'from-blue-500 to-cyan-500' },
    { label: 'En attente', value: demandes.filter(d => d.status === 'pending').length,   color: 'from-amber-500 to-orange-500' },
    { label: 'Approuvés',  value: demandes.filter(d => d.status === 'approved').length,  color: 'from-emerald-500 to-teal-500' },
    { label: 'Terminés',   value: demandes.filter(d => d.status === 'completed').length, color: 'from-purple-500 to-pink-500' },
  ]

  return (
    <>
      <style>{globalStyles}</style>

      <AnimatePresence>
        {modalDetails && (
          <ModalDetails demande={modalDetails}
            onClose={() => setModalDetails(null)}
            onDownload={d => { setModalDetails(null); setModalDownload(d) }} />
        )}
        {modalDownload && (
          <ModalDownload demande={modalDownload} onClose={() => setModalDownload(null)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
          <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
            <ClientSidebar />
          </div>
          {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

          <div className="flex-1 lg:ml-64">
            <main className="p-6 md:p-8">

              {/* Titre */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Mes demandes de devis</h1>
                <p className="text-gray-400 mt-1">Suivez l'état de vos demandes et devis</p>
              </motion.div>

              {/* Stats rapides */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible"
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <motion.div key={i} variants={fadeUp}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center gap-3 hover:border-blue-500/30 transition-all">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <span className="text-white font-bold text-lg">{stat.value}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Filtres */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="text" placeholder="Rechercher par numéro ou service..."
                      value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                      className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer">
                      <option value="all" className="bg-slate-800">Tous les statuts</option>
                      <option value="pending" className="bg-slate-800">En attente</option>
                      <option value="approved" className="bg-slate-800">Approuvés</option>
                      <option value="completed" className="bg-slate-800">Terminés</option>
                      <option value="rejected" className="bg-slate-800">Refusés</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Grille */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDemandes.map((demande) => {
                  const status = getStatusConfig(demande.status)
                  const StatusIcon = status.icon
                  return (
                    <motion.div key={demande.id} variants={fadeUp}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full group">

                      <div className="relative">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                        <div className="p-5 pb-3">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                                <FileText className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-xs text-gray-500 font-mono">{demande.id}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-blue-400" />
                              <span className="text-xs text-gray-400">{demande.date}</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-blue-300 transition-colors">
                            {demande.service}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2">{demande.description}</p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 flex-1 flex flex-col">
                        {/* Statut */}
                        <div className="mb-4">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                            <StatusIcon className="w-3 h-3" /> {status.label}
                          </span>
                        </div>

                        {/* Montant encadré */}
                        <div className="bg-white/5 rounded-xl p-3 mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-gray-500 text-xs mb-0.5">Montant TTC</p>
                            <p className="text-lg font-bold text-white">{demande.amount}</p>
                          </div>
                          <Euro className="w-6 h-6 text-emerald-400 opacity-40" />
                        </div>

                        {/* Livraison estimée si approuvé */}
                        {demande.status === 'approved' && (
                          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-amber-400" />
                              <div>
                                <p className="text-xs text-gray-400">Livraison estimée</p>
                                <p className="text-sm font-medium text-amber-400">{demande.estimatedDelivery}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex-1" />

                        {/* Actions */}
                        <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                          <button onClick={() => setModalDetails(demande)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium hover:scale-105 transition-all">
                            <Eye className="w-3.5 h-3.5" /> Détails
                          </button>
                          {(demande.status === 'approved' || demande.status === 'completed') && (
                            <button onClick={() => setModalDownload(demande)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-all">
                              <Download className="w-3.5 h-3.5" /> PDF
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Empty state */}
              {filteredDemandes.length === 0 && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white">Aucune demande trouvée</h3>
                  <p className="text-gray-500 mt-1">Essayez de modifier vos critères de recherche</p>
                </motion.div>
              )}

            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Demandes


import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  History as HistoryIcon,
  CheckCircle,
  Download,
  Eye,
  Search,
  Calendar,
  Euro,
  FileText,
  FolderKanban,
  GraduationCap,
  X,
  Clock,
  User,
  MapPin,
  Tag,
  Layers,
  ChevronRight,
  Shield,
  Wrench,
  Star,
  ArrowLeft
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
`

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 0.68, 0, 1] } },
  exit:   { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
}

/* ─── Infos entreprise ────────────────────────────────────────────────────── */
const ENTREPRISE = {
  nom:    'TechVision Solutions',
  siret:  '842 391 027 00034',
  adresse:'14 Rue de la République',
  ville:  '75001 Paris, France',
  tel:    '+33 1 42 86 00 00',
  email:  'contact@techvision.fr',
  site:   'www.techvision.fr',
  tva:    'FR 83 842391027',
  iban:   'FR76 3000 6000 0112 3456 7890 189',
  bic:    'BNPAFRPPXXX',
  banque: 'BNP Paribas',
  logo:   'TV'
}

/* ─── Détails étendus par item ────────────────────────────────────────────── */
const DETAILS = {
  'PRJ-001': {
    description: "Création complète d'une boutique en ligne avec gestion des stocks, panier, paiement Stripe et interface d'administration.",
    duree: '6 semaines',
    intervenant: 'Thomas Renard',
    lieu: 'Paris & Remote',
    phases: ['Analyse & cahier des charges','Maquettes UI/UX','Développement frontend','Développement backend','Tests & recette','Mise en production'],
    note: 5,
    technologies: ['React','Node.js','MongoDB','Stripe','AWS']
  },
  'PRJ-002': {
    description: 'Installation et configuration d\'un réseau LAN/Wi-Fi sécurisé pour bureaux de 50 postes avec VLAN et firewall.',
    duree: '3 semaines',
    intervenant: 'Karim Benali',
    lieu: 'Lyon',
    phases: ['Audit infrastructure existante','Plan réseau','Installation switchs & bornes','Configuration VLAN','Tests de débit & sécurité'],
    note: 5,
    technologies: ['Cisco','pfSense','UniFi','VLAN','802.1X']
  },
  'DEV-003': {
    description: "Fourniture et pose d'un système de vidéosurveillance IP avec 12 caméras, NVR et accès mobile sécurisé.",
    duree: '2 semaines',
    intervenant: 'Julie Moreau',
    lieu: 'Marseille',
    phases: ['Étude des points de surveillance','Installation caméras','Configuration NVR','Accès mobile & alertes','Formation utilisateurs'],
    note: 4,
    technologies: ['Hikvision','RTSP','H.265','VPN','iOS/Android']
  },
  'FRM-001': {
    description: 'Formation intensive de 2 jours sur les bonnes pratiques en cybersécurité : phishing, mots de passe, RGPD, réponse aux incidents.',
    duree: '2 jours',
    intervenant: 'Sarah Petit',
    lieu: 'Bordeaux',
    phases: ['Introduction aux menaces actuelles','Ateliers pratiques phishing','Gestion des mots de passe','Conformité RGPD','Exercice incident response'],
    note: 5,
    technologies: ['Phishing','RGPD','ISO 27001','KeePass','Awareness']
  },
  'PRJ-004': {
    description: "Migration complète de l'infrastructure on-premise vers AWS : serveurs, bases de données, sauvegardes et supervision.",
    duree: '10 semaines',
    intervenant: 'Antoine Leblanc',
    lieu: 'Remote',
    phases: ['Audit infrastructure existante','Architecture cible AWS','Migration base de données','Migration applicatif','Tests de bascule','Mise en production','Formation équipe IT'],
    note: 5,
    technologies: ['AWS','Terraform','Docker','RDS','CloudWatch','S3']
  },
  'DEV-005': {
    description: "Audit complet de la sécurité SI : tests d'intrusion, analyse des vulnérabilités, rapport de recommandations.",
    duree: '4 semaines',
    intervenant: 'Marc Duval',
    lieu: 'Remote & On-site',
    phases: ['Reconnaissance passive','Tests d\'intrusion périmètre','Audit postes clients','Analyse logs & SIEM','Rapport & recommandations','Plan de remédiation'],
    note: 5,
    technologies: ['Nmap','Metasploit','Burp Suite','Splunk','OWASP']
  }
}

/* ─── Génération PDF via jsPDF ────────────────────────────────────────────── */
const generateHistoriquePDF = async (item) => {
  if (!window.jspdf) {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
      s.onload = resolve
      s.onerror = reject
      document.head.appendChild(s)
    })
  }
  const { jsPDF } = window.jspdf
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210
  const details = DETAILS[item.id] || {}
  const montantNum = parseInt(item.amount.replace(/\D/g,''))
  const montantHT  = Math.round(montantNum / 1.20)
  const tvaAmt     = montantNum - montantHT

  const navy    = [15, 23, 42]
  const blue    = [59, 130, 246]
  const cyan    = [6, 182, 212]
  const emerald = [16, 185, 129]
  const gray50  = [248, 250, 252]
  const gray100 = [241, 245, 249]
  const gray300 = [203, 213, 225]
  const gray500 = [100, 116, 139]
  const gray700 = [51, 65, 85]
  const white   = [255, 255, 255]
  const purple  = [139, 92, 246]

  const typeColor = item.type === 'Formation' ? purple : item.type === 'Devis' ? emerald : blue

  // Fond blanc
  doc.setFillColor(...white)
  doc.rect(0, 0, W, 297, 'F')

  // Header navy
  doc.setFillColor(...navy)
  doc.rect(0, 0, W, 52, 'F')
  doc.setFillColor(...typeColor)
  doc.rect(0, 50, W, 3, 'F')

  // Logo
  doc.setFillColor(...typeColor)
  doc.circle(22, 22, 12, 'F')
  doc.setTextColor(...white)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text(ENTREPRISE.logo, 22, 26, { align: 'center' })

  // Nom entreprise
  doc.setFontSize(18)
  doc.setTextColor(...white)
  doc.text(ENTREPRISE.nom, 40, 20)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(148, 163, 184)
  doc.text('Solutions Digitales & Infrastructures IT', 40, 27)

  // Type doc + ID
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(...white)
  doc.text(`FACTURE ${item.type.toUpperCase()}`, W - 15, 20, { align: 'right' })
  doc.setFontSize(10)
  doc.setTextColor(...cyan)
  doc.text(item.id, W - 15, 28, { align: 'right' })

  // Badge TERMINE
  doc.setFillColor(...emerald)
  doc.roundedRect(W - 50, 33, 35, 10, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(...white)
  doc.text('TERMINE', W - 32.5, 39.5, { align: 'center' })

  // ── Blocs émetteur / client
  let y = 65
  const drawBloc = (x, w, col, titre, lines) => {
    doc.setFillColor(...gray50)
    doc.roundedRect(x, y, w, 50, 3, 3, 'F')
    doc.setFillColor(...col)
    doc.roundedRect(x, y, w, 8, 3, 3, 'F')
    doc.rect(x, y + 4, w, 4, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...white)
    doc.text(titre, x + 7, y + 5.5)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...gray700)
    doc.text(lines[0], x + 5, y + 15)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...gray500)
    lines.slice(1).forEach((l, i) => doc.text(l, x + 5, y + 22 + i * 6))
  }

  drawBloc(12, 85, blue, 'EMETTEUR', [
    ENTREPRISE.nom,
    `SIRET : ${ENTREPRISE.siret}`,
    `TVA : ${ENTREPRISE.tva}`,
    ENTREPRISE.adresse,
    ENTREPRISE.ville,
    ENTREPRISE.tel,
    ENTREPRISE.email
  ])

  drawBloc(110, 88, navy, 'CLIENT / DESTINATAIRE', [
    item.type === 'PRJ-001' ? 'Boutique Elegance SARL' : 'Client TechVision',
    `Responsable : M. Jean Dupont`,
    "12 Avenue de l'Innovation",
    '69002 Lyon, France',
    'contact@client.fr',
    '+33 4 72 00 00 00'
  ])

  // ── Infos mission
  y = 124
  doc.setFillColor(...gray100)
  doc.roundedRect(12, y, 186, 18, 3, 3, 'F')
  const infos = [
    { x: 25,  label: 'Date realisation', val: item.date },
    { x: 82,  label: 'Duree',           val: details.duree || 'N/A' },
    { x: 138, label: 'Reference',        val: item.id },
  ]
  infos.forEach(({ x, label, val }) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...gray500)
    doc.text(label, x, y + 6)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...gray700)
    doc.text(val, x, y + 13)
  })

  // ── Description
  y = 150
  doc.setFillColor(...gray50)
  doc.roundedRect(12, y, 186, 22, 3, 3, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...navy)
  doc.text('DESCRIPTION DE LA PRESTATION', 17, y + 7)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(...gray500)
  const desc = details.description || `Prestation — ${item.name}`
  const descLines = doc.splitTextToSize(desc, 175)
  descLines.slice(0,2).forEach((l, i) => doc.text(l, 17, y + 14 + i * 5))

  // ── Tableau
  y = 180
  doc.setFillColor(...navy)
  doc.rect(12, y, 186, 9, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...white)
  doc.text('DESIGNATION', 17, y + 6)
  doc.text('TYPE', 108, y + 6)
  doc.text('TVA', 145, y + 6)
  doc.text('MONTANT HT', W - 15, y + 6, { align: 'right' })

  const lignes = [
    { desc: item.name, type: item.type, tva: '20%', ht: montantHT },
    { desc: `Intervenant : ${details.intervenant || 'N/A'}`, type: 'Inclus', tva: '', ht: 0 },
  ]
  lignes.forEach((l, i) => {
    const ly = y + 9 + i * 15
    doc.setFillColor(i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 251, i % 2 === 0 ? 255 : 253)
    doc.rect(12, ly, 186, 15, 'F')
    doc.setFillColor(...typeColor)
    doc.rect(12, ly, 2, 15, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...gray700)
    doc.text(l.desc, 17, ly + 9)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...gray500)
    doc.text(l.type, 110, ly + 9)
    doc.text(l.tva, 147, ly + 9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...gray700)
    if (l.ht > 0) doc.text(`${l.ht.toLocaleString('fr-FR')} EUR`, W - 15, ly + 9, { align: 'right' })
  })

  // ── Totaux
  y = y + 9 + lignes.length * 15 + 4
  doc.setDrawColor(...gray300)
  doc.setLineWidth(0.3)
  doc.line(12, y, W - 12, y)
  y += 6
  ;[
    { label: 'Sous-total HT', val: `${montantHT.toLocaleString('fr-FR')} EUR` },
    { label: 'TVA (20%)',     val: `${tvaAmt.toLocaleString('fr-FR')} EUR` },
  ].forEach(({ label, val }) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...gray500)
    doc.text(label, 140, y)
    doc.setTextColor(...gray700)
    doc.text(val, W - 15, y, { align: 'right' })
    y += 7
  })
  doc.setFillColor(...navy)
  doc.roundedRect(120, y, 78, 14, 3, 3, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...white)
  doc.text('TOTAL TTC', 128, y + 9)
  doc.setFontSize(12)
  doc.setTextColor(...cyan)
  doc.text(`${montantNum.toLocaleString('fr-FR')} EUR`, W - 15, y + 9, { align: 'right' })

  // ── Statut REGLE
  y += 22
  doc.setFillColor(240, 253, 244)
  doc.roundedRect(12, y, 186, 18, 3, 3, 'F')
  doc.setFillColor(...emerald)
  doc.roundedRect(12, y, 186, 8, 3, 3, 'F')
  doc.rect(12, y + 4, 186, 4, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...white)
  doc.text('PRESTATION TERMINEE ET FACTURE REGLEE', W / 2, y + 6, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(21, 128, 61)
  doc.text(`Date : ${item.date}  •  Montant : ${item.amount} TTC  •  Reference : ${item.id}`, W / 2, y + 14, { align: 'center' })

  // ── Mentions légales
  y += 26
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...gray500)
  doc.text("En cas de retard de paiement, des penalites au taux legal seront appliquees (Art. L.441-10 du Code de commerce).", 12, y)
  doc.text("Pas d'escompte pour reglement anticipe. TVA acquittee sur les debits.", 12, y + 5)

  // ── Footer
  doc.setFillColor(...navy)
  doc.rect(0, 277, W, 20, 'F')
  doc.setFillColor(...typeColor)
  doc.rect(0, 276, W, 1.5, 'F')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(148, 163, 184)
  doc.text(`${ENTREPRISE.nom}  •  ${ENTREPRISE.adresse}, ${ENTREPRISE.ville}`, W / 2, 284, { align: 'center' })
  doc.text(`${ENTREPRISE.tel}  •  ${ENTREPRISE.email}  •  ${ENTREPRISE.site}`, W / 2, 290, { align: 'center' })
  doc.setFontSize(7)
  doc.setTextColor(100, 116, 139)
  doc.text('Page 1/1', W - 12, 294, { align: 'right' })

  doc.save(`Facture-${item.id}-${item.name.replace(/\s/g,'_')}.pdf`)
}

/* ─── Modal: Détails ──────────────────────────────────────────────────────── */
const ModalDetails = ({ item, onClose, onDownload }) => {
  const details  = DETAILS[item.id] || {}
  const typeColor = item.type === 'Formation' ? 'from-purple-500 to-pink-500'
    : item.type === 'Devis' ? 'from-emerald-500 to-teal-500'
    : 'from-blue-500 to-cyan-500'
  const typeText  = item.type === 'Formation' ? 'text-purple-400'
    : item.type === 'Devis' ? 'text-emerald-400'
    : 'text-blue-400'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${typeColor} flex items-center justify-center shadow-lg`}>
                {item.type === 'Projet' ? <FolderKanban className="w-5 h-5 text-white" />
                  : item.type === 'Devis' ? <FileText className="w-5 h-5 text-white" />
                  : <GraduationCap className="w-5 h-5 text-white" />}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{item.name}</h2>
                <p className="text-gray-400 text-sm font-mono">{item.id}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <X className="w-4 h-4 text-gray-300" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle className="w-3.5 h-3.5" /> Terminé
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${typeColor} bg-opacity-20 text-white`}>
              {item.type}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Description */}
          <div className="bg-white/5 rounded-xl p-4">
            <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${typeText}`}>Description</p>
            <p className="text-gray-300 text-sm leading-relaxed">{details.description || `Prestation — ${item.name}.`}</p>
          </div>

          {/* Infos clés */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Calendar,  label: 'Date',        val: item.date },
              { icon: Clock,     label: 'Durée',        val: details.duree || 'N/A' },
              { icon: User,      label: 'Intervenant',  val: details.intervenant || 'N/A' },
              { icon: MapPin,    label: 'Lieu',         val: details.lieu || 'N/A' },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="bg-white/5 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-3.5 h-3.5 text-gray-500" />
                  <p className="text-gray-500 text-xs">{label}</p>
                </div>
                <p className="text-white font-semibold text-sm">{val}</p>
              </div>
            ))}
          </div>

          {/* Phases */}
          {details.phases && (
            <div className="bg-white/5 rounded-xl p-4">
              <p className={`text-xs font-bold uppercase tracking-wide mb-3 ${typeText}`}>Phases réalisées</p>
              <div className="space-y-2">
                {details.phases.map((phase, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-gray-300 text-sm">{phase}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          {details.technologies && (
            <div className="bg-white/5 rounded-xl p-4">
              <p className={`text-xs font-bold uppercase tracking-wide mb-3 ${typeText}`}>Technologies & outils</p>
              <div className="flex flex-wrap gap-2">
                {details.technologies.map(tech => (
                  <span key={tech} className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${typeColor} text-white shadow-sm`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Note satisfaction */}
          {details.note && (
            <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs mb-1">Satisfaction client</p>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(n => (
                    <Star key={n} className={`w-4 h-4 ${n <= details.note ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs mb-1">Montant total</p>
                <p className="text-xl font-bold text-white">{item.amount}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm hover:bg-white/10 transition-all">
            Fermer
          </button>
          <button onClick={() => { onClose(); onDownload(item) }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold hover:scale-105 transition-all shadow-lg">
            <Download className="w-4 h-4" /> Télécharger Facture
          </button>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Modal: Télécharger PDF ──────────────────────────────────────────────── */
const ModalTelecharger = ({ item, onClose }) => {
  const [status, setStatus] = useState('idle')

  const handleDownload = async () => {
    setStatus('loading')
    try {
      await generateHistoriquePDF(item)
      setStatus('done')
      setTimeout(onClose, 2000)
    } catch {
      setStatus('error')
    }
  }

  const typeColor = item.type === 'Formation' ? 'from-purple-500 to-pink-500'
    : item.type === 'Devis' ? 'from-emerald-500 to-teal-500'
    : 'from-blue-500 to-cyan-500'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Télécharger la facture</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <X className="w-4 h-4 text-gray-300" />
            </button>
          </div>

          <div className="bg-white/5 rounded-xl p-4 mb-5 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex flex-col items-center justify-center shadow-lg`}>
              <FileText className="w-6 h-6 text-white" />
              <span className="text-white text-[9px] font-bold mt-0.5">PDF</span>
            </div>
            <div>
              <p className="text-white font-semibold">Facture-{item.id}.pdf</p>
              <p className="text-gray-400 text-sm">{item.name}</p>
              <p className="text-emerald-400 text-xs font-semibold mt-0.5">{item.amount} TTC</p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-5 text-xs text-blue-300">
            📄 Facture professionnelle avec détails de la prestation, HT/TVA, coordonnées et mentions légales.
          </div>

          {status === 'done' ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
              <p className="text-emerald-400 font-semibold">Téléchargement réussi !</p>
            </div>
          ) : status === 'error' ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <X className="w-8 h-8 text-red-400" />
              <p className="text-red-400 text-sm">Erreur lors de la génération</p>
              <button onClick={handleDownload} className="text-blue-400 text-xs underline">Réessayer</button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm hover:bg-white/10 transition-all">
                Annuler
              </button>
              <button onClick={handleDownload} disabled={status === 'loading'}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium hover:scale-105 transition-all disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2">
                {status === 'loading'
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Génération...</>
                  : <><Download className="w-4 h-4" /> Télécharger PDF</>
                }
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Composant Principal ─────────────────────────────────────────────────── */
const Historique = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm]   = useState('')
  const [yearFilter, setYearFilter]   = useState('all')
  const [modalDetails, setModalDetails]     = useState(null)
  const [modalDownload, setModalDownload]   = useState(null)

  const historique = [
    { id: 'PRJ-001', name: 'Site E-commerce',       type: 'Projet',    date: '15/12/2025', status: 'completed', amount: '5 000€', icon: FolderKanban },
    { id: 'PRJ-002', name: 'Installation Réseau',    type: 'Projet',    date: '10/11/2025', status: 'completed', amount: '3 200€', icon: FolderKanban },
    { id: 'DEV-003', name: 'Vidéosurveillance',      type: 'Devis',     date: '05/10/2025', status: 'completed', amount: '2 800€', icon: FileText },
    { id: 'FRM-001', name: 'Formation Cybersécurité', type: 'Formation', date: '20/09/2025', status: 'completed', amount: '1 500€', icon: GraduationCap },
    { id: 'PRJ-004', name: 'Migration Cloud',         type: 'Projet',    date: '01/08/2025', status: 'completed', amount: '8 500€', icon: FolderKanban },
    { id: 'DEV-005', name: 'Audit Sécurité',          type: 'Devis',     date: '15/07/2025', status: 'completed', amount: '4 200€', icon: FileText },
  ]

  const filteredHistorique = historique.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear   = yearFilter === 'all' || item.date.includes(yearFilter)
    return matchesSearch && matchesYear
  })

  const years = ['all', '2025', '2024', '2023']

  const getTypeColor = (type) => {
    switch(type) {
      case 'Projet':    return 'from-blue-500 to-cyan-500'
      case 'Devis':     return 'from-emerald-500 to-teal-500'
      case 'Formation': return 'from-purple-500 to-pink-500'
      default:          return 'from-blue-500 to-cyan-500'
    }
  }

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Projet':    return <FolderKanban className="w-3 h-3" />
      case 'Devis':     return <FileText className="w-3 h-3" />
      case 'Formation': return <GraduationCap className="w-3 h-3" />
      default:          return <FolderKanban className="w-3 h-3" />
    }
  }

  return (
    <>
      <style>{globalStyles}</style>

      {/* Modals */}
      <AnimatePresence>
        {modalDetails && (
          <ModalDetails item={modalDetails}
            onClose={() => setModalDetails(null)}
            onDownload={item => { setModalDetails(null); setModalDownload(item) }} />
        )}
        {modalDownload && (
          <ModalTelecharger item={modalDownload} onClose={() => setModalDownload(null)} />
        )}
      </AnimatePresence>

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
                <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Historique</h1>
                <p className="text-gray-400 mt-1">Consultez l'historique de vos projets et interventions</p>
              </motion.div>

              {/* Filters */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-6"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Rechercher par nom ou numéro..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                  >
                    {years.map(year => (
                      <option key={year} value={year} className="bg-slate-800">
                        {year === 'all' ? 'Toutes les années' : year}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>

              {/* Grid 3 colonnes */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredHistorique.map((item) => {
                  const typeColor = getTypeColor(item.type)
                  return (
                    <motion.div
                      key={item.id}
                      variants={fadeUp}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full"
                    >
                      {/* Header with gradient bar */}
                      <div className="relative">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                        <div className="p-5 pb-3">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${typeColor} flex items-center justify-center shadow-lg`}>
                                {getTypeIcon(item.type)}
                              </div>
                              <span className="text-xs text-gray-500 font-mono">{item.id}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-blue-400" />
                              <span className="text-xs text-gray-400">{item.date}</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${typeColor} bg-opacity-20 text-white`}>
                              {getTypeIcon(item.type)}
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 pt-0 flex-1 flex flex-col">
                        {/* Amount */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Euro className="w-4 h-4 text-emerald-400" />
                            <span className="text-2xl font-bold text-white">{item.amount}</span>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm text-gray-400">Terminé</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                          <button
                            onClick={() => setModalDetails(item)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50 transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Détails
                          </button>
                          <button
                            onClick={() => setModalDownload(item)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium hover:scale-105 transition-all"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Facture
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Empty State */}
              {filteredHistorique.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
                >
                  <HistoryIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white">Aucun historique trouvé</h3>
                  <p className="text-gray-500 mt-1">Essayez de modifier vos critères de recherche</p>
                </motion.div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Historique


// ==================== ClientMessagerie.jsx ====================
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Send, 
  Paperclip,
  Search,
  User,
  Plus,
  Menu,
  X,
  Mail,
  Phone,
  Building,
  XCircle
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

// Modal Nouvelle Conversation
const NewConversationModal = ({ isOpen, onClose, onCreateConversation }) => {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!subject.trim() || !message.trim()) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onCreateConversation({
      id: Date.now(),
      subject,
      firstMessage: message,
      date: 'À l\'instant',
      unread: 1,
      avatar: 'N'
    })
    
    setSubject('')
    setMessage('')
    setIsSubmitting(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Nouvelle conversation</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Sujet *</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex: Demande d'information, Support technique..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Message *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              placeholder="Décrivez votre demande..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 text-gray-400 hover:bg-white/20 transition"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={!subject.trim() || !message.trim() || isSubmitting}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Envoi...
              </div>
            ) : (
              'Envoyer'
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

const ClientMessagerie = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [showNewConversationModal, setShowNewConversationModal] = useState(false)
  const fileInputRef = useRef(null)

  const [conversations, setConversations] = useState([
    { id: 1, subject: 'Devis DEV-001', lastMessage: 'Bonjour, je vous confirme la réception de votre devis.', date: 'Il y a 2h', unread: 2, avatar: 'S' },
    { id: 2, subject: 'Projet Site E-commerce', lastMessage: 'Le développement front-end avance bien.', date: 'Hier', unread: 0, avatar: 'T' },
    { id: 3, subject: 'Support technique', lastMessage: 'Votre problème a été résolu.', date: 'Il y a 3j', unread: 0, avatar: 'S' },
  ])

  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: 'client', message: 'Bonjour, pouvez-vous me faire un devis pour un site e-commerce ?', time: '10:30', date: '15/04/2026' },
      { id: 2, sender: 'support', message: 'Bonjour, voici le devis demandé. N\'hésitez pas si vous avez des questions.', time: '10:45', date: '15/04/2026', attachment: 'devis.pdf' },
      { id: 3, sender: 'client', message: 'Merci, je vais étudier cela.', time: '11:00', date: '15/04/2026' },
    ],
    2: [
      { id: 1, sender: 'support', message: 'Bonjour, le projet Site E-commerce a démarré. La maquette est en cours.', time: '09:00', date: '14/04/2026' },
      { id: 2, sender: 'client', message: 'Super, merci pour l\'information !', time: '09:30', date: '14/04/2026' },
    ],
    3: [
      { id: 1, sender: 'client', message: 'Bonjour, j\'ai un problème avec mon réseau.', time: '14:00', date: '12/04/2026' },
      { id: 2, sender: 'support', message: 'Pouvez-vous décrire le problème plus précisément ?', time: '14:15', date: '12/04/2026' },
      { id: 3, sender: 'client', message: 'La connexion est très lente depuis ce matin.', time: '14:20', date: '12/04/2026' },
      { id: 4, sender: 'support', message: 'Nous avons identifié le problème. C\'est résolu.', time: '15:00', date: '12/04/2026' },
    ],
  })

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const newMsg = {
        id: messages[selectedConversation].length + 1,
        sender: 'client',
        message: newMessage,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString('fr-FR')
      }
      
      setMessages({
        ...messages,
        [selectedConversation]: [...messages[selectedConversation], newMsg]
      })
      
      // Mettre à jour le dernier message dans la liste des conversations
      setConversations(conversations.map(conv => 
        conv.id === selectedConversation 
          ? { ...conv, lastMessage: newMessage, date: 'À l\'instant' }
          : conv
      ))
      
      setNewMessage('')
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleCreateConversation = (newConv) => {
    const newId = newConv.id
    setConversations([newConv, ...conversations])
    setMessages({
      ...messages,
      [newId]: [
        { id: 1, sender: 'client', message: newConv.firstMessage, time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }), date: new Date().toLocaleDateString('fr-FR') }
      ]
    })
    setSelectedConversation(newId)
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
                <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Messagerie</h1>
                <p className="text-gray-400 mt-1">Échangez avec le support OMDEVE</p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Conversations List */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-white/10">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="divide-y divide-white/10 max-h-[500px] overflow-y-auto">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv.id)}
                        className={`p-4 cursor-pointer transition-all hover:bg-white/10 ${
                          selectedConversation === conv.id ? 'bg-blue-500/20 border-l-4 border-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{conv.avatar}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-white truncate">{conv.subject}</h3>
                              <span className="text-xs text-gray-500">{conv.date}</span>
                            </div>
                            <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                          </div>
                        </div>
                        {conv.unread > 0 && (
                          <div className="mt-2">
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full">
                              {conv.unread}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-white/10">
                    <button
                      onClick={() => setShowNewConversationModal(true)}
                      className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Nouvelle conversation
                    </button>
                  </div>
                </motion.div>

                {/* Messages Area */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden flex flex-col"
                  style={{ minHeight: '550px' }}
                >
                  {selectedConversation ? (
                    <>
                      {/* Messages Header */}
                      <div className="p-4 border-b border-white/10 bg-white/5">
                        <h3 className="font-semibold text-white">
                          {conversations.find(c => c.id === selectedConversation)?.subject}
                        </h3>
                      </div>

                      {/* Messages List */}
                      <div className="flex-1 p-4 space-y-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
                        {messages[selectedConversation]?.map((msg, idx) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: msg.sender === 'client' ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[75%] ${msg.sender === 'client' ? 'order-2' : 'order-1'}`}>
                              <div className={`p-3 rounded-2xl ${
                                msg.sender === 'client'
                                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                                  : 'bg-white/10 text-gray-300'
                              }`}>
                                <p className="text-sm">{msg.message}</p>
                                {msg.attachment && (
                                  <div className="mt-2 flex items-center gap-2 text-xs opacity-80">
                                    <Paperclip className="w-3 h-3" />
                                    <span>{msg.attachment}</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t border-white/10 bg-white/5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleFileUpload}
                            className="p-2 rounded-lg bg-white/10 text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-all"
                          >
                            <Paperclip className="w-5 h-5" />
                          </button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={(e) => console.log('Fichier:', e.target.files[0])}
                          />
                          <input
                            type="text"
                            placeholder="Votre message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                          />
                          <button
                            onClick={handleSendMessage}
                            className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all"
                          >
                            <Send className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-white">Aucune conversation sélectionnée</h3>
                        <p className="text-gray-500 mt-1">Choisissez une conversation ou créez-en une nouvelle</p>
                        <button
                          onClick={() => setShowNewConversationModal(true)}
                          className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all"
                        >
                          Nouvelle conversation
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Modal Nouvelle Conversation */}
      <NewConversationModal
        isOpen={showNewConversationModal}
        onClose={() => setShowNewConversationModal(false)}
        onCreateConversation={handleCreateConversation}
      />
    </>
  )
}

export default ClientMessagerie


import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CreditCard, Download, Eye, Search, Calendar, Euro,
  CheckCircle, Clock, AlertCircle, Plus, Wallet, X,
  FileText, Building, ArrowLeft, Lock, Shield, ChevronRight
} from 'lucide-react'
import ClientSidebar from '../../components/ClientSidebar'
import ClientHeader from '../../components/ClientHeader'

/* ─── Styles globaux ──────────────────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #e2e8f0; overflow-x: hidden; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
  .animate-float { animation: float 6s ease-in-out infinite; }
`

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
}
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 0.68, 0, 1] } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
}

/* ─── Infos entreprise ────────────────────────────────────────────────────── */
const ENTREPRISE = {
  nom: 'Omedev services',
  siret: '2325689',
  adresse: 'avenue kabambare n° 75',
  ville: 'Kinshasa, RDC',
  tel: '+21655550359',
  email: 'omedeveservices@gmail.com',
  site: 'www.omedeveservices.com',
  tva: ' 83 842391027',
  iban: 'DRC76 3000 6000 0112 3456 7890 189',
  bic: 'BNPAFRPPXXX',
  banque: 'BNP kinshasa',
  logo: 'TV'
}

/* ─── Nom client selon projet ─────────────────────────────────────────────── */
const getClientNom = (projet) => {
  if (projet.includes('E-commerce')) return 'Boutique Élégance SARL'
  if (projet.includes('Réseau'))     return 'Infra Conseil SAS'
  if (projet.includes('Cloud'))      return 'DataFlow Technologies'
  return 'Cyber Protect Group'
}

/* ─── Génération PDF via jsPDF ────────────────────────────────────────────── */
const generateInvoicePDF = async (paiement) => {
  if (!window.jspdf) {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
      s.onload = resolve
      s.onerror = reject
      document.head.appendChild(s)
    })
  }
  const { jsPDF } = window.jspdf
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210

  const navy    = [15, 23, 42]
  const blue    = [59, 130, 246]
  const cyan    = [6, 182, 212]
  const emerald = [16, 185, 129]
  const gray50  = [248, 250, 252]
  const gray100 = [241, 245, 249]
  const gray300 = [203, 213, 225]
  const gray500 = [100, 116, 139]
  const gray700 = [51, 65, 85]
  const white   = [255, 255, 255]

  // Fond blanc
  doc.setFillColor(...white)
  doc.rect(0, 0, W, 297, 'F')

  // Header navy
  doc.setFillColor(...navy)
  doc.rect(0, 0, W, 52, 'F')
  doc.setFillColor(...blue)
  doc.rect(0, 50, W, 3, 'F')

  // Logo cercle
  doc.setFillColor(...blue)
  doc.circle(22, 22, 12, 'F')
  doc.setTextColor(...white)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text(ENTREPRISE.logo, 22, 26, { align: 'center' })

  // Nom entreprise
  doc.setFontSize(18)
  doc.text(ENTREPRISE.nom, 40, 20)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(148, 163, 184)
  doc.text('Solutions Digitales & Infrastructures IT', 40, 27)

  // FACTURE + ID
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(26)
  doc.setTextColor(...white)
  doc.text('FACTURE', W - 15, 20, { align: 'right' })
  doc.setFontSize(10)
  doc.setTextColor(...cyan)
  doc.text(paiement.id, W - 15, 28, { align: 'right' })

  // Badge statut
  const statutColor = paiement.statut === 'paid' ? emerald : paiement.statut === 'overdue' ? [239,68,68] : [245,158,11]
  const statutLabel = paiement.statut === 'paid' ? 'PAYEE' : paiement.statut === 'overdue' ? 'EN RETARD' : 'EN ATTENTE'
  doc.setFillColor(...statutColor)
  doc.roundedRect(W - 50, 33, 35, 10, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(...white)
  doc.text(statutLabel, W - 32.5, 39.5, { align: 'center' })

  // ── Blocs émetteur / client
  let y = 65
  const drawInfoBloc = (x, w, couleurHeader, titre, lignes) => {
    doc.setFillColor(...gray50)
    doc.roundedRect(x, y, w, 50, 3, 3, 'F')
    doc.setFillColor(...couleurHeader)
    doc.roundedRect(x, y, w, 8, 3, 3, 'F')
    doc.rect(x, y + 4, w, 4, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...white)
    doc.text(titre, x + 7, y + 5.5)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...gray700)
    doc.text(lignes[0], x + 5, y + 15)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...gray500)
    lignes.slice(1).forEach((l, i) => doc.text(l, x + 5, y + 22 + i * 6))
  }

  drawInfoBloc(12, 85, blue, 'EMETTEUR', [
    ENTREPRISE.nom,
    `SIRET : ${ENTREPRISE.siret}`,
    `TVA : ${ENTREPRISE.tva}`,
    ENTREPRISE.adresse,
    ENTREPRISE.ville,
    ENTREPRISE.tel,
    ENTREPRISE.email
  ])

  drawInfoBloc(110, 88, navy, 'CLIENT / DESTINATAIRE', [
    getClientNom(paiement.projet),
    'Responsable : M. Jean Dupont',
    "12 Avenue de l'Innovation",
    '69002 Lyon, France',
    'contact@client.fr',
    '+33 4 72 00 00 00'
  ])

  // ── Infos facture (3 colonnes)
  y = 124
  doc.setFillColor(...gray100)
  doc.roundedRect(12, y, 186, 18, 3, 3, 'F')
  const infoCols = [
    { x: 25, label: "Date d'emission", val: new Date().toLocaleDateString('fr-FR') },
    { x: 82, label: "Date d'echeance", val: paiement.date },
    { x: 138, label: "Reference projet", val: paiement.id },
  ]
  infoCols.forEach(({ x, label, val }) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...gray500)
    doc.text(label, x, y + 6)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...gray700)
    doc.text(val, x, y + 13)
  })

  // ── Tableau
  y = 152
  doc.setFillColor(...navy)
  doc.rect(12, y, 186, 9, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...white)
  doc.text('DESIGNATION', 17, y + 6)
  doc.text('QTE', 120, y + 6)
  doc.text('P.U. HT', 138, y + 6)
  doc.text('TVA', 162, y + 6)
  doc.text('TOTAL HT', W - 15, y + 6, { align: 'right' })

  const montantHT = Math.round(paiement.montantValue / 1.20)
  const tvaAmt    = paiement.montantValue - montantHT

  const lignes = [
    { desc: `Prestation — ${paiement.projet}`, detail: 'Conception, developpement et mise en production', qty: 1, pu: montantHT, tva: '20%', total: montantHT },
    { desc: 'Support & maintenance (1 mois)', detail: 'Suivi technique post-livraison inclus', qty: 1, pu: 0, tva: '20%', total: 0 },
  ]
  lignes.forEach((ligne, i) => {
    const ly = y + 9 + i * 16
    doc.setFillColor(i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 251, i % 2 === 0 ? 255 : 253)
    doc.rect(12, ly, 186, 16, 'F')
    doc.setFillColor(...blue)
    doc.rect(12, ly, 2, 16, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...gray700)
    doc.text(ligne.desc, 17, ly + 6)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...gray500)
    doc.text(ligne.detail, 17, ly + 12)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...gray700)
    doc.text(String(ligne.qty), 122, ly + 8)
    doc.text(ligne.pu > 0 ? `${ligne.pu.toLocaleString('fr-FR')} EUR` : 'Inclus', 138, ly + 8)
    doc.text(ligne.tva, 163, ly + 8)
    doc.setFont('helvetica', 'bold')
    doc.text(ligne.total > 0 ? `${ligne.total.toLocaleString('fr-FR')} EUR` : '0 EUR', W - 15, ly + 8, { align: 'right' })
  })

  // ── Totaux
  y = y + 9 + lignes.length * 16 + 6
  doc.setDrawColor(...gray300)
  doc.setLineWidth(0.3)
  doc.line(12, y, W - 12, y)
  y += 6
  ;[
    { label: 'Sous-total HT', val: `${montantHT.toLocaleString('fr-FR')} EUR` },
    { label: 'TVA (20%)',     val: `${tvaAmt.toLocaleString('fr-FR')} EUR` },
  ].forEach(({ label, val }) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...gray500)
    doc.text(label, 140, y)
    doc.setTextColor(...gray700)
    doc.text(val, W - 15, y, { align: 'right' })
    y += 7
  })

  // Total TTC
  doc.setFillColor(...navy)
  doc.roundedRect(120, y, 78, 14, 3, 3, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...white)
  doc.text('TOTAL TTC', 128, y + 9)
  doc.setFontSize(12)
  doc.setTextColor(...cyan)
  doc.text(`${paiement.montantValue.toLocaleString('fr-FR')} EUR`, W - 15, y + 9, { align: 'right' })

  // ── Conditions paiement
  y += 22
  doc.setFillColor(...gray50)
  doc.roundedRect(12, y, 115, 34, 3, 3, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...navy)
  doc.text('CONDITIONS DE PAIEMENT', 17, y + 7)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(...gray500)
  const condLines = [
    'Mode : Virement bancaire ou Carte bancaire',
    "Delai : 30 jours a compter de la date d'emission",
    `IBAN : ${ENTREPRISE.iban}`,
    `BIC : ${ENTREPRISE.bic} — ${ENTREPRISE.banque}`
  ]
  condLines.forEach((l, i) => doc.text(l, 17, y + 14 + i * 6))

  // Bloc statut paiement
  if (paiement.statut === 'paid') {
    doc.setFillColor(240, 253, 244)
    doc.roundedRect(133, y, 65, 34, 3, 3, 'F')
    doc.setFillColor(...emerald)
    doc.roundedRect(133, y, 65, 10, 3, 3, 'F')
    doc.rect(133, y + 6, 65, 4, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...white)
    doc.text('FACTURE REGLEE', 165, y + 7, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(21, 128, 61)
    doc.text(`Via : ${paiement.methode}`, 165, y + 18, { align: 'center' })
    doc.text(`Date : ${paiement.date}`, 165, y + 25, { align: 'center' })
  }

  // ── Mentions légales
  y += 42
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...gray500)
  doc.text("En cas de retard de paiement, des penalites au taux legal seront appliquees (Art. L.441-10 du Code de commerce).", 12, y)
  doc.text("Pas d'escompte pour reglement anticipe. TVA acquittee sur les debits.", 12, y + 5)

  // ── Footer
  doc.setFillColor(...navy)
  doc.rect(0, 277, W, 20, 'F')
  doc.setFillColor(...blue)
  doc.rect(0, 276, W, 1.5, 'F')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(148, 163, 184)
  doc.text(`${ENTREPRISE.nom}  •  ${ENTREPRISE.adresse}, ${ENTREPRISE.ville}`, W / 2, 284, { align: 'center' })
  doc.text(`${ENTREPRISE.tel}  •  ${ENTREPRISE.email}  •  ${ENTREPRISE.site}`, W / 2, 290, { align: 'center' })
  doc.setFontSize(7)
  doc.setTextColor(100, 116, 139)
  doc.text('Page 1/1', W - 12, 294, { align: 'right' })

  doc.save(`Facture-${paiement.id}-${ENTREPRISE.nom.replace(/\s/g, '_')}.pdf`)
}

/* ─── Modal: Voir Facture ─────────────────────────────────────────────────── */
const ModalVoirFacture = ({ paiement, onClose, onPay, onDownload }) => {
  const status = {
    paid:    { label: 'Payé',       color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30', icon: CheckCircle },
    pending: { label: 'En attente', color: 'text-amber-400 bg-amber-500/20 border-amber-500/30',     icon: Clock },
    overdue: { label: 'En retard',  color: 'text-red-400 bg-red-500/20 border-red-500/30',           icon: AlertCircle },
  }[paiement.statut]
  const StatusIcon = status.icon
  const montantHT = Math.round(paiement.montantValue / 1.20)
  const tvaAmt    = paiement.montantValue - montantHT

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>

        <div className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Facture {paiement.id}</h2>
                <p className="text-gray-400 text-sm">{ENTREPRISE.nom}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <X className="w-4 h-4 text-gray-300" />
            </button>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${status.color}`}>
            <StatusIcon className="w-3.5 h-3.5" /> {status.label}
          </span>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-blue-400 text-xs font-bold uppercase tracking-wide mb-3">Émetteur</p>
              <p className="text-white font-bold text-sm">{ENTREPRISE.nom}</p>
              <p className="text-gray-400 text-xs mt-1">{ENTREPRISE.adresse}</p>
              <p className="text-gray-400 text-xs">{ENTREPRISE.ville}</p>
              <p className="text-gray-400 text-xs mt-2">SIRET : {ENTREPRISE.siret}</p>
              <p className="text-gray-400 text-xs">TVA : {ENTREPRISE.tva}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-cyan-400 text-xs font-bold uppercase tracking-wide mb-3">Client</p>
              <p className="text-white font-bold text-sm">{getClientNom(paiement.projet)}</p>
              <p className="text-gray-400 text-xs mt-1">M. Jean Dupont</p>
              <p className="text-gray-400 text-xs">12 Av. de l'Innovation</p>
              <p className="text-gray-400 text-xs">69002 Lyon, France</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "N° Facture", val: paiement.id },
              { label: "Échéance", val: paiement.date },
              { label: "Méthode", val: paiement.methode !== '-' ? paiement.methode : 'Non définie' },
            ].map(({ label, val }) => (
              <div key={label} className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-gray-500 text-xs mb-1">{label}</p>
                <p className="text-white font-semibold text-sm">{val}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/5 rounded-xl overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wide">
              <span>Désignation</span><span>Montant HT</span>
            </div>
            <div className="px-4 py-3 border-b border-white/5 flex justify-between">
              <div>
                <p className="text-white text-sm font-medium">{paiement.projet}</p>
                <p className="text-gray-500 text-xs">Conception, développement & mise en prod.</p>
              </div>
              <p className="text-white font-semibold text-sm whitespace-nowrap">{montantHT.toLocaleString('fr-FR')} €</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-xs text-gray-400 border-b border-white/5">
              <span>Sous-total HT</span><span>{montantHT.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="px-4 py-2 flex justify-between text-xs text-gray-400 border-b border-white/5">
              <span>TVA 20%</span><span>+ {tvaAmt.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="px-4 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 flex justify-between items-center">
              <span className="text-white font-bold">TOTAL TTC</span>
              <span className="text-xl font-bold text-cyan-400">{paiement.montant}</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-gray-500 text-xs mb-2 font-bold uppercase tracking-wide">Coordonnées bancaires</p>
            <p className="text-gray-300 text-xs">IBAN : <span className="font-mono text-white">{ENTREPRISE.iban}</span></p>
            <p className="text-gray-300 text-xs mt-1">BIC : <span className="font-mono text-white">{ENTREPRISE.bic}</span> — {ENTREPRISE.banque}</p>
          </div>
        </div>

        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm hover:bg-white/10 transition-all">Fermer</button>
          <button onClick={() => { onClose(); onDownload(paiement) }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-500/50 text-blue-400 text-sm hover:bg-blue-500/10 transition-all">
            <Download className="w-4 h-4" /> PDF
          </button>
          {paiement.statut !== 'paid' && (
            <button onClick={() => { onClose(); onPay(paiement) }}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold hover:scale-105 transition-all shadow-lg">
              Payer maintenant
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Modal: Télécharger PDF ──────────────────────────────────────────────── */
const ModalTelecharger = ({ paiement, onClose }) => {
  const [status, setStatus] = useState('idle')

  const handleDownload = async () => {
    setStatus('loading')
    try {
      await generateInvoicePDF(paiement)
      setStatus('done')
      setTimeout(onClose, 2000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Télécharger la facture</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <X className="w-4 h-4 text-gray-300" />
            </button>
          </div>

          <div className="bg-white/5 rounded-xl p-4 mb-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex flex-col items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
              <span className="text-white text-[9px] font-bold mt-0.5">PDF</span>
            </div>
            <div>
              <p className="text-white font-semibold">Facture-{paiement.id}.pdf</p>
              <p className="text-gray-400 text-sm">{paiement.projet}</p>
              <p className="text-emerald-400 text-xs font-semibold mt-0.5">{paiement.montant} TTC</p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-5 text-xs text-blue-300">
            📄 Facture professionnelle avec logo, détail HT/TVA, coordonnées bancaires et mentions légales.
          </div>

          {status === 'done' ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
              <p className="text-emerald-400 font-semibold">Téléchargement réussi !</p>
            </div>
          ) : status === 'error' ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <p className="text-red-400 text-sm">Erreur lors de la génération</p>
              <button onClick={handleDownload} className="text-blue-400 text-xs underline">Réessayer</button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm hover:bg-white/10 transition-all">Annuler</button>
              <button onClick={handleDownload} disabled={status === 'loading'}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium hover:scale-105 transition-all disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2">
                {status === 'loading'
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Génération PDF...</>
                  : <><Download className="w-4 h-4" /> Télécharger PDF</>
                }
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Modal: Payer ────────────────────────────────────────────────────────── */
const ModalPayer = ({ paiement, onClose, onSuccess }) => {
  const [step, setStep]       = useState(1)
  const [methode, setMethode] = useState('')
  const [form, setForm]       = useState({ nom: '', numero: '', expiry: '', cvv: '', iban: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors]   = useState({})
  const txnRef = `TXN-${Date.now().toString().slice(-8)}`

  const methodes = [
    { id: 'carte',    label: 'Carte bancaire',   icon: CreditCard, desc: 'Visa, Mastercard, CB' },
    { id: 'virement', label: 'Virement bancaire', icon: Building,   desc: 'SEPA · 1-3 jours ouvrés' },
  ]

  const validate = () => {
    const e = {}
    if (methode === 'carte') {
      if (!form.nom.trim()) e.nom = 'Requis'
      if (!form.numero || form.numero.replace(/\s/g, '').length !== 16) e.numero = 'Numéro invalide (16 chiffres)'
      if (!form.expiry || !/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Format MM/AA'
      if (!form.cvv || form.cvv.length < 3) e.cvv = 'CVV invalide'
    } else {
      if (!form.iban || form.iban.length < 14) e.iban = 'IBAN invalide'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePay = () => {
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(3)
      onSuccess(paiement.id, methode === 'carte' ? 'Carte bancaire' : 'Virement')
    }, 2000)
  }

  const fmtCard   = v => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
  const fmtExpiry = v => v.replace(/\D/g,'').slice(0,4).replace(/^(\d{2})(\d)/,'$1/$2')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}>

        <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 && step < 3 && (
              <button onClick={() => setStep(s => s - 1)} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <ArrowLeft className="w-3.5 h-3.5 text-gray-300" />
              </button>
            )}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
              <CreditCard style={{ width: 18, height: 18 }} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Paiement sécurisé</h2>
              <p className="text-gray-400 text-xs">{paiement.projet} · {paiement.montant}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
            <X className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        {step < 3 && (
          <div className="px-5 pt-4 flex items-center">
            {['Méthode','Informations','Confirmation'].map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step > i+1 ? 'bg-emerald-500 text-white' : step === i+1 ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-500'}`}>
                  {step > i+1 ? '✓' : i+1}
                </div>
                <span className={`text-xs ml-1 ${step === i+1 ? 'text-white' : 'text-gray-500'}`}>{s}</span>
                {i < 2 && <div className={`h-px flex-1 mx-2 ${step > i+1 ? 'bg-emerald-500/50' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>
        )}

        <div className="p-5">
          {step === 1 && (
            <div className="space-y-3 mt-2">
              <p className="text-gray-400 text-sm mb-3">Choisissez votre méthode de paiement</p>
              {methodes.map(m => (
                <button key={m.id} onClick={() => setMethode(m.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${methode === m.id ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${methode === m.id ? 'bg-blue-500' : 'bg-white/10'}`}>
                    <m.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{m.label}</p>
                    <p className="text-gray-500 text-xs">{m.desc}</p>
                  </div>
                  {methode === m.id && <CheckCircle className="w-5 h-5 text-blue-400" />}
                </button>
              ))}
              <button disabled={!methode} onClick={() => setStep(2)}
                className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm disabled:opacity-40 hover:scale-105 transition-all flex items-center justify-center gap-2">
                Continuer <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3 mt-2">
              {methode === 'carte' ? (
                <>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Nom du titulaire</label>
                    <input type="text" placeholder="Jean Dupont" value={form.nom}
                      onChange={e => setForm({ ...form, nom: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/10 border ${errors.nom ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-sm`} />
                    {errors.nom && <p className="text-red-400 text-xs mt-1">{errors.nom}</p>}
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Numéro de carte</label>
                    <input type="text" placeholder="1234 5678 9012 3456" value={form.numero}
                      onChange={e => setForm({ ...form, numero: fmtCard(e.target.value) })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/10 border ${errors.numero ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-sm font-mono`} />
                    {errors.numero && <p className="text-red-400 text-xs mt-1">{errors.numero}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-gray-400 text-xs mb-1 block">Expiration</label>
                      <input type="text" placeholder="MM/AA" value={form.expiry}
                        onChange={e => setForm({ ...form, expiry: fmtExpiry(e.target.value) })}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/10 border ${errors.expiry ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-sm`} />
                      {errors.expiry && <p className="text-red-400 text-xs mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs mb-1 block">CVV</label>
                      <input type="password" placeholder="•••" maxLength={4} value={form.cvv}
                        onChange={e => setForm({ ...form, cvv: e.target.value.replace(/\D/g,'') })}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/10 border ${errors.cvv ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-sm`} />
                      {errors.cvv && <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">IBAN bénéficiaire</label>
                  <input type="text" placeholder="FR76 3000 6000 0112 3456 7890 189" value={form.iban}
                    onChange={e => setForm({ ...form, iban: e.target.value.toUpperCase() })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/10 border ${errors.iban ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-sm font-mono`} />
                  {errors.iban && <p className="text-red-400 text-xs mt-1">{errors.iban}</p>}
                  <div className="mt-3 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-blue-300 text-xs space-y-1">
                    <p>Référence à indiquer : <strong>{paiement.id}</strong></p>
                    <p>Délai de traitement : 1 à 3 jours ouvrés</p>
                    <p>Bénéficiaire : {ENTREPRISE.nom}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Paiement sécurisé SSL 256-bit</span>
                <Lock className="w-3.5 h-3.5 text-emerald-400 ml-1" />
              </div>
              <div className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
                <span className="text-gray-400 text-sm">Montant à payer</span>
                <span className="text-white font-bold text-lg">{paiement.montant}</span>
              </div>
              <button onClick={handlePay} disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm hover:scale-105 transition-all disabled:scale-100 disabled:opacity-70 flex items-center justify-center gap-2">
                {loading
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Traitement...</>
                  : <><Lock className="w-4 h-4" /> Confirmer le paiement</>
                }
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center py-6 gap-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </motion.div>
              <h3 className="text-xl font-bold text-white">Paiement confirmé !</h3>
              <p className="text-gray-400 text-sm text-center">
                Votre paiement de <span className="text-white font-semibold">{paiement.montant}</span> pour{' '}
                <span className="text-white font-semibold">{paiement.projet}</span> a été traité avec succès.
              </p>
              <div className="bg-white/5 rounded-xl p-3 w-full text-center">
                <p className="text-gray-500 text-xs">Référence de transaction</p>
                <p className="text-white font-mono font-semibold text-sm mt-1">{txnRef}</p>
              </div>
              <p className="text-gray-500 text-xs text-center">Un reçu a été envoyé à votre adresse email</p>
              <button onClick={onClose}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm hover:scale-105 transition-all">
                Fermer
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Composant Principal ─────────────────────────────────────────────────── */
const Paiements = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm]   = useState('')
  const [modalVoir, setModalVoir]         = useState(null)
  const [modalDownload, setModalDownload] = useState(null)
  const [modalPayer, setModalPayer]       = useState(null)

  const [paiements, setPaiements] = useState([
    { id: 'INV-001', projet: 'Site E-commerce',    date: '15/04/2026', montant: '2 500 €', montantValue: 2500, statut: 'paid',    methode: 'Carte bancaire' },
    { id: 'INV-002', projet: 'Site E-commerce',    date: '01/05/2026', montant: '2 500 €', montantValue: 2500, statut: 'pending', methode: '-' },
    { id: 'INV-003', projet: 'Installation Réseau', date: '10/04/2026', montant: '1 600 €', montantValue: 1600, statut: 'paid',    methode: 'Virement' },
    { id: 'INV-004', projet: 'Installation Réseau', date: '25/04/2026', montant: '1 600 €', montantValue: 1600, statut: 'overdue', methode: '-' },
    { id: 'INV-005', projet: 'Migration Cloud',     date: '05/05/2026', montant: '4 200 €', montantValue: 4200, statut: 'pending', methode: '-' },
    { id: 'INV-006', projet: 'Audit Sécurité',      date: '20/03/2026', montant: '2 800 €', montantValue: 2800, statut: 'paid',    methode: 'Carte bancaire' },
  ])

  const handlePaySuccess = (id, methodeUsed) =>
    setPaiements(prev => prev.map(p => p.id === id ? { ...p, statut: 'paid', methode: methodeUsed } : p))

  const getStatusConfig = (statut) => ({
    paid:    { label: 'Payé',       icon: CheckCircle, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    pending: { label: 'En attente', icon: Clock,       color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    overdue: { label: 'En retard',  icon: AlertCircle, color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  }[statut])

  const totalPaye  = paiements.filter(p => p.statut === 'paid').reduce((s,p) => s + p.montantValue, 0)
  const totalDu    = paiements.filter(p => p.statut !== 'paid').reduce((s,p) => s + p.montantValue, 0)
  const filtered   = paiements.filter(p =>
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.projet.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const firstUnpaid = paiements.find(p => p.statut !== 'paid')

  const stats = [
    { title: 'Total payé',          value: `${totalPaye.toLocaleString('fr-FR')} €`, icon: CreditCard,  color: 'from-emerald-500 to-teal-500',  bgLight: 'bg-emerald-500/10', textLight: 'text-emerald-400', badge: 'Réglé' },
    { title: 'Restant dû',          value: `${totalDu.toLocaleString('fr-FR')} €`,   icon: AlertCircle, color: 'from-amber-500 to-orange-500',   bgLight: 'bg-amber-500/10',   textLight: 'text-amber-400',   badge: 'À régler' },
    { title: 'Paiements effectués', value: paiements.filter(p => p.statut === 'paid').length.toString(), icon: Wallet, color: 'from-blue-500 to-cyan-500', bgLight: 'bg-blue-500/10', textLight: 'text-blue-400', badge: 'Total' },
  ]

  return (
    <>
      <style>{globalStyles}</style>

      <AnimatePresence>
        {modalVoir && (
          <ModalVoirFacture paiement={modalVoir}
            onClose={() => setModalVoir(null)}
            onPay={p => { setModalVoir(null); setModalPayer(p) }}
            onDownload={p => { setModalVoir(null); setModalDownload(p) }} />
        )}
        {modalDownload && (
          <ModalTelecharger paiement={modalDownload} onClose={() => setModalDownload(null)} />
        )}
        {modalPayer && (
          <ModalPayer paiement={modalPayer}
            onClose={() => setModalPayer(null)}
            onSuccess={handlePaySuccess} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
          <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
            <ClientSidebar />
          </div>
          {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

          <div className="flex-1 lg:ml-64">
            <main className="p-6 md:p-10">

              {/* Titre page */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Paiements</h1>
                <p className="text-gray-400 mt-1">Gérez vos factures et effectuez vos paiements</p>
              </motion.div>

              {/* Stats */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, i) => (
                  <motion.div key={i} variants={fadeUp}
                    className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/15">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.bgLight} ${stat.textLight}`}>{stat.badge}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-400 text-sm mt-1">{stat.title}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quick action */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible"
                className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Effectuer un paiement</h3>
                      <p className="text-gray-400">Réglez vos factures en ligne en toute sécurité</p>
                    </div>
                  </div>
                  <button onClick={() => firstUnpaid && setModalPayer(firstUnpaid)} disabled={!firstUnpaid}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                    {firstUnpaid ? 'Payer maintenant' : 'Tout est réglé ✓'}
                    <CreditCard className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Recherche */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="text" placeholder="Rechercher une facture..." value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all" />
                </div>
              </motion.div>

              {/* Grille de cartes */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                {filtered.map((paiement) => {
                  const status = getStatusConfig(paiement.statut)
                  const StatusIcon = status.icon
                  return (
                    <motion.div key={paiement.id} variants={fadeUp}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col">
                      <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />

                      <div className="p-6 flex-1 flex flex-col gap-4">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                              <CreditCard className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xs text-gray-500 font-mono">{paiement.id}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs text-gray-400">{paiement.date}</span>
                          </div>
                        </div>

                        {/* Projet + statut */}
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{paiement.projet}</h3>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                            <StatusIcon className="w-3 h-3" /> {status.label}
                          </span>
                        </div>

                        {/* Montant encadré */}
                        <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                          <div>
                            <p className="text-gray-500 text-xs mb-0.5">Montant TTC</p>
                            <p className="text-2xl font-bold text-white">{paiement.montant}</p>
                          </div>
                          <Euro className="w-8 h-8 text-emerald-400 opacity-40" />
                        </div>

                        {/* Méthode si payé */}
                        {paiement.statut === 'paid' && paiement.methode !== '-' && (
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-400">Via : <span className="text-gray-300">{paiement.methode}</span></span>
                          </div>
                        )}

                        <div className="flex-1" />

                        {/* Actions */}
                        <div className="flex gap-2 pt-3 border-t border-white/10">
                          <button onClick={() => setModalVoir(paiement)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                            <Eye className="w-3.5 h-3.5" /> Voir
                          </button>
                          <button onClick={() => setModalDownload(paiement)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                            <Download className="w-3.5 h-3.5" /> PDF
                          </button>
                          {paiement.statut !== 'paid' && (
                            <button onClick={() => setModalPayer(paiement)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold hover:scale-105 transition-all shadow-md">
                              Payer
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Empty state */}
              {filtered.length === 0 && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white">Aucune facture trouvée</h3>
                  <p className="text-gray-500 mt-1">Essayez de modifier vos critères de recherche</p>
                </motion.div>
              )}

            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Paiements


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


import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FolderKanban, Calendar, Users, MessageCircle,
  CheckCircle, Clock, ArrowRight, X, Send,
  BarChart2, Target, Paperclip, Smile, ChevronDown, ChevronUp,
  FileText, AlertCircle, TrendingUp, User, Plus
} from 'lucide-react'
import ClientSidebar from '../../components/ClientSidebar'
import ClientHeader from '../../components/ClientHeader'

/* ─── Styles globaux ────────────────────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #e2e8f0; overflow-x: hidden; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .chat-scroll::-webkit-scrollbar { width: 4px; }
  .chat-scroll::-webkit-scrollbar-track { background: transparent; }
  .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
`

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
}
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 0.68, 0, 1] } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
}
const msgVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } }
}

/* ─── Couleurs statut ───────────────────────────────────────────────────────── */
const getProgressColor = (p) => p >= 80 ? 'from-emerald-500 to-teal-500' : p >= 50 ? 'from-blue-500 to-cyan-500' : p >= 25 ? 'from-amber-500 to-orange-500' : 'from-red-500 to-pink-500'

/* ─── Modal: Discuter ───────────────────────────────────────────────────────── */
const ModalDiscuter = ({ projet, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, from: 'system', text: `Bienvenue dans le fil de discussion du projet "${projet.name}". Posez vos questions à l'équipe.`, time: 'Aujourd\'hui' },
    { id: 2, from: 'team',   author: projet.team[0], text: `Bonjour ! Tout avance bien sur ${projet.name}. N'hésitez pas si vous avez des questions.`, time: '09:15' },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)

  const emojis = ['👍', '✅', '🚀', '💬', '❓', '⏰']

  const handleSend = () => {
    if (!input.trim()) return
    const newMsg = { id: Date.now(), from: 'me', text: input.trim(), time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, newMsg])
    setInput('')
    setSending(true)
    // Réponse auto de l'équipe
    setTimeout(() => {
      const replies = [
        'Merci pour votre message ! Nous en prenons note.',
        'Bien reçu, je reviens vers vous très vite.',
        'Parfait, on s\'en occupe dès que possible.',
        `On a transmis votre demande à l'équipe ${projet.name}.`,
      ]
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: 'team',
        author: projet.team[0],
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      }])
      setSending(false)
    }, 1200)
  }

  const addEmoji = (emoji) => setInput(prev => prev + emoji)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col"
        style={{ height: '82vh', maxHeight: 640 }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 p-4 border-b border-white/10 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">{projet.name}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-gray-400 text-xs">{projet.team.length} membres en ligne</p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
            <X className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        {/* Membres */}
        <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2 flex-shrink-0">
          <span className="text-gray-500 text-xs">Équipe :</span>
          <div className="flex gap-1.5 flex-wrap">
            {projet.team.map((m, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/20">{m}</span>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scroll">
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div key={msg.id} variants={msgVariants} initial="hidden" animate="visible"
                className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'system' ? (
                  <div className="w-full text-center">
                    <span className="text-xs text-gray-600 bg-white/5 px-3 py-1 rounded-full">{msg.text}</span>
                  </div>
                ) : msg.from === 'team' ? (
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white mt-1">
                      {msg.author[0]}
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] mb-1">{msg.author} · {msg.time}</p>
                      <div className="bg-white/10 rounded-2xl rounded-tl-none px-4 py-2.5">
                        <p className="text-gray-200 text-sm leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[80%]">
                    <p className="text-gray-500 text-[10px] mb-1 text-right">Moi · {msg.time}</p>
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl rounded-tr-none px-4 py-2.5">
                      <p className="text-white text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {sending && (
            <div className="flex gap-2 items-center">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                {projet.team[0][0]}
              </div>
              <div className="bg-white/10 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Emojis rapides */}
        <div className="px-4 py-2 flex gap-2 border-t border-white/5 flex-shrink-0">
          {emojis.map(e => (
            <button key={e} onClick={() => addEmoji(e)} className="text-base hover:scale-125 transition-transform">{e}</button>
          ))}
        </div>

        {/* Zone de saisie */}
        <div className="p-3 border-t border-white/10 flex gap-2 flex-shrink-0">
          <input
            type="text" placeholder="Écrire un message..."
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-sm"
          />
          <button onClick={handleSend} disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center hover:scale-105 transition-all disabled:opacity-40 disabled:scale-100">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Modal: Détails Projet ─────────────────────────────────────────────────── */
const ModalDetails = ({ projet, onClose, onDiscuter }) => {
  const [tasksDone, setTasksDone] = useState(projet.tasks.map(t => t.completed))
  const [showAllTasks, setShowAllTasks] = useState(false)
  const [newTask, setNewTask] = useState('')
  const [tasks, setTasks] = useState(projet.tasks)

  const completedCount = tasksDone.filter(Boolean).length
  const localProgress  = Math.round((completedCount / tasks.length) * 100)

  const toggleTask = (i) => {
    const updated = [...tasksDone]
    updated[i] = !updated[i]
    setTasksDone(updated)
  }

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks(prev => [...prev, { name: newTask.trim(), completed: false }])
    setTasksDone(prev => [...prev, false])
    setNewTask('')
  }

  const displayedTasks = showAllTasks ? tasks : tasks.slice(0, 4)

  const barColor = getProgressColor(localProgress)

  const statusMap = {
    in_progress: { label: 'En cours',  color: 'text-blue-400  bg-blue-500/15  border-blue-500/30',  icon: Clock },
    completed:   { label: 'Terminé',   color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30', icon: CheckCircle },
    paused:      { label: 'En pause',  color: 'text-amber-400 bg-amber-500/15  border-amber-500/30',  icon: AlertCircle },
  }
  const s = statusMap[projet.status] || statusMap.in_progress
  const StatusIcon = s.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto chat-scroll"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/25 to-cyan-600/25 p-6 border-b border-white/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-white">{projet.name}</h2>
                  <span className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-0.5 rounded-full">{projet.id}</span>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.color}`}>
                  <StatusIcon className="w-3 h-3" /> {s.label}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all flex-shrink-0">
              <X className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* Description */}
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-2">Description</p>
            <p className="text-gray-300 text-sm leading-relaxed">{projet.description}</p>
          </div>

          {/* Dates + Progression */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-gray-500 text-xs mb-1">Début</p>
              <Calendar className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <p className="text-white font-semibold text-sm">{projet.startDate}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-gray-500 text-xs mb-1">Fin prévue</p>
              <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <p className="text-white font-semibold text-sm">{projet.endDate}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-gray-500 text-xs mb-1">Avancement</p>
              <TrendingUp className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <p className="text-white font-semibold text-sm">{localProgress}%</p>
            </div>
          </div>

          {/* Barre progression */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Progression globale</span>
              <span className="text-sm font-bold text-white">{localProgress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <motion.div
                className={`bg-gradient-to-r ${barColor} rounded-full h-3 transition-all duration-500`}
                initial={{ width: 0 }}
                animate={{ width: `${localProgress}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <p className="text-gray-500 text-xs mt-1">{completedCount} / {tasks.length} tâches complétées</p>
          </div>

          {/* Tâches interactives */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" /> Tâches du projet
              </h3>
              <span className="text-xs text-gray-500">{completedCount}/{tasks.length}</span>
            </div>
            <div className="space-y-2">
              {displayedTasks.map((task, i) => (
                <motion.button key={i} onClick={() => toggleTask(i)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${tasksDone[i] ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${tasksDone[i] ? 'bg-emerald-500 border-emerald-500' : 'border-gray-500'}`}>
                    {tasksDone[i] && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={`text-sm flex-1 transition-all ${tasksDone[i] ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                    {task.name}
                  </span>
                  {tasksDone[i] && <span className="text-xs text-emerald-400 font-medium">Fait</span>}
                </motion.button>
              ))}

              {tasks.length > 4 && (
                <button onClick={() => setShowAllTasks(!showAllTasks)}
                  className="w-full text-center text-xs text-blue-400 hover:text-blue-300 py-1 flex items-center justify-center gap-1 transition-all">
                  {showAllTasks ? <><ChevronUp className="w-3.5 h-3.5" /> Voir moins</> : <><ChevronDown className="w-3.5 h-3.5" /> Voir toutes ({tasks.length - 4} de plus)</>}
                </button>
              )}
            </div>

            {/* Ajouter une tâche */}
            <div className="flex gap-2 mt-3">
              <input type="text" placeholder="Ajouter une tâche..."
                value={newTask} onChange={e => setNewTask(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTask()}
                className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-xs" />
              <button onClick={addTask} disabled={!newTask.trim()}
                className="px-3 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-all disabled:opacity-40 flex items-center gap-1 text-xs">
                <Plus className="w-3.5 h-3.5" /> Ajouter
              </button>
            </div>
          </div>

          {/* Équipe */}
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-blue-400" /> Équipe projet
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {projet.team.map((member, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {member[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-xs font-medium truncate">{member}</p>
                    <p className="text-gray-500 text-[10px]">Membre actif</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm hover:bg-white/10 transition-all">
            Fermer
          </button>
          <button onClick={() => { onClose(); onDiscuter(projet) }}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" /> Discuter
          </button>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Composant Principal ───────────────────────────────────────────────────── */
const Projets = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalDiscuter, setModalDiscuter] = useState(null)
  const [modalDetails,  setModalDetails]  = useState(null)

  const projets = [
    {
      id: 'PRJ-001',
      name: 'Site E-commerce',
      description: "Développement complet d'une plateforme e-commerce avec paiement intégré",
      progress: 75,
      status: 'in_progress',
      startDate: '25/04/2026',
      endDate: '30/06/2026',
      team: ['Jean Tech', 'Marie Design', 'Paul Backend'],
      tasks: [
        { name: 'Maquettes UI/UX', completed: true },
        { name: 'Développement Frontend', completed: true },
        { name: 'Développement Backend', completed: false },
        { name: 'Intégration paiement', completed: false },
        { name: 'Tests & Déploiement', completed: false },
      ]
    },
    {
      id: 'PRJ-002',
      name: 'Installation Réseau',
      description: 'Installation réseau pour 50 postes + WiFi entreprise',
      progress: 40,
      status: 'in_progress',
      startDate: '10/04/2026',
      endDate: '20/05/2026',
      team: ['Marc Infra', 'David Network'],
      tasks: [
        { name: 'Audit site', completed: true },
        { name: 'Câblage structuré', completed: true },
        { name: 'Configuration équipements', completed: false },
        { name: 'Tests & validation', completed: false },
      ]
    },
    {
      id: 'PRJ-003',
      name: 'Migration Cloud',
      description: 'Migration complète des serveurs vers AWS avec formation',
      progress: 25,
      status: 'in_progress',
      startDate: '01/05/2026',
      endDate: '15/07/2026',
      team: ['Sophie Cloud', 'Thomas DevOps'],
      tasks: [
        { name: 'Analyse infrastructure', completed: true },
        { name: 'Migration données', completed: false },
        { name: 'Configuration serveurs', completed: false },
        { name: 'Formation équipe', completed: false },
      ]
    },
    {
      id: 'PRJ-004',
      name: 'Audit Sécurité',
      description: 'Audit complet de sécurité et conformité RGPD',
      progress: 90,
      status: 'in_progress',
      startDate: '01/03/2026',
      endDate: '30/04/2026',
      team: ['Pierre Securité', 'Julie Conformité'],
      tasks: [
        { name: 'Scan vulnérabilités', completed: true },
        { name: 'Test intrusion', completed: true },
        { name: 'Rapport détaillé', completed: true },
        { name: 'Plan correction', completed: false },
      ]
    },
  ]

  return (
    <>
      <style>{globalStyles}</style>

      {/* Modals */}
      <AnimatePresence>
        {modalDiscuter && (
          <ModalDiscuter projet={modalDiscuter} onClose={() => setModalDiscuter(null)} />
        )}
        {modalDetails && (
          <ModalDetails projet={modalDetails}
            onClose={() => setModalDetails(null)}
            onDiscuter={(p) => { setModalDetails(null); setModalDiscuter(p) }} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
          <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
            <ClientSidebar />
          </div>
          {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

          <div className="flex-1 lg:ml-64">
            <main className="p-6 md:p-8">

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Mes projets</h1>
                <p className="text-gray-400 mt-1">Suivez l'avancement de vos projets en cours</p>
              </motion.div>

              <motion.div variants={staggerContainer} initial="hidden" animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projets.map((projet) => (
                  <motion.div key={projet.id} variants={fadeUp}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full">

                    {/* Header gradient bar */}
                    <div className="relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                      <div className="p-5 pb-3">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                              <FolderKanban className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xs text-gray-500 font-mono">{projet.id}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-xs text-gray-400">{projet.endDate}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{projet.name}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{projet.description}</p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex-1 flex flex-col">
                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between mb-1.5">
                          <span className="text-xs text-gray-400">Progression</span>
                          <span className="text-xs font-medium text-blue-400">{projet.progress}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1.5">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full h-1.5"
                            initial={{ width: 0 }}
                            animate={{ width: `${projet.progress}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          />
                        </div>
                      </div>

                      {/* Tasks - compact */}
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tâches</h4>
                        <div className="space-y-1.5">
                          {projet.tasks.slice(0, 3).map((task, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              {task.completed
                                ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                : <div className="w-3.5 h-3.5 border-2 border-gray-500 rounded-full" />
                              }
                              <span className={`text-xs ${task.completed ? 'text-gray-500 line-through' : 'text-gray-400'}`}>
                                {task.name.length > 30 ? task.name.substring(0, 27) + '...' : task.name}
                              </span>
                            </div>
                          ))}
                          {projet.tasks.length > 3 && (
                            <button onClick={() => setModalDetails(projet)} className="text-xs text-blue-400 hover:text-blue-300 mt-1 transition-all">
                              +{projet.tasks.length - 3} autres tâches →
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Team - compact */}
                      <div className="mb-4">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Users className="w-3.5 h-3.5 text-blue-400" />
                          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Équipe</h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {projet.team.slice(0, 3).map((member, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-gray-300">{member}</span>
                          ))}
                          {projet.team.length > 3 && (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-gray-400">+{projet.team.length - 3}</span>
                          )}
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-blue-400" />
                          <span>{projet.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-400" />
                          <span>{projet.endDate}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                        <button onClick={() => setModalDiscuter(projet)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium hover:scale-105 transition-all">
                          <MessageCircle className="w-3.5 h-3.5" /> Discuter
                        </button>
                        <button onClick={() => setModalDetails(projet)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-all">
                          Détails <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Projets