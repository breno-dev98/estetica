import { useState } from 'react';
import { useAgendamento } from '../../contexts/AgendamentoContext';
import { HiHome, HiOfficeBuilding, HiChevronDown, HiChevronUp } from 'react-icons/hi';

export function TipoAtendimento() {
  const { 
    tipoAtendimento, 
    setTipoAtendimento,
    setServicesSelected,
    setDate,
    setHora,
    setMetodo,
    setEnderecoCompleto,
    setDadosEndereco
  } = useAgendamento();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleTipoAtendimentoChange = (tipo) => {
    setTipoAtendimento(tipo);
    // Resetar apenas os estados relacionados ao agendamento
    setServicesSelected([]);
    setDate("");
    setHora("");
    setMetodo("");
    setEnderecoCompleto(false);
    setDadosEndereco(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">
          {tipoAtendimento ? 
            `Tipo de Atendimento: ${tipoAtendimento === 'clinica' ? 'Clínica' : 'Domiciliar'}` : 
            'Selecione o Tipo de Atendimento'
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
              tipoAtendimento === "clinica"
                ? "border-primary bg-primary bg-opacity-5"
                : "border-gray-200"
            }`}
            onClick={() => {
              handleTipoAtendimentoChange("clinica");
              setIsExpanded(false);
            }}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full ${
                tipoAtendimento === "clinica" ? "bg-primary text-white" : "bg-gray-100"
              }`}>
                <HiOfficeBuilding className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">Atendimento na Clínica</div>
                <div className="text-sm text-gray-500">
                  Atendimento presencial em nossa clínica
                </div>
              </div>
            </div>
            <div className={`absolute -inset-px rounded-lg border-2 pointer-events-none ${
              tipoAtendimento === "clinica" ? "border-primary" : "border-transparent"
            }`} aria-hidden="true" />
          </div>

          <div
            className={`relative rounded-lg border p-4 flex cursor-pointer focus:outline-none ${
              tipoAtendimento === "domiciliar"
                ? "border-primary bg-primary bg-opacity-5"
                : "border-gray-200"
            }`}
            onClick={() => {
              handleTipoAtendimentoChange("domiciliar");
              setIsExpanded(false);
            }}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full ${
                tipoAtendimento === "domiciliar" ? "bg-primary text-white" : "bg-gray-100"
              }`}>
                <HiHome className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">Atendimento Domiciliar</div>
                <div className="text-sm text-gray-500">
                  Atendimento no conforto da sua casa
                </div>
              </div>
            </div>
            <div className={`absolute -inset-px rounded-lg border-2 pointer-events-none ${
              tipoAtendimento === "domiciliar" ? "border-primary" : "border-transparent"
            }`} aria-hidden="true" />
          </div>
        </div>
      )}
    </div>
  );
} 