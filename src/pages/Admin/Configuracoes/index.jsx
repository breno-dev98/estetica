import { useState } from 'react';
import { FaSave } from 'react-icons/fa';

const Configuracoes = () => {
  const [configuracoes, setConfiguracoes] = useState({
    horarioFuncionamento: {
      inicio: '09:00',
      fim: '18:00'
    },
    intervaloAgendamento: '60', // em minutos
    diasFuncionamento: {
      segunda: true,
      terca: true,
      quarta: true,
      quinta: true,
      sexta: true,
      sabado: false,
      domingo: false
    },
    notificacoes: {
      emailConfirmacao: true,
      lembreteWhatsapp: true,
      antecedenciaLembrete: '24' // em horas
    }
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (categoria, campo, valor) => {
    setConfiguracoes(prev => ({
      ...prev,
      [categoria]: {
        ...prev[categoria],
        [campo]: valor
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar as configurações
    setMensagem('Configurações salvas com sucesso!');
    setTimeout(() => setMensagem(''), 3000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Configurações</h1>

      {mensagem && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {mensagem}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Horário de Funcionamento */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Horário de Funcionamento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Horário de Abertura</label>
              <input
                type="time"
                value={configuracoes.horarioFuncionamento.inicio}
                onChange={(e) => handleChange('horarioFuncionamento', 'inicio', e.target.value)}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Horário de Fechamento</label>
              <input
                type="time"
                value={configuracoes.horarioFuncionamento.fim}
                onChange={(e) => handleChange('horarioFuncionamento', 'fim', e.target.value)}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
          </div>
        </div>

        {/* Dias de Funcionamento */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Dias de Funcionamento</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(configuracoes.diasFuncionamento).map(([dia, ativo]) => (
              <label key={dia} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={ativo}
                  onChange={(e) => handleChange('diasFuncionamento', dia, e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-gray-700 capitalize">{dia}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Notificações */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Notificações</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={configuracoes.notificacoes.emailConfirmacao}
                onChange={(e) => handleChange('notificacoes', 'emailConfirmacao', e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Enviar email de confirmação</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={configuracoes.notificacoes.lembreteWhatsapp}
                onChange={(e) => handleChange('notificacoes', 'lembreteWhatsapp', e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Enviar lembrete por WhatsApp</span>
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Antecedência do lembrete (horas)
              </label>
              <input
                type="number"
                value={configuracoes.notificacoes.antecedenciaLembrete}
                onChange={(e) => handleChange('notificacoes', 'antecedenciaLembrete', e.target.value)}
                className="mt-1 block w-full border rounded-md p-2"
                min="1"
                max="72"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover"
        >
          <FaSave />
          Salvar Configurações
        </button>
      </form>
    </div>
  );
};

export default Configuracoes; 