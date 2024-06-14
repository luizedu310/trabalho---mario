const express = require('express');
const router = express.Router();
const addVotacaoController = require('../controllers/addVotacaoController');

// Rota para cadastrar votacao
router.get('/cadastrar', (req, res) => {
    res.render('cadastrarAddVotacao'); // ou o nome correto do seu arquivo de visualização
});

// Outras rotas do votacaoController
router.post('/cadastrar', addVotacaoController.addVotacao);
router.get('/:id/votar', addVotacaoController.votar);

module.exports = router;
