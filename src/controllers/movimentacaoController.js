import { BD } from "../../db.js";
import Movimentacao from "../models/movimentacao.js";

class MovimentacaoController{
    //nova movimentação
    static async novaMovimentacao(req,res){
        const { id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao } = req.body;
        if (!id_produto || !id_usuario || !tipo_movimentacao || !quantidade || !data_movimentacao) {
            return res.status(400).json({
                message: "Todos os campos são obrigatórios"
            })
        } try {
            //criar nova movimentacao, chamando a função estática novoUsuario da classe Usuario
            const movimentacao = await Movimentacao.novaMovimentacao(id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao)
            return res.status(201).json(movimentacao) //retornar a movimentacao criada
        } catch (error) {
            console.error("Erro ao criar nova movimentação", error);
            return res.status(500).json({
                message: "Erro ao criar nova movimentação", error: error.message
            })
        }
    }

    //listar movimentações
    static async listar(req,res){
        try {
            const movimentacoes = await Movimentacao.listar();
            return res.status(200).json(movimentacoes); 
        } catch (error) {
            console.error("Erro ao listar movimentações", error);
            return res.status(500).json({
                message: "Erro ao listar movimentações", error: error.message
            })
        }
    }
    //deletarr movimentação
    static async deletar(req,res){
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({
                    message: "ID da movimentação não informado"
                })
            }
            const movimentacao = await BD.query(`DELETE from prod_movimentacoes WHERE id = $1`,[id]);
            return res.status(200).json({message: "Movimentação deletada com sucesso"});
        } catch (error) {
            console.error("Erro ao deletar movimentação", error);
            return res.status(500).json({
                message: "Erro ao deletar movimentação", error: error.message
            })
        }
    }

    //atualizar movimentação
    static async atualizarTodosCampos(req,res){
        const { id } = req.params;
        const { id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao } = req.body;
        if (!id_produto || !id_usuario || !tipo_movimentacao || !quantidade || !data_movimentacao) {
            return res.status(400).json({
                message: "Todos os campos são obrigatórios"
            })
        } try {
            //atualizar movimentação, chamando a função estática atualizar da classe Movimentacao
            const movimentacao = await Movimentacao.atualizarTodosCampos(id, id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao)
            return res.status(200).json(movimentacao) //retornar a movimentação atualizada
        } catch (error) {
            console.error("Erro ao atualizar movimentação", error);
            return res.status(500).json({
                message: "Erro ao atualizar movimentação", error: error.message
            })
        }
    }
    //consulta por ID
    static async consultaPorId(req,res){
        const {id} = req.params
        try {
            const movimentacao = await BD.query(`SELECT * FROM prod_movimentacoes WHERE id_movimentacao = $1`,[id])
            return res.status(200).json(movimentacao.rows[0])
        } catch (error) {
            console.error("Erro ao consultar movimentacao", error);
            return res.status(500).json({
                message: "Erro ao consultar movimentacao", error: error.message
            })
        }
    }

    //atualizar por patch
    static async atualizar(req,res){
        const {id} = req.params
        const { id_produto, id_usuario, tipo_movimentacao, quantidade, data_movimentacao} = req.body

        try {
            const campos = [];
            const valores = [];

            //verificar se os campos foram fornecidos
            if(id_produto !== undefined){
                campos.push(`id_produto = $${campos.length + 1}`)
                valores.push(id_produto)
            }

            if(id_usuario !== undefined){
                campos.push(`id_usuario = $${campos.length + 1}`)
                valores.push(id_usuario)
            }
            if(tipo_movimentacao !== undefined){
                campos.push(`tipo_movimentacao = $${campos.length + 1}`)
                valores.push(tipo_movimentacao)
            }
            if(quantidade !== undefined){
                campos.push(`quantidade = $${campos.length + 1}`)
                valores.push(quantidade)
            }
            if(data_movimentacao !== undefined){
                campos.push(`data_movimentacao = $${campos.length + 1}`)
                valores.push(data_movimentacao)
            }

            if(campos.length === 0 ){
                return res.status(400).json({
                    message: "Nenhum campo para atualizar"
                })
            }

            //montar a query
            const query = `UPDATE prod_movimentacoes SET ${campos.join(', ')} WHERE id_movimentacao = $${valores.length + 1} RETURNING *`
            const resultado = await BD.query(query,valores)

            //verificar se a movimentacao foi atualizada
            if(resultado.rows.length === 0){
                return res.status(404).json({
                    message: "movimentacao não encontrada"
                })
            }

            return res.status(200).json({
                message: "movimentacao atualizada com sucesso"
            })
        } catch (error) {
             console.error("Erro ao atualizar movimentação", error);
            return res.status(500).json({
                message: "Erro ao atualizar movimentação", error: error.message
            })
        }
    }
}
export default MovimentacaoController;