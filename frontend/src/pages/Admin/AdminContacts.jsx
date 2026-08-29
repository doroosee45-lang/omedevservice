import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Eye,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  MailOpen,
  Phone,
  Clock,
} from 'lucide-react'
import { contact as contactApi } from '../../services/api'
import { PageHeader, Button, Modal, SearchInput, Select, Pagination, EmptyState, LoadingState, fadeUp, staggerContainer } from '../../components/Admin/ui'

const ContactDetailModal = ({ msg, onClose, onMarkRead }) => {
  return (
    <Modal open onClose={onClose} maxWidth="max-w-xl" title={
      <span className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0B74C1] to-[#2AACB2] flex items-center justify-center">
          <MailOpen className="w-5 h-5 text-white" />
        </span>
        <span>
          <span className="block">Message de contact</span>
          <span className="block text-xs font-normal text-white/50">{new Date(msg.createdAt).toLocaleString('fr-FR')}</span>
        </span>
      </span>
    }>
      <div className="space-y-5">
        {/* Expéditeur */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3">Expéditeur</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-xs text-white/40">Nom</p><p className="text-white font-medium">{msg.nom}</p></div>
            <div><p className="text-xs text-white/40">Email</p>
              <a href={`mailto:${msg.email}`} className="text-blue-300 hover:underline">{msg.email}</a>
            </div>
            {msg.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white/40" />
                <p className="text-white">{msg.phone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Objet + Message */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2">Objet</h3>
          <p className="text-white font-semibold">{msg.objet}</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2">Message</h3>
          <p className="text-white/70 text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.objet)}`}
            className="admin-btn admin-btn-primary flex-1"
          >
            <Mail className="w-4 h-4" /> Répondre par email
          </a>
          {!msg.isRead && (
            <button
              onClick={() => onMarkRead(msg._id)}
              className="admin-btn admin-btn-outline"
            >
              <CheckCircle className="w-4 h-4" /> Marquer lu
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}

const AdminContacts = () => {
  const [messages, setMessages]    = useState([])
  const [loading, setLoading]      = useState(true)
  const [error, setError]          = useState(null)
  const [search, setSearch]        = useState('')
  const [readFilter, setReadFilter] = useState('all')
  const [selected, setSelected]    = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [stats, setStats]          = useState(null)
  const itemsPerPage = 15

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [listRes] = await Promise.all([
        contactApi.getAllMessages(),
      ])
      const data = listRes.data?.messages || listRes.data || []
      setMessages(Array.isArray(data) ? data : [])
      const total  = listRes.data?.total || data.length
      const unread = data.filter(m => !m.isRead).length
      setStats({ total, unread })
    } catch (err) {
      setError('Impossible de charger les messages.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleMarkRead = async (id) => {
    try {
      await contactApi.markAsRead(id)
      setMessages(prev => prev.map(m => m._id === id ? { ...m, isRead: true, readAt: new Date() } : m))
      setStats(prev => prev ? { ...prev, unread: Math.max(0, prev.unread - 1) } : prev)
      if (selected?._id === id) setSelected(prev => ({ ...prev, isRead: true }))
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce message ?')) return
    try {
      await contactApi.deleteMessage(id)
      setMessages(prev => prev.filter(m => m._id !== id))
      if (selected?._id === id) setSelected(null)
    } catch (err) {
      console.error(err)
    }
  }

  const handleOpenMessage = async (msg) => {
    setSelected(msg)
    if (!msg.isRead) await handleMarkRead(msg._id)
  }

  const filtered = messages.filter(m => {
    const matchSearch = (m.nom || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.objet || '').toLowerCase().includes(search.toLowerCase())
    const matchRead = readFilter === 'all' || (readFilter === 'unread' ? !m.isRead : m.isRead)
    return matchSearch && matchRead
  })

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginated  = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <>
      <PageHeader
        title="Messages de contact"
        subtitle="Messages reçus depuis le formulaire de contact"
        actions={<Button variant="outline" icon={RefreshCw} onClick={fetchData}>Actualiser</Button>}
      />

      {/* Stats */}
      {stats && (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total messages', value: stats.total,              color: 'text-white'       },
            { label: 'Non lus',        value: stats.unread,             color: 'text-amber-400'   },
            { label: 'Lus',            value: stats.total - stats.unread, color: 'text-[#55DDB5]' },
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
          placeholder="Rechercher par nom, email, objet..."
        />
        <Select value={readFilter} onChange={e => { setReadFilter(e.target.value); setCurrentPage(1) }} className="sm:w-56">
          <option value="all">Tous les messages</option>
          <option value="unread">Non lus</option>
          <option value="read">Lus</option>
        </Select>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingState label="Chargement des messages…" />
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
            className="space-y-3"
          >
            {paginated.map(msg => (
              <motion.div
                key={msg._id}
                variants={fadeUp}
                className={`admin-card p-4 flex items-start gap-4 hover:bg-white/8 transition group cursor-pointer ${!msg.isRead ? '!border-[#0B74C1]/40' : ''}`}
                onClick={() => handleOpenMessage(msg)}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${!msg.isRead ? 'bg-blue-500/20' : 'bg-white/10'}`}>
                  {msg.isRead
                    ? <MailOpen className="w-5 h-5 text-white/50" />
                    : <Mail className="w-5 h-5 text-blue-300" />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`font-semibold text-sm ${!msg.isRead ? 'text-white' : 'text-white/70'}`}>{msg.nom}</span>
                    <span className="text-xs text-white/40">{msg.email}</span>
                    {!msg.isRead && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">Nouveau</span>
                    )}
                  </div>
                  <p className={`text-sm truncate ${!msg.isRead ? 'text-white font-medium' : 'text-white/50'}`}>{msg.objet}</p>
                  <p className="text-xs text-white/40 line-clamp-1 mt-0.5">{msg.message}</p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs text-white/40">
                    <Clock className="w-3 h-3" />
                    {new Date(msg.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={e => { e.stopPropagation(); handleOpenMessage(msg) }}
                      className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); handleDelete(msg._id) }}
                      className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <EmptyState icon={Mail} title="Aucun message trouvé" description="Modifiez vos filtres ou attendez de nouveaux messages." />
          )}

          <Pagination page={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
        </>
      )}

      <AnimatePresence>
        {selected && (
          <ContactDetailModal
            msg={selected}
            onClose={() => setSelected(null)}
            onMarkRead={handleMarkRead}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default AdminContacts
