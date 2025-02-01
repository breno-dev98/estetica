import { useAgendamento } from '../../contexts/AgendamentoContext';
import { useState } from 'react';

export function AnamneseCorporal() {
  const [formData, setFormData] = useState({
    doencasCronicas: '',
    alergias: '',
    observacoes: '',
    habitos: {
      permaneceSentado: '',
      dormeBem: '',
      fazDieta: '',
      cozinhaPropriasRefeicoes: '',
      funcionamentoIntestinal: '',
      praticaAtividadeFisica: '',
      alimentacaoBalanceada: '',
      ingereLiquidos: '',
      gestante: ''
    }
  });

  const { 
    etapaAnamnese, 
    setEtapaAnamnese,
    setDadosPessoais,
    dadosPessoais,
    setAnamnese, 
    setShowAnamnese 
  } = useAgendamento();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('habitos_')) {
      // Para campos de hábitos (radio buttons)
      const habitoName = name.replace('habitos_', '');
      setFormData(prev => ({
        ...prev,
        habitos: {
          ...prev.habitos,
          [habitoName]: value
        }
      }));
    } else {
      // Para campos de texto normais
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDadosPessoais = (e) => {
    e.preventDefault();
    const dados = {
      nome: e.target.nome.value,
      dataNascimento: e.target.dataNascimento.value,
      endereco: e.target.endereco.value,
      contatos: {
        telefone: e.target.telefone.value,
        redeSocial: e.target.redeSocial.value
      }
    };
    setDadosPessoais(dados);
    setEtapaAnamnese(2);
  };

  const handleHistoricoSaude = (e) => {
    e.preventDefault();
    const historicoSaude = {
      doencasCronicas: formData.doencasCronicas,
      alergias: formData.alergias,
      observacoes: formData.observacoes,
      habitos: {
        permaneceSentado: formData.habitos.permaneceSentado === "S",
        dormeBem: formData.habitos.dormeBem === "S",
        fazDieta: formData.habitos.fazDieta === "S",
        cozinhaPropriasRefeicoes: formData.habitos.cozinhaPropriasRefeicoes === "S",
        funcionamentoIntestinal: formData.habitos.funcionamentoIntestinal === "S",
        praticaAtividadeFisica: formData.habitos.praticaAtividadeFisica === "S",
        alimentacaoBalanceada: formData.habitos.alimentacaoBalanceada === "S",
        ingereLiquidos: formData.habitos.ingereLiquidos === "S",
        gestante: formData.habitos.gestante === "S"
      }
    };

    const anamnese = {
      id: Date.now().toString(),
      tipo: 'corporal',
      dadosPessoais,
      historicoSaude,
      dataCriacao: new Date().toLocaleDateString('pt-BR'),
      horaCriacao: new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    try {
      const anamneseCorporalSalva = JSON.parse(localStorage.getItem('anamneseCorporal') || '[]');
      anamneseCorporalSalva.push(anamnese);
      localStorage.setItem('anamneseCorporal', JSON.stringify(anamneseCorporalSalva));
      
      setAnamnese(anamnese);
      setShowAnamnese(false);
    } catch (error) {
      console.error('Erro ao salvar anamnese corporal:', error);
    }
  };

  if (etapaAnamnese === 1) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Anamnese Corporal</h2>
          <p className="mt-2 text-gray-600">Etapa 1 de 2 - Dados Pessoais</p>
        </div>

        <form onSubmit={handleDadosPessoais} className="space-y-6 bg-white p-8 rounded-lg shadow">
          {/* Mesmos campos de dados pessoais da anamnese facial */}
          <div className="grid grid-cols-1 gap-6">
            {/* Nome Completo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                name="nome"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Digite seu nome completo"
              />
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Nascimento
              </label>
              <input
                type="date"
                name="dataNascimento"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Endereço */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Endereço Completo
              </label>
              <input
                type="text"
                name="endereco"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="Rua, número, bairro, cidade"
              />
            </div>

            {/* Contatos - Grid com 2 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Telefone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="telefone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  placeholder="(00) 00000-0000"
                />
              </div>

              {/* Rede Social */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rede Social
                </label>
                <input
                  type="text"
                  name="redeSocial"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  placeholder="@seu.instagram"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primaryHover transition-colors"
            >
              Próxima Etapa
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (etapaAnamnese === 2) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Anamnese Corporal</h2>
          <p className="mt-2 text-gray-600">Etapa 2 de 2 - Histórico de Saúde</p>
        </div>

        <form onSubmit={handleHistoricoSaude} className="space-y-8 bg-white p-8 rounded-lg shadow">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doenças crônicas
              </label>
              <input
                type="text"
                name="doencasCronicas"
                value={formData.doencasCronicas}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alergias
              </label>
              <input
                type="text"
                name="alergias"
                value={formData.alergias}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                name="observacoes"
                rows={4}
                value={formData.observacoes}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary resize-none"
              />
            </div>
          </div>

          <div className="space-y-6">
            {[
              { name: "permaneceSentado", label: "Costuma permanecer muito tempo sentado(a)?" },
              { name: "dormeBem", label: "Dorme de 6-8 horas por dia?" },
              { name: "fazDieta", label: "Fez ou faz alguma dieta alimentar?" },
              { name: "cozinhaPropriasRefeicoes", label: "Costuma cozinhar as próprias refeições?" },
              { name: "funcionamentoIntestinal", label: "Funcionamento regular do intestino?" },
              { name: "praticaAtividadeFisica", label: "Já pratica alguma atividade física?" },
              { name: "alimentacaoBalanceada", label: "Possui uma alimentação balanceada?" },
              { name: "ingereLiquidos", label: "Ingere líquidos com frequência?" },
              { name: "gestante", label: "É gestante?" }
            ].map((pergunta, index) => (
              <div key={index} className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  {pergunta.label} <span className="text-red-500">*</span>
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`habitos_${pergunta.name}`}
                      value="S"
                      checked={formData.habitos[pergunta.name] === "S"}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 text-primary"
                    />
                    <span className="ml-2">Sim</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`habitos_${pergunta.name}`}
                      value="N"
                      checked={formData.habitos[pergunta.name] === "N"}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 text-primary"
                    />
                    <span className="ml-2">Não</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => setEtapaAnamnese(1)}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              ← Voltar
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primaryHover transition-colors"
            >
              Finalizar
            </button>
          </div>
        </form>
      </div>
    );
  }

  return null;
} 