import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgendamentosAdmin } from '../../components/Admin/AgendamentosAdmin';
import { AnamneseAdmin } from '../../components/Admin/AnamneseAdmin';
import { ServicosAdmin } from '../../components/Admin/ServicosAdmin';
import { Dashboard } from '../../components/Admin/Dashboard';
import { HiOutlineClipboardList, HiOutlineDocumentText, HiOutlineCog, HiOutlineChartPie } from 'react-icons/hi';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar autenticação
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <HiOutlineChartPie className="w-6 h-6" />
    },
    {
      id: 'agendamentos',
      label: 'Agendamentos',
      icon: <HiOutlineClipboardList className="w-6 h-6" />
    },
    {
      id: 'anamnese',
      label: 'Anamneses',
      icon: <HiOutlineDocumentText className="w-6 h-6" />
    },
    {
      id: 'servicos',
      label: 'Serviços',
      icon: <HiOutlineCog className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-primary text-white">
            <h1 className="text-xl font-bold">Painel Admin</h1>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={() => {
                localStorage.removeItem('admin_token');
                navigate('/admin/login');
              }}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'agendamentos' && <AgendamentosAdmin />}
        {activeTab === 'anamnese' && <AnamneseAdmin />}
        {activeTab === 'servicos' && <ServicosAdmin />}
      </div>
    </div>
  );
} 