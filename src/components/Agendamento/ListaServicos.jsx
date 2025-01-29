import { useAgendamento } from '../../contexts/AgendamentoContext';
import ServiceCard from '../ServiceCard';
import { services } from '../../database/services';
import SectionAgendamento from '../SectionAgendamento';

export function ListaServicos() {
  const { servicesSelecteds, setServicesSelected } = useAgendamento();

  const toggleSelected = (index) => {
    if (servicesSelecteds.includes(index)) {
      setServicesSelected(
        servicesSelecteds.filter((service) => service !== index)
      );
    } else {
      setServicesSelected([...servicesSelecteds, index]);
    }
  };

  return (
    <SectionAgendamento title={"Agende seus Procedimentos"}>
      <div className="flex flex-wrap gap-4 justify-center max-w-[1400px] mx-auto">
        {services.map((service, index) => (
          <ServiceCard
            className="md:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1rem)] md:h-56"
            backgroundColor={"bg-background cursor-pointer hover:shadow-lg"}
            onClick={() => toggleSelected(index)}
            border={
              servicesSelecteds.includes(index)
                ? "border border-2 border-primary bg-lightBackground"
                : ""
            }
            key={index}
            title={service.title}
            description={service.description}
            price={service.price}
          />
        ))}
      </div>
    </SectionAgendamento>
  );
} 