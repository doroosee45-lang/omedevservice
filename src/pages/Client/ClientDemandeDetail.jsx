import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Download, 
  Printer,
  Calendar,
  Euro,
  Clock,
  User,
  FileText,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail
} from 'lucide-react'
import ClientSidebar from '../../components/ClientSidebar'
import ClientHeader from '../../components/ClientHeader'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const DemandeDetail = () => {
  const { id } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Simulation de données - À remplacer par appel API
  const demande = {
    id: id,
    service: 'Développement Digital',
    description: 'Site e-commerce complet avec paiement intégré, panier d\'achat, gestion de stock, et dashboard administrateur.',
    detailedDescription: `Le projet consiste à développer une plateforme e-commerce complète pour une boutique de vêtements. 
    Fonctionnalités requises :
    - Catalogue de produits avec filtres avancés
    - Panier d'achat et checkout
    - Intégration Stripe/PayPal
    - Dashboard administrateur (gestion produits, commandes, clients)
    - Espace client avec historique
    - SEO optimisé
    - Responsive design`,
    date: '15/04/2026',
    status: 'approved',
    amount: '5 000€',
    estimatedDelivery: '15/06/2026',
    technicalContact: 'Marc Technical',
    technicalEmail: 'marc@omedev.com',
    technicalPhone: '+243 555 503 60',
    timeline: [
      { step: 'Demande reçue', date: '15/04/2026', completed: true },
      { step: 'Analyse technique', date: '18/04/2026', completed: true },
      { step: 'Devis proposé', date: '20/04/2026', completed: true },
      { step: 'Début du projet', date: '25/04/2026', completed: true },
      { step: 'Livraison', date: '15/06/2026', completed: false },
    ]
  }

  const getStatusConfig = (status) => {
    const configs = {
      pending: { label: 'En attente', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
      approved: { label: 'Approuvé', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
      completed: { label: 'Terminé', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      rejected: { label: 'Refusé', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    }
    return configs[status] || configs.pending
  }

  const status = getStatusConfig(demande.status)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <ClientSidebar />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6 md:p-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link to="/client/demandes" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux demandes
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">{demande.id}</h1>
                <p className="text-gray-400 mt-1">{demande.service}</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 transition-all">
                  <Printer className="w-4 h-4" />
                  Imprimer
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all">
                  <Download className="w-4 h-4" />
                  Télécharger PDF
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">État de la demande</h2>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <div className="space-y-4">
                  {demande.timeline.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="relative">
                        {item.completed ? (
                          <CheckCircle className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-gray-500" />
                        )}
                        {index < demande.timeline.length - 1 && (
                          <div className={`absolute top-6 left-3 w-0.5 h-12 ${item.completed ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-white">{item.step}</p>
                        <p className="text-sm text-gray-400">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">Description détaillée</h2>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">{demande.detailedDescription}</p>
              </motion.div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Informations */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">Informations</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Date de demande</p>
                      <p className="font-medium text-white">{demande.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Euro className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Montant</p>
                      <p className="font-medium text-white">{demande.amount}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Livraison estimée</p>
                      <p className="font-medium text-white">{demande.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Technique */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">Contact technique</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Référent technique</p>
                      <p className="font-medium text-white">{demande.technicalContact}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-cyan-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="font-medium text-blue-400">{demande.technicalEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Téléphone</p>
                      <p className="font-medium text-white">{demande.technicalPhone}</p>
                    </div>
                  </div>
                </div>
                <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all">
                  <MessageCircle className="w-4 h-4" />
                  Contacter le support
                </button>
              </motion.div>

              {/* Documents */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">Documents</h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group">
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300 group-hover:text-white transition-colors">Devis_{demande.id}.pdf</span>
                    </span>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group">
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300 group-hover:text-white transition-colors">Cahier_des_charges.pdf</span>
                    </span>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DemandeDetail