const pool = require('../db');

async function getAllCandidatosChapa() {
    try {
        const [candidatosChapa] = await pool.query(`
            SELECT 
                cc.*, 
                c.nome AS candidato_nome, 
                cr.cargo AS cargo_nome, 
                ch.nome AS chapa_nome
            FROM candidatoschapas cc
            JOIN candidatos c ON cc.candidato_id = c.id
            JOIN cargos cr ON cc.cargo_id = cr.id
            JOIN chapas ch ON cc.chapa_id = ch.id
            ORDER BY cc.id DESC
        `);
        return candidatosChapa;
    } catch (error) {
        throw error;
    }
}


async function insertCandidatoChapa(chapa_id, cargo_id, candidato_id) {
    try {
        await pool.query('INSERT INTO candidatoschapas (chapa_id, cargo_id, candidato_id) VALUES (?, ?, ?)', [chapa_id, cargo_id, candidato_id]);
        const [candidatosChapa] = await pool.query('SELECT * FROM candidatoschapas WHERE chapa_id LIKE ?', [`%${chapa_id}%`]);
        return candidatosChapa;
    } catch (error) {
        throw error;
    }
}

async function getCandidatoChapaById(id) {
    try {
        const [candidatoChapa] = await pool.query('SELECT * FROM candidatoschapas WHERE id = ?', [id]);
        return candidatoChapa[0];
    } catch (error) {
        throw error;
    }
}

async function deleteCandidatoChapa(id) {
    try {
        await pool.query('DELETE FROM candidatoschapas WHERE id = ?', [id]);
    } catch (error) {
        throw error;
    }
}

async function updateCandidatoChapa(id, chapa_id, cargo_id, candidato_id) {
    try {
        await pool.query('UPDATE candidatoschapas SET chapa_id = ?, cargo_id = ?, candidato_id = ? WHERE id = ?', [chapa_id, cargo_id, candidato_id]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllCandidatosChapa,
    insertCandidatoChapa,
    getCandidatoChapaById,
    deleteCandidatoChapa,
    updateCandidatoChapa
};
