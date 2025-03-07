import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { testarConexao } from './db.js'
import usuarioRoutes from './src/routes/usuarioRoutes.js'
import produtosRoutes from './src/routes/produtoRoutes.js'

const app = express() //criar uma instancia
testarConexao();

app.use(cors()); //habilitar o cors

//uso do middleware (body-parser) para converter os valores do corpo da requisição em JSON
app.use(bodyParser.json());

//definir rota de usuario importadas no arquivo usuarioRoutes
app.use(usuarioRoutes);
app.use(produtosRoutes);

const PORT = 3000;
app.listen(PORT,() =>{
    console.log(`Api rodando no http://localhost:${PORT}`);
})
