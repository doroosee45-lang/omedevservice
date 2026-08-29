import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Eye,
  Trash2,
  X,
  Loader2,
  CheckCircle,
  Clock,
  Phone,
  Users,
  RefreshCw,
  Mail,
  MailWarning,
  Send,
} from 'lucide-react'
import { inscriptions as inscriptionsApi } from '../../services/api'
import { PageHeader, Button, SearchInput, EmptyState, LoadingState, Pagination, staggerContainer } from '../../components/Admin/ui'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1] } },
}

const STATUS_CONFIG = {
  pending:   { label: 'En attente', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',      icon: Clock },
  contacted: { label: 'Contacté',   color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',          icon: Phone },
  confirmed: { label: 'Confirmée',  color: 'bg-[#2AACB2]/20 text-[#55DDB5] border-[#2AACB2]/30',       icon: CheckCircle },
  cancelled: { label: 'Annulée',    color: 'bg-red-500/20 text-red-400 border-red-500/30',             icon: X },
}

const EMAIL_STATUS_CONFIG = {
  sent:    { label: 'Email envoyé',    color: 'text-[#55DDB5]', icon: Mail },
  pending: { label: 'Email en attente', color: 'text-amber-400', icon: Clock },
  failed:  { label: "Échec de l'envoi", color: 'text-red-400',   icon: MailWarning },
}

const FORMATIONS = [
  'Réseaux & Infrastructure',
  'Cybersécurité',
  'Cloud & Virtualisation',
  'Développement DevOps',
  'Soft skills IT',
  'Préparation certifications',
]

const DetailModal = ({ inscription, onClose, onStatusChange, onEmailResent }) => {
  const [status, setStatus] = useState(inscription.status || 'pending')
  const [notes,  setNotes]  = useState(inscription.notes  || '')
  const [saving, setSaving] = useState(false)
  const [resending, setResending] = useState(false)
  const [resendError, setResendError] = useState('')
  const [emailStatus, setEmailStatus] = useState(inscription.emailStatus || 'pending')

  const handleSave = async () => {
    setSaving(true)
    try {
      await inscriptionsApi.updateStatus(inscription._id, { status, notes })
      onStatusChange(inscription._id, status)
      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleResendEmail = async () => {
    setResending(true)
    setResendError('')
    try {
      await inscriptionsApi.resendEmail(inscription._id)
      setEmailStatus('sent')
      onEmailResent(inscription._id, 'sent')
    } catch (err) {
      setEmailStatus('failed')
      onEmailResent(inscription._id, 'failed')
      setResendError(err.response?.data?.message || "L'envoi de l'email a échoué.")
    } finally {
      setResending(false)
    }
  }

  const emailCfg = EMAIL_STATUS_CONFIG[emailStatus] || EMAIL_STATUS_CONFIG.pending
  const EmailIcon = emailCfg.icon

  return (
    <div className="fixed inset-0 admin-modal-overlay flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="admin-modal-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-[#0B1F3D]/80 backdrop-blur p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0B74C1] to-[#2AACB2] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-syne">Inscription Formation</h2>
              <p className="text-sm text-white/50">{inscription.inscriptionNumber || inscription._id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <X className="w-5 h-5 text-white/50" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-white/50 uppercase mb-3">Candidat</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-white/40">Nom</p>
                <p className="text-white font-medium">{inscription.fullName}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Email</p>
                <a href={'mailto:' + inscription.email} className="text-blue-400 hover:underline text-sm">{inscription.email}</a>
              </div>
              <div>
                <p className="text-xs text-white/40">Téléphone</p>
                <p className="text-white">{inscription.phone || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Date</p>
                <p className="text-white">{inscription.createdAt ? new Date(inscription.createdAt).toLocaleDateString('fr-FR') : '—'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-white/50 uppercase mb-3">Programme demandé</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-white/40">Formation</p>
                <p className="text-[#2AACB2] font-medium">{inscription.formation || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Centre</p>
                <p className="text-white">{inscription.centre || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Disponibilité</p>
                <p className="text-white">{inscription.disponibilite || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Financement</p>
                <p className="text-white">{inscription.financement || '—'}</p>
              </div>
            </div>
          </div>

          {inscription.message && (
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-white/50 uppercase mb-2">Message</h3>
              <p className="text-white/70 text-sm leading-relaxed">{inscription.message}</p>
            </div>
          )}

          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-white/50 uppercase mb-3">Email de confirmation</h3>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className={'flex items-center gap-1.5 text-sm font-medium ' + emailCfg.color}>
                <EmailIcon className="w-4 h-4" />
                {emailCfg.label}
              </span>
              <button
                onClick={handleResendEmail}
                disabled={resending}
                className="admin-btn admin-btn-outline text-xs px-3 py-1.5 flex items-center gap-1.5"
              >
                {resending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                Renvoyer l'email
              </button>
            </div>
            {resendError && <p className="text-red-400 text-xs mt-2">{resendError}</p>}
            {inscription.emailError && emailStatus === 'failed' && !resendError && (
              <p className="text-white/30 text-xs mt-2 break-words">Dernière erreur : {inscription.emailError}</p>
            )}
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-white/50 uppercase mb-3">Statut de l'inscription</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
                const StatusIcon = cfg.icon
                return (
                  <button
                    key={key}
                    onClick={() => setStatus(key)}
                    className={'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ' + (status === key ? cfg.color + ' border-current' : 'border-white/10 text-white/50 hover:bg-white/5')}
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
              className="admin-textarea text-sm resize-none"
              style={{ fontSize: '16px' }}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="admin-btn admin-btn-outline flex-1"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="admin-btn admin-btn-primary flex-1"
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
      const res = await inscriptionsApi.getAll()
      setInscriptions(res.data?.inscriptions || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = (id, newStatus) =>
    setInscriptions(prev => prev.map(i => i._id === id ? { ...i, status: newStatus } : i))

  const handleEmailResent = (id, newEmailStatus) =>
    setInscriptions(prev => prev.map(i => i._id === id ? { ...i, emailStatus: newEmailStatus } : i))

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette inscription ?')) return
    try {
      await inscriptionsApi.delete(id)
      setInscriptions(prev => prev.filter(i => i._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = inscriptions.filter(i => {
    const term = search.toLowerCase()
    const name  = (i.fullName || '').toLowerCase()
    const email = (i.email || '').toLowerCase()
    const prog  = (i.formation || '').toLowerCase()
    const matchSearch  = !search || name.includes(term) || email.includes(term) || prog.includes(term)
    const matchStatus  = statusFilter === 'all' || i.status === statusFilter
    const matchProgram = programFilter === 'all' || (i.formation || '') === programFilter
    return matchSearch && matchStatus && matchProgram
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const total      = inscriptions.length
  const pending    = inscriptions.filter(i => !i.status || i.status === 'pending').length
  const confirmed  = inscriptions.filter(i => i.status === 'confirmed').length
  const emailFailed = inscriptions.filter(i => i.emailStatus === 'failed').length

  const stats = [
    { icon: Users,         label: 'Total inscriptions',   value: total,       color: 'from-[#0B74C1] to-[#2AACB2]' },
    { icon: Clock,         label: 'En attente',            value: pending,     color: 'from-amber-500 to-orange-500'  },
    { icon: CheckCircle,   label: 'Confirmées',            value: confirmed,   color: 'from-[#2AACB2] to-[#2AACB2]'  },
    { icon: MailWarning,   label: 'Emails en échec',        value: emailFailed, color: 'from-red-500 to-orange-500'    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inscriptions Formations"
        subtitle="Gérez les demandes d'inscription aux formations — indépendant des devis commerciaux"
        actions={<Button variant="outline" icon={RefreshCw} onClick={loadData}>Actualiser</Button>}
      />

      <motion.div
        initial="hidden" animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((s, i) => (
          <motion.div
            key={i} variants={fadeUp}
            className="admin-card admin-card-hover p-5"
          >
            <div className={'w-10 h-10 rounded-xl bg-gradient-to-br ' + s.color + ' flex items-center justify-center mb-3'}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-white font-syne">{s.value}</div>
            <div className="text-white/50 text-xs mt-1">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-3">
        <SearchInput value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} placeholder="Rechercher un candidat..." className="min-w-[180px]" />
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
          className="admin-select text-sm"
        >
          <option value="all">Tous les statuts</option>
          {Object.entries(STATUS_CONFIG).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
        <select
          value={programFilter}
          onChange={(e) => { setProgramFilter(e.target.value); setPage(1) }}
          className="admin-select text-sm"
        >
          <option value="all">Tous les programmes</option>
          {FORMATIONS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </motion.div>

      {loading ? (
        <LoadingState label="Chargement des inscriptions…" />
      ) : paginated.length === 0 ? (
        <EmptyState icon={GraduationCap} title="Aucune inscription trouvée" description="Les inscriptions soumises via le formulaire apparaîtront ici" />
      ) : (
        <div className="space-y-3">
          {paginated.map((ins, idx) => {
            const sc = STATUS_CONFIG[ins.status] || STATUS_CONFIG.pending
            const StatusIcon = sc.icon
            const ec = EMAIL_STATUS_CONFIG[ins.emailStatus] || EMAIL_STATUS_CONFIG.pending
            const EmailIcon = ec.icon
            const initial = (ins.fullName || '?')[0].toUpperCase()
            return (
              <motion.div
                key={ins._id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: idx * 0.04 }}
                className="admin-card admin-card-hover p-4 sm:p-5"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B74C1] to-[#2AACB2] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{initial}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-medium text-sm truncate">{ins.fullName}</p>
                      <p className="text-white/50 text-xs truncate">{ins.email}</p>
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block px-4">
                    <p className="text-[#2AACB2] text-sm font-medium truncate">{ins.formation || '—'}</p>
                    <p className="text-white/40 text-xs">{ins.centre || '—'} · {ins.disponibilite || '—'}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <EmailIcon className={'w-4 h-4 ' + ec.color} title={ec.label} />
                    <span className={'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ' + sc.color}>
                      <StatusIcon className="w-3 h-3" />
                      {sc.label}
                    </span>
                    <span className="text-white/40 text-xs hidden sm:block">
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

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <AnimatePresence>
        {selected && (
          <DetailModal
            inscription={selected}
            onClose={() => setSelected(null)}
            onStatusChange={handleStatusChange}
            onEmailResent={handleEmailResent}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminFormation
