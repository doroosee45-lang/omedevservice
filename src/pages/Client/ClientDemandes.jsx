// ==================== Demandes.jsx ====================
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Calendar,
  Euro,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText  // ← Ajoutez ceci
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

const Demandes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const demandes = [
    { 
      id: 'DEV-001', 
      service: 'Développement Digital', 
      description: 'Site e-commerce complet avec paiement intégré, gestion de stock et livraison',
      date: '15/04/2026',
      status: 'pending',
      amount: '5 000€',
      estimatedDelivery: '15/05/2026'
    },
    { 
      id: 'DEV-002', 
      service: 'Réseau & Infrastructure', 
      description: 'Installation réseau complet pour 50 postes, câblage structuré et configuration VLAN',
      date: '10/04/2026',
      status: 'approved',
      amount: '3 200€',
      estimatedDelivery: '10/05/2026'
    },
    { 
      id: 'DEV-003', 
      service: 'Sécurité', 
      description: 'Installation vidéosurveillance 16 caméras 4K avec enregistrement cloud',
      date: '05/04/2026',
      status: 'completed',
      amount: '2 800€',
      estimatedDelivery: '25/04/2026'
    },
    { 
      id: 'DEV-004', 
      service: 'Formation', 
      description: 'Formation Cybersécurité pour 10 personnes (5 jours)',
      date: '01/04/2026',
      status: 'rejected',
      amount: '1 500€',
      estimatedDelivery: '-'
    },
    { 
      id: 'DEV-005', 
      service: 'Cloud & Hébergement', 
      description: 'Migration serveurs vers AWS + maintenance 24/7',
      date: '28/03/2026',
      status: 'approved',
      amount: '4 200€',
      estimatedDelivery: '20/05/2026'
    },
    { 
      id: 'DEV-006', 
      service: 'Énergie & Équipements', 
      description: 'Installation 20 panneaux solaires + onduleurs',
      date: '20/03/2026',
      status: 'pending',
      amount: '12 500€',
      estimatedDelivery: '30/06/2026'
    },
  ]

  const getStatusConfig = (status) => {
    const configs = {
      pending: { label: 'En attente', icon: Clock, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
      approved: { label: 'Approuvé', icon: CheckCircle, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
      completed: { label: 'Terminé', icon: CheckCircle, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      rejected: { label: 'Refusé', icon: XCircle, color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    }
    return configs[status] || configs.pending
  }

  const filteredDemandes = demandes.filter(demande => {
    const matchesSearch = demande.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          demande.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || demande.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
                <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Mes demandes de devis</h1>
                <p className="text-gray-400 mt-1">Suivez l'état de vos demandes et devis</p>
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
                      placeholder="Rechercher par numéro ou service..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="pending">En attente</option>
                      <option value="approved">Approuvés</option>
                      <option value="completed">Terminés</option>
                      <option value="rejected">Refusés</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Demands Grid - 3 columns like Projects */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredDemandes.map((demande, index) => {
                  const status = getStatusConfig(demande.status)
                  const StatusIcon = status.icon
                  
                  return (
                    <motion.div
                      key={demande.id}
                      variants={fadeUp}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full group"
                    >
                      {/* Header with gradient bar */}
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
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {demande.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 flex-1 flex flex-col">
                        {/* Status Badge */}
                        <div className="mb-4">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </div>

                        {/* Amount */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs text-gray-400">Montant</span>
                            <span className="text-xs font-medium text-emerald-400">{demande.amount}</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-1.5">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full h-1.5" style={{ width: '100%' }} />
                          </div>
                        </div>

                        {/* Estimated Delivery */}
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

                        {/* Actions */}
                        <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                          <Link
                            to={`/client/demandes/${demande.id}`}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium hover:scale-105 transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Détails
                          </Link>
                          {(demande.status === 'approved' || demande.status === 'completed') && (
                            <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-all">
                              <Download className="w-3.5 h-3.5" />
                              PDF
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Empty State */}
              {filteredDemandes.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
                >
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