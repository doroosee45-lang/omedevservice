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