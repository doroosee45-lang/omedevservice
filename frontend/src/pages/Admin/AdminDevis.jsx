import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Download,
  Mail,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  User,
  Calendar,
  RefreshCw,
  AlertCircle,
} from 'lucide-react'
import { devis as devisApi } from '../../services/api'
import { PageHeader, Button, Modal, SearchInput, Select, Pagination, EmptyState, LoadingState, fadeUp, staggerContainer } from '../../components/Admin/ui'

const STATUS_CONFIG = {
  pending:    { label: 'En attente',  icon: Clock,        color: 'bg-amber-500/20 text-amber-400 border-amber-500/30'      },
  processing: { label: 'En cours',   icon: Loader2,       color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'         },
  approved:   { label: 'Validé',     icon: CheckCircle,   color: 'bg-[#2AACB2]/20 text-[#55DDB5] border-[#2AACB2]/30'},
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
    <Modal open onClose={onClose} maxWidth="max-w-2xl" title={
      <span className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0B74C1] to-[#2AACB2] flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </span>
        <span>
          <span className="block">Détail du devis</span>
          <span className="block text-xs font-normal text-white/50">{devisItem.requestNumber}</span>
        </span>
      </span>
    }>
      <div className="space-y-5">
        {/* Infos client */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white/60 font-syne mb-3">Informations client</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-xs text-white/40">Nom</p><p className="text-white font-medium">{devisItem.user?.name || '—'}</p></div>
            <div><p className="text-xs text-white/40">Email</p>
              <a href={`mailto:${devisItem.user?.email}`} className="text-blue-300 hover:underline">{devisItem.user?.email || '—'}</a>
            </div>
            <div><p className="text-xs text-white/40">Date de demande</p><p className="text-white">{new Date(devisItem.createdAt).toLocaleDateString('fr-FR')}</p></div>
            <div><p className="text-xs text-white/40">Services</p><p className="text-white">{devisItem.services?.join(', ') || '—'}</p></div>
          </div>
        </div>

        {/* Détails */}
        {devisItem.description && (
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white/60 font-syne mb-2">Description</h3>
            <p className="text-white/70 text-sm leading-relaxed">{devisItem.description}</p>
          </div>
        )}

        {/* Montant */}
        {devisItem.estimatedAmount && (
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white/60 font-syne mb-3">Montant estimé</h3>
            <p className="text-2xl font-bold text-[#55DDB5] font-syne">{devisItem.estimatedAmount.toLocaleString('fr-FR')}€</p>
          </div>
        )}

        {/* Notes admin */}
        {devisItem.adminNotes && (
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white/60 font-syne mb-2">Notes admin</h3>
            <p className="text-white/70 text-sm">{devisItem.adminNotes}</p>
          </div>
        )}

        {/* Actions */}
        {(devisItem.status === 'pending' || devisItem.status === 'processing') && (
          <div className="flex gap-3">
            <button
              onClick={() => handleStatus('approved')}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#2AACB2]/20 text-[#55DDB5] border border-[#2AACB2]/30 hover:bg-[#2AACB2]/30 transition disabled:opacity-50"
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
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition disabled:opacity-50"
          >
            <Loader2 className="w-4 h-4" /> Passer en cours
          </button>
        )}

        {/* Message + email */}
        <div className="border-t border-white/10 pt-4">
          <label className="block text-sm font-medium text-white/70 mb-2">Note admin / message</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={3}
            placeholder="Ajoutez une note ou un message..."
            className="admin-textarea text-sm resize-none"
          />
        </div>

        {/* PDF */}
        <Button variant="outline" className="w-full" icon={Download} onClick={handleDownloadPDF}>
          Télécharger le PDF
        </Button>
      </div>
    </Modal>
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
      <PageHeader
        title="Gestion des devis"
        subtitle="Devis soumis par les clients connectés"
        actions={
          <>
            <Button variant="outline" icon={Download} onClick={handleExportCSV}>Export CSV</Button>
            <Button variant="outline" icon={RefreshCw} onClick={fetchData}>Actualiser</Button>
          </>
        }
      />

      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-gradient-to-r from-[#0B74C1] to-[#2AACB2] text-white px-4 py-2.5 rounded-xl shadow-lg shadow-[#2AACB2]/30 text-sm font-medium"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchInput
          value={searchTerm}
          onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1) }}
          placeholder="Rechercher par numéro ou client..."
        />
        <Select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1) }} className="sm:w-56">
          <option value="all">Tous les statuts</option>
          {Object.entries(STATUS_CONFIG).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </Select>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingState label="Chargement des devis…" />
      ) : error ? (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <>
          <motion.div
            initial="hidden" animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {paginated.map(d => {
              const sc = STATUS_CONFIG[d.status] || STATUS_CONFIG.pending
              const StatusIcon = sc.icon
              return (
                <motion.div
                  key={d._id}
                  variants={fadeUp}
                  className="admin-card admin-card-hover overflow-hidden group flex flex-col"
                >
                  <div className="h-1 bg-gradient-to-r from-[#0B74C1] to-[#2AACB2]" />
                  <div className="p-4 flex-1 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-white/40">{d.requestNumber}</span>
                      <div className="flex items-center gap-1 text-xs text-white/50">
                        <Calendar className="w-3 h-3" />
                        {new Date(d.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-white/40" />
                      <span className="text-sm text-white font-medium">{d.user?.name || 'Client'}</span>
                    </div>

                    <p className="text-xs text-white/50 line-clamp-1">
                      {d.services?.join(', ') || 'Services non précisés'}
                    </p>

                    {d.estimatedAmount > 0 && (
                      <p className="text-sm font-semibold text-[#55DDB5]">
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
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 text-xs hover:bg-blue-500/30 transition"
                        >
                          <Loader2 className="w-3 h-3" /> Examiner
                        </button>
                      </div>
                    )}
                    {d.status === 'processing' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateStatus(d._id, 'approved')}
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-[#2AACB2]/20 text-[#55DDB5] text-xs hover:bg-[#2AACB2]/30 transition"
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
                      <button onClick={() => setSelectedDevis(d)} className="admin-btn admin-btn-sm admin-btn-primary flex-1">
                        <Eye className="w-3.5 h-3.5" /> Détails
                      </button>
                      <a
                        href={`mailto:${d.user?.email}?subject=Votre devis ${d.requestNumber}`}
                        className="admin-btn admin-btn-sm admin-btn-outline flex-1"
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
            <EmptyState icon={FileText} title="Aucun devis trouvé" description="Essayez de modifier vos filtres." />
          )}

          <Pagination page={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
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
