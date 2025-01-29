export const agendamentoService = {
  isWeekday(date) {
    const day = date.getDay();
    return day !== 5 && day !== 6;
  },

  formatDateToBR(date) {
    return new Date(date).toLocaleDateString("pt-BR");
  },

  calculateTotal(servicesSelecteds, services) {
    return servicesSelecteds.reduce((total, index) => {
      const price = services[index].price.replace("R$", "").replace(",", ".");
      return total + parseFloat(price);
    }, 0);
  },

  createWhatsAppMessage(formData) {
    const mensagem = `
    Agendamento Confirmado!

    Tipo de Atendimento: ${formData.tipoAtendimento === "clinica" ? "Atendimento na Clínica" : "Atendimento Domiciliar"}
    Serviços: ${formData.servicos}
    Data: ${formData.data}
    Hora: ${formData.hora}
    Valor Total: ${formData.preco}
    Método de Pagamento: ${formData.metodo}

    Endereço de Atendimento:
    Endereço: ${formData.endereco.logradouro}, ${formData.endereco.numero}${formData.endereco.complemento ? `, ${formData.endereco.complemento}` : ''}
    Bairro: ${formData.endereco.bairro}
    Cidade: ${formData.endereco.cidade} - ${formData.endereco.uf}
    `;

    return `https://wa.me/5585982390117?text=${encodeURIComponent(mensagem)}`;
  }
}; 