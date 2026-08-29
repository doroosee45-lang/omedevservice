import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Eye,
  Trash2,
  X,
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
import { PageHeader, Card, Button, Modal, SearchInput, Select, Pagination, EmptyState, LoadingState, fadeUp, staggerContainer } from '../../components/Admin/ui'

const STATUS_CONFIG = {
  pending:   { label: 'En attente',  color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',     icon: Clock        },
  contacted: { label: 'Contacté',   color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',         icon: Phone        },
  quoted:    { label: 'Devis envoyé', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', icon: FileText     },
  converted: { label: 'Converti',   color: 'bg-[#2AACB2]/20 text-[#55DDB5] border-[#2AACB2]/30', icon: CheckCircle },
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

  return (
    <Modal open onClose={onClose} maxWidth="max-w-2xl" title={
      <span className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0B74C1] to-[#2AACB2] flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </span>
        <span>
          <span className="block">Demande de devis</span>
          <span className="block text-xs font-normal text-white/50">{request.requestNumber}</span>
        </span>
      </span>
    }>
      <div className="space-y-5">
        {/* Infos client */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3">Client</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-xs text-white/40">Nom</p><p className="text-white">{request.fullName}</p></div>
            <div><p className="text-xs text-white/40">Email</p>
              <a href={`mailto:${request.email}`} className="text-blue-300 hover:underline">{request.email}</a>
            </div>
            <div><p className="text-xs text-white/40">Téléphone</p><p className="text-white">{request.phone || '—'}</p></div>
            <div><p className="text-xs text-white/40">Entreprise</p><p className="text-white">{request.company || '—'}</p></div>
          </div>
        </div>

        {/* Détails demande */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3">Demande</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-xs text-white/40">Service</p><p className="text-white">{SERVICE_LABELS[request.serviceType] || request.serviceType}</p></div>
            <div><p className="text-xs text-white/40">Budget</p><p className="text-white">{request.budget || '—'}</p></div>
            <div><p className="text-xs text-white/40">Délai</p><p className="text-white">{request.timeline || '—'}</p></div>
            <div><p className="text-xs text-white/40">Date</p><p className="text-white">{new Date(request.createdAt).toLocaleDateString('fr-FR')}</p></div>
          </div>
          {request.description && (
            <div className="mt-3">
              <p className="text-xs text-white/40 mb-1">Description</p>
              <p className="text-white/70 text-sm leading-relaxed">{request.description}</p>
            </div>
          )}
        </div>

        {/* Statut */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3">Changer le statut</h3>
          <div className="flex gap-2 flex-wrap mb-3">
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
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="Notes internes (non visibles par le client)..."
            className="admin-textarea text-sm resize-none"
          />
          <Button
            variant="primary"
            className="mt-3 w-full"
            icon={saving ? Loader2 : CheckCircle}
            onClick={handleSave}
            disabled={saving}
          >
            Enregistrer
          </Button>
        </div>

        {/* Répondre par email */}
        <a
          href={`mailto:${request.email}?subject=Votre demande de devis ${request.requestNumber} - OMEDEV Services&body=Bonjour ${request.fullName},%0D%0A%0D%0ANous avons bien reçu votre demande de devis pour ${SERVICE_LABELS[request.serviceType] || request.serviceType}.%0D%0A%0D%0ACordialement,%0D%0AL'équipe OMEDEV Services`}
          className="admin-btn admin-btn-outline w-full"
        >
          Répondre par email
        </a>
      </div>
    </Modal>
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
      <PageHeader
        title="Demandes de devis"
        subtitle="Demandes rapides reçues depuis le site"
        actions={
          <>
            <Button variant="outline" icon={Download} onClick={handleExportCSV}>Export CSV</Button>
            <Button variant="outline" icon={RefreshCw} onClick={fetchData}>Actualiser</Button>
          </>
        }
      />

      {/* Stats */}
      {stats && (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'Total',        value: stats.total,             color: 'text-white'       },
            { label: 'En attente',   value: stats.pending,           color: 'text-amber-400'   },
            { label: 'Contactés',    value: stats.contacted,         color: 'text-blue-300'    },
            { label: 'Convertis',    value: stats.converted,         color: 'text-[#55DDB5]' },
            { label: 'Conversion',   value: `${stats.conversionRate}%`, color: 'text-purple-300' },
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
          placeholder="Rechercher par nom, email, numéro, entreprise..."
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
        <LoadingState label="Chargement des demandes…" />
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
            {paginated.map(req => {
              const sc = STATUS_CONFIG[req.status] || STATUS_CONFIG.pending
              const StatusIcon = sc.icon
              return (
                <motion.div
                  key={req._id}
                  variants={fadeUp}
                  className="admin-card admin-card-hover overflow-hidden group flex flex-col"
                >
                  <div className="h-1 bg-gradient-to-r from-[#0B74C1] to-[#2AACB2]" />
                  <div className="p-4 flex-1 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-white/40">{req.requestNumber}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${sc.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {sc.label}
                      </span>
                    </div>

                    <div>
                      <p className="font-semibold text-white text-sm">{req.fullName}</p>
                      {req.company && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 text-white/40" />
                          <span className="text-xs text-white/50">{req.company}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <TrendingUp className="w-3 h-3 text-blue-300" />
                      <span className="text-xs text-blue-300 font-medium">
                        {SERVICE_LABELS[req.serviceType] || req.serviceType}
                      </span>
                    </div>

                    {req.budget && (
                      <p className="text-xs text-white/50">Budget : <span className="text-[#55DDB5]">{req.budget}</span></p>
                    )}

                    <p className="text-xs text-white/40">{new Date(req.createdAt).toLocaleDateString('fr-FR')}</p>

                    <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                      <button onClick={() => setSelected(req)} className="admin-btn admin-btn-sm admin-btn-primary flex-1">
                        <Eye className="w-3.5 h-3.5" /> Voir
                      </button>
                      <button onClick={() => handleDelete(req._id)} className="admin-btn admin-btn-sm admin-btn-danger">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {filtered.length === 0 && (
            <EmptyState icon={FileText} title="Aucune demande trouvée" description="Modifiez vos filtres ou attendez de nouvelles demandes." />
          )}

          <Pagination page={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
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
