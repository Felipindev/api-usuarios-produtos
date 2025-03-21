import { BD } from "../../db.js";
import  Usuario  from "../models/usuario.js";

class UsuarioController {
    //função para criar um novo usuario
    static async novoUsuario(req, res) {
        const { nome, email, senha } = req.body;

        //validadndo se todos os campos foram preenchidos
        if (!nome || !email || !senha) { //se algum campo estiver vazio
            return res.status(400).json({
                message: "Todos os campos são obrigatórios"
            })
        } try {
            //criar novo usuario, chamando a função estática novoUsuario da classe Usuario
            const usuario = await Usuario.novoUsuario(nome, email, senha)
            return res.status(201).json(usuario) //retornar o usuario criado
        } catch (error) {
            console.error("Erro ao criar novo usuario", error);
            return res.status(500).json({
                message: "Erro ao criar novo usuario", error: error.message
            })            
        }
    }

    //função para listar todos os usuarios
    static async listar(req,res){
        try {
            const usuarios = await Usuario.listar();
            return res.status(200).json(usuarios); 
        } catch (error) {
            console.error("Erro ao listar usuarios", error);
            return res.status(500).json({
                message: "Erro ao listar usuarios", error: error.message
            })
        }
    }

    //Endpoint listar todos
    static async listarTodos(req,res){
        try {
            const usuarios = await BD.query(`SELECT * FROM prod_usuarios`);
            return res.status(200).json(usuarios.rows); 
        } catch (error) {
            console.error("Erro ao listar usuarios", error);
            return res.status(500).json({
                message: "Erro ao listar usuarios", error: error.message
            })
        }
    }
    //endpoint para deletar um usuario
    static async deletar(req,res){
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({
                    message: "ID do usuário não informado"
                })
            }
            const usuario = await BD.query(`DELETE from prod_usuarios WHERE id_usuario = $1`,[id]);
            return res.status(200).json({
                message: "Usuário deletado com sucesso"
            });
        } catch (error) {
            res.status(500).json({
                message:"Erro ao deletar usuário", error: error.message
            })
        }
    }

    //endpoint para atualizar um usuario
   static async atualizarTodosCampos(req,res){
    const {id} = req.params;
    const {nome, email, senha} = req.body;
    try {
        //comando SQL para aatualizar um usuario por ID
        const usuario = await BD.query(`UPDATE prod_usuarios SET nome = $1, email = $2, senha = $3 WHERE id_usuario =$4 RETURNING *`, [nome, email, senha, id]);
        res.status(200).json({
            message: "Usuário atualizado com sucesso"
        })
    } catch (error) {
        res.status(500).json({
            message:"Erro ao Atualizar o usuário", error: error.message
        })
    }
   }

    //endpoint para atualizar usuario com valores individuais se necessario
    static async atualizar(req,res) {
        const {id} = req.params
        const {nome, email, senha} = req.body;

        try {
            //usar vetores para armazenar os campos e valores a serem atualizados
            const campos = [];
            const valores = [];

            //verificar quais campos foram fornecidos e adicionar ao vetor
            if(nome !== undefined){
                campos.push(`nome = $${valores.length + 1}`) //Usa o tamanho da array para determinar o campo
                valores.push(nome)
            }
            if(email !== undefined){
                campos.push(`email = $${valores.length + 1}`)
                valores.push(email)
            }   
            if(senha !== undefined){
                campos.push(`senha = $${valores.length + 1}`)
                valores.push(senha)
            }
            if(campos.length === 0){
                return res.status(400).json({
                    message: "Nenhum campo para atualizar"
                })
            }

            //montar o código sql para atualizar o usuario dinamicamente
            const query = `UPDATE prod_usuarios SET ${campos.join(', ')} WHERE id_usuario = ${id} RETURNING *`
            //executar a consulta SQL
            const resultado = await BD.query(query, valores)

            //verificar se o usuario foi atualizado
            if(resultado.rows.length === 0){
                return res.status(404).json({
                    message: "Usuário não encontrado"
                })
            }

            return res.status(200).json(resultado.rows[0])
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error)
            res.status(500).json({
                message:"Erro ao Atualizar o usuário", error: error.message
            })    
        }
    }


    //endpoint para listar por id
    static async consultaporID(req,res){
        const { id } = req.params;
        try {
            const usuario = await BD.query(`SELECT * FROM prod_usuarios WHERE id_usuario = $1`,[id]);
            res.status(200).json(usuario.rows)
        } catch (error) {
            res.status(500).json({
                message:"Erro ao consultar o usuário", error: error.message
            })
        }
       
    }

}

export default UsuarioController;