const express = require('express');
const router = express.Router();
const candidatoController = require('../controllers/candidatoController');

router.get('/', candidatoController.listCandidatos);

router.get('/filtro', (req, res) => {
    res.render('filtro');
});

router.post('/filtro', candidatoController.filterCandidato);
router.get('/cadastrar', (req, res) => {
    res.render('cadastrar');
});
router.post('/cadastrar', candidatoController.addCandidato);
router.get('/:id', candidatoController.showCandidato);

router.get('/:id/edit', candidatoController.showEditForm);

router.post('/:id/edit', candidatoController.editCandidato);

router.post('/:id/delete', candidatoController.deleteCandidato);

router.get('/:id/confirm-delete', candidatoController.showConfirmDeleteForm);

module.exports = router;
