import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ClipboardCheck,
  Search,
  Download,
  Eye,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  Phone,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import { audits as auditsApi } from '../../services/api'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1] } },
}

const STATUS_CONFIG = {
  pending:    { label: 'En attente',  color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',   icon: Clock         },
  processing: { label: 'En cours',   color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',       icon: Loader2       },
  completed:  { label: 'Complété',   color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: CheckCircle },
  contacted:  { label: 'Contacté',   color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', icon: Phone         },
}

const LEVEL_CONFIG = {
  Excellent: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
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

  const sc = STATUS_CONFIG[audit.status] || STATUS_CONFIG.pending
  const lc = LEVEL_CONFIG[audit.auditLevel] || ''

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Détail de l'audit</h2>
              <p className="text-sm text-gray-400">{audit.requestNumber}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Score + niveau */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Score global</p>
              <p className="text-3xl font-bold text-cyan-400">{audit.auditScore ?? '—'}<span className="text-lg text-gray-400">/100</span></p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center flex flex-col items-center justify-center gap-2">
              <p className="text-xs text-gray-400">Niveau</p>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${lc}`}>{audit.auditLevel || '—'}</span>
            </div>
          </div>

          {/* Infos client */}
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Informations client</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-gray-500">Nom</p><p className="text-white">{audit.name}</p></div>
              <div><p className="text-xs text-gray-500">Email</p><p className="text-blue-400">{audit.email}</p></div>
              <div><p className="text-xs text-gray-500">Entreprise</p><p className="text-white">{audit.companyName || '—'}</p></div>
              <div><p className="text-xs text-gray-500">Secteur</p><p className="text-white">{audit.sector || '—'}</p></div>
              <div><p className="text-xs text-gray-500">Téléphone</p><p className="text-white">{audit.phone || '—'}</p></div>
              <div><p className="text-xs text-gray-500">Date</p><p className="text-white">{new Date(audit.createdAt).toLocaleDateString('fr-FR')}</p></div>
            </div>
          </div>

          {/* Recommandations */}
          {audit.recommendations?.length > 0 && (
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Recommandations</h3>
              <ul className="space-y-2">
                {audit.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Changer statut */}
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Changer le statut</h3>
            <div className="flex gap-3 flex-wrap">
              {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setStatus(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${status === key ? cfg.color + ' scale-105' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
            <button
              onClick={handleSave}
              disabled={saving || status === audit.status}
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:scale-105 transition disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              Enregistrer
            </button>
          </div>

          {/* Télécharger PDF */}
          <button
            onClick={handleDownloadPDF}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition"
          >
            <Download className="w-4 h-4" />
            Télécharger le rapport PDF
          </button>
        </div>
      </motion.div>
    </div>
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Audits gratuits</h1>
          <p className="text-gray-400 mt-1">Demandes d'audit reçues depuis le site</p>
        </div>
        <button onClick={fetchData} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-gray-300 hover:bg-white/20 transition">
          <RefreshCw className="w-4 h-4" /> Actualiser
        </button>
      </motion.div>

      {/* Stats */}
      {stats && (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total',     value: stats.total,     color: 'text-white'         },
            { label: 'En attente', value: stats.pending,  color: 'text-amber-400'     },
            { label: 'Complétés', value: stats.completed, color: 'text-emerald-400'   },
            { label: 'Score moyen', value: `${Math.round(stats.averageScore || 0)}/100`, color: 'text-cyan-400' },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher par nom, entreprise, numéro..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1) }}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-teal-500"
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
          <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <>
          <motion.div
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
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
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-teal-500/50 hover:-translate-y-1 transition-all group flex flex-col"
                >
                  <div className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500" />
                  <div className="p-4 flex-1 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-gray-500">{audit.requestNumber}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${sc.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {sc.label}
                      </span>
                    </div>

                    <div>
                      <p className="font-semibold text-white text-sm line-clamp-1">{audit.companyName || audit.name}</p>
                      <p className="text-xs text-gray-400">{audit.sector || 'Secteur non précisé'}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
                          style={{ width: `${audit.auditScore || 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-cyan-400 font-semibold">{audit.auditScore ?? 0}/100</span>
                    </div>

                    {audit.auditLevel && (
                      <span className={`self-start px-2 py-0.5 rounded-full text-xs border ${lc}`}>{audit.auditLevel}</span>
                    )}

                    <p className="text-xs text-gray-500">{new Date(audit.createdAt).toLocaleDateString('fr-FR')}</p>

                    <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                      <button
                        onClick={() => setSelectedAudit(audit)}
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs hover:scale-105 transition"
                      >
                        <Eye className="w-3.5 h-3.5" /> Voir
                      </button>
                      <button
                        onClick={() => handleDelete(audit._id)}
                        className="px-3 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition text-xs"
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
            <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
              <ClipboardCheck className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white">Aucun audit trouvé</h3>
              <p className="text-gray-500 mt-1">Modifiez vos filtres ou attendez de nouvelles demandes.</p>
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
