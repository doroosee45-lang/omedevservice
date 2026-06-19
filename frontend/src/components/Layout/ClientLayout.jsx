import { Outlet, Navigate } from 'react-router-dom'

/**
 * Route parente pour l'espace client.
 * Gère l'authentification et la redirection des admins.
 * Le header et la sidebar sont fournis par chaque page via ClientHeader + ClientSidebar.
 */
const ClientLayout = () => {
  const token    = localStorage.getItem('accessToken')
  const userRole = localStorage.getItem('userRole')

  if (!token) return <Navigate to="/login" replace />

  if (userRole === 'super_admin' || userRole === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  }

  return <Outlet />
}

export default ClientLayout
