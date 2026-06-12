import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FolderKanban, Calendar, Users, MessageCircle,
  CheckCircle, Clock, ArrowRight, X, Send,
  BarChart2, Target, Paperclip, Smile, ChevronDown, ChevronUp,
  FileText, AlertCircle, TrendingUp, User, Plus
} from 'lucide-react'
import ClientSidebar from '../../components/ClientSidebar'
import ClientHeader from '../../components/ClientHeader'

/* ─── Styles globaux ────────────────────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #e2e8f0; overflow-x: hidden; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .chat-scroll::-webkit-scrollbar { width: 4px; }
  .chat-scroll::-webkit-scrollbar-track { background: transparent; }
  .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
`

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
}
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 0.68, 0, 1] } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
}
const msgVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } }
}

/* ─── Couleurs statut ───────────────────────────────────────────────────────── */
const getProgressColor = (p) => p >= 80 ? 'from-emerald-500 to-teal-500' : p >= 50 ? 'from-blue-500 to-cyan-500' : p >= 25 ? 'from-amber-500 to-orange-500' : 'from-red-500 to-pink-500'

/* ─── Modal: Discuter ───────────────────────────────────────────────────────── */
const ModalDiscuter = ({ projet, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, from: 'system', text: `Bienvenue dans le fil de discussion du projet "${projet.name}". Posez vos questions à l'équipe.`, time: 'Aujourd\'hui' },
    { id: 2, from: 'team',   author: projet.team[0], text: `Bonjour ! Tout avance bien sur ${projet.name}. N'hésitez pas si vous avez des questions.`, time: '09:15' },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)

  const emojis = ['👍', '✅', '🚀', '💬', '❓', '⏰']

  const handleSend = () => {
    if (!input.trim()) return
    const newMsg = { id: Date.now(), from: 'me', text: input.trim(), time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, newMsg])
    setInput('')
    setSending(true)
    // Réponse auto de l'équipe
    setTimeout(() => {
      const replies = [
        'Merci pour votre message ! Nous en prenons note.',
        'Bien reçu, je reviens vers vous très vite.',
        'Parfait, on s\'en occupe dès que possible.',
        `On a transmis votre demande à l'équipe ${projet.name}.`,
      ]
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: 'team',
        author: projet.team[0],
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      }])
      setSending(false)
    }, 1200)
  }

  const addEmoji = (emoji) => setInput(prev => prev + emoji)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col"
        style={{ height: '82vh', maxHeight: 640 }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 p-4 border-b border-white/10 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">{projet.name}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-gray-400 text-xs">{projet.team.length} membres en ligne</p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
            <X className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        {/* Membres */}
        <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2 flex-shrink-0">
          <span className="text-gray-500 text-xs">Équipe :</span>
          <div className="flex gap-1.5 flex-wrap">
            {projet.team.map((m, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/20">{m}</span>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scroll">
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div key={msg.id} variants={msgVariants} initial="hidden" animate="visible"
                className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'system' ? (
                  <div className="w-full text-center">
                    <span className="text-xs text-gray-600 bg-white/5 px-3 py-1 rounded-full">{msg.text}</span>
                  </div>
                ) : msg.from === 'team' ? (
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white mt-1">
                      {msg.author[0]}
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] mb-1">{msg.author} · {msg.time}</p>
                      <div className="bg-white/10 rounded-2xl rounded-tl-none px-4 py-2.5">
                        <p className="text-gray-200 text-sm leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[80%]">
                    <p className="text-gray-500 text-[10px] mb-1 text-right">Moi · {msg.time}</p>
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl rounded-tr-none px-4 py-2.5">
                      <p className="text-white text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {sending && (
            <div className="flex gap-2 items-center">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                {projet.team[0][0]}
              </div>
              <div className="bg-white/10 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Emojis rapides */}
        <div className="px-4 py-2 flex gap-2 border-t border-white/5 flex-shrink-0">
          {emojis.map(e => (
            <button key={e} onClick={() => addEmoji(e)} className="text-base hover:scale-125 transition-transform">{e}</button>
          ))}
        </div>

        {/* Zone de saisie */}
        <div className="p-3 border-t border-white/10 flex gap-2 flex-shrink-0">
          <input
            type="text" placeholder="Écrire un message..."
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-sm"
          />
          <button onClick={handleSend} disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center hover:scale-105 transition-all disabled:opacity-40 disabled:scale-100">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Modal: Détails Projet ─────────────────────────────────────────────────── */
const ModalDetails = ({ projet, onClose, onDiscuter }) => {
  const [tasksDone, setTasksDone] = useState(projet.tasks.map(t => t.completed))
  const [showAllTasks, setShowAllTasks] = useState(false)
  const [newTask, setNewTask] = useState('')
  const [tasks, setTasks] = useState(projet.tasks)

  const completedCount = tasksDone.filter(Boolean).length
  const localProgress  = Math.round((completedCount / tasks.length) * 100)

  const toggleTask = (i) => {
    const updated = [...tasksDone]
    updated[i] = !updated[i]
    setTasksDone(updated)
  }

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks(prev => [...prev, { name: newTask.trim(), completed: false }])
    setTasksDone(prev => [...prev, false])
    setNewTask('')
  }

  const displayedTasks = showAllTasks ? tasks : tasks.slice(0, 4)

  const barColor = getProgressColor(localProgress)

  const statusMap = {
    in_progress: { label: 'En cours',  color: 'text-blue-400  bg-blue-500/15  border-blue-500/30',  icon: Clock },
    completed:   { label: 'Terminé',   color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30', icon: CheckCircle },
    paused:      { label: 'En pause',  color: 'text-amber-400 bg-amber-500/15  border-amber-500/30',  icon: AlertCircle },
  }
  const s = statusMap[projet.status] || statusMap.in_progress
  const StatusIcon = s.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto chat-scroll"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/25 to-cyan-600/25 p-6 border-b border-white/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-white">{projet.name}</h2>
                  <span className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-0.5 rounded-full">{projet.id}</span>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.color}`}>
                  <StatusIcon className="w-3 h-3" /> {s.label}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all flex-shrink-0">
              <X className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* Description */}
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-2">Description</p>
            <p className="text-gray-300 text-sm leading-relaxed">{projet.description}</p>
          </div>

          {/* Dates + Progression */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-gray-500 text-xs mb-1">Début</p>
              <Calendar className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <p className="text-white font-semibold text-sm">{projet.startDate}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-gray-500 text-xs mb-1">Fin prévue</p>
              <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <p className="text-white font-semibold text-sm">{projet.endDate}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-gray-500 text-xs mb-1">Avancement</p>
              <TrendingUp className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <p className="text-white font-semibold text-sm">{localProgress}%</p>
            </div>
          </div>

          {/* Barre progression */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Progression globale</span>
              <span className="text-sm font-bold text-white">{localProgress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <motion.div
                className={`bg-gradient-to-r ${barColor} rounded-full h-3 transition-all duration-500`}
                initial={{ width: 0 }}
                animate={{ width: `${localProgress}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <p className="text-gray-500 text-xs mt-1">{completedCount} / {tasks.length} tâches complétées</p>
          </div>

          {/* Tâches interactives */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" /> Tâches du projet
              </h3>
              <span className="text-xs text-gray-500">{completedCount}/{tasks.length}</span>
            </div>
            <div className="space-y-2">
              {displayedTasks.map((task, i) => (
                <motion.button key={i} onClick={() => toggleTask(i)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${tasksDone[i] ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${tasksDone[i] ? 'bg-emerald-500 border-emerald-500' : 'border-gray-500'}`}>
                    {tasksDone[i] && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={`text-sm flex-1 transition-all ${tasksDone[i] ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                    {task.name}
                  </span>
                  {tasksDone[i] && <span className="text-xs text-emerald-400 font-medium">Fait</span>}
                </motion.button>
              ))}

              {tasks.length > 4 && (
                <button onClick={() => setShowAllTasks(!showAllTasks)}
                  className="w-full text-center text-xs text-blue-400 hover:text-blue-300 py-1 flex items-center justify-center gap-1 transition-all">
                  {showAllTasks ? <><ChevronUp className="w-3.5 h-3.5" /> Voir moins</> : <><ChevronDown className="w-3.5 h-3.5" /> Voir toutes ({tasks.length - 4} de plus)</>}
                </button>
              )}
            </div>

            {/* Ajouter une tâche */}
            <div className="flex gap-2 mt-3">
              <input type="text" placeholder="Ajouter une tâche..."
                value={newTask} onChange={e => setNewTask(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTask()}
                className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-xs" />
              <button onClick={addTask} disabled={!newTask.trim()}
                className="px-3 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-all disabled:opacity-40 flex items-center gap-1 text-xs">
                <Plus className="w-3.5 h-3.5" /> Ajouter
              </button>
            </div>
          </div>

          {/* Équipe */}
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-blue-400" /> Équipe projet
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {projet.team.map((member, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {member[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-xs font-medium truncate">{member}</p>
                    <p className="text-gray-500 text-[10px]">Membre actif</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm hover:bg-white/10 transition-all">
            Fermer
          </button>
          <button onClick={() => { onClose(); onDiscuter(projet) }}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" /> Discuter
          </button>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Composant Principal ───────────────────────────────────────────────────── */
const Projets = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalDiscuter, setModalDiscuter] = useState(null)
  const [modalDetails,  setModalDetails]  = useState(null)

  const projets = [
    {
      id: 'PRJ-001',
      name: 'Site E-commerce',
      description: "Développement complet d'une plateforme e-commerce avec paiement intégré",
      progress: 75,
      status: 'in_progress',
      startDate: '25/04/2026',
      endDate: '30/06/2026',
      team: ['Jean Tech', 'Marie Design', 'Paul Backend'],
      tasks: [
        { name: 'Maquettes UI/UX', completed: true },
        { name: 'Développement Frontend', completed: true },
        { name: 'Développement Backend', completed: false },
        { name: 'Intégration paiement', completed: false },
        { name: 'Tests & Déploiement', completed: false },
      ]
    },
    {
      id: 'PRJ-002',
      name: 'Installation Réseau',
      description: 'Installation réseau pour 50 postes + WiFi entreprise',
      progress: 40,
      status: 'in_progress',
      startDate: '10/04/2026',
      endDate: '20/05/2026',
      team: ['Marc Infra', 'David Network'],
      tasks: [
        { name: 'Audit site', completed: true },
        { name: 'Câblage structuré', completed: true },
        { name: 'Configuration équipements', completed: false },
        { name: 'Tests & validation', completed: false },
      ]
    },
    {
      id: 'PRJ-003',
      name: 'Migration Cloud',
      description: 'Migration complète des serveurs vers AWS avec formation',
      progress: 25,
      status: 'in_progress',
      startDate: '01/05/2026',
      endDate: '15/07/2026',
      team: ['Sophie Cloud', 'Thomas DevOps'],
      tasks: [
        { name: 'Analyse infrastructure', completed: true },
        { name: 'Migration données', completed: false },
        { name: 'Configuration serveurs', completed: false },
        { name: 'Formation équipe', completed: false },
      ]
    },
    {
      id: 'PRJ-004',
      name: 'Audit Sécurité',
      description: 'Audit complet de sécurité et conformité RGPD',
      progress: 90,
      status: 'in_progress',
      startDate: '01/03/2026',
      endDate: '30/04/2026',
      team: ['Pierre Securité', 'Julie Conformité'],
      tasks: [
        { name: 'Scan vulnérabilités', completed: true },
        { name: 'Test intrusion', completed: true },
        { name: 'Rapport détaillé', completed: true },
        { name: 'Plan correction', completed: false },
      ]
    },
  ]

  return (
    <>
      <style>{globalStyles}</style>

      {/* Modals */}
      <AnimatePresence>
        {modalDiscuter && (
          <ModalDiscuter projet={modalDiscuter} onClose={() => setModalDiscuter(null)} />
        )}
        {modalDetails && (
          <ModalDetails projet={modalDetails}
            onClose={() => setModalDetails(null)}
            onDiscuter={(p) => { setModalDetails(null); setModalDiscuter(p) }} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
          <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
            <ClientSidebar />
          </div>
          {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

          <div className="flex-1 lg:ml-64">
            <main className="p-6 md:p-8">

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Mes projets</h1>
                <p className="text-gray-400 mt-1">Suivez l'avancement de vos projets en cours</p>
              </motion.div>

              <motion.div variants={staggerContainer} initial="hidden" animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projets.map((projet) => (
                  <motion.div key={projet.id} variants={fadeUp}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full">

                    {/* Header gradient bar */}
                    <div className="relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                      <div className="p-5 pb-3">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                              <FolderKanban className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xs text-gray-500 font-mono">{projet.id}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-xs text-gray-400">{projet.endDate}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{projet.name}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{projet.description}</p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex-1 flex flex-col">
                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between mb-1.5">
                          <span className="text-xs text-gray-400">Progression</span>
                          <span className="text-xs font-medium text-blue-400">{projet.progress}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1.5">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full h-1.5"
                            initial={{ width: 0 }}
                            animate={{ width: `${projet.progress}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          />
                        </div>
                      </div>

                      {/* Tasks - compact */}
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tâches</h4>
                        <div className="space-y-1.5">
                          {projet.tasks.slice(0, 3).map((task, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              {task.completed
                                ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                : <div className="w-3.5 h-3.5 border-2 border-gray-500 rounded-full" />
                              }
                              <span className={`text-xs ${task.completed ? 'text-gray-500 line-through' : 'text-gray-400'}`}>
                                {task.name.length > 30 ? task.name.substring(0, 27) + '...' : task.name}
                              </span>
                            </div>
                          ))}
                          {projet.tasks.length > 3 && (
                            <button onClick={() => setModalDetails(projet)} className="text-xs text-blue-400 hover:text-blue-300 mt-1 transition-all">
                              +{projet.tasks.length - 3} autres tâches →
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Team - compact */}
                      <div className="mb-4">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Users className="w-3.5 h-3.5 text-blue-400" />
                          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Équipe</h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {projet.team.slice(0, 3).map((member, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-gray-300">{member}</span>
                          ))}
                          {projet.team.length > 3 && (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-gray-400">+{projet.team.length - 3}</span>
                          )}
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-blue-400" />
                          <span>{projet.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-400" />
                          <span>{projet.endDate}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                        <button onClick={() => setModalDiscuter(projet)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium hover:scale-105 transition-all">
                          <MessageCircle className="w-3.5 h-3.5" /> Discuter
                        </button>
                        <button onClick={() => setModalDetails(projet)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-all">
                          Détails <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Projets