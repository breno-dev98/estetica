import { useState } from 'react';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

const Clientes = () => {
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nome: 'Maria Silva',
      email: 'maria@email.com',
      telefone: '(85) 99999-9999',
      ultimoAgendamento: '2024-03-20',
      totalAgendamentos: 3
    },
    // Adicione mais clientes de exemplo
  ]);

  const [busca, setBusca] = useState('');
  const [clienteEmEdicao, setClienteEmEdicao] = useState(null);

  const handleExcluir = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClientes(clientes.filter(cliente => cliente.id !== id));
    }
  };

  const handleEditar = (cliente) => {
    setClienteEmEdicao(cliente);
  };

  const handleSalvarEdicao = (e) => {
    e.preventDefault();
    setClientes(clientes.map(cliente => 
      cliente.id === clienteEmEdicao.id ? clienteEmEdicao : cliente
    ));
    setClienteEmEdicao(null);
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
    cliente.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Clientes</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {clienteEmEdicao ? (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
          <form onSubmit={handleSalvarEdicao}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  value={clienteEmEdicao.nome}
                  onChange={(e) => setClienteEmEdicao({...clienteEmEdicao, nome: e.target.value})}
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={clienteEmEdicao.email}
                  onChange={(e) => setClienteEmEdicao({...clienteEmEdicao, email: e.target.value})}
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telefone</label>
                <input
                  type="text"
                  value={clienteEmEdicao.telefone}
                  onChange={(e) => setClienteEmEdicao({...clienteEmEdicao, telefone: e.target.value})}
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setClienteEmEdicao(null)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
          <tbody className="divide-y divide-gray-200">
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td className="px-6 py-4">{cliente.nome}</td>
                <td className="px-6 py-4">{cliente.email}</td>
                <td className="px-6 py-4">{cliente.telefone}</td>
                <td className="px-6 py-4">{cliente.ultimoAgendamento}</td>
                <td className="px-6 py-4">{cliente.totalAgendamentos}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditar(cliente)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleExcluir(cliente.id)}
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

export default Clientes; 