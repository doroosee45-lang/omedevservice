// ==================== AdminProjets.jsx ====================
import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { projects as projectsApi } from '../../services/api'
import {
  Plus,
  User,
  Calendar,
  Flag,
  X,
  Eye,
} from 'lucide-react'
import { PageHeader, Card, Button } from '../../components/Admin/ui'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

const projectStages = [
  { id: 'todo',     name: 'À faire',  color: 'from-gray-500 to-gray-600',    bgColor: 'bg-gray-500/10 border-gray-500/30',    textColor: 'text-white/50'   },
  { id: 'progress', name: 'En cours', color: 'from-blue-500 to-blue-600',     bgColor: 'bg-blue-500/10 border-blue-500/30',    textColor: 'text-blue-400'   },
  { id: 'review',   name: 'Review',   color: 'from-purple-500 to-indigo-500',   bgColor: 'bg-purple-500/10 border-purple-500/30', textColor: 'text-purple-400' },
  { id: 'done',     name: 'Terminé',  color: 'from-[#2AACB2] to-[#2AACB2]',  bgColor: 'bg-[#2AACB2]/10 border-[#2AACB2]/30', textColor: 'text-[#55DDB5]' },
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
    basse:   { label: 'Basse',   color: 'bg-gray-500/20 text-white/50 border-gray-500/30'       },
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
    resolved:    { label: 'Résolu',   color: 'bg-[#2AACB2]/20 text-[#55DDB5] border-[#2AACB2]/30' },
    closed:      { label: 'Fermé',    color: 'bg-gray-500/20 text-white/50 border-gray-500/30'          },
  }
  return badges[status] || badges.open
}

