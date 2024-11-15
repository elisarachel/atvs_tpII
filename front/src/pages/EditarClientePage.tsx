import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../config/api';

interface Cliente {
  id: string;
  nome: string;
  nomeSocial: string;
  dataNascimento: Date;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;  documentos: Documento[];
  dependentes: Dependente[];
}

interface Documento {
  tipo: string;
  numero: string;
  dataExpedicao: Date;
}

interface Dependente {
  id: string;
  nome: string;
  nomeSocial: string;
  dataNascimento: string;
  documentos: Documento[];
}

const EditarClientePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await api.get(`/clientes/${id}`);
        setCliente({
          ...response.data,
          dataNascimento: new Date(response.data.dataNascimento),
          documentos: response.data.documentos.map((doc: Documento) => ({
            ...doc,
            dataExpedicao: new Date(doc.dataExpedicao)
          })),
          dependentes: response.data.dependentes.map((dep: Dependente) => ({
            ...dep,
            dataNascimento: new Date(dep.dataNascimento),
            documentos: dep.documentos.map((doc: Documento) => ({
              ...doc,
              dataExpedicao: new Date(doc.dataExpedicao)
            }))
          }))
        });
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
      }
    };
    fetchCliente();
  }, [id]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (cliente) {
      setCliente({ ...cliente, [e.target.name]: e.target.value });
    }
  };

  const handleDocumentoChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (cliente) {
      const newDocumentos = [...cliente.documentos];
      newDocumentos[index] = { ...newDocumentos[index], [e.target.name]: e.target.value };
      setCliente({ ...cliente, documentos: newDocumentos });
    }
  };

  const adicionarDocumento = () => {
    if (cliente) {
      setCliente({ ...cliente, documentos: [...cliente.documentos, { tipo: '', numero: '' ,dataExpedicao: new Date()}] });
    }
  };

  const handleDependenteChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (cliente) {
      const newDependentes = [...cliente.dependentes];
      newDependentes[index] = { ...newDependentes[index], [e.target.name]: e.target.value };
      setCliente({ ...cliente, dependentes: newDependentes });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/clientes/editar/${id}`, cliente);
      navigate('/cliente');
    } catch (error) {
      console.error('Erro ao editar cliente:', error);
    }
  };

  if (!cliente) {
    return <div>Carregando...</div>;
  }

  function adicionarDependente(): void {
    if (cliente) {
      setCliente({
        ...cliente,
        dependentes: [
          ...cliente.dependentes,
          {
            id: '',
            nome: '',
            nomeSocial: '',
            dataNascimento: '',
            documentos: [],
          },
        ],
      });
    }
  }

  function adicionarDocumentoDependente(): void {
    if (cliente) {
      const dependentes = [...cliente.dependentes];
      dependentes[dependentes.length - 1].documentos.push({ tipo: '', numero: '' , dataExpedicao: new Date()});
      setCliente({ ...cliente, dependentes });
    }
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6">Editar Cliente</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Informações Pessoais</h2>
          <label className="block">
            <span className="text-gray-700">Nome:</span>
            <input type="text" name="nome" value={cliente.nome} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
          </label>
          <label className="block">
            <span className="text-gray-700">Nome Social:</span>
            <input type="text" name="nomeSocial" value={cliente.nomeSocial} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
          </label>
          <label className="block">
          <span className="text-gray-700">Data de Nascimento:</span>
          <input
            type="date"
            name="dataNascimento"
            value={
              cliente.dataNascimento instanceof Date && !isNaN(cliente.dataNascimento.getTime())
                ? cliente.dataNascimento.toISOString().split('T')[0]
                : ''
            }
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </label>

        </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Endereço</h2>
            <label className="block">
              <span className="text-gray-700">Rua:</span>
              <input type="text" name="rua" value={cliente.rua} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
            </label>
            <label className="block">
              <span className="text-gray-700">Número:</span>
              <input type="text" name="numero" value={cliente.numero} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
            </label>
            <label className="block">
              <span className="text-gray-700">Bairro:</span>
              <input type="text" name="bairro" value={cliente.bairro} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
            </label>
            <label className="block">
              <span className="text-gray-700">Cidade:</span>
              <input type="text" name="cidade" value={cliente.cidade} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
            </label>
            <label className="block">
              <span className="text-gray-700">Estado:</span>
              <input type="text" name="estado" value={cliente.estado} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
            </label>
            <label className="block">
              <span className="text-gray-700">CEP:</span>
              <input type="text" name="cep" value={cliente.cep} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
            </label>
          </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Documentos</h2>
          {cliente.documentos.map((documento, index) => (
            <div key={index} className="flex space-x-4">
              <label className="block flex-1">
                <span className="text-gray-700">Tipo:</span>
                <select name="tipo" value={documento.tipo} onChange={(e) => handleDocumentoChange(index, e)} className="mt-1 p-2 border rounded w-full">
                  <option value="rg">RG</option>
                  <option value="cpf">CPF</option>
                  <option value="cnh">CNH</option>
                </select>
              </label>
              <label className="block flex-1">
                <span className="text-gray-700">Número:</span>
                <input type="text" name="numero" value={documento.numero} onChange={(e) => handleDocumentoChange(index, e)} className="mt-1 p-2 border rounded w-full" />
              </label>
              <label className="block flex-1">
              <span className="text-gray-700">Data de Expedição:</span>
              <input
                type="date"
                name="dataExpedicao"
                value={
                  documento.dataExpedicao instanceof Date && !isNaN(documento.dataExpedicao.getTime())
                    ? documento.dataExpedicao.toISOString().split('T')[0]
                    : ''
                }
                onChange={(e) => handleDocumentoChange(index, e)}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>

            </div>
          ))}
          <button type="button" onClick={adicionarDocumento} className="text-blue-500 hover:underline">Adicionar Documento</button>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Dependentes</h2>
          {cliente.dependentes.map((dependente, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <h3 className="text-md font-semibold mb-2">Dependente {index + 1}</h3>
              <label className="block">
                <span className="text-gray-700">Nome:</span>
                <input type="text" name="nome" value={dependente.nome} onChange={(e) => handleDependenteChange(index, e)} className="mt-1 p-2 border rounded w-full" />
              </label>
              <label className="block">
                <span className="text-gray-700">Nome Social:</span>
                <input type="text" name="nomeSocial" value={dependente.nomeSocial} onChange={(e) => handleDependenteChange(index, e)} className="mt-1 p-2 border rounded w-full" />
              </label>
              <label className="block">
                <span className="text-gray-700">Data de Nascimento:</span>
                <input type="date" name="dataNascimento" value={dependente.dataNascimento} onChange={(e) => handleDependenteChange(index, e)} className="mt-1 p-2 border rounded w-full" />
              </label>
              <p className="text-gray-700 mt-2">Documentos:</p>
              {dependente.documentos.map((documento, docIndex) => (
                <div key={docIndex} className="flex space-x-4">
                  <label className="block flex-1">
                    <span className="text-gray-700">Tipo:</span>
                    <input type="text" name="tipo" value={documento.tipo} onChange={(e) => handleDependenteChange(index, e)} className="mt-1 p-2 border rounded w-full" />
                  </label>
                  <label className="block flex-1">
                    <span className="text-gray-700">Número:</span>
                    <input type="text" name="numero" value={documento.numero} onChange={(e) => handleDependenteChange(index, e)} className="mt-1 p-2 border rounded w-full" />
                  </label>
                  <label className="block flex-1">
                  <span className="text-gray-700">Data de Expedição:</span>
                  <input
                    type="date"
                    name="dataExpedicao"
                    value={
                      documento.dataExpedicao instanceof Date && !isNaN(documento.dataExpedicao.getTime())
                        ? documento.dataExpedicao.toISOString().split('T')[0]
                        : ''
                    }
                    onChange={(e) => handleDocumentoChange(index, e)}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </label>
                </div>
              ))}
              <button type="button" onClick={adicionarDocumentoDependente} className="text-blue-500 hover:underline">Adicionar Documento</button>

            </div>
          ))}
        </div>
        <button type="button" onClick={adicionarDependente} className="text-blue-500 hover:underline">Adicionar Dependente</button>
        <hr />
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4">Salvar</button>
      </form>
    </div>
  );
};

export default EditarClientePage;
