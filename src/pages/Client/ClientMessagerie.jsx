// ==================== ClientMessagerie.jsx ====================
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    font-family: 'DM Sans', sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    overflow-x: hidden;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    70% { transform: scale(1.3); opacity: 0; }
    100% { transform: scale(0.8); opacity: 0; }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
`;

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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Nouvelle conversation</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Sujet *</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex: Demande d'information, Support technique..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Message *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              placeholder="Décrivez votre demande..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 text-gray-400 hover:bg-white/20 transition"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={!subject.trim() || !message.trim() || isSubmitting}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

  const [conversations, setConversations] = useState([
    { id: 1, subject: 'Devis DEV-001', lastMessage: 'Bonjour, je vous confirme la réception de votre devis.', date: 'Il y a 2h', unread: 2, avatar: 'S' },
    { id: 2, subject: 'Projet Site E-commerce', lastMessage: 'Le développement front-end avance bien.', date: 'Hier', unread: 0, avatar: 'T' },
    { id: 3, subject: 'Support technique', lastMessage: 'Votre problème a été résolu.', date: 'Il y a 3j', unread: 0, avatar: 'S' },
  ])

  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: 'client', message: 'Bonjour, pouvez-vous me faire un devis pour un site e-commerce ?', time: '10:30', date: '15/04/2026' },
      { id: 2, sender: 'support', message: 'Bonjour, voici le devis demandé. N\'hésitez pas si vous avez des questions.', time: '10:45', date: '15/04/2026', attachment: 'devis.pdf' },
      { id: 3, sender: 'client', message: 'Merci, je vais étudier cela.', time: '11:00', date: '15/04/2026' },
    ],
    2: [
      { id: 1, sender: 'support', message: 'Bonjour, le projet Site E-commerce a démarré. La maquette est en cours.', time: '09:00', date: '14/04/2026' },
      { id: 2, sender: 'client', message: 'Super, merci pour l\'information !', time: '09:30', date: '14/04/2026' },
    ],
    3: [
      { id: 1, sender: 'client', message: 'Bonjour, j\'ai un problème avec mon réseau.', time: '14:00', date: '12/04/2026' },
      { id: 2, sender: 'support', message: 'Pouvez-vous décrire le problème plus précisément ?', time: '14:15', date: '12/04/2026' },
      { id: 3, sender: 'client', message: 'La connexion est très lente depuis ce matin.', time: '14:20', date: '12/04/2026' },
      { id: 4, sender: 'support', message: 'Nous avons identifié le problème. C\'est résolu.', time: '15:00', date: '12/04/2026' },
    ],
  })

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const newMsg = {
        id: messages[selectedConversation].length + 1,
        sender: 'client',
        message: newMessage,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString('fr-FR')
      }
      
      setMessages({
        ...messages,
        [selectedConversation]: [...messages[selectedConversation], newMsg]
      })
      
      // Mettre à jour le dernier message dans la liste des conversations
      setConversations(conversations.map(conv => 
        conv.id === selectedConversation 
          ? { ...conv, lastMessage: newMessage, date: 'À l\'instant' }
          : conv
      ))
      
      setNewMessage('')
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
    <>
      <style>{globalStyles}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        
        {/* Header */}
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
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
            <main className="p-6 md:p-8">
              
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Messagerie</h1>
                <p className="text-gray-400 mt-1">Échangez avec le support OMDEVE</p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Conversations List */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-white/10">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="divide-y divide-white/10 max-h-[500px] overflow-y-auto">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv.id)}
                        className={`p-4 cursor-pointer transition-all hover:bg-white/10 ${
                          selectedConversation === conv.id ? 'bg-blue-500/20 border-l-4 border-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{conv.avatar}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-white truncate">{conv.subject}</h3>
                              <span className="text-xs text-gray-500">{conv.date}</span>
                            </div>
                            <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                          </div>
                        </div>
                        {conv.unread > 0 && (
                          <div className="mt-2">
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full">
                              {conv.unread}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-white/10">
                    <button
                      onClick={() => setShowNewConversationModal(true)}
                      className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
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
                  className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden flex flex-col"
                  style={{ minHeight: '550px' }}
                >
                  {selectedConversation ? (
                    <>
                      {/* Messages Header */}
                      <div className="p-4 border-b border-white/10 bg-white/5">
                        <h3 className="font-semibold text-white">
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
                                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                                  : 'bg-white/10 text-gray-300'
                              }`}>
                                <p className="text-sm">{msg.message}</p>
                                {msg.attachment && (
                                  <div className="mt-2 flex items-center gap-2 text-xs opacity-80">
                                    <Paperclip className="w-3 h-3" />
                                    <span>{msg.attachment}</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t border-white/10 bg-white/5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleFileUpload}
                            className="p-2 rounded-lg bg-white/10 text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-all"
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
                            className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                          />
                          <button
                            onClick={handleSendMessage}
                            className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all"
                          >
                            <Send className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-white">Aucune conversation sélectionnée</h3>
                        <p className="text-gray-500 mt-1">Choisissez une conversation ou créez-en une nouvelle</p>
                        <button
                          onClick={() => setShowNewConversationModal(true)}
                          className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-105 transition-all"
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
    </>
  )
}

export default ClientMessagerie