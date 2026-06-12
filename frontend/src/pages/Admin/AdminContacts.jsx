import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
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
  MailOpen,
  Phone,
  Clock,
} from 'lucide-react'
import { contact as contactApi } from '../../services/api'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1] } },
}

const ContactDetailModal = ({ msg, onClose, onMarkRead }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-white/10"
      >
        <div className="sticky top-0 bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
              <MailOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Message de contact</h2>
              <p className="text-sm text-gray-400">{new Date(msg.createdAt).toLocaleString('fr-FR')}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Expéditeur */}
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Expéditeur</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-gray-500">Nom</p><p className="text-white font-medium">{msg.nom}</p></div>
              <div><p className="text-xs text-gray-500">Email</p>
                <a href={`mailto:${msg.email}`} className="text-blue-400 hover:underline">{msg.email}</a>
              </div>
              {msg.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <p className="text-white">{msg.phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Objet + Message */}
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Objet</h3>
            <p className="text-white font-semibold">{msg.objet}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Message</h3>
            <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.objet)}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm hover:scale-105 transition"
            >
              <Mail className="w-4 h-4" /> Répondre par email
            </a>
            {!msg.isRead && (
              <button
                onClick={() => onMarkRead(msg._id)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/30 text-emerald-400 text-sm hover:bg-emerald-500/10 transition"
              >
                <CheckCircle className="w-4 h-4" /> Marquer lu
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
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
      const [listRes, statsRes] = await Promise.all([
        contactApi.getAllMessages(),
        contactApi.getAllMessages(), // on recharge les stats depuis la liste
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Messages de contact</h1>
          <p className="text-gray-400 mt-1">Messages reçus depuis le formulaire de contact</p>
        </div>
        <button onClick={fetchData} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-gray-300 hover:bg-white/20 transition">
          <RefreshCw className="w-4 h-4" /> Actualiser
        </button>
      </motion.div>

      {/* Stats */}
      {stats && (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total messages', value: stats.total,              color: 'text-white'       },
            { label: 'Non lus',        value: stats.unread,             color: 'text-amber-400'   },
            { label: 'Lus',            value: stats.total - stats.unread, color: 'text-emerald-400' },
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
            placeholder="Rechercher par nom, email, objet..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition"
          />
        </div>
        <select
          value={readFilter}
          onChange={e => { setReadFilter(e.target.value); setCurrentPage(1) }}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-pink-500"
        >
          <option value="all">Tous les messages</option>
          <option value="unread">Non lus</option>
          <option value="read">Lus</option>
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-8 h-8 text-pink-400 animate-spin" />
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
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            className="space-y-3"
          >
            {paginated.map(msg => (
              <motion.div
                key={msg._id}
                variants={fadeUp}
                className={`bg-white/5 border rounded-xl p-4 flex items-start gap-4 hover:bg-white/10 transition group cursor-pointer ${!msg.isRead ? 'border-pink-500/30' : 'border-white/10'}`}
                onClick={() => handleOpenMessage(msg)}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${!msg.isRead ? 'bg-pink-500/20' : 'bg-white/10'}`}>
                  {msg.isRead
                    ? <MailOpen className="w-5 h-5 text-gray-400" />
                    : <Mail className="w-5 h-5 text-pink-400" />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`font-semibold text-sm ${!msg.isRead ? 'text-white' : 'text-gray-300'}`}>{msg.nom}</span>
                    <span className="text-xs text-gray-500">{msg.email}</span>
                    {!msg.isRead && (
                      <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">Nouveau</span>
                    )}
                  </div>
                  <p className={`text-sm truncate ${!msg.isRead ? 'text-white font-medium' : 'text-gray-400'}`}>{msg.objet}</p>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{msg.message}</p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {new Date(msg.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={e => { e.stopPropagation(); handleOpenMessage(msg) }}
                      className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
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
            <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
              <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white">Aucun message trouvé</h3>
              <p className="text-gray-500 mt-1">Modifiez vos filtres ou attendez de nouveaux messages.</p>
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
