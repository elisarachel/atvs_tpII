import { Router } from 'express';
import { cadastrarCliente, editarCliente, listarClientes, excluirCliente, buscarClientePorId, buscarClientePorDocumento } from '../controllers/clienteController';

const router = Router();

// Rota para cadastro de cliente
router.post('/cadastrar', cadastrarCliente);

// Rota para edição de cliente
router.put('/editar/:id', editarCliente);

// Rota para listagem de clientes
router.get('/listar', listarClientes);

// Rota para exclusão de cliente
router.delete('/excluir/:id', excluirCliente);

// Rota pra buscar cliente por documento
router.get('/buscar', buscarClientePorDocumento);

// Rota pra buscar cliente por id
router.get('/:id', buscarClientePorId);


export default router;
