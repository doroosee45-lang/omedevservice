import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Users, UserCheck, UserX, Trash2, RefreshCw,
  Download, CheckCircle, TrendingUp,
} from 'lucide-react'
import { newsletter as newsletterApi } from '../../services/api'
import { PageHeader, Card, Button, Modal, SearchInput, EmptyState, LoadingState, fadeUp, staggerContainer } from '../../components/Admin/ui'

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
    <>
      <PageHeader
        title="Newsletter — Abonnés"
        subtitle="Gestion des abonnés et historique des notifications envoyées"
        actions={
          <>
            <Button variant="outline" size="sm" icon={RefreshCw} onClick={load} />
            <Button variant="outline" icon={Download} onClick={exportCSV}>Exporter CSV</Button>
          </>
        }
      />

      {/* Stats */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total abonnés',  val: stats.total    || 0, color: 'text-white',        icon: Users      },
          { label: 'Actifs',         val: stats.active   || 0, color: 'text-[#55DDB5]',  icon: UserCheck  },
          { label: 'Désabonnés',     val: stats.inactive || 0, color: 'text-red-400',      icon: UserX      },
          { label: 'Taux activité',  val: stats.total > 0 ? Math.round((stats.active / stats.total) * 100) + '%' : '—', color: 'text-blue-300', icon: TrendingUp },
        ].map((s) => {
          const Icon = s.icon
          return (
            <motion.div key={s.label} variants={fadeUp} className="admin-card p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${s.color} opacity-70`} />
              </div>
              <p className={`text-2xl font-bold ${s.color} font-syne`}>{s.val}</p>
              <p className="text-white/50 text-xs mt-1">{s.label}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un email ou un nom…" />
        <div className="flex gap-2">
          {[['all', 'Tous'], ['active', 'Actifs'], ['inactive', 'Désabonnés']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                filter === val
                  ? 'bg-[#2AACB2]/15 text-[#55DDB5] border-[#2AACB2]/30'
                  : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <LoadingState label="Chargement des abonnés…" />
      ) : filtered.length === 0 ? (
        <EmptyState icon={Mail} title="Aucun abonné trouvé" />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th className="hidden sm:table-cell">Nom</th>
                  <th className="hidden md:table-cell">Source</th>
                  <th className="hidden lg:table-cell">Date</th>
                  <th className="text-center">Statut</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((sub) => (
                  <tr key={sub._id}>
                    <td className="font-medium">{sub.email}</td>
                    <td className="hidden sm:table-cell text-white/50">{sub.name || '—'}</td>
                    <td className="hidden md:table-cell">
                      <span className="text-xs bg-blue-500/10 border border-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                        {SOURCE_LABELS[sub.source] || sub.source}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell text-white/40 text-xs">
                      {new Date(sub.subscribedAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="text-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                        sub.isActive
                          ? 'bg-[#2AACB2]/10 border border-[#2AACB2]/20 text-[#55DDB5]'
                          : 'bg-red-500/10 border border-red-500/20 text-red-400'
                      }`}>
                        {sub.isActive ? <><CheckCircle className="w-3 h-3" /> Actif</> : <><UserX className="w-3 h-3" /> Inactif</>}
                      </span>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => setDeleting(sub)}
                        className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-white/10 text-xs text-white/40">
            {filtered.length} abonné{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
          </div>
        </Card>
      )}

      {/* Delete confirm */}
      <AnimatePresence>
        {deleting && (
          <Modal open onClose={() => setDeleting(null)} maxWidth="max-w-sm">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-white font-bold font-syne mb-2">Supprimer l'abonné ?</h3>
              <p className="text-white/50 text-sm mb-5">{deleting.email}</p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setDeleting(null)}>Annuler</Button>
                <Button variant="danger" className="flex-1" onClick={() => handleDelete(deleting._id)}>Supprimer</Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}

export default AdminNewsletter
