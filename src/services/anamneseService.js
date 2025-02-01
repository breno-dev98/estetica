export const anamneseService = {
  getAnamneses() {
    try {
      // Buscar anamneses salvas diretamente
      const anamneseFacial = JSON.parse(localStorage.getItem('anamneseFacial') || '[]');
      const anamneseCorporal = JSON.parse(localStorage.getItem('anamneseCorporal') || '[]');

      // Buscar anamneses dos agendamentos existentes
      const agendamentos = JSON.parse(localStorage.getItem('appointments') || '[]');
      const anamnesesDosAgendamentos = agendamentos
        .filter(agendamento => agendamento.anamnese) // Filtra apenas agendamentos com anamnese
        .map(agendamento => ({
          ...agendamento.anamnese,
          dataCriacao: agendamento.dataCriacao || new Date().toLocaleDateString('pt-BR'),
          horaCriacao: agendamento.horaCriacao || new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        }));

      // Combinar todas as anamneses
      const todasAnamneses = [
        ...anamneseFacial, 
        ...anamneseCorporal,
        ...anamnesesDosAgendamentos
      ];

      // Remover duplicatas baseado no ID
      const anamnesesUnicas = Array.from(
        new Map(todasAnamneses.map(item => [item.id, item])).values()
      );

      // Ordenar por data, mais recentes primeiro
      return anamnesesUnicas.sort((a, b) => {
        const [diaA, mesA, anoA] = a.dataCriacao.split('/');
        const [diaB, mesB, anoB] = b.dataCriacao.split('/');
        const dateA = new Date(anoA, mesA - 1, diaA);
        const dateB = new Date(anoB, mesB - 1, diaB);
        return dateB - dateA;
      });
    } catch (error) {
      console.error('Erro ao carregar anamneses:', error);
      return [];
    }
  },

  getAnamneseById(id) {
    try {
      const todasAnamneses = this.getAnamneses();
      return todasAnamneses.find(anamnese => anamnese.id === id) || null;
    } catch (error) {
      console.error('Erro ao buscar anamnese por ID:', error);
      return null;
    }
  }
}; 