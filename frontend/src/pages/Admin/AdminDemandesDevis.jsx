import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Search,
  Eye,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Clock,
  Phone,
  Building2,
  Download,
  TrendingUp,
} from 'lucide-react'
import { quoteRequests as quoteApi } from '../../services/api'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1] } },
}

const STATUS_CONFIG = {
  pending:   { label: 'En attente',  color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',     icon: Clock        },
  contacted: { label: 'Contacté',   color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',         icon: Phone        },
  quoted:    { label: 'Devis envoyé', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', icon: FileText     },
  converted: { label: 'Converti',   color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: CheckCircle },
  lost:      { label: 'Perdu',      color: 'bg-red-500/20 text-red-400 border-red-500/30',             icon: X           },
}

const SERVICE_LABELS = {
  'site-web':       'Site web',
  'ecommerce':      'E-commerce',
  'application':    'Application',
  'reseau':         'Réseau',
  'securite':       'Sécurité',
  'cloud':          'Cloud',
  'energie':        'Énergie',
  'formation':      'Formation',
  'audit':          'Audit',
  'conseil':        'Conseil',
  'ferronnerie':    'Ferronnerie & Mobilier',
  'autre':          'Autre',
}

const QuoteDetailModal = ({ request, onClose, onStatusChange }) => {
  const [status, setStatus] = useState(request.status)
  const [notes, setNotes]   = useState(request.notes || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await quoteApi.updateStatus(request._id, { status, notes })
      onStatusChange(request._id, status)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const sc = STATUS_CONFIG[request.status] || STATUS_CONFIG.pending

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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Demande de devis</h2>
              <p className="text-sm text-gray-400">{request.requestNumber}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Infos client */}
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Client</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-gray-500">Nom</p><p className="text-white">{request.fullName}</p></div>
              <div><p className="text-xs text-gray-500">Email</p>
                <a href={`mailto:${request.email}`} className="text-blue-400 hover:underline">{request.email}</a>
              </div>
              <div><p className="text-xs text-gray-500">Téléphone</p><p className="text-white">{request.phone || '—'}</p></div>
              <div><p className="text-xs text-gray-500">Entreprise</p><p className="text-white">{request.company || '—'}</p></div>
            </div>
          </div>

          {/* Détails demande */}
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Demande</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-gray-500">Service</p><p className="text-white">{SERVICE_LABELS[request.serviceType] || request.serviceType}</p></div>
              <div><p className="text-xs text-gray-500">Budget</p><p className="text-white">{request.budget || '—'}</p></div>
              <div><p className="text-xs text-gray-500">Délai</p><p className="text-white">{request.timeline || '—'}</p></div>
              <div><p className="text-xs text-gray-500">Date</p><p className="text-white">{new Date(request.createdAt).toLocaleDateString('fr-FR')}</p></div>
              {request.ferronnerieType && (
                <div><p className="text-xs text-gray-500">Type de projet</p><p className="text-white">{request.ferronnerieType}</p></div>
              )}
              {request.dimensions && (
                <div><p className="text-xs text-gray-500">Dimensions</p><p className="text-white">{request.dimensions}</p></div>
              )}
            </div>
            {request.description && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Description</p>
                <p className="text-gray-300 text-sm leading-relaxed">{request.description}</p>
              </div>
            )}
          </div>

          {/* Statut */}
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Changer le statut</h3>
            <div className="flex gap-2 flex-wrap mb-3">
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
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              placeholder="Notes internes (non visibles par le client)..."
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 resize-none"
            />
            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:scale-105 transition disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              Enregistrer
            </button>
          </div>

          {/* Répondre par email */}
          <a
            href={`mailto:${request.email}?subject=Votre demande de devis ${request.requestNumber} - Omedev Services&body=Bonjour ${request.fullName},%0D%0A%0D%0ANous avons bien reçu votre demande de devis pour ${SERVICE_LABELS[request.serviceType] || request.serviceType}.%0D%0A%0D%0ACordialement,%0D%0AL'équipe Omedev Services`}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition text-sm"
          >
            Répondre par email
          </a>
        </div>
      </motion.div>
    </div>
  )
}

const AdminDemandesDevis = () => {
  const [requests, setRequests]    = useState([])
  const [loading, setLoading]      = useState(true)
  const [error, setError]          = useState(null)
  const [search, setSearch]        = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected]    = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [stats, setStats]          = useState(null)
  const itemsPerPage = 12

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [listRes, statsRes] = await Promise.all([
        quoteApi.getAll(),
        quoteApi.getStats(),
      ])
      setRequests(Array.isArray(listRes.data) ? listRes.data : [])
      setStats(statsRes.data)
    } catch (err) {
      setError('Impossible de charger les demandes de devis.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleStatusChange = (id, newStatus) => {
    setRequests(prev => prev.map(r => r._id === id ? { ...r, status: newStatus } : r))
    if (selected?._id === id) setSelected(prev => ({ ...prev, status: newStatus }))
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette demande ?')) return
    try {
      await quoteApi.delete(id)
      setRequests(prev => prev.filter(r => r._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleExportCSV = async () => {
    try {
      const res = await quoteApi.exportCSV({})
      const url = URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }))
      const a = document.createElement('a')
      a.href = url
      a.download = 'demandes_devis.csv'
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = requests.filter(r => {
    const matchSearch = (r.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
      (r.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (r.requestNumber || '').toLowerCase().includes(search.toLowerCase()) ||
      (r.company || '').toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || r.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginated  = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Demandes de devis</h1>
          <p className="text-gray-400 mt-1">Demandes rapides reçues depuis le site</p>
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

      {/* Stats */}
      {stats && (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'Total',        value: stats.total,             color: 'text-white'       },
            { label: 'En attente',   value: stats.pending,           color: 'text-amber-400'   },
            { label: 'Contactés',    value: stats.contacted,         color: 'text-blue-400'    },
            { label: 'Convertis',    value: stats.converted,         color: 'text-emerald-400' },
            { label: 'Conversion',   value: `${stats.conversionRate}%`, color: 'text-purple-400' },
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
            placeholder="Rechercher par nom, email, numéro, entreprise..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1) }}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-orange-500"
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
          <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
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
            {paginated.map(req => {
              const sc = STATUS_CONFIG[req.status] || STATUS_CONFIG.pending
              const StatusIcon = sc.icon
              return (
                <motion.div
                  key={req._id}
                  variants={fadeUp}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 hover:-translate-y-1 transition-all group flex flex-col"
                >
                  <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
                  <div className="p-4 flex-1 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-gray-500">{req.requestNumber}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${sc.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {sc.label}
                      </span>
                    </div>

                    <div>
                      <p className="font-semibold text-white text-sm">{req.fullName}</p>
                      {req.company && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-400">{req.company}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <TrendingUp className="w-3 h-3 text-orange-400" />
                      <span className="text-xs text-orange-400 font-medium">
                        {SERVICE_LABELS[req.serviceType] || req.serviceType}
                      </span>
                    </div>

                    {req.budget && (
                      <p className="text-xs text-gray-400">Budget : <span className="text-emerald-400">{req.budget}</span></p>
                    )}

                    <p className="text-xs text-gray-500">{new Date(req.createdAt).toLocaleDateString('fr-FR')}</p>

                    <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                      <button
                        onClick={() => setSelected(req)}
                        className="flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs hover:scale-105 transition"
                      >
                        <Eye className="w-3.5 h-3.5" /> Voir
                      </button>
                      <button
                        onClick={() => handleDelete(req._id)}
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
              <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white">Aucune demande trouvée</h3>
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
        {selected && (
          <QuoteDetailModal
            request={selected}
            onClose={() => setSelected(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default AdminDemandesDevis
