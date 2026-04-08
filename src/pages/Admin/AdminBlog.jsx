// src/pages/Admin/AdminBlog.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Package, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save,
  Globe,
  Share2,
  DollarSign
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

const AdminBlog = () => {
  const [activeTab, setActiveTab] = useState('blog')
  const [successMessage, setSuccessMessage] = useState('')

  // ==================== BLOG STATE ====================
  const [articles, setArticles] = useState([
    { 
      id: 1, 
      title: 'Comment sécuriser son réseau d\'entreprise', 
      slug: 'securiser-reseau-entreprise',
      metaDesc: 'Découvrez les bonnes pratiques pour protéger votre infrastructure réseau contre les cyberattaques.',
      category: 'Sécurité',
      status: 'published',
      date: '15/04/2026',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop'
    },
    { 
      id: 2, 
      title: 'Les avantages du cloud pour les PME', 
      slug: 'avantages-cloud-pme',
      metaDesc: 'Pourquoi migrer vers le cloud ? Économies, flexibilité et sécurité.',
      category: 'Cloud',
      status: 'draft',
      date: '10/04/2026',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop'
    },
  ])

  const [editingArticle, setEditingArticle] = useState(null)
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [articleForm, setArticleForm] = useState({
    title: '', slug: '', metaDesc: '', category: '', content: '', status: 'draft', image: ''
  })

  // ==================== CATALOGUE STATE ====================
  const [services, setServices] = useState([
    { id: 1, name: 'Réseau & Infrastructure', price: 'Sur devis', order: 1, active: true, description: 'Installation et maintenance de réseaux informatiques' },
    { id: 2, name: 'Sécurité & Cybersécurité', price: 'Sur devis', order: 2, active: true, description: 'Protection des données et cybersécurité' },
    { id: 3, name: 'Développement Digital', price: 'Sur devis', order: 3, active: true, description: 'Sites web, applications, ERP' },
    { id: 4, name: 'Cloud & Hébergement', price: 'Sur devis', order: 4, active: true, description: 'Solutions cloud et hébergement' },
    { id: 5, name: 'Énergie & Équipements', price: 'Sur devis', order: 5, active: true, description: 'Panneaux solaires, climatisation' },
    { id: 6, name: 'Formation IT', price: 'Sur devis', order: 6, active: true, description: 'Formations certifiantes' },
  ])

  // ==================== CONFIGURATION STATE ====================
  const [config, setConfig] = useState({
    siteName: 'OMDEVE Services',
    siteEmail: 'contact@omdeve.com',
    sitePhone: '+243 555 503 59',
    siteAddress: 'Avenue Kabmabre n°75, Lingwala, Kinshasa',
    facebook: 'https://facebook.com/omdeve',
    linkedin: 'https://linkedin.com/company/omdeve',
    twitter: 'https://twitter.com/omdeve',
    seoTitle: 'OMDEVE - Solutions IT, Énergie & Digital en RDC',
    seoDesc: 'Leader en solutions informatiques, énergétiques et digitales en République Démocratique du Congo',
    vatRate: '16',
    currency: 'EUR'
  })

  const showMessage = (msg) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  // ==================== BLOG FUNCTIONS ====================
  const handleSaveArticle = () => {
    if (editingArticle) {
      setArticles(articles.map(a => a.id === editingArticle.id ? { ...articleForm, id: a.id, date: a.date } : a))
      showMessage('Article mis à jour avec succès !')
    } else {
      setArticles([...articles, { ...articleForm, id: articles.length + 1, date: new Date().toLocaleDateString('fr-FR') }])
      showMessage('Article créé avec succès !')
    }
    setShowArticleModal(false)
    setEditingArticle(null)
    setArticleForm({ title: '', slug: '', metaDesc: '', category: '', content: '', status: 'draft', image: '' })
  }

  const handleDeleteArticle = (id) => {
    if (window.confirm('Supprimer cet article ?')) {
      setArticles(articles.filter(a => a.id !== id))
      showMessage('Article supprimé !')
    }
  }

  const handleEditArticle = (article) => {
    setEditingArticle(article)
    setArticleForm(article)
    setShowArticleModal(true)
  }

  // ==================== CATALOGUE FUNCTIONS ====================
  const handleToggleService = (id) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s))
    showMessage('Service mis à jour')
  }

  const handleUpdateService = (id, field, value) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  // ==================== CONFIG FUNCTIONS ====================
  const handleSaveConfig = () => {
    showMessage('Configuration enregistrée avec succès !')
  }

  const tabs = [
    { id: 'blog', label: 'Blog & SEO', icon: BookOpen },
    { id: 'catalogue', label: 'Catalogue services', icon: Package },
    { id: 'config', label: 'Configuration', icon: Settings },
  ]

  const categories = ['Sécurité', 'Cloud', 'Développement', 'Énergie', 'Formation', 'Actualités']

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Blog, catalogue & configuration</h1>
        <p className="text-gray-400 mt-1">Gérez votre contenu et les paramètres du site</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 border-b border-white/10 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ==================== BLOG SECTION ==================== */}
      {activeTab === 'blog' && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header with Add Button */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">Articles du blog</h2>
              <p className="text-sm text-gray-400">Gérez vos articles et optimisez le référencement SEO</p>
            </div>
            <button
              onClick={() => {
                setEditingArticle(null)
                setArticleForm({ title: '', slug: '', metaDesc: '', category: '', content: '', status: 'draft', image: '' })
                setShowArticleModal(true)
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" /> Nouvel article
            </button>
          </div>

          {/* Articles Table */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr className="text-left">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-400">Image</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-400">Titre / Slug</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-400">Catégorie</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-400">Statut</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-400">Date</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <img src={article.image} alt={article.title} className="w-12 h-12 rounded-lg object-cover" />
                       </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-white">{article.title}</p>
                        <p className="text-xs text-gray-500">/{article.slug}</p>
                       </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                          {article.category}
                        </span>
                       </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          article.status === 'published' 
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {article.status === 'published' ? 'Publié' : 'Brouillon'}
                        </span>
                       </td>
                      <td className="px-6 py-4 text-gray-400">{article.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-lg bg-white/10 hover:bg-blue-500/20 transition-colors">
                            <Eye className="w-4 h-4 text-gray-400 hover:text-blue-400" />
                          </button>
                          <button onClick={() => handleEditArticle(article)} className="p-2 rounded-lg bg-white/10 hover:bg-emerald-500/20 transition-colors">
                            <Edit className="w-4 h-4 text-gray-400 hover:text-emerald-400" />
                          </button>
                          <button onClick={() => handleDeleteArticle(article.id)} className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 transition-colors">
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                          </button>
                        </div>
                       </td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SEO Configuration */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Paramètres SEO globaux
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Meta titre par défaut</label>
                <input
                  type="text"
                  value={config.seoTitle}
                  onChange={(e) => setConfig({...config, seoTitle: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Meta description</label>
                <textarea
                  rows="3"
                  value={config.seoDesc}
                  onChange={(e) => setConfig({...config, seoDesc: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleSaveConfig}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all"
              >
                <Save className="w-4 h-4" /> Enregistrer SEO
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ==================== CATALOGUE SECTION ==================== */}
      {activeTab === 'catalogue' && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Catalogue des services</h2>
            <p className="text-sm text-gray-400">Gérez vos services, tarifs et ordre d'affichage</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr className="text-left">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">Ordre</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">Service</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">Description</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">Tarif</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">Statut</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={service.order}
                        onChange={(e) => handleUpdateService(service.id, 'order', parseInt(e.target.value))}
                        className="w-16 px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-white text-center"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{service.name}</td>
                    <td className="px-6 py-4 text-gray-400">{service.description}</td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={service.price}
                        onChange={(e) => handleUpdateService(service.id, 'price', e.target.value)}
                        className="w-28 px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-white"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleService(service.id)}
                        className={`px-2 py-1 rounded-full text-xs ${
                          service.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {service.active ? 'Actif' : 'Inactif'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 rounded-lg bg-white/10 hover:bg-emerald-500/20 transition-colors">
                        <Edit className="w-4 h-4 text-gray-400 hover:text-emerald-400" />
                      </button>
                    </td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ==================== CONFIGURATION SECTION ==================== */}
      {activeTab === 'config' && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Informations générales */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Informations générales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nom du site</label>
                <input
                  type="text"
                  value={config.siteName}
                  onChange={(e) => setConfig({...config, siteName: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email de contact</label>
                <input
                  type="email"
                  value={config.siteEmail}
                  onChange={(e) => setConfig({...config, siteEmail: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={config.sitePhone}
                  onChange={(e) => setConfig({...config, sitePhone: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Adresse</label>
                <input
                  type="text"
                  value={config.siteAddress}
                  onChange={(e) => setConfig({...config, siteAddress: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                />
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-400" />
              Réseaux sociaux
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Facebook</label>
                <input
                  type="url"
                  value={config.facebook}
                  onChange={(e) => setConfig({...config, facebook: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">LinkedIn</label>
                <input
                  type="url"
                  value={config.linkedin}
                  onChange={(e) => setConfig({...config, linkedin: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Twitter</label>
                <input
                  type="url"
                  value={config.twitter}
                  onChange={(e) => setConfig({...config, twitter: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                />
              </div>
            </div>
          </div>

          {/* Paramètres SaaS */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-400" />
              Paramètres SaaS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">TVA (%)</label>
                <input
                  type="text"
                  value={config.vatRate}
                  onChange={(e) => setConfig({...config, vatRate: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Devise</label>
                <select
                  value={config.currency}
                  onChange={(e) => setConfig({...config, currency: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                >
                  <option>EUR (€)</option>
                  <option>USD ($)</option>
                  <option>CDF (FC)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveConfig}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all"
          >
            <Save className="w-4 h-4" /> Enregistrer toutes les modifications
          </button>
        </motion.div>
      )}

      {/* Article Modal */}
      {showArticleModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                {editingArticle ? 'Modifier l\'article' : 'Nouvel article'}
              </h2>
              <button onClick={() => setShowArticleModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Titre *</label>
                <input
                  type="text"
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({...articleForm, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Slug (URL)</label>
                <input
                  type="text"
                  value={articleForm.slug}
                  onChange={(e) => setArticleForm({...articleForm, slug: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                  placeholder="exemple-article"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Meta description</label>
                <textarea
                  rows="2"
                  value={articleForm.metaDesc}
                  onChange={(e) => setArticleForm({...articleForm, metaDesc: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Catégorie</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({...articleForm, category: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                  >
                    <option value="">Sélectionner</option>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Statut</label>
                  <select
                    value={articleForm.status}
                    onChange={(e) => setArticleForm({...articleForm, status: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                  >
                    <option value="draft">Brouillon</option>
                    <option value="published">Publié</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">URL de l'image</label>
                <input
                  type="text"
                  value={articleForm.image}
                  onChange={(e) => setArticleForm({...articleForm, image: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Contenu</label>
                <textarea
                  rows="8"
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
                  placeholder="Contenu de l'article..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-white/10">
              <button onClick={() => setShowArticleModal(false)} className="px-4 py-2 rounded-xl bg-white/10 text-gray-400 hover:bg-white/20">Annuler</button>
              <button onClick={handleSaveArticle} className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all">Enregistrer</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminBlog