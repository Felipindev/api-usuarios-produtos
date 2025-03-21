import Express from 'express';
import UsuarioController from '../controllers/usuarioController.js';

const router = Express.Router();

//rota para criar um novo usuario
router.post('/usuarios', UsuarioController.novoUsuario);
//rota para listar todos os usuarios
router.get('/usuarios', UsuarioController.listar);

export default router;