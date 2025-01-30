import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export function ConfirmacaoAgendamento({ isOpen, onClose, appointmentId }) {
  const navigate = useNavigate();
  
  const handleVoltarInicio = () => {
    onClose();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <div className="flex flex-col items-center text-center">
          <FaCheckCircle className="text-green-500 text-6xl mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Agendamento Confirmado!
          </h2>
          <p className="text-gray-600 mb-4">
            Seu agendamento foi realizado com sucesso.
          </p>
          <div className="bg-gray-50 w-full p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500 mb-1">Número do agendamento:</p>
            <p className="text-lg font-bold text-gray-800">{appointmentId}</p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Guarde este número para consultas futuras.
          </p>
          <button
            onClick={handleVoltarInicio}
            className="w-full bg-secondary hover:bg-secondaryHover text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            Voltar para início
          </button>
        </div>
      </div>
    </div>
  );
} 