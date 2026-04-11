// // src/pages/Admin/AdminBlog.jsx
// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { 
//   BookOpen, 
//   Package, 
//   Settings, 
//   Plus, 
//   Edit, 
//   Trash2, 
//   Eye, 
//   Save,
//   Globe,
//   Share2,
//   DollarSign
// } from 'lucide-react'

// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
// };

// const AdminBlog = () => {
//   const [activeTab, setActiveTab] = useState('blog')
//   const [successMessage, setSuccessMessage] = useState('')

//   // ==================== BLOG STATE ====================
//   const [articles, setArticles] = useState([
//     { 
//       id: 1, 
//       title: 'Comment sécuriser son réseau d\'entreprise', 
//       slug: 'securiser-reseau-entreprise',
//       metaDesc: 'Découvrez les bonnes pratiques pour protéger votre infrastructure réseau contre les cyberattaques.',
//       category: 'Sécurité',
//       status: 'published',
//       date: '15/04/2026',
//       image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop'
//     },
//     { 
//       id: 2, 
//       title: 'Les avantages du cloud pour les PME', 
//       slug: 'avantages-cloud-pme',
//       metaDesc: 'Pourquoi migrer vers le cloud ? Économies, flexibilité et sécurité.',
//       category: 'Cloud',
//       status: 'draft',
//       date: '10/04/2026',
//       image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop'
//     },
//   ])

//   const [editingArticle, setEditingArticle] = useState(null)
//   const [showArticleModal, setShowArticleModal] = useState(false)
//   const [articleForm, setArticleForm] = useState({
//     title: '', slug: '', metaDesc: '', category: '', content: '', status: 'draft', image: ''
//   })

//   // ==================== CATALOGUE STATE ====================
//   const [services, setServices] = useState([
//     { id: 1, name: 'Réseau & Infrastructure', price: 'Sur devis', order: 1, active: true, description: 'Installation et maintenance de réseaux informatiques' },
//     { id: 2, name: 'Sécurité & Cybersécurité', price: 'Sur devis', order: 2, active: true, description: 'Protection des données et cybersécurité' },
//     { id: 3, name: 'Développement Digital', price: 'Sur devis', order: 3, active: true, description: 'Sites web, applications, ERP' },
//     { id: 4, name: 'Cloud & Hébergement', price: 'Sur devis', order: 4, active: true, description: 'Solutions cloud et hébergement' },
//     { id: 5, name: 'Énergie & Équipements', price: 'Sur devis', order: 5, active: true, description: 'Panneaux solaires, climatisation' },
//     { id: 6, name: 'Formation IT', price: 'Sur devis', order: 6, active: true, description: 'Formations certifiantes' },
//   ])

//   // ==================== CONFIGURATION STATE ====================
//   const [config, setConfig] = useState({
//     siteName: 'OMDEVE Services',
//     siteEmail: 'contact@omdeve.com',
//     sitePhone: '+243 555 503 59',
//     siteAddress: 'Avenue Kabmabre n°75, Lingwala, Kinshasa',
//     facebook: 'https://facebook.com/omdeve',
//     linkedin: 'https://linkedin.com/company/omdeve',
//     twitter: 'https://twitter.com/omdeve',
//     seoTitle: 'OMDEVE - Solutions IT, Énergie & Digital en RDC',
//     seoDesc: 'Leader en solutions informatiques, énergétiques et digitales en République Démocratique du Congo',
//     vatRate: '16',
//     currency: 'EUR'
//   })

//   const showMessage = (msg) => {
//     setSuccessMessage(msg)
//     setTimeout(() => setSuccessMessage(''), 3000)
//   }

//   // ==================== BLOG FUNCTIONS ====================
//   const handleSaveArticle = () => {
//     if (editingArticle) {
//       setArticles(articles.map(a => a.id === editingArticle.id ? { ...articleForm, id: a.id, date: a.date } : a))
//       showMessage('Article mis à jour avec succès !')
//     } else {
//       setArticles([...articles, { ...articleForm, id: articles.length + 1, date: new Date().toLocaleDateString('fr-FR') }])
//       showMessage('Article créé avec succès !')
//     }
//     setShowArticleModal(false)
//     setEditingArticle(null)
//     setArticleForm({ title: '', slug: '', metaDesc: '', category: '', content: '', status: 'draft', image: '' })
//   }

