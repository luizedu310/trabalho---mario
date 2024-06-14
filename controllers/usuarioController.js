const usuarioModel = require('../models/usuarioModel');
const eleicaoModel = require('../models/eleicaoModel');

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await usuarioModel.getUserByUsernameAndPassword(username, password);
        if (user) {
            res.redirect('/welcome?username=' + encodeURIComponent(user.usuario) + '&tipo=' + encodeURIComponent(user.tipo));
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Erro durante a autenticação:', error);
        res.status(500).send('Erro durante a autenticação');
    }
}

async function welcome(req, res) {
    const { username, tipo } = req.query;

    try {
        const eleicoes = await eleicaoModel.getAllEleicoes();

        if (eleicoes.length === 0) {
            res.redirect('/eleicoes/cadastrar');
        } else {
            res.render('welcome', { usuario: username, tipo: tipo });
        }
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        res.status(500).send('Erro ao acessar o banco de dados');
    }
}

module.exports = { login, welcome };
