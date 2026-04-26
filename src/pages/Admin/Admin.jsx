

// src/pages/Admin/AdminBlog.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Package, Settings, Plus, Edit, Trash2, Eye, Save,
  Globe, Share2, DollarSign, X, ExternalLink, Mail, Phone,
  MapPin, Check, AlertCircle, ArrowUp, ArrowDown, Power, ImageIcon
} from 'lucide-react'

// ─── Icônes sociales SVG (lucide-react@1.8 ne les inclut plus) ───────────────
const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)
const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
)

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
}

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ message, type = 'success', onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    className={`fixed top-20 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl text-sm font-medium ${
      type === 'success'
        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
        : 'bg-red-500/20 border-red-500/40 text-red-300'
    }`}
  >
    {type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
    {message}
    <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100"><X className="w-3.5 h-3.5" /></button>
  </motion.div>
)

// ─── Article Preview ──────────────────────────────────────────────────────────
const ArticlePreview = ({ article, onClose }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-3xl border border-white/10 overflow-hidden"
    >
      {article.image && (
        <div className="relative h-56 overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent" />
          <div className="absolute bottom-4 left-6">
            <span className="px-2 py-1 rounded-full text-xs bg-blue-500/80 text-white mr-2">{article.category}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${article.status === 'published' ? 'bg-emerald-500/80' : 'bg-amber-500/80'} text-white`}>
              {article.status === 'published' ? 'Publié' : 'Brouillon'}
            </span>
          </div>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 className="text-2xl font-bold text-white">{article.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white shrink-0"><X className="w-5 h-5" /></button>
        </div>
        <p className="text-sm text-gray-500 mb-3">Slug : <code className="text-blue-400">/{article.slug}</code> · {article.date}</p>
        {article.metaDesc && (
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-gray-400 text-sm italic mb-4">{article.metaDesc}</div>
        )}
        <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
          {article.content || <span className="text-gray-500 italic">Aucun contenu rédigé.</span>}
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-white/10 text-gray-400 hover:bg-white/20 text-sm">Fermer</button>
        </div>
      </div>
    </motion.div>
  </div>
)

// ─── Article Modal ────────────────────────────────────────────────────────────
const ArticleModal = ({ article, categories, onSave, onClose }) => {
  const [form, setForm] = useState(article || {
    title: '', slug: '', metaDesc: '', category: '', content: '', status: 'draft', image: ''
  })
  const [imageError, setImageError] = useState(false)

  const autoSlug = (title) =>
    title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')

  const handleTitleChange = (e) => {
    const title = e.target.value
    setForm(f => ({ ...f, title, slug: article ? f.slug : autoSlug(title) }))
  }

  const isValid = form.title.trim() && form.category

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-white/10"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">{article ? "Modifier l'article" : 'Nouvel article'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Titre <span className="text-red-400">*</span></label>
            <input type="text" value={form.title} onChange={handleTitleChange} placeholder="Titre de l'article..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Slug (URL)</label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm shrink-0">/blog/</span>
              <input type="text" value={form.slug} onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
                placeholder="exemple-article"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Meta description <span className="text-gray-600 text-xs">(150-160 caractères)</span></label>
            <textarea rows="2" value={form.metaDesc} onChange={(e) => setForm(f => ({ ...f, metaDesc: e.target.value }))}
              placeholder="Description courte pour les moteurs de recherche..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition resize-none" />
            <p className={`text-xs mt-1 ${form.metaDesc.length > 160 ? 'text-red-400' : 'text-gray-600'}`}>{form.metaDesc.length}/160</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Catégorie <span className="text-red-400">*</span></label>
              <select value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-700 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition">
                <option value="">Sélectionner...</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Statut</label>
              <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-700 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition">
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">URL de l'image de couverture</label>
            <input type="text" value={form.image}
              onChange={(e) => { setForm(f => ({ ...f, image: e.target.value })); setImageError(false) }}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition" />
            {form.image && !imageError && (
              <div className="mt-2 rounded-xl overflow-hidden h-32">
                <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={() => setImageError(true)} />
              </div>
            )}
            {imageError && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> URL invalide</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Contenu</label>
            <textarea rows="10" value={form.content} onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))}
              placeholder="Rédigez le contenu de votre article ici..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition resize-none font-mono text-sm" />
            <p className="text-xs text-gray-600 mt-1">{form.content.split(/\s+/).filter(Boolean).length} mots</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 p-6 border-t border-white/10">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-white/10 text-gray-400 hover:bg-white/20 transition-colors text-sm">Annuler</button>
          <button onClick={() => isValid && onSave(form)} disabled={!isValid}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all ${isValid ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105' : 'bg-white/10 text-gray-600 cursor-not-allowed'}`}>
            <Save className="w-4 h-4" />
            {article ? 'Mettre à jour' : "Créer l'article"}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Service Modal ────────────────────────────────────────────────────────────
const ServiceModal = ({ service, onSave, onClose }) => {
  const [form, setForm] = useState({ ...service })
  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-lg border border-white/10">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Modifier le service</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nom</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea rows="3" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 resize-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tarif</label>
            <input type="text" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className="flex justify-end gap-3 p-6 border-t border-white/10">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-white/10 text-gray-400 hover:bg-white/20 text-sm">Annuler</button>
          <button onClick={() => onSave(form)} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm hover:scale-105 transition-all">
            <Save className="w-4 h-4" /> Enregistrer
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────
const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 w-full max-w-sm border border-white/10 text-center">
      <Trash2 className="w-10 h-10 text-red-400 mx-auto mb-3" />
      <p className="text-white font-semibold mb-1">Confirmer la suppression</p>
      <p className="text-gray-400 text-sm mb-5">{message}</p>
      <div className="flex gap-3 justify-center">
        <button onClick={onCancel} className="px-4 py-2 rounded-xl bg-white/10 text-gray-400 hover:bg-white/20 text-sm">Annuler</button>
        <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-red-500/80 hover:bg-red-500 text-white text-sm transition-colors">Supprimer</button>
      </div>
    </motion.div>
  </div>
)

// ─── Main Component ───────────────────────────────────────────────────────────
const AdminBlog = () => {
  const [activeTab, setActiveTab] = useState('blog')
  const [toast, setToast] = useState(null)

  const [articles, setArticles] = useState([
    {
      id: 1, title: "Comment sécuriser son réseau d'entreprise", slug: 'securiser-reseau-entreprise',
      metaDesc: 'Découvrez les bonnes pratiques pour protéger votre infrastructure réseau contre les cyberattaques.',
      category: 'Sécurité', status: 'published', date: '15/04/2026',
      content: "La sécurité réseau est devenue une priorité absolue.\n\n1. Mettre à jour les équipements\n2. Utiliser un pare-feu\n3. Former les employés",
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop'
    },
    {
      id: 2, title: 'Les avantages du cloud pour les PME', slug: 'avantages-cloud-pme',
      metaDesc: 'Pourquoi migrer vers le cloud ? Économies, flexibilité et sécurité.',
      category: 'Cloud', status: 'draft', date: '10/04/2026',
      content: 'Le cloud computing offre aux PME des avantages considérables...',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop'
    },
  ])

  const [editingArticle, setEditingArticle] = useState(null)
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [previewArticle, setPreviewArticle] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const [services, setServices] = useState([
    { id: 1, name: 'Réseau & Infrastructure', price: 'Sur devis', order: 1, active: true, description: 'Installation et maintenance de réseaux informatiques' },
    { id: 2, name: 'Sécurité & Cybersécurité', price: 'Sur devis', order: 2, active: true, description: 'Protection des données et cybersécurité' },
    { id: 3, name: 'Développement Digital', price: 'Sur devis', order: 3, active: true, description: 'Sites web, applications, ERP' },
    { id: 4, name: 'Cloud & Hébergement', price: 'Sur devis', order: 4, active: true, description: 'Solutions cloud et hébergement' },
    { id: 5, name: 'Énergie & Équipements', price: 'Sur devis', order: 5, active: true, description: 'Panneaux solaires, climatisation' },
    { id: 6, name: 'Formation IT', price: 'Sur devis', order: 6, active: true, description: 'Formations certifiantes' },
  ])
  const [editingService, setEditingService] = useState(null)
  const [catalogueSaved, setCatalogueSaved] = useState(false)

  const [config, setConfig] = useState({
    siteName: 'OMDEVE Services', siteEmail: 'contact@omdeve.com',
    sitePhone: '+243 555 503 59', siteAddress: 'Avenue Kabmabre n°75, Lingwala, Kinshasa',
    facebook: 'https://facebook.com/omdeve', linkedin: 'https://linkedin.com/company/omdeve',
    twitter: 'https://twitter.com/omdeve',
    seoTitle: 'OMDEVE - Solutions IT, Énergie & Digital en RDC',
    seoDesc: 'Leader en solutions informatiques, énergétiques et digitales en République Démocratique du Congo',
    vatRate: '16', currency: 'EUR'
  })

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const handleSaveArticle = (form) => {
    if (editingArticle) {
      setArticles(prev => prev.map(a => a.id === editingArticle.id ? { ...form, id: a.id, date: a.date } : a))
      showToast('Article mis à jour !')
    } else {
      setArticles(prev => [...prev, { ...form, id: Date.now(), date: new Date().toLocaleDateString('fr-FR') }])
      showToast('Article créé !')
    }
    setShowArticleModal(false)
    setEditingArticle(null)
  }

  const handleDeleteArticle = (id) => {
    setDeleteConfirm({
      message: "Cette action est irréversible.",
      onConfirm: () => { setArticles(prev => prev.filter(a => a.id !== id)); setDeleteConfirm(null); showToast('Article supprimé.') }
    })
  }

  const moveService = (id, direction) => {
    const sorted = [...services].sort((a, b) => a.order - b.order)
    const idx = sorted.findIndex(s => s.id === id)
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= sorted.length) return
    const o1 = sorted[swapIdx].order, o2 = sorted[idx].order
    setServices(prev => prev.map(s => {
      if (s.id === id) return { ...s, order: o1 }
      if (s.id === sorted[swapIdx].id) return { ...s, order: o2 }
      return s
    }))
  }

  const openLink = (url) => {
    if (!url) return
    window.open(url.startsWith('http') ? url : `https://${url}`, '_blank', 'noopener,noreferrer')
  }

  const categories = ['Sécurité', 'Cloud', 'Développement', 'Énergie', 'Formation', 'Actualités']
  const tabs = [
    { id: 'blog', label: 'Blog & SEO', icon: BookOpen },
    { id: 'catalogue', label: 'Catalogue services', icon: Package },
    { id: 'config', label: 'Configuration', icon: Settings },
  ]
  const sortedServices = [...services].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-6 pb-10">
      <AnimatePresence>
        {toast && <Toast key="toast" message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Blog, catalogue & configuration</h1>
        <p className="text-gray-400 mt-1">Gérez votre contenu et les paramètres du site</p>
      </motion.div>

      <div className="flex flex-wrap gap-3 border-b border-white/10 pb-4">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}>
            <tab.icon className="w-4 h-4" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ════ BLOG ════ */}
      {activeTab === 'blog' && (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Articles du blog</h2>
              <p className="text-sm text-gray-400">{articles.length} article(s) — {articles.filter(a => a.status === 'published').length} publié(s)</p>
            </div>
            <button onClick={() => { setEditingArticle(null); setShowArticleModal(true) }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all shadow-lg text-sm font-medium">
              <Plus className="w-4 h-4" /> Nouvel article
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            {articles.length === 0 ? (
              <div className="py-16 text-center">
                <BookOpen className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500">Aucun article. Créez votre premier article !</p>
                <button onClick={() => { setEditingArticle(null); setShowArticleModal(true) }}
                  className="mt-4 px-4 py-2 rounded-xl bg-blue-500/20 text-blue-400 text-sm hover:bg-blue-500/30 transition">
                  Créer un article
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr className="text-left">
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Titre / Slug</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Catégorie</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {articles.map((article) => (
                      <tr key={article.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          {article.image
                            ? <img src={article.image} alt={article.title} className="w-12 h-12 rounded-lg object-cover border border-white/10" onError={(e) => { e.target.style.display = 'none' }} />
                            : <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center"><ImageIcon className="w-5 h-5 text-gray-600" /></div>
                          }
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-white text-sm">{article.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">/blog/{article.slug}</p>
                          {article.metaDesc && <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{article.metaDesc}</p>}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">{article.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${article.status === 'published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                            {article.status === 'published' ? '● Publié' : '○ Brouillon'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{article.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <button title="Aperçu" onClick={() => setPreviewArticle(article)}
                              className="p-2 rounded-lg bg-white/10 hover:bg-blue-500/20 hover:text-blue-400 text-gray-400 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button title="Modifier" onClick={() => { setEditingArticle(article); setShowArticleModal(true) }}
                              className="p-2 rounded-lg bg-white/10 hover:bg-emerald-500/20 hover:text-emerald-400 text-gray-400 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button title="Supprimer" onClick={() => handleDeleteArticle(article.id)}
                              className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-gray-400 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" /> Paramètres SEO globaux
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Meta titre</label>
                <input type="text" value={config.seoTitle} onChange={(e) => setConfig({ ...config, seoTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition" />
                <p className={`text-xs mt-1 ${config.seoTitle.length > 60 ? 'text-amber-400' : 'text-gray-600'}`}>{config.seoTitle.length}/60</p>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Meta description</label>
                <textarea rows="3" value={config.seoDesc} onChange={(e) => setConfig({ ...config, seoDesc: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition resize-none" />
                <p className={`text-xs mt-1 ${config.seoDesc.length > 160 ? 'text-red-400' : 'text-gray-600'}`}>{config.seoDesc.length}/160</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Aperçu Google</p>
                <p className="text-blue-400 text-sm font-medium line-clamp-1">{config.seoTitle || 'Titre du site'}</p>
                <p className="text-emerald-600 text-xs">https://omdeve.com</p>
                <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">{config.seoDesc || 'Description...'}</p>
              </div>
              <button onClick={() => showToast('Paramètres SEO enregistrés !')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all text-sm font-medium">
                <Save className="w-4 h-4" /> Enregistrer le SEO
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ════ CATALOGUE ════ */}
      {activeTab === 'catalogue' && (
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex flex-wrap justify-between items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Catalogue des services</h2>
                <p className="text-sm text-gray-400">Utilisez les flèches pour réorganiser l'affichage</p>
              </div>
              <button onClick={() => { setCatalogueSaved(true); showToast('Catalogue enregistré !'); setTimeout(() => setCatalogueSaved(false), 2000) }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all text-sm font-medium shadow-lg">
                <Save className="w-4 h-4" /> {catalogueSaved ? 'Enregistré !' : 'Enregistrer'}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr className="text-left">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ordre</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tarif</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {sortedServices.map((service, idx) => (
                    <tr key={service.id} className={`hover:bg-white/5 transition-colors ${!service.active ? 'opacity-50' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center gap-1">
                          <button onClick={() => moveService(service.id, 'up')} disabled={idx === 0}
                            className="p-1 rounded hover:bg-white/10 text-gray-500 hover:text-white disabled:opacity-20 transition">
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs text-gray-500 font-mono">{service.order}</span>
                          <button onClick={() => moveService(service.id, 'down')} disabled={idx === sortedServices.length - 1}
                            className="p-1 rounded hover:bg-white/10 text-gray-500 hover:text-white disabled:opacity-20 transition">
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-white text-sm">{service.name}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm max-w-xs">{service.description}</td>
                      <td className="px-6 py-4 text-white text-sm font-medium">{service.price}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => { setServices(prev => prev.map(s => s.id === service.id ? { ...s, active: !s.active } : s)); showToast(`Service ${service.active ? 'désactivé' : 'activé'}`) }}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${service.active ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'}`}>
                          <Power className="w-3 h-3" />
                          {service.active ? 'Actif' : 'Inactif'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => setEditingService(service)}
                          className="p-2 rounded-lg bg-white/10 hover:bg-emerald-500/20 hover:text-emerald-400 text-gray-400 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ════ CONFIG ════ */}
      {activeTab === 'config' && (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" /> Informations générales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nom du site</label>
                <input type="text" value={config.siteName} onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email de contact</label>
                <div className="flex gap-2">
                  <input type="email" value={config.siteEmail} onChange={(e) => setConfig({ ...config, siteEmail: e.target.value })}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition" />
                  <button onClick={() => window.location.href = `mailto:${config.siteEmail}`} title="Envoyer un email"
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Téléphone</label>
                <div className="flex gap-2">
                  <input type="tel" value={config.sitePhone} onChange={(e) => setConfig({ ...config, sitePhone: e.target.value })}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition" />
                  <button onClick={() => window.location.href = `tel:${config.sitePhone.replace(/\s/g, '')}`} title="Appeler"
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 transition">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Adresse</label>
                <div className="flex gap-2">
                  <input type="text" value={config.siteAddress} onChange={(e) => setConfig({ ...config, siteAddress: e.target.value })}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition" />
                  <button onClick={() => openLink(`https://maps.google.com?q=${encodeURIComponent(config.siteAddress)}`)} title="Voir sur la carte"
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-amber-500/20 text-gray-400 hover:text-amber-400 transition">
                    <MapPin className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-400" /> Réseaux sociaux
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'facebook', label: 'Facebook', Icon: FacebookIcon, color: 'text-blue-500' },
                { key: 'linkedin', label: 'LinkedIn', Icon: LinkedinIcon, color: 'text-blue-400' },
                { key: 'twitter', label: 'Twitter / X', Icon: TwitterIcon, color: 'text-sky-400' },
              ].map(({ key, label, Icon, color }) => (
                <div key={key}>
                  <label className="block text-sm text-gray-400 mb-1">{label}</label>
                  <div className="flex gap-2">
                    <input type="url" value={config[key]} onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                      placeholder={`https://${key}.com/...`}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition" />
                    <button onClick={() => openLink(config[key])} disabled={!config[key]} title={`Ouvrir ${label}`}
                      className={`p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition ${config[key] ? `${color} hover:scale-105` : 'text-gray-600 cursor-not-allowed'}`}>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-3">Liens actifs :</p>
              <div className="flex flex-wrap gap-3">
                {config.facebook && (
                  <button onClick={() => openLink(config.facebook)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs hover:bg-blue-500/20 transition">
                    <FacebookIcon /> Facebook
                  </button>
                )}
                {config.linkedin && (
                  <button onClick={() => openLink(config.linkedin)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-400/10 text-blue-300 text-xs hover:bg-blue-400/20 transition">
                    <LinkedinIcon /> LinkedIn
                  </button>
                )}
                {config.twitter && (
                  <button onClick={() => openLink(config.twitter)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-400 text-xs hover:bg-sky-500/20 transition">
                    <TwitterIcon /> Twitter
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-400" /> Paramètres SaaS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">TVA (%)</label>
                <input type="number" min="0" max="100" value={config.vatRate} onChange={(e) => setConfig({ ...config, vatRate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Devise</label>
                <select value={config.currency} onChange={(e) => setConfig({ ...config, currency: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-700 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition">
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="CDF">CDF (FC)</option>
                </select>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-400">
              Exemple : 100 {config.currency} HT →{' '}
              <span className="text-white font-medium">{(100 * (1 + parseFloat(config.vatRate || 0) / 100)).toFixed(2)} {config.currency}</span>
              {' '}TTC (TVA {config.vatRate}%)
            </div>
          </div>

          <button onClick={() => showToast('Configuration enregistrée avec succès !')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all shadow-lg font-medium">
            <Save className="w-4 h-4" /> Enregistrer toutes les modifications
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {showArticleModal && (
          <ArticleModal key="article-modal" article={editingArticle} categories={categories}
            onSave={handleSaveArticle} onClose={() => { setShowArticleModal(false); setEditingArticle(null) }} />
        )}
        {previewArticle && (
          <ArticlePreview key="preview" article={previewArticle} onClose={() => setPreviewArticle(null)} />
        )}
        {editingService && (
          <ServiceModal key="service-modal" service={editingService}
            onSave={(updated) => { setServices(prev => prev.map(s => s.id === updated.id ? updated : s)); setEditingService(null); showToast('Service mis à jour !') }}
            onClose={() => setEditingService(null)} />
        )}
        {deleteConfirm && (
          <ConfirmDialog key="confirm" message={deleteConfirm.message}
            onConfirm={deleteConfirm.onConfirm} onCancel={() => setDeleteConfirm(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminBlog;;; 



// ==================== AdminClients.jsx ====================
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Shield,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  Mail,
  Phone,
  Calendar,
  User,
  Star,
  Send
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const ClientModal = ({ client, onClose, onSave }) => {
  const [formData, setFormData] = useState(client || {
    name: '', email: '', phone: '', role: 'client', status: 'active'
  })

  const roles = [
    { value: 'super_admin', label: 'Super Admin', color: 'from-purple-500 to-pink-500' },
    { value: 'admin', label: 'Admin', color: 'from-red-500 to-orange-500' },
    { value: 'manager', label: 'Manager', color: 'from-blue-500 to-cyan-500' },
    { value: 'client', label: 'Client', color: 'from-emerald-500 to-teal-500' },
    { value: 'visitor', label: 'Visiteur', color: 'from-gray-500 to-gray-600' },
  ]

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-md p-6 border border-white/10"
      >
        <h2 className="text-xl font-bold text-white mb-4">{client ? 'Modifier' : 'Ajouter'} un utilisateur</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nom complet"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
          >
            {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">Annuler</button>
          <button onClick={() => onSave(formData)} className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition">Enregistrer</button>
        </div>
      </motion.div>
    </div>
  )
}

const AdminClients = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [showAuditLog, setShowAuditLog] = useState(true)
  const itemsPerPage = 12 // 4x3 grid

  const [clients, setClients] = useState([
    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@email.com', phone: '+243 555 503 59', role: 'client', status: 'active', date: '15/01/2024', totalProjects: 3 },
    { id: 2, name: 'Marie Martin', email: 'marie.martin@email.com', phone: '+243 555 503 60', role: 'manager', status: 'active', date: '10/02/2024', totalProjects: 8 },
    { id: 3, name: 'Admin OMDEVE', email: 'admin@omdeve.com', phone: '+243 555 503 61', role: 'super_admin', status: 'active', date: '01/01/2024', totalProjects: 15 },
    { id: 4, name: 'Sophie Bernard', email: 'sophie@email.com', phone: '+243 555 503 62', role: 'admin', status: 'active', date: '20/03/2024', totalProjects: 12 },
    { id: 5, name: 'Thomas Dubois', email: 'thomas@email.com', phone: '+243 555 503 63', role: 'client', status: 'inactive', date: '05/04/2024', totalProjects: 1 },
    { id: 6, name: 'Isabelle Kabila', email: 'isabelle@email.com', phone: '+243 555 503 64', role: 'client', status: 'active', date: '10/04/2024', totalProjects: 2 },
    { id: 7, name: 'François Lumumba', email: 'francois@email.com', phone: '+243 555 503 65', role: 'manager', status: 'active', date: '15/04/2024', totalProjects: 5 },
    { id: 8, name: 'Rachel Mputu', email: 'rachel@email.com', phone: '+243 555 503 66', role: 'client', status: 'active', date: '20/04/2024', totalProjects: 1 },
  ])

  const [auditLog, setAuditLog] = useState([
    { id: 1, action: 'Modification rôle', user: 'Super Admin', target: 'Jean Dupont', targetId: 1, date: '15/04/2026 10:30' },
    { id: 2, action: 'Désactivation compte', user: 'Admin', target: 'Thomas Dubois', targetId: 5, date: '14/04/2026 14:20' },
    { id: 3, action: 'Création utilisateur', user: 'Super Admin', target: 'Sophie Bernard', targetId: 4, date: '13/04/2026 09:15' },
    { id: 4, action: 'Modification statut', user: 'Manager', target: 'Marie Martin', targetId: 2, date: '12/04/2026 16:45' },
  ])

  const getRoleBadge = (role) => {
    const badges = {
      super_admin: { label: 'Super Admin', color: 'from-purple-500 to-pink-500', text: 'text-purple-400', icon: Star },
      admin: { label: 'Admin', color: 'from-red-500 to-orange-500', text: 'text-red-400', icon: Shield },
      manager: { label: 'Manager', color: 'from-blue-500 to-cyan-500', text: 'text-blue-400', icon: User },
      client: { label: 'Client', color: 'from-emerald-500 to-teal-500', text: 'text-emerald-400', icon: Users },
      visitor: { label: 'Visiteur', color: 'from-gray-500 to-gray-600', text: 'text-gray-400', icon: Eye },
    }
    return badges[role] || badges.client
  }

  const filteredClients = clients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       c.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchRole = roleFilter === 'all' || c.role === roleFilter
    const matchStatus = statusFilter === 'all' || c.status === statusFilter
    return matchSearch && matchRole && matchStatus
  })

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSaveClient = (data) => {
    if (selectedClient) {
      setClients(clients.map(c => c.id === selectedClient.id ? { ...c, ...data } : c))
      // Ajouter au journal d'audit
      const newLog = {
        id: auditLog.length + 1,
        action: 'Modification profil',
        user: 'Admin',
        target: data.name,
        targetId: selectedClient.id,
        date: new Date().toLocaleString('fr-FR')
      }
      setAuditLog([newLog, ...auditLog])
    } else {
      const newClient = { ...data, id: clients.length + 1, date: new Date().toLocaleDateString('fr-FR'), totalProjects: 0 }
      setClients([...clients, newClient])
      // Ajouter au journal d'audit
      const newLog = {
        id: auditLog.length + 1,
        action: 'Création utilisateur',
        user: 'Admin',
        target: data.name,
        targetId: newClient.id,
        date: new Date().toLocaleString('fr-FR')
      }
      setAuditLog([newLog, ...auditLog])
    }
    setShowModal(false)
    setSelectedClient(null)
  }

  const toggleStatus = (id) => {
    const client = clients.find(c => c.id === id)
    const newStatus = client.status === 'active' ? 'inactive' : 'active'
    setClients(clients.map(c => c.id === id ? { ...c, status: newStatus } : c))
    
    // Ajouter au journal d'audit
    const newLog = {
      id: auditLog.length + 1,
      action: newStatus === 'active' ? 'Activation compte' : 'Désactivation compte',
      user: 'Admin',
      target: client.name,
      targetId: id,
      date: new Date().toLocaleString('fr-FR')
    }
    setAuditLog([newLog, ...auditLog])
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const handleSendEmail = (email) => {
    window.location.href = `mailto:${email}`
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Clients & rôles</h1>
          <p className="text-gray-400 mt-1">Gérez les utilisateurs et leurs permissions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAuditLog(!showAuditLog)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-gray-300 hover:bg-white/20 transition"
          >
            <Shield className="w-4 h-4" />
            {showAuditLog ? 'Masquer' : 'Afficher'} audit
          </button>
          <button
            onClick={() => { setSelectedClient(null); setShowModal(true) }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition"
          >
            <Plus className="w-4 h-4" /> Nouvel utilisateur
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">Tous les rôles</option>
          <option value="super_admin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="client">Client</option>
          <option value="visitor">Visiteur</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
        </select>
      </motion.div>

      {/* Clients Cards Grid - 4 per line */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
      >
        {paginatedClients.map((client, index) => {
          const roleBadge = getRoleBadge(client.role)
          const RoleIcon = roleBadge.icon
          
          return (
            <motion.div
              key={client.id}
              variants={fadeUp}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full group"
            >
              {/* Header with gradient bar */}
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                <div className="p-4 pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">{getInitials(client.name)}</span>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                          {client.name}
                        </h3>
                        <span className="text-xs text-gray-500">#{client.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-xs text-gray-400">{client.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 flex-1 flex flex-col">
                {/* Email - cliquable */}
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <button
                      onClick={() => handleSendEmail(client.email)}
                      className="text-xs text-blue-400 hover:text-blue-300 hover:underline transition-all truncate cursor-pointer"
                      title={`Envoyer un email à ${client.email}`}
                    >
                      {client.email}
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-300">{client.phone}</span>
                  </div>
                </div>

                {/* Role Badge */}
                <div className="mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${roleBadge.color} bg-opacity-20 ${roleBadge.text}`}>
                    <RoleIcon className="w-3 h-3" />
                    {roleBadge.label}
                  </span>
                </div>

                {/* Projects count */}
                <div className="mb-3 p-2 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Projets</span>
                    <span className="text-sm font-semibold text-blue-400">{client.totalProjects}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1 mt-1">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full h-1" 
                      style={{ width: `${Math.min(client.totalProjects * 10, 100)}%` }} 
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
                    client.status === 'active' 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border-red-500/30'
                  }`}>
                    {client.status === 'active' ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                    {client.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                  <button
                    onClick={() => { setSelectedClient(client); setShowModal(true) }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium hover:scale-105 transition-all"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Modifier
                  </button>
                  <button
                    onClick={() => toggleStatus(client.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl border text-xs font-medium transition-all ${
                      client.status === 'active'
                        ? 'border-amber-500/50 text-amber-400 hover:bg-amber-500/20'
                        : 'border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20'
                    }`}
                  >
                    {client.status === 'active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                    {client.status === 'active' ? 'Désactiver' : 'Activer'}
                  </button>
                </div>

                {/* Quick email button */}
                <button
                  onClick={() => handleSendEmail(client.email)}
                  className="mt-2 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs font-medium hover:bg-blue-500/20 hover:text-blue-400 transition-all"
                >
                  <Send className="w-3 h-3" />
                  Envoyer un email
                </button>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl mb-8"
        >
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white">Aucun utilisateur trouvé</h3>
          <p className="text-gray-500 mt-1">Essayez de modifier vos critères de recherche</p>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mt-8 pt-6 border-t border-white/10 mb-8"
        >
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Précédent
          </button>
          <span className="text-sm text-gray-400">Page {currentPage} sur {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
          >
            Suivant <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Audit Log */}
      {showAuditLog && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Journal d'audit
              <span className="ml-2 text-xs text-gray-500">({auditLog.length} événements)</span>
            </h2>
          </div>
          <div className="divide-y divide-white/10 max-h-96 overflow-y-auto">
            {auditLog.map((log) => (
              <div key={log.id} className="p-4 flex items-center gap-3 hover:bg-white/5 transition-colors">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">
                    <span className="font-medium text-blue-400">{log.user}</span> a {log.action} :{' '}
                    <span className="text-white">{log.target}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{log.date}</p>
                </div>
                {log.targetId && (
                  <button
                    onClick={() => {
                      const client = clients.find(c => c.id === log.targetId)
                      if (client) {
                        setSelectedClient(client)
                        setShowModal(true)
                      }
                    }}
                    className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
                  >
                    Voir
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {showModal && (
        <ClientModal
          client={selectedClient}
          onClose={() => { setShowModal(false); setSelectedClient(null) }}
          onSave={handleSaveClient}
        />
      )}
    </>
  )
}

export default AdminClients



// ==================== AdminCRM.jsx ====================
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Plus, 
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Clock,
  User,
  Building,
  DollarSign,
  Server,
  Database,
  Wifi,
  HardDrive,
  Activity,
  Zap,
  MapPin,
  Send,
  MoreHorizontal,
  X,
  AlertCircle
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

const stages = [
  { id: 'lead', name: 'Lead', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-500/10 border-blue-500/30', textColor: 'text-blue-400' },
  { id: 'contact', name: 'Contact', color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-500/10 border-amber-500/30', textColor: 'text-amber-400' },
  { id: 'proposition', name: 'Proposition', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-500/10 border-purple-500/30', textColor: 'text-purple-400' },
  { id: 'negociation', name: 'Négociation', color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-500/10 border-orange-500/30', textColor: 'text-orange-400' },
  { id: 'signe', name: 'Signé', color: 'from-emerald-500 to-teal-500', bgColor: 'bg-emerald-500/10 border-emerald-500/30', textColor: 'text-emerald-400' },
]

const initialProspectsData = {
  lead: [
    { id: 1, name: 'Société ABC', contact: 'Jean Martin', email: 'jean@abc.com', phone: '+243 555 503 59', value: '15 000€', lastContact: '10/04/2025' },
    { id: 2, name: 'Entreprise XYZ', contact: 'Marie Dubois', email: 'marie@xyz.com', phone: '+243 555 503 60', value: '25 000€', lastContact: '12/04/2025' },
    { id: 3, name: 'Startup Innov', contact: 'Thomas Bernard', email: 'thomas@innov.com', phone: '+243 555 503 61', value: '8 000€', lastContact: '14/04/2025' },
    { id: 4, name: 'Tech Solutions', contact: 'Paul Dupont', email: 'paul@tech.com', phone: '+243 555 503 69', value: '10 000€', lastContact: '13/04/2025' },
  ],
  contact: [
    { id: 5, name: 'Groupe Logistique', contact: 'Sophie Petit', email: 'sophie@logistique.com', phone: '+243 555 503 62', value: '45 000€', lastContact: '08/04/2025' },
    { id: 6, name: 'Hôtel Paradis', contact: 'Pierre Durand', email: 'pierre@paradis.com', phone: '+243 555 503 63', value: '12 000€', lastContact: '09/04/2025' },
    { id: 7, name: 'Agence Com', contact: 'Julie Martin', email: 'julie@agence.com', phone: '+243 555 503 70', value: '7 500€', lastContact: '07/04/2025' },
  ],
  proposition: [
    { id: 8, name: 'Banque Centrale', contact: 'Nicolas Lefebvre', email: 'nicolas@banque.com', phone: '+243 555 503 64', value: '120 000€', lastContact: '05/04/2025' },
    { id: 9, name: 'Université Kinshasa', contact: 'Claire Ntumba', email: 'claire@unikin.com', phone: '+243 555 503 65', value: '35 000€', lastContact: '07/04/2025' },
  ],
  negociation: [
    { id: 10, name: 'Télécom RDC', contact: 'Marc Kabongo', email: 'marc@telecom.com', phone: '+243 555 503 66', value: '250 000€', lastContact: '03/04/2025' },
    { id: 11, name: 'Ministère Éducation', contact: 'Joseph Kabila', email: 'joseph@education.gouv', phone: '+243 555 503 71', value: '75 000€', lastContact: '02/04/2025' },
  ],
  signe: [
    { id: 12, name: 'Ministère Digital', contact: 'Joseph Kabila', email: 'joseph@digital.gouv', phone: '+243 555 503 67', value: '500 000€', lastContact: '01/04/2025' },
    { id: 13, name: 'Agence Web Plus', contact: 'Lucie Mbenza', email: 'lucie@webplus.com', phone: '+243 555 503 68', value: '18 000€', lastContact: '02/04/2025' },
    { id: 14, name: 'Cabinet Conseil', contact: 'Bernard Ngoy', email: 'bernard@conseil.com', phone: '+243 555 503 72', value: '22 000€', lastContact: '30/03/2025' },
  ],
}

const recentInfrastructures = [
  { id: 1, name: 'Data Center Principal', type: 'Serveur', status: 'operational', location: 'Kinshasa', uptime: '99.99%', lastCheck: '15/04/2025 08:00', icon: Server },
  { id: 2, name: 'Cluster Kubernetes', type: 'Cloud', status: 'operational', location: 'Lubumbashi', uptime: '99.95%', lastCheck: '14/04/2025 10:30', icon: Database },
  { id: 3, name: 'Backup NAS', type: 'Stockage', status: 'warning', location: 'Kinshasa', uptime: '98.5%', lastCheck: '13/04/2025 14:20', icon: HardDrive },
  { id: 4, name: 'Réseau Fibre Optique', type: 'Réseau', status: 'operational', location: 'Goma', uptime: '99.98%', lastCheck: '12/04/2025 09:15', icon: Wifi },
  { id: 5, name: 'Firewall Principal', type: 'Sécurité', status: 'critical', location: 'Kinshasa', uptime: '97.2%', lastCheck: '11/04/2025 16:45', icon: Zap },
  { id: 6, name: 'Base de données SQL', type: 'Base de données', status: 'operational', location: 'Lubumbashi', uptime: '99.92%', lastCheck: '10/04/2025 11:00', icon: Database },
]

const recentInteractions = [
  { id: 1, prospect: 'Société ABC', action: 'Appel commercial', description: 'Discussion sur les besoins en infrastructure réseau', date: '15/04/2025 10:30', user: 'Thomas', email: 'jean@abc.com', phone: '+243 555 503 59' },
  { id: 2, prospect: 'Banque Centrale', action: 'Envoi devis', description: 'Devis pour solution cloud et cybersécurité', date: '14/04/2025 14:20', user: 'Sophie', email: 'nicolas@banque.com', phone: '+243 555 503 64' },
  { id: 3, prospect: 'Télécom RDC', action: 'Réunion', description: 'Présentation de l\'offre SaaS', date: '13/04/2025 09:15', user: 'Marc', email: 'marc@telecom.com', phone: '+243 555 503 66' },
  { id: 4, prospect: 'Groupe Logistique', action: 'Relance téléphonique', description: 'Suivi du devis envoyé la semaine dernière', date: '12/04/2025 11:00', user: 'Julie', email: 'sophie@logistique.com', phone: '+243 555 503 62' },
  { id: 5, prospect: 'Université Kinshasa', action: 'Visite technique', description: 'Audit des infrastructures existantes', date: '11/04/2025 14:30', user: 'Pierre', email: 'claire@unikin.com', phone: '+243 555 503 65' },
  { id: 6, prospect: 'Agence Web Plus', action: 'Signature contrat', description: 'Contrat signé pour le développement de la plateforme', date: '10/04/2025 16:00', user: 'Lucie', email: 'lucie@webplus.com', phone: '+243 555 503 68' },
]

const getStatusConfig = (status) => {
  const configs = {
    operational: { label: 'Opérationnel', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: Activity },
    warning: { label: 'Alerte', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', icon: AlertCircle },
    critical: { label: 'Critique', color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: AlertCircle },
  }
  return configs[status] || configs.operational
}

const getActionColor = (action) => {
  const colors = {
    'Appel commercial': 'from-blue-500 to-cyan-500',
    'Envoi devis': 'from-emerald-500 to-teal-500',
    'Réunion': 'from-purple-500 to-pink-500',
    'Relance téléphonique': 'from-amber-500 to-orange-500',
    'Visite technique': 'from-indigo-500 to-purple-500',
    'Signature contrat': 'from-emerald-500 to-green-500',
  }
  return colors[action] || 'from-gray-500 to-gray-600'
}

// ==================== MODAL NOUVEAU PROSPECT ====================
const ModalNouveauProspect = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({ name: '', contact: '', email: '', phone: '', value: '', stage: 'lead' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Champ requis'
    if (!form.contact.trim()) e.contact = 'Champ requis'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    onSave({ ...form, id: Date.now(), lastContact: new Date().toLocaleDateString('fr-FR') })
    setForm({ name: '', contact: '', email: '', phone: '', value: '', stage: 'lead' })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-white font-semibold text-lg">Nouveau prospect</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Société *</label>
              <input
                type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Société ABC"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition"
              />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Contact *</label>
              <input
                type="text" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})}
                placeholder="Jean Martin"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition"
              />
              {errors.contact && <p className="text-xs text-red-400 mt-1">{errors.contact}</p>}
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Email *</label>
            <input
              type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              placeholder="jean@societe.com"
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition"
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Téléphone</label>
              <input
                type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                placeholder="+243 555 000 000"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Valeur estimée</label>
              <input
                type="text" value={form.value} onChange={e => setForm({...form, value: e.target.value})}
                placeholder="10 000€"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Étape</label>
            <select
              value={form.stage} onChange={e => setForm({...form, stage: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500/50 transition"
            >
              {stages.map(s => <option key={s.id} value={s.id} className="bg-[#0f172a]">{s.name}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 transition text-sm">
              Annuler
            </button>
            <button type="submit" className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition text-sm font-medium">
              Enregistrer
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ==================== MODAL DÉPLACER ====================
const ModalDeplacer = ({ isOpen, onClose, prospect, currentStage, onMove }) => {
  if (!isOpen || !prospect) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-white font-semibold">Déplacer : {prospect.name}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-2">
          {stages.filter(s => s.id !== currentStage).map(stage => (
            <button
              key={stage.id}
              onClick={() => { onMove(prospect, currentStage, stage.id); onClose() }}
              className={`w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm flex items-center gap-3 ${stage.textColor}`}
            >
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stage.color}`} />
              {stage.name}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ==================== MODAL RELANCER ====================
const ModalRelancer = ({ isOpen, onClose, interaction }) => {
  const [sent, setSent] = useState(false)
  const [message, setMessage] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    // Ouvre le client mail avec le message pré-rempli
    const subject = encodeURIComponent(`Relance - ${interaction?.prospect}`)
    const body = encodeURIComponent(message || `Bonjour,\n\nJe me permets de vous recontacter suite à notre ${interaction?.action?.toLowerCase()}.\n\nCordialement`)
    window.location.href = `mailto:${interaction?.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => { setSent(false); setMessage(''); onClose() }, 1500)
  }

  if (!isOpen || !interaction) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-white font-semibold">Relancer : {interaction.prospect}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSend} className="p-5 space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Destinataire</label>
            <p className="text-sm text-white px-3 py-2 rounded-lg bg-white/5 border border-white/10">{interaction.email}</p>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Message de relance</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={`Bonjour,\n\nJe me permets de vous recontacter suite à notre ${interaction.action?.toLowerCase()}...`}
              rows={4}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 transition text-sm">
              Annuler
            </button>
            <button type="submit" className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition text-sm font-medium flex items-center justify-center gap-2">
              {sent ? '✓ Envoyé !' : <><Send className="w-3 h-3" /> Envoyer</>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ==================== MODAL DÉTAILS INFRA ====================
const ModalInfraDetails = ({ isOpen, onClose, infra }) => {
  if (!isOpen || !infra) return null
  const status = getStatusConfig(infra.status)
  const StatusIcon = status.icon
  const Icon = infra.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold">{infra.name}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Type', value: infra.type },
              { label: 'Localisation', value: infra.location },
              { label: 'Uptime', value: infra.uptime },
              { label: 'Dernière vérif.', value: infra.lastCheck },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-sm text-white font-medium">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-sm text-gray-400">Statut actuel</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${status.color}`}>
              <StatusIcon className="w-3 h-3" /> {status.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 transition text-sm"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ==================== PROSPECT CARD ====================
const ProspectCard = ({ prospect, stage, onMove }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [showMoveModal, setShowMoveModal] = useState(false)
  const stageConfig = stages.find(s => s.id === stage)

  const handleCardClick = () => setShowDetails(!showDetails)

  const handleMoveClick = (e) => {
    e.stopPropagation()
    setShowMoveModal(true)
  }

  const handleContactClick = (e) => {
    e.stopPropagation()
  }

  return (
    <>
      <motion.div
        variants={fadeUp}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-1 cursor-pointer group"
        onClick={handleCardClick}
      >
        <div className="relative">
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stageConfig.color}`} />
          <div className="p-4 pb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${stageConfig.color} flex items-center justify-center shadow-lg`}>
                  <Building className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-white text-sm">{prospect.name}</h4>
              </div>
              <span className={`text-xs font-bold ${stageConfig.textColor}`}>{prospect.value}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <User className="w-3 h-3" />
              <span>{prospect.contact}</span>
            </div>
          </div>
        </div>

        <div className="p-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <Clock className="w-3 h-3" />
            <span>Dernier contact: {prospect.lastContact}</span>
          </div>

          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 pt-3 border-t border-white/10 space-y-2"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-blue-400" />
                <a
                  href={`mailto:${prospect.email}`}
                  onClick={handleContactClick}
                  className="text-xs text-gray-400 truncate hover:text-blue-400 transition"
                >
                  {prospect.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-emerald-400" />
                <a
                  href={`tel:${prospect.phone}`}
                  onClick={handleContactClick}
                  className="text-xs text-gray-400 hover:text-emerald-400 transition"
                >
                  {prospect.phone}
                </a>
              </div>
              <div className="flex gap-2 mt-2">
                {/* ✅ Contacter → ouvre le client mail */}
                <a
                  href={`mailto:${prospect.email}`}
                  onClick={handleContactClick}
                  className="flex-1 text-xs py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition text-center"
                >
                  Contacter
                </a>
                {/* ✅ Déplacer → ouvre la modal de déplacement */}
                <button
                  onClick={handleMoveClick}
                  className="flex-1 text-xs py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition"
                >
                  Déplacer
                </button>
              </div>
            </motion.div>
          )}

          {!showDetails && (
            <div className="text-center pt-1">
              <span className="text-[10px] text-gray-500 group-hover:text-blue-400 transition">Cliquez pour plus de détails</span>
            </div>
          )}
        </div>
      </motion.div>

      <ModalDeplacer
        isOpen={showMoveModal}
        onClose={() => setShowMoveModal(false)}
        prospect={prospect}
        currentStage={stage}
        onMove={onMove}
      />
    </>
  )
}

// ==================== STAGE COLUMN ====================
const StageColumn = ({ stage, prospects, onAddProspect, onMove }) => {
  return (
    <div className="flex-shrink-0 w-80 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      <div className={`p-4 border-b border-white/10 ${stage.bgColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${stage.color} flex items-center justify-center`}>
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className={`font-semibold ${stage.textColor}`}>{stage.name}</h3>
              <p className="text-xs text-gray-500">{prospects.length} prospects</p>
            </div>
          </div>
          {/* ✅ Bouton + colonne → ouvre le formulaire avec l'étape pré-sélectionnée */}
          <button
            onClick={() => onAddProspect(stage.id)}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
      <div className="p-3 space-y-3 max-h-[600px] overflow-y-auto">
        {prospects.map((prospect) => (
          <ProspectCard key={prospect.id} prospect={prospect} stage={stage.id} onMove={onMove} />
        ))}
        {prospects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-xs text-gray-500">Aucun prospect</p>
            {/* ✅ Lien + Ajouter dans colonne vide */}
            <button
              onClick={() => onAddProspect(stage.id)}
              className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition"
            >
              + Ajouter
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ==================== INFRASTRUCTURE CARD ====================
const InfrastructureCard = ({ infra }) => {
  const [showModal, setShowModal] = useState(false)
  const status = getStatusConfig(infra.status)
  const StatusIcon = status.icon
  const Icon = infra.icon

  return (
    <>
      <motion.div
        variants={fadeUp}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-blue-500/50 transition-all hover:-translate-y-1 cursor-pointer group"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">{infra.name}</h4>
              <p className="text-xs text-gray-400">{infra.type}</p>
            </div>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full border ${status.color}`}>
            <StatusIcon className="w-3 h-3 inline mr-1" />
            {status.label}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>{infra.location}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Activity className="w-3 h-3" />
            <span>Uptime: {infra.uptime}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 col-span-2">
            <Clock className="w-3 h-3" />
            <span>Dernière vérif: {infra.lastCheck}</span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-white/10">
          {/* ✅ Voir détails → ouvre une modal avec les infos */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full text-xs py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
          >
            Voir détails
          </button>
        </div>
      </motion.div>

      <ModalInfraDetails isOpen={showModal} onClose={() => setShowModal(false)} infra={infra} />
    </>
  )
}

// ==================== INTERACTION CARD ====================
const InteractionCard = ({ interaction }) => {
  const [showRelancer, setShowRelancer] = useState(false)
  const actionColor = getActionColor(interaction.action)

  return (
    <>
      <motion.div
        variants={fadeUp}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-1 group"
      >
        <div className="relative">
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${actionColor}`} />
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${actionColor} flex items-center justify-center shadow-lg`}>
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{interaction.prospect}</h4>
                  <p className="text-xs text-gray-400">{interaction.action}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{interaction.date}</span>
            </div>

            <p className="text-xs text-gray-400 mb-3 line-clamp-2">{interaction.description}</p>

            <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{interaction.user}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-white/10">
              {/* ✅ Email → ouvre le client mail */}
              <a
                href={`mailto:${interaction.email}`}
                className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
              >
                <Mail className="w-3 h-3" /> Email
              </a>
              {/* ✅ Appeler → ouvre le téléphone */}
              <a
                href={`tel:${interaction.phone}`}
                className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition"
              >
                <Phone className="w-3 h-3" /> Appeler
              </a>
              {/* ✅ Relancer → ouvre la modal de relance */}
              <button
                onClick={() => setShowRelancer(true)}
                className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition"
              >
                <Send className="w-3 h-3" /> Relancer
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <ModalRelancer isOpen={showRelancer} onClose={() => setShowRelancer(false)} interaction={interaction} />
    </>
  )
}

// ==================== ADMIN CRM ====================
const AdminCRM = () => {
  const [prospectsData, setProspectsData] = useState(initialProspectsData)
  const [showNewProspect, setShowNewProspect] = useState(false)
  const [defaultStage, setDefaultStage] = useState('lead')

  // ✅ Ajouter un prospect
  const handleSaveProspect = (newProspect) => {
    setProspectsData(prev => ({
      ...prev,
      [newProspect.stage]: [...prev[newProspect.stage], newProspect],
    }))
  }

  // ✅ Ouvrir le formulaire avec une étape pré-sélectionnée (bouton + de colonne)
  const handleAddProspectInStage = (stageId) => {
    setDefaultStage(stageId)
    setShowNewProspect(true)
  }

  // ✅ Déplacer un prospect d'une colonne à une autre
  const handleMoveProspect = (prospect, fromStage, toStage) => {
    setProspectsData(prev => ({
      ...prev,
      [fromStage]: prev[fromStage].filter(p => p.id !== prospect.id),
      [toStage]: [...prev[toStage], prospect],
    }))
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">CRM - Pipeline commercial</h1>
          <p className="text-gray-400 mt-1">Gérez vos prospects et suivez votre pipeline</p>
        </div>
        {/* ✅ Nouveau prospect → ouvre le formulaire */}
        <button
          onClick={() => { setDefaultStage('lead'); setShowNewProspect(true) }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition"
        >
          <Plus className="w-4 h-4" /> Nouveau prospect
        </button>
      </motion.div>

      {/* Kanban Pipeline */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-5 min-w-[1000px]">
          {stages.map((stage) => (
            <StageColumn
              key={stage.id}
              stage={stage}
              prospects={prospectsData[stage.id] || []}
              onAddProspect={handleAddProspectInStage}
              onMove={handleMoveProspect}
            />
          ))}
        </div>
      </div>

      {/* Section Infrastructure récente */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-400" />
              Infrastructures récentes
            </h2>
            <p className="text-sm text-gray-400">État des serveurs, réseaux et équipements</p>
          </div>
          {/* ✅ Voir tout → scroll vers le bas de la section */}
          <button
            onClick={() => document.getElementById('section-infra')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm text-blue-400 hover:text-blue-300 transition"
          >
            Voir tout
          </button>
        </div>
        <div id="section-infra" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentInfrastructures.map((infra) => (
            <InfrastructureCard key={infra.id} infra={infra} />
          ))}
        </div>
      </motion.div>

      {/* Recent Interactions */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              Interactions récentes
            </h2>
            <p className="text-sm text-gray-400">Derniers échanges avec vos prospects</p>
          </div>
          {/* ✅ Voir tout → scroll vers la section */}
          <button
            onClick={() => document.getElementById('section-interactions')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm text-blue-400 hover:text-blue-300 transition"
          >
            Voir tout
          </button>
        </div>
        <div id="section-interactions" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentInteractions.map((interaction) => (
            <InteractionCard key={interaction.id} interaction={interaction} />
          ))}
        </div>
      </motion.div>

      {/* ✅ Modal Nouveau prospect (avec étape par défaut) */}
      <ModalNouveauProspect
        isOpen={showNewProspect}
        onClose={() => setShowNewProspect(false)}
        onSave={handleSaveProspect}
        defaultStage={defaultStage}
      />
    </>
  )
}

export default AdminCRM



import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  FileText, 
  FolderKanban,
  ArrowUp,
  ArrowDown,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Calendar,
  ChevronRight
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}

const StatCard = ({ icon: Icon, title, value, trend, trendValue, color }) => {
  const getColorClasses = () => {
    switch(color) {
      case 'blue':   return 'from-blue-500 to-cyan-500'
      case 'green':  return 'from-emerald-500 to-teal-500'
      case 'orange': return 'from-orange-500 to-amber-500'
      case 'purple': return 'from-purple-500 to-pink-500'
      default:       return 'from-blue-500 to-cyan-500'
    }
  }

  return (
    <motion.div
      variants={fadeUp}
      className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/15"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getColorClasses()} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span>{trendValue}%</span>
        </div>
      </div>
      <div className="text-2xl font-bold text-white font-syne">{value}</div>
      <div className="text-gray-400 text-sm mt-1">{title}</div>
    </motion.div>
  )
}

const AdminDashboard = () => {
  const navigate = useNavigate()

  const [stats] = useState([
    { icon: DollarSign,   title: 'Revenus',          value: '124 500€', trend: 'up',   trendValue: '15', color: 'blue'   },
    { icon: Users,        title: 'Nouveaux clients',  value: '12',       trend: 'up',   trendValue: '8',  color: 'green'  },
    { icon: FileText,     title: 'Devis ouverts',     value: '8',        trend: 'down', trendValue: '2',  color: 'orange' },
    { icon: FolderKanban, title: 'Projets en cours',  value: '5',        trend: 'up',   trendValue: '25', color: 'purple' },
  ])

  const [revenueData] = useState([
    { month: 'Jan', revenus: 8500,  maxRevenue: 20000 },
    { month: 'Fév', revenus: 9200,  maxRevenue: 20000 },
    { month: 'Mar', revenus: 10500, maxRevenue: 20000 },
    { month: 'Avr', revenus: 11200, maxRevenue: 20000 },
    { month: 'Mai', revenus: 12800, maxRevenue: 20000 },
    { month: 'Juin', revenus: 13500, maxRevenue: 20000 },
    { month: 'Juil', revenus: 14200, maxRevenue: 20000 },
    { month: 'Aoû',  revenus: 14800, maxRevenue: 20000 },
    { month: 'Sep',  revenus: 15600, maxRevenue: 20000 },
    { month: 'Oct',  revenus: 16200, maxRevenue: 20000 },
    { month: 'Nov',  revenus: 17100, maxRevenue: 20000 },
    { month: 'Déc',  revenus: 18500, maxRevenue: 20000 },
  ])

  const [recentActivities] = useState([
    { id: 1, action: 'Nouveau client inscrit',           user: 'Jean Dupont',    date: '15/04/2026 10:30', type: 'client',  link: '/admin/clients'  },
    { id: 2, action: 'Devis #DEV-012 validé',            user: 'Marie Martin',   date: '14/04/2026 14:20', type: 'devis',   link: '/admin/devis'    },
    { id: 3, action: 'Projet "Site E-commerce" terminé', user: 'Thomas Bernard', date: '13/04/2026 09:15', type: 'projet',  link: '/admin/projets'  },
    { id: 4, action: 'Ticket support #TKT-005 résolu',   user: 'Sophie Dubois',  date: '12/04/2026 16:45', type: 'ticket',  link: '/admin/crm'      },
  ])

  // ── Alertes avec lien de navigation ──────────────────────────────
  const [alerts] = useState([
    {
      id: 1,
      message: '3 devis en attente depuis plus de 7 jours',
      detail: 'Voir les devis',
      type: 'warning',
      icon: Clock,
      link: '/admin/devis',
    },
    {
      id: 2,
      message: '2 tickets support urgents non traités',
      detail: 'Voir le CRM',
      type: 'error',
      icon: AlertCircle,
      link: '/admin/crm',
    },
    {
      id: 3,
      message: 'Migration serveur planifiée le 20/04',
      detail: 'Voir les projets',
      type: 'info',
      icon: CheckCircle,
      link: '/admin/projets',
    },
  ])

  const getActivityIcon = (type) => {
    switch(type) {
      case 'client':  return <Users        className="w-4 h-4 text-emerald-400" />
      case 'devis':   return <FileText     className="w-4 h-4 text-blue-400"    />
      case 'projet':  return <FolderKanban className="w-4 h-4 text-purple-400"  />
      case 'ticket':  return <AlertCircle  className="w-4 h-4 text-orange-400"  />
      default:        return <Eye          className="w-4 h-4 text-gray-400"    />
    }
  }

  const getAlertClasses = (type) => {
    switch(type) {
      case 'warning': return {
        wrapper: 'bg-amber-500/20 border-amber-500/30 text-amber-400 hover:bg-amber-500/30',
        chevron: 'text-amber-400',
      }
      case 'error': return {
        wrapper: 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30',
        chevron: 'text-red-400',
      }
      case 'info': return {
        wrapper: 'bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30',
        chevron: 'text-blue-400',
      }
      default: return {
        wrapper: 'bg-white/10 border-white/10 text-gray-400 hover:bg-white/15',
        chevron: 'text-gray-400',
      }
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Dashboard</h1>
        <p className="text-gray-400 mt-1">Vue d'ensemble de votre activité</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        {/* Revenue Chart */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Évolution du chiffre d'affaires</h2>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>2026</span>
            </div>
          </div>

          <div className="space-y-3">
            {revenueData.slice(-6).map((item, idx) => (
              <div key={idx} className="group">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400">{item.month}</span>
                  <span className="text-white font-medium">{item.revenus.toLocaleString()}€</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.revenus / item.maxRevenue) * 100}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <span>+18% vs semestre précédent</span>
            </div>
            <span className="text-xs text-gray-500">
              Total : {revenueData.slice(-6).reduce((s, d) => s + d.revenus, 0).toLocaleString()}€
            </span>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">Activité récente</h2>
          </div>
          <div className="divide-y divide-white/10">
            {recentActivities.map((activity) => (
              <motion.div
                key={activity.id}
                onClick={() => navigate(activity.link)}
                className="p-4 flex items-start gap-3 hover:bg-white/5 transition-colors cursor-pointer group"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">par {activity.user} • {activity.date}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0 mt-0.5" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Alertes système */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            Alertes système
          </h2>
        </div>

        <div className="p-4 space-y-3">
          {alerts.map((alert) => {
            const AlertIcon = alert.icon
            const classes = getAlertClasses(alert.type)

            return (
              <motion.button
                key={alert.id}
                onClick={() => navigate(alert.link)}
                className={`w-full p-3 rounded-xl border ${classes.wrapper} flex items-center gap-3 transition-all duration-200 text-left group`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <AlertIcon className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs opacity-70 mt-0.5">{alert.detail}</p>
                </div>
                <ChevronRight className={`w-4 h-4 flex-shrink-0 ${classes.chevron} opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all`} />
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </>
  )
}

export default AdminDashboard


// ==================== AdminDevis.jsx ====================
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Search, 
  Plus, 
  Download,
  Mail,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Loader,
  User,
  Calendar,
  Euro,
  Send,
  Trash2,
  RefreshCw,
  AlertCircle,
  X
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

// Modal pour les détails du devis
const DevisDetailModal = ({ devis, onClose, onUpdateStatus }) => {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const handleSendEmail = () => {
    setSending(true)
    setTimeout(() => {
      alert(`Email envoyé à ${devis.email} avec succès !`)
      setSending(false)
    }, 1000)
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Détail du devis</h2>
              <p className="text-sm text-gray-400">{devis.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Informations client */}
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Informations client</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Nom</p>
                <p className="text-white font-medium">{devis.client}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-blue-400">{devis.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Date de demande</p>
                <p className="text-white">{devis.date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Service</p>
                <p className="text-white">{devis.service}</p>
              </div>
            </div>
          </div>

          {/* Détails du devis */}
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Détails du devis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-gray-400">Montant HT</span>
                <span className="text-white">{parseInt(devis.amount) * 0.8}€</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-gray-400">TVA (20%)</span>
                <span className="text-white">{parseInt(devis.amount) * 0.2}€</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-400 font-semibold">Total TTC</span>
                <span className="text-xl font-bold text-emerald-400">{devis.amount}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Description</h3>
            <p className="text-gray-300 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => onUpdateStatus(devis.id, 'valide')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition"
            >
              <CheckCircle className="w-4 h-4" />
              Valider
            </button>
            <button
              onClick={() => onUpdateStatus(devis.id, 'refuse')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition"
            >
              <XCircle className="w-4 h-4" />
              Refuser
            </button>
          </div>

          {/* Envoi email */}
          <div className="border-t border-white/10 pt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Message optionnel</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="3"
              placeholder="Ajoutez un message personnalisé..."
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSendEmail}
              disabled={sending}
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition disabled:opacity-50"
            >
              {sending ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Envoyer l'email
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const AdminDevis = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDevis, setSelectedDevis] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [auditLog, setAuditLog] = useState([])
  const itemsPerPage = 12

  const [devis, setDevis] = useState([
    { id: 'DEV-001', client: 'Jean Dupont', service: 'Développement Digital', amount: '5 000€', status: 'valide', date: '15/04/2026', email: 'jean@email.com' },
    { id: 'DEV-002', client: 'Marie Martin', service: 'Réseau & Infrastructure', amount: '3 200€', status: 'attente', date: '10/04/2026', email: 'marie@email.com' },
    { id: 'DEV-003', client: 'Sophie Bernard', service: 'Sécurité', amount: '2 800€', status: 'refuse', date: '05/04/2026', email: 'sophie@email.com' },
    { id: 'DEV-004', client: 'Thomas Dubois', service: 'Cloud & Hébergement', amount: '4 500€', status: 'encours', date: '01/04/2026', email: 'thomas@email.com' },
    { id: 'DEV-005', client: 'Julie Petit', service: 'Formation IT', amount: '1 200€', status: 'valide', date: '28/03/2026', email: 'julie@email.com' },
    { id: 'DEV-006', client: 'Marc Kabongo', service: 'Énergie & Équipements', amount: '7 800€', status: 'attente', date: '20/03/2026', email: 'marc@email.com' },
    { id: 'DEV-007', client: 'Claire Ntumba', service: 'Développement Digital', amount: '12 000€', status: 'valide', date: '15/03/2026', email: 'claire@email.com' },
    { id: 'DEV-008', client: 'Pierre Durand', service: 'Cybersécurité', amount: '9 500€', status: 'refuse', date: '10/03/2026', email: 'pierre@email.com' },
    { id: 'DEV-009', client: 'Isabelle Kabila', service: 'Migration Cloud', amount: '6 800€', status: 'encours', date: '05/03/2026', email: 'isabelle@email.com' },
    { id: 'DEV-010', client: 'François Lumumba', service: 'Data Center', amount: '15 000€', status: 'attente', date: '01/03/2026', email: 'francois@email.com' },
    { id: 'DEV-011', client: 'Rachel Mputu', service: 'Support Technique', amount: '2 500€', status: 'valide', date: '25/02/2026', email: 'rachel@email.com' },
    { id: 'DEV-012', client: 'Daniel Tshibangu', service: 'Audit Sécurité', amount: '4 200€', status: 'valide', date: '20/02/2026', email: 'daniel@email.com' },
  ])

  const getStatusBadge = (status) => {
    const badges = {
      attente: { label: 'En attente', icon: Clock, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
      encours: { label: 'En cours', icon: Loader, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      valide: { label: 'Validé', icon: CheckCircle, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
      refuse: { label: 'Refusé', icon: XCircle, color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    }
    return badges[status] || badges.attente
  }

  const updateDevisStatus = (id, newStatus) => {
    const devisItem = devis.find(d => d.id === id)
    const oldStatus = devisItem.status
    
    setDevis(devis.map(d => 
      d.id === id ? { ...d, status: newStatus } : d
    ))
    
    // Ajouter au journal d'audit
    const newLog = {
      id: auditLog.length + 1,
      action: `Changement de statut: ${getStatusBadge(oldStatus).label} → ${getStatusBadge(newStatus).label}`,
      user: 'Admin',
      target: devisItem.client,
      targetId: id,
      date: new Date().toLocaleString('fr-FR')
    }
    setAuditLog([newLog, ...auditLog])
    
    setSuccessMessage(`Devis ${id} ${getStatusBadge(newStatus).label.toLowerCase()} avec succès !`)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleSendEmail = (email, clientName) => {
    window.location.href = `mailto:${email}?subject=Devis OMDEVE Services&body=Bonjour ${clientName},%0D%0A%0D%0AVeuillez trouver ci-joint votre devis.%0D%0A%0D%0ACordialement,%0D%0AL\'équipe OMDEVE`
  }

  const handleDownloadPDF = (devisId, clientName) => {
    setSuccessMessage(`Téléchargement du devis ${devisId} pour ${clientName}...`)
    setTimeout(() => setSuccessMessage(''), 2000)
    // Simulation de téléchargement
    alert(`Téléchargement du PDF pour le devis ${devisId}`)
  }

  const filteredDevis = devis.filter(d => {
    const matchSearch = d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       d.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === 'all' || d.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalPages = Math.ceil(filteredDevis.length / itemsPerPage)
  const paginatedDevis = filteredDevis.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleViewDetails = (devisItem) => {
    setSelectedDevis(devisItem)
    setShowDetailModal(true)
  }

  const handleExportAll = (type) => {
    setSuccessMessage(`Export ${type} de ${filteredDevis.length} devis...`)
    setTimeout(() => setSuccessMessage(''), 2000)
    alert(`Export ${type} de ${filteredDevis.length} devis`)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Gestion des devis</h1>
          <p className="text-gray-400 mt-1">Consultez, gérez et exportez tous les devis</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition">
          <Plus className="w-4 h-4" /> Nouveau devis
        </button>
      </motion.div>

      {/* Message de succès */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-emerald-500/90 text-white px-4 py-2 rounded-xl shadow-lg text-sm"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher par numéro ou client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">Tous les statuts</option>
          <option value="attente">En attente</option>
          <option value="encours">En cours</option>
          <option value="valide">Validé</option>
          <option value="refuse">Refusé</option>
        </select>
      </motion.div>

      {/* Devis Cards Grid - 4 per line */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {paginatedDevis.map((devisItem, index) => {
          const status = getStatusBadge(devisItem.status)
          const StatusIcon = status.icon
          
          return (
            <motion.div
              key={devisItem.id}
              variants={fadeUp}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full group"
            >
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                <div className="p-4 pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs text-gray-500 font-mono">{devisItem.id}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-xs text-gray-400">{devisItem.date}</span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1 line-clamp-1 group-hover:text-blue-300 transition-colors">
                    {devisItem.service}
                  </h3>
                </div>
              </div>

              <div className="p-4 pt-0 flex-1 flex flex-col">
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-sm text-gray-300">{devisItem.client}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-400">Montant</span>
                    <span className="text-sm font-semibold text-emerald-400">{devisItem.amount}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full h-1" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className="mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                </div>

                {/* Boutons d'action */}
                {devisItem.status === 'attente' && (
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => updateDevisStatus(devisItem.id, 'encours')}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-medium hover:bg-blue-500/30 transition"
                    >
                      <Loader className="w-3 h-3" />
                      Examiner
                    </button>
                  </div>
                )}

                {devisItem.status === 'encours' && (
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => updateDevisStatus(devisItem.id, 'valide')}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/30 transition"
                    >
                      <CheckCircle className="w-3 h-3" />
                      Accepter
                    </button>
                    <button
                      onClick={() => updateDevisStatus(devisItem.id, 'refuse')}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30 transition"
                    >
                      <XCircle className="w-3 h-3" />
                      Refuser
                    </button>
                  </div>
                )}

                <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                  <button
                    onClick={() => handleViewDetails(devisItem)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium hover:scale-105 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Détails
                  </button>
                  <button
                    onClick={() => handleDownloadPDF(devisItem.id, devisItem.client)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    PDF
                  </button>
                </div>

                <button
                  onClick={() => handleSendEmail(devisItem.email, devisItem.client)}
                  className="mt-2 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs font-medium hover:bg-amber-500/20 hover:text-amber-400 transition-all"
                >
                  <Mail className="w-3 h-3" />
                  Envoyer par email
                </button>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Empty State */}
      {filteredDevis.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
        >
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white">Aucun devis trouvé</h3>
          <p className="text-gray-500 mt-1">Essayez de modifier vos critères de recherche</p>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10"
        >
          <div className="flex gap-2">
            <button
              onClick={() => handleExportAll('PDF')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 transition"
            >
              <Download className="w-4 h-4" /> Export PDF
            </button>
            <button
              onClick={() => handleExportAll('Excel')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 transition"
            >
              <Download className="w-4 h-4" /> Export Excel
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Précédent
            </button>
            <span className="text-sm text-gray-400">Page {currentPage} sur {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              Suivant <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Modal Détails */}
      <AnimatePresence>
        {showDetailModal && selectedDevis && (
          <DevisDetailModal
            devis={selectedDevis}
            onClose={() => setShowDetailModal(false)}
            onUpdateStatus={updateDevisStatus}
          />
        )}
      </AnimatePresence>

      {/* Audit Log Summary */}
      {auditLog.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-4 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-400" />
              Dernières actions
            </h3>
          </div>
          <div className="p-4 space-y-2 max-h-48 overflow-y-auto">
            {auditLog.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center gap-3 text-sm">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span className="text-gray-400">{log.date}</span>
                <span className="text-gray-300">{log.action}</span>
                <span className="text-blue-400">- {log.target}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}

export default AdminDevis





// ==================== AdminLayout.jsx ====================
import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  FolderKanban, 
  FileText, 
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  BookOpen
} from 'lucide-react'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    overflow-x: hidden;
  }
`

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/clients',   icon: Users,           label: 'Clients & rôles' },
    { path: '/admin/crm',       icon: TrendingUp,      label: 'CRM - Pipeline' },
    { path: '/admin/projets',   icon: FolderKanban,    label: 'Projets & tickets' },
    { path: '/admin/devis',     icon: FileText,        label: 'Gestion devis' },
    { path: '/admin/blog',      icon: BookOpen,        label: 'Blog & configuration' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <style>{globalStyles}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">

        {/* Header */}
        <header className="bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-white hover:text-blue-400 transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AD</span>
                </div>
                <span className="font-syne font-bold text-white hidden sm:block">OMDEVE Admin</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">Administrateur</p>
                  <p className="text-xs text-gray-400">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">AD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <aside className={`fixed top-0 left-0 h-full w-64 bg-white/10 backdrop-blur-md border-r border-white/10 z-40 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">AD</span>
              </div>
              <span className="font-syne font-bold text-white">OMDEVE Admin</span>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive(item.path)
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive(item.path) && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
              <button
                onClick={() => window.location.href = '/login'}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Déconnexion</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-35 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <div className="lg:ml-64">
          <main className="p-6 md:p-8">
            <Outlet />
          </main>
        </div>

      </div>
    </>
  )
}

export default AdminLayout


// ==================== AdminProjets.jsx ====================
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  FolderKanban, 
  Plus, 
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle,
  User,
  Calendar,
  Flag,
  X,
  Send,
  Eye,
  UserCheck
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

const projectStages = [
  { id: 'todo',     name: 'À faire',  color: 'from-gray-500 to-gray-600',    bgColor: 'bg-gray-500/10 border-gray-500/30',    textColor: 'text-gray-400'   },
  { id: 'progress', name: 'En cours', color: 'from-blue-500 to-cyan-500',     bgColor: 'bg-blue-500/10 border-blue-500/30',    textColor: 'text-blue-400'   },
  { id: 'review',   name: 'Review',   color: 'from-purple-500 to-pink-500',   bgColor: 'bg-purple-500/10 border-purple-500/30', textColor: 'text-purple-400' },
  { id: 'done',     name: 'Terminé',  color: 'from-emerald-500 to-teal-500',  bgColor: 'bg-emerald-500/10 border-emerald-500/30', textColor: 'text-emerald-400' },
]

const initialProjectsData = {
  todo: [
    { id: 1, name: 'Site E-commerce v2', client: 'ABC Corp',        deadline: '30/06/2025', priority: 'haute',   assignee: 'Thomas' },
    { id: 2, name: 'Migration Cloud',    client: 'Banque Centrale', deadline: '15/07/2025', priority: 'normale', assignee: 'Sophie' },
  ],
  progress: [
    { id: 3, name: 'Installation Réseau', client: 'Hôtel Paradis',    deadline: '20/05/2025', progress: 75, priority: 'haute',   assignee: 'Marc'   },
    { id: 4, name: 'ERP sur mesure',      client: 'Groupe Logistique', deadline: '30/08/2025', progress: 40, priority: 'normale', assignee: 'Julie'  },
    { id: 5, name: 'Cybersécurité Audit', client: 'Ministère',        deadline: '10/06/2025', progress: 60, priority: 'urgente', assignee: 'Pierre' },
  ],
  review: [
    { id: 6, name: 'Application Mobile', client: 'Startup Innov', deadline: '25/04/2025', progress: 95, priority: 'normale', assignee: 'Thomas' },
  ],
  done: [
    { id: 7, name: 'Site Vitrine', client: 'Agence Web Plus', deadline: '10/03/2025', priority: 'basse',   assignee: 'Sophie' },
    { id: 8, name: 'Formation IT',  client: 'Université',      deadline: '05/03/2025', priority: 'normale', assignee: 'Julie'  },
  ],
}

const initialTickets = [
  { id: 'TKT-001', subject: 'Problème connexion VPN', priority: 'haute',   status: 'open',        date: '14/04/2025', assignee: 'Thomas' },
  { id: 'TKT-002', subject: 'Lenteur application',    priority: 'normale', status: 'in_progress', date: '13/04/2025', assignee: 'Sophie' },
  { id: 'TKT-003', subject: 'Bug paiement en ligne',  priority: 'urgente', status: 'open',        date: '15/04/2025', assignee: 'Marc'   },
  { id: 'TKT-004', subject: 'Demande modification',   priority: 'basse',   status: 'resolved',    date: '10/04/2025', assignee: 'Julie'  },
]

// Responsables de base (s'enrichit avec les clients ajoutés)
const defaultMembers = ['Thomas', 'Sophie', 'Marc', 'Julie', 'Pierre']

const getPriorityBadge = (priority) => {
  const badges = {
    basse:   { label: 'Basse',   color: 'bg-gray-500/20 text-gray-400 border-gray-500/30'       },
    normale: { label: 'Normale', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'       },
    haute:   { label: 'Haute',   color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    urgente: { label: 'Urgente', color: 'bg-red-500/20 text-red-400 border-red-500/30'          },
  }
  return badges[priority] || badges.normale
}

const getStatusBadge = (status) => {
  const badges = {
    open:        { label: 'Ouvert',   color: 'bg-red-500/20 text-red-400 border-red-500/30'             },
    in_progress: { label: 'En cours', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'          },
    resolved:    { label: 'Résolu',   color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    closed:      { label: 'Fermé',    color: 'bg-gray-500/20 text-gray-400 border-gray-500/30'          },
  }
  return badges[status] || badges.open
}

// ==================== CHAMP RESPONSABLE RÉUTILISABLE ====================
// Input libre + suggestions (datalist) issues des clients + membres connus
const AssigneeInput = ({ value, onChange, suggestions, label = 'Responsable', placeholder = 'Nom du responsable' }) => {
  const listId = `assignee-list-${label.replace(/\s/g, '-')}`
  return (
    <div>
      <label className="text-xs text-gray-400 mb-1 block">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        list={listId}
        autoComplete="off"
        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition"
      />
      {/* datalist : suggestions natives du navigateur, saisie libre possible */}
      <datalist id={listId}>
        {suggestions.map((s, i) => <option key={i} value={s} />)}
      </datalist>
    </div>
  )
}

// ==================== MODAL NOUVEAU PROJET ====================
const ModalNouveauProjet = ({ isOpen, onClose, onSave, defaultStage = 'todo', suggestions }) => {
  const [form, setForm]     = useState({ name: '', client: '', deadline: '', priority: 'normale', assignee: '', stage: defaultStage, progress: 0 })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim())     e.name     = 'Champ requis'
    if (!form.client.trim())   e.client   = 'Champ requis'
    if (!form.deadline)        e.deadline = 'Date requise'
    if (!form.assignee.trim()) e.assignee = 'Champ requis'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    onSave({ ...form, id: Date.now(), progress: Number(form.progress) })
    setForm({ name: '', client: '', deadline: '', priority: 'normale', assignee: '', stage: defaultStage, progress: 0 })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-white font-semibold text-lg">Nouveau projet</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Nom du projet *</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Site E-commerce"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition" />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Client *</label>
              <input type="text" value={form.client} onChange={e => setForm({...form, client: e.target.value})} placeholder="ABC Corp"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition" />
              {errors.client && <p className="text-xs text-red-400 mt-1">{errors.client}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Échéance *</label>
              <input type="date" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500/50 transition" />
              {errors.deadline && <p className="text-xs text-red-400 mt-1">{errors.deadline}</p>}
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Progression (%)</label>
              <input type="number" min="0" max="100" value={form.progress} onChange={e => setForm({...form, progress: e.target.value})}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500/50 transition" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Priorité</label>
              <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500/50 transition">
                {['basse','normale','haute','urgente'].map(p => <option key={p} value={p} className="bg-[#0f172a] capitalize">{p.charAt(0).toUpperCase()+p.slice(1)}</option>)}
              </select>
            </div>
            {/* ✅ Responsable : saisie libre + suggestions clients/membres */}
            <div>
              <AssigneeInput
                label="Responsable *"
                value={form.assignee}
                onChange={v => setForm({...form, assignee: v})}
                suggestions={suggestions}
                placeholder="Choisir ou saisir..."
              />
              {errors.assignee && <p className="text-xs text-red-400 mt-1">{errors.assignee}</p>}
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Étape initiale</label>
            <select value={form.stage} onChange={e => setForm({...form, stage: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500/50 transition">
              {projectStages.map(s => <option key={s.id} value={s.id} className="bg-[#0f172a]">{s.name}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 transition text-sm">Annuler</button>
            <button type="submit" className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition text-sm font-medium">Enregistrer</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ==================== MODAL DÉTAILS PROJET ====================
const ModalProjetDetails = ({ isOpen, onClose, project, stage }) => {
  if (!isOpen || !project) return null
  const stageConfig = projectStages.find(s => s.id === stage)
  const priority = getPriorityBadge(project.priority)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-white font-semibold">{project.name}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Client',      value: project.client   },
              { label: 'Responsable', value: project.assignee },
              { label: 'Échéance',    value: project.deadline },
              { label: 'Progression', value: `${project.progress || 0}%` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-sm text-white font-medium">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-xs text-gray-500 mb-1">Priorité</p>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${priority.color}`}>{priority.label}</span>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-xs text-gray-500 mb-1">Étape</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${stageConfig?.textColor}`}>{stageConfig?.name}</span>
            </div>
          </div>
          {(project.progress > 0) && (
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-xs text-gray-500 mb-2">Avancement</p>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full h-2 transition-all" style={{ width: `${project.progress}%` }} />
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">{project.progress}%</p>
            </div>
          )}
          <button onClick={onClose} className="w-full py-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 transition text-sm">Fermer</button>
        </div>
      </motion.div>
    </div>
  )
}

// ==================== MODAL TRAITER TICKET ====================
const ModalTraiterTicket = ({ isOpen, onClose, ticket, onUpdate, suggestions }) => {
  const [newStatus,   setNewStatus]   = useState(ticket?.status   || 'open')
  const [newAssignee, setNewAssignee] = useState(ticket?.assignee || '')
  const [note, setNote] = useState('')

  // Sync when ticket changes
  useState(() => {
    if (ticket) {
      setNewStatus(ticket.status)
      setNewAssignee(ticket.assignee)
    }
  }, [ticket])

  if (!isOpen || !ticket) return null

  const handleSave = () => {
    onUpdate(ticket.id, { status: newStatus, assignee: newAssignee || ticket.assignee })
    setNote('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <h3 className="text-white font-semibold">Traiter : {ticket.id}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{ticket.subject}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Changer le statut</label>
              <select value={newStatus} onChange={e => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500/50 transition">
                <option value="open"        className="bg-[#0f172a]">Ouvert</option>
                <option value="in_progress" className="bg-[#0f172a]">En cours</option>
                <option value="resolved"    className="bg-[#0f172a]">Résolu</option>
                <option value="closed"      className="bg-[#0f172a]">Fermé</option>
              </select>
            </div>
            {/* ✅ Réassigner : saisie libre + suggestions clients/membres */}
            <AssigneeInput
              label="Réassigner à"
              value={newAssignee}
              onChange={setNewAssignee}
              suggestions={suggestions}
              placeholder="Choisir ou saisir..."
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Note de traitement</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
              placeholder="Décrivez les actions effectuées..."
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition resize-none" />
          </div>
          <div className="flex gap-3">
            <button onClick={onClose}  className="flex-1 py-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 transition text-sm">Annuler</button>
            <button onClick={handleSave} className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition text-sm font-medium">Enregistrer</button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ==================== MODAL NOUVEAU TICKET ====================
const ModalNouveauTicket = ({ isOpen, onClose, onSave, suggestions }) => {
  const [form, setForm]     = useState({ subject: '', priority: 'normale', assignee: '' })
  const [errors, setErrors] = useState({})

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = {}
    if (!form.subject.trim())  e.subject  = 'Champ requis'
    if (!form.assignee.trim()) e.assignee = 'Champ requis'
    if (Object.keys(e).length > 0) { setErrors(e); return }
    const today = new Date()
    onSave({
      ...form,
      id:     `TKT-${String(Date.now()).slice(-3)}`,
      status: 'open',
      date:   today.toLocaleDateString('fr-FR'),
    })
    setForm({ subject: '', priority: 'normale', assignee: '' })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-white font-semibold">Nouveau ticket</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Sujet *</label>
            <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Problème connexion..."
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition" />
            {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Priorité</label>
              <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500/50 transition">
                {['basse','normale','haute','urgente'].map(p => <option key={p} value={p} className="bg-[#0f172a] capitalize">{p.charAt(0).toUpperCase()+p.slice(1)}</option>)}
              </select>
            </div>
            {/* ✅ Assigné : saisie libre + suggestions */}
            <div>
              <AssigneeInput
                label="Assigné à *"
                value={form.assignee}
                onChange={v => setForm({...form, assignee: v})}
                suggestions={suggestions}
                placeholder="Choisir ou saisir..."
              />
              {errors.assignee && <p className="text-xs text-red-400 mt-1">{errors.assignee}</p>}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 transition text-sm">Annuler</button>
            <button type="submit" className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition text-sm font-medium">Créer</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ==================== PROJECT CARD ====================
const ProjectCard = ({ project, stage, onView }) => {
  const stageConfig = projectStages.find(s => s.id === stage)

  return (
    <div
      className={`p-3 rounded-xl border ${stageConfig.bgColor} hover:scale-105 transition-all cursor-pointer`}
      onClick={() => onView(project, stage)}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-white text-sm">{project.name}</h4>
        {project.priority && (
          <span className={`text-xs px-1.5 py-0.5 rounded border ${getPriorityBadge(project.priority).color}`}>
            {getPriorityBadge(project.priority).label}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-400 mb-2">{project.client}</p>
      {project.progress > 0 && (
        <div className="mb-2">
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full h-1.5" style={{ width: `${project.progress}%` }} />
          </div>
          <p className="text-xs text-gray-500 mt-1">{project.progress}%</p>
        </div>
      )}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Calendar className="w-3 h-3" />
        <span>{project.deadline}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
        <User className="w-3 h-3" />
        <span>{project.assignee}</span>
      </div>
    </div>
  )
}

// ==================== ADMIN PROJETS ====================
const AdminProjets = () => {
  const [view,          setView]          = useState('kanban')
  const [projectsData,  setProjectsData]  = useState(initialProjectsData)
  const [tickets,       setTickets]       = useState(initialTickets)

  // Modals
  const [showNewProjet,   setShowNewProjet]   = useState(false)
  const [showNewTicket,   setShowNewTicket]   = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedStage,   setSelectedStage]   = useState(null)
  const [selectedTicket,  setSelectedTicket]  = useState(null)
  const [defaultStage,    setDefaultStage]    = useState('todo')

  // ✅ Liste dynamique de suggestions = membres par défaut + tous les clients existants (dédoublonnés)
  const suggestions = useMemo(() => {
    const clientNames = projectStages
      .flatMap(s => projectsData[s.id] || [])
      .map(p => p.client)
    const assigneeNames = [
      ...projectStages.flatMap(s => projectsData[s.id] || []).map(p => p.assignee),
      ...tickets.map(t => t.assignee),
    ]
    return [...new Set([...defaultMembers, ...assigneeNames, ...clientNames])].sort()
  }, [projectsData, tickets])

  const handleSaveProjet = (newProject) => {
    setProjectsData(prev => ({
      ...prev,
      [newProject.stage]: [...prev[newProject.stage], newProject],
    }))
  }

  const handleAddInStage = (stageId) => {
    setDefaultStage(stageId)
    setShowNewProjet(true)
  }

  const handleViewProject = (project, stage) => {
    setSelectedProject(project)
    setSelectedStage(stage)
  }

  const handleUpdateTicket = (ticketId, changes) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, ...changes } : t))
  }

  const handleSaveTicket = (newTicket) => {
    setTickets(prev => [...prev, newTicket])
  }

  const allProjects = projectStages.flatMap(s => (projectsData[s.id] || []).map(p => ({ ...p, stageId: s.id })))

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Projets & tickets</h1>
          <p className="text-gray-400 mt-1">Gérez vos projets et le support client</p>
        </div>
        <div className="flex gap-3">
          <div className="flex rounded-xl bg-white/10 p-1">
            <button onClick={() => setView('kanban')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'kanban' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              Kanban
            </button>
            <button onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              Liste
            </button>
          </div>
          <button
            onClick={() => { setDefaultStage('todo'); setShowNewProjet(true) }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition"
          >
            <Plus className="w-4 h-4" /> Nouveau projet
          </button>
        </div>
      </motion.div>

      {/* ===== VUE KANBAN ===== */}
      {view === 'kanban' ? (
        <div className="overflow-x-auto pb-4 mb-8">
          <div className="flex gap-4 min-w-[1000px]">
            {projectStages.map((stage) => (
              <motion.div key={stage.id} variants={fadeUp} initial="hidden" animate="visible" className="flex-1 min-w-[240px]">
                <div className={`p-3 rounded-xl mb-3 border ${stage.bgColor}`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${stage.textColor}`}>{stage.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{projectsData[stage.id]?.length || 0}</span>
                      <button onClick={() => handleAddInStage(stage.id)} className="p-0.5 rounded bg-white/10 hover:bg-white/20 transition">
                        <Plus className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {projectsData[stage.id]?.map((project) => (
                    <ProjectCard key={project.id} project={project} stage={stage.id} onView={handleViewProject} />
                  ))}
                  {projectsData[stage.id]?.length === 0 && (
                    <div className="text-center py-6">
                      <p className="text-xs text-gray-500">Aucun projet</p>
                      <button onClick={() => handleAddInStage(stage.id)} className="mt-1 text-xs text-blue-400 hover:text-blue-300 transition">+ Ajouter</button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* ===== VUE LISTE ===== */
        <motion.div variants={fadeUp} initial="hidden" animate="visible"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-8"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr className="text-left">
                  {['Projet','Client','Statut','Progression','Échéance','Responsable','Actions'].map(h => (
                    <th key={h} className="px-6 py-4 text-sm font-semibold text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {allProjects.map((project) => {
                  const stage = projectStages.find(s => s.id === project.stageId)
                  return (
                    <tr key={project.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{project.name}</td>
                      <td className="px-6 py-4 text-gray-300">{project.client}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full border ${stage?.bgColor} ${stage?.textColor}`}>{stage?.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-white/10 rounded-full h-1.5">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full h-1.5" style={{ width: `${project.progress || 0}%` }} />
                          </div>
                          <span className="text-xs text-gray-400">{project.progress || 0}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{project.deadline}</td>
                      <td className="px-6 py-4 text-gray-400">{project.assignee}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewProject(project, project.stageId)}
                          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition"
                        >
                          <Eye className="w-3 h-3" /> Voir
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ===== TICKETS SUPPORT ===== */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible"
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Flag className="w-5 h-5 text-blue-400" />
            Tickets support
          </h2>
          <button
            onClick={() => setShowNewTicket(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs hover:scale-105 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Nouveau ticket
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr className="text-left">
                {['ID','Sujet','Priorité','Statut','Date','Assigné','Actions'].map(h => (
                  <th key={h} className="px-6 py-4 text-sm font-semibold text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {tickets.map((ticket) => {
                const priority = getPriorityBadge(ticket.priority)
                const status   = getStatusBadge(ticket.status)
                return (
                  <tr key={ticket.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{ticket.id}</td>
                    <td className="px-6 py-4 text-gray-300">{ticket.subject}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full border ${priority.color}`}>{priority.label}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full border ${status.color}`}>{status.label}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{ticket.date}</td>
                    <td className="px-6 py-4 text-gray-400">{ticket.assignee}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="text-xs text-blue-400 hover:text-blue-300 transition"
                      >
                        Traiter
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ===== MODALS ===== */}
      <ModalNouveauProjet
        isOpen={showNewProjet}
        onClose={() => setShowNewProjet(false)}
        onSave={handleSaveProjet}
        defaultStage={defaultStage}
        suggestions={suggestions}
      />
      <ModalProjetDetails
        isOpen={!!selectedProject}
        onClose={() => { setSelectedProject(null); setSelectedStage(null) }}
        project={selectedProject}
        stage={selectedStage}
      />
      <ModalTraiterTicket
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        ticket={selectedTicket}
        onUpdate={handleUpdateTicket}
        suggestions={suggestions}
      />
      <ModalNouveauTicket
        isOpen={showNewTicket}
        onClose={() => setShowNewTicket(false)}
        onSave={handleSaveTicket}
        suggestions={suggestions}
      />
    </>
  )
}

export default AdminProjets



import { Navigate } from 'react-router-dom'

/**
 * Protège une route selon le token et le rôle attendu.
 *
 * Usage dans App.jsx :
 *   <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
 *   <Route path="/client/dashboard" element={<ProtectedRoute role="client"><ClientDashboard /></ProtectedRoute>} />
 *
 * @param {string} role - 'admin' | 'client' | undefined (juste connecté)
 */
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('accessToken')
  const userRole = localStorage.getItem('userRole')

  // Pas connecté → login
  if (!token) return <Navigate to="/login" replace />

  // Vérifie le rôle si précisé
  if (role === 'admin' && userRole !== 'super_admin' && userRole !== 'admin') {
    return <Navigate to="/client/dashboard" replace />
  }

  if (role === 'client' && (userRole === 'super_admin' || userRole === 'admin')) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return children
}

export default ProtectedRoute