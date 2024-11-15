import { Request, Response } from 'express';
import Hospedagem from '../models/hospedagem';
import Cliente from '../models/cliente';
import Acomodacao from '../models/acomodacao';
import Documento from '../models/documento';

export const registrarHospedagem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { acomodacaoId, documentoCliente } = req.body;

    // Encontra o cliente pelo documento
    const cliente = await Cliente.findOne({
      include: [
        {
          model: Documento,
          as: 'documentos',
          where: { numero: documentoCliente },
        },
      ],
    });

    if (!cliente) {
      res.status(404).json({ message: 'Cliente não encontrado' });
      return;
    }

    // Encontra a acomodação pelo ID
    const acomodacao = await Acomodacao.findByPk(acomodacaoId);

    if (!acomodacao) {
      res.status(404).json({ message: 'Acomodação não encontrada' });
      return;
    }

    // Cria a hospedagem
    const hospedagem = await Hospedagem.create({
      clienteId: cliente.id,
      acomodacaoId: acomodacao.id,
      checkIn: new Date(),
    });

    res.status(201).json({ message: 'Hospedagem registrada com sucesso', hospedagem });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar hospedagem', error });
  }
};

export const listarHospedagensAtivas = async (req: Request, res: Response): Promise<void> => {
  try {
    const hospedagens = await Hospedagem.findAll({
      where: { checkOut: null },
      include: [
        { model: Cliente, as: 'cliente' },
        { model: Acomodacao, as: 'acomodacao' },
      ],
    });
    res.status(200).json(hospedagens);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar hospedagens ativas', error });
  }
};

export const registrarCheckOut = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;

    // Encontra a hospedagem ativa pelo ID
    const hospedagem = await Hospedagem.findOne({
      where: { id, checkOut: null },
      include: [
        { model: Cliente, as: 'cliente' },
        { model: Acomodacao, as: 'acomodacao' },
      ],
    });

    if (!hospedagem) {
      res.status(404).json({ message: 'Hospedagem ativa não encontrada para o ID fornecido' });
      return;
    }

    // Registra a data de check-out na hospedagem
    hospedagem.checkOut = new Date();
    await hospedagem.save();

    res.status(200).json({ message: 'Check-out registrado com sucesso', hospedagem });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar check-out', error });
    console.error(error);
  }
};