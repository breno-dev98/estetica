import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  HiOutlineViewGrid,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineCog,
  HiOutlineDocumentText,
  HiOutlineClipboard
} from 'react-icons/hi';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-white hover:bg-primary-dark transition-colors ${
                location.pathname === item.path ? 'bg-primary-dark' : ''
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-white hover:bg-primary-dark rounded transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
} 