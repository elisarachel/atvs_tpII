import { Request, RequestHandler, Response } from 'express';
import Documento from '../models/documento';
import Cliente from '../models/cliente';

export const cadastrarDocumento: RequestHandler = async (req: Request, res: Response): Promise<void> => {
	try {
		const { tipo, numero, clienteId } = req.body;
		
		// Encontra o cliente pelo ID
		const cliente = await Cliente.findByPk(clienteId);
		
		if (!cliente) {
			res.status(404).json({ message: 'Cliente não encontrado' });
			return;
		}
		
		// Cria e adiciona o documento ao cliente
		const documento = await Documento.create({
			tipo,
			numero,
			dataExpedicao: new Date(),
			clienteId: cliente.id,
		});
		
		res.status(201).json({ message: 'Documento cadastrado com sucesso', documento });
	} catch (error) {
		res.status(500).json({ message: 'Erro ao cadastrar documento', error });
	}
};

export const listarDocumentos: RequestHandler = async (req: Request, res: Response): Promise<void> => {
	try {
		const documentos = await Documento.findAll();
		res.status(200).json(documentos);
	} catch (error) {
		res.status(500).json({ message: 'Erro ao listar documentos', error });
	}
};

export const editarDocumento: RequestHandler = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const { tipo, numero } = req.body;
		
		const documento = await Documento.findByPk(id);
		
		if (!documento) {
			res.status(404).json({ message: 'Documento não encontrado' });
			return;
		}
		
		documento.tipo = tipo;
		documento.numero = numero;
		
		await documento.save();
		
		res.status(200).json({ message: 'Documento atualizado com sucesso', documento });
	} catch (error) {
		res.status(500).json({ message: 'Erro ao editar documento', error });
	}
};

export const excluirDocumento: RequestHandler = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		
		const documento = await Documento.findByPk(id);
		
		if (!documento) {
			res.status(404).json({ message: 'Documento não encontrado' });
			return;
		}
		
		await documento.destroy();
		
		res.status(200).json({ message: 'Documento excluído com sucesso' });
	} catch (error) {
		res.status(500).json({ message: 'Erro ao excluir documento', error });
	}
};