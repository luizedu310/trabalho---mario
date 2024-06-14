const pool = require('../db');

async function insertVotacao(eleicao_id, data_inicio, data_fim) {
    try {
        await pool.query('INSERT INTO votacoes (eleicao_id, data_inicio, data_fim) VALUES (?, ?, ?)', [eleicao_id, data_inicio, data_fim]);
        const [votacoes] = await pool.query('SELECT * FROM votacoes WHERE eleicao_id LIKE ?', [`%${eleicao_id}%`]);
        return votacoes;
    } catch (error) {
        throw error;
    }
}

async function deleteVotacao() {
    try {
        const [votacoes] = await pool.query('SELECT * FROM votacoes');

        if(votacoes.length === 0){
            return true;
        }
        else{
            await pool.query('DELETE FROM votacoes');
            return false;
        }
    } catch (error) {
        throw error;
    }
}

async function getAllVotacoes() {
    try {
        const [votacoes] = await pool.query('SELECT * FROM votacoes');

        return votacoes;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    deleteVotacao,
    insertVotacao,
    getAllVotacoes

};
