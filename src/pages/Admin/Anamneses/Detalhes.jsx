import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { anamneseService } from '../../../services/anamneseService';

const DetalhesAnamnese = () => {
  const { id } = useParams();
  const [anamnese, setAnamnese] = useState(null);

  useEffect(() => {
    const loadAnamnese = () => {
      const anamneseData = anamneseService.getAnamneseById(id);
      console.log('Anamnese Carregada:', anamneseData);
      setAnamnese(anamneseData);
    };

    loadAnamnese();
  }, [id]);

  if (!anamnese) {
    return <div>Carregando...</div>;
  }

  const renderHistoricoFacial = () => {
    const perguntasSimples = [
      { id: 'acidoPeeling', texto: "Faz uso de algum ácido ou peeling químico?" },
      { id: 'cancerPele', texto: "Já teve algum tipo de câncer de pele?" },
      { id: 'cancerFamilia', texto: "Tem casos de câncer de pele na família?" },
      { id: 'gravidaAmamentando', texto: "Está grávida ou amamentando?" },
      { id: 'disturbioOcular', texto: "Possui algum distúrbio ocular?" }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-semibold mb-3">Tratamento Estético Anterior</h3>
          <div className="grid gap-2">
            <p className="text-sm text-gray-600">
              Fez tratamento estético anterior? {anamnese.historicoSaude.tratamentoEstetico.resposta ? 'Sim' : 'Não'}
            </p>
            {anamnese.historicoSaude.tratamentoEstetico.qual && (
              <p className="text-sm text-gray-600">
                Qual: {anamnese.historicoSaude.tratamentoEstetico.qual}
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Alergias</h3>
          <div className="grid gap-2">
            <p className="text-sm text-gray-600">
              Alérgico a algum medicamento? {anamnese.historicoSaude.alergias.resposta ? 'Sim' : 'Não'}
            </p>
            {anamnese.historicoSaude.alergias.qual && (
              <p className="text-sm text-gray-600">
                Qual: {anamnese.historicoSaude.alergias.qual}
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Medicamentos</h3>
          <div className="grid gap-2">
            <p className="text-sm text-gray-600">
              Está fazendo uso de algum medicamento? {anamnese.historicoSaude.medicamentos.resposta ? 'Sim' : 'Não'}
            </p>
            {anamnese.historicoSaude.medicamentos.qual && (
              <p className="text-sm text-gray-600">
                Qual: {anamnese.historicoSaude.medicamentos.qual}
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Uso de Filtro Solar</h3>
          <div className="grid gap-2">
            <p className="text-sm text-gray-600">
              Faz uso regular de filtro solar? {anamnese.historicoSaude.filtroSolar.resposta ? 'Sim' : 'Não'}
            </p>
            {anamnese.historicoSaude.filtroSolar.fator && (
              <p className="text-sm text-gray-600">
                Fator de proteção: {anamnese.historicoSaude.filtroSolar.fator}
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Informações Adicionais</h3>
          <div className="grid gap-2">
            {perguntasSimples.map(pergunta => (
              <p key={pergunta.id} className="text-sm text-gray-600">
                {pergunta.texto} {anamnese.historicoSaude[pergunta.id] ? 'Sim' : 'Não'}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderHistoricoCorporal = () => (
    <>
      <div>
        <p className="text-sm text-gray-600">Doenças Crônicas</p>
        <p className="font-medium">{anamnese.historicoSaude?.doencasCronicas || 'Nenhuma'}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Observações</p>
        <p className="font-medium">{anamnese.historicoSaude?.observacoes || '-'}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Hábitos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(anamnese.historicoSaude?.habitos || {}).map(([habito, valor]) => (
            <div key={habito} className="flex items-center">
              <span className={`w-4 h-4 rounded-full mr-2 ${valor ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className="text-sm">{formatarHabito(habito)}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const formatarHabito = (habito) => {
    const formatacao = {
      permaneceSentado: "Permanece muito tempo sentado(a)",
      dormeBem: "Dorme 6-8 horas por dia",
      fazDieta: "Faz dieta alimentar",
      cozinhaPropriasRefeicoes: "Cozinha próprias refeições",
      funcionamentoIntestinal: "Funcionamento regular do intestino",
      praticaAtividadeFisica: "Pratica atividade física",
      alimentacaoBalanceada: "Alimentação balanceada",
      ingereLiquidos: "Ingere líquidos com frequência",
      gestante: "É gestante"
    };
    return formatacao[habito] || habito;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <Link to="/admin/anamneses" className="text-primary hover:text-primaryHover">
          ← Voltar para lista
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-6">
          Anamnese de {anamnese.dadosPessoais.nome}
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-4">Dados Pessoais</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nome</p>
                <p className="font-medium">{anamnese.dadosPessoais.nome}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Data de Nascimento</p>
                <p className="font-medium">{anamnese.dadosPessoais.dataNascimento}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Telefone</p>
                <p className="font-medium">{anamnese.dadosPessoais.contatos.telefone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{anamnese.dadosPessoais.contatos.email}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Queixa Principal</h2>
            <p className="text-gray-700">{anamnese.queixaPrincipal || '-'}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Histórico</h2>
            {anamnese.tipo === 'facial' ? renderHistoricoFacial() : renderHistoricoCorporal()}
          </section>

          <section>
            <div className="text-sm text-gray-500 mt-8">
              Anamnese realizada em: {anamnese.dataCriacao} às {anamnese.horaCriacao}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DetalhesAnamnese; 