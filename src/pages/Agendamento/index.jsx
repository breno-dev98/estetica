import { useEffect } from 'react';
import { TipoAtendimento } from '../../components/Agendamento/TipoAtendimento';
import { CategoriaProcedimento } from '../../components/Agendamento/CategoriaProcedimento';
import { ListaServicos } from '../../components/Agendamento/ListaServicos';
import { ServicosSelecionados } from '../../components/Agendamento/ServicosSelecionados';
import { useAgendamento } from '../../contexts/AgendamentoContext';
import { AnamneseFacial } from '../../components/Agendamento/AnamneseFacial';

const Agendamento = () => {
  const { 
    tipoAtendimento, 
    categoria, 
    servicesSelecteds, 
    resetForm,
    showAnamnese 
  } = useAgendamento();

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  return (
    <div className="min-h-screen bg-gray-50 relative z-0">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Agendamento</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="grid gap-8">
              {/* Tipo de Atendimento */}
              <div className="bg-white overflow-hidden shadow rounded-lg relative z-10">
                <div className="px-4 py-5 sm:p-6">
                  <TipoAtendimento />
                </div>
              </div>

              {/* Categoria de Procedimento */}
              {tipoAtendimento && (
                <div className="bg-white overflow-hidden shadow rounded-lg relative z-10">
                  <div className="px-4 py-5 sm:p-6">
                    <CategoriaProcedimento />
                  </div>
                </div>
              )}

              {/* Lista de serviços */}
              {categoria && !showAnamnese && (
                <div className="bg-white overflow-hidden shadow rounded-lg relative z-10">
                  <div className="px-4 py-5 sm:p-6">
                    <ListaServicos />
                  </div>
                </div>
              )}

              {/* Formulário de Anamnese */}
              {showAnamnese && (
                <div className="bg-white overflow-hidden shadow rounded-lg relative z-10">
                  <div className="px-4 py-5 sm:p-6">
                    <AnamneseFacial />
                  </div>
                </div>
              )}

              {/* Serviços selecionados e formulário */}
              {servicesSelecteds.length > 0 && !showAnamnese && categoria === 'corporal' && (
                <div className="bg-white overflow-hidden shadow rounded-lg relative z-10">
                  <div className="px-4 py-5 sm:p-6">
                    <ServicosSelecionados />
                  </div>
                </div>
              )}

              {/* Mostrar ServicosSelecionados após preenchimento da anamnese */}
              {servicesSelecteds.length > 0 && categoria === 'facial' && !showAnamnese && (
                <div className="bg-white overflow-hidden shadow rounded-lg relative z-10">
                  <div className="px-4 py-5 sm:p-6">
                    <ServicosSelecionados />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agendamento;
