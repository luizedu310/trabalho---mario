const pool = require('../db');

async function getAllCandidatos() {
    try {
        const [candidatos] = await pool.query('SELECT * FROM candidatos order by id desc');
        return candidatos;
    } catch (error) {
        throw error;
    }
}

async function getCandidatoByNome(nome) {
    try {
        const [candidatos] = await pool.query('SELECT * FROM candidatos WHERE nome LIKE ? order by Id desc', [`%${nome}%`]);
        return candidatos;
    } catch (error) {
        throw error;
    }
}

async function getCandidatosByNomedelete(nome) {
    try {
        const [candidato] = await pool.query('SELECT * FROM candidatos WHERE nome = ? order by Id desc', [nome]);
        return candidato[0];
    } catch (error) {
        throw error;
    }
}

async function insertCandidato(nome, cpf, endereco, email, senha_votacao) {
    try {
        await pool.query('INSERT INTO candidatos (nome, cpf, endereco, email, senha_votacao) VALUES (?, ?, ?, ?, ?)', [nome, cpf, endereco, email, senha_votacao]);
        const [candidatos] = await pool.query('SELECT * FROM candidatos WHERE nome LIKE ?', [`%${nome}%`]);
        return candidatos;
    } catch (error) {
        throw error;
    }
}

async function getCandidatoById(id) {
    try {
        const [candidato] = await pool.query('SELECT * FROM candidatos WHERE id = ?', [id]);
        return candidato[0];
    } catch (error) {
        throw error;
    }
}

async function deleteCandidato(id) {
    try {
        await pool.query('DELETE FROM candidatos WHERE id = ?', [id]);
    } catch (error) {
        throw error;
    }
}

async function updateCandidato(id, nome, cpf, endereco, email, senha_votacao) {
    try {
        await pool.query('UPDATE candidatos SET nome = ?, cpf = ?, endereco = ?, email = ?, senha_votacao = ? WHERE id = ?', [nome, cpf, endereco, email, senha_votacao, id]);
    } catch (error) {
        throw error;S
    }
}

module.exports = {
    getAllCandidatos,
    getCandidatoByNome,
    getCandidatosByNomedelete,
    insertCandidato,
    getCandidatoById,
    deleteCandidato,
    updateCandidato
};