// ==================== CHAMP RESPONSABLE RÉUTILISABLE ====================
// Input libre + suggestions (datalist) issues des clients + membres connus
const AssigneeInput = ({ value, onChange, suggestions, label = 'Responsable', placeholder = 'Nom du responsable' }) => {
  const listId = `assignee-list-${label.replace(/\s/g, '-')}`
  return (
    <div>
      <label className="text-xs text-white/50 mb-1 block">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        list={listId}
        autoComplete="off"
        className="admin-input text-sm"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center admin-modal-overlay p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md admin-modal-panel overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-white font-semibold text-lg">Nouveau projet</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white/50 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Nom du projet *</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Site E-commerce"
                className="admin-input text-sm" />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Client *</label>
              <input type="text" value={form.client} onChange={e => setForm({...form, client: e.target.value})} placeholder="ABC Corp"
                className="admin-input text-sm" />
              {errors.client && <p className="text-xs text-red-400 mt-1">{errors.client}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Échéance *</label>
              <input type="date" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})}
                className="admin-input text-sm" />
              {errors.deadline && <p className="text-xs text-red-400 mt-1">{errors.deadline}</p>}
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Progression (%)</label>
              <input type="number" min="0" max="100" value={form.progress} onChange={e => setForm({...form, progress: e.target.value})}
                className="admin-input text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Priorité</label>
              <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}
                className="admin-input text-sm">
                {['basse','normale','haute','urgente'].map(p => <option key={p} value={p} className="bg-[#0B1F3D] capitalize">{p.charAt(0).toUpperCase()+p.slice(1)}</option>)}
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
            <label className="text-xs text-white/50 mb-1 block">Étape initiale</label>
            <select value={form.stage} onChange={e => setForm({...form, stage: e.target.value})}
              className="admin-input text-sm">
              {projectStages.map(s => <option key={s.id} value={s.id} className="bg-[#0B1F3D]">{s.name}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="admin-btn admin-btn-outline flex-1">Annuler</button>
            <button type="submit" className="admin-btn admin-btn-primary flex-1">Enregistrer</button>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center admin-modal-overlay p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md admin-modal-panel overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-white font-semibold">{project.name}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white/50 hover:text-white"><X className="w-4 h-4" /></button>
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
                <p className="text-xs text-white/40 mb-1">{label}</p>
                <p className="text-sm text-white font-medium">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-xs text-white/40 mb-1">Priorité</p>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${priority.color}`}>{priority.label}</span>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-xs text-white/40 mb-1">Étape</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${stageConfig?.textColor}`}>{stageConfig?.name}</span>
            </div>
          </div>
          {(project.progress > 0) && (
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-xs text-white/40 mb-2">Avancement</p>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-[#2AACB2] rounded-full h-2 transition-all" style={{ width: `${project.progress}%` }} />
              </div>
              <p className="text-xs text-white/50 mt-1 text-right">{project.progress}%</p>
            </div>
          )}
          <button onClick={onClose} className="admin-btn admin-btn-outline w-full">Fermer</button>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center admin-modal-overlay p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md admin-modal-panel overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <h3 className="text-white font-semibold">Traiter : {ticket.id}</h3>
            <p className="text-xs text-white/50 mt-0.5">{ticket.subject}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white/50 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Changer le statut</label>
              <select value={newStatus} onChange={e => setNewStatus(e.target.value)}
                className="admin-input text-sm">
                <option value="open"        className="bg-[#0B1F3D]">Ouvert</option>
                <option value="in_progress" className="bg-[#0B1F3D]">En cours</option>
                <option value="resolved"    className="bg-[#0B1F3D]">Résolu</option>
                <option value="closed"      className="bg-[#0B1F3D]">Fermé</option>
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
            <label className="text-xs text-white/50 mb-1 block">Note de traitement</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
              placeholder="Décrivez les actions effectuées..."
              className="admin-textarea text-sm resize-none" />
          </div>
          <div className="flex gap-3">
            <button onClick={onClose}  className="admin-btn admin-btn-outline flex-1">Annuler</button>
            <button onClick={handleSave} className="admin-btn admin-btn-primary flex-1">Enregistrer</button>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center admin-modal-overlay p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm admin-modal-panel overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-white font-semibold">Nouveau ticket</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white/50 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs text-white/50 mb-1 block">Sujet *</label>
            <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Problème connexion..."
              className="admin-input text-sm" />
            {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Priorité</label>
              <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}
                className="admin-input text-sm">
                {['basse','normale','haute','urgente'].map(p => <option key={p} value={p} className="bg-[#0B1F3D] capitalize">{p.charAt(0).toUpperCase()+p.slice(1)}</option>)}
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
            <button type="button" onClick={onClose} className="admin-btn admin-btn-outline flex-1">Annuler</button>
            <button type="submit" className="admin-btn admin-btn-primary flex-1">Créer</button>
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
      <p className="text-xs text-white/50 mb-2">{project.client}</p>
      {project.progress > 0 && (
        <div className="mb-2">
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-blue-500 to-[#2AACB2] rounded-full h-1.5" style={{ width: `${project.progress}%` }} />
          </div>
          <p className="text-xs text-white/40 mt-1">{project.progress}%</p>
        </div>
      )}
      <div className="flex items-center gap-2 text-xs text-white/40">
        <Calendar className="w-3 h-3" />
        <span>{project.deadline}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-white/40 mt-1">
        <User className="w-3 h-3" />
        <span>{project.assignee}</span>
      </div>
    </div>
  )
}

// ==================== ADMIN PROJETS ====================
const AdminProjets = () => {
  const [view,          setView]          = useState('kanban')
  const [projectsData,  setProjectsData]  = useState({ todo: [], progress: [], review: [], done: [] })
  const [tickets,       setTickets]       = useState(initialTickets)
  const [loading,       setLoading]       = useState(false)

  // Modals
  const [showNewProjet,   setShowNewProjet]   = useState(false)
  const [showNewTicket,   setShowNewTicket]   = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedStage,   setSelectedStage]   = useState(null)
  const [selectedTicket,  setSelectedTicket]  = useState(null)
  const [defaultStage,    setDefaultStage]    = useState('todo')

  useEffect(() => { loadProjects() }, [])

  const loadProjects = async () => {
    setLoading(true)
    try {
      const res = await projectsApi.getAll()
      const all = res.data?.projects || res.data || []
      const grouped = { todo: [], progress: [], review: [], done: [] }
      all.forEach(p => {
        const stage = p.status || 'todo'
        if (!grouped[stage]) grouped[stage] = []
        grouped[stage].push({
          ...p,
          id: p._id,
          client: p.clientName || '',
          deadline: p.endDate ? new Date(p.endDate).toLocaleDateString('fr-FR') : '',
        })
      })
      setProjectsData(grouped)
    } catch (err) {
      console.error('Erreur chargement projets:', err)
    } finally {
      setLoading(false)
    }
  }

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

  const handleSaveProjet = async (newProject) => {
    try {
      await projectsApi.create({
        name: newProject.name,
        description: newProject.name,
        clientName: newProject.client,
        service: 'Général',
        startDate: new Date(),
        endDate: newProject.deadline ? new Date(newProject.deadline) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        progress: newProject.progress || 0,
        status: newProject.stage,
        priority: newProject.priority,
        assignee: newProject.assignee,
      })
      await loadProjects()
    } catch (err) {
      console.error('Erreur création projet:', err)
    }
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
      <PageHeader
        title="Projets & tickets"
        subtitle="Gérez vos projets et le support client"
        actions={
          <>
            <div className="flex rounded-xl bg-white/10 p-1">
              <button onClick={() => setView('kanban')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'kanban' ? 'bg-[#2AACB2] text-white' : 'text-white/50 hover:text-white'}`}>
                Kanban
              </button>
              <button onClick={() => setView('list')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'list' ? 'bg-[#2AACB2] text-white' : 'text-white/50 hover:text-white'}`}>
                Liste
              </button>
            </div>
            <Button variant="primary" icon={Plus} onClick={() => { setDefaultStage('todo'); setShowNewProjet(true) }}>
              Nouveau projet
            </Button>
          </>
        }
      />

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
                      <span className="text-xs text-white/50">{projectsData[stage.id]?.length || 0}</span>
                      <button onClick={() => handleAddInStage(stage.id)} className="p-0.5 rounded bg-white/10 hover:bg-white/20 transition">
                        <Plus className="w-3.5 h-3.5 text-white/50" />
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
                      <p className="text-xs text-white/40">Aucun projet</p>
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
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
          <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  {['Projet','Client','Statut','Progression','Échéance','Responsable','Actions'].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allProjects.map((project) => {
                  const stage = projectStages.find(s => s.id === project.stageId)
                  return (
                    <tr key={project.id}>
                      <td className="font-medium">{project.name}</td>
                      <td className="text-white/70">{project.client}</td>
                      <td>
                        <span className={`text-xs px-2 py-1 rounded-full border ${stage?.bgColor} ${stage?.textColor}`}>{stage?.name}</span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-white/10 rounded-full h-1.5">
                            <div className="bg-gradient-to-r from-blue-500 to-[#2AACB2] rounded-full h-1.5" style={{ width: `${project.progress || 0}%` }} />
                          </div>
                          <span className="text-xs text-white/50">{project.progress || 0}%</span>
                        </div>
                      </td>
                      <td className="text-white/50">{project.deadline}</td>
                      <td className="text-white/50">{project.assignee}</td>
                      <td>
                        <button
                          onClick={() => handleViewProject(project, project.stageId)}
                          className="flex items-center gap-1 text-xs text-blue-300 hover:text-blue-200 transition"
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
          </Card>
        </motion.div>
      )}

      {/* ===== TICKETS SUPPORT ===== */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <Card className="overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white font-syne flex items-center gap-2">
            <Flag className="w-5 h-5 text-blue-400" />
            Tickets support
          </h2>
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setShowNewTicket(true)}>
            Nouveau ticket
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                {['ID','Sujet','Priorité','Statut','Date','Assigné','Actions'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => {
                const priority = getPriorityBadge(ticket.priority)
                const status   = getStatusBadge(ticket.status)
                return (
                  <tr key={ticket.id}>
                    <td className="font-medium">{ticket.id}</td>
                    <td className="text-white/70">{ticket.subject}</td>
                    <td>
                      <span className={`text-xs px-2 py-1 rounded-full border ${priority.color}`}>{priority.label}</span>
                    </td>
                    <td>
                      <span className={`text-xs px-2 py-1 rounded-full border ${status.color}`}>{status.label}</span>
                    </td>
                    <td className="text-white/50">{ticket.date}</td>
                    <td className="text-white/50">{ticket.assignee}</td>
                    <td>
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="text-xs text-blue-300 hover:text-blue-200 transition"
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
        </Card>
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