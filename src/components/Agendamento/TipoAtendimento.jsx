import { useAgendamento } from '../../contexts/AgendamentoContext';
import { HiOfficeBuilding, HiHome } from 'react-icons/hi';

export function TipoAtendimento() {
  const { tipoAtendimento, setTipoAtendimento, resetForm } = useAgendamento();

  const handleTipoAtendimentoChange = (tipo) => {
    setTipoAtendimento(tipo);
    resetForm();
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Selecione o Tipo de Atendimento
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div
          className={`relative rounded-lg border p-4 flex cursor-pointer focus:outline-none ${
            tipoAtendimento === "clinica"
              ? "border-primary bg-primary bg-opacity-5"
              : "border-gray-200"
          }`}
          onClick={() => handleTipoAtendimentoChange("clinica")}
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
                Realize seu procedimento em nossa clínica especializada
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
          onClick={() => handleTipoAtendimentoChange("domiciliar")}
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
                Receba o atendimento no conforto da sua casa
              </div>
            </div>
          </div>
          <div className={`absolute -inset-px rounded-lg border-2 pointer-events-none ${
            tipoAtendimento === "domiciliar" ? "border-primary" : "border-transparent"
          }`} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
} 