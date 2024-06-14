const express = require('express');
const router = express.Router();
const votacaoController = require('../controllers/votacaoController');
const candidatoChapaController = require('../controllers/candidatoChapaController');

// Rota para listar candidatos e chapas com votações verificadas
router.get('/', candidatoChapaController.listCandidatosChapa);

// Rota para cadastrar votacao
router.get('/cadastrar', (req, res) => {
    res.render('cadastrarVotacao'); // ou o nome correto do seu arquivo de visualização
});

// Outras rotas do votacaoController
router.post('/cadastrar', votacaoController.addVotacao);
router.post('/encerrar', votacaoController.deleteVotacao);

module.exports = router;
