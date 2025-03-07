import Express from 'express';
import ProdutoController from '../controllers/produtoController.js';

const router = Express.Router();

//rota para criar um novo produto
router.post('/produtos', ProdutoController.novoProduto);

export default router;