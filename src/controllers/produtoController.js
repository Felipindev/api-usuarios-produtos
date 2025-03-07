import Produto from "../models/produto.js";

class ProdutoController {
    static async novoProduto(req, res){
        const { nome, preco, imagem, link_produto , categoria, frete_gratis} = req.body;

        //validadndo se todos os campos foram preenchidos
        if (!nome || !preco || !imagem || !link_produto || !categoria || !frete_gratis) {  //se algum campo estiver vazio
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
}

export default ProdutoController;