const pool = require('../db');

async function getAllEleicoes() {
    try {
        const [eleicoes] = await pool.query('SELECT * FROM eleicoes order by id desc');
        return eleicoes;
    } catch (error) {
        throw error;
    }
}

async function getEleicaoByNome(nome) {
    try {
        const [eleicoes] = await pool.query('SELECT * FROM eleicoes WHERE nome LIKE ? order by id desc', [`%${nome}%`]);
        return eleicoes;
    } catch (error) {
        throw error;
    }
}

async function getEleicoesByNomedelete(nome) {
    try {
        const [eleicao] = await pool.query('SELECT * FROM eleicoes WHERE nome = ? order by id desc', [nome]);
        return eleicao[0];
    } catch (error) {
        throw error;
    }
}

async function insertEleicao(data, local, nome) {
    try {
        
        await pool.query('INSERT INTO eleicoes (data, local, nome) VALUES (?, ?, ?)', [data, local, nome]);
        const [eleicoes] = await pool.query('SELECT * FROM eleicoes WHERE nome LIKE ?', [`%${nome}%`]);
        return eleicoes;
    } catch (error) {
        throw error;    
    }
}

async function getEleicaoById(id) {
    try {
        const [eleicao] = await pool.query('SELECT * FROM eleicoes WHERE id = ?', [id]);
        return eleicao[0];
    } catch (error) {
        throw error;
    }
}

async function deleteEleicao(id) {
    try {
        await pool.query('DELETE FROM eleicoes WHERE id = ?', [id]);
    } catch (error) {
        throw error;
    }
}

async function updateEleicao(id, data, local, nome) {
    try {
        await pool.query('UPDATE eleicoes SET data = ?, local = ?, nome = ? WHERE id = ?', [data, local, nome, id]);
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
