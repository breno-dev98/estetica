import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-primary text-white w-64 min-h-screen ${isSidebarOpen ? '' : 'hidden'}`}>
        <div className="p-4">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-8">
          <Link
            to="/admin/dashboard"
            className="flex items-center px-6 py-3 hover:bg-primaryHover"
          >
            <FaHome className="mr-3" />
            Dashboard
          </Link>
          <Link
            to="/admin/agendamentos"
            className="flex items-center px-6 py-3 hover:bg-primaryHover"
          >
            <FaCalendarAlt className="mr-3" />
            Agendamentos
          </Link>
          <Link
            to="/admin/clientes"
            className="flex items-center px-6 py-3 hover:bg-primaryHover"
          >
            <FaUsers className="mr-3" />
            Clientes
          </Link>
          <Link
            to="/admin/configuracoes"
            className="flex items-center px-6 py-3 hover:bg-primaryHover"
          >
            <FaCog className="mr-3" />
            Configurações
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center px-6 py-3 hover:bg-primaryHover w-full text-left"
          >
            <FaSignOutAlt className="mr-3" />
            Sair
          </button>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 