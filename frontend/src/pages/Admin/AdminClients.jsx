// ==================== AdminClients.jsx ====================
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Shield,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  Mail,
  Phone,
  Calendar,
  User,
  Star,
  Send
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const ClientModal = ({ client, onClose, onSave }) => {
  const [formData, setFormData] = useState(client || {
    name: '', email: '', phone: '', role: 'client', status: 'active'
  })

  const roles = [
    { value: 'super_admin', label: 'Super Admin', color: 'from-purple-500 to-pink-500' },
    { value: 'admin', label: 'Admin', color: 'from-red-500 to-orange-500' },
    { value: 'manager', label: 'Manager', color: 'from-blue-500 to-cyan-500' },
    { value: 'client', label: 'Client', color: 'from-emerald-500 to-teal-500' },
    { value: 'visitor', label: 'Visiteur', color: 'from-gray-500 to-gray-600' },
  ]

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-md p-6 border border-white/10"
      >
        <h2 className="text-xl font-bold text-white mb-4">{client ? 'Modifier' : 'Ajouter'} un utilisateur</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nom complet"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
          >
            {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">Annuler</button>
          <button onClick={() => onSave(formData)} className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition">Enregistrer</button>
        </div>
      </motion.div>
    </div>
  )
}

const AdminClients = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [showAuditLog, setShowAuditLog] = useState(true)
  const itemsPerPage = 12 // 4x3 grid

  const [clients, setClients] = useState([
    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@email.com', phone: '+243 555 503 59', role: 'client', status: 'active', date: '15/01/2024', totalProjects: 3 },
    { id: 2, name: 'Marie Martin', email: 'marie.martin@email.com', phone: '+243 555 503 60', role: 'manager', status: 'active', date: '10/02/2024', totalProjects: 8 },
    { id: 3, name: 'Admin OMDEVE', email: 'admin@omdeve.com', phone: '+243 555 503 61', role: 'super_admin', status: 'active', date: '01/01/2024', totalProjects: 15 },
    { id: 4, name: 'Sophie Bernard', email: 'sophie@email.com', phone: '+243 555 503 62', role: 'admin', status: 'active', date: '20/03/2024', totalProjects: 12 },
    { id: 5, name: 'Thomas Dubois', email: 'thomas@email.com', phone: '+243 555 503 63', role: 'client', status: 'inactive', date: '05/04/2024', totalProjects: 1 },
    { id: 6, name: 'Isabelle Kabila', email: 'isabelle@email.com', phone: '+243 555 503 64', role: 'client', status: 'active', date: '10/04/2024', totalProjects: 2 },
    { id: 7, name: 'François Lumumba', email: 'francois@email.com', phone: '+243 555 503 65', role: 'manager', status: 'active', date: '15/04/2024', totalProjects: 5 },
    { id: 8, name: 'Rachel Mputu', email: 'rachel@email.com', phone: '+243 555 503 66', role: 'client', status: 'active', date: '20/04/2024', totalProjects: 1 },
  ])

  const [auditLog, setAuditLog] = useState([
    { id: 1, action: 'Modification rôle', user: 'Super Admin', target: 'Jean Dupont', targetId: 1, date: '15/04/2026 10:30' },
    { id: 2, action: 'Désactivation compte', user: 'Admin', target: 'Thomas Dubois', targetId: 5, date: '14/04/2026 14:20' },
    { id: 3, action: 'Création utilisateur', user: 'Super Admin', target: 'Sophie Bernard', targetId: 4, date: '13/04/2026 09:15' },
    { id: 4, action: 'Modification statut', user: 'Manager', target: 'Marie Martin', targetId: 2, date: '12/04/2026 16:45' },
  ])

  const getRoleBadge = (role) => {
    const badges = {
      super_admin: { label: 'Super Admin', color: 'from-purple-500 to-pink-500', text: 'text-purple-400', icon: Star },
      admin: { label: 'Admin', color: 'from-red-500 to-orange-500', text: 'text-red-400', icon: Shield },
      manager: { label: 'Manager', color: 'from-blue-500 to-cyan-500', text: 'text-blue-400', icon: User },
      client: { label: 'Client', color: 'from-emerald-500 to-teal-500', text: 'text-emerald-400', icon: Users },
      visitor: { label: 'Visiteur', color: 'from-gray-500 to-gray-600', text: 'text-gray-400', icon: Eye },
    }
    return badges[role] || badges.client
  }

  const filteredClients = clients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       c.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchRole = roleFilter === 'all' || c.role === roleFilter
    const matchStatus = statusFilter === 'all' || c.status === statusFilter
    return matchSearch && matchRole && matchStatus
  })

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSaveClient = (data) => {
    if (selectedClient) {
      setClients(clients.map(c => c.id === selectedClient.id ? { ...c, ...data } : c))
      // Ajouter au journal d'audit
      const newLog = {
        id: auditLog.length + 1,
        action: 'Modification profil',
        user: 'Admin',
        target: data.name,
        targetId: selectedClient.id,
        date: new Date().toLocaleString('fr-FR')
      }
      setAuditLog([newLog, ...auditLog])
    } else {
      const newClient = { ...data, id: clients.length + 1, date: new Date().toLocaleDateString('fr-FR'), totalProjects: 0 }
      setClients([...clients, newClient])
      // Ajouter au journal d'audit
      const newLog = {
        id: auditLog.length + 1,
        action: 'Création utilisateur',
        user: 'Admin',
        target: data.name,
        targetId: newClient.id,
        date: new Date().toLocaleString('fr-FR')
      }
      setAuditLog([newLog, ...auditLog])
    }
    setShowModal(false)
    setSelectedClient(null)
  }

  const toggleStatus = (id) => {
    const client = clients.find(c => c.id === id)
    const newStatus = client.status === 'active' ? 'inactive' : 'active'
    setClients(clients.map(c => c.id === id ? { ...c, status: newStatus } : c))
    
    // Ajouter au journal d'audit
    const newLog = {
      id: auditLog.length + 1,
      action: newStatus === 'active' ? 'Activation compte' : 'Désactivation compte',
      user: 'Admin',
      target: client.name,
      targetId: id,
      date: new Date().toLocaleString('fr-FR')
    }
    setAuditLog([newLog, ...auditLog])
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const handleSendEmail = (email) => {
    window.location.href = `mailto:${email}`
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Clients & rôles</h1>
          <p className="text-gray-400 mt-1">Gérez les utilisateurs et leurs permissions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAuditLog(!showAuditLog)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-gray-300 hover:bg-white/20 transition"
          >
            <Shield className="w-4 h-4" />
            {showAuditLog ? 'Masquer' : 'Afficher'} audit
          </button>
          <button
            onClick={() => { setSelectedClient(null); setShowModal(true) }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition"
          >
            <Plus className="w-4 h-4" /> Nouvel utilisateur
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">Tous les rôles</option>
          <option value="super_admin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="client">Client</option>
          <option value="visitor">Visiteur</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
        </select>
      </motion.div>

      {/* Clients Cards Grid - 4 per line */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
      >
        {paginatedClients.map((client, index) => {
          const roleBadge = getRoleBadge(client.role)
          const RoleIcon = roleBadge.icon
          
          return (
            <motion.div
              key={client.id}
              variants={fadeUp}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full group"
            >
              {/* Header with gradient bar */}
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                <div className="p-4 pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">{getInitials(client.name)}</span>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                          {client.name}
                        </h3>
                        <span className="text-xs text-gray-500">#{client.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-xs text-gray-400">{client.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 flex-1 flex flex-col">
                {/* Email - cliquable */}
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <button
                      onClick={() => handleSendEmail(client.email)}
                      className="text-xs text-blue-400 hover:text-blue-300 hover:underline transition-all truncate cursor-pointer"
                      title={`Envoyer un email à ${client.email}`}
                    >
                      {client.email}
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-300">{client.phone}</span>
                  </div>
                </div>

                {/* Role Badge */}
                <div className="mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${roleBadge.color} bg-opacity-20 ${roleBadge.text}`}>
                    <RoleIcon className="w-3 h-3" />
                    {roleBadge.label}
                  </span>
                </div>

                {/* Projects count */}
                <div className="mb-3 p-2 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Projets</span>
                    <span className="text-sm font-semibold text-blue-400">{client.totalProjects}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1 mt-1">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full h-1" 
                      style={{ width: `${Math.min(client.totalProjects * 10, 100)}%` }} 
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
                    client.status === 'active' 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border-red-500/30'
                  }`}>
                    {client.status === 'active' ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                    {client.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                  <button
                    onClick={() => { setSelectedClient(client); setShowModal(true) }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium hover:scale-105 transition-all"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Modifier
                  </button>
                  <button
                    onClick={() => toggleStatus(client.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl border text-xs font-medium transition-all ${
                      client.status === 'active'
                        ? 'border-amber-500/50 text-amber-400 hover:bg-amber-500/20'
                        : 'border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20'
                    }`}
                  >
                    {client.status === 'active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                    {client.status === 'active' ? 'Désactiver' : 'Activer'}
                  </button>
                </div>

                {/* Quick email button */}
                <button
                  onClick={() => handleSendEmail(client.email)}
                  className="mt-2 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs font-medium hover:bg-blue-500/20 hover:text-blue-400 transition-all"
                >
                  <Send className="w-3 h-3" />
                  Envoyer un email
                </button>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl mb-8"
        >
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white">Aucun utilisateur trouvé</h3>
          <p className="text-gray-500 mt-1">Essayez de modifier vos critères de recherche</p>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mt-8 pt-6 border-t border-white/10 mb-8"
        >
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Précédent
          </button>
          <span className="text-sm text-gray-400">Page {currentPage} sur {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
          >
            Suivant <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Audit Log */}
      {showAuditLog && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Journal d'audit
              <span className="ml-2 text-xs text-gray-500">({auditLog.length} événements)</span>
            </h2>
          </div>
          <div className="divide-y divide-white/10 max-h-96 overflow-y-auto">
            {auditLog.map((log) => (
              <div key={log.id} className="p-4 flex items-center gap-3 hover:bg-white/5 transition-colors">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">
                    <span className="font-medium text-blue-400">{log.user}</span> a {log.action} :{' '}
                    <span className="text-white">{log.target}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{log.date}</p>
                </div>
                {log.targetId && (
                  <button
                    onClick={() => {
                      const client = clients.find(c => c.id === log.targetId)
                      if (client) {
                        setSelectedClient(client)
                        setShowModal(true)
                      }
                    }}
                    className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
                  >
                    Voir
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {showModal && (
        <ClientModal
          client={selectedClient}
          onClose={() => { setShowModal(false); setSelectedClient(null) }}
          onSave={handleSaveClient}
        />
      )}
    </>
  )
}

export default AdminClients