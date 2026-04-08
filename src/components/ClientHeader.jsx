import { Bell, Search, Menu } from 'lucide-react'
import { useState } from 'react'

const ClientHeader = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, title: 'Devis approuvé', message: 'Votre devis #DEV-123456 a été approuvé', time: 'Il y a 2 heures', read: false },
    { id: 2, title: 'Projet en cours', message: 'Le projet "Site E-commerce" est à 75%', time: 'Hier', read: true },
    { id: 3, title: 'Nouveau message', message: 'Vous avez reçu un message du support', time: 'Hier', read: false },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu button */}
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
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}>
                      <p className="font-medium text-sm">{notif.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t">
                  <button className="text-sm text-primary-600">Voir toutes les notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* User avatar */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Jean Dupont</p>
              <p className="text-xs text-gray-500">Client depuis janv. 2026</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ClientHeader