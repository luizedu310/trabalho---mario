const pool = require('../db');

async function getEleitorByUsernameAndPassword(cpf, password) {
    const [rows] = await pool.execute('SELECT * FROM eleitores WHERE cpf = ? AND senha = ?', [cpf, password]);
    return rows[0];
}

async function getAllEleitores() {
    try {
        const [eleitores] = await pool.query('SELECT * FROM eleitores order by id desc');
        return eleitores;
    } catch (error) {
        throw error;
    }
}

async function getEleitorByNome(nome) {
    try {
        const [eleitores] = await pool.query('SELECT * FROM eleitores WHERE eleitor LIKE ? order by id desc', [`%${nome}%`]);
        return eleitores;
    } catch (error) {
        throw error;
    }
}

async function getEleitoresByNomedelete(nome) {
    try {
        const [eleitor] = await pool.query('SELECT * FROM eleitores WHERE nome = ? order by id desc', [nome]);
        return eleitor[0];
    } catch (error) {
        throw error;
    }
}

async function insertEleitor(nome, cpf, endereco, senha, liberado) {
    try {
        await pool.query('INSERT INTO eleitores (nome, cpf, endereco, senha, liberado) VALUES (?, ?, ?, ?, ?)', [nome, cpf, endereco, senha, liberado]);
        const [eleitores] = await pool.query('SELECT * FROM eleitores WHERE nome LIKE ?', [`%${nome}%`]);
        return eleitores;
    } catch (error) {
        throw error;
    }
}

async function getEleitorById(id) {
    try {
        const [eleitor] = await pool.query('SELECT * FROM eleitores WHERE id = ?', [id]);
        return eleitor[0];
    } catch (error) {
        throw error;
    }
}

async function deleteEleitor(id) {
    try {
        await pool.query('DELETE FROM eleitores WHERE id = ?', [id]);
    } catch (error) {
        throw error;
    }
}

async function updateEleitor(id, nome, cpf, endereco, senha, liberado) {
    try {
        await pool.query('UPDATE eleitores SET nome = ?, cpf = ?, endereco = ?, senha = ?, liberado = ? WHERE id = ?', [nome, cpf, endereco, senha, liberado, id]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getEleitorByUsernameAndPassword,
    getAllEleitores,
    getEleitorByNome,
    getEleitoresByNomedelete,
    insertEleitor,
    getEleitorById,
    deleteEleitor,
    updateEleitor
};
