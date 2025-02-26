import { useState } from 'react';
import { useAgendamento } from '../../contexts/AgendamentoContext';
import { HiSparkles, HiUser, HiChevronDown, HiChevronUp } from 'react-icons/hi';

export function CategoriaProcedimento() {
  const { 
    categoria,
    setCategoria, 
    setServicesSelected, 
    setAnamnese,
    setShowAnamnese,
    setEtapaAnamnese,
    setDadosPessoais,
    setQueixaPrincipal 
  } = useAgendamento();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCategoriaChange = (novaCategoria) => {
    // Reseta todos os estados relacionados ao formulário
    setCategoria(novaCategoria);
    setServicesSelected([]);
    setAnamnese(null);
    setShowAnamnese(false);
    setEtapaAnamnese(1);
    setDadosPessoais(null);
    setQueixaPrincipal("");
    setIsExpanded(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">
          {categoria ? 
            `Categoria: ${categoria === 'facial' ? 'Facial' : 'Corporal'}` : 
            'Selecione a Categoria do Procedimento'
          }
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? <HiChevronUp size={24} /> : <HiChevronDown size={24} />}
        </button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            className={`relative rounded-lg border p-4 flex cursor-pointer focus:outline-none ${
              categoria === "facial"
                ? "border-primary bg-primary bg-opacity-5"
                : "border-gray-200"
            }`}
            onClick={() => handleCategoriaChange("facial")}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full ${
                categoria === "facial" ? "bg-primary text-white" : "bg-gray-100"
              }`}>
                <HiSparkles className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">Procedimentos Faciais</div>
                <div className="text-sm text-gray-500">
                  Tratamentos especializados para o rosto
                </div>
              </div>
            </div>
            <div className={`absolute -inset-px rounded-lg border-2 pointer-events-none ${
              categoria === "facial" ? "border-primary" : "border-transparent"
            }`} aria-hidden="true" />
          </div>

          <div
            className={`relative rounded-lg border p-4 flex cursor-pointer focus:outline-none ${
              categoria === "corporal"
                ? "border-primary bg-primary bg-opacity-5"
                : "border-gray-200"
            }`}
            onClick={() => handleCategoriaChange("corporal")}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full ${
                categoria === "corporal" ? "bg-primary text-white" : "bg-gray-100"
              }`}>
                <HiUser className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">Procedimentos Corporais</div>
                <div className="text-sm text-gray-500">
                  Tratamentos especializados para o corpo
                </div>
              </div>
            </div>
            <div className={`absolute -inset-px rounded-lg border-2 pointer-events-none ${
              categoria === "corporal" ? "border-primary" : "border-transparent"
            }`} aria-hidden="true" />
          </div>
        </div>
      )}
    </div>
  );
} 