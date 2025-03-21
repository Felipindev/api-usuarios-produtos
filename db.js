import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();
const BD = new Pool({
    connectionString: "postgres://postgres.zcqromfguldlvpbhhtzv:Uzjq3sQVwzyJTm12@aws-0-sa-east-1.pooler.supabase.com:5432/postgres",
    ssl:{
        rejectUnauthorized: false, //requer ssl
    }
})
// const BD = new Pool({

//     // connectionString: process.env.DATABASE_URL,
//     // user: 'postgres',           //nome do usuario do banco de dados
//     // host: 'localhost',          //local onde está o banco de dados
//     // database: 'bd_produtos',    //nome do banco de dados
//     // password: 'admin',          //senha do banco de dados
//     // port: 5433,                 //porta de conexão com o banco de dados
// })

const testarConexao = async () =>{
    try {
        const client = await BD.connect(); //tenta se conectar com o banco de dados
        console.log("✔ Conexão com o banco de dados estabelecida!");
        client.release(); //libera a conexão
    } catch (error) {
        console.error("Erro ao conectar com o banco de dados", error.message);
    }
}
export { BD, testarConexao };
