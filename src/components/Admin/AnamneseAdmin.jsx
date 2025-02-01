import { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';

const BooleanBadge = ({ value }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
    value 
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800'
  }`}>
    {value ? 'Sim' : 'Não'}
  </span>
);

const formatTitle = (key) => {
  const titles = {
    telefone: 'Telefone de Contato',
    redeSocial: 'Instagram',
    email: 'E-mail'
  };
  
  return titles[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
};

export function AnamneseAdmin() {
  const [anamneses, setAnamneses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnamnese, setSelectedAnamnese] = useState(null);

  useEffect(() => {
    loadAnamneses();
  }, []);

  const loadAnamneses = () => {
    try {
      const storedAppointments = localStorage.getItem('appointments');
      const appointments = storedAppointments ? JSON.parse(storedAppointments) : [];
      
      // Extrair as anamneses dos agendamentos
      const anamnesisData = appointments
        .filter(appointment => appointment.anamnese) // Filtra apenas agendamentos com anamnese
        .map(appointment => ({
          id: appointment.id,
          data: appointment.data,
          tipo: appointment.tipo,
          ...appointment.anamnese,
          dadosPessoais: {
            nome: appointment.nome,
            dataNascimento: appointment.dataNascimento,
            contatos: {
              telefone: appointment.telefone,
              email: appointment.email
            },
            ...appointment.anamnese.dadosPessoais
          }
        }));

      setAnamneses(anamnesisData);
    } catch (error) {
      console.error('Erro ao carregar anamneses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAnamnese = (anamnese) => {
    setSelectedAnamnese(anamnese);
  };

  const formatValue = (value) => {
    if (typeof value === 'boolean') {
      return <BooleanBadge value={value} />;
    }
    
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    
    if (typeof value === 'object' && value !== null) {
      return Object.entries(value)
        .map(([k, v]) => {
          const cleanKey = k.replace(/^(resposta|qual|fator):?\s*/i, '');
          
          if (typeof v === 'boolean') {
            return (
              <div key={k}>
                <BooleanBadge value={v} />
                {cleanKey && cleanKey !== 'resposta' && (
                  <span className="ml-2 text-sm text-gray-600">{cleanKey}</span>
                )}
              </div>
            );
          }
          
          if (k.toLowerCase() === 'resposta') {
            return formatValue(v);
          }
          
          if (cleanKey) {
            return `${cleanKey}: ${formatValue(v)}`;
          }
          
          return formatValue(v);
        })
        .filter(Boolean);
    }
    
    return value?.toString() || '';
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
              <h3 className="text-xl font-medium mb-6 text-gray-800 border-b pb-3">
                Anamnese de {selectedAnamnese.dadosPessoais.nome}
              </h3>
              
              <div className="space-y-8">
                {Object.entries(selectedAnamnese).map(([sectionKey, sectionValue]) => {
                  if (['id', 'data', 'tipo'].includes(sectionKey)) {
                    return null;
                  }

                  return (
                    <section key={sectionKey} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <h4 className="font-medium text-lg text-gray-800 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1).replace(/([A-Z])/g, ' $1')}
                      </h4>
                      
                      {typeof sectionValue === 'object' ? (
                        <div className="grid grid-cols-2 gap-6">
                          {Object.entries(sectionValue).map(([key, value]) => (
                            <div key={key} className="bg-gray-50 p-4 rounded-md">
                              <p className="text-sm font-medium text-gray-600 mb-1">
                                {sectionKey === 'dadosPessoais' && key === 'contatos' 
                                  ? 'Informações de Contato'
                                  : formatTitle(key)}
                              </p>
                              <div className="text-gray-800 space-y-2">
                                {typeof value === 'object' && key === 'contatos' ? (
                                  Object.entries(value).map(([contactKey, contactValue]) => (
                                    <div key={contactKey} className="flex items-center">
                                      <span className="text-sm font-medium text-gray-600 mr-2">
                                        {formatTitle(contactKey)}:
                                      </span>
                                      <span className="text-sm">{contactValue}</span>
                                    </div>
                                  ))
                                ) : (
                                  typeof value === 'boolean' ? (
                                    <BooleanBadge value={value} />
                                  ) : (
                                    Array.isArray(formatValue(value)) ? 
                                      formatValue(value).map((item, index) => (
                                        <div key={index} className="text-sm">
                                          {item}
                                        </div>
                                      )) :
                                      <p className="text-sm">{formatValue(value)}</p>
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-gray-800">
                            {typeof sectionValue === 'boolean' ? (
                              <BooleanBadge value={sectionValue} />
                            ) : (
                              <p className="text-sm">{formatValue(sectionValue)}</p>
                            )}
                          </p>
                        </div>
                      )}
                    </section>
                  );
                })}
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