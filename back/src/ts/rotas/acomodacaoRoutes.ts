import { Router } from "express";
import { listarAcomodacoes } from "../controllers/acomodacaoController";

const router = Router();

// Rota para listagem de acomodações
router.get('/listar', listarAcomodacoes);

export default router;