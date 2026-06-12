import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Search,
  Download,
  Mail,
  Eye,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  User,
  Calendar,
  Send,
  Trash2,
  RefreshCw,
  AlertCircle,
  X,
} from 'lucide-react'
import { devis as devisApi } from '../../services/api'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } },
}

const STATUS_CONFIG = {
  pending:    { label: 'En attente',  icon: Clock,        color: 'bg-amber-500/20 text-amber-400 border-amber-500/30'      },
  processing: { label: 'En cours',   icon: Loader2,       color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'         },
  approved:   { label: 'Validé',     icon: CheckCircle,   color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'},
  rejected:   { label: 'Refusé',     icon: XCircle,       color: 'bg-red-500/20 text-red-400 border-red-500/30'            },
  completed:  { label: 'Complété',   icon: CheckCircle,   color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'   },
}

const DevisDetailModal = ({ devisItem, onClose, onUpdateStatus }) => {
  const [message, setMessage] = useState('')
  const [saving, setSaving]   = useState(false)

  const handleStatus = async (newStatus) => {
    setSaving(true)
    try {
      await devisApi.updateStatus(devisItem._id, { status: newStatus, adminNotes: message })
      onUpdateStatus(devisItem._id, newStatus)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      const res = await devisApi.downloadPDF(devisItem._id)
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      const a = document.createElement('a')
      a.href = url
      a.download = `devis_${devisItem.requestNumber}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
    }
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
              <p className="text-sm text-gray-400">{devisItem.requestNumber}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Infos client */}
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Informations client</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-xs text-gray-500">Nom</p><p className="text-white font-medium">{devisItem.user?.name || '—'}</p></div>
              <div><p className="text-xs text-gray-500">Email</p>
                <a href={`mailto:${devisItem.user?.email}`} className="text-blue-400 hover:underline">{devisItem.user?.email || '—'}</a>
              </div>
              <div><p className="text-xs text-gray-500">Date de demande</p><p className="text-white">{new Date(devisItem.createdAt).toLocaleDateString('fr-FR')}</p></div>
              <div><p className="text-xs text-gray-500">Services</p><p className="text-white">{devisItem.services?.join(', ') || '—'}</p></div>
            </div>
          </div>

          {/* Détails */}
          {devisItem.description && (
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Description</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{devisItem.description}</p>
            </div>
          )}

          {/* Montant */}
          {devisItem.estimatedAmount && (
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Montant estimé</h3>
              <p className="text-2xl font-bold text-emerald-400">{devisItem.estimatedAmount.toLocaleString('fr-FR')}€</p>
            </div>
          )}

          {/* Notes admin */}
          {devisItem.adminNotes && (
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Notes admin</h3>
              <p className="text-gray-300 text-sm">{devisItem.adminNotes}</p>
            </div>
          )}

          {/* Actions */}
          {(devisItem.status === 'pending' || devisItem.status === 'processing') && (
            <div className="flex gap-3">
              <button
                onClick={() => handleStatus('approved')}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" /> Valider
              </button>
              <button
                onClick={() => handleStatus('rejected')}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" /> Refuser
              </button>
            </div>
          )}

          {devisItem.status === 'pending' && (
            <button
              onClick={() => handleStatus('processing')}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition disabled:opacity-50"
            >
              <Loader2 className="w-4 h-4" /> Passer en cours
            </button>
          )}

          {/* Message + email */}
          <div className="border-t border-white/10 pt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Note admin / message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
              placeholder="Ajoutez une note ou un message..."
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* PDF */}
          <button
            onClick={handleDownloadPDF}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition"
          >
            <Download className="w-4 h-4" /> Télécharger le PDF
          </button>
        </div>
      </motion.div>
    </div>
  )
}

const AdminDevis = () => {
  const [devisList, setDevisList]  = useState([])
  const [loading, setLoading]      = useState(true)
  const [error, setError]          = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedDevis, setSelectedDevis] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const showSuccess = (msg) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await devisApi.getAll()
      setDevisList(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      setError('Impossible de charger les devis.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleUpdateStatus = async (id, newStatus) => {
    setDevisList(prev => prev.map(d => d._id === id ? { ...d, status: newStatus } : d))
    if (selectedDevis?._id === id) setSelectedDevis(prev => ({ ...prev, status: newStatus }))
    const label = STATUS_CONFIG[newStatus]?.label || newStatus
    showSuccess(`Devis ${newStatus === 'approved' ? 'validé' : newStatus === 'rejected' ? 'refusé' : 'mis à jour'} avec succès !`)
  }

  const handleExportCSV = () => {
    const headers = 'Numéro,Client,Services,Statut,Montant,Date\n'
    const rows = filteredDevis.map(d =>
      `"${d.requestNumber}","${d.user?.name || ''}","${d.services?.join(';') || ''}","${d.status}","${d.estimatedAmount || ''}","${new Date(d.createdAt).toLocaleDateString('fr-FR')}"`
    ).join('\n')
    const url = URL.createObjectURL(new Blob([headers + rows], { type: 'text/csv' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'devis.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const filteredDevis = devisList.filter(d => {
    const matchSearch = (d.requestNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === 'all' || d.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalPages  = Math.ceil(filteredDevis.length / itemsPerPage)
  const paginated   = filteredDevis.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Gestion des devis</h1>
          <p className="text-gray-400 mt-1">Devis soumis par les clients connectés</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 transition">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button onClick={fetchData} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-gray-300 hover:bg-white/20 transition">
            <RefreshCw className="w-4 h-4" /> Actualiser
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-emerald-500/90 text-white px-4 py-2 rounded-xl shadow-lg text-sm"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher par numéro ou client..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1) }}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1) }}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">Tous les statuts</option>
          {Object.entries(STATUS_CONFIG).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <>
          <motion.div
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {paginated.map(d => {
              const sc = STATUS_CONFIG[d.status] || STATUS_CONFIG.pending
              const StatusIcon = sc.icon
              return (
                <motion.div
                  key={d._id}
                  variants={fadeUp}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:-translate-y-1 transition-all group flex flex-col"
                >
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                  <div className="p-4 flex-1 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-gray-500">{d.requestNumber}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {new Date(d.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-sm text-white font-medium">{d.user?.name || 'Client'}</span>
                    </div>

                    <p className="text-xs text-gray-400 line-clamp-1">
                      {d.services?.join(', ') || 'Services non précisés'}
                    </p>

                    {d.estimatedAmount > 0 && (
                      <p className="text-sm font-semibold text-emerald-400">
                        {d.estimatedAmount.toLocaleString('fr-FR')}€
                      </p>
                    )}

                    <span className={`self-start inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${sc.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {sc.label}
                    </span>

                    {/* Quick actions */}
                    {d.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateStatus(d._id, 'processing')}
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-xs hover:bg-blue-500/30 transition"
                        >
                          <Loader2 className="w-3 h-3" /> Examiner
                        </button>
                      </div>
                    )}
                    {d.status === 'processing' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateStatus(d._id, 'approved')}
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs hover:bg-emerald-500/30 transition"
                        >
                          <CheckCircle className="w-3 h-3" /> Valider
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(d._id, 'rejected')}
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition"
                        >
                          <XCircle className="w-3 h-3" /> Refuser
                        </button>
                      </div>
                    )}

                    <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                      <button
                        onClick={() => setSelectedDevis(d)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs hover:scale-105 transition"
                      >
                        <Eye className="w-3.5 h-3.5" /> Détails
                      </button>
                      <a
                        href={`mailto:${d.user?.email}?subject=Votre devis ${d.requestNumber}`}
                        className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl border border-white/20 text-gray-300 text-xs hover:bg-white/10 transition"
                      >
                        <Mail className="w-3.5 h-3.5" /> Email
                      </a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {filteredDevis.length === 0 && (
            <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
              <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white">Aucun devis trouvé</h3>
              <p className="text-gray-500 mt-1">Essayez de modifier vos filtres.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8 pt-6 border-t border-white/10">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 hover:bg-white/20 transition">
                <ChevronLeft className="w-4 h-4" /> Précédent
              </button>
              <span className="text-sm text-gray-400">Page {currentPage} / {totalPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 hover:bg-white/20 transition">
                Suivant <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {selectedDevis && (
          <DevisDetailModal
            devisItem={selectedDevis}
            onClose={() => setSelectedDevis(null)}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default AdminDevis