//   const handleDeleteArticle = (id) => {
//     if (window.confirm('Supprimer cet article ?')) {
//       setArticles(articles.filter(a => a.id !== id))
//       showMessage('Article supprimé !')
//     }
//   }

//   const handleEditArticle = (article) => {
//     setEditingArticle(article)
//     setArticleForm(article)
//     setShowArticleModal(true)
//   }

//   // ==================== CATALOGUE FUNCTIONS ====================
//   const handleToggleService = (id) => {
//     setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s))
//     showMessage('Service mis à jour')
//   }

//   const handleUpdateService = (id, field, value) => {
//     setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s))
//   }

//   // ==================== CONFIG FUNCTIONS ====================
//   const handleSaveConfig = () => {
//     showMessage('Configuration enregistrée avec succès !')
//   }

//   const tabs = [
//     { id: 'blog', label: 'Blog & SEO', icon: BookOpen },
//     { id: 'catalogue', label: 'Catalogue services', icon: Package },
//     { id: 'config', label: 'Configuration', icon: Settings },
//   ]

//   const categories = ['Sécurité', 'Cloud', 'Développement', 'Énergie', 'Formation', 'Actualités']

//   return (
//     <div className="space-y-6">
//       {/* Success Message */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="fixed top-20 right-6 z-50 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm"
//           >
//             {successMessage}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-6"
//       >
//         <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Blog, catalogue & configuration</h1>
//         <p className="text-gray-400 mt-1">Gérez votre contenu et les paramètres du site</p>
//       </motion.div>

//       {/* Tabs */}
//       <div className="flex flex-wrap gap-3 border-b border-white/10 pb-4">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
//               activeTab === tab.id
//                 ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30'
//                 : 'text-gray-400 hover:text-white hover:bg-white/10'
//             }`}
//           >
//             <tab.icon className="w-4 h-4" />
//             <span className="font-medium">{tab.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* ==================== BLOG SECTION ==================== */}
//       {activeTab === 'blog' && (
//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           className="space-y-6"
//         >
//           {/* Header with Add Button */}
//           <div className="flex justify-between items-center">
//             <div>
//               <h2 className="text-xl font-semibold text-white">Articles du blog</h2>
//               <p className="text-sm text-gray-400">Gérez vos articles et optimisez le référencement SEO</p>
//             </div>
//             <button
//               onClick={() => {
//                 setEditingArticle(null)
//                 setArticleForm({ title: '', slug: '', metaDesc: '', category: '', content: '', status: 'draft', image: '' })
//                 setShowArticleModal(true)
//               }}
//               className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all"
//             >
//               <Plus className="w-4 h-4" /> Nouvel article
//             </button>
//           </div>

