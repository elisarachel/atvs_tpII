import { Router } from 'express';
import { registrarHospedagem, listarHospedagensAtivas, registrarCheckOut } from '../controllers/hospedagemController';

const router = Router();

// Rota para registrar hospedagem
router.post('/registrar', registrarHospedagem);

// Rota para listar hospedagens ativas
router.get('/listar-ativas', listarHospedagensAtivas);

// Rota para registrar check-out
router.post('/checkout', registrarCheckOut);

export default router;