import { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  HiOutlineViewGrid,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineCog,
  HiOutlineDocumentText,
  HiOutlineClipboard,
  HiOutlineMenu,
  HiOutlineX
} from 'react-icons/hi';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: <HiOutlineViewGrid className="w-6 h-6" />
    },
    {
      path: '/admin/agendamentos',
      name: 'Agendamentos',
      icon: <HiOutlineCalendar className="w-6 h-6" />
    },
    {
      path: '/admin/clientes',
      name: 'Clientes',
      icon: <HiOutlineUsers className="w-6 h-6" />
    },
    {
      path: '/admin/anamneses',
      name: 'Anamneses',
      icon: <HiOutlineDocumentText className="w-6 h-6" />
    },
    {
      path: '/admin/servicos',
      name: 'Serviços',
      icon: <HiOutlineClipboard className="w-6 h-6" />
    },
    {
      path: '/admin/configuracoes',
      name: 'Configurações',
      icon: <HiOutlineCog className="w-6 h-6" />
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Overlay para mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Botão do menu mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-30 lg:hidden bg-primary text-white p-2 rounded-md"
      >
        {isSidebarOpen ? (
          <HiOutlineX className="w-6 h-6" />
        ) : (
          <HiOutlineMenu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-primary text-white transform transition-transform duration-300 ease-in-out z-30 lg:relative lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-8 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary-dark text-white'
                  : 'text-white hover:bg-primary-dark'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-white hover:bg-primary-dark rounded-lg transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-auto">
        <div className="p-2 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
} 