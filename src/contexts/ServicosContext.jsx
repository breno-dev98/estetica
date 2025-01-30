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

      // Encontra o serviço e sua categoria atual
      let categoriaAntiga;
      for (const categoria of ['facial', 'corporal']) {
        const servicoExiste = currentServicos[categoria].find(s => s.id === id);
        if (servicoExiste) {
          categoriaAntiga = categoria;
          break;
        }
      }

      if (!categoriaAntiga) {
        throw new Error('Serviço não encontrado');
      }

      // Prepara o serviço atualizado
      const servicoAtualizado = {
        ...servicoData,
        id, // Mantém o mesmo ID
        price: parseFloat(servicoData.price)
      };

      let updatedServicos;
      if (categoriaAntiga === servicoData.category) {
        // Se a categoria não mudou, apenas atualiza o serviço
        updatedServicos = {
          ...currentServicos,
          [categoriaAntiga]: currentServicos[categoriaAntiga].map(s => 
            s.id === id ? servicoAtualizado : s
          )
        };
      } else {
        // Se a categoria mudou, remove da antiga e adiciona na nova
        updatedServicos = {
          ...currentServicos,
          [categoriaAntiga]: currentServicos[categoriaAntiga].filter(s => s.id !== id),
          [servicoData.category]: [
            ...currentServicos[servicoData.category],
            servicoAtualizado
          ]
        };
      }

      setServicos(updatedServicos);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedServicos));
      return servicoAtualizado;
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      throw error;
    }
  };

  const deleteServico = async (id) => {
    try {
      let servicoEncontrado = false;
      const updatedServicos = {
        ...servicos,
        facial: [...servicos.facial],
        corporal: [...servicos.corporal]
      };

      // Procura e remove o serviço da categoria correta
      for (const categoria of ['facial', 'corporal']) {
        const index = updatedServicos[categoria].findIndex(s => s.id === id);
        if (index !== -1) {
          updatedServicos[categoria].splice(index, 1);
          servicoEncontrado = true;
          break;
        }
      }

      if (!servicoEncontrado) {
        throw new Error('Serviço não encontrado para exclusão');
      }

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