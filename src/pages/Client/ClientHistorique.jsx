import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
  GraduationCap
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

const Historique = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [yearFilter, setYearFilter] = useState('all')

  const historique = [
    { id: 'PRJ-001', name: 'Site E-commerce', type: 'Projet', date: '15/12/2025', status: 'completed', amount: '5 000€', icon: FolderKanban },
    { id: 'PRJ-002', name: 'Installation Réseau', type: 'Projet', date: '10/11/2025', status: 'completed', amount: '3 200€', icon: FolderKanban },
    { id: 'DEV-003', name: 'Vidéosurveillance', type: 'Devis', date: '05/10/2025', status: 'completed', amount: '2 800€', icon: FileText },
    { id: 'FRM-001', name: 'Formation Cybersécurité', type: 'Formation', date: '20/09/2025', status: 'completed', amount: '1 500€', icon: GraduationCap },
    { id: 'PRJ-004', name: 'Migration Cloud', type: 'Projet', date: '01/08/2025', status: 'completed', amount: '8 500€', icon: FolderKanban },
    { id: 'DEV-005', name: 'Audit Sécurité', type: 'Devis', date: '15/07/2025', status: 'completed', amount: '4 200€', icon: FileText },
  ]

  const filteredHistorique = historique.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = yearFilter === 'all' || item.date.includes(yearFilter)
    return matchesSearch && matchesYear
  })

  const years = ['all', '2025', '2024', '2023']

  const getTypeColor = (type) => {
    switch(type) {
      case 'Projet': return 'from-blue-500 to-cyan-500'
      case 'Devis': return 'from-emerald-500 to-teal-500'
      case 'Formation': return 'from-purple-500 to-pink-500'
      default: return 'from-blue-500 to-cyan-500'
    }
  }

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Projet': return <FolderKanban className="w-3 h-3" />
      case 'Devis': return <FileText className="w-3 h-3" />
      case 'Formation': return <GraduationCap className="w-3 h-3" />
      default: return <FolderKanban className="w-3 h-3" />
    }
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
                      <option key={year} value={year}>
                        {year === 'all' ? 'Toutes les années' : year}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>

              {/* Grid 3 colonnes comme projets */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredHistorique.map((item, index) => {
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
                          <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                            <Eye className="w-3.5 h-3.5" />
                            Détails
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium hover:scale-105 transition-all">
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