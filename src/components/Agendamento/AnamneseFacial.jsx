import { useAgendamento } from '../../contexts/AgendamentoContext';
import { useState } from 'react';

export function AnamneseFacial() {
  const [formData, setFormData] = useState({
    tratamentoEstetico: {
      resposta: '',
      qual: ''
    },
    alergias: {
      resposta: '',
      qual: ''
    },
    medicamentos: {
      resposta: '',
      qual: ''
    },
    filtroSolar: {
      resposta: '',
      fator: ''
    },
    perguntas: {
      acidoPeeling: '',
      cancerPele: '',
      cancerFamilia: '',
      gravidaAmamentando: '',
      disturbioOcular: ''
    }
  });

  const { 
    etapaAnamnese, 
    setEtapaAnamnese,
    setDadosPessoais,
    dadosPessoais,
    queixaPrincipal,
    setQueixaPrincipal,
    setAnamnese, 
    setShowAnamnese 
  } = useAgendamento();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('_')) {
      const [campo, tipo] = name.split('_');
      if (campo === 'pergunta') {
        setFormData(prev => ({
          ...prev,
          perguntas: {
            ...prev.perguntas,
            [tipo]: value
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [campo]: {
            ...prev[campo],
            [tipo]: value
          }
        }));
      }
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

  const handleQueixaPrincipal = (e) => {
    e.preventDefault();
    setAnamnese(prev => ({
      ...prev,
      dadosPessoais: dadosPessoais,
      queixaPrincipal: queixaPrincipal
    }));
    setEtapaAnamnese(3);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Log para debug
    console.log('Form Data:', formData);

    const historicoSaude = {
      tratamentoEstetico: {
        resposta: formData.tratamentoEstetico.resposta === "S",
        qual: formData.tratamentoEstetico.qual || ''
      },
      alergias: {
        resposta: formData.alergias.resposta === "S",
        qual: formData.alergias.qual || ''
      },
      medicamentos: {
        resposta: formData.medicamentos.resposta === "S",
        qual: formData.medicamentos.qual || ''
      },
      filtroSolar: {
        resposta: formData.filtroSolar.resposta === "S",
        fator: formData.filtroSolar.fator || ''
      },
      acidoPeeling: formData.perguntas.acidoPeeling === "S",
      cancerPele: formData.perguntas.cancerPele === "S",
      cancerFamilia: formData.perguntas.cancerFamilia === "S",
      gravidaAmamentando: formData.perguntas.gravidaAmamentando === "S",
      disturbioOcular: formData.perguntas.disturbioOcular === "S"
    };

    // Log para debug
    console.log('Historico Saude:', historicoSaude);

    const anamnese = {
      id: Date.now().toString(),
      tipo: 'facial',
      dadosPessoais,
      queixaPrincipal,
      historicoSaude,
      dataCriacao: new Date().toLocaleDateString('pt-BR'),
      horaCriacao: new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    // Log para debug
    console.log('Anamnese Completa:', anamnese);

    try {
      const anamneseFacialSalva = JSON.parse(localStorage.getItem('anamneseFacial') || '[]');
      anamneseFacialSalva.push(anamnese);
      localStorage.setItem('anamneseFacial', JSON.stringify(anamneseFacialSalva));
      
      setAnamnese(anamnese);
      setShowAnamnese(false);
    } catch (error) {
      console.error('Erro ao salvar anamnese facial:', error);
    }
  };

  const perguntasSimples = [
    { id: 'acidoPeeling', texto: "Faz uso de algum ácido ou peeling químico?" },
    { id: 'cancerPele', texto: "Já teve algum tipo de câncer de pele?" },
    { id: 'cancerFamilia', texto: "Tem casos de câncer de pele na família?" },
    { id: 'gravidaAmamentando', texto: "Está grávida ou amamentando?" },
    { id: 'disturbioOcular', texto: "Possui algum distúrbio ocular?" }
  ];

  if (etapaAnamnese === 1) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Anamnese Facial</h2>
          <p className="mt-2 text-gray-600">Etapa 1 de 3 - Dados Pessoais</p>
        </div>

        <form onSubmit={handleDadosPessoais} className="space-y-6 bg-white p-8 rounded-lg shadow">
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
          <h2 className="text-2xl font-bold text-gray-900">Anamnese Facial</h2>
          <p className="mt-2 text-gray-600">Etapa 2 de 3 - Queixa Principal</p>
        </div>

        <form onSubmit={handleQueixaPrincipal} className="space-y-6 bg-white p-8 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descreva suas principais queixas e o que você gostaria de melhorar
            </label>
            <textarea
              value={queixaPrincipal}
              onChange={(e) => setQueixaPrincipal(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary resize-none"
              placeholder="Descreva aqui suas principais preocupações com a pele, áreas específicas que gostaria de tratar, e resultados que espera alcançar..."
              required
            />
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
              Próxima Etapa
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (etapaAnamnese === 3) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Anamnese Facial</h2>
          <p className="mt-2 text-gray-600">Etapa 3 de 3 - Informações Pessoais</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow">
          {/* Tratamento Estético */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Fez tratamento estético anterior? <span className="text-red-500">*</span>
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tratamentoEstetico_resposta"
                    value="S"
                    checked={formData.tratamentoEstetico.resposta === "S"}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-2">Sim</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tratamentoEstetico_resposta"
                    value="N"
                    checked={formData.tratamentoEstetico.resposta === "N"}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-2">Não</span>
                </label>
              </div>
              <input
                type="text"
                name="tratamentoEstetico_qual"
                value={formData.tratamentoEstetico.qual}
                onChange={handleInputChange}
                placeholder="Qual?"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Alergias */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Alérgico a algum medicamento? <span className="text-red-500">*</span>
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="alergias_resposta"
                    value="S"
                    checked={formData.alergias.resposta === "S"}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-2">Sim</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="alergias_resposta"
                    value="N"
                    checked={formData.alergias.resposta === "N"}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-2">Não</span>
                </label>
              </div>
              <input
                type="text"
                name="alergias_qual"
                value={formData.alergias.qual}
                onChange={handleInputChange}
                placeholder="Qual?"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Medicamentos */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Está fazendo uso de algum medicamento? <span className="text-red-500">*</span>
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="medicamentos_resposta"
                    value="S"
                    checked={formData.medicamentos.resposta === "S"}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-2">Sim</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="medicamentos_resposta"
                    value="N"
                    checked={formData.medicamentos.resposta === "N"}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-2">Não</span>
                </label>
              </div>
              <input
                type="text"
                name="medicamentos_qual"
                value={formData.medicamentos.qual}
                onChange={handleInputChange}
                placeholder="Qual?"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Filtro Solar */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Faz uso regular de filtro solar? <span className="text-red-500">*</span>
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="filtroSolar_resposta"
                    value="S"
                    checked={formData.filtroSolar.resposta === "S"}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-2">Sim</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="filtroSolar_resposta"
                    value="N"
                    checked={formData.filtroSolar.resposta === "N"}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-2">Não</span>
                </label>
              </div>
              <input
                type="text"
                name="filtroSolar_fator"
                value={formData.filtroSolar.fator}
                onChange={handleInputChange}
                placeholder="Qual fator?"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Demais perguntas Sim/Não */}
          <div className="space-y-6">
            {perguntasSimples.map((pergunta) => (
              <div key={pergunta.id} className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  {pergunta.texto} <span className="text-red-500">*</span>
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`pergunta_${pergunta.id}`}
                      value="S"
                      checked={formData.perguntas[pergunta.id] === "S"}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 text-primary"
                    />
                    <span className="ml-2">Sim</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`pergunta_${pergunta.id}`}
                      value="N"
                      checked={formData.perguntas[pergunta.id] === "N"}
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
              onClick={() => setEtapaAnamnese(2)}
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

  // Etapa 3 será implementada posteriormente
  return null;
} 