import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import api from '../config/api';

interface Cliente {
  id: string;
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

interface Documento {
  tipo: string;
  numero: string;
}

interface Dependente {
  id: string;
  nome: string;
  nomeSocial: string;
  dataNascimento: string;
  documentos: Documento[];
}

const ClientePage: React.FC = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get('/clientes/listar');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleCreate = () => {
    navigate('/cadastro-cliente'); // Redireciona para a página de cadastro de cliente
  };

  const handleEdit = (id: string) => {
    navigate(`/editar-cliente/${id}`); // Redireciona para a página de edição de cliente
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/clientes/excluir/${id}`);
      setClientes(clientes.filter(cliente => cliente.id !== id));
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Clientes</h2>
      <div className="flex space-x-4">

      <button
        onClick={handleBack}
        className="mb-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
      >
        Voltar para a Página Inicial
      </button>
      <button
        onClick={handleCreate}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Adicionar Cliente
      </button>
      
      </div>
      <ul className="space-y-6">
        {clientes.map(cliente => (
          <li key={cliente.id} className="p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">{cliente.nome}</h3>
                <p><span className="font-semibold">Nome Social:</span> {cliente.nomeSocial}</p>
                <p><span className="font-semibold">Data de Nascimento:</span> {formatarData(cliente.dataNascimento)}</p>
                
                <div className="space-y-2">
                  <p className="font-semibold">Endereço:</p>
                  <p>{cliente.rua}, {cliente.numero}</p>
                  <p>{cliente.bairro} - {cliente.cidade} - {cliente.estado}</p>
                  <p>CEP: {cliente.cep}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="font-semibold">Documentos:</p>
                  <ul className="pl-4 list-disc">
                    {cliente.documentos?.map((documento, index) => (
                      <li key={index}>
                        {documento.tipo}: {documento.numero}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <p className="font-semibold">Dependentes:</p>
                  <ul className="pl-4 list-disc">
                    {cliente.dependentes?.map(dependente => (
                      <li key={dependente.id} className="pt-2">
                        <p><span className="font-semibold">Nome:</span> {dependente.nome}</p>
                        <p><span className="font-semibold">Nome Social:</span> {dependente.nomeSocial}</p>
                        <p><span className="font-semibold">Data de Nascimento:</span> {formatarData(dependente.dataNascimento)}</p>
                        <p className="font-semibold">Documentos:</p>
                        <ul className="pl-4 list-disc">
                          {dependente.documentos?.map((documento, index) => (
                            <li key={index}>
                              {documento.tipo}: {documento.numero}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(cliente.id)}
                  className="text-blue-500 hover:text-blue-600"
                  title="Editar Cliente"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(cliente.id)}
                  className="text-red-500 hover:text-red-600"
                  title="Excluir Cliente"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientePage;