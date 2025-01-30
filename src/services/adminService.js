export const adminService = {
  async login(credentials) {
    // Simulação de autenticação
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

  async getAnamneses() {
    // Simular busca de anamneses
    return [
      {
        id: 1,
        data: '2024-03-20',
        tipo: 'Facial',
        dadosPessoais: {
          nome: 'Maria Silva',
          dataNascimento: '1990-05-15',
          contatos: {
            telefone: '(85) 99999-9999',
            email: 'maria@email.com'
          }
        },
        queixaPrincipal: 'Manchas na pele',
        historico: {
          alergias: 'Nenhuma',
          medicamentos: 'Nenhum',
          cirurgias: 'Nenhuma'
        }
      },
      // ... mais anamneses
    ];
  },

  async updateAgendamentoStatus(id, status) {
    // Implementar atualização de status
    console.log(`Atualizando status do agendamento ${id} para ${status}`);
  },

  async getServicos() {
    // Por enquanto, retornar os serviços do arquivo local
    return require('../database/services').services;
  },

  async updateServico(id, servicoData) {
    // Implementar atualização de serviço
    console.log('Atualizando serviço:', id, servicoData);
  },

  async getDashboardStats() {
    // Simular dados do dashboard
    return {
      totalAgendamentos: 150,
      agendamentosHoje: 8,
      faturamentoMes: 12500.00,
      clientesNovos: 25
    };
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