import express from 'express'
import { testarConexao } from './db.js'

const app = express() //criar uma instancia
testarConexao();

const PORT = 3000;
app.listen(PORT,() =>{
    console.log(`Api rodando no http://localhost:${PORT}`);
})
