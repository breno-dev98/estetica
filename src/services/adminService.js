export const adminService = {
  async login(credentials) {
    if (credentials.email === "admin@example.com" && credentials.password === "admin123") {
      const token = "fake-jwt-token";
      localStorage.setItem('admin_token', token);
      return { token };
    }
    throw new Error('Credenciais inválidas');
  },

  async getAgendamentos() {
    // Simular busca de agendamentos
    return [
      {
        id: 1,
        data: '2024-03-20',
        hora: '10:00',
        cliente: 'Maria Silva',
        servicos: 'Limpeza de Pele + Peeling',
        status: 'pendente'
      },
      // ... mais agendamentos
    ];
  },

  getAnamneses() {
    try {
      // Buscar anamneses do localStorage
      const anamneseFacial = JSON.parse(localStorage.getItem('anamneseFacial') || '[]');
      const anamneseCorporal = JSON.parse(localStorage.getItem('anamneseCorporal') || '[]');
      
      // Combinar todas as anamneses
      return [...anamneseFacial, ...anamneseCorporal];
    } catch (error) {
      console.error('Erro ao carregar anamneses:', error);
      return [];
    }
  },

  async updateAgendamentoStatus(id, status) {
    try {
      const agendamentos = JSON.parse(localStorage.getItem('appointments') || '[]');
      const updatedAgendamentos = agendamentos.map(agendamento => 
        agendamento.id === id ? { ...agendamento, status } : agendamento
      );
      localStorage.setItem('appointments', JSON.stringify(updatedAgendamentos));
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      throw error;
    }
  },

  async getServicos() {
    return require('../database/services').services;
  },

  async updateServico(id, servicoData) {
    // Implementar atualização de serviço
    console.log('Atualizando serviço:', id, servicoData);
  },

  getDashboardStats() {
    try {
      const agendamentos = JSON.parse(localStorage.getItem('appointments')) || [];
      
      // Data atual para comparações
      const hoje = new Date();
      const dataHoje = hoje.toLocaleDateString('pt-BR'); // Formato: DD/MM/YYYY
      const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
      
      const stats = {
        // Filtra agendamentos criados hoje
        agendamentosHoje: agendamentos.filter(agendamento => {
          return agendamento.dataCriacao === dataHoje;
        }).length,
        
        agendamentosPendentes: agendamentos.filter(
          agendamento => agendamento.status === 'pendente'
        ).length,
        
        clientesTotal: new Set(
          agendamentos.map(agendamento => agendamento.cliente)
        ).size,
        
        faturamentoMes: agendamentos
          .filter(agendamento => {
            const [dia, mes, ano] = agendamento.data.split('/');
            const dataAgendamento = new Date(ano, mes - 1, dia);
            return dataAgendamento >= inicioMes && dataAgendamento <= hoje;
          })
          .reduce((total, agendamento) => {
            const valor = parseFloat(agendamento.preco.replace('R$', '').replace(',', '.').trim());
            return total + (isNaN(valor) ? 0 : valor);
          }, 0),
      };
      
      return stats;
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      return {
        agendamentosHoje: 0,
        agendamentosPendentes: 0,
        clientesTotal: 0,
        faturamentoMes: 0
      };
    }
  },

  getRecentAppointments() {
    try {
      const agendamentos = JSON.parse(localStorage.getItem('appointments')) || [];
      
      // Ordenar por data, mais recentes primeiro
      return agendamentos.sort((a, b) => {
        const [diaA, mesA, anoA] = a.data.split('/');
        const [diaB, mesB, anoB] = b.data.split('/');
        const dataA = new Date(anoA, mesA - 1, diaA, ...a.hora.split(':'));
        const dataB = new Date(anoB, mesB - 1, diaB, ...b.hora.split(':'));
        return dataB - dataA;
      }).slice(0, 5); // Retorna apenas os 5 mais recentes
    } catch (error) {
      console.error('Erro ao carregar agendamentos recentes:', error);
      return [];
    }
  },

  async getAgendamentosPorServico() {
    // Implementar estatísticas de agendamentos por serviço
  },

  async getFaturamentoPorPeriodo() {
    // Implementar dados de faturamento por período
  },

  async addServico(servicoData) {
    // Implementar adição de serviço
    console.log('Adicionando serviço:', servicoData);
  },

  async deleteServico(id) {
    // Implementar exclusão de serviço
    console.log('Excluindo serviço:', id);
  }
}; 