//           {/* Articles Table */}
//           <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="border-b border-white/10">
//                   <tr className="text-left">
//                     <th className="px-6 py-4 text-sm font-semibold text-gray-400">Image</th>
//                     <th className="px-6 py-4 text-sm font-semibold text-gray-400">Titre / Slug</th>
//                     <th className="px-6 py-4 text-sm font-semibold text-gray-400">Catégorie</th>
//                     <th className="px-6 py-4 text-sm font-semibold text-gray-400">Statut</th>
//                     <th className="px-6 py-4 text-sm font-semibold text-gray-400">Date</th>
//                     <th className="px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-white/10">
//                   {articles.map((article) => (
//                     <tr key={article.id} className="hover:bg-white/5 transition-colors">
//                       <td className="px-6 py-4">
//                         <img src={article.image} alt={article.title} className="w-12 h-12 rounded-lg object-cover" />
//                        </td>
//                       <td className="px-6 py-4">
//                         <p className="font-medium text-white">{article.title}</p>
//                         <p className="text-xs text-gray-500">/{article.slug}</p>
//                        </td>
//                       <td className="px-6 py-4">
//                         <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
//                           {article.category}
//                         </span>
//                        </td>
//                       <td className="px-6 py-4">
//                         <span className={`px-2 py-1 rounded-full text-xs ${
//                           article.status === 'published' 
//                             ? 'bg-emerald-500/20 text-emerald-400'
//                             : 'bg-amber-500/20 text-amber-400'
//                         }`}>
//                           {article.status === 'published' ? 'Publié' : 'Brouillon'}
//                         </span>
//                        </td>
//                       <td className="px-6 py-4 text-gray-400">{article.date}</td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <button className="p-2 rounded-lg bg-white/10 hover:bg-blue-500/20 transition-colors">
//                             <Eye className="w-4 h-4 text-gray-400 hover:text-blue-400" />
//                           </button>
//                           <button onClick={() => handleEditArticle(article)} className="p-2 rounded-lg bg-white/10 hover:bg-emerald-500/20 transition-colors">
//                             <Edit className="w-4 h-4 text-gray-400 hover:text-emerald-400" />
//                           </button>
//                           <button onClick={() => handleDeleteArticle(article.id)} className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 transition-colors">
//                             <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
//                           </button>
//                         </div>
//                        </td>
//                      </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* SEO Configuration */}
//           <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
//             <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//               <Globe className="w-5 h-5 text-blue-400" />
//               Paramètres SEO globaux
//             </h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Meta titre par défaut</label>
//                 <input
//                   type="text"
//                   value={config.seoTitle}
//                   onChange={(e) => setConfig({...config, seoTitle: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Meta description</label>
//                 <textarea
//                   rows="3"
//                   value={config.seoDesc}
//                   onChange={(e) => setConfig({...config, seoDesc: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
//                 />
//               </div>
//               <button
//                 onClick={handleSaveConfig}
//                 className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all"
//               >
//                 <Save className="w-4 h-4" /> Enregistrer SEO
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* ==================== CATALOGUE SECTION ==================== */}
//       {activeTab === 'catalogue' && (
//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
//         >
//           <div className="p-6 border-b border-white/10">
//             <h2 className="text-xl font-semibold text-white">Catalogue des services</h2>
//             <p className="text-sm text-gray-400">Gérez vos services, tarifs et ordre d'affichage</p>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="border-b border-white/10">
//                 <tr className="text-left">
//                   <th className="px-6 py-4 text-sm font-semibold text-gray-400">Ordre</th>
//                   <th className="px-6 py-4 text-sm font-semibold text-gray-400">Service</th>
//                   <th className="px-6 py-4 text-sm font-semibold text-gray-400">Description</th>
//                   <th className="px-6 py-4 text-sm font-semibold text-gray-400">Tarif</th>
//                   <th className="px-6 py-4 text-sm font-semibold text-gray-400">Statut</th>
//                   <th className="px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-white/10">
//                 {services.map((service) => (
//                   <tr key={service.id} className="hover:bg-white/5 transition-colors">
//                     <td className="px-6 py-4">
//                       <input
//                         type="number"
//                         value={service.order}
//                         onChange={(e) => handleUpdateService(service.id, 'order', parseInt(e.target.value))}
//                         className="w-16 px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-white text-center"
//                       />
//                     </td>
//                     <td className="px-6 py-4 font-medium text-white">{service.name}</td>
//                     <td className="px-6 py-4 text-gray-400">{service.description}</td>
//                     <td className="px-6 py-4">
//                       <input
//                         type="text"
//                         value={service.price}
//                         onChange={(e) => handleUpdateService(service.id, 'price', e.target.value)}
//                         className="w-28 px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-white"
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleToggleService(service.id)}
//                         className={`px-2 py-1 rounded-full text-xs ${
//                           service.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
//                         }`}
//                       >
//                         {service.active ? 'Actif' : 'Inactif'}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button className="p-2 rounded-lg bg-white/10 hover:bg-emerald-500/20 transition-colors">
//                         <Edit className="w-4 h-4 text-gray-400 hover:text-emerald-400" />
//                       </button>
//                     </td>
//                    </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
//       )}

