const votacaoModel = require('../models/votacaoModel');

async function listVotacoes(req, res) {
    try {
        const votacoes = await votacaoModel.getAllVotacoes();
        res.render('votacoes', { votacoes });
    } catch (error) {
        console.error('Erro ao buscar votacoes:', error);
        res.render('error', { message: 'Erro ao buscar votacoes', returnLink: '/welcome' });
    }
}

async function verifVotacoes(req, res) {
    try {
        const votacoes = await votacaoModel.getAllVotacoes();
        res.render('votacoes', { votacoes });
    } catch (error) {
        console.error('Erro ao buscar votacoes:', error);
        res.render('error', { message: 'Erro ao buscar votacoes', returnLink: '/welcome' });
    }
}

async function addVotacao(req, res) {
    const { eleicao_id, data_inicio, data_fim } = req.body;
    console.log("aaaaaaaaaaaaa"+data_inicio);
    try {
        const id = await votacaoModel.insertVotacao(eleicao_id, data_inicio, data_fim);
        res.redirect('/perguntas/prosseguirVotacao');
    } catch (error) {
        console.error('Erro ao inserir votacao:', error);
        res.render('error', { message: 'Erro ao inserir votacao', returnLink: '/welcome' });
    }
}

async function showVotacao(req, res) {
    const id = req.params.id;
    try {
        const votacoes = await votacaoModel.getVotacaoById(id);
        if (votacoes.length === 0) {
            res.send('Votacao não encontrado');
        } else {
            res.render('votacoes', { votacoes });
        }
    } catch (error) {
        console.error('Erro ao filtrar votacao:', error);
        res.render('error', { message: 'Erro ao filtrar votacao', returnLink: '/welcome' });
    }
}

async function deleteVotacao(req, res) {

    console.log("AAAAAAAAAAAAAA");
    
    try {
        const temVotacao = await votacaoModel.deleteVotacao();
        res.render('votacaoEncerrada', { temVotacao });
    } catch (error) {
        console.error('Erro ao excluir votacao:', error);
        res.status(500).send('Erro ao excluir votacao');
    }
}

async function showEditForm(req, res) {
    const id = req.params.id;
    try {
        const votacao = await votacaoModel.getVotacaoById(id);
        if (!votacao) {
            res.status(404).send('Votacao não encontrado');
            return;
        }
        res.render('editVotacao', { votacao });
    } catch (error) {
        console.error('Erro ao buscar votacao:', error);
        res.status(500).send('Erro ao buscar votacao');
    }
}

async function editVotacao(req, res) {
    const id = req.params.id;
    const { eleicao_id, data_inicio, data_fim } = req.body;
    try {
        await votacaoModel.updateVotacao(eleicao_id, data_inicio, data_fim);
        res.redirect('/votacoes');
    } catch (error) {
        console.error('Erro ao editar votacao:', error);
        res.status(500).send('Erro ao editar votacao');
    }
}

async function showConfirmDeleteForm(req, res) {
    const id = req.params.id;
    try {
        const votacao = await votacaoModel.getVotacaoById(id);
        if (!votacao) {
            res.status(404).send('Votacao não encontrado');
            return;
        }
        res.render('confirmDelete', { votacao });
    } catch (error) {
        console.error('Erro ao buscar votacao:', error);
        res.status(500).send('Erro ao buscar votacao');
    }
}

module.exports = {
    listVotacoes,
    addVotacao,
    showVotacao,
    showEditForm,
    editVotacao,
    showConfirmDeleteForm,
    deleteVotacao,
    verifVotacoes
};
