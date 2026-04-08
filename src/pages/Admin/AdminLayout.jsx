// ==================== AdminLayout.jsx ====================
import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  FolderKanban, 
  FileText, 
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  Shield,
  MessageSquare,
  BarChart3,
  BookOpen
} from 'lucide-react'

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

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [userName, setUserName] = useState('')
  const location = useLocation()
  
  useEffect(() => {
    // Vérifier le rôle de l'utilisateur connecté
    const role = localStorage.getItem('userRole')
    const name = localStorage.getItem('userName')
    setUserRole(role)
    setUserName(name || 'Administrateur')
  }, [])
  
  // Vérifier si l'utilisateur est admin
  const isAuthenticated = localStorage.getItem('accessToken')
  const isAdminUser = userRole === 'super_admin' || userRole === 'admin'
  
  if (!isAuthenticated || !isAdminUser) {
    return <Navigate to="/login" replace />
  }

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', allowedRoles: ['super_admin', 'admin'] },
    { path: '/admin/clients', icon: Users, label: 'Clients & rôles', allowedRoles: ['super_admin', 'admin'] },
    { path: '/admin/crm', icon: TrendingUp, label: 'CRM - Pipeline', allowedRoles: ['super_admin', 'admin'] },
    { path: '/admin/projets', icon: FolderKanban, label: 'Projets & tickets', allowedRoles: ['super_admin', 'admin'] },
    { path: '/admin/devis', icon: FileText, label: 'Gestion devis', allowedRoles: ['super_admin', 'admin'] },
    { path: '/admin/blog', icon: BookOpen, label: 'Blog & configuration', allowedRoles: ['super_admin', 'admin'] },
  ]

  // Filtrer les items selon le rôle
  const filteredNavItems = navItems.filter(item => 
    item.allowedRoles.includes(userRole)
  )

  const isActive = (path) => location.pathname === path

  // Obtenir les initiales pour l'avatar
  const getInitials = () => {
    if (userName) {
      return userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    }
    return 'AD'
  }

  // Obtenir le label du rôle
  const getRoleLabel = () => {
    if (userRole === 'super_admin') return 'Super Admin'
    if (userRole === 'admin') return 'Administrateur'
    return 'Admin'
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    window.location.href = '/login'
  }

  return (
    <>
      <style>{globalStyles}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        
        {/* Header */}
        <header className="bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-white hover:text-blue-400 transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AD</span>
                </div>
                <span className="font-syne font-bold text-white hidden sm:block">OMDEVE Admin</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">{userName}</p>
                  <p className="text-xs text-gray-400">{getRoleLabel()}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">{getInitials()}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <aside className={`fixed top-0 left-0 h-full w-64 bg-white/10 backdrop-blur-md border-r border-white/10 z-40 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">AD</span>
              </div>
              <span className="font-syne font-bold text-white">OMDEVE Admin</span>
            </div>
            
            <nav className="space-y-2">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive(item.path)
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive(item.path) && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              ))}
            </nav>
            
            <div className="absolute bottom-6 left-6 right-6">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Déconnexion</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-35 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <div className="lg:ml-64">
          <main className="p-6 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminLayout