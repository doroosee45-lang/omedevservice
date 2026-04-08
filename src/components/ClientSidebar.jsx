import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  History,
  User,
  CreditCard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { useState, useEffect } from 'react';

const ClientSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userName, setUserName] = useState('Client');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Récupérer le nom depuis localStorage
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    
    if (name && name !== 'null') {
      setUserName(name);
    }
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const menuItems = [
    { path: '/client/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { path: '/client/demandes', icon: FileText, label: 'Mes demandes' },
    { path: '/client/projets', icon: FolderKanban, label: 'Mes projets' },
    { path: '/client/historique', icon: History, label: 'Historique' },
    { path: '/client/profil', icon: User, label: 'Mon profil' },
    { path: '/client/paiements', icon: CreditCard, label: 'Paiements' },
    { path: '/client/messagerie', icon: MessageSquare, label: 'Messagerie' },
  ];

  const handleLogout = () => {
    // Supprimer les données de session
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Rediriger vers login
    window.location.href = '/login';
  };

  // Initiales pour l'avatar
  const getInitials = () => {
    if (userName === 'Client') return 'CL';
    const parts = userName.split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <aside
      className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col
        ${isCollapsed ? 'w-20' : 'w-64'} 
        min-h-screen sticky top-0 overflow-hidden`}
    >
      {/* Logo + Bouton collapse */}
      <div className={`p-6 border-b border-gray-700 flex items-center justify-between ${isCollapsed ? 'flex-col gap-4' : ''}`}>
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-sm">OM</span>
            </div>
            <span className="font-bold text-white text-lg">OMDEVE</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white text-sm">OM</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          title={isCollapsed ? 'Agrandir' : 'Réduire'}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} 
               px-4 py-3 rounded-xl mb-1.5 transition-all duration-200 group
               ${isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
               }`
            }
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Déconnexion */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} 
                     w-full px-4 py-3 rounded-xl text-gray-300 
                     hover:bg-red-600 hover:text-white transition-all duration-200`}
          title={isCollapsed ? 'Déconnexion' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Déconnexion</span>}
        </button>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-700 bg-gray-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">{getInitials()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{userName}</p>
              <p className="text-xs text-gray-400 truncate">{userEmail || 'client@omdeve.com'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Mini user info pour mode collapsed */}
      {isCollapsed && (
        <div className="p-4 border-t border-gray-700 flex justify-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
    </aside>
  );
};

export default ClientSidebar;