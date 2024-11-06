// ClientePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Cliente {
  id: number;
  nome: string;
  email: string;
}

const ClientePage: React.FC = () => {
  const navigate = useNavigate();

  const clientes: Cliente[] = [
    { id: 1, nome: 'João Silva', email: 'joao.silva@email.com' },
    { id: 2, nome: 'Maria Oliveira', email: 'maria.oliveira@email.com' },
  ];

  const handleCreate = () => {
    navigate('/cadastro-cliente'); // Redireciona para a página de cadastro de cliente
  };

  const handleEdit = (id: number) => {
    // Lógica para editar cliente
  };

  const handleDelete = (id: number) => {
    // Lógica para deletar cliente
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Área do Cliente</h2>
      {/* Botão para criar novo cliente */}
      <button
        onClick={handleCreate}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Criar Cliente
      </button>

      {/* Lista de clientes */}
      <div className="bg-white shadow-md rounded overflow-hidden">
        <table className="min-w-full text-left text-gray-700">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4">Nome</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{cliente.nome}</td>
                <td className="py-2 px-4">{cliente.email}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(cliente.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(cliente.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientePage;
