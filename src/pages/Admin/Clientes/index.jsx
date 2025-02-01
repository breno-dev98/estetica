import { useState, useEffect } from 'react';
import { clientService } from '../../../services/clientService';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    // Carregar clientes existentes
    const clientesExistentes = clientService.getClients();
    
    // Carregar agendamentos para pegar dados de clientes que possam estar faltando
    const agendamentos = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    // Mapa para evitar duplicatas
    const clientesMap = new Map();
    
    // Adicionar clientes existentes ao mapa
    clientesExistentes.forEach(cliente => {
      clientesMap.set(cliente.telefone || cliente.nome, cliente);
    });
    
    // Adicionar clientes dos agendamentos que não estejam no mapa
    agendamentos.forEach(agendamento => {
      const chave = agendamento.cliente;
      if (!clientesMap.has(chave)) {
        clientesMap.set(chave, {
          id: Math.random().toString(36).substr(2, 9),
          nome: agendamento.cliente,
          telefone: agendamento.telefone || '',
          email: '',
          ultimoAgendamento: agendamento.data,
          totalAgendamentos: 1
        });
      }
    });
    
    setClientes(Array.from(clientesMap.values()));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      clientService.deleteClient(id);
      setClientes(clientes.filter(cliente => cliente.id !== id));
    }
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
    cliente.telefone?.includes(busca) ||
    cliente.email?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gerenciar Clientes</h1>
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="border rounded-md p-2 w-full sm:w-64"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Último Agendamento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Agendamentos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{cliente.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cliente.email || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cliente.telefone || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cliente.ultimoAgendamento}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cliente.totalAgendamentos}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(cliente.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => {/* Implementar edição */}}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {clientesFiltrados.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum cliente encontrado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clientes; 