import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Search,
  Eye,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle,
  Clock,
  Phone,
  Users,
  RefreshCw,
} from 'lucide-react'
import { quoteRequests as quoteApi } from '../../services/api'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1] } },
}

const STATUS_CONFIG = {
  pending:   { label: 'En attente',  color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',       icon: Clock },
  contacted: { label: 'Contacté',   color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',           icon: Phone },
  quoted:    { label: 'Confirmée',  color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',     icon: GraduationCap },
  converted: { label: 'Inscrit',    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',  icon: CheckCircle },
  lost:      { label: 'Annulé',     color: 'bg-red-500/20 text-red-400 border-red-500/30',              icon: X },
}

const FORMATIONS = [
  'Réseaux & Infrastructure',
  'Cybersécurité',
  'Cloud & Virtualisation',
  'Développement DevOps',
  'Soft skills IT',
  'Préparation certifications',
]

const parseFormationMessage = (msg) => {
  if (!msg) return {}
  const r = {}
  const m = {
    formation:     msg.match(/Formation:\s*([^|]+)/),
    centre:        msg.match(/Centre:\s*([^|]+)/),
    disponibilite: msg.match(/Disponibilité:\s*([^|]+)/),
    financement:   msg.match(/Financement:\s*([^\n]+)/),
  }
  for (const [k, v] of Object.entries(m)) if (v) r[k] = v[1].trim()
  const parts = msg.split('\n\n')
  if (parts.length > 1) r.note = parts.slice(1).join('\n\n').trim()
  return r
}

const DetailModal = ({ inscription, onClose, onStatusChange }) => {
  const [status, setStatus] = useState(inscription.status || 'pending')
  const [notes,  setNotes]  = useState(inscription.notes  || '')
  const [saving, setSaving] = useState(false)
  const parsed = parseFormationMessage(inscription.message)

  const handleSave = async () => {
    setSaving(true)
    try {
      await quoteApi.updateStatus(inscription._id, { status, notes })
      onStatusChange(inscription._id, status)
      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-syne">Inscription Formation</h2>
              <p className="text-sm text-gray-400">{inscription.requestNumber || inscription._id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Candidat</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-500">Nom</p>
                <p className="text-white font-medium">{inscription.fullName || inscription.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <a href={'mailto:' + inscription.email} className="text-blue-400 hover:underline text-sm">{inscription.email}</a>
              </div>
              <div>
                <p className="text-xs text-gray-500">Téléphone</p>
                <p className="text-white">{inscription.phone || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-white">{inscription.createdAt ? new Date(inscription.createdAt).toLocaleDateString('fr-FR') : '—'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Programme demandé</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-500">Formation</p>
                <p className="text-purple-300 font-medium">{parsed.formation || inscription.serviceType || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Centre</p>
                <p className="text-white">{parsed.centre || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Disponibilité</p>
                <p className="text-white">{parsed.disponibilite || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Financement</p>
                <p className="text-white">{parsed.financement || '—'}</p>
              </div>
            </div>
          </div>

          {parsed.note && (
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Message</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{parsed.note}</p>
            </div>
          )}

          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Statut</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
                const StatusIcon = cfg.icon
                return (
                  <button
                    key={key}
                    onClick={() => setStatus(key)}
                    className={'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ' + (status === key ? cfg.color + ' border-current' : 'border-white/10 text-gray-400 hover:bg-white/5')}
                  >
                    {cfg.label}
                  </button>
                )
              })}
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes internes sur ce candidat..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500/50"
              style={{ fontSize: '16px' }}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-white/20 text-gray-300 text-sm font-medium hover:bg-white/5 transition"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              Enregistrer
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const AdminFormation = () => {
  const [inscriptions, setInscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [programFilter, setProgramFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState(1)
  const PER_PAGE = 10

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await quoteApi.getAll()
      const all = res.data?.data || res.data || []
      const formations = all.filter(r =>
        r.service === 'Formation' ||
        r.serviceType?.includes('Formation') ||
        (r.message && r.message.includes('Formation:'))
      )
      setInscriptions(formations)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = (id, newStatus) =>
    setInscriptions(prev => prev.map(i => i._id === id ? { ...i, status: newStatus } : i))

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette inscription ?')) return
    try {
      await quoteApi.delete(id)
      setInscriptions(prev => prev.filter(i => i._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = inscriptions.filter(i => {
    const term = search.toLowerCase()
    const name  = (i.fullName || i.name || '').toLowerCase()
    const email = (i.email || '').toLowerCase()
    const prog  = (i.serviceType || '').toLowerCase()
    const matchSearch  = !search || name.includes(term) || email.includes(term) || prog.includes(term)
    const matchStatus  = statusFilter === 'all' || i.status === statusFilter
    const matchProgram = programFilter === 'all' || (i.serviceType || '') === programFilter
    return matchSearch && matchStatus && matchProgram
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const total      = inscriptions.length
  const pending    = inscriptions.filter(i => !i.status || i.status === 'pending').length
  const confirmed  = inscriptions.filter(i => i.status === 'converted' || i.status === 'quoted').length
  const programmes = [...new Set(inscriptions.map(i => i.serviceType).filter(Boolean))].length

  const stats = [
    { icon: Users,         label: 'Total inscriptions',   value: total,      color: 'from-indigo-500 to-purple-500' },
    { icon: Clock,         label: 'En attente',            value: pending,    color: 'from-amber-500 to-orange-500'  },
    { icon: CheckCircle,   label: 'Confirmées / Inscrites', value: confirmed, color: 'from-emerald-500 to-teal-500'  },
    { icon: GraduationCap, label: 'Programmes distincts',  value: programmes, color: 'from-blue-500 to-cyan-500'     },
  ]

  return (
    <div className="space-y-6">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white font-syne">Inscriptions Formations</h1>
          <p className="text-gray-400 text-sm mt-1">Gérez les demandes d'inscription aux formations</p>
        </div>
        <button
          onClick={loadData}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm text-gray-300 transition"
        >
          <RefreshCw className="w-4 h-4" />
          Actualiser
        </button>
      </motion.div>

      <motion.div
        initial="hidden" animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((s, i) => (
          <motion.div
            key={i} variants={fadeUp}
            className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:-translate-y-1 transition-transform"
          >
            <div className={'w-10 h-10 rounded-xl bg-gradient-to-br ' + s.color + ' flex items-center justify-center mb-3'}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-white font-syne">{s.value}</div>
            <div className="text-gray-400 text-xs mt-1">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher un candidat..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
            style={{ fontSize: '16px' }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
          className="bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-300 focus:outline-none"
        >
          <option value="all">Tous les statuts</option>
          {Object.entries(STATUS_CONFIG).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
        <select
          value={programFilter}
          onChange={(e) => { setProgramFilter(e.target.value); setPage(1) }}
          className="bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-300 focus:outline-none"
        >
          <option value="all">Tous les programmes</option>
          {FORMATIONS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      ) : paginated.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Aucune inscription trouvée</p>
          <p className="text-xs mt-1">Les inscriptions soumises via le formulaire apparaîtront ici</p>
        </div>
      ) : (
        <div className="space-y-3">
          {paginated.map((ins, idx) => {
            const parsed = parseFormationMessage(ins.message)
            const sc = STATUS_CONFIG[ins.status] || STATUS_CONFIG.pending
            const StatusIcon = sc.icon
            const initial = (ins.fullName || ins.name || '?')[0].toUpperCase()
            return (
              <motion.div
                key={ins._id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: idx * 0.04 }}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-indigo-500/30 transition-all"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{initial}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-medium text-sm truncate">{ins.fullName || ins.name}</p>
                      <p className="text-gray-400 text-xs truncate">{ins.email}</p>
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block px-4">
                    <p className="text-purple-300 text-sm font-medium truncate">{parsed.formation || ins.serviceType || '—'}</p>
                    <p className="text-gray-500 text-xs">{parsed.centre || '—'} · {parsed.disponibilite || '—'}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ' + sc.color}>
                      <StatusIcon className="w-3 h-3" />
                      {sc.label}
                    </span>
                    <span className="text-gray-500 text-xs hidden sm:block">
                      {ins.createdAt ? new Date(ins.createdAt).toLocaleDateString('fr-FR') : ''}
                    </span>
                    <button
                      onClick={() => setSelected(ins)}
                      className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(ins._id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 transition text-gray-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-400">{page} / {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 transition text-gray-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <DetailModal
            inscription={selected}
            onClose={() => setSelected(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminFormation
