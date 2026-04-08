// ==================== AdminProjets.jsx ====================
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FolderKanban, 
  Plus, 
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle,
  User,
  Calendar,
  Flag
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

const projectStages = [
  { id: 'todo', name: 'À faire', color: 'from-gray-500 to-gray-600', bgColor: 'bg-gray-500/10 border-gray-500/30', textColor: 'text-gray-400' },
  { id: 'progress', name: 'En cours', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-500/10 border-blue-500/30', textColor: 'text-blue-400' },
  { id: 'review', name: 'Review', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-500/10 border-purple-500/30', textColor: 'text-purple-400' },
  { id: 'done', name: 'Terminé', color: 'from-emerald-500 to-teal-500', bgColor: 'bg-emerald-500/10 border-emerald-500/30', textColor: 'text-emerald-400' },
]

const projectsData = {
  todo: [
    { id: 1, name: 'Site E-commerce v2', client: 'ABC Corp', deadline: '30/06/2025', priority: 'haute', assignee: 'Thomas' },
    { id: 2, name: 'Migration Cloud', client: 'Banque Centrale', deadline: '15/07/2025', priority: 'normale', assignee: 'Sophie' },
  ],
  progress: [
    { id: 3, name: 'Installation Réseau', client: 'Hôtel Paradis', deadline: '20/05/2025', progress: 75, priority: 'haute', assignee: 'Marc' },
    { id: 4, name: 'ERP sur mesure', client: 'Groupe Logistique', deadline: '30/08/2025', progress: 40, priority: 'normale', assignee: 'Julie' },
    { id: 5, name: 'Cybersécurité Audit', client: 'Ministère', deadline: '10/06/2025', progress: 60, priority: 'urgente', assignee: 'Pierre' },
  ],
  review: [
    { id: 6, name: 'Application Mobile', client: 'Startup Innov', deadline: '25/04/2025', progress: 95, priority: 'normale', assignee: 'Thomas' },
  ],
  done: [
    { id: 7, name: 'Site Vitrine', client: 'Agence Web Plus', deadline: '10/03/2025', priority: 'basse', assignee: 'Sophie' },
    { id: 8, name: 'Formation IT', client: 'Université', deadline: '05/03/2025', priority: 'normale', assignee: 'Julie' },
  ],
}

const ticketsData = [
  { id: 'TKT-001', subject: 'Problème connexion VPN', priority: 'haute', status: 'open', date: '14/04/2025', assignee: 'Thomas' },
  { id: 'TKT-002', subject: 'Lenteur application', priority: 'normale', status: 'in_progress', date: '13/04/2025', assignee: 'Sophie' },
  { id: 'TKT-003', subject: 'Bug paiement en ligne', priority: 'urgente', status: 'open', date: '15/04/2025', assignee: 'Marc' },
  { id: 'TKT-004', subject: 'Demande modification', priority: 'basse', status: 'resolved', date: '10/04/2025', assignee: 'Julie' },
]

const getPriorityBadge = (priority) => {
  const badges = {
    basse: { label: 'Basse', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
    normale: { label: 'Normale', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    haute: { label: 'Haute', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    urgente: { label: 'Urgente', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  }
  return badges[priority] || badges.normale
}

const getStatusBadge = (status) => {
  const badges = {
    open: { label: 'Ouvert', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    in_progress: { label: 'En cours', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    resolved: { label: 'Résolu', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    closed: { label: 'Fermé', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
  }
  return badges[status] || badges.open
}

const ProjectCard = ({ project, stage }) => {
  const stageConfig = projectStages.find(s => s.id === stage)

  return (
    <div className={`p-3 rounded-xl border ${stageConfig.bgColor} hover:scale-105 transition-all cursor-pointer`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-white text-sm">{project.name}</h4>
        {project.priority && (
          <span className={`text-xs px-1.5 py-0.5 rounded ${getPriorityBadge(project.priority).color}`}>
            {getPriorityBadge(project.priority).label}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-400 mb-2">{project.client}</p>
      {project.progress && (
        <div className="mb-2">
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full h-1.5" style={{ width: `${project.progress}%` }} />
          </div>
          <p className="text-xs text-gray-500 mt-1">{project.progress}%</p>
        </div>
      )}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Calendar className="w-3 h-3" />
        <span>{project.deadline}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
        <User className="w-3 h-3" />
        <span>{project.assignee}</span>
      </div>
    </div>
  )
}

const AdminProjets = () => {
  const [view, setView] = useState('kanban')
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Projets & tickets</h1>
          <p className="text-gray-400 mt-1">Gérez vos projets et le support client</p>
        </div>
        <div className="flex gap-3">
          <div className="flex rounded-xl bg-white/10 p-1">
            <button
              onClick={() => setView('kanban')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'kanban' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Kanban
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Liste
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition">
            <Plus className="w-4 h-4" /> Nouveau projet
          </button>
        </div>
      </motion.div>

      {/* Projects View */}
      {view === 'kanban' ? (
        <div className="overflow-x-auto pb-4 mb-8">
          <div className="flex gap-4 min-w-[1000px]">
            {projectStages.map((stage) => (
              <motion.div
                key={stage.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex-1 min-w-[240px]"
              >
                <div className={`p-3 rounded-xl mb-3 ${stage.bgColor}`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${stage.textColor}`}>{stage.name}</h3>
                    <span className="text-xs text-gray-400">{projectsData[stage.id]?.length || 0}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {projectsData[stage.id]?.map((project) => (
                    <ProjectCard key={project.id} project={project} stage={stage.id} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-8"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr className="text-left">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">Projet</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">Client</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">Statut</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">Progression</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">Échéance</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">Responsable</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {Object.values(projectsData).flat().map((project, idx) => {
                  const stage = projectStages.find(s => projectsData[s.id]?.includes(project))
                  return (
                    <tr key={project.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{project.name}</td>
                      <td className="px-6 py-4 text-gray-300">{project.client}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${stage?.bgColor} ${stage?.textColor}`}>
                          {stage?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-white/10 rounded-full h-1.5">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full h-1.5" style={{ width: `${project.progress || 0}%` }} />
                          </div>
                          <span className="text-xs text-gray-400">{project.progress || 0}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{project.deadline}</td>
                      <td className="px-6 py-4 text-gray-400">{project.assignee}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Tickets Support */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Flag className="w-5 h-5 text-blue-400" />
            Tickets support
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr className="text-left">
                <th className="px-6 py-4 text-sm font-semibold text-gray-400">ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400">Sujet</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400">Priorité</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400">Statut</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400">Assigné</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {ticketsData.map((ticket) => {
                const priority = getPriorityBadge(ticket.priority)
                const status = getStatusBadge(ticket.status)
                return (
                  <tr key={ticket.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{ticket.id}</td>
                    <td className="px-6 py-4 text-gray-300">{ticket.subject}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${priority.color}`}>
                        {priority.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{ticket.date}</td>
                    <td className="px-6 py-4 text-gray-400">{ticket.assignee}</td>
                    <td className="px-6 py-4">
                      <button className="text-xs text-blue-400 hover:text-blue-300">Traiter</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  )
}

export default AdminProjets