// ==================== AdminDevis.jsx ====================
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Search, 
  Plus, 
  Download,
  Mail,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Loader,
  User,
  Calendar,
  Euro,
  Send,
  Trash2,
  RefreshCw,
  AlertCircle,
  X
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

// Modal pour les détails du devis
const DevisDetailModal = ({ devis, onClose, onUpdateStatus }) => {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const handleSendEmail = () => {
    setSending(true)
    setTimeout(() => {
      alert(`Email envoyé à ${devis.email} avec succès !`)
      setSending(false)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10"
      >
        <div className="sticky top-0 bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Détail du devis</h2>
              <p className="text-sm text-gray-400">{devis.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Informations client */}
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Informations client</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Nom</p>
                <p className="text-white font-medium">{devis.client}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-blue-400">{devis.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Date de demande</p>
                <p className="text-white">{devis.date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Service</p>
                <p className="text-white">{devis.service}</p>
              </div>
            </div>
          </div>

          {/* Détails du devis */}
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Détails du devis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-gray-400">Montant HT</span>
                <span className="text-white">{parseInt(devis.amount) * 0.8}€</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-gray-400">TVA (20%)</span>
                <span className="text-white">{parseInt(devis.amount) * 0.2}€</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-400 font-semibold">Total TTC</span>
                <span className="text-xl font-bold text-emerald-400">{devis.amount}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Description</h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => onUpdateStatus(devis.id, 'valide')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition"
            >
              <CheckCircle className="w-4 h-4" />
              Valider
            </button>
            <button
              onClick={() => onUpdateStatus(devis.id, 'refuse')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition"
            >
              <XCircle className="w-4 h-4" />
              Refuser
            </button>
          </div>

          {/* Envoi email */}
          <div className="border-t border-white/10 pt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Message optionnel</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="3"
              placeholder="Ajoutez un message personnalisé..."
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSendEmail}
              disabled={sending}
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition disabled:opacity-50"
            >
              {sending ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Envoyer l'email
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const AdminDevis = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDevis, setSelectedDevis] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [auditLog, setAuditLog] = useState([])
  const itemsPerPage = 12

  const [devis, setDevis] = useState([
    { id: 'DEV-001', client: 'Jean Dupont', service: 'Développement Digital', amount: '5 000€', status: 'valide', date: '15/04/2026', email: 'jean@email.com' },
    { id: 'DEV-002', client: 'Marie Martin', service: 'Réseau & Infrastructure', amount: '3 200€', status: 'attente', date: '10/04/2026', email: 'marie@email.com' },
    { id: 'DEV-003', client: 'Sophie Bernard', service: 'Sécurité', amount: '2 800€', status: 'refuse', date: '05/04/2026', email: 'sophie@email.com' },
    { id: 'DEV-004', client: 'Thomas Dubois', service: 'Cloud & Hébergement', amount: '4 500€', status: 'encours', date: '01/04/2026', email: 'thomas@email.com' },
    { id: 'DEV-005', client: 'Julie Petit', service: 'Formation IT', amount: '1 200€', status: 'valide', date: '28/03/2026', email: 'julie@email.com' },
    { id: 'DEV-006', client: 'Marc Kabongo', service: 'Énergie & Équipements', amount: '7 800€', status: 'attente', date: '20/03/2026', email: 'marc@email.com' },
    { id: 'DEV-007', client: 'Claire Ntumba', service: 'Développement Digital', amount: '12 000€', status: 'valide', date: '15/03/2026', email: 'claire@email.com' },
    { id: 'DEV-008', client: 'Pierre Durand', service: 'Cybersécurité', amount: '9 500€', status: 'refuse', date: '10/03/2026', email: 'pierre@email.com' },
    { id: 'DEV-009', client: 'Isabelle Kabila', service: 'Migration Cloud', amount: '6 800€', status: 'encours', date: '05/03/2026', email: 'isabelle@email.com' },
    { id: 'DEV-010', client: 'François Lumumba', service: 'Data Center', amount: '15 000€', status: 'attente', date: '01/03/2026', email: 'francois@email.com' },
    { id: 'DEV-011', client: 'Rachel Mputu', service: 'Support Technique', amount: '2 500€', status: 'valide', date: '25/02/2026', email: 'rachel@email.com' },
    { id: 'DEV-012', client: 'Daniel Tshibangu', service: 'Audit Sécurité', amount: '4 200€', status: 'valide', date: '20/02/2026', email: 'daniel@email.com' },
  ])

  const getStatusBadge = (status) => {
    const badges = {
      attente: { label: 'En attente', icon: Clock, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
      encours: { label: 'En cours', icon: Loader, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      valide: { label: 'Validé', icon: CheckCircle, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
      refuse: { label: 'Refusé', icon: XCircle, color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    }
    return badges[status] || badges.attente
  }

  const updateDevisStatus = (id, newStatus) => {
    const devisItem = devis.find(d => d.id === id)
    const oldStatus = devisItem.status
    
    setDevis(devis.map(d => 
      d.id === id ? { ...d, status: newStatus } : d
    ))
    
    // Ajouter au journal d'audit
    const newLog = {
      id: auditLog.length + 1,
      action: `Changement de statut: ${getStatusBadge(oldStatus).label} → ${getStatusBadge(newStatus).label}`,
      user: 'Admin',
      target: devisItem.client,
      targetId: id,
      date: new Date().toLocaleString('fr-FR')
    }
    setAuditLog([newLog, ...auditLog])
    
    setSuccessMessage(`Devis ${id} ${getStatusBadge(newStatus).label.toLowerCase()} avec succès !`)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleSendEmail = (email, clientName) => {
    window.location.href = `mailto:${email}?subject=Devis OMDEVE Services&body=Bonjour ${clientName},%0D%0A%0D%0AVeuillez trouver ci-joint votre devis.%0D%0A%0D%0ACordialement,%0D%0AL\'équipe OMDEVE`
  }

  const handleDownloadPDF = (devisId, clientName) => {
    setSuccessMessage(`Téléchargement du devis ${devisId} pour ${clientName}...`)
    setTimeout(() => setSuccessMessage(''), 2000)
    // Simulation de téléchargement
    alert(`Téléchargement du PDF pour le devis ${devisId}`)
  }

  const filteredDevis = devis.filter(d => {
    const matchSearch = d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       d.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === 'all' || d.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalPages = Math.ceil(filteredDevis.length / itemsPerPage)
  const paginatedDevis = filteredDevis.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleViewDetails = (devisItem) => {
    setSelectedDevis(devisItem)
    setShowDetailModal(true)
  }

  const handleExportAll = (type) => {
    setSuccessMessage(`Export ${type} de ${filteredDevis.length} devis...`)
    setTimeout(() => setSuccessMessage(''), 2000)
    alert(`Export ${type} de ${filteredDevis.length} devis`)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Gestion des devis</h1>
          <p className="text-gray-400 mt-1">Consultez, gérez et exportez tous les devis</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition">
          <Plus className="w-4 h-4" /> Nouveau devis
        </button>
      </motion.div>

      {/* Message de succès */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-emerald-500/90 text-white px-4 py-2 rounded-xl shadow-lg text-sm"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

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
            placeholder="Rechercher par numéro ou client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">Tous les statuts</option>
          <option value="attente">En attente</option>
          <option value="encours">En cours</option>
          <option value="valide">Validé</option>
          <option value="refuse">Refusé</option>
        </select>
      </motion.div>

      {/* Devis Cards Grid - 4 per line */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {paginatedDevis.map((devisItem, index) => {
          const status = getStatusBadge(devisItem.status)
          const StatusIcon = status.icon
          
          return (
            <motion.div
              key={devisItem.id}
              variants={fadeUp}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full group"
            >
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                <div className="p-4 pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs text-gray-500 font-mono">{devisItem.id}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-xs text-gray-400">{devisItem.date}</span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1 line-clamp-1 group-hover:text-blue-300 transition-colors">
                    {devisItem.service}
                  </h3>
                </div>
              </div>

              <div className="p-4 pt-0 flex-1 flex flex-col">
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-sm text-gray-300">{devisItem.client}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-400">Montant</span>
                    <span className="text-sm font-semibold text-emerald-400">{devisItem.amount}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full h-1" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className="mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                </div>

                {/* Boutons d'action */}
                {devisItem.status === 'attente' && (
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => updateDevisStatus(devisItem.id, 'encours')}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-medium hover:bg-blue-500/30 transition"
                    >
                      <Loader className="w-3 h-3" />
                      Examiner
                    </button>
                  </div>
                )}

                {devisItem.status === 'encours' && (
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => updateDevisStatus(devisItem.id, 'valide')}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/30 transition"
                    >
                      <CheckCircle className="w-3 h-3" />
                      Accepter
                    </button>
                    <button
                      onClick={() => updateDevisStatus(devisItem.id, 'refuse')}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30 transition"
                    >
                      <XCircle className="w-3 h-3" />
                      Refuser
                    </button>
                  </div>
                )}

                <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                  <button
                    onClick={() => handleViewDetails(devisItem)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium hover:scale-105 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Détails
                  </button>
                  <button
                    onClick={() => handleDownloadPDF(devisItem.id, devisItem.client)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    PDF
                  </button>
                </div>

                <button
                  onClick={() => handleSendEmail(devisItem.email, devisItem.client)}
                  className="mt-2 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs font-medium hover:bg-amber-500/20 hover:text-amber-400 transition-all"
                >
                  <Mail className="w-3 h-3" />
                  Envoyer par email
                </button>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Empty State */}
      {filteredDevis.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
        >
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white">Aucun devis trouvé</h3>
          <p className="text-gray-500 mt-1">Essayez de modifier vos critères de recherche</p>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10"
        >
          <div className="flex gap-2">
            <button
              onClick={() => handleExportAll('PDF')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 transition"
            >
              <Download className="w-4 h-4" /> Export PDF
            </button>
            <button
              onClick={() => handleExportAll('Excel')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 transition"
            >
              <Download className="w-4 h-4" /> Export Excel
            </button>
          </div>
          <div className="flex items-center gap-3">
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
          </div>
        </motion.div>
      )}

      {/* Modal Détails */}
      <AnimatePresence>
        {showDetailModal && selectedDevis && (
          <DevisDetailModal
            devis={selectedDevis}
            onClose={() => setShowDetailModal(false)}
            onUpdateStatus={updateDevisStatus}
          />
        )}
      </AnimatePresence>

      {/* Audit Log Summary */}
      {auditLog.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-4 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-400" />
              Dernières actions
            </h3>
          </div>
          <div className="p-4 space-y-2 max-h-48 overflow-y-auto">
            {auditLog.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center gap-3 text-sm">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span className="text-gray-400">{log.date}</span>
                <span className="text-gray-300">{log.action}</span>
                <span className="text-blue-400">- {log.target}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}

export default AdminDevis