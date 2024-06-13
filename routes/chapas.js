const express = require('express');
const router = express.Router();
const chapaController = require('../controllers/chapaController');

router.get('/', chapaController.listChapas);

// Rota para cadastrar chapa
router.get('/cadastrar', (req, res) => {
    res.render('cadastrarChapa'); // ou o nome correto do seu arquivo de visualização
});

// Outras rotas do chapaController
router.post('/cadastrar', chapaController.addChapa);
router.get('/:id', chapaController.showChapa);
router.get('/:id/edit', chapaController.showEditForm);
router.post('/:id/edit', chapaController.editChapa);
router.post('/:id/delete', chapaController.deleteChapa);
router.get('/:id/confirm-delete', chapaController.showConfirmDeleteForm);

module.exports = router;
