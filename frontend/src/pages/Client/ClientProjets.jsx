import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects as projectsApi } from '../../services/api'
import {
  FolderKanban, Calendar, Users, MessageCircle,
  CheckCircle, Clock, ArrowRight, X, Send,
  BarChart2, Target, Paperclip, Smile, ChevronDown, ChevronUp,
  FileText, AlertCircle, TrendingUp, User, Plus
} from 'lucide-react'
import ClientSidebar from '../../components/ClientSidebar'
import ClientHeader from '../../components/ClientHeader'

/* ─── Styles globaux (thème clair OMDEVE, identique à la page Profil) ────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

  .omedev-vm {
    --omedev-navy: #053876;
    --omedev-blue-dark: #1D5B9B;
    --omedev-blue: #0B74C1;
    --omedev-blue-light: #4681B7;
    --omedev-cyan: #72A5CE;
    --omedev-cyan-light: #A6C3D7;
    --omedev-turquoise: #2AACB2;
    --omedev-energy: #55DDB5;
    --omedev-white: #F6F6F7;
    --omedev-gray: #D5DCE1;
    --omedev-dark: #0B1213;
    --omedev-text-secondary: #25364A;
    background: #F6F6F7;
    color: #0B1213;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }
  .omedev-vm * { box-sizing: border-box; }

  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .chat-scroll::-webkit-scrollbar { width: 4px; }
  .chat-scroll::-webkit-scrollbar-track { background: transparent; }
  .chat-scroll::-webkit-scrollbar-thumb { background: rgba(5,56,118,0.15); border-radius: 99px; }
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

/* ─── Couleurs statut (palette OMDEVE) ─────────────────────────────────────── */
const getProgressColor = (p) =>
  p >= 75 ? 'from-[#2AACB2] to-[#55DDB5]'
  : p >= 50 ? 'from-[#0B74C1] to-[#2AACB2]'
  : p >= 25 ? 'from-[#4681B7] to-[#72A5CE]'
  : 'from-amber-500 to-orange-500'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1213]/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-white border border-[rgba(5,56,118,0.12)] rounded-2xl w-full max-w-lg overflow-hidden shadow-[0_20px_50px_rgba(5,56,118,0.18)] flex flex-col"
        style={{ height: '82vh', maxHeight: 640 }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-[#F6F6F7] border-b border-[rgba(5,56,118,0.1)] p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#0B74C1] to-[#2AACB2] flex items-center justify-center shadow-lg">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#053876]">{projet.name}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#55DDB5] animate-pulse" />
                <p className="text-[#25364A]/60 text-xs">{projet.team.length} membres en ligne</p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[rgba(5,56,118,0.06)] hover:bg-[rgba(5,56,118,0.12)] flex items-center justify-center transition-all">
            <X className="w-4 h-4 text-[#25364A]/70" />
          </button>
        </div>

        {/* Membres */}
        <div className="px-4 py-2 border-b border-[rgba(5,56,118,0.08)] flex items-center gap-2 flex-shrink-0">
          <span className="text-[#25364A]/60 text-xs">Équipe :</span>
          <div className="flex gap-1.5 flex-wrap">
            {projet.team.map((m, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-[#0B74C1]/10 text-[#0B74C1] border border-[#0B74C1]/20">{m}</span>
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
                    <span className="text-xs text-[#25364A]/60 bg-[rgba(5,56,118,0.06)] px-3 py-1 rounded-full">{msg.text}</span>
                  </div>
                ) : msg.from === 'team' ? (
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0B74C1] to-[#2AACB2] flex items-center justify-center flex-shrink-0 text-xs font-bold text-white mt-1">
                      {msg.author[0]}
                    </div>
                    <div>
                      <p className="text-[#25364A]/60 text-[10px] mb-1">{msg.author} · {msg.time}</p>
                      <div className="bg-[rgba(5,56,118,0.06)] rounded-2xl rounded-tl-none px-4 py-2.5">
                        <p className="text-[#25364A] text-sm leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[80%]">
                    <p className="text-[#25364A]/60 text-[10px] mb-1 text-right">Moi · {msg.time}</p>
                    <div className="bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] rounded-2xl rounded-tr-none px-4 py-2.5">
                      <p className="text-white text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {sending && (
            <div className="flex gap-2 items-center">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0B74C1] to-[#2AACB2] flex items-center justify-center text-xs font-bold text-white">
                {projet.team[0][0]}
              </div>
              <div className="bg-[rgba(5,56,118,0.06)] rounded-2xl rounded-tl-none px-4 py-3 flex gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 bg-[#25364A]/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Emojis rapides */}
        <div className="px-4 py-2 flex gap-2 border-t border-[rgba(5,56,118,0.08)] flex-shrink-0">
          {emojis.map(e => (
            <button key={e} onClick={() => addEmoji(e)} className="text-base hover:scale-125 transition-transform">{e}</button>
          ))}
        </div>

        {/* Zone de saisie */}
        <div className="p-3 border-t border-[rgba(5,56,118,0.1)] flex gap-2 flex-shrink-0">
          <input
            type="text" placeholder="Écrire un message..."
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[rgba(5,56,118,0.18)] text-[#0B1213] placeholder-[#25364A]/50 focus:outline-none focus:border-[#2AACB2] transition-all text-sm"
          />
          <button onClick={handleSend} disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] flex items-center justify-center hover:brightness-110 transition-all disabled:opacity-40 disabled:scale-100">
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
    in_progress: { label: 'En cours',  color: 'text-[#0B74C1] bg-[#0B74C1]/12 border border-[#0B74C1]/30',  icon: Clock },
    completed:   { label: 'Terminé',   color: 'text-[#2AACB2] bg-[#2AACB2]/12 border border-[#2AACB2]/30', icon: CheckCircle },
    paused:      { label: 'En pause',  color: 'text-amber-600 bg-amber-500/12 border border-amber-500/30',  icon: AlertCircle },
  }
  const s = statusMap[projet.status] || statusMap.in_progress
  const StatusIcon = s.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1213]/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-white border border-[rgba(5,56,118,0.12)] rounded-2xl w-full max-w-2xl overflow-hidden shadow-[0_20px_50px_rgba(5,56,118,0.18)] max-h-[92vh] overflow-y-auto chat-scroll"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-[#F6F6F7] border-b border-[rgba(5,56,118,0.1)] p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0B74C1] to-[#2AACB2] flex items-center justify-center shadow-lg">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-[#053876]">{projet.name}</h2>
                  <span className="text-xs text-[#25364A]/60 font-mono bg-[rgba(5,56,118,0.06)] px-2 py-0.5 rounded-full">{projet.id}</span>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.color}`}>
                  <StatusIcon className="w-3 h-3" /> {s.label}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-[rgba(5,56,118,0.06)] hover:bg-[rgba(5,56,118,0.12)] flex items-center justify-center transition-all flex-shrink-0">
              <X className="w-4 h-4 text-[#25364A]/70" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* Description */}
          <div className="bg-[rgba(5,56,118,0.04)] rounded-xl p-4">
            <p className="text-[#25364A]/60 text-xs font-bold uppercase tracking-wide mb-2">Description</p>
            <p className="text-[#25364A] text-sm leading-relaxed">{projet.description}</p>
          </div>

          {/* Dates + Progression */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[rgba(5,56,118,0.04)] rounded-xl p-4 text-center">
              <p className="text-[#25364A]/60 text-xs mb-1">Début</p>
              <Calendar className="w-4 h-4 text-[#55DDB5] mx-auto mb-1" />
              <p className="text-[#0B1213] font-semibold text-sm">{projet.startDate}</p>
            </div>
            <div className="bg-[rgba(5,56,118,0.04)] rounded-xl p-4 text-center">
              <p className="text-[#25364A]/60 text-xs mb-1">Fin prévue</p>
              <Clock className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <p className="text-[#0B1213] font-semibold text-sm">{projet.endDate}</p>
            </div>
            <div className="bg-[rgba(5,56,118,0.04)] rounded-xl p-4 text-center">
              <p className="text-[#25364A]/60 text-xs mb-1">Avancement</p>
              <TrendingUp className="w-4 h-4 text-[#55DDB5] mx-auto mb-1" />
              <p className="text-[#0B1213] font-semibold text-sm">{localProgress}%</p>
            </div>
          </div>

          {/* Barre progression */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#25364A]/70">Progression globale</span>
              <span className="text-sm font-bold text-[#0B1213]">{localProgress}%</span>
            </div>
            <div className="w-full bg-[rgba(5,56,118,0.1)] rounded-full h-3">
              <motion.div
                className={`bg-gradient-to-r ${barColor} rounded-full h-3 transition-all duration-500`}
                initial={{ width: 0 }}
                animate={{ width: `${localProgress}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <p className="text-[#25364A]/60 text-xs mt-1">{completedCount} / {tasks.length} tâches complétées</p>
          </div>

          {/* Tâches interactives */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#053876] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#2AACB2]" /> Tâches du projet
              </h3>
              <span className="text-xs text-[#25364A]/60">{completedCount}/{tasks.length}</span>
            </div>
            <div className="space-y-2">
              {displayedTasks.map((task, i) => (
                <motion.button key={i} onClick={() => toggleTask(i)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${tasksDone[i] ? 'bg-[#2AACB2]/8 border-[#2AACB2]/25' : 'bg-[rgba(5,56,118,0.04)] border-[rgba(5,56,118,0.1)] hover:border-[rgba(5,56,118,0.2)]'}`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${tasksDone[i] ? 'bg-[#2AACB2] border-[#2AACB2]' : 'border-[#25364A]/40'}`}>
                    {tasksDone[i] && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={`text-sm flex-1 transition-all ${tasksDone[i] ? 'text-[#25364A]/50 line-through' : 'text-[#25364A]'}`}>
                    {task.name}
                  </span>
                  {tasksDone[i] && <span className="text-xs text-[#2AACB2] font-medium">Fait</span>}
                </motion.button>
              ))}

              {tasks.length > 4 && (
                <button onClick={() => setShowAllTasks(!showAllTasks)}
                  className="w-full text-center text-xs text-[#0B74C1] hover:text-[#053876] py-1 flex items-center justify-center gap-1 transition-all">
                  {showAllTasks ? <><ChevronUp className="w-3.5 h-3.5" /> Voir moins</> : <><ChevronDown className="w-3.5 h-3.5" /> Voir toutes ({tasks.length - 4} de plus)</>}
                </button>
              )}
            </div>

            {/* Ajouter une tâche */}
            <div className="flex gap-2 mt-3">
              <input type="text" placeholder="Ajouter une tâche..."
                value={newTask} onChange={e => setNewTask(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTask()}
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-[rgba(5,56,118,0.18)] text-[#0B1213] placeholder-[#25364A]/50 focus:outline-none focus:border-[#2AACB2] transition-all text-xs" />
              <button onClick={addTask} disabled={!newTask.trim()}
                className="px-3 py-2 rounded-xl bg-[#0B74C1]/10 border border-[#0B74C1]/25 text-[#0B74C1] hover:bg-[#0B74C1]/16 transition-all disabled:opacity-40 flex items-center gap-1 text-xs">
                <Plus className="w-3.5 h-3.5" /> Ajouter
              </button>
            </div>
          </div>

          {/* Équipe */}
          <div>
            <h3 className="text-sm font-bold text-[#053876] flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-[#2AACB2]" /> Équipe projet
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {projet.team.map((member, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(5,56,118,0.04)] border border-[rgba(5,56,118,0.1)]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0B74C1] to-[#2AACB2] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {member[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#0B1213] text-xs font-medium truncate">{member}</p>
                    <p className="text-[#25364A]/60 text-[10px]">Membre actif</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-[rgba(5,56,118,0.2)] text-[#25364A] text-sm hover:bg-[rgba(5,56,118,0.06)] transition-all">
            Fermer
          </button>
          <button onClick={() => { onClose(); onDiscuter(projet) }}
            className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white text-sm font-semibold transition-all duration-300 shadow-[0_10px_28px_rgba(11,116,193,0.2)] flex items-center justify-center gap-2">
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
  const [projets, setProjets] = useState([])

  useEffect(() => {
    projectsApi.getMyProjects().then(res => {
      const data = (res.data?.projects || res.data || []).map(p => ({
        ...p,
        id: p.projectId || p._id,
        status: p.status || 'in_progress',
        startDate: p.startDate ? new Date(p.startDate).toLocaleDateString('fr-FR') : '',
        endDate: p.endDate ? new Date(p.endDate).toLocaleDateString('fr-FR') : '',
        team: p.team?.length ? p.team : [p.assignee].filter(Boolean),
        tasks: p.tasks || [],
      }))
      setProjets(data)
    }).catch(err => console.error('Erreur chargement projets:', err))
  }, [])

  return (
    <div className="omedev-vm">
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

      <div className="min-h-screen bg-[#F6F6F7]">
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
          <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
            <ClientSidebar />
          </div>
          {sidebarOpen && <div className="fixed inset-0 bg-[#0B1213]/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

          <div className="flex-1 lg:ml-64">
            <main className="p-6 md:p-8">

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-[#053876] font-syne">Mes projets</h1>
                <p className="text-[#25364A]/70 mt-1">Suivez l'avancement de vos projets en cours</p>
              </motion.div>

              <motion.div variants={staggerContainer} initial="hidden" animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projets.map((projet) => (
                  <motion.div key={projet.id} variants={fadeUp}
                    className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(5,56,118,0.06)] hover:border-[#0B74C1]/30 hover:shadow-[0_16px_36px_rgba(5,56,118,0.1)] transition-all hover:-translate-y-1 flex flex-col h-full">

                    {/* Header gradient bar */}
                    <div className="relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5]" />
                      <div className="p-5 pb-3">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0B74C1] to-[#2AACB2] flex items-center justify-center shadow-lg">
                              <FolderKanban className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xs text-[#25364A]/60 font-mono">{projet.id}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                            <span className="text-xs text-[#25364A]/60">{projet.endDate}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-[#053876] mb-1 line-clamp-1">{projet.name}</h3>
                        <p className="text-sm text-[#25364A]/70 line-clamp-2">{projet.description}</p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex-1 flex flex-col">
                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between mb-1.5">
                          <span className="text-xs text-[#25364A]/70">Progression</span>
                          <span className="text-xs font-medium text-[#2AACB2]">{projet.progress}%</span>
                        </div>
                        <div className="w-full bg-[rgba(5,56,118,0.1)] rounded-full h-1.5">
                          <motion.div
                            className="bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] rounded-full h-1.5"
                            initial={{ width: 0 }}
                            animate={{ width: `${projet.progress}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          />
                        </div>
                      </div>

                      {/* Tasks - compact */}
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-[#25364A]/60 uppercase tracking-wider mb-2">Tâches</h4>
                        <div className="space-y-1.5">
                          {projet.tasks.slice(0, 3).map((task, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              {task.completed
                                ? <CheckCircle className="w-3.5 h-3.5 text-[#2AACB2]" />
                                : <div className="w-3.5 h-3.5 border-2 border-[#25364A]/40 rounded-full" />
                              }
                              <span className={`text-xs ${task.completed ? 'text-[#25364A]/50 line-through' : 'text-[#25364A]/70'}`}>
                                {task.name.length > 30 ? task.name.substring(0, 27) + '...' : task.name}
                              </span>
                            </div>
                          ))}
                          {projet.tasks.length > 3 && (
                            <button onClick={() => setModalDetails(projet)} className="text-xs text-[#0B74C1] hover:text-[#053876] mt-1 transition-all">
                              +{projet.tasks.length - 3} autres tâches →
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Team - compact */}
                      <div className="mb-4">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Users className="w-3.5 h-3.5 text-[#2AACB2]" />
                          <h4 className="text-xs font-semibold text-[#25364A]/60 uppercase tracking-wider">Équipe</h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {projet.team.slice(0, 3).map((member, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-full text-xs bg-[rgba(5,56,118,0.06)] text-[#25364A]">{member}</span>
                          ))}
                          {projet.team.length > 3 && (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-[rgba(5,56,118,0.06)] text-[#25364A]/70">+{projet.team.length - 3}</span>
                          )}
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="flex items-center gap-3 text-xs text-[#25364A]/60 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#2AACB2]" />
                          <span>{projet.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-500" />
                          <span>{projet.endDate}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-auto pt-3 border-t border-[rgba(5,56,118,0.1)]">
                        <button onClick={() => setModalDiscuter(projet)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white text-xs font-medium transition-all duration-300 shadow-[0_10px_28px_rgba(11,116,193,0.2)]">
                          <MessageCircle className="w-3.5 h-3.5" /> Discuter
                        </button>
                        <button onClick={() => setModalDetails(projet)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-[rgba(5,56,118,0.2)] text-[#25364A] text-xs font-medium hover:bg-[rgba(5,56,118,0.06)] hover:text-[#053876] transition-all">
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
    </div>
  )
}

export default Projets
