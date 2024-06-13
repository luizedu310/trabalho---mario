const pool = require('../db');

async function getAllChapas() {
    try {
        const [chapas] = await pool.query('SELECT * FROM chapas order by id desc');
        return chapas;
    } catch (error) {
        throw error;
    }
}

async function getChapaByNome(nome) {
    try {
        const [chapas] = await pool.query('SELECT * FROM chapas WHERE nome LIKE ? order by id desc', [`%${nome}%`]);
        return chapas;
    } catch (error) {
        throw error;
    }
}

async function getChapasByNomedelete(nome) {
    try {
        const [chapa] = await pool.query('SELECT * FROM chapas WHERE nome = ? order by id desc', [nome]);
        return chapa[0];
    } catch (error) {
        throw error;
    }
}

async function insertChapa(nome, eleicao_id) {
    try {
        await pool.query('INSERT INTO chapas (nome, eleicao_id) VALUES (?, ?)', [nome, eleicao_id]);
        const [chapas] = await pool.query('SELECT * FROM chapas WHERE nome LIKE ?', [`%${nome}%`]);
        return chapas;
    } catch (error) {
        throw error;
    }
}

async function getChapaById(id) {
    try {
        const [chapa] = await pool.query('SELECT * FROM chapas WHERE id = ?', [id]);
        return chapa[0];
    } catch (error) {
        throw error;
    }
}

async function deleteChapa(id) {
    try {
        await pool.query('DELETE FROM chapas WHERE id = ?', [id]);
    } catch (error) {
        throw error;
    }
}

async function updateChapa(id, chapa, eleicao_id) {
    try {
        await pool.query('UPDATE chapas SET nome = ?, eleicao_id = ? WHERE id = ?', [chapa, eleicao_id, id]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllChapas,
    getChapaByNome,
    getChapasByNomedelete,
    insertChapa,
    getChapaById,
    deleteChapa,
    updateChapa
};
