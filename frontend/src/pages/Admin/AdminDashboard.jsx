import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  FileText,
  FolderKanban,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar,
  ChevronRight,
  Mail,
  ClipboardCheck,
  MessageSquare,
} from 'lucide-react'
import { adminDashboard } from '../../services/api'
import { PageHeader, StatCard, Card, LoadingState, EmptyState, fadeUp, staggerContainer } from '../../components/Admin/ui'

// Mappe les couleurs métier historiques vers les dégradés du Design System (Home)
const colorToGradient = {
  blue: 'blue',
  green: 'energy',
  orange: 'navy',
  purple: 'purple',
  red: 'red',
  teal: 'teal',
}

const activityIconMap = {
  client:  { icon: Users,         color: 'text-[#55DDB5]' },
  devis:   { icon: FileText,      color: 'text-blue-400'    },
  projet:  { icon: FolderKanban,  color: 'text-purple-400'  },
  ticket:  { icon: AlertCircle,   color: 'text-indigo-400'  },
  audit:   { icon: ClipboardCheck,color: 'text-[#55DDB5]'    },
  contact: { icon: MessageSquare, color: 'text-blue-300'    },
}

const getAlertClasses = (type) => {
  switch (type) {
    case 'warning': return { wrapper: 'bg-amber-500/20 border-amber-500/30 text-amber-400 hover:bg-amber-500/30', chevron: 'text-amber-400' }
    case 'error':   return { wrapper: 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30',         chevron: 'text-red-400'   }
    case 'info':    return { wrapper: 'bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30',     chevron: 'text-blue-400'  }
    default:        return { wrapper: 'bg-white/10 border-white/10 text-white/60 hover:bg-white/15',              chevron: 'text-white/60'  }
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
  const [error, setError]           = useState(false)
  const [stats, setStats]           = useState(null)
  const [revenueData, setRevenue]   = useState([])
  const [activities, setActivities] = useState([])
  const [alerts, setAlerts]         = useState([])

  const fetchAll = async () => {
    setLoading(true)
    setError(false)
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
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  if (loading) {
    return <LoadingState label="Chargement du dashboard…" />
  }

  if (error) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Impossible de charger le tableau de bord"
        description="Une erreur est survenue lors du chargement des données. Vérifiez votre connexion et réessayez."
        action={
          <button onClick={fetchAll} className="px-5 py-2.5 rounded-full bg-[#2AACB2] hover:bg-[#2AACB2]/80 text-white text-sm font-semibold transition-colors">
            Réessayer
          </button>
        }
      />
    )
  }

  const statCards = stats ? [
    {
      icon: DollarSign,
      title: 'Revenus totaux',
      value: stats.revenueFormatted || '0 €',
      color: 'blue',
    },
    {
      icon: Users,
      title: 'Total clients',
      value: stats.totalClients ?? 0,
      trend: stats.trends?.newClients > 0 ? 'up' : stats.trends?.newClients < 0 ? 'down' : undefined,
      trendValue: Math.abs(stats.trends?.newClients || 0),
      color: 'green',
      sub: stats.newClients > 0 ? `+${stats.newClients} ce mois-ci` : undefined,
    },
    {
      icon: FileText,
      title: 'Devis ouverts',
      value: stats.openDevis ?? 0,
      trend: stats.trends?.openDevis >= 0 ? 'up' : 'down',
      trendValue: Math.abs(stats.trends?.openDevis || 0),
      color: 'orange',
    },
    {
      icon: FolderKanban,
      title: 'Projets en cours',
      value: stats.projectsInProgress ?? 0,
      trend: stats.trends?.projectsInProgress >= 0 ? 'up' : 'down',
      trendValue: Math.abs(stats.trends?.projectsInProgress || 0),
      color: 'purple',
    },
    {
      icon: ClipboardCheck,
      title: 'Audits',
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
  ] : []

  const lastSixMonths = revenueData.slice(-6)
  const maxRev = Math.max(...lastSixMonths.map(r => r.revenus), 1)

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Vue d'ensemble de votre activité" />

      {/* Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {statCards.map((card, i) => (
          <StatCard key={i} icon={card.icon} label={card.title} value={card.value} trend={card.trend} trendValue={card.trendValue} badge={card.badge} sub={card.sub} gradient={colorToGradient[card.color] || 'blue'} />
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        {/* Revenue Chart */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white font-syne">Évolution du chiffre d'affaires</h2>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Calendar className="w-4 h-4" />
              <span>{currentYear}</span>
            </div>
          </div>

          <div className="space-y-3">
            {lastSixMonths.map((item, idx) => (
              <div key={idx} className="group">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-white/50">{item.month}</span>
                  <span className="text-white font-medium">{item.revenus.toLocaleString('fr-FR')}€</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.revenus / maxRev) * 100}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#0B74C1] to-[#55DDB5]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#55DDB5]">
              <TrendingUp className="w-4 h-4" />
              <span>6 derniers mois</span>
            </div>
            <span className="text-xs text-white/40">
              Total : {lastSixMonths.reduce((s, d) => s + d.revenus, 0).toLocaleString('fr-FR')}€
            </span>
          </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <Card className="overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white font-syne">Activité récente</h2>
          </div>
          <div className="divide-y divide-white/10 max-h-80 overflow-y-auto">
            {activities.length === 0 ? (
              <p className="p-6 text-white/40 text-sm">Aucune activité récente.</p>
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
                    <p className="text-xs text-white/40 mt-1">par {activity.user} · {activity.date}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0 mt-0.5" />
                </motion.div>
              )
            })}
          </div>
          </Card>
        </motion.div>
      </div>

      {/* Alertes système */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <Card className="overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white font-syne flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            Alertes système
          </h2>
        </div>
        <div className="p-4 space-y-3">
          {alerts.length === 0 ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#2AACB2]/10 border border-[#2AACB2]/20 text-[#55DDB5]">
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
        </Card>
      </motion.div>
    </>
  )
}

export default AdminDashboard
