import { useAgendamento } from '../../contexts/AgendamentoContext';
import { services } from '../../database/services';
import { agendamentoService } from '../../services/agendamentoService';
import { SiPix } from "react-icons/si";
import { FaCreditCard, FaMoneyBillAlt } from "react-icons/fa";
import Endereco from '../Endereco';

export function ServicosSelecionados() {
  const {
    servicesSelecteds,
    date,
    setDate,
    hora,
    setHora,
    metodo,
    setMetodo,
    enderecoCompleto,
    setEnderecoCompleto,
    dadosEndereco,
    setDadosEndereco,
    resetForm,
    tipoAtendimento,
    categoria,
    anamnese
  } = useAgendamento();

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

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (agendamentoService.isWeekday(selectedDate)) {
      setDate(e.target.value);
    } else {
      alert("Por favor, selecione um dia útil (segunda a sexta-feira).");
      setDate("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      tipoAtendimento,
      servicos: servicesSelecteds.map((service) => service.title).join(", "),
      data: agendamentoService.formatDateToBR(date),
      hora,
      preco: `R$ ${agendamentoService.calculateTotal(servicesSelecteds).toFixed(2)}`,
      metodo,
      endereco: dadosEndereco
    };

    const whatsappLink = agendamentoService.createWhatsAppMessage(formData);
    window.open(whatsappLink, "_blank");

    resetForm();
    alert("Agendamento confirmado!");
  };

  // Verifica se pode mostrar a seleção de data
  const podeEscolherData = (categoria === 'corporal' && tipoAtendimento === 'clinica') || 
                          ((categoria === 'facial' || tipoAtendimento === 'domiciliar') && anamnese);

  // Função para verificar se precisa mostrar o formulário de endereço
  const handleMetodoSelecionado = (novoMetodo) => {
    setMetodo(novoMetodo);
    if (tipoAtendimento === "clinica") {
      // Se for atendimento na clínica, já marca como endereço completo
      setEnderecoCompleto(true);
      // Define um endereço padrão da clínica
      setDadosEndereco({
        logradouro: "Rua da Clínica",
        numero: "123",
        complemento: "",
        bairro: "Centro",
        cidade: "Fortaleza",
        uf: "CE"
      });
    }
  };

  return (
    <div className="bg-background px-4 md:px-10 py-6 md:py-8 mt-8 rounded-md shadow-lg">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Coluna 1: Lista de serviços selecionados */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Serviços Selecionados:
          </h2>
          <ul className="list-inside list-disc">
            {servicesSelecteds.map((service, index) => (
              <li key={index} className="text-md text-gray-600">
                {service.title} - {service.price}
              </li>
            ))}
          </ul>
          
          <div className="mt-4 p-4 bg-lightBackground rounded-md">
            <p className="text-lg font-bold text-gray-800">
              Valor Total: R$ {agendamentoService.calculateTotal(servicesSelecteds).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Coluna 2: Escolher Data e Horário */}
        {podeEscolherData && (
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Escolha a Data e Horário
            </h2>
            <label className="text-md flex flex-col text-neutral font-semibold mb-6">
              Data
              <input
                className="border rounded-md p-2 text-black mt-2"
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={handleDateChange}
              />
            </label>

            {date && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Horários Disponíveis
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {horarios.map((h, index) => (
                    <button
                      onClick={() => setHora(h)}
                      key={index}
                      className={`rounded-md bg-gray-100 hover:bg-lightBackground text-md flex justify-center px-7 p-2 ${
                        hora === h ? "bg-secondary hover:bg-secondary text-white" : ""
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!podeEscolherData && (categoria === 'facial' || tipoAtendimento === 'domiciliar') && (
          <div className="w-full md:w-1/2">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Para prosseguir com o agendamento, é necessário preencher a ficha de anamnese.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Método de Pagamento */}
      {hora && (
        <div className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Escolha o Método de Pagamento
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {metodosPagamento.map((metodoPagamento, index) => (
              <div
                key={index}
                onClick={() => handleMetodoSelecionado(metodoPagamento.nome)}
                className={`w-full h-full gap-2 font-semibold p-6 border hover:border-secondary rounded-md flex flex-col items-center justify-center cursor-pointer ${
                  metodo === metodoPagamento.nome ? "bg-lightBackground border-primary" : ""
                }`}
              >
                {metodoPagamento.icone}
                <p>{metodoPagamento.nome}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formulário de Endereço - apenas para atendimento domiciliar */}
      {metodo && tipoAtendimento === "domiciliar" && (
        <div className="mt-8 border-t pt-8">
          <Endereco
            onEnderecoCompleto={setEnderecoCompleto}
            onEnderecoChange={setDadosEndereco}
          />
        </div>
      )}

      {/* Resumo do Agendamento */}
      {((tipoAtendimento === "domiciliar" && enderecoCompleto) || 
        (tipoAtendimento === "clinica" && metodo)) && (
        <form onSubmit={handleSubmit} className="mt-8 border-t pt-8">
          <div className="flex flex-col rounded bg-lightBackground border border-secondary p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Resumo do Agendamento
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Tipo de Atendimento:{" "}
              <span className="text-base font-normal text-neutral">
                {tipoAtendimento === "clinica" ? "Atendimento na Clínica" : "Atendimento Domiciliar"}
              </span>
            </p>

            <p className="text-lg text-gray-600 font-medium mt-2">
              Serviços:{" "}
              {servicesSelecteds.map((service, index) => (
                <span key={index} className="text-base font-normal text-neutral">
                  {service.title} {servicesSelecteds.length > 1 ? " - " : ""}
                </span>
              ))}
            </p>

            <p className="text-lg text-gray-600 font-medium">
              Valor Total:{" "}
              <span className="text-base font-normal text-neutral">
                R$ {agendamentoService.calculateTotal(servicesSelecteds).toFixed(2)}
              </span>
            </p>

            <p className="text-lg text-gray-600 font-medium">
              Data:{" "}
              <span className="text-base font-normal text-neutral">
                {agendamentoService.formatDateToBR(date)}
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

            {/* Mostrar endereço apenas se for domiciliar */}
            {tipoAtendimento === "domiciliar" && (
              <div className="mt-4 border-t pt-4">
                <p className="text-lg text-gray-600 font-medium mb-2">
                  Endereço de Atendimento:
                </p>
                <p className="text-base text-neutral">
                  {dadosEndereco?.logradouro}, {dadosEndereco?.numero}
                  {dadosEndereco?.complemento && `, ${dadosEndereco.complemento}`}
                </p>
                <p className="text-base text-neutral">
                  {dadosEndereco?.bairro}
                </p>
                <p className="text-base text-neutral">
                  {dadosEndereco?.cidade} - {dadosEndereco?.uf}
                </p>
              </div>
            )}
          </div>

          <button type="submit" className="w-full rounded-md p-3 mt-4 bg-secondary hover:bg-secondaryHover text-white">
            Confirmar Agendamento
          </button>
        </form>
      )}
    </div>
  );
} 