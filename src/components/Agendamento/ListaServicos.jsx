import { useState } from 'react';
import { useAgendamento } from '../../contexts/AgendamentoContext';
import ServiceCard from '../ServiceCard';
import { services } from '../../database/services';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { useServicos } from '../../contexts/ServicosContext';

export function ListaServicos() {
  const { servicos } = useServicos();
  const { 
    categoria, 
    servicesSelecteds, 
    setServicesSelected,
    setShowAnamnese,
    anamnese,
    tipoAtendimento
  } = useAgendamento();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSelected = (service) => {
    if (servicesSelecteds.includes(service)) {
      setServicesSelected(
        servicesSelecteds.filter((selected) => selected !== service)
      );
    } else {
      setServicesSelected([...servicesSelecteds, service]);
    }
  };

  const handleContinuar = () => {
    if (servicesSelecteds.length > 0 && 
        (categoria === 'facial' || 
         tipoAtendimento === 'domiciliar' || 
         categoria === 'corporal')) {
      setShowAnamnese(true);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">
          {servicesSelecteds.length > 0 
            ? `Procedimentos Selecionados (${servicesSelecteds.length})`
            : 'Selecione os Procedimentos Desejados'
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
        <>
          <div className="flex flex-wrap gap-4 justify-center max-w-[1400px] mx-auto">
            {servicos[categoria]?.map((service, index) => (
              <ServiceCard
                key={index}
                className="md:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1rem)] md:h-56"
                backgroundColor={"bg-background cursor-pointer hover:shadow-lg"}
                onClick={() => toggleSelected(service)}
                border={
                  servicesSelecteds.includes(service)
                    ? "border border-2 border-primary bg-lightBackground"
                    : ""
                }
                title={service.title}
                description={service.description}
                price={service.price}
                duration={service.duration}
              />
            ))}
          </div>

          {servicesSelecteds.length > 0 && !anamnese && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleContinuar}
                className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primaryHover transition-colors"
              >
                Continuar
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
} 