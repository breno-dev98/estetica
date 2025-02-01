import { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import { FaCalendarAlt, FaUsers, FaChartLine } from 'react-icons/fa';
// Importar biblioteca de gráficos (ex: Recharts)

const formatarEndereco = (endereco) => {
  if (!endereco) return '-';
  if (typeof endereco === 'object') {
    return `${endereco.logradouro}, ${endereco.numero}${endereco.complemento ? `, ${endereco.complemento}` : ''} - ${endereco.bairro}, ${endereco.cidade}/${endereco.uf}`;
  }
  return endereco; // caso seja uma string
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    agendamentosHoje: 0,
    agendamentosPendentes: 0,
    clientesTotal: 0,
    faturamentoMes: 0,
    agendamentosPorServico: [],
    faturamentoPorPeriodo: []
  });

  const [agendamentosRecentes, setAgendamentosRecentes] = useState([]);

  useEffect(() => {
    // Carrega os dados inicialmente
    loadDashboardData();

    // Atualiza os dados a cada 1 minuto
    const interval = setInterval(loadDashboardData, 60000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      const dashboardStats = adminService.getDashboardStats();
      setStats(dashboardStats);
      
      const recentAppointments = adminService.getRecentAppointments();
      setAgendamentosRecentes(recentAppointments);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const formatarServicos = (servicos) => {
    if (!servicos) return '-';
    if (Array.isArray(servicos)) {
      return servicos.join(', ');
    }
    return servicos;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Agendamentos Hoje</p>
              <h3 className="text-2xl font-bold">{stats.agendamentosHoje}</h3>
            </div>
            <FaCalendarAlt className="text-primary text-3xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Agendamentos Pendentes</p>
              <h3 className="text-2xl font-bold">{stats.agendamentosPendentes}</h3>
            </div>
            <FaCalendarAlt className="text-yellow-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total de Clientes</p>
              <h3 className="text-2xl font-bold">{stats.clientesTotal}</h3>
            </div>
            <FaUsers className="text-blue-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Faturamento do Mês</p>
              <h3 className="text-2xl font-bold">R$ {stats.faturamentoMes.toFixed(2)}</h3>
            </div>
            <FaChartLine className="text-green-500 text-3xl" />
          </div>
        </div>
      </div>

      {/* Novos gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Agendamentos por Serviço</h3>
          {/* Implementar gráfico de pizza */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Faturamento por Período</h3>
          {/* Implementar gráfico de linha */}
        </div>
      </div>

      {/* Agendamentos Recentes */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serviços</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Endereço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Método de Pagamento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {agendamentosRecentes.map((agendamento) => (
              <tr key={agendamento.id}>
                <td className="px-6 py-4 whitespace-nowrap">{agendamento.cliente}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatarServicos(agendamento.servicos)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{agendamento.preco}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatarEndereco(agendamento.endereco)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{agendamento.metodo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{agendamento.data}</td>
                <td className="px-6 py-4 whitespace-nowrap">{agendamento.hora}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    agendamento.status === 'pendente' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : agendamento.status === 'aprovado'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {agendamento.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard; 