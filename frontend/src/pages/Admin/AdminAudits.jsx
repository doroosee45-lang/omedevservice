import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ClipboardCheck,
  Download,
  Eye,
  Trash2,
  Clock,
  CheckCircle,
  Phone,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import { audits as auditsApi } from '../../services/api'
import { PageHeader, Card, Button, Modal, SearchInput, Select, Pagination, EmptyState, LoadingState, fadeUp, staggerContainer } from '../../components/Admin/ui'

const STATUS_CONFIG = {
  pending:    { label: 'En attente',  color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',   icon: Clock         },
  processing: { label: 'En cours',   color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',       icon: Loader2       },
  completed:  { label: 'Complété',   color: 'bg-[#2AACB2]/20 text-[#55DDB5] border-[#2AACB2]/30', icon: CheckCircle },
  contacted:  { label: 'Contacté',   color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', icon: Phone         },
}

const LEVEL_CONFIG = {
  Excellent: 'bg-[#2AACB2]/20 text-[#55DDB5] border-[#2AACB2]/30',
  Bon:       'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Moyen:     'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Critique:  'bg-red-500/20 text-red-400 border-red-500/30',
}

const AuditDetailModal = ({ audit, onClose, onStatusChange }) => {
  const [status, setStatus] = useState(audit.status)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await auditsApi.updateStatus(audit._id, status)
      onStatusChange(audit._id, status)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      const res = await auditsApi.downloadPDF(audit._id)
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      const a = document.createElement('a')
      a.href = url
      a.download = `audit_${audit.requestNumber}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Erreur téléchargement PDF:', err)
    }
  }

  const lc = LEVEL_CONFIG[audit.auditLevel] || ''

  return (
    <Modal open onClose={onClose} maxWidth="max-w-2xl" title={
      <span className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0B74C1] to-[#2AACB2] flex items-center justify-center">
          <ClipboardCheck className="w-5 h-5 text-white" />
        </span>
        <span>
          <span className="block">Détail de l'audit</span>
          <span className="block text-xs font-normal text-white/50">{audit.requestNumber}</span>
        </span>
      </span>
    }>
      <div className="space-y-5">
        {/* Score + niveau */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <p className="text-xs text-white/50 mb-1">Score global</p>
            <p className="text-3xl font-bold text-blue-300 font-syne">{audit.auditScore ?? '—'}<span className="text-lg text-white/40">/100</span></p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center flex flex-col items-center justify-center gap-2">
            <p className="text-xs text-white/50">Niveau</p>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${lc}`}>{audit.auditLevel || '—'}</span>
          </div>
        </div>

        {/* Infos client */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white/60 mb-3 font-syne">Informations client</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-xs text-white/40">Nom</p><p className="text-white">{audit.name}</p></div>
            <div><p className="text-xs text-white/40">Email</p><p className="text-blue-300">{audit.email}</p></div>
            <div><p className="text-xs text-white/40">Entreprise</p><p className="text-white">{audit.companyName || '—'}</p></div>
            <div><p className="text-xs text-white/40">Secteur</p><p className="text-white">{audit.sector || '—'}</p></div>
            <div><p className="text-xs text-white/40">Téléphone</p><p className="text-white">{audit.phone || '—'}</p></div>
            <div><p className="text-xs text-white/40">Date</p><p className="text-white">{new Date(audit.createdAt).toLocaleDateString('fr-FR')}</p></div>
          </div>
        </div>

        {/* Recommandations */}
        {audit.recommendations?.length > 0 && (
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white/60 mb-3 font-syne">Recommandations</h3>
            <ul className="space-y-2">
              {audit.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="w-5 h-5 rounded-full bg-[#2AACB2]/20 text-[#55DDB5] flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Changer statut */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white/60 mb-3 font-syne">Changer le statut</h3>
          <div className="flex gap-3 flex-wrap">
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => setStatus(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${status === key ? cfg.color + ' scale-105' : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10'}`}
              >
                {cfg.label}
              </button>
            ))}
          </div>
          <Button
            variant="primary"
            className="mt-3 w-full"
            icon={saving ? Loader2 : CheckCircle}
            onClick={handleSave}
            disabled={saving || status === audit.status}
          >
            Enregistrer
          </Button>
        </div>

        {/* Télécharger PDF */}
        <Button variant="outline" className="w-full" icon={Download} onClick={handleDownloadPDF}>
          Télécharger le rapport PDF
        </Button>
      </div>
    </Modal>
  )
}

const AdminAudits = () => {
  const [auditList, setAuditList] = useState([])
  const [loading, setLoading]    = useState(true)
  const [error, setError]        = useState(null)
  const [search, setSearch]      = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedAudit, setSelectedAudit] = useState(null)
  const [currentPage, setCurrentPage]    = useState(1)
  const [stats, setStats]                = useState(null)
  const itemsPerPage = 12

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [listRes, statsRes] = await Promise.all([
        auditsApi.getAll(),
        auditsApi.getStats(),
      ])
      setAuditList(listRes.data)
      setStats(statsRes.data)
    } catch (err) {
      setError('Impossible de charger les audits.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleStatusChange = (id, newStatus) => {
    setAuditList(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a))
    if (selectedAudit?._id === id) setSelectedAudit(prev => ({ ...prev, status: newStatus }))
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet audit ?')) return
    try {
      await auditsApi.delete(id)
      setAuditList(prev => prev.filter(a => a._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = auditList.filter(a => {
    const matchSearch = (a.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.companyName || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.requestNumber || '').toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || a.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalPages  = Math.ceil(filtered.length / itemsPerPage)
  const paginated   = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <>
      <PageHeader
        title="Audits gratuits"
        subtitle="Demandes d'audit reçues depuis le site"
        actions={<Button variant="outline" icon={RefreshCw} onClick={fetchData}>Actualiser</Button>}
      />

      {/* Stats */}
      {stats && (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total',     value: stats.total,     color: 'text-white'         },
            { label: 'En attente', value: stats.pending,  color: 'text-amber-400'     },
            { label: 'Complétés', value: stats.completed, color: 'text-[#55DDB5]'   },
            { label: 'Score moyen', value: `${Math.round(stats.averageScore || 0)}/100`, color: 'text-blue-300' },
          ].map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="admin-card p-4 text-center">
              <p className={`text-2xl font-bold font-syne ${s.color}`}>{s.value}</p>
              <p className="text-xs text-white/50 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchInput
          value={search}
          onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
          placeholder="Rechercher par nom, entreprise, numéro..."
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
        <LoadingState label="Chargement des audits…" />
      ) : error ? (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <>
          <motion.div
            initial="hidden" animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {paginated.map(audit => {
              const sc = STATUS_CONFIG[audit.status] || STATUS_CONFIG.pending
              const lc = LEVEL_CONFIG[audit.auditLevel] || ''
              const StatusIcon = sc.icon
              return (
                <motion.div
                  key={audit._id}
                  variants={fadeUp}
                  className="admin-card admin-card-hover overflow-hidden group flex flex-col"
                >
                  <div className="h-1 bg-gradient-to-r from-[#0B74C1] to-[#2AACB2]" />
                  <div className="p-4 flex-1 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-white/40">{audit.requestNumber}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${sc.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {sc.label}
                      </span>
                    </div>

                    <div>
                      <p className="font-semibold text-white text-sm line-clamp-1">{audit.companyName || audit.name}</p>
                      <p className="text-xs text-white/50">{audit.sector || 'Secteur non précisé'}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#0B74C1] to-[#2AACB2]"
                          style={{ width: `${audit.auditScore || 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-blue-300 font-semibold">{audit.auditScore ?? 0}/100</span>
                    </div>

                    {audit.auditLevel && (
                      <span className={`self-start px-2 py-0.5 rounded-full text-xs border ${lc}`}>{audit.auditLevel}</span>
                    )}

                    <p className="text-xs text-white/40">{new Date(audit.createdAt).toLocaleDateString('fr-FR')}</p>

                    <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                      <button
                        onClick={() => setSelectedAudit(audit)}
                        className="admin-btn admin-btn-sm admin-btn-primary flex-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Voir
                      </button>
                      <button
                        onClick={() => handleDelete(audit._id)}
                        className="admin-btn admin-btn-sm admin-btn-danger"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {filtered.length === 0 && (
            <EmptyState icon={ClipboardCheck} title="Aucun audit trouvé" description="Modifiez vos filtres ou attendez de nouvelles demandes." />
          )}

          <Pagination page={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
        </>
      )}

      <AnimatePresence>
        {selectedAudit && (
          <AuditDetailModal
            audit={selectedAudit}
            onClose={() => setSelectedAudit(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default AdminAudits
