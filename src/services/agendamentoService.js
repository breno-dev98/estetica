export const agendamentoService = {
  isWeekday(date) {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  },

  formatDateToBR(date) {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  },

  calculateTotal(services) {
    return services.reduce((total, service) => {
      // Garante que estamos trabalhando com números
      const price = typeof service.price === 'number' 
        ? service.price 
        : parseFloat(service.price.replace('R$', '').replace(',', '.').trim());
      return total + price;
    }, 0);
  },

  createWhatsAppMessage(formData) {
    const message = `
      *Novo Agendamento*
      
      Tipo de Atendimento: ${formData.tipoAtendimento === 'clinica' ? 'Clínica' : 'Domiciliar'}
      Serviços: ${formData.servicos}
      Data: ${formData.data}
      Hora: ${formData.hora}
      Valor Total: ${formData.preco}
      Método de Pagamento: ${formData.metodo}
      ${formData.tipoAtendimento === 'domiciliar' ? `
      Endereço: 
      ${formData.endereco.logradouro}, ${formData.endereco.numero}
      ${formData.endereco.complemento ? formData.endereco.complemento + '\n' : ''}
      ${formData.endereco.bairro}
      ${formData.endereco.cidade} - ${formData.endereco.uf}
      ` : ''}
    `.trim().replace(/^ +/gm, '');

    return `https://wa.me/5585999999999?text=${encodeURIComponent(message)}`;
  }
}; 