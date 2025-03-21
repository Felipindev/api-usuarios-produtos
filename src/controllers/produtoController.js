import { BD } from "../../db.js";
import Produto from "../models/produto.js";

class ProdutoController {
    static async novoProduto(req, res){
        const { nome, preco, imagem, link_produto , categoria, frete_gratis} = req.body;

        //validadndo se todos os campos foram preenchidos
        if (!nome || !preco || !imagem || !link_produto || !categoria ) {  //se algum campo estiver vazio
            return res.status(400).json({
                message: "Todos os campos são obrigatórios"
            })
        } try {
            //criando novo produto, chamando a função estática novoProduto da classe Produto
            const produto = await Produto.novoProduto(nome, preco, imagem, link_produto, categoria, frete_gratis)
            return res.status(201).json(produto) //retornar o produto criado
        } catch (error) {
            console.error("Erro ao criar novo produto", error);
            return res.status(500).json({
                message: "Erro ao criar novo produto", error: error.message
            })
            
        }
    }
    
    //função para listar todos os produtos
    static async listar(req,res){
        try {
            const produtos = await Produto.listar();
            return res.status(200).json(produtos);
        } catch (error) {
            console.error("Erro ao listar produtos", error);
            return res.status(500).json({
                message: "Erro ao listar produtos", error: error.message
            })
        }}

    //endpoint para listar todos os produtos
    static async listarTodos(req,res){
        try {
            const produtos = await BD.query(`SELECT * FROM prod_produtos`);
            return res.status(200).json(produtos.rows);
        } catch (error) {
            console.error("Erro ao listar produtos", error);
            return res.status(500).json({
                message: "Erro ao listar produtos", error: error.message
            })
        }}

    //função para deletar um produto
    static async deletar(req,res){
        const { id } = req.params;
        try {
            const resultado = await BD.query(`
                DELETE FROM prod_produtos
                WHERE id_produto = $1
                `, [id])
            return res.status(200).json({
                message: "Produto deletado com sucesso"
            })
        } catch (error) {
            console.error("Erro ao deletar produto", error);
            return res.status(500).json({
                message: "Erro ao deletar produto", error: error.message
            })
        }
    }
    //consultar um produto pelo id
    static async consultaPorID(req,res){
        const { id } = req.params;
        try {
            const produto = await BD.query(`
                SELECT * FROM prod_produtos
                WHERE id_produto = $1
                `, [id])
            return res.status(200).json(produto.rows[0])
        } catch (error) {
            console.error("Erro ao consultar produto", error);
            return res.status(500).json({
                message: "Erro ao consultar produto", error: error.message
            })
        }
    }
    //atualizar um produto
    static async atualizarTodosCampos(req,res){
        const { id } = req.params;
        const { nome, preco, imagem, link_produto, categoria, frete_gratis} = req.body;
        try {
            const produto = await BD.query(`UPDATE prod_produtos SET nome = $1, preco = $2, imagem = $3, link_produto = $4, categoria = $5, frete_gratis = $6 WHERE id_produto = $7 `, [nome, preco, imagem, link_produto, categoria, frete_gratis, id]);
            return res.status(200).json({
                message: "Produto atualizado com sucesso"
            })
        } catch (error) {
            console.error("Erro ao atualizar produto", error);
            return res.status(500).json({
                message: "Erro ao atualizar produto", error: error.message
            })   
        }
    }

    //atualizar produto por patch
    static async atualizar(req,res){
        const { id } = req.params;
        const { nome, preco, imagem, link_produto, categoria, frete_gratis} = req.body;

        try {
            const campos = [];
            const valores = [];

            //verificar campos fornecidos
            if(nome !== undefined){
                campos.push(`nome = $${campos.length + 1}`);
                valores.push(nome);
            }
            if(preco !== undefined){
                campos.push(`preco = $${valores.length + 1}`);
                valores.push(preco);
            }
            if(imagem !== undefined){
                campos.push(`imagem = $${valores.length + 1}`);
                valores.push(imagem);
            }
            if(link_produto !== undefined){
                campos.push(`link_produto = $${valores.length + 1}`);
                valores.push(link_produto);
            }
            if(categoria !== undefined){
                campos.push(`categoria = $${valores.length + 1}`);
                valores.push(categoria);
            }
            if(frete_gratis !== undefined){
                campos.push(`frete_gratis = $${valores.length + 1}`);
                valores.push(frete_gratis);
            }

            if(campos.length === 0){
                return res.status(400).json({
                    message: "Nenhum campo para atualizar"
                })
            }

            //montar a query
            const query = `UPDATE prod_produtos SET ${campos.join(', ')} WHERE id_produto = $${valores.length + 1} RETURNING *`;
            const resultado = await BD.query(query, valores);

             //verificar se o usuario foi atualizado
             if(resultado.rows.length === 0){
                return res.status(404).json({
                    message: "Usuário não encontrado"
                })
            }

            return res.status(200).json({
                message: "Produto atualizado com sucesso"
            })
            
        } catch (error) {
            console.error("Erro ao atualizar produto", error);
            return res.status(500).json({
                message: "Erro ao atualizar produto", error: error.message
            })
            
        }
    }
}

export default ProdutoController;