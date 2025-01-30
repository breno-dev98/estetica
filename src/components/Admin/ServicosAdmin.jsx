import { useState, useEffect } from 'react';
import { useServicos } from '../../contexts/ServicosContext';
import { HiPlus, HiPencil, HiTrash, HiEye, HiChevronUp, HiX } from 'react-icons/hi';

export function ServicosAdmin() {
  const { servicos, addServico, updateServico, deleteServico } = useServicos();
  const [loading, setLoading] = useState(false);
  const [editingServico, setEditingServico] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add', 'edit', 'view'
  const [selectedCategoria, setSelectedCategoria] = useState('todos');
  const [selectedServico, setSelectedServico] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: 'facial'
  });

  const handleOpenModal = (type, servico = null) => {
    setModalType(type);
    if (servico) {
      setFormData(servico);
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        duration: '',
        category: selectedCategoria === 'todos' ? 'facial' : selectedCategoria
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const servicoData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      if (modalType === 'add') {
        await addServico(servicoData);
      } else if (modalType === 'edit') {
        await updateServico(formData.id, servicoData);
      }
      setShowModal(false);
      // Força uma re-renderização
      setSelectedCategoria(prev => prev === 'todos' ? 'todos' : servicoData.category);
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      setLoading(true);
      try {
        await deleteServico(id);
        // Força uma re-renderização
        setSelectedCategoria(prev => prev);
      } catch (error) {
        console.error('Erro ao excluir serviço:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDurationChange = (e) => {
    // Remove qualquer caractere não numérico
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    
    // Formata o valor com "min" no final
    const formattedValue = numericValue ? `${numericValue} min` : '';
    
    setFormData({
      ...formData,
      duration: formattedValue
    });
  };

  // Função para filtrar os serviços
  const getServicosFiltered = () => {
    if (!servicos) return [];
    
    if (selectedCategoria === 'todos') {
      return [
        ...(servicos.facial || []),
        ...(servicos.corporal || [])
      ];
    }
    return servicos[selectedCategoria] || [];
  };

  // Renderiza a lista de serviços
  const servicosFiltrados = getServicosFiltered();

  const formatDateTime = (isoString) => {
    return new Date(isoString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const HistoricoModificacoes = ({ historico }) => {
    if (!historico || historico.length === 0) {
      return <p className="text-gray-500 italic">Nenhuma modificação registrada</p>;
    }

    const formatarValor = (key, valor) => {
      switch (key) {
        case 'price':
          return `R$ ${parseFloat(valor).toFixed(2)}`;
        case 'category':
          return valor.charAt(0).toUpperCase() + valor.slice(1);
        default:
          return valor;
      }
    };

    const traduzirCampo = (campo) => {
      const traducoes = {
        title: 'Nome',
        description: 'Descrição',
        price: 'Preço',
        duration: 'Duração',
        category: 'Categoria'
      };
      return traducoes[campo] || campo;
    };

    return (
      <div className="mt-4">
        <h4 className="text-lg font-medium text-gray-700 mb-3">Histórico de Modificações</h4>
        <div className="space-y-4">
          {historico.map((mod, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  {new Date(mod.data).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </span>
              </div>
              <div className="space-y-2">
                {Object.entries(mod.alteracoes).map(([campo, { de, para }]) => (
                  <div key={campo} className="text-sm">
                    <span className="font-medium">{traduzirCampo(campo)}:</span>
                    <div className="ml-4 text-gray-600">
                      <div className="flex items-center">
                        <span className="text-red-500">- {formatarValor(campo, de)}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-500">+ {formatarValor(campo, para)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleRowClick = (servico) => {
    setSelectedServico(servico);
    setShowDrawer(true);
  };

  const ServicoDrawer = ({ servico, onClose }) => {
    if (!servico) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
        <div 
          className="fixed inset-x-0 bottom-0 transform transition-transform duration-300 ease-in-out bg-white rounded-t-xl shadow-xl"
          style={{ maxHeight: '85vh' }}
        >
          {/* Cabeçalho do Drawer */}
          <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between rounded-t-xl">
            <h3 className="text-lg font-semibold text-gray-800">Detalhes do Serviço</h3>
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
                <label className="block text-sm font-medium text-gray-500">Nome</label>
                <p className="mt-1 text-gray-900">{servico.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Categoria</label>
                <p className="mt-1 capitalize text-gray-900">{servico.category}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Descrição</label>
              <p className="mt-1 text-gray-900">{servico.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Preço</label>
                <p className="mt-1 text-gray-900">R$ {servico.price.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Duração</label>
                <p className="mt-1 text-gray-900">{servico.duration}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Criado em</label>
              <p className="mt-1 text-gray-900">
                {servico.createdAt ? formatDateTime(servico.createdAt) : '-'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Última modificação</label>
              <p className="mt-1 text-gray-900">
                {servico.updatedAt ? formatDateTime(servico.updatedAt) : '-'}
              </p>
            </div>

            {servico.historico && servico.historico.length > 0 && (
              <div className="mt-6">
                <HistoricoModificacoes historico={servico.historico} />
              </div>
            )}
          </div>

          {/* Ações do Drawer */}
          <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end space-x-3">
            <button
              onClick={() => {
                onClose();
                handleOpenModal('edit', servico);
              }}
              className="px-4 py-2 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors flex items-center"
            >
              <HiPencil className="w-5 h-5 mr-2" />
              Editar
            </button>
            <button
              onClick={() => {
                onClose();
                handleDelete(servico.id);
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center"
            >
              <HiTrash className="w-5 h-5 mr-2" />
              Excluir
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
        {/* Header com filtros e botão de adicionar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="w-full sm:w-auto">
            <h2 className="text-xl font-semibold mb-2 sm:mb-0">Gerenciar Serviços</h2>
            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              className="w-full sm:w-auto mt-2 border rounded-md p-2"
            >
              <option value="todos">Todos os Serviços</option>
              <option value="facial">Facial</option>
              <option value="corporal">Corporal</option>
            </select>
          </div>
          <button
            onClick={() => handleOpenModal('add')}
            className="w-full sm:w-auto bg-primary text-white px-4 py-2 rounded-md flex items-center justify-center"
          >
            <HiPlus className="mr-2" /> Novo Serviço
          </button>
        </div>

        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serviço
                  </th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duração
                  </th>
                  <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Criado em
                  </th>
                  <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Última Modificação
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {servicosFiltrados.map((servico) => (
                  <tr
                    key={servico.id}
                    onClick={() => handleRowClick(servico)}
                    className="hover:bg-gray-50 cursor-pointer sm:cursor-default"
                  >
                    <td className="px-3 sm:px-4 py-4 text-sm">
                      <div className="truncate max-w-[150px] sm:max-w-[200px]">{servico.title}</div>
                    </td>
                    <td className="hidden sm:table-cell px-4 py-4 text-sm capitalize">
                      {servico.category}
                    </td>
                    <td className="hidden sm:table-cell px-4 py-4 text-sm">
                      <div className="truncate max-w-[200px]">{servico.description}</div>
                    </td>
                    <td className="hidden sm:table-cell px-4 py-4 text-sm">
                      R$ {servico.price.toFixed(2)}
                    </td>
                    <td className="hidden sm:table-cell px-4 py-4 text-sm">
                      {servico.duration}
                    </td>
                    <td className="hidden lg:table-cell px-4 py-4 text-sm text-gray-500">
                      {servico.createdAt ? formatDateTime(servico.createdAt) : '-'}
                    </td>
                    <td className="hidden lg:table-cell px-4 py-4 text-sm text-gray-500">
                      {servico.updatedAt ? formatDateTime(servico.updatedAt) : '-'}
                    </td>
                    <td className="px-3 sm:px-4 py-4 text-sm text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal('view', servico);
                          }}
                          className="text-blue-600 hover:text-blue-800 p-1 hidden sm:block"
                        >
                          <HiEye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal('edit', servico);
                          }}
                          className="text-yellow-600 hover:text-yellow-800 p-1"
                        >
                          <HiPencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(servico.id);
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

      {/* Drawer apenas para mobile */}
      {showDrawer && (
        <div className="lg:hidden">
          <ServicoDrawer
            servico={selectedServico}
            onClose={() => {
              setShowDrawer(false);
              setSelectedServico(null);
            }}
          />
        </div>
      )}

      {/* Modal existente para adicionar/editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {modalType === 'add' ? 'Novo Serviço' : 
                 modalType === 'edit' ? 'Editar Serviço' : 
                 'Visualizar Serviço'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Serviço
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    disabled={modalType === 'view'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-gray-100 disabled:text-gray-500"
                    placeholder="Digite o nome do serviço"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    disabled={modalType === 'view'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-gray-100 disabled:text-gray-500"
                    rows="3"
                    placeholder="Digite a descrição do serviço"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preço
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">R$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                        disabled={modalType === 'view'}
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="0,00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duração
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={handleDurationChange}
                      disabled={modalType === 'view'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-gray-100 disabled:text-gray-500"
                      placeholder="Ex: 60 min"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    disabled={modalType === 'view'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    <option value="facial">Facial</option>
                    <option value="corporal">Corporal</option>
                  </select>
                </div>
              </div>

              {modalType === 'view' && (
                <HistoricoModificacoes historico={formData.historico} />
              )}

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
                {modalType !== 'view' && (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {modalType === 'add' ? 'Adicionar' : 'Salvar'}
                  </button>
                )}
              </div>
            </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 