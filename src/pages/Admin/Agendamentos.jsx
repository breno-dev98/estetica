import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaClock, FaTimes, FaCheck } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import MobileDrawer, { DrawerField } from '../../components/MobileDrawer';

const Agendamentos = () => {
  const [appointments, setAppointments] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const sortedAppointments = savedAppointments.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    setAppointments(sortedAppointments);
  };

  const updateAppointmentStatus = (appointmentId, newStatus) => {
    const updatedAppointments = appointments.map(appointment => {
      if (appointment.id === appointmentId) {
        return { ...appointment, status: newStatus };
      }
      return appointment;
    });

    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
  };

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

  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDrawer(true);
  };

  const filteredAppointments = appointments.filter(appointment => 
    filtroStatus === 'todos' ? true : appointment.status === filtroStatus
  );

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
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

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serviços
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr 
                  key={appointment.id} 
                  onClick={() => handleRowClick(appointment)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.data} às {appointment.hora}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                      {getStatusIcon(appointment.status)}
                      {appointment.status}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-500">
                    <div className="truncate max-w-[150px]">
                      {Array.isArray(appointment.servicos) 
                        ? appointment.servicos.join(', ')
                        : appointment.servicos}
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {appointment.id}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.preco}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.tipoAtendimento === 'clinica' ? 'Clínica' : 'Domiciliar'}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={appointment.status}
                        onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option value="pendente">Pendente</option>
                        <option value="confirmado">Confirmar</option>
                        <option value="cancelado">Cancelar</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum agendamento encontrado.
          </div>
        )}
      </div>

      {/* Drawer */}
      {showDrawer && (
        <AppointmentDrawer
          appointment={selectedAppointment}
          onClose={() => {
            setShowDrawer(false);
            setSelectedAppointment(null);
          }}
          onUpdateStatus={updateAppointmentStatus}
        />
      )}
    </>
  );
};

const AppointmentDrawer = ({ appointment, onClose, onUpdateStatus }) => {
  if (!appointment) return null;

  const actions = (
    <>
      {appointment.status === 'pendente' && (
        <>
          <button
            onClick={() => {
              onUpdateStatus(appointment.id, 'aprovado');
              onClose();
            }}
            className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-md transition-colors flex items-center"
          >
            <FaCheck className="w-5 h-5 mr-2" />
            Aprovar
          </button>
          <button
            onClick={() => {
              onUpdateStatus(appointment.id, 'recusado');
              onClose();
            }}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center"
          >
            <FaTimes className="w-5 h-5 mr-2" />
            Recusar
          </button>
        </>
      )}
    </>
  );

  return (
    <MobileDrawer
      isOpen={true}
      onClose={onClose}
      title="Detalhes do Agendamento"
      actions={actions}
    >
      <DrawerField label="ID do Agendamento">
        {appointment.id}
      </DrawerField>

      <DrawerField label="Serviços">
        {Array.isArray(appointment.servicos) 
          ? appointment.servicos.join(', ')
          : appointment.servicos}
      </DrawerField>

      <div className="grid grid-cols-2 gap-4">
        <DrawerField label="Data">
          {appointment.data}
        </DrawerField>
        <DrawerField label="Horário">
          {appointment.hora}
        </DrawerField>
      </div>

      <DrawerField label="Valor">
        {appointment.preco}
      </DrawerField>

      <DrawerField label="Tipo de Atendimento">
        {appointment.tipoAtendimento === 'clinica' ? 'Clínica' : 'Domiciliar'}
      </DrawerField>

      {appointment.tipoAtendimento === 'domiciliar' && appointment.endereco && (
        <DrawerField label="Endereço">
          {`${appointment.endereco.logradouro}, ${appointment.endereco.numero}`}
          {appointment.endereco.complemento && `, ${appointment.endereco.complemento}`}
          {`\n${appointment.endereco.bairro}`}
          {`\n${appointment.endereco.cidade} - ${appointment.endereco.uf}`}
        </DrawerField>
      )}

      <DrawerField label="Status">
        <select
          value={appointment.status}
          onChange={(e) => onUpdateStatus(appointment.id, e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        >
          <option value="pendente">Pendente</option>
          <option value="confirmado">Confirmado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </DrawerField>
    </MobileDrawer>
  );
};

export default Agendamentos; 