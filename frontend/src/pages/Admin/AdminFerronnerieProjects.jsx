import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Hammer, Plus, Eye, EyeOff, Pencil, Trash2, X, Loader2,
  RefreshCw, Layers, Package, CheckCircle, AlertCircle,
  Image, MapPin, Calendar, Clock, Star,
} from 'lucide-react'
import { ferronnerieProjects as projApi } from '../../services/api'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1] } },
}

const CATEGORY_CONFIG = {
  Ferronnerie: { color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', icon: Hammer },
  Mobilier:    { color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',    icon: Layers },
  Vitrines:    { color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',       icon: Package },
}

const EMPTY_FORM = {
  title: '',
  category: 'Ferronnerie',
  location: '',
  date: '',
  duration: '',
  sector: '',
  badge: '',
  cover: '',
  gallery: '',
  description: '',
  details: '',
  clientName: '',
  clientRole: '',
  clientAvatar: '',
  clientRating: 5,
  clientReview: '',
  isPublished: true,
  order: 0,
}

const parseForm = (f) => ({
  title: f.title,
  category: f.category,
  location: f.location,
  date: f.date,
  duration: f.duration,
  sector: f.sector,
  badge: f.badge,
  cover: f.cover,
  gallery: f.gallery.split('\n').map(s => s.trim()).filter(Boolean),
  description: f.description,
  details: f.details.split('\n').map(s => s.trim()).filter(Boolean),
  client: {
    name: f.clientName,
    role: f.clientRole,
    avatar: f.clientAvatar,
    rating: parseInt(f.clientRating),
    review: f.clientReview,
  },
  isPublished: f.isPublished,
  order: parseInt(f.order) || 0,
})

const formFromProject = (p) => ({
  title: p.title || '',
  category: p.category || 'Ferronnerie',
  location: p.location || '',
  date: p.date || '',
  duration: p.duration || '',
  sector: p.sector || '',
  badge: p.badge || '',
  cover: p.cover || '',
  gallery: (p.gallery || []).join('\n'),
  description: p.description || '',
  details: (p.details || []).join('\n'),
  clientName: p.client?.name || '',
  clientRole: p.client?.role || '',
  clientAvatar: p.client?.avatar || '',
  clientRating: p.client?.rating || 5,
  clientReview: p.client?.review || '',
  isPublished: p.isPublished !== false,
  order: p.order || 0,
})

// ── FORM MODAL ────────────────────────────────────────────────────────────────

const ProjectFormModal = ({ project, onClose, onSaved }) => {
  const [form, setForm] = useState(project ? formFromProject(project) : EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSave = async () => {
    if (!form.title || !form.category || !form.description) {
      setError('Titre, catégorie et description sont obligatoires.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const payload = parseForm(form)
      if (project) {
        await projApi.update(project._id, payload)
      } else {
        await projApi.create(payload)
      }
      onSaved()
      onClose()
    } catch (err) {
      setError(err?.response?.data?.message || 'Une erreur est survenue.')
    } finally {
      setSaving(false)
    }
  }

  const InputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-sm'
  const LabelCls = 'block text-gray-400 text-xs font-medium mb-1.5'

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl my-8"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">{project ? 'Modifier le projet' : 'Nouveau projet'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Titre + Catégorie */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={LabelCls}>Titre *</label>
              <input name="title" value={form.title} onChange={set} placeholder="Nom du projet" className={InputCls} />
            </div>
            <div>
              <label className={LabelCls}>Catégorie *</label>
              <select name="category" value={form.category} onChange={set} className={InputCls} style={{ background: '#1e293b' }}>
                <option value="Ferronnerie">Ferronnerie</option>
                <option value="Mobilier">Mobilier</option>
                <option value="Vitrines">Vitrines</option>
              </select>
            </div>
          </div>

          {/* Lieu + Date + Durée + Secteur */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className={LabelCls}>Lieu</label>
              <input name="location" value={form.location} onChange={set} placeholder="Tunis" className={InputCls} />
            </div>
            <div>
              <label className={LabelCls}>Date</label>
              <input name="date" value={form.date} onChange={set} placeholder="Janvier 2024" className={InputCls} />
            </div>
            <div>
              <label className={LabelCls}>Durée</label>
              <input name="duration" value={form.duration} onChange={set} placeholder="5 jours" className={InputCls} />
            </div>
            <div>
              <label className={LabelCls}>Secteur</label>
              <input name="sector" value={form.sector} onChange={set} placeholder="Résidentiel" className={InputCls} />
            </div>
          </div>

          {/* Badge + Ordre + Publié */}
          <div className="grid grid-cols-3 gap-3 items-end">
            <div>
              <label className={LabelCls}>Badge</label>
              <input name="badge" value={form.badge} onChange={set} placeholder="Coup de cœur" className={InputCls} />
            </div>
            <div>
              <label className={LabelCls}>Ordre d'affichage</label>
              <input name="order" type="number" value={form.order} onChange={set} className={InputCls} />
            </div>
            <label className="flex items-center gap-2 cursor-pointer pb-3">
              <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={set} className="w-4 h-4 accent-blue-500" />
              <span className="text-gray-300 text-sm">Publié</span>
            </label>
          </div>

          {/* Image principale */}
          <div>
            <label className={LabelCls}>URL image principale</label>
            <input name="cover" value={form.cover} onChange={set} placeholder="https://..." className={InputCls} />
            {form.cover && (
              <img src={form.cover} alt="aperçu" className="mt-2 h-24 w-full object-cover rounded-lg opacity-70" />
            )}
          </div>

          {/* Galerie */}
          <div>
            <label className={LabelCls}>URLs galerie (une par ligne)</label>
            <textarea name="gallery" value={form.gallery} onChange={set} rows={3} placeholder="https://image1.jpg&#10;https://image2.jpg" className={InputCls + ' resize-none'} />
          </div>

          {/* Description */}
          <div>
            <label className={LabelCls}>Description *</label>
            <textarea name="description" value={form.description} onChange={set} rows={3} placeholder="Description du projet..." className={InputCls + ' resize-none'} />
          </div>

          {/* Détails techniques */}
          <div>
            <label className={LabelCls}>Détails techniques (un par ligne)</label>
            <textarea name="details" value={form.details} onChange={set} rows={3} placeholder="Dimensions : 4m × 2m&#10;Finition : laqué anthracite" className={InputCls + ' resize-none'} />
          </div>

          {/* Client */}
          <div className="bg-white/5 rounded-xl p-4 space-y-3">
            <p className="text-gray-300 text-sm font-medium">Avis client</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className={LabelCls}>Nom client</label>
                <input name="clientName" value={form.clientName} onChange={set} placeholder="M. Ben Ali" className={InputCls} />
              </div>
              <div>
                <label className={LabelCls}>Rôle</label>
                <input name="clientRole" value={form.clientRole} onChange={set} placeholder="Propriétaire" className={InputCls} />
              </div>
              <div>
                <label className={LabelCls}>Initiales (avatar)</label>
                <input name="clientAvatar" value={form.clientAvatar} onChange={set} placeholder="BA" className={InputCls} />
              </div>
            </div>
            <div>
              <label className={LabelCls}>Note (1-5)</label>
              <select name="clientRating" value={form.clientRating} onChange={set} className={InputCls} style={{ background: '#1e293b' }}>
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} étoile{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <div>
              <label className={LabelCls}>Témoignage</label>
              <textarea name="clientReview" value={form.clientReview} onChange={set} rows={3} placeholder="Avis du client..." className={InputCls + ' resize-none'} />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}
        </div>

        <div className="flex gap-3 p-6 border-t border-white/10">
          <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all text-sm">
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            {project ? 'Enregistrer' : 'Créer le projet'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

const AdminFerronnerieProjects = () => {
  const [data, setData] = useState({ projets: [], stats: {} })
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [filter, setFilter] = useState('Tous')

  const load = async () => {
    setLoading(true)
    try {
      const res = await projApi.getAll()
      setData(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleTogglePublish = async (id) => {
    try {
      await projApi.togglePublish(id)
      load()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await projApi.delete(id)
      setDeleting(null)
      load()
    } catch (err) {
      console.error(err)
    }
  }

  const projets = data.projets || []
  const stats = data.stats || {}
  const filtered = filter === 'Tous' ? projets : projets.filter(p => p.category === filter)

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-syne flex items-center gap-3">
            <Hammer className="w-7 h-7 text-orange-400" /> Ferronnerie & Mobilier — Projets
          </h1>
          <p className="text-gray-400 text-sm mt-1">Portfolio et réalisations publiés sur le site</p>
        </div>
        <div className="flex gap-3">
          <button onClick={load} className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setEditing(null); setModalOpen(true) }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Nouveau projet
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: 'Total',        val: stats.total || 0,       color: 'text-white'        },
          { label: 'Publiés',      val: stats.published || 0,   color: 'text-emerald-400'  },
          { label: 'Ferronnerie',  val: stats.ferronnerie || 0, color: 'text-orange-400'   },
          { label: 'Mobilier',     val: stats.mobilier || 0,    color: 'text-amber-400'    },
          { label: 'Vitrines',     val: stats.vitrines || 0,    color: 'text-cyan-400'     },
        ].map((s) => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color} font-syne`}>{s.val}</p>
            <p className="text-gray-400 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['Tous', 'Ferronnerie', 'Mobilier', 'Vitrines'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              filter === cat
                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Hammer className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Aucun projet trouvé. Cliquez sur "Nouveau projet" pour commencer.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => {
            const CatIcon = CATEGORY_CONFIG[p.category]?.icon || Hammer
            return (
              <div key={p._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group">
                {/* Cover */}
                <div className="relative h-44 overflow-hidden">
                  {p.cover ? (
                    <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <Image className="w-10 h-10 text-gray-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full border ${CATEGORY_CONFIG[p.category]?.color || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                    {p.category}
                  </span>
                  {!p.isPublished && (
                    <span className="absolute top-3 right-3 text-xs bg-red-500/80 text-white px-2 py-1 rounded-full">
                      Masqué
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-white text-sm mb-2 line-clamp-1">{p.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    {p.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>}
                    {p.date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{p.date}</span>}
                  </div>
                  {p.client?.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(p.client.rating)].map((_, i) => <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />)}
                      <span className="text-xs text-gray-500 ml-1">{p.client.name}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                    <button
                      onClick={() => handleTogglePublish(p._id)}
                      title={p.isPublished ? 'Masquer' : 'Publier'}
                      className={`p-2 rounded-lg border transition-all ${p.isPublished ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400' : 'bg-gray-500/10 border-gray-500/20 text-gray-400 hover:bg-emerald-500/10 hover:border-emerald-500/20 hover:text-emerald-400'}`}
                    >
                      {p.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => { setEditing(p); setModalOpen(true) }}
                      className="p-2 rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleting(p)}
                      className="p-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all ml-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {modalOpen && (
          <ProjectFormModal
            project={editing}
            onClose={() => { setModalOpen(false); setEditing(null) }}
            onSaved={load}
          />
        )}
        {deleting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center"
            >
              <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Supprimer ce projet ?</h3>
              <p className="text-gray-400 text-sm mb-6 line-clamp-2">"{deleting.title}" sera définitivement supprimé.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleting(null)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all text-sm">
                  Annuler
                </button>
                <button onClick={() => handleDelete(deleting._id)} className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all text-sm">
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

export default AdminFerronnerieProjects
