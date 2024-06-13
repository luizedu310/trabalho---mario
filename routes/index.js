const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const candidatoRouter = require('./candidatos');
const cargoRouter = require('./cargos');
const eleicaoRouter = require('./eleicoes');
const chapaRouter = require('./chapas');

//rota raiz redirecionando para "/login"
router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', usuarioController.login);
router.get('/welcome', usuarioController.welcome);
router.use('/candidatos', candidatoRouter);
router.use('/cargos', cargoRouter);
router.use('/eleicoes', eleicaoRouter);
router.use('/chapas', chapaRouter);


module.exports = router;
