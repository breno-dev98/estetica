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

  getDashboardStats() {
    try {
      // Pegar todos os agendamentos do localStorage usando a chave correta
      const agendamentos = JSON.parse(localStorage.getItem('appointments')) || [];
      
      // Data atual para comparações
      const hoje = new Date();
      const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
      
      // Calcular estatísticas
      const stats = {
        agendamentosHoje: agendamentos.filter(agendamento => {
          // Converter data do formato BR para Date
          const [dia, mes, ano] = agendamento.data.split('/');
          const dataAgendamento = new Date(ano, mes - 1, dia);
          return dataAgendamento.toDateString() === hoje.toDateString();
        }).length,
        
        agendamentosPendentes: agendamentos.filter(
          agendamento => agendamento.status === 'pendente'
        ).length,
        
        // Conjunto único de clientes
        clientesTotal: new Set(
          agendamentos.map(agendamento => agendamento.cliente)
        ).size,
        
        // Soma do faturamento do mês atual
        faturamentoMes: agendamentos
          .filter(agendamento => {
            const [dia, mes, ano] = agendamento.data.split('/');
            const dataAgendamento = new Date(ano, mes - 1, dia);
            return dataAgendamento >= inicioMes && dataAgendamento <= hoje;
          })
          .reduce((total, agendamento) => {
            const valor = parseFloat(agendamento.preco.replace('R$', '').trim());
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