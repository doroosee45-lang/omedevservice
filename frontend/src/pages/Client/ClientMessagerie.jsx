// ==================== ClientMessagerie.jsx ====================
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { tickets as ticketsApi } from '../../services/api'
import {
  MessageSquare,
  Send,
  Paperclip,
  Search,
  User,
  Plus,
  Menu,
  X,
  Mail,
  Phone,
  Building,
  XCircle
} from 'lucide-react'
import ClientSidebar from '../../components/ClientSidebar'
import ClientHeader from '../../components/ClientHeader'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

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

  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
  .omedev-vm .animate-float { animation: float 6s ease-in-out infinite; }
`

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

// Modal Nouvelle Conversation
const NewConversationModal = ({ isOpen, onClose, onCreateConversation }) => {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!subject.trim() || !message.trim()) return

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    onCreateConversation({
      id: Date.now(),
      subject,
      firstMessage: message,
      date: 'À l\'instant',
      unread: 1,
      avatar: 'N'
    })

    setSubject('')
    setMessage('')
    setIsSubmitting(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#0B1213]/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-md border border-[rgba(5,56,118,0.12)] shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-[rgba(5,56,118,0.1)]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#0B74C1]" />
            <h2 className="text-xl font-bold text-[#053876]">Nouvelle conversation</h2>
          </div>
          <button onClick={onClose} className="text-[#25364A]/60 hover:text-[#053876] transition">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-[#25364A]/70 mb-1">Sujet *</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex: Demande d'information, Support technique..."
              className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(5,56,118,0.18)] text-[#0B1213] placeholder-[#25364A]/45 focus:outline-none focus:border-[#2AACB2] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm text-[#25364A]/70 mb-1">Message *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              placeholder="Décrivez votre demande..."
              className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(5,56,118,0.18)] text-[#0B1213] placeholder-[#25364A]/45 focus:outline-none focus:border-[#2AACB2] transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-[rgba(5,56,118,0.1)]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[rgba(5,56,118,0.18)] text-[#25364A] hover:bg-[#F6F6F7] transition"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={!subject.trim() || !message.trim() || isSubmitting}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_28px_rgba(11,116,193,0.2)]"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Envoi...
              </div>
            ) : (
              'Envoyer'
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

const ClientMessagerie = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [showNewConversationModal, setShowNewConversationModal] = useState(false)
  const fileInputRef = useRef(null)

  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState({})

  useEffect(() => {
    ticketsApi.getMyTickets().then(res => {
      const tickets = res.data?.tickets || res.data || []
      const convs = tickets.map(t => ({
        id: t._id,
        subject: t.subject || t.title,
        lastMessage: t.messages?.slice(-1)[0]?.message || t.description || '',
        date: t.updatedAt ? new Date(t.updatedAt).toLocaleDateString('fr-FR') : '',
        unread: t.unreadCount || 0,
        avatar: (t.subject || 'S')[0].toUpperCase(),
        status: t.status,
      }))
      setConversations(convs)
      const msgMap = {}
      tickets.forEach(t => {
        msgMap[t._id] = (t.messages || []).map((m, i) => ({
          id: i,
          sender: m.sender === 'client' ? 'client' : 'support',
          message: m.message,
          time: m.createdAt ? new Date(m.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '',
          date: m.createdAt ? new Date(m.createdAt).toLocaleDateString('fr-FR') : '',
        }))
      })
      setMessages(msgMap)
    }).catch(err => console.error('Erreur chargement tickets:', err))
  }, [])

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedConversation) {
      const newMsg = {
        id: Date.now(),
        sender: 'client',
        message: newMessage,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString('fr-FR')
      }
      setMessages(prev => ({ ...prev, [selectedConversation]: [...(prev[selectedConversation] || []), newMsg] }))
      setConversations(prev => prev.map(c => c.id === selectedConversation ? { ...c, lastMessage: newMessage, date: "À l'instant" } : c))
      const text = newMessage
      setNewMessage('')
      try {
        await ticketsApi.addMessage(selectedConversation, text)
      } catch (err) {
        console.error('Erreur envoi message:', err)
      }
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleCreateConversation = (newConv) => {
    const newId = newConv.id
    setConversations([newConv, ...conversations])
    setMessages({
      ...messages,
      [newId]: [
        { id: 1, sender: 'client', message: newConv.firstMessage, time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }), date: new Date().toLocaleDateString('fr-FR') }
      ]
    })
    setSelectedConversation(newId)
  }

  return (
    <div className="omedev-vm">
      <style>{globalStyles}</style>

      <div className="min-h-screen" style={{ background: '#F6F6F7' }}>

        {/* Header */}
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
          {/* Sidebar */}
          <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
            <ClientSidebar />
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-[#0B1213]/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Main content */}
          <div className="flex-1 lg:ml-64">
            <main className="p-6 md:p-8">

              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-2xl md:text-3xl font-bold text-[#053876] font-syne">Messagerie</h1>
                <p className="text-[#25364A]/70 mt-1">Échangez avec le support OMDEVE</p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Conversations List */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(5,56,118,0.06)]"
                >
                  <div className="p-4 border-b border-[rgba(5,56,118,0.1)]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#25364A]/50" />
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[rgba(5,56,118,0.18)] text-[#0B1213] text-sm placeholder-[#25364A]/45 focus:outline-none focus:border-[#2AACB2] transition-all"
                      />
                    </div>
                  </div>
                  <div className="divide-y divide-[rgba(5,56,118,0.1)] max-h-[500px] overflow-y-auto">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv.id)}
                        className={`p-4 cursor-pointer transition-all hover:bg-[#F6F6F7] ${
                          selectedConversation === conv.id ? 'bg-[#0B74C1]/10 border-l-4 border-[#0B74C1]' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0B74C1] to-[#2AACB2] flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{conv.avatar}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-[#053876] truncate">{conv.subject}</h3>
                              <span className="text-xs text-[#25364A]/50">{conv.date}</span>
                            </div>
                            <p className="text-sm text-[#25364A]/70 truncate">{conv.lastMessage}</p>
                          </div>
                        </div>
                        {conv.unread > 0 && (
                          <div className="mt-2">
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#0B74C1] rounded-full">
                              {conv.unread}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-[rgba(5,56,118,0.1)]">
                    <button
                      onClick={() => setShowNewConversationModal(true)}
                      className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-[#0B74C1]/10 text-[#0B74C1] hover:bg-[#0B74C1]/15 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Nouvelle conversation
                    </button>
                  </div>
                </motion.div>

                {/* Messages Area */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-2 bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl overflow-hidden flex flex-col shadow-[0_10px_30px_rgba(5,56,118,0.06)]"
                  style={{ minHeight: '550px' }}
                >
                  {selectedConversation ? (
                    <>
                      {/* Messages Header */}
                      <div className="p-4 border-b border-[rgba(5,56,118,0.1)] bg-[#F6F6F7]">
                        <h3 className="font-semibold text-[#053876]">
                          {conversations.find(c => c.id === selectedConversation)?.subject}
                        </h3>
                      </div>

                      {/* Messages List */}
                      <div className="flex-1 p-4 space-y-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
                        {messages[selectedConversation]?.map((msg, idx) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: msg.sender === 'client' ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[75%] ${msg.sender === 'client' ? 'order-2' : 'order-1'}`}>
                              <div className={`p-3 rounded-2xl ${
                                msg.sender === 'client'
                                  ? 'bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] text-white'
                                  : 'bg-[#F6F6F7] text-[#25364A]'
                              }`}>
                                <p className="text-sm">{msg.message}</p>
                                {msg.attachment && (
                                  <div className="mt-2 flex items-center gap-2 text-xs opacity-80">
                                    <Paperclip className="w-3 h-3" />
                                    <span>{msg.attachment}</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-xs text-[#25364A]/50 mt-1">{msg.time}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t border-[rgba(5,56,118,0.1)] bg-[#F6F6F7]">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleFileUpload}
                            className="p-2 rounded-lg bg-white border border-[rgba(5,56,118,0.15)] text-[#25364A]/60 hover:bg-[#0B74C1]/10 hover:text-[#0B74C1] transition-all"
                          >
                            <Paperclip className="w-5 h-5" />
                          </button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={(e) => console.log('Fichier:', e.target.files[0])}
                          />
                          <input
                            type="text"
                            placeholder="Votre message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-1 px-4 py-2 rounded-xl bg-white border border-[rgba(5,56,118,0.18)] text-[#0B1213] placeholder-[#25364A]/45 focus:outline-none focus:border-[#2AACB2] transition-all"
                          />
                          <button
                            onClick={handleSendMessage}
                            className="p-2 rounded-lg bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white transition-all"
                          >
                            <Send className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <MessageSquare className="w-16 h-16 text-[#25364A]/30 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-[#053876]">Aucune conversation sélectionnée</h3>
                        <p className="text-[#25364A]/60 mt-1">Choisissez une conversation ou créez-en une nouvelle</p>
                        <button
                          onClick={() => setShowNewConversationModal(true)}
                          className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white transition-all shadow-[0_10px_28px_rgba(11,116,193,0.2)]"
                        >
                          Nouvelle conversation
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Modal Nouvelle Conversation */}
      <NewConversationModal
        isOpen={showNewConversationModal}
        onClose={() => setShowNewConversationModal(false)}
        onCreateConversation={handleCreateConversation}
      />
    </div>
  )
}

export default ClientMessagerie
