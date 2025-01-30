import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import {
  HiOutlineUsers,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineClipboardCheck
} from 'react-icons/hi';

export function Dashboard() {
  const [stats, setStats] = useState({
    totalAgendamentos: 0,
    agendamentosHoje: 0,
    faturamentoMes: 0,
    clientesNovos: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await adminService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    }
  };

  const cards = [
    {
      title: 'Total de Agendamentos',
      value: stats.totalAgendamentos,
      icon: <HiOutlineCalendar className="w-8 h-8 text-primary" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Agendamentos Hoje',
      value: stats.agendamentosHoje,
      icon: <HiOutlineClipboardCheck className="w-8 h-8 text-green-600" />,
      color: 'bg-green-50'
    },
    {
      title: 'Faturamento do Mês',
      value: `R$ ${stats.faturamentoMes.toFixed(2)}`,
      icon: <HiOutlineCurrencyDollar className="w-8 h-8 text-yellow-600" />,
      color: 'bg-yellow-50'
    },
    {
      title: 'Novos Clientes',
      value: stats.clientesNovos,
      icon: <HiOutlineUsers className="w-8 h-8 text-purple-600" />,
      color: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} p-6 rounded-lg shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {card.value}
                </p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Aqui podemos adicionar gráficos e outras visualizações */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Agendamentos por Serviço</h3>
          {/* Adicionar gráfico de pizza ou barras */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Faturamento por Período</h3>
          {/* Adicionar gráfico de linha */}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Próximos Agendamentos</h3>
        {/* Lista dos próximos agendamentos */}
      </div>
    </div>
  );
} 