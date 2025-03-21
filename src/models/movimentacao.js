import {BD} from '../../db.js'

class Movimentacao {
   static async novaMovimentacao(id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao){
        const resultado = await BD.query(`
        INSERT INTO prod_movimentacoes (id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao)
        VALUES ($1, $2, $3, $4, $5)
        `, [id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao])
        return resultado.rows[0];
   }

   static async listar(){
        const resultado = await BD.query(`
        SELECT pm.*, p.nome AS nome_produto, u.nome AS nome_usuario FROM prod_movimentacoes pm 
        JOIN prod_produtos p ON pm.id_produto = p.id_produto
        LEFT JOIN prod_usuarios u ON pm.id_usuario = u.id_usuario
        order by pm. data_movimentacao DESC
        `)
        return resultado.rows;
    }

    static async atualizarTodosCampos(id, id_produto, id_usuario,tipo_movimentacao, quantidade, data_movimentacao){
        const resultado = await BD.query(`
        UPDATE prod_movimentacoes SET id_produto = $1, id_usuario = $2, tipo_movimentacao = $3, quantidade = $4, data_movimentacao = $5
        WHERE id = $6
        `, [id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao, id])
        return resultado.rows[0];
    }
}

export default Movimentacao;