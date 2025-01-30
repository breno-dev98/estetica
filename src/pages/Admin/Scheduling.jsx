import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaClock, FaTimes } from 'react-icons/fa';

const AdminScheduling = () => {
  const [appointments, setAppointments] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState('todos');

  useEffect(() => {
    // Carregar agendamentos do localStorage
    const loadAppointments = () => {
      const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      // Ordenar por data de criação (mais recente primeiro)
      const sortedAppointments = savedAppointments.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setAppointments(sortedAppointments);
    };

    loadAppointments();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmado':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pendente':
        return <FaClock className="inline-block mr-1" />;
      case 'confirmado':
        return <FaCheckCircle className="inline-block mr-1" />;
      case 'cancelado':
        return <FaTimes className="inline-block mr-1" />;
      default:
        return null;
    }
  };

  const filteredAppointments = appointments.filter(appointment => 
    filtroStatus === 'todos' ? true : appointment.status === filtroStatus
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Agendamentos</h2>
        <div className="flex gap-2">
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="border rounded-md px-3 py-2 text-gray-700"
          >
            <option value="todos">Todos</option>
            <option value="pendente">Pendentes</option>
            <option value="confirmado">Confirmados</option>
            <option value="cancelado">Cancelados</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serviços</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {appointment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.data} às {appointment.hora}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {Array.isArray(appointment.servicos) 
                      ? appointment.servicos.join(', ')
                      : appointment.servicos}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.preco}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                      {getStatusIcon(appointment.status)}
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.tipoAtendimento === 'clinica' ? 'Clínica' : 'Domiciliar'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhum agendamento encontrado.
        </div>
      )}
    </div>
  );
};

export default AdminScheduling; 