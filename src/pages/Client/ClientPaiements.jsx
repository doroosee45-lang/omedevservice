import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  CreditCard,
  Download,
  Eye,
  Search,
  Calendar,
  Euro,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Wallet
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

const Paiements = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const paiements = [
    { id: 'INV-001', projet: 'Site E-commerce', date: '15/04/2026', montant: '2 500€', montantValue: 2500, statut: 'paid', methode: 'Carte bancaire' },
    { id: 'INV-002', projet: 'Site E-commerce', date: '01/05/2026', montant: '2 500€', montantValue: 2500, statut: 'pending', methode: '-' },
    { id: 'INV-003', projet: 'Installation Réseau', date: '10/04/2026', montant: '1 600€', montantValue: 1600, statut: 'paid', methode: 'Virement' },
    { id: 'INV-004', projet: 'Installation Réseau', date: '25/04/2026', montant: '1 600€', montantValue: 1600, statut: 'overdue', methode: '-' },
    { id: 'INV-005', projet: 'Migration Cloud', date: '05/05/2026', montant: '4 200€', montantValue: 4200, statut: 'pending', methode: '-' },
    { id: 'INV-006', projet: 'Audit Sécurité', date: '20/03/2026', montant: '2 800€', montantValue: 2800, statut: 'paid', methode: 'Carte bancaire' },
  ]

  const getStatusConfig = (statut) => {
    const configs = {
      paid: { label: 'Payé', icon: CheckCircle, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
      pending: { label: 'En attente', icon: Clock, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
      overdue: { label: 'En retard', icon: AlertCircle, color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    }
    return configs[statut] || configs.pending
  }

  const totalPaye = paiements.filter(p => p.statut === 'paid').reduce((sum, p) => sum + p.montantValue, 0)
  const totalDu = paiements.filter(p => p.statut !== 'paid').reduce((sum, p) => sum + p.montantValue, 0)

  const filteredPaiements = paiements.filter(p =>
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.projet.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = [
    { 
      title: 'Total payé', 
      value: `${totalPaye.toLocaleString()} €`, 
      icon: CreditCard, 
      color: 'from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-500/10',
      textLight: 'text-emerald-400'
    },
    { 
      title: 'Restant dû', 
      value: `${totalDu.toLocaleString()} €`, 
      icon: AlertCircle, 
      color: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-500/10',
      textLight: 'text-amber-400'
    },
    { 
      title: 'Paiements effectués', 
      value: paiements.filter(p => p.statut === 'paid').length.toString(), 
      icon: Wallet, 
      color: 'from-blue-500 to-cyan-500',
      bgLight: 'bg-blue-500/10',
      textLight: 'text-blue-400'
    },
  ]

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
                <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Paiements</h1>
                <p className="text-gray-400 mt-1">Gérez vos factures et effectuez vos paiements</p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/15"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.bgLight} ${stat.textLight}`}>
                        {stat.title === 'Total payé' ? 'Réglé' : stat.title === 'Restant dû' ? 'À régler' : 'Total'}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white font-syne">{stat.value}</div>
                    <div className="text-gray-400 text-sm mt-1">{stat.title}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quick Action Card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-6 border border-white/10 mb-6"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white font-syne mb-1">Effectuer un paiement</h3>
                      <p className="text-gray-400">Réglez vos factures en ligne en toute sécurité</p>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 shadow-lg">
                    Payer maintenant
                    <CreditCard className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Search */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-6"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Rechercher une facture..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </motion.div>

              {/* Payments Grid - 3 colonnes comme projets */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredPaiements.map((paiement, index) => {
                  const status = getStatusConfig(paiement.statut)
                  const StatusIcon = status.icon
                  
                  return (
                    <motion.div
                      key={paiement.id}
                      variants={fadeUp}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full"
                    >
                      {/* Header with gradient bar */}
                      <div className="relative">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                        <div className="p-5 pb-3">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                                <CreditCard className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-xs text-gray-500 font-mono">{paiement.id}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-blue-400" />
                              <span className="text-xs text-gray-400">{paiement.date}</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{paiement.projet}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${status.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              {status.label}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 pt-0 flex-1 flex flex-col">
                        {/* Amount */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Euro className="w-4 h-4 text-emerald-400" />
                            <span className="text-2xl font-bold text-white">{paiement.montant}</span>
                          </div>
                        </div>

                        {/* Payment method if paid */}
                        {paiement.statut === 'paid' && paiement.methode !== '-' && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-400">Paiement: {paiement.methode}</span>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                          <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                            <Eye className="w-3.5 h-3.5" />
                            Voir
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                            <Download className="w-3.5 h-3.5" />
                            Facture
                          </button>
                          {paiement.statut !== 'paid' && (
                            <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-medium hover:scale-105 transition-all">
                              Payer
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Empty State */}
              {filteredPaiements.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
                >
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