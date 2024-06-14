const express = require('express');
const router = express.Router();
const candidatoChapaController = require('../controllers/candidatoChapaController');

router.get('/', candidatoChapaController.listCandidatosChapa);

// Rota para cadastrar candidatoChapa
router.get('/cadastrar', (req, res) => {
    res.render('cadastrarCandidatoChapa'); // ou o nome correto do seu arquivo de visualização
});

// Outras rotas do candidatoChapaController
router.post('/cadastrar', candidatoChapaController.addCandidatoChapa);
router.get('/:id', candidatoChapaController.showCandidatoChapa);
router.get('/:id/edit', candidatoChapaController.showEditForm);
router.post('/:id/edit', candidatoChapaController.editCandidatoChapa);
router.post('/:id/delete', candidatoChapaController.deleteCandidatoChapa);
router.get('/:id/confirm-delete', candidatoChapaController.showConfirmDeleteForm);

module.exports = router;
