import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { testarConexao } from './db.js'
import usuarioRoutes from './src/routes/usuarioRoutes.js'
import produtosRoutes from './src/routes/produtoRoutes.js'
import movimentacoesRoutes from './src/routes/movimentacoesRoutes.js'
import UsuarioController from './src/controllers/usuarioController.js'
import ProdutoController from './src/controllers/produtoController.js'

const app = express() //criar uma instancia
testarConexao();

app.use(cors()); //habilitar o cors

//uso do middleware (body-parser) para converter os valores do corpo da requisição em JSON
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Bem vindo a API do sistema de estoque!");
});

//definir rota de usuario importadas no arquivo usuarioRoutes
app.use(usuarioRoutes);
app.use(produtosRoutes);
app.use(movimentacoesRoutes)

//rotas diretas na controller

//rotas diretas do usuario
app.get('/usuarios/listarTodos', UsuarioController.listarTodos);
app.get('/usuarios/:id', UsuarioController.consultaporID);
app.delete('/usuarios/deletar/:id', UsuarioController.deletar);
app.put('/usuarios/:id', UsuarioController.atualizarTodosCampos);
app.patch('/usuarios/:id', UsuarioController.atualizar);


//rotas diretas do produto
app.get('/produtos/listarTodos', ProdutoController.listarTodos);
app.get('/produtos/:id', ProdutoController.consultaPorID);
app.put('/produtos/:id', ProdutoController.atualizarTodosCampos);
app.patch('/produtos/:id', ProdutoController.atualizar);

const PORT = 3000;
app.listen(PORT,() =>{
    console.log(`Api rodando no http://localhost:${PORT}`);
})

export default app;