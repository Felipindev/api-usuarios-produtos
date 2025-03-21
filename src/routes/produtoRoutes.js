import Express from 'express';
import ProdutoController from '../controllers/produtoController.js';

const router = Express.Router();

//rota para criar um novo produto
router.post('/produtos', ProdutoController.novoProduto);
//rota para listar todos os produtos
router.get('/produtos', ProdutoController.listar);
//rota para deletar um produto
router.delete('/produtos/:id', ProdutoController.deletar);

export default router;