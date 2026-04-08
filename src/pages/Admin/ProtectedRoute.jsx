// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('accessToken')
  const userRole = localStorage.getItem('userRole')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />
  }

  // Si children existe, les afficher, sinon afficher Outlet
  return children ? children : <Outlet />
}

export default ProtectedRoute