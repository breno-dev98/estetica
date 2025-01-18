import { useState, useEffect } from 'react';

const Endereco = ({ onEnderecoCompleto, onEnderecoChange }) => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
    numero: '',
    complemento: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCepChange = async (e) => {
    let newCep = e.target.value.replace(/\D/g, '');
    setCep(newCep);

    if (newCep.length === 8) {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://viacep.com.br/ws/${newCep}/json/`);
        const data = await response.json();

        if (data.erro) {
          setError('CEP não encontrado');
          setEndereco({
            logradouro: '',
            bairro: '',
            cidade: '',
            uf: '',
            numero: '',
            complemento: ''
          });
        } else {
          const novoEndereco = {
            ...endereco,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf
          };
          setEndereco(novoEndereco);
          onEnderecoChange(novoEndereco);
        }
      } catch (err) {
        setError('Erro ao buscar CEP');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const novoEndereco = {
      ...endereco,
      [name]: value
    };
    setEndereco(novoEndereco);
    onEnderecoChange(novoEndereco);
  };

  useEffect(() => {
    const camposObrigatorios = ['logradouro', 'bairro', 'cidade', 'uf', 'numero'];
    const enderecoCompleto = camposObrigatorios.every(campo => endereco[campo].trim() !== '');
    
    if (enderecoCompleto) {
      onEnderecoCompleto(true);
      onEnderecoChange(endereco);
    } else {
      onEnderecoCompleto(false);
    }
  }, [endereco, onEnderecoCompleto, onEnderecoChange]);

  const formatCep = (value) => {
    return value.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Endereço</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className="block text-neutral font-semibold mb-2">
            CEP
            <input
              type="text"
              maxLength="8"
              value={cep}
              onChange={handleCepChange}
              placeholder="Digite o CEP"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          {loading && <p className="text-blue-500">Buscando CEP...</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="col-span-1">
          <label className="block text-neutral font-semibold mb-2">
            Número
            <input
              type="text"
              name="numero"
              value={endereco.numero}
              onChange={handleInputChange}
              placeholder="Número"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
        </div>

        <div className="col-span-2">
          <label className="block text-neutral font-semibold mb-2">
            Logradouro
            <input
              type="text"
              name="logradouro"
              value={endereco.logradouro}
              onChange={handleInputChange}
              placeholder="Rua/Avenida"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              readOnly
            />
          </label>
        </div>

        <div className="col-span-2">
          <label className="block text-neutral font-semibold mb-2">
            Complemento
            <input
              type="text"
              name="complemento"
              value={endereco.complemento}
              onChange={handleInputChange}
              placeholder="Apartamento, bloco, etc."
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
        </div>

        <div className="col-span-1">
          <label className="block text-neutral font-semibold mb-2">
            Bairro
            <input
              type="text"
              name="bairro"
              value={endereco.bairro}
              onChange={handleInputChange}
              placeholder="Bairro"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              readOnly
            />
          </label>
        </div>

        <div className="col-span-1">
          <label className="block text-neutral font-semibold mb-2">
            Cidade
            <input
              type="text"
              name="cidade"
              value={endereco.cidade}
              onChange={handleInputChange}
              placeholder="Cidade"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              readOnly
            />
          </label>
        </div>

        <div className="col-span-1">
          <label className="block text-neutral font-semibold mb-2">
            UF
            <input
              type="text"
              name="uf"
              value={endereco.uf}
              onChange={handleInputChange}
              placeholder="UF"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              readOnly
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Endereco;