import express from 'express';
import MovimentacaoController from '../controllers/movimentacaoController.js';


const router = express.Router();
//rota para criar uma nova movimentação
router.post('/movimentacoes', MovimentacaoController.novaMovimentacao);
//rota para listar todas as movimentações
router.get('/movimentacoes', MovimentacaoController.listar);
//rota para consultar por ID
router.get('/movimentacoes/:id', MovimentacaoController.consultaPorId)
//rota para deletar uma movimentação
router.delete('/movimentacoes/:id', MovimentacaoController.deletar);
//rota pra atualizar movimentacao
router.put('/movimentacao/:id', MovimentacaoController.atualizarTodosCampos)
//rota pra atualizar sem precisar mudar todos
router.patch('/movimentacao/:id', MovimentacaoController.atualizar)

export default router;