const addVotacaoModel = require('../models/addVotacaoModel');

async function addVotacao(req, res) {
    const { eleicao_id, candidato_id, numero_votos } = req.body;

    try {
        const id = await addVotacaoModel.insertAddVotacao(eleicao_id, candidato_id, numero_votos);
        res.redirect('/perguntas/prosseguirAddVotacao');
    } catch (error) {
        console.error('Erro ao inserir votacao:', error);
        res.render('error', { message: 'Erro ao inserir votacao', returnLink: '/welcome' });
    }
}

async function votar(req, res) {
    const candidato_id = req.params.id;

    console.log("CANDIDATO_IDDDD    CONTROLLER: "+candidato_id);

    try {

        const id = await addVotacaoModel.votarCandidato(candidato_id);
        res.redirect('/votado');
    } catch (error) {
        console.error('Erro ao inserir votacao:', error);
        res.render('error', { message: 'Erro ao inserir votacao', returnLink: '/welcome' });
    }
}


module.exports = {

    addVotacao,
    votar

};
