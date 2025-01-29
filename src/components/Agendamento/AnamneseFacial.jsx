import { useAgendamento } from '../../contexts/AgendamentoContext';

export function AnamneseFacial() {
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
    const informacoesPessoais = {
      tratamentoEstetico: {
        resposta: e.target.tratamentoEstetico.value === "S",
        qual: e.target.qualTratamento.value
      },
      alergias: {
        resposta: e.target.alergias.value === "S",
        qual: e.target.qualAlergia.value
      },
      medicamentos: {
        resposta: e.target.medicamentos.value === "S",
        qual: e.target.qualMedicamento.value
      },
      filtroSolar: {
        resposta: e.target.filtroSolar.value === "S",
        fator: e.target.fatorProtetor.value
      },
      acidoPeeling: e.target.pergunta5.value === "S",
      cancerPele: e.target.pergunta6.value === "S",
      cancerFamilia: e.target.pergunta7.value === "S",
      gravidaAmamentando: e.target.pergunta8.value === "S",
      disturbioOcular: e.target.pergunta9.value === "S"
    };

    setAnamnese({
      dadosPessoais,
      queixaPrincipal,
      informacoesPessoais
    });

    setShowAnamnese(false); // Fecha o formulário de anamnese
  };

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
          {/* Pergunta 1 */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Fez tratamento estético anterior? <span className="text-red-500">*</span>
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tratamentoEstetico"
                    value="S"
                    className="w-4 h-4 text-primary"
                    required
                  />
                  <span className="ml-2">Sim</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tratamentoEstetico"
                    value="N"
                    className="w-4 h-4 text-primary"
                    required
                  />
                  <span className="ml-2">Não</span>
                </label>
              </div>
              <input
                type="text"
                name="qualTratamento"
                placeholder="Qual?"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Pergunta 2 */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Alérgico a algum medicamento? <span className="text-red-500">*</span>
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="alergias"
                    value="S"
                    className="w-4 h-4 text-primary"
                    required
                  />
                  <span className="ml-2">Sim</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="alergias"
                    value="N"
                    className="w-4 h-4 text-primary"
                    required
                  />
                  <span className="ml-2">Não</span>
                </label>
              </div>
              <input
                type="text"
                name="qualAlergia"
                placeholder="Qual?"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Pergunta 3 */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Está fazendo uso de algum medicamento? <span className="text-red-500">*</span>
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="medicamentos"
                    value="S"
                    className="w-4 h-4 text-primary"
                    required
                  />
                  <span className="ml-2">Sim</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="medicamentos"
                    value="N"
                    className="w-4 h-4 text-primary"
                    required
                  />
                  <span className="ml-2">Não</span>
                </label>
              </div>
              <input
                type="text"
                name="qualMedicamento"
                placeholder="Qual?"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Pergunta 4 */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Faz uso regular de filtro solar? <span className="text-red-500">*</span>
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="filtroSolar"
                    value="S"
                    className="w-4 h-4 text-primary"
                    required
                  />
                  <span className="ml-2">Sim</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="filtroSolar"
                    value="N"
                    className="w-4 h-4 text-primary"
                    required
                  />
                  <span className="ml-2">Não</span>
                </label>
              </div>
              <input
                type="text"
                name="fatorProtetor"
                placeholder="Qual fator?"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Demais perguntas Sim/Não */}
          <div className="space-y-6">
            {[
              "Faz uso de algum ácido ou peeling químico?",
              "Já teve algum tipo de câncer de pele?",
              "Tem casos de câncer de pele na família?",
              "Está grávida ou amamentando?",
              "Possui algum distúrbio ocular?"
            ].map((pergunta, index) => (
              <div key={index} className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  {pergunta} <span className="text-red-500">*</span>
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`pergunta${index + 5}`}
                      value="S"
                      className="w-4 h-4 text-primary"
                      required
                    />
                    <span className="ml-2">Sim</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`pergunta${index + 5}`}
                      value="N"
                      className="w-4 h-4 text-primary"
                      required
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