//       {/* ==================== CONFIGURATION SECTION ==================== */}
//       {activeTab === 'config' && (
//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           className="space-y-6"
//         >
//           {/* Informations générales */}
//           <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
//             <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//               <Globe className="w-5 h-5 text-blue-400" />
//               Informations générales
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Nom du site</label>
//                 <input
//                   type="text"
//                   value={config.siteName}
//                   onChange={(e) => setConfig({...config, siteName: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Email de contact</label>
//                 <input
//                   type="email"
//                   value={config.siteEmail}
//                   onChange={(e) => setConfig({...config, siteEmail: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Téléphone</label>
//                 <input
//                   type="tel"
//                   value={config.sitePhone}
//                   onChange={(e) => setConfig({...config, sitePhone: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Adresse</label>
//                 <input
//                   type="text"
//                   value={config.siteAddress}
//                   onChange={(e) => setConfig({...config, siteAddress: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Réseaux sociaux */}
//           <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
//             <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//               <Share2 className="w-5 h-5 text-blue-400" />
//               Réseaux sociaux
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Facebook</label>
//                 <input
//                   type="url"
//                   value={config.facebook}
//                   onChange={(e) => setConfig({...config, facebook: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">LinkedIn</label>
//                 <input
//                   type="url"
//                   value={config.linkedin}
//                   onChange={(e) => setConfig({...config, linkedin: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Twitter</label>
//                 <input
//                   type="url"
//                   value={config.twitter}
//                   onChange={(e) => setConfig({...config, twitter: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Paramètres SaaS */}
//           <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
//             <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//               <DollarSign className="w-5 h-5 text-blue-400" />
//               Paramètres SaaS
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">TVA (%)</label>
//                 <input
//                   type="text"
//                   value={config.vatRate}
//                   onChange={(e) => setConfig({...config, vatRate: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Devise</label>
//                 <select
//                   value={config.currency}
//                   onChange={(e) => setConfig({...config, currency: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                 >
//                   <option>EUR (€)</option>
//                   <option>USD ($)</option>
//                   <option>CDF (FC)</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Save Button */}
//           <button
//             onClick={handleSaveConfig}
//             className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all"
//           >
//             <Save className="w-4 h-4" /> Enregistrer toutes les modifications
//           </button>
//         </motion.div>
//       )}

//       {/* Article Modal */}
//       {showArticleModal && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10"
//           >
//             <div className="flex items-center justify-between p-6 border-b border-white/10">
//               <h2 className="text-xl font-bold text-white">
//                 {editingArticle ? 'Modifier l\'article' : 'Nouvel article'}
//               </h2>
//               <button onClick={() => setShowArticleModal(false)} className="text-gray-400 hover:text-white">✕</button>
//             </div>
//             <div className="p-6 space-y-4">
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Titre *</label>
//                 <input
//                   type="text"
//                   value={articleForm.title}
//                   onChange={(e) => setArticleForm({...articleForm, title: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Slug (URL)</label>
//                 <input
//                   type="text"
//                   value={articleForm.slug}
//                   onChange={(e) => setArticleForm({...articleForm, slug: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                   placeholder="exemple-article"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Meta description</label>
//                 <textarea
//                   rows="2"
//                   value={articleForm.metaDesc}
//                   onChange={(e) => setArticleForm({...articleForm, metaDesc: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">Catégorie</label>
//                   <select
//                     value={articleForm.category}
//                     onChange={(e) => setArticleForm({...articleForm, category: e.target.value})}
//                     className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                   >
//                     <option value="">Sélectionner</option>
//                     {categories.map(c => <option key={c}>{c}</option>)}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm text-gray-400 mb-1">Statut</label>
//                   <select
//                     value={articleForm.status}
//                     onChange={(e) => setArticleForm({...articleForm, status: e.target.value})}
//                     className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                   >
//                     <option value="draft">Brouillon</option>
//                     <option value="published">Publié</option>
//                   </select>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">URL de l'image</label>
//                 <input
//                   type="text"
//                   value={articleForm.image}
//                   onChange={(e) => setArticleForm({...articleForm, image: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                   placeholder="https://..."
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Contenu</label>
//                 <textarea
//                   rows="8"
//                   value={articleForm.content}
//                   onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
//                   className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
//                   placeholder="Contenu de l'article..."
//                 />
//               </div>
//             </div>
//             <div className="flex justify-end gap-3 p-6 border-t border-white/10">
//               <button onClick={() => setShowArticleModal(false)} className="px-4 py-2 rounded-xl bg-white/10 text-gray-400 hover:bg-white/20">Annuler</button>
//               <button onClick={handleSaveArticle} className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all">Enregistrer</button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AdminBlog


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

export default AdminBlog