const express = require('express');
const router = express.Router();

router.get('/prosseguirCargo', (req, res) => {
    res.render('prosseguirCargo'); // Corrigido para renderizar 'perguntas/prosseguirCargo'
});

router.get('/prosseguirChapa', (req, res) => {
    res.render('prosseguirChapa'); // Corrigido para renderizar 'perguntas/prosseguirCargo'
});

router.get('/prosseguirCandidato', (req, res) => {
    res.render('prosseguirCandidato'); // Corrigido para renderizar 'perguntas/prosseguirCargo'
});

router.get('/prosseguirCandidatoChapa', (req, res) => {
    res.render('prosseguirCandidatoChapa'); // Corrigido para renderizar 'perguntas/prosseguirCargo'
});

router.get('/prosseguirVotacao', (req, res) => {
    res.render('prosseguirVotacao'); // Corrigido para renderizar 'perguntas/prosseguirCargo'
});

router.get('/prosseguirAddVotacao', (req, res) => {
    res.render('prosseguirAddVotacao'); // Corrigido para renderizar 'perguntas/prosseguirCargo'
});


module.exports = router;
