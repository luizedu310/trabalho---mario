const express = require('express');
const router = express.Router();
const cargoController = require('../controllers/cargoController');

router.get('/', cargoController.listCargos);

// Rota para cadastrar cargo
router.get('/cadastrar', (req, res) => {
    res.render('cadastrarCargo'); // ou o nome correto do seu arquivo de visualização
});

// Outras rotas do cargoController
router.post('/cadastrar', cargoController.addCargo);
router.get('/:id', cargoController.showCargo);
router.get('/:id/edit', cargoController.showEditForm);
router.post('/:id/edit', cargoController.editCargo);
router.post('/:id/delete', cargoController.deleteCargo);
router.get('/:id/confirm-delete', cargoController.showConfirmDeleteForm);

module.exports = router;
