import {BD} from '../../db.js'

class Produto {
    static async novoProduto(nome, preco, imagem, link_produto, categoria, frete_gratis){
        const resultado = await BD.query(`
            INSERT INTO prod_produtos (nome, preco, imagem, link_produto, categoria, frete_gratis)
            VALUES ($1, $2, $3, $4, $5, $6)
            `, [nome, preco, imagem, link_produto, categoria, frete_gratis])
            return resultado.rows[0];
    }
}

export default Produto;