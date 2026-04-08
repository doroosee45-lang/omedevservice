import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FolderKanban, 
  Calendar, 
  Users, 
  MessageCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  User
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

const Projets = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const projets = [
    {
      id: 'PRJ-001',
      name: 'Site E-commerce',
      description: 'Développement complet d\'une plateforme e-commerce avec paiement intégré',
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
                <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Mes projets</h1>
                <p className="text-gray-400 mt-1">Suivez l'avancement de vos projets en cours</p>
              </motion.div>

              {/* Grid 3 colonnes */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {projets.map((projet, index) => (
                  <motion.div
                    key={projet.id}
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
                              {task.completed ? (
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <div className="w-3.5 h-3.5 border-2 border-gray-500 rounded-full" />
                              )}
                              <span className={`text-xs ${task.completed ? 'text-gray-500 line-through' : 'text-gray-400'}`}>
                                {task.name.length > 30 ? task.name.substring(0, 27) + '...' : task.name}
                              </span>
                            </div>
                          ))}
                          {projet.tasks.length > 3 && (
                            <p className="text-xs text-gray-500 mt-1">+{projet.tasks.length - 3} autres tâches</p>
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
                            <span key={idx} className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-gray-300">
                              {member}
                            </span>
                          ))}
                          {projet.team.length > 3 && (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-gray-400">
                              +{projet.team.length - 3}
                            </span>
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
                        <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium hover:scale-105 transition-all">
                          <MessageCircle className="w-3.5 h-3.5" />
                          Discuter
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-all">
                          Détails
                          <ArrowRight className="w-3.5 h-3.5" />
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