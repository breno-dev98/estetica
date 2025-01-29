import { useAgendamento } from '../../contexts/AgendamentoContext';
import ServiceCard from '../ServiceCard';
import { services } from '../../database/services';

export function ListaServicos() {
  const { 
    categoria, 
    servicesSelecteds, 
    setServicesSelected,
    setShowAnamnese,
    anamnese,
    tipoAtendimento
  } = useAgendamento();

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
    if ((categoria === 'facial' || tipoAtendimento === 'domiciliar') && servicesSelecteds.length > 0) {
      setShowAnamnese(true);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Selecione os Procedimentos Desejados
      </h2>
      <div className="flex flex-wrap gap-4 justify-center max-w-[1400px] mx-auto">
        {services[categoria].map((service, index) => (
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
          />
        ))}
      </div>

      {servicesSelecteds.length > 0 && 
       (categoria === 'facial' || tipoAtendimento === 'domiciliar') && 
       !anamnese && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleContinuar}
            className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primaryHover transition-colors"
          >
            Continuar
          </button>
        </div>
      )}
    </div>
  );
} 