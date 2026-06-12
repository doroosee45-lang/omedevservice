import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  FileText,
  FolderKanban,
  ArrowUp,
  ArrowDown,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Calendar,
  ChevronRight,
  Mail,
  ClipboardCheck,
  MessageSquare,
  Loader2,
} from 'lucide-react'
import { adminDashboard } from '../../services/api'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const StatCard = ({ icon: Icon, title, value, trend, trendValue, color, badge }) => {
  const colorMap = {
    blue:   'from-blue-500 to-cyan-500',
    green:  'from-emerald-500 to-teal-500',
    orange: 'from-orange-500 to-amber-500',
    purple: 'from-purple-500 to-pink-500',
    red:    'from-red-500 to-rose-500',
    teal:   'from-teal-500 to-cyan-600',
  }
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/15 relative overflow-hidden"
    >
      {badge !== undefined && badge > 0 && (
        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color] || colorMap.blue} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            <span>{trendValue}%</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white font-syne">{value}</div>
      <div className="text-gray-400 text-sm mt-1">{title}</div>
    </motion.div>
  )
}

const activityIconMap = {
  client:  { icon: Users,         color: 'text-emerald-400' },
  devis:   { icon: FileText,      color: 'text-blue-400'    },
  projet:  { icon: FolderKanban,  color: 'text-purple-400'  },
  ticket:  { icon: AlertCircle,   color: 'text-orange-400'  },
  audit:   { icon: ClipboardCheck,color: 'text-cyan-400'    },
  contact: { icon: MessageSquare, color: 'text-pink-400'    },
}

const getAlertClasses = (type) => {
  switch (type) {
    case 'warning': return { wrapper: 'bg-amber-500/20 border-amber-500/30 text-amber-400 hover:bg-amber-500/30', chevron: 'text-amber-400' }
    case 'error':   return { wrapper: 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30',         chevron: 'text-red-400'   }
    case 'info':    return { wrapper: 'bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30',     chevron: 'text-blue-400'  }
    default:        return { wrapper: 'bg-white/10 border-white/10 text-gray-400 hover:bg-white/15',              chevron: 'text-gray-400'  }
  }
}

const alertIconMap = {
  Clock:          Clock,
  AlertCircle:    AlertCircle,
  CheckCircle:    CheckCircle,
  Mail:           Mail,
  ClipboardCheck: ClipboardCheck,
}

const AdminDashboard = () => {
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear()

  const [loading, setLoading]       = useState(true)
  const [stats, setStats]           = useState(null)
  const [revenueData, setRevenue]   = useState([])
  const [activities, setActivities] = useState([])
  const [alerts, setAlerts]         = useState([])

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [sRes, rRes, aRes, alRes] = await Promise.all([
          adminDashboard.getStats(),
          adminDashboard.getRevenue(currentYear),
          adminDashboard.getActivities(),
          adminDashboard.getAlerts(),
        ])
        setStats(sRes.data)
        setRevenue(rRes.data)
        setActivities(aRes.data)
        setAlerts(alRes.data)
      } catch (err) {
        console.error('Erreur chargement dashboard:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    )
  }

  const statCards = stats ? [
    {
      icon: DollarSign,
      title: 'Revenus (devis approuvés)',
      value: stats.revenueFormatted || '0€',
      trend: 'up',
      trendValue: stats.trends?.revenue || 0,
      color: 'blue',
    },
    {
      icon: Users,
      title: 'Nouveaux clients (30j)',
      value: stats.newClients ?? 0,
      trend: 'up',
      trendValue: stats.trends?.newClients || 0,
      color: 'green',
    },
    {
      icon: FileText,
      title: 'Devis ouverts',
      value: stats.openDevis ?? 0,
      trend: stats.openDevis > 0 ? 'up' : 'down',
      trendValue: Math.abs(stats.trends?.openDevis || 0),
      color: 'orange',
    },
    {
      icon: FolderKanban,
      title: 'Projets en cours',
      value: stats.projectsInProgress ?? 0,
      trend: 'up',
      trendValue: stats.trends?.projectsInProgress || 0,
      color: 'purple',
    },
    {
      icon: ClipboardCheck,
      title: 'Audits (total)',
      value: stats.audits?.total ?? 0,
      badge: stats.audits?.pending,
      color: 'teal',
    },
    {
      icon: MessageSquare,
      title: 'Demandes de devis',
      value: stats.quoteRequests?.total ?? 0,
      badge: stats.quoteRequests?.pending,
      color: 'orange',
    },
    {
      icon: Mail,
      title: 'Messages contact',
      value: stats.contacts?.total ?? 0,
      badge: stats.contacts?.unread,
      color: 'red',
    },
    {
      icon: FolderKanban,
      title: 'Projets en cours',
      value: stats.projectsInProgress ?? 0,
      trend: 'up',
      trendValue: stats.trends?.projectsInProgress || 0,
      color: 'purple',
    },
  ].filter((_, i) => i < 7) : []

  const lastSixMonths = revenueData.slice(-6)
  const maxRev = Math.max(...lastSixMonths.map(r => r.revenus), 1)

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Dashboard</h1>
        <p className="text-gray-400 mt-1">Vue d'ensemble de votre activité</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {statCards.map((card, i) => <StatCard key={i} {...card} />)}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        {/* Revenue Chart */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Évolution du chiffre d'affaires</h2>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{currentYear}</span>
            </div>
          </div>

          <div className="space-y-3">
            {lastSixMonths.map((item, idx) => (
              <div key={idx} className="group">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400">{item.month}</span>
                  <span className="text-white font-medium">{item.revenus.toLocaleString('fr-FR')}€</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.revenus / maxRev) * 100}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <span>6 derniers mois</span>
            </div>
            <span className="text-xs text-gray-500">
              Total : {lastSixMonths.reduce((s, d) => s + d.revenus, 0).toLocaleString('fr-FR')}€
            </span>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">Activité récente</h2>
          </div>
          <div className="divide-y divide-white/10 max-h-80 overflow-y-auto">
            {activities.length === 0 ? (
              <p className="p-6 text-gray-500 text-sm">Aucune activité récente.</p>
            ) : activities.map((activity) => {
              const iconInfo = activityIconMap[activity.type] || activityIconMap.client
              const Icon = iconInfo.icon
              return (
                <motion.div
                  key={activity.id}
                  onClick={() => navigate(activity.link)}
                  className="p-4 flex items-start gap-3 hover:bg-white/5 transition-colors cursor-pointer group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className={`w-4 h-4 ${iconInfo.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">par {activity.user} · {activity.date}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0 mt-0.5" />
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Alertes système */}
      <motion.div
        variants={fadeUp} initial="hidden" animate="visible"
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            Alertes système
          </h2>
        </div>
        <div className="p-4 space-y-3">
          {alerts.length === 0 ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">Aucune alerte système. Tout est en ordre.</p>
            </div>
          ) : alerts.map((alert) => {
            const AlertIcon = alertIconMap[alert.icon] || AlertCircle
            const classes = getAlertClasses(alert.type)
            return (
              <motion.button
                key={alert.id}
                onClick={() => navigate(alert.link)}
                className={`w-full p-3 rounded-xl border ${classes.wrapper} flex items-center gap-3 transition-all duration-200 text-left group`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <AlertIcon className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs opacity-70 mt-0.5">{alert.detail}</p>
                </div>
                <ChevronRight className={`w-4 h-4 flex-shrink-0 ${classes.chevron} opacity-60 group-hover:opacity-100 transition-all`} />
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </>
  )
}

export default AdminDashboard
