export const clientService = {
  getClients() {
    try {
      return JSON.parse(localStorage.getItem('clients') || '[]');
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      return [];
    }
  },

  deleteClient(id) {
    try {
      const clients = this.getClients();
      const updatedClients = clients.filter(client => client.id !== id);
      localStorage.setItem('clients', JSON.stringify(updatedClients));
      return true;
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      return false;
    }
  },

  updateClient(id, updatedData) {
    try {
      const clients = this.getClients();
      const clientIndex = clients.findIndex(client => client.id === id);
      if (clientIndex !== -1) {
        clients[clientIndex] = { ...clients[clientIndex], ...updatedData };
        localStorage.setItem('clients', JSON.stringify(clients));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      return false;
    }
  }
}; 