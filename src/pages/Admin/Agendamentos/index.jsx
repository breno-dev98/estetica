import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { HiX, HiPencil } from 'react-icons/hi';

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);

  useEffect(() => {
    // Carregar agendamentos do localStorage
    const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAgendamentos(savedAppointments);
  }, []);

  const handleAprovar = (id) => {
    const updatedAgendamentos = agendamentos.map(agendamento => 
      agendamento.id === id ? {...agendamento, status: 'aprovado'} : agendamento
    );
    setAgendamentos(updatedAgendamentos);
    localStorage.setItem('appointments', JSON.stringify(updatedAgendamentos));
  };

  const handleRecusar = (id) => {
    const updatedAgendamentos = agendamentos.map(agendamento => 
      agendamento.id === id ? {...agendamento, status: 'recusado'} : agendamento
    );
    setAgendamentos(updatedAgendamentos);
    localStorage.setItem('appointments', JSON.stringify(updatedAgendamentos));
  };

  const handleExcluir = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      const updatedAgendamentos = agendamentos.filter(agendamento => agendamento.id !== id);
      setAgendamentos(updatedAgendamentos);
      localStorage.setItem('appointments', JSON.stringify(updatedAgendamentos));
    }
  };

  const handleRowClick = (agendamento) => {
    setSelectedAgendamento(agendamento);
    setShowDrawer(true);
  };

  const AgendamentoDrawer = ({ agendamento, onClose }) => {
    if (!agendamento) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
        <div 
          className="fixed inset-x-0 bottom-0 transform transition-transform duration-300 ease-in-out bg-white rounded-t-xl shadow-xl"
          style={{ maxHeight: '85vh' }}
        >
          {/* Cabeçalho do Drawer */}
          <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between rounded-t-xl">
            <h3 className="text-lg font-semibold text-gray-800">Detalhes do Agendamento</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <HiX className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Conteúdo do Drawer */}
          <div className="overflow-y-auto p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Cliente</label>
              <p className="mt-1 text-gray-900">{agendamento.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Serviços</label>
              <p className="mt-1 text-gray-900">
                {Array.isArray(agendamento.servicos) 
                  ? agendamento.servicos.join(', ')
                  : agendamento.servicos}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Data</label>
                <p className="mt-1 text-gray-900">{agendamento.data}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Horário</label>
                <p className="mt-1 text-gray-900">{agendamento.hora}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Valor</label>
              <p className="mt-1 text-gray-900">{agendamento.preco}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Método de Pagamento</label>
              <p className="mt-1 text-gray-900">{agendamento.metodo}</p>
            </div>

            {agendamento.tipoAtendimento === 'domiciliar' && agendamento.endereco && (
              <div>
                <label className="block text-sm font-medium text-gray-500">Endereço</label>
                <p className="mt-1 text-gray-900">
                  {`${agendamento.endereco.logradouro}, ${agendamento.endereco.numero}`}
                  {agendamento.endereco.complemento && `, ${agendamento.endereco.complemento}`}
                  <br />
                  {agendamento.endereco.bairro}
                  <br />
                  {`${agendamento.endereco.cidade} - ${agendamento.endereco.uf}`}
                </p>
              </div>
            )}
          </div>

          {/* Ações do Drawer */}
          <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end space-x-3">
            {agendamento.status === 'pendente' && (
              <>
                <button
                  onClick={() => {
                    handleAprovar(agendamento.id);
                    onClose();
                  }}
                  className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-md transition-colors flex items-center"
                >
                  <FaCheck className="w-5 h-5 mr-2" />
                  Aprovar
                </button>
                <button
                  onClick={() => {
                    handleRecusar(agendamento.id);
                    onClose();
                  }}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center"
                >
                  <FaTimes className="w-5 h-5 mr-2" />
                  Recusar
                </button>
              </>
            )}
            <button
              onClick={() => {
                handleExcluir(agendamento.id);
                onClose();
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center"
            >
              <FaTrash className="w-5 h-5 mr-2" />
              Excluir
            </button>
          </div>
        </div>
      </div>
    );
  };

  const agendamentosFiltrados = agendamentos.filter(agendamento => 
    filtroStatus === 'todos' ? true : agendamento.status === filtroStatus
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gerenciar Agendamentos</h1>
          <select 
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="border rounded-md p-2 w-full sm:w-auto"
          >
            <option value="todos">Todos</option>
            <option value="pendente">Pendentes</option>
            <option value="aprovado">Aprovados</option>
            <option value="recusado">Recusados</option>
          </select>
        </div>

        {/* Tabela para desktop */}
        <div className="hidden md:block bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serviço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Endereço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pagamento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {agendamentosFiltrados.map((agendamento) => (
                <tr 
                  key={agendamento.id}
                  onClick={() => handleRowClick(agendamento)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      {agendamento.status === 'pendente' && (
                        <>
                          <button 
                            onClick={() => handleAprovar(agendamento.id)}
                            className="text-green-600 hover:text-green-800"
                            title="Aprovar"
                          >
                            <FaCheck />
                          </button>
                          <button 
                            onClick={() => handleRecusar(agendamento.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Recusar"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleExcluir(agendamento.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Excluir"
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

        {/* Lista para mobile */}
        <div className="md:hidden space-y-4">
          {agendamentosFiltrados.map((agendamento) => (
            <div
              key={agendamento.id}
              onClick={() => handleRowClick(agendamento)}
              className="bg-white p-4 rounded-lg shadow-md space-y-2 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{agendamento.cliente}</h3>
                  <p className="text-sm text-gray-500">{agendamento.servico}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  agendamento.status === 'pendente' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : agendamento.status === 'aprovado'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {agendamento.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {agendamento.data} às {agendamento.hora}
              </div>
              <div className="text-sm font-medium">{agendamento.preco}</div>
            </div>
          ))}
        </div>

        {agendamentosFiltrados.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum agendamento encontrado.
          </div>
        )}

        {/* Drawer apenas para mobile */}
        {showDrawer && (
          <div className="lg:hidden">
            <AgendamentoDrawer
              agendamento={selectedAgendamento}
              onClose={() => {
                setShowDrawer(false);
                setSelectedAgendamento(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Agendamentos; 