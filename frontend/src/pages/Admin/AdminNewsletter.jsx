import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Users, UserCheck, UserX, Trash2, RefreshCw,
  Search, Download, Loader2, CheckCircle, TrendingUp,
} from 'lucide-react'
import { newsletter as newsletterApi } from '../../services/api'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const SOURCE_LABELS = {
  footer: 'Footer',
  blog:   'Blog',
  popup:  'Pop-up',
  admin:  'Admin',
}

const AdminNewsletter = () => {
  const [subscribers, setSubscribers] = useState([])
  const [stats, setStats]             = useState({})
  const [loading, setLoading]         = useState(true)
  const [search, setSearch]           = useState('')
  const [filter, setFilter]           = useState('all') // all | active | inactive
  const [deleting, setDeleting]       = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const [subRes, statRes] = await Promise.all([
        newsletterApi.getSubscribers(filter !== 'all' ? { active: filter === 'active' } : {}),
        newsletterApi.getStats(),
      ])
      setSubscribers(subRes.data)
      setStats(statRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [filter])

  const handleDelete = async (id) => {
    try {
      await newsletterApi.deleteSubscriber(id)
      setSubscribers(prev => prev.filter(s => s._id !== id))
      setStats(prev => ({ ...prev, total: prev.total - 1 }))
      setDeleting(null)
    } catch (err) {
      console.error(err)
    }
  }

  const exportCSV = () => {
    const rows = [['Email', 'Nom', 'Statut', 'Source', 'Date inscription']]
    filtered.forEach(s => rows.push([
      s.email,
      s.name || '',
      s.isActive ? 'Actif' : 'Inactif',
      SOURCE_LABELS[s.source] || s.source,
      new Date(s.subscribedAt).toLocaleDateString('fr-FR'),
    ]))
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const a = document.createElement('a'); a.href = url; a.download = 'abonnes_newsletter.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = subscribers.filter(s =>
    !search || s.email.toLowerCase().includes(search.toLowerCase()) || (s.name || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-syne flex items-center gap-3">
            <Mail className="w-7 h-7 text-blue-400" /> Newsletter — Abonnés
          </h1>
          <p className="text-gray-400 text-sm mt-1">Gestion des abonnés et historique des notifications envoyées</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all text-sm">
            <Download className="w-4 h-4" /> Exporter CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total abonnés',  val: stats.total    || 0, color: 'text-white',        icon: Users      },
          { label: 'Actifs',         val: stats.active   || 0, color: 'text-emerald-400',  icon: UserCheck  },
          { label: 'Désabonnés',     val: stats.inactive || 0, color: 'text-red-400',      icon: UserX      },
          { label: 'Taux activité',  val: stats.total > 0 ? Math.round((stats.active / stats.total) * 100) + '%' : '—', color: 'text-blue-400', icon: TrendingUp },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${s.color} opacity-70`} />
              </div>
              <p className={`text-2xl font-bold ${s.color} font-syne`}>{s.val}</p>
              <p className="text-gray-400 text-xs mt-1">{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un email ou un nom…"
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {[['all', 'Tous'], ['active', 'Actifs'], ['inactive', 'Désabonnés']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                filter === val
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Aucun abonné trouvé.</p>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-xs uppercase">
                  <th className="text-left px-5 py-3 font-medium">Email</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Nom</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Source</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Date</th>
                  <th className="text-center px-4 py-3 font-medium">Statut</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((sub, idx) => (
                  <tr
                    key={sub._id}
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors ${idx % 2 === 0 ? '' : 'bg-white/2'}`}
                  >
                    <td className="px-5 py-3 text-white font-medium">{sub.email}</td>
                    <td className="px-4 py-3 text-gray-400 hidden sm:table-cell">{sub.name || '—'}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs bg-blue-500/10 border border-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                        {SOURCE_LABELS[sub.source] || sub.source}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">
                      {new Date(sub.subscribedAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                        sub.isActive
                          ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                          : 'bg-red-500/10 border border-red-500/20 text-red-400'
                      }`}>
                        {sub.isActive ? <><CheckCircle className="w-3 h-3" /> Actif</> : <><UserX className="w-3 h-3" /> Inactif</>}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setDeleting(sub)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-white/10 text-xs text-gray-500">
            {filtered.length} abonné{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
          </div>
        </div>
      )}

      {/* Delete confirm */}
      <AnimatePresence>
        {deleting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-white font-bold mb-2">Supprimer l'abonné ?</h3>
              <p className="text-gray-400 text-sm mb-5">{deleting.email}</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleting(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 text-sm transition-all">
                  Annuler
                </button>
                <button onClick={() => handleDelete(deleting._id)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all">
                  Supprimer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default AdminNewsletter
