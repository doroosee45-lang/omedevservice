// ==================== AdminCRM.jsx ====================
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { crm as crmApi } from '../../services/api'
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
import { PageHeader, Button, EmptyState } from '../../components/Admin/ui'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

const stages = [
  { id: 'lead', name: 'Lead', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500/10 border-blue-500/30', textColor: 'text-blue-400' },
  { id: 'contact', name: 'Contact', color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-500/10 border-amber-500/30', textColor: 'text-amber-400' },
  { id: 'proposition', name: 'Proposition', color: 'from-purple-500 to-indigo-500', bgColor: 'bg-purple-500/10 border-purple-500/30', textColor: 'text-purple-400' },
  { id: 'negociation', name: 'Négociation', color: 'from-red-500 to-red-600', bgColor: 'bg-red-500/10 border-red-500/30', textColor: 'text-red-400' },
  { id: 'signe', name: 'Signé', color: 'from-[#2AACB2] to-[#2AACB2]', bgColor: 'bg-[#2AACB2]/10 border-[#2AACB2]/30', textColor: 'text-[#55DDB5]' },
]

// Ces deux sections n'ont pas encore de source de données réelle côté
// backend (aucune route d'agrégation "interactions récentes" ni de
// modèle "infrastructure" n'existe) : on affiche un état vide honnête
// plutôt que des exemples fictifs tant que cette intégration n'est pas
// construite.
const recentInfrastructures = []

const recentInteractions = []

const getStatusConfig = (status) => {
  const configs = {
    operational: { label: 'Opérationnel', color: 'bg-[#2AACB2]/20 text-[#55DDB5] border-[#2AACB2]/30', icon: Activity },
    warning: { label: 'Alerte', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', icon: AlertCircle },
    critical: { label: 'Critique', color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: AlertCircle },
  }
  return configs[status] || configs.operational
}

const getActionColor = (action) => {
  const colors = {
    'Appel commercial': 'from-blue-500 to-blue-600',
    'Envoi devis': 'from-[#2AACB2] to-[#2AACB2]',
    'Réunion': 'from-purple-500 to-indigo-500',
    'Relance téléphonique': 'from-amber-500 to-amber-600',
    'Visite technique': 'from-indigo-500 to-purple-500',
    'Signature contrat': 'from-[#2AACB2] to-green-500',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center admin-modal-overlay p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md admin-modal-panel overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-white font-semibold text-lg">Nouveau prospect</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white/50 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Société *</label>
              <input
                type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Nom de l'entreprise"
                className="admin-input text-sm"
              />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Contact *</label>
              <input
                type="text" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})}
                placeholder="Nom du contact"
                className="admin-input text-sm"
              />
              {errors.contact && <p className="text-xs text-red-400 mt-1">{errors.contact}</p>}
            </div>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Email *</label>
            <input
              type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              placeholder="Adresse email"
              className="admin-input text-sm"
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Téléphone</label>
              <input
                type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                placeholder="+243 555 000 000"
                className="admin-input text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Valeur estimée</label>
              <input
                type="text" value={form.value} onChange={e => setForm({...form, value: e.target.value})}
                placeholder="10 000€"
                className="admin-input text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Étape</label>
            <select
              value={form.stage} onChange={e => setForm({...form, stage: e.target.value})}
              className="admin-select text-sm"
            >
              {stages.map(s => <option key={s.id} value={s.id} className="bg-[#0B1F3D]">{s.name}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="admin-btn admin-btn-outline flex-1">
              Annuler
            </button>
            <button type="submit" className="admin-btn admin-btn-primary flex-1">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center admin-modal-overlay p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm admin-modal-panel overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-white font-semibold">Déplacer : {prospect.name}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white/50 hover:text-white">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center admin-modal-overlay p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md admin-modal-panel overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-white font-semibold">Relancer : {interaction.prospect}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white/50 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSend} className="p-5 space-y-4">
          <div>
            <label className="text-xs text-white/50 mb-1 block">Destinataire</label>
            <p className="text-sm text-white px-3 py-2 rounded-lg bg-white/5 border border-white/10">{interaction.email}</p>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Message de relance</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={`Bonjour,\n\nJe me permets de vous recontacter suite à notre ${interaction.action?.toLowerCase()}...`}
              rows={4}
              className="admin-textarea text-sm resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="admin-btn admin-btn-outline flex-1">
              Annuler
            </button>
            <button type="submit" className="admin-btn admin-btn-primary flex-1">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center admin-modal-overlay p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md admin-modal-panel overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-500 to-[#2AACB2] flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold">{infra.name}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white/50 hover:text-white">
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
                <p className="text-xs text-white/40 mb-1">{label}</p>
                <p className="text-sm text-white font-medium">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-sm text-white/50">Statut actuel</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${status.color}`}>
              <StatusIcon className="w-3 h-3" /> {status.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="admin-btn admin-btn-outline w-full"
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
        className="admin-card admin-card-hover overflow-hidden cursor-pointer group"
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
            <div className="flex items-center gap-2 text-xs text-white/50">
              <User className="w-3 h-3" />
              <span>{prospect.contact}</span>
            </div>
          </div>
        </div>

        <div className="p-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-white/40 mb-3">
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
                  className="text-xs text-white/50 truncate hover:text-blue-400 transition"
                >
                  {prospect.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-[#55DDB5]" />
                <a
                  href={`tel:${prospect.phone}`}
                  onClick={handleContactClick}
                  className="text-xs text-white/50 hover:text-[#55DDB5] transition"
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
                  className="flex-1 text-xs py-1.5 rounded-lg bg-[#2AACB2]/20 text-[#55DDB5] hover:bg-[#2AACB2]/30 transition"
                >
                  Déplacer
                </button>
              </div>
            </motion.div>
          )}

          {!showDetails && (
            <div className="text-center pt-1">
              <span className="text-[10px] text-white/40 group-hover:text-blue-400 transition">Cliquez pour plus de détails</span>
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
    <div className="flex-shrink-0 w-80 admin-card overflow-hidden">
      <div className={`p-4 border-b border-white/10 ${stage.bgColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${stage.color} flex items-center justify-center`}>
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className={`font-semibold ${stage.textColor}`}>{stage.name}</h3>
              <p className="text-xs text-white/40">{prospects.length} prospects</p>
            </div>
          </div>
          {/* ✅ Bouton + colonne → ouvre le formulaire avec l'étape pré-sélectionnée */}
          <button
            onClick={() => onAddProspect(stage.id)}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <Plus className="w-4 h-4 text-white/50" />
          </button>
        </div>
      </div>
      <div className="p-3 space-y-3 max-h-[600px] overflow-y-auto">
        {prospects.map((prospect) => (
          <ProspectCard key={prospect.id} prospect={prospect} stage={stage.id} onMove={onMove} />
        ))}
        {prospects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-xs text-white/40">Aucun prospect</p>
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
        className="admin-card admin-card-hover p-4 cursor-pointer group"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-[#2AACB2] flex items-center justify-center shadow-lg">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">{infra.name}</h4>
              <p className="text-xs text-white/50">{infra.type}</p>
            </div>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full border ${status.color}`}>
            <StatusIcon className="w-3 h-3 inline mr-1" />
            {status.label}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1 text-white/40">
            <MapPin className="w-3 h-3" />
            <span>{infra.location}</span>
          </div>
          <div className="flex items-center gap-1 text-white/40">
            <Activity className="w-3 h-3" />
            <span>Uptime: {infra.uptime}</span>
          </div>
          <div className="flex items-center gap-1 text-white/40 col-span-2">
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
        className="admin-card admin-card-hover overflow-hidden group"
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
                  <p className="text-xs text-white/50">{interaction.action}</p>
                </div>
              </div>
              <span className="text-xs text-white/40">{interaction.date}</span>
            </div>

            <p className="text-xs text-white/50 mb-3 line-clamp-2">{interaction.description}</p>

            <div className="flex items-center gap-3 text-xs text-white/40 mb-3">
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
                className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg bg-[#2AACB2]/20 text-[#55DDB5] hover:bg-[#2AACB2]/30 transition"
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
  const [prospectsData, setProspectsData] = useState({ lead: [], contact: [], proposition: [], negociation: [], signe: [] })
  const [showNewProspect, setShowNewProspect] = useState(false)
  const [defaultStage, setDefaultStage] = useState('lead')
  const [loading, setLoading] = useState(false)

  useEffect(() => { loadProspects() }, [])

  const loadProspects = async () => {
    setLoading(true)
    try {
      const res = await crmApi.getByStage()
      setProspectsData(res.data || { lead: [], contact: [], proposition: [], negociation: [], signe: [] })
    } catch (err) {
      console.error('Erreur chargement prospects:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProspect = async (newProspect) => {
    try {
      await crmApi.create({
        name: newProspect.name,
        contact: newProspect.contact,
        email: newProspect.email,
        phone: newProspect.phone,
        value: newProspect.value,
        stage: newProspect.stage,
        lastContact: new Date(),
      })
      await loadProspects()
    } catch (err) {
      console.error('Erreur création prospect:', err)
    }
  }

  const handleAddProspectInStage = (stageId) => {
    setDefaultStage(stageId)
    setShowNewProspect(true)
  }

  const handleMoveProspect = async (prospect, fromStage, toStage) => {
    // Mise à jour optimiste
    setProspectsData(prev => ({
      ...prev,
      [fromStage]: prev[fromStage].filter(p => (p._id || p.id) !== (prospect._id || prospect.id)),
      [toStage]: [...prev[toStage], { ...prospect, stage: toStage }],
    }))
    try {
      await crmApi.move(prospect._id || prospect.id, toStage)
    } catch (err) {
      console.error('Erreur déplacement prospect:', err)
      await loadProspects()
    }
  }

  return (
    <>
      <PageHeader
        title="CRM - Pipeline commercial"
        subtitle="Gérez vos prospects et suivez votre pipeline"
        actions={
          <Button variant="primary" icon={Plus} onClick={() => { setDefaultStage('lead'); setShowNewProspect(true) }}>
            Nouveau prospect
          </Button>
        }
      />

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
            <p className="text-sm text-white/50">État des serveurs, réseaux et équipements</p>
          </div>
          {/* ✅ Voir tout → scroll vers le bas de la section */}
          <button
            onClick={() => document.getElementById('section-infra')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm text-blue-400 hover:text-blue-300 transition"
          >
            Voir tout
          </button>
        </div>
        <div id="section-infra">
          {recentInfrastructures.length === 0 ? (
            <EmptyState icon={Server} title="Aucune infrastructure suivie" description="Le monitoring d'infrastructure n'est pas encore connecté." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentInfrastructures.map((infra) => (
                <InfrastructureCard key={infra.id} infra={infra} />
              ))}
            </div>
          )}
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
            <p className="text-sm text-white/50">Derniers échanges avec vos prospects</p>
          </div>
          {/* ✅ Voir tout → scroll vers la section */}
          <button
            onClick={() => document.getElementById('section-interactions')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm text-blue-400 hover:text-blue-300 transition"
          >
            Voir tout
          </button>
        </div>
        <div id="section-interactions">
          {recentInteractions.length === 0 ? (
            <EmptyState icon={MessageSquare} title="Aucune interaction récente" description="Les échanges avec vos prospects apparaîtront ici." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentInteractions.map((interaction) => (
                <InteractionCard key={interaction.id} interaction={interaction} />
              ))}
            </div>
          )}
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