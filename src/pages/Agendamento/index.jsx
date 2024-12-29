import { useEffect, useState } from "react";
import Section from "../../components/Section";
import ServiceCard from "../../components/ServiceCard";
import { services } from "../../database/services";

const Agendamento = () => {
  // Estado para armazenar o índice do card selecionado
  const [selected, setSelected] = useState(null);

  // Estado para armazenar os serviços selecionados
  const [servicesSelecteds, setServicesSelected] = useState([]);

  const toggleSelected = (index) => {
    // Verifica se o índice já está nos selecionados. Se estiver, remove; se não, adiciona.
    if (servicesSelecteds.includes(index)) {
      setServicesSelected(
        servicesSelecteds.filter((service) => service !== index)
      ); // Remove o serviço
    } else {
      setServicesSelected([...servicesSelecteds, index]); // Adiciona o serviço
    }
  };

  return (
    <div className="px-10 md:px-5 bg-gray-50">
      <Section title={"Agende seus Procedimentos"}>
        {services.map((service, index) => (
          <ServiceCard
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
      </Section>
      {/* Exibe os serviços selecionados */}
      {servicesSelecteds.length > 0 && (
        <div className="bg-background container px-10 py-2 mx-auto rounded-md shadow-md min-h-44 h-full">
          <h2 className="text-2xl font-bold text-gray-800 mt-6">
            Serviços Selecionados:
          </h2>
          <ul className="list-inside list-disc">
            {servicesSelecteds.map((index) => (
              <li key={index} className="text-md text-gray-600">
                {services[index].title} - {services[index].price}
              </li>
            ))}
          </ul>

          <div className="flex justify-between">
            {/* Escolher Data */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mt-6">
                Escolha a Data e Horário
              </h2>
              <label className="text-md flex flex-col text-neutral font-semibold" htmlFor="date">
                Data
              <input className="w-1/3 border rounded-md p-2 text-black" id="date" type="date" />
              </label>
            </div>

            {/* Horários Disponiveis */}
            <div className="flex flex-col px-20">
              <h1>Horários Disponíveis</h1>
              <div className="flex flex-wrap gap-2 ">
                <button className="rounded-md bg-gray-100 hover:bg-gray-200 text-md px-7 p-1">
                  09:99
                </button>
                <button className="rounded-md bg-gray-100 hover:bg-gray-200 text-md px-7 p-1">
                  09:99
                </button>
                <button className="rounded-md bg-gray-100 hover:bg-gray-200 text-md px-7 p-1">
                  09:99
                </button>
                <button className="rounded-md bg-gray-100 hover:bg-gray-200 text-md px-7 p-1">
                  09:99
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agendamento;
