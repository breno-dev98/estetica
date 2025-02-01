import { useState, useEffect } from 'react';
import { anamneseService } from '../../../services/anamneseService';
import { Link } from 'react-router-dom';

const Anamneses = () => {
  const [anamneses, setAnamneses] = useState([]);

  useEffect(() => {
    const loadAnamneses = () => {
      const anamnesesList = anamneseService.getAnamneses();
      setAnamneses(anamnesesList);
    };

    loadAnamneses();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Fichas de Anamnese</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {anamneses.map((anamnese) => (
                <tr key={anamnese.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{anamnese.dataCriacao}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{anamnese.dadosPessoais.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {anamnese.tipo === 'facial' ? 'Facial' : 'Corporal'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/admin/anamneses/${anamnese.id}`}
                      className="text-primary hover:text-primaryHover"
                    >
                      Ver Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {anamneses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhuma ficha de anamnese encontrada.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Anamneses; 