import { Navigate } from 'react-router-dom'

/**
 * Protège une route selon le token et le rôle attendu.
 *
 * Usage dans App.jsx :
 *   <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
 *   <Route path="/client/dashboard" element={<ProtectedRoute role="client"><ClientDashboard /></ProtectedRoute>} />
 *
 * @param {string} role - 'admin' | 'client' | undefined (juste connecté)
 */
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('accessToken')
  const userRole = localStorage.getItem('userRole')

  // Pas connecté → login
  if (!token) return <Navigate to="/login" replace />

  // Vérifie le rôle si précisé
  if (role === 'admin' && userRole !== 'super_admin' && userRole !== 'admin') {
    return <Navigate to="/client/dashboard" replace />
  }

  if (role === 'client' && (userRole === 'super_admin' || userRole === 'admin')) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return children
}

export default ProtectedRoute