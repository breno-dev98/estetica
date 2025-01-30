import { useState } from 'react';
import { FaCalendarAlt, FaUsers, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    agendamentosHoje: 2,
    agendamentosPendentes: 1,
    clientesTotal: 2,
    faturamentoMes: 250.00
  });

  const [agendamentosRecentes, setAgendamentosRecentes] = useState([
    {
      id: 1,
      cliente: 'Maria Silva',
      servico: 'Limpeza de Pele',
      preco: 'R$ 100,00',
      data: '2024-03-20',
      hora: '14:00',
      status: 'pendente',
      endereco: 'Rua A, 123 - Centro',
      pagamento: 'PIX'
    },
    {
      id: 2,
      cliente: 'João Santos',
      servico: 'Massagem Relaxante',
      preco: 'R$ 150,00',
      data: '2024-03-21',
      hora: '10:00',
      status: 'aprovado',
      endereco: 'Av. B, 456 - Bairro Novo',
      pagamento: 'Crédito'
    }
  ]);

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

      {/* Agendamentos Recentes */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Agendamentos Recentes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serviço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Endereço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pagamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agendamentosRecentes.map((agendamento) => (
                <tr key={agendamento.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{agendamento.cliente}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agendamento.servico}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agendamento.preco}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agendamento.endereco}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agendamento.pagamento}</td>
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
    </div>
  );
};

export default Dashboard; 