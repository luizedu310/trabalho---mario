const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const eleitorController = require('../controllers/eleitorController');
const candidatoRouter = require('./candidatos');
const cargoRouter = require('./cargos');
const eleicaoRouter = require('./eleicoes');
const chapaRouter = require('./chapas');
const candidatoChapaRouter = require('./candidatosChapa');
const perguntaRouter = require('./perguntas');
const eleitorRouter = require('./eleitores');
const votacaoRouter = require('./votacoes');
const addVotacaoRouter = require('./addVotacoes');


//rota raiz redirecionando para "/login"
router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/loginEleitores', (req, res) => {
    res.render('loginEleitores');
});

router.get('/votado', (req, res) => {
    res.render('votado');
});

router.post('/login', usuarioController.login);
router.post('/loginEleitores', eleitorController.loginEleitor);
router.get('/welcomeEleitor', eleitorController.welcomeEleitor);
router.get('/welcome', usuarioController.welcome);
router.use('/candidatos', candidatoRouter);
router.use('/cargos', cargoRouter);
router.use('/eleicoes', eleicaoRouter);
router.use('/chapas', chapaRouter);
router.use('/candidatosChapa', candidatoChapaRouter);
router.use('/perguntas', perguntaRouter);
router.use('/eleitores', eleitorRouter);
router.use('/votacoes', votacaoRouter);
router.use('/addVotacoes', addVotacaoRouter);


module.exports = router;
