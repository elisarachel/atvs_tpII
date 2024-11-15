import { Request, RequestHandler, Response } from 'express';
import Cliente from '../models/cliente';
import Documento from '../models/documento';

export const listarDependentes: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { cpfTitular } = req.params;

        // Encontra o titular pelo CPF
        const titular = await Cliente.findOne({
            include: [
                {
                    model: Documento,
                    as: 'documentos',
                    where: { tipo: 'CPF', numero: cpfTitular },
                },
            ],
        });

        if (titular) {
            const dependentes = await titular.getDependentes();
            if (dependentes && dependentes.length > 0) {
                res.status(200).json(dependentes);
            } else {
                res.status(200).json([]);
            }
        } else {
            res.status(404).json({ message: 'Titular não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar dependentes', error });
    }
}

export const cadastrarDependente: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { cpfTitular } = req.params;
        const { nome, dataNascimento, cpfDependente } = req.body;

        // Encontra o titular pelo CPF
        const titular = await Cliente.findOne({
            include: [
                {
                    model: Documento,
                    as: 'documentos',
                    where: { tipo: 'CPF', numero: cpfTitular },
                },
            ],
        });

        if (titular) {
            const dependente = await Cliente.create({
                nome,
                dataNascimento,
            });

            await Documento.create({
                tipo: 'CPF',
                numero: cpfDependente,
                clienteId: dependente.id,
            });

            await dependente.setTitular(titular);

            res.status(201).json({ message: 'Dependente cadastrado com sucesso', dependente });
        } else {
            res.status(404).json({ message: 'Titular não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar dependente', error });
    }
}

export const removerDependente: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { cpfTitular, cpfDependente } = req.params;

        // Encontra o titular pelo CPF
        const titular = await Cliente.findOne({
            include: [
                {
                    model: Documento,
                    as: 'documentos',
                    where: { tipo: 'CPF', numero: cpfTitular },
                },
            ],
        });

        if (titular) {
            const dependente = await Cliente.findOne({
                include: [
                    {
                        model: Documento,
                        as: 'documentos',
                        where: { tipo: 'CPF', numero: cpfDependente },
                    },
                ],
            });

            if (dependente) {
                await dependente.destroy();
                res.status(200).json({ message: 'Dependente removido com sucesso' });
            } else {
                res.status(404).json({ message: 'Dependente não encontrado' });
            }
        } else {
            res.status(404).json({ message: 'Titular não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover dependente', error });
    }
}

export const editarDependente: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { cpfTitular, cpfDependente } = req.params;
        const { nome, dataNascimento } = req.body;

        // Encontra o titular pelo CPF
        const titular = await Cliente.findOne({
            include: [
                {
                    model: Documento,
                    as: 'documentos',
                    where: { tipo: 'CPF', numero: cpfTitular },
                },
            ],
        });

        if (titular) {
            const dependente = await Cliente.findOne({
                include: [
                    {
                        model: Documento,
                        as: 'documentos',
                        where: { tipo: 'CPF', numero: cpfDependente },
                    },
                ],
            });

            if (dependente) {
                dependente.nome = nome;
                dependente.dataNascimento = dataNascimento;
                await dependente.save();

                res.status(200).json({ message: 'Dependente editado com sucesso', dependente });
            } else {
                res.status(404).json({ message: 'Dependente não encontrado' });
            }
        } else {
            res.status(404).json({ message: 'Titular não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao editar dependente', error });
    }
}