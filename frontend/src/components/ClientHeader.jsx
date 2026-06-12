import { Bell, Search, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { tickets as ticketsApi } from '../services/api'

const ClientHeader = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([])
  const dropdownRef = useRef(null)

  const userName = localStorage.getItem('userName') || 'Utilisateur'
  const userEmail = localStorage.getItem('userEmail') || ''
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  useEffect(() => {
    // Charge les tickets récents comme notifications
    ticketsApi.getMyTickets()
      .then(res => {
        const items = (res.data || []).slice(0, 5).map(t => ({
          id: t._id,
          title: t.subject || t.title || 'Ticket support',
          message: t.lastMessage || t.description || 'Nouveau message reçu',
          time: t.updatedAt ? new Date(t.updatedAt).toLocaleDateString('fr-FR') : '—',
          read: t.status !== 'open',
        }))
        setNotifications(items)
      })
      .catch(() => {
        // Pas connecté ou pas de tickets — on garde le tableau vide silencieusement
      })
  }, [])

  // Fermer le dropdown si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-4 py-2 max-w-md flex-1 mx-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent ml-3 outline-none flex-1 text-sm"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">{unreadCount} non lues</span>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">Aucune notification</div>
                  ) : notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b last:border-0 hover:bg-gray-50 cursor-pointer transition-colors ${!notif.read ? 'bg-blue-50' : ''}`}
                    >
                      {!notif.read && <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 mb-0.5" />}
                      <p className="font-medium text-sm text-gray-800">{notif.title}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-1.5">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t">
                  <a href="/client/messagerie" className="text-sm text-blue-600 hover:underline">
                    Voir tous les messages →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* User avatar */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {initials || '?'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800">{userName}</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ClientHeader
