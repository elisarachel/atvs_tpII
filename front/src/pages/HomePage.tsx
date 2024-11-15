import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Bem-vindo ao Sistema Atlantis</h1>
      
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => navigate('/cliente')}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Área de Cliente
        </button>
        
        <button
          onClick={() => navigate('/gerenciamento')}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Gerenciamento
        </button>
      </div>
    </div>
  );
};

export default HomePage;
