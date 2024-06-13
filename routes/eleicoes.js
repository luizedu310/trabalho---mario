const express = require('express');
const router = express.Router();
const eleicaoController = require('../controllers/eleicaoController');

router.get('/', eleicaoController.listEleicoes);

// Rota para cadastrar eleicao
router.get('/cadastrar', (req, res) => {
    res.render('cadastrarEleicao'); // ou o nome correto do seu arquivo de visualização
});

// Outras rotas do eleicaoController
router.post('/cadastrar', eleicaoController.addEleicao);
router.get('/:id', eleicaoController.showEleicao);
router.get('/:id/edit', eleicaoController.showEditForm);
router.post('/:id/edit', eleicaoController.editEleicao);
router.post('/:id/delete', eleicaoController.deleteEleicao);
router.get('/:id/confirm-delete', eleicaoController.showConfirmDeleteForm);

module.exports = router;
