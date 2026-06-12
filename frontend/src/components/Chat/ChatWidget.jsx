import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Send, Bot, User, Loader2, RotateCcw,
  MessageSquare, ExternalLink, ChevronDown, Minimize2,
  Hammer, Wifi, Zap, Sparkles, Brain, Cpu,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

// ── Helpers ───────────────────────────────────────────────────────────────────

const getOrCreateSessionId = () => {
  let id = sessionStorage.getItem('omedev_assist_session')
  if (!id) {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
    sessionStorage.setItem('omedev_assist_session', id)
  }
  return id
}

const ACTION_ICONS = {
  devis_link:     Hammer,
  audit_link:     Sparkles,
  contact_link:   MessageSquare,
  portfolio_link: Hammer,
}

// ── Typing indicator ─────────────────────────────────────────────────────────

const TypingDots = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    {[0, 1, 2].map(i => (
      <motion.span
        key={i}
        className="w-2 h-2 rounded-full bg-blue-400"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
  </div>
)

// ── Single message bubble ─────────────────────────────────────────────────────

const MessageBubble = ({ msg }) => {
  const isBot = msg.role === 'assistant'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex gap-2.5 items-end ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mb-0.5 shadow">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}

      <div className={`max-w-[82%] ${isBot ? '' : 'order-first'}`}>
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isBot
              ? 'bg-white/10 border border-white/15 text-gray-100 rounded-tl-sm'
              : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-sm'
          }`}
        >
          {msg.content}
        </div>

        {/* Action button */}
        {msg.action && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-2"
          >
            <Link
              to={msg.action.url}
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white transition-all hover:scale-105 shadow-sm"
            >
              <ExternalLink className="w-3 h-3" />
              {msg.action.label}
            </Link>
          </motion.div>
        )}

        <p className="text-[10px] text-gray-500 mt-1 px-1">
          {new Date(msg.ts).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {!isBot && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center flex-shrink-0 mb-0.5 shadow">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </motion.div>
  )
}

// ── Welcome screen ────────────────────────────────────────────────────────────

const WelcomeScreen = ({ onSuggestion }) => {
  const suggestions = [
    { icon: Hammer,   text: 'Je veux un devis portail' },
    { icon: Sparkles, text: 'Infos sur un escalier métallique' },
    { icon: Zap,      text: 'Réserver un audit sécurité' },
    { icon: Wifi,     text: 'Solutions IT & réseau' },
  ]

  return (
    <div className="flex flex-col items-center justify-center h-full px-5 py-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 shadow-xl"
      >
        <Bot className="w-9 h-9 text-white" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <h3 className="text-white font-bold text-lg font-syne mb-1">Omedev Assist 🤖</h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-6 max-w-[220px]">
          Assistant commercial & technique disponible 24h/24. Comment puis-je vous aider ?
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="grid grid-cols-2 gap-2 w-full"
      >
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onSuggestion(s.text)}
            className="flex flex-col items-start gap-1.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left group"
          >
            <s.icon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span className="text-gray-300 text-xs leading-tight">{s.text}</span>
          </button>
        ))}
      </motion.div>
    </div>
  )
}

// ── Main Widget ───────────────────────────────────────────────────────────────

const ChatWidget = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [unread, setUnread] = useState(0)
  const [aiMode, setAiMode] = useState(null) // 'anthropic' | 'local' | null
  const [sessionId] = useState(() => getOrCreateSessionId())
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 200)
      setTimeout(scrollToBottom, 100)
    }
  }, [open, scrollToBottom])

  useEffect(() => {
    if (open) scrollToBottom()
  }, [messages, open, scrollToBottom])

  const sendMessage = useCallback(async (text) => {
    const msg = (text || input).trim()
    if (!msg || loading) return

    setInput('')
    const userMsg = { role: 'user', content: msg, ts: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await api.post('/assistant/chat', { message: msg, sessionId })
      if (res.data.mode) setAiMode(res.data.mode)
      const botMsg = {
        role: 'assistant',
        content: res.data.message,
        action: res.data.action || null,
        ts: Date.now(),
      }
      setMessages(prev => [...prev, botMsg])
      if (!open) setUnread(n => n + 1)
    } catch (err) {
      const errMsg = {
        role: 'assistant',
        content: "Désolé, une erreur s'est produite. Réessayez dans quelques secondes 🙏",
        action: null,
        ts: Date.now(),
      }
      setMessages(prev => [...prev, errMsg])
    } finally {
      setLoading(false)
    }
  }, [input, loading, sessionId, open])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleReset = async () => {
    try {
      await api.delete(`/assistant/session/${sessionId}`)
    } catch {}
    setMessages([])
    setAiMode(null)
    sessionStorage.removeItem('omedev_assist_session')
  }

  const hasMessages = messages.length > 0

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-4 sm:right-6 z-[9999] w-[340px] sm:w-[380px] h-[520px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            style={{
              background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
            }}
          >
            {/* Header */}
            <div
              className="flex-shrink-0 px-4 py-3 flex items-center justify-between border-b border-white/10"
              style={{ background: 'linear-gradient(90deg, rgba(37,99,235,0.25), rgba(79,70,229,0.25))' }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm font-syne leading-none">Omedev Assist</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <p className="text-emerald-400 text-[10px]">● En ligne</p>
                    {aiMode && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`inline-flex items-center gap-0.5 text-[9px] font-medium px-1.5 py-0.5 rounded-full border ${
                          aiMode === 'anthropic'
                            ? 'bg-violet-500/15 border-violet-500/30 text-violet-300'
                            : 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300'
                        }`}
                      >
                        {aiMode === 'anthropic'
                          ? <><Brain className="w-2.5 h-2.5" /> Claude</>
                          : <><Cpu className="w-2.5 h-2.5" /> Local AI</>
                        }
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {hasMessages && (
                  <button
                    onClick={handleReset}
                    title="Nouvelle conversation"
                    className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/10 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/10 transition-all"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
              {!hasMessages ? (
                <WelcomeScreen onSuggestion={(text) => sendMessage(text)} />
              ) : (
                <>
                  {messages.map((msg, idx) => (
                    <MessageBubble key={idx} msg={msg} />
                  ))}
                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-end gap-2.5"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/10 border border-white/15 rounded-2xl rounded-tl-sm">
                        <TypingDots />
                      </div>
                    </motion.div>
                  )}
                  <div ref={bottomRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 px-3 py-3 border-t border-white/10 bg-white/3">
              <div className="flex items-end gap-2 bg-white/5 border border-white/15 rounded-xl px-3 py-2 focus-within:border-blue-500/50 transition-colors">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Écrivez votre message…"
                  className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 resize-none focus:outline-none max-h-24 leading-relaxed"
                  style={{ scrollbarWidth: 'none' }}
                  disabled={loading}
                  onInput={(e) => {
                    e.target.style.height = 'auto'
                    e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px'
                  }}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 shadow"
                >
                  {loading
                    ? <Loader2 className="w-4 h-4 text-white animate-spin" />
                    : <Send className="w-4 h-4 text-white" />
                  }
                </button>
              </div>
              <p className="text-center text-[9px] text-gray-600 mt-1.5">
                Omedev Assist • Réponses indicatives — devis officiel sur demande
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-4 sm:right-6 z-[9998] w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
        aria-label="Ouvrir l'assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {!open && unread > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-slate-950"
            >
              {unread}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <motion.span
            className="absolute inset-0 rounded-2xl"
            style={{ border: '2px solid rgba(99, 102, 241, 0.6)' }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.button>
    </>
  )
}

export default ChatWidget
