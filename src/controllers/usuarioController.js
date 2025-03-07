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
}

export default UsuarioController;