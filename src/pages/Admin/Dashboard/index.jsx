import { useState, useEffect, useRef } from 'react';
import { FaCalendarAlt, FaUsers, FaBell, FaChartLine, FaCheck } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    agendamentosHoje: 2,
    agendamentosPendentes: 1,
    clientesTotal: 2,
    faturamentoMes: 250.00
  });

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
      {/* Cabeçalho com Notificações Dropdown */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="relative" ref={notificacoesRef}>
          <button 
            onClick={() => setShowNotificacoes(!showNotificacoes)}
            className="relative"
          >
            <FaBell className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800" />
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
                  <h3 className="font-semibold">Notificações</h3>
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
                          <h4 className="font-semibold text-sm">{notificacao.titulo}</h4>
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