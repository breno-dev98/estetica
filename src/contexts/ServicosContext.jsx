import { createContext, useContext, useState, useEffect } from 'react';
import { adminService } from '../services/adminService';
import { services as initialServices } from '../database/services';

const ServicosContext = createContext();
const STORAGE_KEY = 'servicos_data';

export function ServicosProvider({ children }) {
  const [servicos, setServicos] = useState(() => {
    // Tenta recuperar os serviços do localStorage, se não existir usa os iniciais
    const savedServices = localStorage.getItem(STORAGE_KEY);
    const services = savedServices ? JSON.parse(savedServices) : initialServices;
    
    // Garante que todas as categorias existam
    return {
      facial: services.facial || [],
      corporal: services.corporal || [],
      ...services
    };
  });

  // Salva no localStorage sempre que os serviços mudarem
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(servicos));
  }, [servicos]);

  const loadServicos = async () => {
    try {
      const savedServices = localStorage.getItem(STORAGE_KEY);
      if (savedServices) {
        setServicos(JSON.parse(savedServices));
      } else {
        setServicos(initialServices);
      }
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
    }
  };

  const addServico = async (servicoData) => {
    try {
      const newId = Date.now().toString();
      const newServico = {
        ...servicoData,
        id: newId,
        price: parseFloat(servicoData.price)
      };

      const updatedServicos = {
        ...servicos,
        facial: [...(servicos.facial || [])],
        corporal: [...(servicos.corporal || [])],
        [servicoData.category]: [
          ...(servicos[servicoData.category] || []),
          newServico
        ]
      };

      setServicos(updatedServicos);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedServicos));
      return newServico; // Retorna o serviço criado
    } catch (error) {
      console.error('Erro ao adicionar serviço:', error);
      throw error;
    }
  };

  const updateServico = async (id, servicoData) => {
    try {
      // Garante que todas as categorias existam
      const currentServicos = {
        ...servicos,
        facial: servicos.facial || [],
        corporal: servicos.corporal || []
      };

      // Primeiro, encontra e remove o serviço de sua categoria atual
      let servicoAntigo;
      let categoriaAntiga;
      
      for (const categoria of ['facial', 'corporal']) {
        const index = currentServicos[categoria].findIndex(s => s.id === id);
        if (index !== -1) {
          servicoAntigo = currentServicos[categoria][index];
          categoriaAntiga = categoria;
          break;
        }
      }

      if (!servicoAntigo) throw new Error('Serviço não encontrado');

      // Remove o serviço da categoria antiga
      const updatedServicos = {
        ...currentServicos,
        [categoriaAntiga]: currentServicos[categoriaAntiga].filter(s => s.id !== id),
        [servicoData.category]: [
          ...(currentServicos[servicoData.category] || []),
          { ...servicoData, id }
        ]
      };

      setServicos(updatedServicos);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedServicos));
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      throw error;
    }
  };

  const deleteServico = async (id) => {
    try {
      const updatedServicos = {
        ...servicos,
        facial: (servicos.facial || []).filter(s => s.id !== id),
        corporal: (servicos.corporal || []).filter(s => s.id !== id)
      };

      setServicos(updatedServicos);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedServicos));
    } catch (error) {
      console.error('Erro ao deletar serviço:', error);
      throw error;
    }
  };

  return (
    <ServicosContext.Provider 
      value={{ 
        servicos, 
        addServico, 
        updateServico, 
        deleteServico,
        loadServicos 
      }}
    >
      {children}
    </ServicosContext.Provider>
  );
}

export function useServicos() {
  const context = useContext(ServicosContext);
  if (!context) {
    throw new Error('useServicos deve ser usado dentro de um ServicosProvider');
  }
  return context;
} 