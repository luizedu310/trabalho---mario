const pool = require('../db');

async function getAllCargos() {
    try {
        const [cargos] = await pool.query('SELECT * FROM cargos order by id desc');
        return cargos;
    } catch (error) {
        throw error;
    }
}

async function getCargoByNome(nome) {
    try {
        const [cargos] = await pool.query('SELECT * FROM cargos WHERE cargo LIKE ? order by Id desc', [`%${nome}%`]);
        return cargos;
    } catch (error) {
        throw error;
    }
}

async function getCargosByNomedelete(nome) {
    try {
        const [cargo] = await pool.query('SELECT * FROM cargos WHERE cargo = ? order by Id desc', [nome]);
        return cargo[0];
    } catch (error) {
        throw error;
    }
}

async function insertCargo(nome, eleicao_id) {
    try {
        await pool.query('INSERT INTO cargos (cargo, eleicao_id) VALUES (?, ?)', [nome, eleicao_id]);
        const [cargos] = await pool.query('SELECT * FROM cargos WHERE cargo LIKE ?', [`%${nome}%`]);
        return cargos;
    } catch (error) {
        throw error;
    }
}

async function getCargoById(id) {
    try {
        const [cargo] = await pool.query('SELECT * FROM cargos WHERE id = ?', [id]);
        return cargo[0];
    } catch (error) {
        throw error;
    }
}

async function deleteCargo(id) {
    try {
        await pool.query('DELETE FROM cargos WHERE id = ?', [id]);
    } catch (error) {
        throw error;
    }
}

async function updateCargo(id, cargo, eleicao_id) {
    try {
        await pool.query('UPDATE cargos SET cargo = ?, eleicao_id = ? WHERE id = ?', [cargo, eleicao_id, id]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllCargos,
    getCargoByNome,
    getCargosByNomedelete,
    insertCargo,
    getCargoById,
    deleteCargo,
    updateCargo
};
