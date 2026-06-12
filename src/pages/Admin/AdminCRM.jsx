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