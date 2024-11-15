import React, { useState, useEffect } from 'react';
import api from '../config/api'; // Importe o arquivo de configuração do axios
import { useNavigate } from 'react-router-dom';

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
	const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);
	const [hospedagensAtivas, setHospedagensAtivas] = useState<Hospedagem[]>([]);
	const [erro, setErro] = useState<string>(''); // Estado para armazenar a mensagem de erro
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAcomodacoes = async () => {
			try {
				const response = await api.get('/acomodacoes/listar');
				setAcomodacoes(response.data);
			} catch (error) {
				console.error('Erro ao buscar acomodações:', error);
			}
		};

		fetchAcomodacoes();
	}, []);

	const handleBuscarCliente = async () => {
		try {
			const response = await api.get(`/clientes/buscar?numero=${numeroDocumento}`);
			if (response.data) {
				setCliente(response.data);
				setErro('');
			} else {
				setErro('Cliente não encontrado com o documento fornecido.');
			}
		} catch (error) {
			console.error('Erro ao buscar cliente:', error);
			setErro('Erro ao buscar cliente.');
		}
	};
	

	const handleRegistrarHospedagem = async () => {
		if (!cliente || !acomodacao) {
			console.error('Cliente ou acomodação não selecionados');
			return;
		}

		try {
			await api.post('/hospedagens/registrar', {
				documentoCliente: numeroDocumento,
				acomodacaoId: acomodacao.id,
			});
			console.log('Hospedagem registrada com sucesso');
			// Atualize a lista de hospedagens ativas
			const response = await api.get('/hospedagens/listar-ativas');
			setHospedagensAtivas(response.data);
			navigate('/gerenciamento');
		} catch (error) {
			console.error('Erro ao registrar hospedagem:', error);
		}
	};

	const handleAcomodacaoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedAcomodacao = acomodacoes.find(
			(acom) => String(acom.id) === e.target.value // Comparação de string com string
		);
		setAcomodacao(selectedAcomodacao || null);
	};
	

	return (
		<div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
			<h2 className="text-2xl font-semibold mb-4">Registrar Hospedagem</h2>
			{erro && <p className="text-red-500 mt-2">{erro}</p>} {/* Exibe a mensagem de erro */}
			<div className="mb-4">
				<label className="block text-gray-700">Número do Documento:</label>
				<input
					type="text"
					value={numeroDocumento}
					onChange={(e) => setNumeroDocumento(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded mt-2"
				/>
				<button
					onClick={handleBuscarCliente}
					className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
				>
					Buscar Cliente
				</button>
			</div>
			{cliente && (
				<div className="mb-4">
					<h3 className="text-xl font-semibold">Cliente: {cliente.nome}</h3>
					<div className="mt-2">
						<label className="block text-gray-700">Acomodação:</label>
						<select
							value={acomodacao?.id || ''}
							onChange={handleAcomodacaoChange}
							className="w-full p-2 border border-gray-300 rounded mt-2"
						>
							<option value="">Selecione uma acomodação</option>
							{acomodacoes.map((acom) => (
							<option key={acom.id} value={acom.id}>
								{acom.nomeAcomodacao}
							</option>
							))}
						</select>
					</div>
					<button
						onClick={handleRegistrarHospedagem}
						className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
					>
						Registrar Hospedagem
					</button>
				</div>
			)}
		</div>
	);
};

export default RegistrarHospedagemPage;