const usuarioModel = require('../models/usuarioModel');

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await usuarioModel.getUserByUsernameAndPassword(username, password);
        if (user) {
            res.redirect('/welcome?username=' + user.usuario + '&tipo=' + user.tipo);
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Erro durante a autenticação:', error);
        res.status(500).send('Erro durante a autenticação');
    }
}

async function addUser(req, res) {
    const { usuario, senha } = req.body;
    try {
        const id = await candidatoModel.insertCandidato(nome, cpf, endereco, email, senha_votacao);
        res.redirect('/candidatos')
    } catch (error) {
        console.error('Erro ao inserir candidato:', error);
        res.render('error', { message: 'Erro ao inserir candidato', returnLink: '/welcome' });
    }
}

async function welcome(req, res) {
    const { username, tipo } = req.query;
    res.render('welcome', { usuario: username, tipo: tipo });
}

module.exports = { login, welcome };
