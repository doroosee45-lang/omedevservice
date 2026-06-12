import { motion } from 'framer-motion'

const StatCard = ({ icon: Icon, title, value, color, trend, trendValue }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}%
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-gray-600 text-sm mt-1">{title}</p>
    </motion.div>
  )
}

export default StatCard