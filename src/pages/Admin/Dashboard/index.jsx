import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaUsers, FaBell, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    agendamentosHoje: 0,
    agendamentosPendentes: 0,
    clientesTotal: 0,
    faturamentoMes: 0
  });

  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      titulo: 'Novo agendamento',
      mensagem: 'Cliente Maria agendou para hoje às 14h',
      lida: false
    },
    // Adicione mais notificações conforme necessário
  ]);

  const [agendamentosRecentes, setAgendamentosRecentes] = useState([
    {
      id: 1,
      cliente: 'Maria Silva',
      servico: 'Limpeza de Pele',
      data: '2024-03-20',
      hora: '14:00',
      status: 'pendente'
    },
    // Adicione mais agendamentos conforme necessário
  ]);

  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="relative">
          <FaBell className="text-2xl text-gray-600 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {notificacoes.filter(n => !n.lida).length}
          </span>
        </div>
      </div>

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
              <h3 className="text-2xl font-bold">R$ {stats.faturamentoMes}</h3>
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
                  <td className="px-6 py-4 whitespace-nowrap">{agendamento.data}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agendamento.hora}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      agendamento.status === 'pendente' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
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