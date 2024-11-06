import React, { useState } from 'react';

interface Cliente {
	nome: string;
	documentos: { numero: string; tipo: string }[];
}

interface Acomodacao {
	id: number;
	nomeAcomodacao: string;
}

interface Hospedagem {
	nomeCliente: string;
	documento: string;
	acomodacao: string;
	checkIn: Date;
}

const RegistrarHospedagemPage: React.FC = () => {
	const [numeroDocumento, setNumeroDocumento] = useState('');
	const [cliente, setCliente] = useState<Cliente | null>(null);
	const [acomodacao, setAcomodacao] = useState<Acomodacao | null>(null);
	const [hospedagensAtivas, setHospedagensAtivas] = useState<Hospedagem[]>([]);
	
	// Dados mockados para as acomodações
	const acomodacoes: Acomodacao[] = [
		{ id: 1, nomeAcomodacao: 'Casal Simples' },
		{ id: 2, nomeAcomodacao: 'Família Simples' },
		{ id: 3, nomeAcomodacao: 'Família Mais' },
		{ id: 4, nomeAcomodacao: 'Família Super' },
		{ id: 5, nomeAcomodacao: 'Solteiro Simples' },
		{ id: 6, nomeAcomodacao: 'Solteiro Mais' },
	];
	
	// Dados mockados para clientes
	const clientes: Cliente[] = [
		{ nome: 'João Silva', documentos: [{ numero: '123456789', tipo: 'CPF' }] },
		{ nome: 'Maria Oliveira', documentos: [{ numero: '987654321', tipo: 'CPF' }] },
	];
	
	const handleRegistrarHospedagem = () => {
		// Encontrar cliente pelo documento
		const clienteEncontrado = clientes.find(cliente =>
			cliente.documentos.some(doc => doc.numero === numeroDocumento && doc.tipo === 'CPF')
		);
		
		if (!clienteEncontrado) {
			alert('Cliente não encontrado. Certifique-se de que o cliente esteja cadastrado.');
			return;
		}
		
		setCliente(clienteEncontrado);
		
		if (acomodacao) {
			// Registrar hospedagem
			const novaHospedagem: Hospedagem = {
				nomeCliente: clienteEncontrado.nome,
				documento: clienteEncontrado.documentos[0].numero,
				acomodacao: acomodacao.nomeAcomodacao,
				checkIn: new Date(),
			};
			
			setHospedagensAtivas([...hospedagensAtivas, novaHospedagem]);
			
			alert(`Hospedagem registrada para ${clienteEncontrado.nome} na acomodação ${acomodacao.nomeAcomodacao}.`);
			setNumeroDocumento('');
			setAcomodacao(null);
		} else {
			alert('Selecione uma acomodação.');
		}
	};
	
	return (
		<div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-20">
		<h2 className="text-2xl font-semibold mb-6">Registrar Hospedagem</h2>
		
		<div className="mb-4">
		<label className="block text-gray-700">Número do Documento do Cliente:</label>
		<input
		type="text"
		value={numeroDocumento}
		onChange={(e) => setNumeroDocumento(e.target.value)}
		className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
		placeholder="Digite o número do documento"
		/>
		</div>
		
		<div className="mb-4">
		<label className="block text-gray-700">Selecione a Acomodação:</label>
		<select
		value={acomodacao ? acomodacao.id : ''}
		onChange={(e) =>
			setAcomodacao(acomodacoes.find((a) => a.id === parseInt(e.target.value)) || null)
		}
		className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
		<option value="">Escolha uma acomodação</option>
		{acomodacoes.map((acomod) => (
			<option key={acomod.id} value={acomod.id}>
			{acomod.nomeAcomodacao}
			</option>
		))}
		</select>
		</div>
		
		<button
		onClick={handleRegistrarHospedagem}
		className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
		>
		Registrar Hospedagem
		</button>
		
		{/* Lista de hospedagens ativas */}
		{hospedagensAtivas.length > 0 && (
			<div className="mt-6">
			<h3 className="text-xl font-semibold mb-4">Hospedagens Ativas</h3>
			<ul>
			{hospedagensAtivas.map((hospedagem, index) => (
				<li key={index} className="mb-2 border-b pb-2">
				<p><strong>Cliente:</strong> {hospedagem.nomeCliente}</p>
				<p><strong>Acomodação:</strong> {hospedagem.acomodacao}</p>
				<p><strong>Check-in:</strong> {hospedagem.checkIn.toLocaleString()}</p>
				</li>
			))}
			</ul>
			</div>
		)}
		</div>
	);
};

export default RegistrarHospedagemPage;
