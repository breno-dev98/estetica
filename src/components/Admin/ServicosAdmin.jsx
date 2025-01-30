import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { HiPlus, HiPencil, HiTrash, HiEye } from 'react-icons/hi';

export function ServicosAdmin() {
  const [servicos, setServicos] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingServico, setEditingServico] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add', 'edit', 'view'
  const [selectedCategoria, setSelectedCategoria] = useState('facial');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: 'facial'
  });

  useEffect(() => {
    loadServicos();
  }, []);

  const loadServicos = async () => {
    try {
      const data = await adminService.getServicos();
      setServicos(data);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
    } finally {
      setLoading(false);
    }
  };

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
        category: selectedCategoria
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'add') {
        await adminService.addServico(formData);
      } else if (modalType === 'edit') {
        await adminService.updateServico(formData.id, formData);
      }
      loadServicos();
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        await adminService.deleteServico(id);
        loadServicos();
      } catch (error) {
        console.error('Erro ao excluir serviço:', error);
      }
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Gerenciar Serviços</h2>
            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              className="mt-2 border rounded-md p-2"
            >
              <option value="facial">Facial</option>
              <option value="corporal">Corporal</option>
            </select>
          </div>
          <button
            onClick={() => handleOpenModal('add')}
            className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
          >
            <HiPlus className="mr-2" /> Novo Serviço
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serviço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duração
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {servicos[selectedCategoria]?.map((servico) => (
                <tr key={servico.id}>
                  <td className="px-6 py-4">{servico.title}</td>
                  <td className="px-6 py-4">{servico.description}</td>
                  <td className="px-6 py-4">R$ {servico.price.toFixed(2)}</td>
                  <td className="px-6 py-4">{servico.duration}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleOpenModal('view', servico)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <HiEye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleOpenModal('edit', servico)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <HiPencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(servico.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full m-4">
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
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
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
      )}
    </div>
  );
} 