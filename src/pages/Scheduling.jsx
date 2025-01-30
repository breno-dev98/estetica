const handleSubmit = (e) => {
  e.preventDefault();

  // Gerar ID de 7 dígitos
  const generateShortId = () => {
    return Math.floor(1000000 + Math.random() * 9000000).toString().substring(0, 7);
  };

  // Criar objeto com os dados do agendamento
  const appointment = {
    id: generateShortId(), // ID curto de 7 dígitos
    name: name,
    phone: phone,
    service: selectedService,
    professional: selectedProfessional,
    date: selectedDate,
    time: selectedTime,
    status: 'pendente', // Status inicial do agendamento
    createdAt: new Date().toISOString()
  };

  // Obter agendamentos existentes do localStorage
  const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  
  // Adicionar novo agendamento à lista
  const updatedAppointments = [...existingAppointments, appointment];
  
  // Salvar lista atualizada no localStorage
  localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

  // Limpar formulário
  setName('');
  setPhone('');
  setSelectedService('');
  setSelectedProfessional('');
  setSelectedDate('');
  setSelectedTime('');

  // Mostrar mensagem de sucesso com o ID do agendamento
  alert(`Agendamento realizado com sucesso!\nSeu número de agendamento é: ${appointment.id}`);
  navigate('/'); // Redirecionar para a página inicial
} 