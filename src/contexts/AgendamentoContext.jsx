import { createContext, useContext, useState } from 'react';

const AgendamentoContext = createContext({});

export function AgendamentoProvider({ children }) {
  const [tipoAtendimento, setTipoAtendimento] = useState("");
  const [servicesSelecteds, setServicesSelected] = useState([]);
  const [date, setDate] = useState("");
  const [hora, setHora] = useState("");
  const [metodo, setMetodo] = useState("");
  const [enderecoCompleto, setEnderecoCompleto] = useState(false);
  const [dadosEndereco, setDadosEndereco] = useState(null);

  const resetForm = () => {
    setServicesSelected([]);
    setDate("");
    setHora("");
    setMetodo("");
    setEnderecoCompleto(false);
    setDadosEndereco(null);
  };

  return (
    <AgendamentoContext.Provider
      value={{
        tipoAtendimento,
        setTipoAtendimento,
        servicesSelecteds,
        setServicesSelected,
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
        resetForm
      }}
    >
      {children}
    </AgendamentoContext.Provider>
  );
}

export const useAgendamento = () => useContext(AgendamentoContext); 