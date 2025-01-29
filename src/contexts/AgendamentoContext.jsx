import { createContext, useContext, useState, useCallback } from 'react';

const AgendamentoContext = createContext({});

export function AgendamentoProvider({ children }) {
  const [tipoAtendimento, setTipoAtendimento] = useState("");
  const [categoria, setCategoria] = useState("");
  const [servicesSelecteds, setServicesSelected] = useState([]);
  const [date, setDate] = useState("");
  const [hora, setHora] = useState("");
  const [metodo, setMetodo] = useState("");
  const [enderecoCompleto, setEnderecoCompleto] = useState(false);
  const [dadosEndereco, setDadosEndereco] = useState(null);

  const resetForm = useCallback(() => {
    setTipoAtendimento("");
    setCategoria("");
    setServicesSelected([]);
    setDate("");
    setHora("");
    setMetodo("");
    setEnderecoCompleto(false);
    setDadosEndereco(null);
  }, []);

  return (
    <AgendamentoContext.Provider
      value={{
        tipoAtendimento,
        setTipoAtendimento,
        categoria,
        setCategoria,
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