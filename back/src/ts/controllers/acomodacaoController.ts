import Acomodacao from "../models/acomodacao";
import { Request, Response } from 'express';

export const listarAcomodacoes = async (req: Request, res: Response) => {
	try {
		const acomodacoes = await Acomodacao.findAll();
		res.status(200).json(acomodacoes);
	} catch (error) {
		res.status(500).json({ message: 'Erro ao listar acomodações', error });
	}
}