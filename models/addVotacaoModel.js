const pool = require('../db');

async function insertAddVotacao(eleicao_id, candidato_id, numero_votos) {
    try {
        await pool.query('INSERT INTO votos (eleicao_id, candidato_id, numero_votos) VALUES (?, ?, ?)', [eleicao_id, candidato_id, 0]);
        const [votacoes] = await pool.query('SELECT * FROM votos WHERE eleicao_id LIKE ?', [`%${eleicao_id}%`]);
        return votacoes;
    } catch (error) {
        throw error;
    }
}

async function votarCandidato(candidato_id) {

    console.log("CANDIDATO_ID: "+candidato_id)
    try {
        
        await pool.query('UPDATE votos SET numero_votos = numero_votos+1 WHERE candidato_id = ?;', [candidato_id]);

    } catch (error) {
        throw error;
    }
}

module.exports = {

    insertAddVotacao,
    votarCandidato

};
