import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Cliente {
  nome: string;
  nomeSocial: string;
  dataNascimento: string;
  endereco: Endereco | null;
  documentos: Documento[];
}

interface Endereco {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  codigoPostal: string;
}

interface Documento {
  tipo: string;
  numero: string;
}

const CadastroClientePage: React.FC = () => {
  const [etapa, setEtapa] = useState(1);
  const [cliente, setCliente] = useState<Cliente>({
    nome: '',
    nomeSocial: '',
    dataNascimento: '',
    endereco: null,
    documentos: [],
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!cliente.endereco) {
      setCliente({ ...cliente, endereco: {} as Endereco });
    }
    setCliente({
      ...cliente,
      endereco: {
        ...cliente.endereco!,
        [e.target.name]: e.target.value,
      },
    });
  };

  const proximaEtapa = () => setEtapa(etapa + 1);
  const etapaAnterior = () => setEtapa(etapa - 1);

  const handleDocumentoRedirect = (tipo: string) => {
    navigate(`/cadastro-documento/${tipo}`);
  };

  const renderizarEtapa = () => {
    switch (etapa) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl mb-4">Dados Pessoais</h2>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={cliente.nome}
              onChange={handleChange}
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              name="nomeSocial"
              placeholder="Nome Social"
              value={cliente.nomeSocial}
              onChange={handleChange}
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="date"
              name="dataNascimento"
              placeholder="Data de Nascimento"
              value={cliente.dataNascimento}
              onChange={handleChange}
              className="mb-2 p-2 border rounded w-full"
            />
            <button onClick={proximaEtapa} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              Próxima
            </button>
          </div>
        );
        case 2:
          return (
            <div>
              <h2 className="text-2xl mb-4">Endereço</h2>
              <input
                type="text"
                name="rua"
                placeholder="Rua"
                value={cliente.endereco?.rua || ''}
                onChange={handleEnderecoChange}
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="bairro"
                placeholder="Bairro"
                value={cliente.endereco?.bairro || ''}
                onChange={handleEnderecoChange}
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="cidade"
                placeholder="Cidade"
                value={cliente.endereco?.cidade || ''}
                onChange={handleEnderecoChange}
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="estado"
                placeholder="Estado"
                value={cliente.endereco?.estado || ''}
                onChange={handleEnderecoChange}
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="pais"
                placeholder="País"
                value={cliente.endereco?.pais || ''}
                onChange={handleEnderecoChange}
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="codigoPostal"
                placeholder="Código Postal"
                value={cliente.endereco?.codigoPostal || ''}
                onChange={handleEnderecoChange}
                className="mb-2 p-2 border rounded w-full"
              />
              <button onClick={etapaAnterior} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded mr-2">
                Anterior
              </button>
              <button onClick={proximaEtapa} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Próxima
              </button>
            </div>
          );        
      case 3:
        return (
          <div>
            <h2 className="text-2xl mb-4">Documentos</h2>
            <button onClick={() => handleDocumentoRedirect('CPF')} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
              Adicionar CPF
            </button>
            <button onClick={() => handleDocumentoRedirect('RG')} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
              Adicionar RG
            </button>
            <button onClick={() => handleDocumentoRedirect('Passaporte')} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
              Adicionar Passaporte
            </button>
            <button onClick={etapaAnterior} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded mr-2">
              Anterior
            </button>
            <button onClick={() => alert('Cadastro finalizado!')} className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
              Finalizar
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      {renderizarEtapa()}
    </div>
  );
};

export default CadastroClientePage;
