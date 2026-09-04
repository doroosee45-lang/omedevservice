// ==================== AdminClients.jsx ====================
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { users as usersApi } from '../../services/api'
import {
  Users,
  Plus,
  Edit,
  UserCheck,
  UserX,
  Shield,
  Eye,
  Mail,
  Phone,
  Calendar,
  User,
  Star,
  Send
} from 'lucide-react'
import { PageHeader, Card, Button, Modal, SearchInput, Select, Pagination, EmptyState, fadeUp, staggerContainer } from '../../components/Admin/ui'

const ClientModal = ({ client, onClose, onSave, saving }) => {
  const [formData, setFormData] = useState(client || {
    name: '', email: '', phone: '', role: 'client', status: 'active'
  })

  const roles = [
    { value: 'super_admin', label: 'Super Admin' },
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'client', label: 'Client' },
    { value: 'visitor', label: 'Visiteur' },
  ]

  return (
    <Modal open onClose={onClose} title={`${client ? 'Modifier' : 'Ajouter'} un utilisateur`}>
      <div className="space-y-4">
        {!client && (
          <p className="text-xs text-white/50 -mt-1 mb-1">
            Un email d'activation sera envoyé automatiquement à l'adresse indiquée pour que l'utilisateur définisse son mot de passe.
          </p>
        )}
        <input
          type="text"
          placeholder="Nom complet"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="admin-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="admin-input"
        />
        <input
          type="tel"
          placeholder="Téléphone"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="admin-input"
        />
        <Select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
          {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
        </Select>
        {client && (
          <Select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </Select>
        )}
      </div>
      <div className="flex gap-3 mt-6">
        <Button variant="outline" className="flex-1" onClick={onClose} disabled={saving}>Annuler</Button>
        <Button variant="primary" className="flex-1" onClick={() => onSave(formData)} disabled={saving}>
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </Button>
      </div>
    </Modal>
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
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const itemsPerPage = 12

  const [clients, setClients] = useState([])
  const [auditLog, setAuditLog] = useState([])

  const showFeedback = (message, type = 'success') => {
    setFeedback({ message, type })
    setTimeout(() => setFeedback(null), 5000)
  }

  useEffect(() => { loadUsers() }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const res = await usersApi.getAll()
      const data = (res.data?.users || res.data || []).map(u => ({
        ...u,
        id: u._id,
        date: u.createdAt ? new Date(u.createdAt).toLocaleDateString('fr-FR') : '',
        totalProjects: u.totalProjects || 0,
        status: u.isActive ? 'active' : 'inactive',
      }))
      setClients(data)
    } catch (err) {
      console.error('Erreur chargement utilisateurs:', err)
    } finally {
      setLoading(false)
    }
  }

  const getRoleBadge = (role) => {
    const badges = {
      super_admin: { label: 'Super Admin', color: 'from-purple-500 to-indigo-500', text: 'text-purple-400', icon: Star },
      admin: { label: 'Admin', color: 'from-red-500 to-red-600', text: 'text-red-400', icon: Shield },
      manager: { label: 'Manager', color: 'from-blue-500 to-blue-600', text: 'text-blue-400', icon: User },
      client: { label: 'Client', color: 'from-[#2AACB2] to-[#2AACB2]', text: 'text-[#55DDB5]', icon: Users },
      visitor: { label: 'Visiteur', color: 'from-gray-500 to-gray-600', text: 'text-white/50', icon: Eye },
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

  const handleSaveClient = async (data) => {
    setSaving(true)
    try {
      if (selectedClient) {
        await usersApi.update(selectedClient._id || selectedClient.id, {
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.role,
          isActive: data.status === 'active',
        })
        const log = { id: Date.now(), action: 'Modification profil', user: 'Admin', target: data.name, targetId: selectedClient.id, date: new Date().toLocaleString('fr-FR') }
        setAuditLog(prev => [log, ...prev])
        showFeedback(`Profil de ${data.name} mis à jour.`)
      } else {
        const res = await usersApi.create({
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.role,
        })
        const log = { id: Date.now(), action: 'Création de compte', user: 'Admin', target: data.name, targetId: null, date: new Date().toLocaleString('fr-FR') }
        setAuditLog(prev => [log, ...prev])
        if (res.data?.emailSent) {
          showFeedback(`Compte créé pour ${data.name}. Un email d'activation a été envoyé à ${data.email}.`)
        } else {
          showFeedback(
            `Compte créé pour ${data.name}, mais l'email d'activation n'a pas pu être envoyé à ${data.email}${res.data?.activationEmailError ? ` (${res.data.activationEmailError})` : ''}. Utilisez "Renvoyer l'activation" une fois le problème résolu.`,
            'error'
          )
        }
      }
      setShowModal(false)
      setSelectedClient(null)
      await loadUsers()
    } catch (err) {
      showFeedback(err.response?.data?.message || 'Erreur lors de la sauvegarde de l\'utilisateur', 'error')
    } finally {
      setSaving(false)
    }
  }

  const toggleStatus = async (id) => {
    const client = clients.find(c => c.id === id || c._id === id)
    try {
      await usersApi.toggleStatus(id)
      const newStatus = client?.status === 'active' ? 'inactive' : 'active'
      const log = { id: Date.now(), action: newStatus === 'active' ? 'Activation compte' : 'Désactivation compte', user: 'Admin', target: client?.name, targetId: id, date: new Date().toLocaleString('fr-FR') }
      setAuditLog(prev => [log, ...prev])
      await loadUsers()
    } catch (err) {
      console.error('Erreur changement statut:', err)
    }
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const handleSendEmail = (email) => {
    window.location.href = `mailto:${email}`
  }

  const handleResendActivation = async (client) => {
    try {
      const res = await usersApi.resendActivation(client.id)
      showFeedback(res.data?.message || `Email d'activation renvoyé à ${client.email}.`)
      await loadUsers()
    } catch (err) {
      showFeedback(err.response?.data?.message || `Échec du renvoi de l'email à ${client.email}.`, 'error')
    }
  }

  return (
    <>
      <PageHeader
        title="Clients & rôles"
        subtitle="Gérez les utilisateurs et leurs permissions"
        actions={
          <>
            <Button variant="outline" icon={Shield} onClick={() => setShowAuditLog(!showAuditLog)}>
              {showAuditLog ? 'Masquer' : 'Afficher'} audit
            </Button>
            <Button variant="primary" icon={Plus} onClick={() => { setSelectedClient(null); setShowModal(true) }}>
              Nouvel utilisateur
            </Button>
          </>
        }
      />

      {/* Stats récap */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
      >
        {[
          { label: 'Total utilisateurs', value: clients.length, color: 'text-white' },
          { label: 'Clients', value: clients.filter(c => c.role === 'client').length, color: 'text-[#55DDB5]' },
          { label: 'Admins / Managers', value: clients.filter(c => ['admin','super_admin','manager'].includes(c.role)).length, color: 'text-purple-300' },
          { label: 'Comptes actifs', value: clients.filter(c => c.status !== 'inactive' && c.isActive !== false).length, color: 'text-blue-300' },
        ].map((s, i) => (
          <motion.div key={i} variants={fadeUp} className="admin-card p-4">
            <p className={`text-2xl font-bold font-syne ${s.color}`}>{s.value}</p>
            <p className="text-white/50 text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher par nom ou email..." />
        <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="sm:w-56">
          <option value="all">Tous les rôles</option>
          <option value="super_admin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="client">Client</option>
          <option value="visitor">Visiteur</option>
        </Select>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="sm:w-48">
          <option value="all">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
        </Select>
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
              className="admin-card admin-card-hover overflow-hidden flex flex-col h-full group"
            >
              {/* Header with gradient bar */}
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-[#2AACB2]" />
                <div className="p-4 pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-[#2AACB2] flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">{getInitials(client.name)}</span>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-[#55DDB5] transition-colors">
                          {client.name}
                        </h3>
                        <span className="text-xs text-white/40">#{client.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-xs text-white/50">{client.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 flex-1 flex flex-col">
                {/* Email - cliquable */}
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-white/50" />
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
                    <Phone className="w-3.5 h-3.5 text-white/50" />
                    <span className="text-xs text-white/70">{client.phone}</span>
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
                    <span className="text-xs text-white/50">Projets</span>
                    <span className="text-sm font-semibold text-blue-400">{client.totalProjects}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1 mt-1">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-[#2AACB2] rounded-full h-1"
                      style={{ width: `${Math.min(client.totalProjects * 10, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
                    client.status === 'active' 
                      ? 'bg-[#2AACB2]/20 text-[#55DDB5] border-[#2AACB2]/30'
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
                    className="admin-btn admin-btn-sm flex-1 bg-gradient-to-r from-[#0B74C1] to-[#1D5B9B] text-white shadow-md shadow-blue-900/20 hover:-translate-y-0.5"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Modifier
                  </button>
                  <button
                    onClick={() => toggleStatus(client.id)}
                    className={`admin-btn admin-btn-sm admin-btn-outline flex-1 ${
                      client.status === 'active'
                        ? '!border-amber-500/50 !text-amber-400 hover:!bg-amber-500/15'
                        : '!border-[#2AACB2]/50 !text-[#55DDB5] hover:!bg-[#2AACB2]/15'
                    }`}
                  >
                    {client.status === 'active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                    {client.status === 'active' ? 'Désactiver' : 'Activer'}
                  </button>
                </div>

                {/* Quick email button */}
                <button
                  onClick={() => handleSendEmail(client.email)}
                  className="mt-2 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 text-white/50 text-xs font-medium hover:bg-blue-500/20 hover:text-blue-400 transition-all"
                >
                  <Send className="w-3 h-3" />
                  Envoyer un email
                </button>

                {/* L'email d'activation a échoué à la création (ex: restriction
                    du mode bac à sable Resend) : permettre de le renvoyer une
                    fois le problème résolu, sans avoir à recréer le compte. */}
                {client.status === 'inactive' && client.activationEmailStatus === 'failed' && (
                  <button
                    onClick={() => handleResendActivation(client)}
                    title={client.activationEmailError || "L'email d'activation n'a pas pu être envoyé"}
                    className="mt-1.5 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-all"
                  >
                    <Mail className="w-3 h-3" />
                    Renvoyer l'activation (échec précédent)
                  </button>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="mb-8">
          <EmptyState icon={Users} title="Aucun utilisateur trouvé" description="Essayez de modifier vos critères de recherche" />
        </div>
      )}

      {/* Pagination */}
      <div className="mb-8">
        <Pagination page={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
      </div>

      {/* Audit Log */}
      {showAuditLog && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white font-syne flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Journal d'audit
              <span className="ml-2 text-xs text-white/40">({auditLog.length} événements)</span>
            </h2>
          </div>
          {auditLog.length === 0 ? (
            <p className="p-6 text-white/40 text-sm">Aucun événement pour l'instant.</p>
          ) : (
          <div className="divide-y divide-white/10 max-h-96 overflow-y-auto">
            {auditLog.map((log) => (
              <div key={log.id} className="p-4 flex items-center gap-3 hover:bg-white/5 transition-colors">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">
                    <span className="font-medium text-blue-400">{log.user}</span> a {log.action} :{' '}
                    <span className="text-white">{log.target}</span>
                  </p>
                  <p className="text-xs text-white/40 mt-1">{log.date}</p>
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
                    className="text-xs text-white/40 hover:text-blue-400 transition-colors"
                  >
                    Voir
                  </button>
                )}
              </div>
            ))}
          </div>
          )}
          </Card>
        </motion.div>
      )}

      {showModal && (
        <ClientModal
          client={selectedClient}
          onClose={() => { setShowModal(false); setSelectedClient(null) }}
          onSave={handleSaveClient}
          saving={saving}
        />
      )}

      {feedback && (
        <div
          className={`fixed bottom-6 right-6 z-[999] max-w-sm px-4 py-3 rounded-xl shadow-2xl border text-sm ${
            feedback.type === 'error'
              ? 'bg-red-500/15 border-red-500/30 text-red-300'
              : 'bg-[#2AACB2]/15 border-[#2AACB2]/30 text-[#55DDB5]'
          }`}
        >
          {feedback.message}
        </div>
      )}
    </>
  )
}

export default AdminClients