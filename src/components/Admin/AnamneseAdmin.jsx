import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';

export function AnamneseAdmin() {
  const [anamneses, setAnamneses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnamnese, setSelectedAnamnese] = useState(null);

  useEffect(() => {
    loadAnamneses();
  }, []);

  const loadAnamneses = async () => {
    try {
      const data = await adminService.getAnamneses();
      setAnamneses(data);
    } catch (error) {
      console.error('Erro ao carregar anamneses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAnamnese = (anamnese) => {
    setSelectedAnamnese(anamnese);
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Fichas de Anamnese</h2>
        
        {selectedAnamnese ? (
          <div>
            <button 
              onClick={() => setSelectedAnamnese(null)}
              className="mb-4 text-primary hover:text-primary-dark"
            >
              ← Voltar para lista
            </button>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">
                Anamnese de {selectedAnamnese.dadosPessoais.nome}
              </h3>
              
              <div className="space-y-4">
                <section>
                  <h4 className="font-medium text-gray-700 mb-2">Dados Pessoais</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nome</p>
                      <p>{selectedAnamnese.dadosPessoais.nome}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Data de Nascimento</p>
                      <p>{selectedAnamnese.dadosPessoais.dataNascimento}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Telefone</p>
                      <p>{selectedAnamnese.dadosPessoais.contatos.telefone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p>{selectedAnamnese.dadosPessoais.contatos.email}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="font-medium text-gray-700 mb-2">Queixa Principal</h4>
                  <p>{selectedAnamnese.queixaPrincipal}</p>
                </section>

                <section>
                  <h4 className="font-medium text-gray-700 mb-2">Histórico</h4>
                  <div className="space-y-2">
                    {selectedAnamnese.historico && Object.entries(selectedAnamnese.historico).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-sm text-gray-500">{key}</p>
                        <p>{value}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {anamneses.map((anamnese) => (
                  <tr key={anamnese.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {anamnese.data}
                    </td>
                    <td className="px-6 py-4">
                      {anamnese.dadosPessoais.nome}
                    </td>
                    <td className="px-6 py-4">
                      {anamnese.tipo}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewAnamnese(anamnese)}
                        className="text-primary hover:text-primary-dark"
                      >
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 