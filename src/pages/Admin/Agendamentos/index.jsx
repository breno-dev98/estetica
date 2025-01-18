import { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([
    {
      id: 1,
      cliente: 'Maria Silva',
      servico: 'Limpeza de Pele',
      data: '2024-03-20',
      hora: '14:00',
      status: 'pendente',
      endereco: 'Rua A, 123 - Centro',
      pagamento: 'PIX'
    },
    // Adicione mais agendamentos de exemplo
  ]);

  const [filtroStatus, setFiltroStatus] = useState('todos');

  const handleAprovar = (id) => {
    setAgendamentos(agendamentos.map(agendamento => 
      agendamento.id === id ? {...agendamento, status: 'aprovado'} : agendamento
    ));
  };

  const handleRecusar = (id) => {
    setAgendamentos(agendamentos.map(agendamento => 
      agendamento.id === id ? {...agendamento, status: 'recusado'} : agendamento
    ));
  };

  const handleExcluir = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== id));
    }
  };

  const agendamentosFiltrados = agendamentos.filter(agendamento => 
    filtroStatus === 'todos' ? true : agendamento.status === filtroStatus
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Agendamentos</h1>
        <div className="flex gap-4">
          <select 
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="border rounded-md p-2"
          >
            <option value="todos">Todos</option>
            <option value="pendente">Pendentes</option>
            <option value="aprovado">Aprovados</option>
            <option value="recusado">Recusados</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serviço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {agendamentosFiltrados.map((agendamento) => (
              <tr key={agendamento.id}>
                <td className="px-6 py-4">{agendamento.cliente}</td>
                <td className="px-6 py-4">{agendamento.servico}</td>
                <td className="px-6 py-4">{agendamento.data}</td>
                <td className="px-6 py-4">{agendamento.hora}</td>
                <td className="px-6 py-4">
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
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {agendamento.status === 'pendente' && (
                      <>
                        <button 
                          onClick={() => handleAprovar(agendamento.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <FaCheck />
                        </button>
                        <button 
                          onClick={() => handleRecusar(agendamento.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => handleExcluir(agendamento.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Agendamentos; 