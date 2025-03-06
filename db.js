import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

const BD = new Pool({
    connectionString: process.env.DATABASE_URL,
})

const testarConexao = async () =>{
    try {
        const client = await BD.connect(); //tenta se conectar com o banco de dados
        console.log("✔ Conexão com o banco de dados estabelecida");
        client.release(); //libera a conexão
    } catch (error) {
        console.error("Erro ao conectar com o banco de dados", error.message);
    }
}
export { BD, testarConexao };
