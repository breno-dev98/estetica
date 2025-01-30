import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { HiPlus, HiPencil, HiTrash, HiEye, HiX } from 'react-icons/hi';

export function AgendamentosAdmin() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    loadAgendamentos();
  }, []);

  const loadAgendamentos = async () => {
    try {
      const data = await adminService.getAgendamentos();
      setAgendamentos(data || []);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
      setAgendamentos([]);
    } finally {
      setLoading(false);
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Cliente</label>
                <p className="mt-1 text-gray-900">{agendamento.cliente}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Status</label>
                <p className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${agendamento.status === 'confirmado' ? 'bg-green-100 text-green-800' :
                      agendamento.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                    {agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1)}
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Data</label>
                <p className="mt-1 text-gray-900">{new Date(agendamento.data).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Horário</label>
                <p className="mt-1 text-gray-900">{agendamento.hora}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Serviços</label>
              <div className="mt-1 space-y-1">
                {agendamento.servicos.split('+').map((servico, index) => (
                  <p key={index} className="text-gray-900">{servico.trim()}</p>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Contato</label>
              <p className="mt-1 text-gray-900">{agendamento.telefone}</p>
            </div>

            {agendamento.observacoes && (
              <div>
                <label className="block text-sm font-medium text-gray-500">Observações</label>
                <p className="mt-1 text-gray-900">{agendamento.observacoes}</p>
              </div>
            )}
          </div>

          {/* Ações do Drawer */}
          <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end space-x-3">
            <button
              onClick={() => {
                onClose();
                // Adicionar função de editar
              }}
              className="px-4 py-2 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors flex items-center"
            >
              <HiPencil className="w-5 h-5 mr-2" />
              Editar
            </button>
            <button
              onClick={() => {
                onClose();
                // Adicionar função de cancelar
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center"
            >
              <HiTrash className="w-5 h-5 mr-2" />
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Agendamentos</h2>

        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horário
                  </th>
                  <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serviços
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agendamentos.map((agendamento) => (
                  <tr
                    key={agendamento.id}
                    onClick={() => handleRowClick(agendamento)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-3 sm:px-4 py-4 text-sm">
                      <div className="truncate max-w-[150px]">{agendamento.cliente}</div>
                    </td>
                    <td className="hidden sm:table-cell px-4 py-4 text-sm">
                      {new Date(agendamento.data).toLocaleDateString()}
                    </td>
                    <td className="hidden sm:table-cell px-4 py-4 text-sm">
                      {agendamento.hora}
                    </td>
                    <td className="hidden lg:table-cell px-4 py-4 text-sm">
                      <div className="truncate max-w-[200px]">{agendamento.servicos}</div>
                    </td>
                    <td className="px-3 sm:px-4 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${agendamento.status === 'confirmado' ? 'bg-green-100 text-green-800' :
                          agendamento.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                        {agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-4 text-sm text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Adicionar função de editar
                          }}
                          className="text-yellow-600 hover:text-yellow-800 p-1"
                        >
                          <HiPencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Adicionar função de cancelar
                          }}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Drawer */}
      {showDrawer && (
        <AgendamentoDrawer
          agendamento={selectedAgendamento}
          onClose={() => {
            setShowDrawer(false);
            setSelectedAgendamento(null);
          }}
        />
      )}
    </div>
  );
} 