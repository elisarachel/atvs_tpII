// CadastroDocumentoPage.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Documento {
  tipo: string;
  numero: string;
}

const CadastroDocumentoPage: React.FC = () => {
  const { tipo } = useParams<{ tipo: string }>(); // Recebe o tipo do documento como parâmetro
  const [numero, setNumero] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    // Simula salvar o documento e redireciona de volta para a página de cadastro de cliente
    console.log(`Salvando documento ${tipo}: ${numero}`);
    navigate('/cadastro-cliente'); // Redireciona para a página de cadastro de cliente
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Cadastrar {tipo}</h2>
      <input
        type="text"
        placeholder={`Digite o número do ${tipo}`}
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">
        Salvar Documento
      </button>
    </div>
  );
};

export default CadastroDocumentoPage;
