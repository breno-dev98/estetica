import { Navigate } from 'react-router-dom';

export default function Admin() {
  const isAuthenticated = localStorage.getItem('admin_token');

  // Se estiver autenticado, redireciona para o dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Se não estiver autenticado, redireciona para o login
  return <Navigate to="/admin/login" replace />;
} 