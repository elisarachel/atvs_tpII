import { Request, Response } from 'express';
import Cliente from '../models/cliente';
import Documento from '../models/documento';
import { TipoDocumento } from '../enumeracoes/TipoDocumento';

export const cadastrarCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, nomeSocial, dataNascimento, rua, numero, bairro, cidade, estado, cep, documentos, dependentes } = req.body;

    // Cria o cliente
    const cliente = await Cliente.create({
      nome,
      nomeSocial,
      dataNascimento,
      dataCadastro: new Date(),
      rua,
      numero,
      bairro,
      cidade,
      estado,
      cep,
    });

    

    // Adiciona os documentos ao cliente
    if (documentos && documentos.length > 0) {
      for (const documento of documentos) {
        await Documento.create({
          ...documento,
          tipo: documento.tipo as TipoDocumento, // Certifique-se de que o tipo está correto
          clienteId: cliente.id,
        });
      }
    }

    // Adiciona os dependentes ao cliente
    if (dependentes && dependentes.length > 0) {
      for (const dependente of dependentes) {
        const novoDependente = await Cliente.create({
          nome: dependente.nome,
          nomeSocial: dependente.nomeSocial,
          dataNascimento: new Date(dependente.dataNascimento),
          titularId: cliente.id,
        });

        // Adiciona os documentos ao dependente
        if (dependente.documentos && dependente.documentos.length > 0) {
          for (const documento of dependente.documentos) {
            await Documento.create({
              ...documento,
              tipo: documento.tipo as TipoDocumento, // Certifique-se de que o tipo está correto
              clienteId: novoDependente.id,
            });
          }
        }
      }
    }

    res.status(201).json({ message: 'Cliente cadastrado com sucesso', cliente });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: 'Erro ao cadastrar cliente', error });
  }
};

export const listarClientes = async (req: Request, res: Response): Promise<void> => {
	try {
		const clientes = await Cliente.findAll({
			include: [
				{ model: Documento, as: 'documentos' },
			],
		});
		res.status(200).json(clientes);
	} catch (error) {
		res.status(500).json({ message: 'Erro ao listar clientes', error });
	}
};

export const editarCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nome, nomeSocial, dataNascimento, rua, numero, bairro, cidade, estado, cep, documentos, dependentes } = req.body;

    const cliente = await Cliente.findByPk(id, {
      include: [
        { model: Documento, as: 'documentos' },
        { model: Cliente, as: 'dependentes' },
      ],
    });

    if (!cliente) {
      res.status(404).json({ message: 'Cliente não encontrado' });
      return;
    }

    cliente.nome = nome;
    cliente.nomeSocial = nomeSocial;
    cliente.dataNascimento = new Date(dataNascimento);
    cliente.rua = rua;
    cliente.numero = numero;
    cliente.bairro = bairro;
    cliente.cidade = cidade;
    cliente.estado = estado;
    cliente.cep = cep;  

    // Atualiza os documentos
    if (documentos && documentos.length > 0) {
      await Documento.destroy({ where: { clienteId: cliente.id } });
      for (const documento of documentos) {
        await Documento.create({
          ...documento,
          clienteId: cliente.id,
        });
      }
    }

    // Atualiza os dependentes
    if (dependentes && dependentes.length > 0) {
      await Cliente.destroy({ where: { titularId: cliente.id } });
      for (const dependente of dependentes) {
        const novoDependente = await Cliente.create({
          nome: dependente.nome,
          nomeSocial: dependente.nomeSocial,
          dataNascimento: new Date(dependente.dataNascimento),
          titularId: cliente.id,
        });

        for (const documento of dependente.documentos) {
          await Documento.create({
            ...documento,
            clienteId: novoDependente.id,
          });
        }
      }
    }

    await cliente.save();

    res.status(200).json({ message: 'Cliente atualizado com sucesso', cliente });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao editar cliente', error });
  }
};

export const excluirCliente = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		
		const cliente = await Cliente.findByPk(id);
		
		if (!cliente) {
			res.status(404).json({ message: 'Cliente não encontrado' });
			return;
		}
		
		await cliente.destroy();
		
		res.status(200).json({ message: 'Cliente excluído com sucesso' });
	} catch (error) {
		res.status(500).json({ message: 'Erro ao excluir cliente', error });
	}
};

export const buscarClientePorId = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		
		const cliente = await Cliente.findByPk(id, {
			include: [
				{ model: Documento, as: 'documentos' },
				{ model: Cliente, as: 'dependentes' },
			],
		});
		
		if (!cliente) {
			res.status(404).json({ message: 'Cliente não encontrado' });
			return;
		}
		
		res.status(200).json(cliente);
	} catch (error) {
		res.status(500).json({ message: 'Erro ao buscar cliente', error });
	}
}

export const buscarClientePorDocumento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { numero } = req.query;

    const cliente = await Cliente.findOne({
      include: [
        {
          model: Documento,
          as: 'documentos',
          where: { numero }, // Only search by numero
          required: true, // Ensure the client has at least one matching document
        },
        { model: Cliente, as: 'dependentes' },
      ],
    });

    if (!cliente) {
      res.status(404).json({ message: 'Cliente não encontrado' });
      return;
    }

    res.status(200).json(cliente);
  } catch (error) {
    console.error('Erro ao buscar cliente:', error); // Log the error for debugging
    res.status(500).json({ message: 'Erro ao buscar cliente', error });
  }
};
