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
import { clientDashboard as dashApi } from '../../services/api'

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — identique aux pages About / VenteMateriel
   (navy/electric/turquoise/energy)
   ───────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

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

  .omedev-vm .section-badge {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    padding: .5rem 1.1rem;
    border-radius: 999px;
    background: rgba(11,116,193,.08);
    color: #0B74C1;
    border: 1px solid rgba(11,116,193,.18);
    font-family: 'Syne', sans-serif;
  }

  .omedev-vm .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
    font-family: 'Syne', sans-serif;
    color: #053876;
  }

  .omedev-vm .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  .omedev-vm .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
    color: #fff;
    font-size: .9rem;
    font-weight: 700;
    padding: .9rem 1.7rem;
    border-radius: 12px;
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    border: none;
    font-family: 'Syne', sans-serif;
    box-shadow: 0 10px 28px rgba(11,116,193,.20);
  }

  .omedev-vm .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
  .omedev-vm .animate-float { animation: float 6s ease-in-out infinite; }
`

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
      case 'blue':   return 'from-[#0B74C1] to-[#2AACB2]'
      case 'green':  return 'from-[#2AACB2] to-[#55DDB5]'
      case 'orange': return 'from-[#4681B7] to-[#72A5CE]'
      case 'purple': return 'from-[#053876] to-[#2AACB2]'
      default:       return 'from-[#0B74C1] to-[#2AACB2]'
    }
  }

  return (
    <motion.div
      variants={fadeUp}
      className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl p-6 shadow-[0_10px_30px_rgba(5,56,118,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(11,116,193,0.14)] hover:border-[rgba(42,172,178,0.35)]"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getColorClasses()} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className="text-xs font-semibold text-[#2AACB2] bg-[#2AACB2]/15 px-2 py-1 rounded-full">
            +{trendValue}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-[#053876] font-syne">{value}</div>
      <div className="text-[#25364A]/70 text-sm mt-1">{title}</div>
    </motion.div>
  )
}

const ClientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userName, setUserName] = useState('Client')
  const [userEmail, setUserEmail] = useState('')
  const [statsData, setStatsData] = useState(null)
  const [recentDemandes, setRecentDemandes] = useState([])
  const [activeProjects, setActiveProjects] = useState([])

  useEffect(() => {
    const name = localStorage.getItem('userName')
    const email = localStorage.getItem('userEmail')
    if (name) setUserName(name)
    if (email) setUserEmail(email)
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [statsRes, demandsRes, projectsRes] = await Promise.allSettled([
        dashApi.getStats(),
        dashApi.getRecentDemands(),
        dashApi.getActiveProjects(),
      ])
      if (statsRes.status === 'fulfilled') setStatsData(statsRes.value.data)
      if (demandsRes.status === 'fulfilled') setRecentDemandes(demandsRes.value.data?.demands || demandsRes.value.data || [])
      if (projectsRes.status === 'fulfilled') setActiveProjects(projectsRes.value.data?.projects || projectsRes.value.data || [])
    } catch (err) {
      console.error('Erreur chargement dashboard client:', err)
    }
  }

  const stats = [
    { icon: FileText, title: 'Demandes en cours', value: String(statsData?.demandesEnCours ?? '—'), color: 'blue' },
    { icon: FolderKanban, title: 'Projets actifs', value: String(statsData?.projetsActifs ?? '—'), color: 'green' },
    { icon: Clock, title: 'En attente', value: String(statsData?.enAttente ?? '—'), color: 'orange' },
    { icon: Euro, title: 'Total facturé', value: statsData?.totalFacture ? `${statsData.totalFacture}€` : '—', color: 'purple' },
  ]

  const quickLinks = [
    { icon: FileText, label: 'Mes demandes', path: '/client/demandes', color: 'from-[#0B74C1] to-[#2AACB2]' },
    { icon: Briefcase, label: 'Mes projets', path: '/client/projets', color: 'from-[#2AACB2] to-[#55DDB5]' },
    { icon: History, label: 'Historique', path: '/client/historique', color: 'from-[#053876] to-[#4681B7]' },
    { icon: User, label: 'Mon profil', path: '/client/profil', color: 'from-[#4681B7] to-[#72A5CE]' },
    { icon: CreditCard, label: 'Paiements', path: '/client/paiements', color: 'from-[#1D5B9B] to-[#2AACB2]' },
    { icon: MessageSquare, label: 'Support', path: '/client/support', color: 'from-[#2AACB2] to-[#0B74C1]' },
  ]

  const getStatusBadge = (status) => {
    const badges = {
      pending:     { label: 'En attente', color: 'bg-amber-100 text-amber-700 border-amber-300/50' },
      approved:    { label: 'Approuvé',    color: 'bg-[#55DDB5]/15 text-[#1D5B9B] border-[#55DDB5]/50' },
      completed:   { label: 'Terminé',     color: 'bg-blue-100 text-blue-700 border-blue-300/50' },
      in_progress: { label: 'En cours',    color: 'bg-[#0B74C1]/10 text-[#0B74C1] border-[#0B74C1]/30' },
    }
    return badges[status] || badges.pending
  }

  // Fonction pour obtenir les initiales du nom
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
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

              {/* Welcome Section avec nom dynamique */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-2xl md:text-3xl font-bold text-[#053876] font-syne">
                  Bonjour, {userName} ! 👋
                </h1>
                <p className="text-[#25364A]/70 mt-1">
                  Bienvenue sur votre espace client OMDEVE Services
                </p>
                {userEmail && (
                  <p className="text-xs text-[#25364A]/50 mt-1">{userEmail}</p>
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
                  className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(5,56,118,0.06)] hover:border-[rgba(42,172,178,0.35)] transition-all"
                >
                  <div className="p-6 border-b border-[rgba(5,56,118,0.1)]">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-[#053876]">Dernières demandes</h2>
                      <Link to="/client/demandes" className="text-[#0B74C1] text-sm font-medium hover:text-[#053876] transition-colors">
                        Voir tout
                      </Link>
                    </div>
                  </div>
                  <div className="divide-y divide-[rgba(5,56,118,0.1)]">
                    {recentDemandes.map((demande, idx) => {
                      const status = getStatusBadge(demande.status)
                      return (
                        <motion.div
                          key={demande.id}
                          className="p-4 hover:bg-[#F6F6F7] transition cursor-pointer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-[#053876]">{demande.id}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                              {status.label}
                            </span>
                          </div>
                          <p className="text-sm text-[#25364A]/70">{demande.service}</p>
                          <div className="flex items-center justify-between mt-2 text-sm">
                            <span className="text-[#25364A]/50">{demande.date}</span>
                            <span className="font-medium text-[#2AACB2]">{demande.amount}</span>
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
                  className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(5,56,118,0.06)] hover:border-[rgba(42,172,178,0.35)] transition-all"
                >
                  <div className="p-6 border-b border-[rgba(5,56,118,0.1)]">
                    <h2 className="text-lg font-semibold text-[#053876]">Projets en cours</h2>
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
                          <h3 className="font-medium text-[#053876]">{project.name}</h3>
                          <span className="text-sm font-medium text-[#2AACB2]">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-[#E8EDF1] rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-[#2AACB2] to-[#55DDB5] rounded-full h-2"
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                          />
                        </div>
                        <p className="text-xs text-[#25364A]/50 mt-2">{project.nextMilestone}</p>
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
                <h2 className="text-lg font-semibold text-[#053876] mb-4">Accès rapides</h2>
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
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-[rgba(5,56,118,0.09)] hover:border-[rgba(42,172,178,0.4)] transition-all hover:-translate-y-1 group"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110`}>
                          <link.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs text-[#25364A]/70 group-hover:text-[#053876] transition-colors">{link.label}</span>
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
                className="mt-8 bg-gradient-to-r from-[#0B74C1]/8 to-[#55DDB5]/8 rounded-2xl p-6 border border-[rgba(11,116,193,0.18)]"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#053876] font-syne mb-1">Besoin d'un nouveau service ?</h3>
                    <p className="text-[#25364A]/70">Demandez un devis gratuitement en quelques clics</p>
                  </div>
                  <Link to="/demander-devis">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 shadow-[0_10px_28px_rgba(11,116,193,0.2)] hover:shadow-[0_16px_36px_rgba(42,172,178,0.28)]"
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
    </div>
  )
}

export default ClientDashboard
