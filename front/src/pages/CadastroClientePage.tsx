import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';

interface Cliente {
	nome: string;
	nomeSocial: string;
	dataNascimento: string;
	rua: string;
	numero: string;
	bairro: string;
	cidade: string;
	estado: string;
	cep: string;
	documentos: Documento[];
	dependentes: Dependente[];
}

interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

interface Documento {
  tipo: string;
  numero: string;
  dataExpedicao: Date;
}

interface Dependente {
  nome: string;
  nomeSocial: string;
  dataNascimento: string;
  documentos: Documento[];
}

const CadastroClientePage: React.FC = () => {
  const [etapa, setEtapa] = useState(1);
  const [error, setError] = useState(''); // Define o estado para a mensagem de erro

  const [cliente, setCliente] = useState<Cliente>({
    nome: '',
    nomeSocial: '',
    dataNascimento: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    documentos: [{ tipo: 'CPF', numero: '', dataExpedicao: new Date() }], // Valor padrão do tipo de documento
    dependentes: [],
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleDocumentoChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	const { name, value } = e.target;
	const newDocumentos = [...cliente.documentos];
	newDocumentos[index] = { ...newDocumentos[index], [name]: value };
	setCliente({ ...cliente, documentos: newDocumentos });
  };
  

  const adicionarDocumento = () => {
    setCliente({ ...cliente, documentos: [...cliente.documentos, { tipo: '', numero: '', dataExpedicao: new Date() }] });
  };

  const handleDependenteChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newDependentes = [...cliente.dependentes];
    newDependentes[index] = { ...newDependentes[index], [e.target.name]: e.target.value };
    setCliente({ ...cliente, dependentes: newDependentes });
  };

  const handleDocumentoDependenteChange = (dependenteIndex: number, documentoIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
	const { name, value } = e.target;
	const newDependentes = [...cliente.dependentes];
    const newDocumentos = [...newDependentes[dependenteIndex].documentos];
    newDocumentos[documentoIndex] = { ...newDocumentos[documentoIndex], [name]: value };
    newDependentes[dependenteIndex].documentos = newDocumentos;
    setCliente({ ...cliente, dependentes: newDependentes });
  };

  const adicionarDependente = () => {
    setCliente({ ...cliente, dependentes: [...cliente.dependentes, { nome: '', nomeSocial: '', dataNascimento: '', documentos: [] }] });
  };

  const adicionarDocumentoDependente = (dependenteIndex: number) => {
    const newDependentes = [...cliente.dependentes];
    newDependentes[dependenteIndex].documentos.push({ tipo: '', numero: '', dataExpedicao: new Date() });
    setCliente({ ...cliente, dependentes: newDependentes });
  };

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {  // Permite apenas números
      handleChange(e);
    }
  };  
  

  // Funções de Validação

  const validateStep1 = () => {
    if (!cliente.nome || cliente.nomeSocial || !cliente.dataNascimento) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
    setError('');
    return true;
  };

  const validateStep2 = () => {
    if ( !cliente.rua || !cliente.numero || !cliente.bairro || !cliente.cidade || !cliente.estado || !cliente.cep) {
      setError('Por favor, preencha todos os campos de endereço.');
      return false;
    }
    setError('');
    return true;
  };

  const validateStep3 = () => {
    // Verifica se todos os campos em cada documento foram preenchidos
    if (cliente.documentos.some(doc => !doc.tipo || !doc.numero || !doc.dataExpedicao)) {
      setError('Por favor, preencha todos os campos de documentos.');
      return false;
    }
    setError('');
    return true;
};

  const handleNext = () => {
    if ((etapa === 1 && validateStep1()) || (etapa === 2 && validateStep2()) || (etapa === 3 && validateStep3())) {
      setEtapa(etapa + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return; // Última validação antes de enviar
    try {
		console.log(cliente);
      await api.post('/clientes/cadastrar', cliente);
      navigate('/cliente');
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6">Cadastro de Cliente</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {etapa === 1 && (
          <div className="space-y-4">
            <div>
            <label className="block text-gray-700">
                Nome: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nome"
                value={cliente.nome}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Nome Social: 
                </label>
              <input
                type="text"
                name="nomeSocial"
                value={cliente.nomeSocial}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Data de Nascimento: <span className="text-red-500">*</span>
                </label>
              <input
                type="date"
                name="dataNascimento"
                value={cliente.dataNascimento}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4 w-full"
            >
              Próxima
            </button>
          </div>
        )}
        {etapa === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">
                Rua: <span className="text-red-500">*</span>
                </label>
              <input
                type="text"
                name="rua"
                value={cliente.rua || ''}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Número: <span className="text-red-500">*</span>
                </label>
              <input
                type="text"
                name="numero"
                value={cliente.numero || ''}
                onChange={handleNumericChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Bairro: <span className="text-red-500">*</span>
                </label>
              <input
                type="text"
                name="bairro"
                value={cliente.bairro || ''}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Cidade: <span className="text-red-500">*</span>
                </label>
              <input
                type="text"
                name="cidade"
                value={cliente.cidade || ''}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Estado: <span className="text-red-500">*</span>
                </label>
              <input
                type="text"
                name="estado"
                value={cliente.estado || ''}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                CEP: <span className="text-red-500">*</span>
                </label>
              <input
                type="text"
                name="cep"
                value={cliente.cep || ''}
                onChange={handleNumericChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4 w-full"
            >
              Próxima
            </button>
          </div>
        )}
        {etapa === 3 && (
          <div className="space-y-4">
            {cliente.documentos.map((documento, index) => (
              <div key={index} className="space-y-2">
                <div>
                  <label className="block text-gray-700">Tipo:</label>
                  <select
                    name="tipo"
                    value={documento.tipo}
                    onChange={(e) => handleDocumentoChange(index, e)}
                    className="mt-1 p-2 border rounded w-full"
                  >
                    <option value="CPF">CPF</option>
                    <option value="RG">RG</option>
                    <option value="Passaporte">Passaporte</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">
                    Número: <span className="text-red-500">*</span>
                    </label>
                  <input
                    type="text"
                    name="numero"
                    value={documento.numero}
                    onChange={(e) => handleDocumentoChange(index, e)}
                    className="mt-1 p-2 border rounded w-full"
                    required
                  />
                </div>
                <div>
				<label className="block text-gray-700">
					Data de expedição: <span className="text-red-500">*</span>
				</label>
				<input
					type="date"
					name="dataExpedicao"
					value={
					documento.dataExpedicao instanceof Date
						? documento.dataExpedicao.toISOString().split('T')[0]
						: new Date(documento.dataExpedicao).toISOString().split('T')[0]
					}
					onChange={(e) => handleDocumentoChange(index, e)}
					className="mt-1 p-2 border rounded w-full"
					required
				/>
				</div>
              </div>
            ))}
            <button
              type="button"
              onClick={adicionarDocumento}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 w-full mt-4"
            >
              Adicionar Documento
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4 w-full"
            >
              Próxima
            </button>
          </div>
        )}
        {etapa === 4 && (
          <div className="space-y-4">
            {cliente.dependentes.map((dependente, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold">Dependente {index + 1}</h3>
                <div>
                  <label className="block text-gray-700">Nome:</label>
                  <input
                    type="text"
                    name="nome"
                    value={dependente.nome}
                    onChange={(e) => handleDependenteChange(index, e)}
                    className="mt-1 p-2 border rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Nome Social:</label>
                  <input
                    type="text"
                    name="nomeSocial"
                    value={dependente.nomeSocial}
                    onChange={(e) => handleDependenteChange(index, e)}
                    className="mt-1 p-2 border rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Data de Nascimento:</label>
                  <input
                    type="date"
                    name="dataNascimento"
                    value={dependente.dataNascimento}
                    onChange={(e) => handleDependenteChange(index, e)}
                    className="mt-1 p-2 border rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Documentos:</label>
                  {dependente.documentos.map((documento, docIndex) => (
                    <div key={docIndex} className="space-y-2">
                      <div>
                        <label className="block text-gray-700">Tipo:</label>
                        <select
							name="tipo"
							value={documento.tipo}
							onChange={(e) => handleDocumentoChange(index, e)}
							className="mt-1 p-2 border rounded w-full"
						>
							<option value="CPF">CPF</option>
							<option value="RG">RG</option>
							<option value="Passaporte">Passaporte</option>
						</select>
                      </div>
                      <div>
                        <label className="block text-gray-700">Número:</label>
                        <input
                          type="text"
                          name="numero"
                          value={documento.numero}
                          onChange={(e) => handleDocumentoDependenteChange(index, docIndex, e)}
                          className="mt-1 p-2 border rounded w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Data de expedição:</label>
                        <input
                          type="date"
                          name="dataExpedicao"
                          value={documento.dataExpedicao.toISOString().split('T')[0]}
                          onChange={(e) => handleDocumentoDependenteChange(index, docIndex, e)}
                          className="mt-1 p-2 border rounded w-full"
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => adicionarDocumentoDependente(index)}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 w-full mt-4"
                  >
                    Adicionar Documento
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={adicionarDependente}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 w-full mt-4"
            >
              Adicionar Dependente
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full mt-4"
            >
              Cadastrar
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CadastroClientePage;