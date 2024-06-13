const pool = require('../db');

async function getUserByUsernameAndPassword(username, password) {
    const [rows] = await pool.execute('SELECT * FROM usuario WHERE usuario = ? AND senha = ?', [username, password]);
    return rows[0];
}

async function insertUser(username, password){
    try {
        await pool.query('INSERT INTO usuario (usuario, senha) VALUES (?, ?)', [username, password]);
        const [candidatos] = await pool.query('SELECT * FROM usuario WHERE usuario LIKE ?', [`%${username}%`]);
        return candidatos;
    } catch (error) {
        throw error;
    }
}


module.exports = { getUserByUsernameAndPassword, insertUser };
