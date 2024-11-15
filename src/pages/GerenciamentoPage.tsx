import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';

interface Hospedagem {
  id: string;
  cliente: {
    nome: string;
  };
  acomodacao: {
    nomeAcomodacao: string;
  };
  checkIn: string;
}

interface Acomodacao {
  id: number;
  nomeAcomodacao: string;
  camas: string;
  climatizacao: string;
  garagem: string;
  suites: string;
}

const GerenciamentoPage: React.FC = () => {
  const navigate = useNavigate();
  const [hospedagensAtivas, setHospedagensAtivas] = useState<Hospedagem[]>([]);

  const acomodacoes: Acomodacao[] = [
    { id: 1, nomeAcomodacao: 'Casal Simples', camas: '1 Cama de Casal', climatizacao: 'Sim', garagem: '1 vaga', suites: 'Sim' },
    { id: 2, nomeAcomodacao: 'Família Simples', camas: '1 Cama de Casal, 2 Camas de Solteiro', climatizacao: 'Sim', garagem: '1 vaga', suites: 'Sim' },
    { id: 3, nomeAcomodacao: 'Família Mais', camas: '1 Cama de Casal, 5 Camas de Solteiro', climatizacao: 'Sim', garagem: '2 vagas', suites: '2 Suítes' },
    { id: 4, nomeAcomodacao: 'Família Super', camas: '2 Camas de Casal, 6 Camas de Solteiro', climatizacao: 'Sim', garagem: '2 vagas', suites: '3 Suítes' },
    { id: 5, nomeAcomodacao: 'Solteiro Simples', camas: '1 Cama de Solteiro', climatizacao: 'Sim', garagem: '0 vagas', suites: 'Sim' },
    { id: 6, nomeAcomodacao: 'Solteiro Mais', camas: '1 Cama de Casal', climatizacao: 'Sim', garagem: '1 vaga', suites: 'Sim' },
  ];

  const handleBack = () => {
    navigate('/');
  }

  useEffect(() => {
    const fetchHospedagensAtivas = async () => {
      try {
        const response = await api.get('/hospedagens/listar-ativas');
        setHospedagensAtivas(response.data);
      } catch (error) {
        console.error('Erro ao buscar hospedagens ativas:', error);
      }
    };

    fetchHospedagensAtivas();
  }, []);

  const handleManageHospedagens = () => {
    navigate('/hospedagem'); // Navega para a página de hospedagem
  };

  const handleCheckout = async (id: string) => {
    try {
      await api.post(`/hospedagens/checkout`);
      // Atualize a lista de hospedagens ativas após o checkout
      const response = await api.get('/hospedagens/listar-ativas');
      setHospedagensAtivas(response.data);
    } catch (error) {
      console.error('Erro ao registrar checkout:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Área do Gerente</h2>
      {/* Botão para gerenciar hospedagens */}
      <div className="flex space-x-4">
      <button
        onClick={handleBack}
        className="mb-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        Voltar para a Página Inicial
      </button>
      <button
        onClick={handleManageHospedagens}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Gerenciar Hospedagens
      </button>
      </div>
      {/* Lista de hospedagens ativas */}
      <div className="bg-white shadow-md rounded overflow-hidden mb-4">
        <table className="min-w-full text-left text-gray-700">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4">Cliente</th>
              <th className="py-2 px-4">Tipo de Acomodação</th>
              <th className="py-2 px-4">Check-In</th>
              <th className="py-2 px-4">Ações</th>

            </tr>
          </thead>
          <tbody>
            {hospedagensAtivas.map(hospedagem => (
              <tr key={hospedagem.id} className="border-b">
                <td className="py-2 px-4">{hospedagem.cliente.nome}</td>
                <td className="py-2 px-4">{hospedagem.acomodacao.nomeAcomodacao}</td>
                <td className="py-2 px-4">{new Date(hospedagem.checkIn).toLocaleDateString()}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleCheckout(hospedagem.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Registrar Checkout
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lista de acomodações */}
      <div className="bg-white shadow-md rounded overflow-hidden">
        <table className="min-w-full text-left text-gray-700">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4">Tipo de Acomodação</th>
              <th className="py-2 px-4">Camas</th>
              <th className="py-2 px-4">Climatização</th>
              <th className="py-2 px-4">Garagem</th>
              <th className="py-2 px-4">Suítes</th>
            </tr>
          </thead>
          <tbody>
            {acomodacoes.map((acomodacao) => (
              <tr key={acomodacao.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{acomodacao.nomeAcomodacao}</td>
                <td className="py-2 px-4">{acomodacao.camas}</td>
                <td className="py-2 px-4">{acomodacao.climatizacao}</td>
                <td className="py-2 px-4">{acomodacao.garagem}</td>
                <td className="py-2 px-4">{acomodacao.suites}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GerenciamentoPage;
