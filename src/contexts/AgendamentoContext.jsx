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
  const [showAnamnese, setShowAnamnese] = useState(false);
  const [anamnese, setAnamnese] = useState(null);
  const [etapaAnamnese, setEtapaAnamnese] = useState(1);
  const [dadosPessoais, setDadosPessoais] = useState(null);
  const [queixaPrincipal, setQueixaPrincipal] = useState("");

  const resetForm = useCallback(() => {
    setTipoAtendimento("");
    setCategoria("");
    setServicesSelected([]);
    setDate("");
    setHora("");
    setMetodo("");
    setEnderecoCompleto(false);
    setDadosEndereco(null);
    setShowAnamnese(false);
    setAnamnese(null);
    setEtapaAnamnese(1);
    setDadosPessoais(null);
    setQueixaPrincipal("");
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
        resetForm,
        showAnamnese,
        setShowAnamnese,
        anamnese,
        setAnamnese,
        etapaAnamnese,
        setEtapaAnamnese,
        dadosPessoais,
        setDadosPessoais,
        queixaPrincipal,
        setQueixaPrincipal,
      }}
    >
      {children}
    </AgendamentoContext.Provider>
  );
}

export const useAgendamento = () => useContext(AgendamentoContext); 