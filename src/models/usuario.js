import {BD} from '../../db.js'

class Usuario {
    //função estática para novo usuario
    static async novoUsuario(nome, email, senha){
        //receber o resultado do banco de dados
        const resultado = await BD.query(`
            INSERT INTO prod_usuarios (nome, email, senha)
            VALUES ($1, $2, $3)
            `, [nome, email, senha])
            return resultado.rows[0];
    }

    //função estática para listar todos os usuarios
    static async listar(){
        const resultado = await BD.query(`
            SELECT * FROM prod_usuarios
            `)
            return resultado.rows; //retornar todos os usuarios
        }
}

export default Usuario;