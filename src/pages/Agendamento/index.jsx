import { useEffect, useState } from "react";
import Section from "../../components/Section";
import ServiceCard from "../../components/ServiceCard";
import { services } from "../../database/services";
import { SiPix } from "react-icons/si";
import { FaCcMastercard, FaCreditCard, FaMoneyBillAlt } from "react-icons/fa";

const Agendamento = () => {
  const horarios = ["9:00", "10:00", "11:00", "12:00"];
  const metodosPagamento = [
    { nome: "PIX", icone: <SiPix size={22} className="text-cyan-500" /> },
    {
      nome: "Débito",
      icone: <FaCreditCard size={22} className="text-blue-500" />,
    },
    {
      nome: "Crédito",
      icone: <FaCreditCard size={22} className="text-yellow-500" />,
    },
    {
      nome: "Dinheiro",
      icone: <FaMoneyBillAlt size={24} className="text-green-500" />,
    },
  ];
  const [date, setDate] = useState("");
  const [hora, setHora] = useState("");
  const [metodo, setMetodo] = useState("");
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

   // Função para verificar se a data é um dia útil
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 é domingo, 6 é sábado
  };

  // Função para pegar o valor do campo de data
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);

    // Verifica se é dia útil
    if (isWeekday(selectedDate)) {
      setDate(e.target.value); // Atualiza o estado com a data válida
    } else {
      alert("Por favor, selecione um dia útil (segunda a sexta-feira).");
    }
  };

  // Converter formato de DATA para formato BR
  const formatDateToBR = (date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  // Função para pegar o valor do campo de hora
  const handleHoraChange = (valor) => {
    setHora(valor);
  };
  // Função para pegar o valor do campo de Pagamento
  const handleMetodoChange = (valor) => {
    setMetodo(valor);
  };

  // Limpa os demais campos caso desmarque todos os serviços selecionados
  useEffect(() => {
    if (servicesSelecteds.length < 1) {
      setDate("");
      setHora("");
      setMetodo("");
    }
  }, [servicesSelecteds]);

  const calculateTotal = () => {
    return servicesSelecteds.reduce((total, index) => {
      const price = services[index].price.replace("R$", "").replace(",", ".");
      return total + parseFloat(price);
    }, 0);
  };


  const [formData, setFormData] = useState({
    servicos: "",
    data: "",
    hora: "",
    preco: "",
    metodo: ""
  })

 const handleSubmit = (e) => {
  e.preventDefault(); // Previne o comportamento padrão do formulário, que seria recarregar a página

  // Atualize os dados do formulário com os valores atuais dos estados
  setFormData({
    servicos: servicesSelecteds.map((index) => services[index].title).join(", "), // Lista os serviços selecionados
    data: formatDateToBR(date), // Formata a data no formato BR
    hora: hora, // Hora selecionada
    preco: `R$ ${calculateTotal().toFixed(2)}`, // Calcula o valor total
    metodo: metodo, // Método de pagamento
  });

   // Cria a mensagem para enviar via WhatsApp
   const mensagem = `
   Agendamento Confirmado!

   Serviços: ${servicesSelecteds.map((index) => services[index].title).join(", ")}
   Data: ${formatDateToBR(date)}
   Hora: ${hora}
   Valor Total: R$ ${calculateTotal().toFixed(2)}
   Método de Pagamento: ${metodo}
 `;

const numeroWhatsApp = "5585982390117"

 // Cria o link do WhatsApp
 const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

 // Redireciona o usuário para o WhatsApp com a mensagem
 window.open(link, "_blank");

  // Aqui, você pode realizar outras ações, como enviar os dados para um servidor
  console.log("Formulário enviado com os dados:", formData);
  
  // Exemplo de como você pode limpar o estado após o envio:
  setDate("");
  setHora("");
  setMetodo("");
  setServicesSelected([]);
  alert("Agendamento confirmado!");
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
                name="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={handleDateChange}
              />
            </label>
          </div>

          {/* Coluna 3: Horários Disponíveis */}
          {date !== "" && (
            <div className="col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Horários Disponíveis
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {horarios.map((h, index) => (
                  <button
                    onClick={() => handleHoraChange(h)}
                    key={index}
                    className={`rounded-md bg-gray-100 hover:bg-lightBackground text-md flex justify-center px-7 p-2 ${
                      hora === h ? "bg-secondary hover:bg-secondary" : ""
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Coluna 4: Método de Pagamento */}
          {hora !== "" && (
            <div className="col-span-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Escolha o Método de Pagamento
              </h2>

              <div className="grid grid-cols-2 md:grid md:grid-cols-4 gap-2">
                {metodosPagamento.map((metodoPagamento, index) => (
                  <div
                    key={index}
                    onClick={() => handleMetodoChange(metodoPagamento.nome)}
                    className={`w-full h-full gap-2 font-semibold p-6 border hover:border-secondary rounded-md flex flex-col items-center justify-center ${
                      metodo === metodoPagamento.nome
                        ? " bg-lightBackground border-primary"
                        : ""
                    }`}
                  >
                    {metodoPagamento.icone}
                    <p>{metodoPagamento.nome}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Button de Agendamento */}
          {metodo !== "" && (
            <form onSubmit={handleSubmit} className="col-span-4">
              <div className="flex flex-col rounded bg-lightBackground border border-secondary p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Resumo do Agendamento
                </h2>
                <p className="text-lg text-gray-600 font-medium">
                  Serviços:{" "}
                  {servicesSelecteds.map((index) => (
                    <span className="text-base font-normal text-neutral">
                      {services[index].title} {servicesSelecteds.length > 1 ? " - " : ""}
                    </span>
                  ))}
                </p>

                <p className="text-lg text-gray-600 font-medium">
                  Valor Total:{" "}
                  <span className="text-base font-normal text-neutral">
                  R$ {calculateTotal().toFixed(2)}
                  </span>
                </p>

                <p className="text-lg text-gray-600 font-medium">
                  Data:{" "}
                  <span className="text-base font-normal text-neutral">
                    {formatDateToBR(date)}
                  </span>
                </p>

                <p className="text-lg text-gray-600 font-medium">
                  Horário:{" "}
                  <span className="text-base font-normal text-neutral">
                    {hora}
                  </span>
                </p>
                <p className="text-lg text-gray-600 font-medium">
                  Método de Pagamento:{" "}
                  <span className="text-base font-normal text-neutral">
                    {metodo}
                  </span>
                </p>
              </div>

              <button type="submit" className="w-full rounded-md p-3 mt-4 bg-secondary hover:bg-secondaryHover text-white">
                Confirmar Agendamento
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Agendamento;
