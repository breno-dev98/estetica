import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const isAuthenticated = localStorage.getItem('admin_token');

  if (!isAuthenticated) {
    // Redireciona para o login se não estiver autenticado
    return <Navigate to="/admin/login" replace />;
  }

  return children;
} 