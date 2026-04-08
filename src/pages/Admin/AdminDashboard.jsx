












// ==================== AdminDashboard.jsx (sans recharts) ====================
import { useState } from 'react'
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
  Calendar
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const StatCard = ({ icon: Icon, title, value, trend, trendValue, color }) => {
  const getColorClasses = () => {
    switch(color) {
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
        <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span>{trendValue}%</span>
        </div>
      </div>
      <div className="text-2xl font-bold text-white font-syne">{value}</div>
      <div className="text-gray-400 text-sm mt-1">{title}</div>
    </motion.div>
  )
}

const AdminDashboard = () => {
  const [stats] = useState([
    { icon: DollarSign, title: 'Revenus', value: '124 500€', trend: 'up', trendValue: '15', color: 'blue' },
    { icon: Users, title: 'Nouveaux clients', value: '12', trend: 'up', trendValue: '8', color: 'green' },
    { icon: FileText, title: 'Devis ouverts', value: '8', trend: 'down', trendValue: '2', color: 'orange' },
    { icon: FolderKanban, title: 'Projets en cours', value: '5', trend: 'up', trendValue: '25', color: 'purple' },
  ])

  const [revenueData] = useState([
    { month: 'Jan', revenus: 8500, maxRevenue: 20000 },
    { month: 'Fév', revenus: 9200, maxRevenue: 20000 },
    { month: 'Mar', revenus: 10500, maxRevenue: 20000 },
    { month: 'Avr', revenus: 11200, maxRevenue: 20000 },
    { month: 'Mai', revenus: 12800, maxRevenue: 20000 },
    { month: 'Juin', revenus: 13500, maxRevenue: 20000 },
    { month: 'Juil', revenus: 14200, maxRevenue: 20000 },
    { month: 'Aoû', revenus: 14800, maxRevenue: 20000 },
    { month: 'Sep', revenus: 15600, maxRevenue: 20000 },
    { month: 'Oct', revenus: 16200, maxRevenue: 20000 },
    { month: 'Nov', revenus: 17100, maxRevenue: 20000 },
    { month: 'Déc', revenus: 18500, maxRevenue: 20000 },
  ])

  const [recentActivities] = useState([
    { id: 1, action: 'Nouveau client inscrit', user: 'Jean Dupont', date: '15/04/2026 10:30', type: 'client' },
    { id: 2, action: 'Devis #DEV-012 validé', user: 'Marie Martin', date: '14/04/2026 14:20', type: 'devis' },
    { id: 3, action: 'Projet "Site E-commerce" terminé', user: 'Thomas Bernard', date: '13/04/2026 09:15', type: 'projet' },
    { id: 4, action: 'Ticket support #TKT-005 résolu', user: 'Sophie Dubois', date: '12/04/2026 16:45', type: 'ticket' },
  ])

  const [alerts] = useState([
    { id: 1, message: '3 devis en attente depuis plus de 7 jours', type: 'warning', icon: Clock },
    { id: 2, message: '2 tickets support urgents non traités', type: 'error', icon: AlertCircle },
    { id: 3, message: 'Migration serveur planifiée le 20/04', type: 'info', icon: CheckCircle },
  ])

  const getActivityIcon = (type) => {
    switch(type) {
      case 'client': return <Users className="w-4 h-4 text-emerald-400" />
      case 'devis': return <FileText className="w-4 h-4 text-blue-400" />
      case 'projet': return <FolderKanban className="w-4 h-4 text-purple-400" />
      case 'ticket': return <AlertCircle className="w-4 h-4 text-orange-400" />
      default: return <Eye className="w-4 h-4 text-gray-400" />
    }
  }

  const getAlertColor = (type) => {
    switch(type) {
      case 'warning': return 'bg-amber-500/20 border-amber-500/30 text-amber-400'
      case 'error': return 'bg-red-500/20 border-red-500/30 text-red-400'
      case 'info': return 'bg-blue-500/20 border-blue-500/30 text-blue-400'
      default: return 'bg-white/10 border-white/10 text-gray-400'
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
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
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart - Version sans recharts */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Évolution du chiffre d'affaires</h2>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>2025</span>
            </div>
          </div>
          
          {/* Bar Chart custom */}
          <div className="space-y-3">
            {revenueData.slice(-6).map((item, idx) => (
              <div key={idx} className="group">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400">{item.month}</span>
                  <span className="text-white font-medium">{item.revenus.toLocaleString()}€</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.revenus / item.maxRevenue) * 100}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs text-gray-500">
            <span>Jan</span>
            <span>Fév</span>
            <span>Mar</span>
            <span>Avr</span>
            <span>Mai</span>
            <span>Juin</span>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">Activité récente</h2>
          </div>
          <div className="divide-y divide-white/10">
            {recentActivities.map((activity) => (
              <motion.div 
                key={activity.id} 
                className="p-4 flex items-start gap-3 hover:bg-white/5 transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">par {activity.user} • {activity.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Alerts */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            Alertes système
          </h2>
        </div>
        <div className="p-4 space-y-3">
          {alerts.map((alert) => {
            const AlertIcon = alert.icon
            return (
              <motion.div 
                key={alert.id} 
                className={`p-3 rounded-xl border ${getAlertColor(alert.type)} flex items-center gap-3 cursor-pointer`}
                whileHover={{ scale: 1.01 }}
              >
                <AlertIcon className="w-5 h-5" />
                <p className="text-sm">{alert.message}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </>
  )
}

export default AdminDashboard








