import { useEffect, useState } from "react";
import Section from "../../components/Section";
import ServiceCard from "../../components/ServiceCard";
import { services } from "../../database/services";
import { SiPix } from "react-icons/si";
import { FaCcMastercard, FaCreditCard, FaMoneyBillAlt } from "react-icons/fa";

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
        <div className="bg-background container px-10 py-6 mx-auto rounded-md shadow-lg min-h-44 h-full grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Coluna 1: Lista de serviços selecionados */}
          <div className="col-span-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Serviços Selecionados:
            </h2>
            <ul className="list-inside list-disc">
              {servicesSelecteds.map((index) => (
                <li key={index} className="text-md text-gray-600">
                  {services[index].title} - {services[index].price}
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 2: Escolher Data */}
          <div className="col-span-4 md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Escolha a Data e Horário
            </h2>
            <label
              className="text-md flex flex-col text-neutral font-semibold"
              htmlFor="date"
            >
              Data
              <input
                className="border rounded-md p-2 text-black mt-2"
                id="date"
                type="date"
              />
            </label>
          </div>

          {/* Coluna 3: Horários Disponíveis */}
          <div className="col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Horários Disponíveis
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <button className="rounded-md bg-gray-100 hover:bg-lightBackground text-md px-7 p-2">
                09:00
              </button>
              <button className="rounded-md bg-gray-100 hover:bg-lightBackground text-md px-7 p-2">
                10:00
              </button>
              <button className="rounded-md bg-gray-100 hover:bg-lightBackground text-md px-7 p-2">
                11:00
              </button>
              <button className="rounded-md bg-gray-100 hover:bg-lightBackground text-md px-7 p-2">
                12:00
              </button>
            </div>
          </div>

          {/* Coluna 4: Método de Pagamento */}
          <div className="col-span-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Escolha o Método de Pagamento
            </h2>
            <div className="grid grid-cols-4 gap-2">
              <div className="w-full h-full gap-2 font-semibold p-6 border hover:border-secondary rounded-md flex flex-col items-center justify-center">
              <SiPix size={22} className="text-cyan-500" />
                <p>PIX</p>
              </div>
              <div className="w-full h-full gap-2 font-semibold p-6 border hover:border-secondary rounded-md flex flex-col items-center justify-center">
              <FaCreditCard size={22} className="text-blue-500" />
                <p>Débito</p>
              </div>
              <div className="w-full h-full gap-2 font-semibold p-6 border hover:border-secondary rounded-md flex flex-col items-center justify-center">
              <FaCreditCard size={22} className="text-yellow-500" />
                <p>Crédito</p>
              </div>
              <div className="w-full h-full gap-2 font-semibold p-6 border hover:border-secondary rounded-md flex flex-col items-center justify-center">
              <FaMoneyBillAlt size={24} className="text-green-500" />
                <p>Dinheiro</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agendamento;
