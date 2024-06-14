const express = require('express');
const router = express.Router();
const eleitorController = require('../controllers/eleitorController');

router.get('/', eleitorController.listEleitores);

// Rota para cadastrar eleitor
router.get('/cadastrar', (req, res) => {
    res.render('cadastrarEleitor'); // ou o nome correto do seu arquivo de visualização
});

// Outras rotas do eleitorController
router.post('/cadastrar', eleitorController.addEleitor);
router.get('/:id', eleitorController.showEleitor);
router.get('/:id/edit', eleitorController.showEditForm);
router.post('/:id/edit', eleitorController.editEleitor);
router.post('/:id/delete', eleitorController.deleteEleitor);
router.get('/:id/confirm-delete', eleitorController.showConfirmDeleteForm);

module.exports = router;
