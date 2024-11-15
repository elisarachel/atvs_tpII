import { Router } from 'express';
import { cadastrarDocumento } from '../controllers/documentoController';

const router = Router();

// Rota para cadastro de documento
router.post('/cadastrar', cadastrarDocumento);

export default router;