import { useState, useEffect, useRef } from 'react';
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
import { FaBell, FaCheck } from 'react-icons/fa';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Estados para notificações
  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      titulo: 'Novo agendamento',
      mensagem: 'Cliente Maria agendou para hoje às 14h',
      lida: false,
      horario: '10:30'
    },
    {
      id: 2,
      titulo: 'Agendamento aprovado',
      mensagem: 'Agendamento de João foi aprovado',
      lida: false,
      horario: '09:15'
    }
  ]);
  const [showNotificacoes, setShowNotificacoes] = useState(false);
  const notificacoesRef = useRef(null);

  // Fecha o dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificacoesRef.current && !notificacoesRef.current.contains(event.target)) {
        setShowNotificacoes(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const marcarComoLida = (id) => {
    setNotificacoes(notificacoes.map(notif => 
      notif.id === id ? { ...notif, lida: true } : notif
    ));
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes(notificacoes.map(notif => ({ ...notif, lida: true })));
  };

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
      {/* Header Mobile */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-primary text-white z-30 lg:hidden">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-primary-dark"
          >
            {isSidebarOpen ? (
              <HiOutlineX className="w-6 h-6" />
            ) : (
              <HiOutlineMenu className="w-6 h-6" />
            )}
          </button>
          <h1 className="text-xl font-semibold">Painel Admin</h1>
          
          {/* Notificações no Header Mobile */}
          <div className="relative" ref={notificacoesRef}>
            <button 
              onClick={() => setShowNotificacoes(!showNotificacoes)}
              className="relative p-2 rounded-md hover:bg-primary-dark"
            >
              <FaBell className="w-6 h-6" />
              {notificacoes.some(n => !n.lida) && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notificacoes.filter(n => !n.lida).length}
                </span>
              )}
            </button>

            {/* Dropdown de Notificações */}
            {showNotificacoes && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Notificações</h3>
                    <button 
                      onClick={marcarTodasComoLidas}
                      className="text-sm text-primary hover:text-primaryHover"
                    >
                      Marcar todas como lidas
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notificacoes.length > 0 ? (
                    notificacoes.map((notificacao) => (
                      <div 
                        key={notificacao.id} 
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                          !notificacao.lida ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => marcarComoLida(notificacao.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-sm text-gray-800">{notificacao.titulo}</h4>
                            <p className="text-sm text-gray-600">{notificacao.mensagem}</p>
                          </div>
                          {!notificacao.lida && (
                            <span className="text-xs text-primary">
                              <FaCheck />
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{notificacao.horario}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Nenhuma notificação
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay para mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-primary text-white transform transition-transform duration-300 ease-in-out z-30 lg:relative lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo/Título (visível apenas em desktop) */}
        <div className="p-6 hidden lg:block">
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
      <div className="flex-1 overflow-auto lg:pt-0 pt-16"> {/* Adicionado padding-top para mobile */}
        <div className="p-2 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
} 