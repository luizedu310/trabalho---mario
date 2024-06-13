const pool = require('../db');

async function getAllEleicoes() {
    try {
        const [eleicoes] = await pool.query('SELECT * FROM eleicao order by id desc');
        return eleicoes;
    } catch (error) {
        throw error;
    }
}

async function getEleicaoByNome(nome) {
    try {
        const [eleicoes] = await pool.query('SELECT * FROM eleicao WHERE nome LIKE ? order by id desc', [`%${nome}%`]);
        return eleicoes;
    } catch (error) {
        throw error;
    }
}

async function getEleicoesByNomedelete(nome) {
    try {
        const [eleicao] = await pool.query('SELECT * FROM eleicao WHERE nome = ? order by id desc', [nome]);
        return eleicao[0];
    } catch (error) {
        throw error;
    }
}

async function insertEleicao(data_eleicao, local_eleicao, descricao_eleicao, nome) {
    try {
        
        await pool.query('INSERT INTO eleicao (data_eleicao, local_eleicao, descricao_eleicao, nome) VALUES (?, ?, ?, ?)', [data_eleicao, local_eleicao, descricao_eleicao, nome]);
        const [eleicoes] = await pool.query('SELECT * FROM eleicao WHERE nome LIKE ?', [`%${nome}%`]);
        return eleicoes;
    } catch (error) {
        throw error;    
    }
}

async function getEleicaoById(id) {
    try {
        const [eleicao] = await pool.query('SELECT * FROM eleicao WHERE id = ?', [id]);
        return eleicao[0];
    } catch (error) {
        throw error;
    }
}

async function deleteEleicao(id) {
    try {
        await pool.query('DELETE FROM eleicao WHERE id = ?', [id]);
    } catch (error) {
        throw error;
    }
}

async function updateEleicao(id, data_eleicao, local_eleicao, descricao_eleicao, nome) {
    try {
        await pool.query('UPDATE eleicao SET data_eleicao = ?, local_eleicao = ?, descricao_eleicao = ?, nome = ? WHERE id = ?', [data_eleicao, local_eleicao, descricao_eleicao, nome, id]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllEleicoes,
    getEleicaoByNome,
    getEleicoesByNomedelete,
    insertEleicao,
    getEleicaoById,
    deleteEleicao,
    updateEleicao
};
