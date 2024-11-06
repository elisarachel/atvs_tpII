import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Acomodacao {
  id: number;
  tipo: string;
  camas: string;
  climatizacao: string;
  garagem: string;
  suites: string;
}

const GerentePage: React.FC = () => {
  const navigate = useNavigate();

  const acomodacoes: Acomodacao[] = [
    { id: 1, tipo: 'Casal Simples', camas: '1 Cama de Casal', climatizacao: 'Sim', garagem: '1 vaga', suites: 'Sim' },
    { id: 2, tipo: 'Família Simples', camas: '1 Cama de Casal, 2 Camas de Solteiro', climatizacao: 'Sim', garagem: '1 vaga', suites: 'Sim' },
    { id: 3, tipo: 'Família Mais', camas: '1 Cama de Casal, 5 Camas de Solteiro', climatizacao: 'Sim', garagem: '2 vagas', suites: '2 Suítes' },
    { id: 4, tipo: 'Família Super', camas: '2 Camas de Casal, 6 Camas de Solteiro', climatizacao: 'Sim', garagem: '2 vagas', suites: '3 Suítes' },
    { id: 5, tipo: 'Solteiro Simples', camas: '1 Cama de Solteiro', climatizacao: 'Sim', garagem: '0 vagas', suites: 'Sim' },
    { id: 6, tipo: 'Solteiro Mais', camas: '1 Cama de Casal', climatizacao: 'Sim', garagem: '1 vaga', suites: 'Sim' },
  ];

  const handleManageHospedagens = () => {
    navigate('/hospedagem'); // Navega para a página de hospedagem
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Área do Gerente</h2>
      {/* Botão para gerenciar hospedagens */}
      <button
        onClick={handleManageHospedagens}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Gerenciar Hospedagens
      </button>

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
                <td className="py-2 px-4">{acomodacao.tipo}</td>
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

export default GerentePage;
