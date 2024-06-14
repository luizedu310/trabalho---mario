const candidatoChapaModel = require('../models/candidatoChapaModel');
const votacaoModel = require('../models/votacaoModel');

async function listCandidatosChapa(req, res) {
    try {
        const votacoes = await votacaoModel.getAllVotacoes();
        if (votacoes.length > 0) {
            const candidatosChapa = await candidatoChapaModel.getAllCandidatosChapa();
            res.render('votacoes', { candidatosChapa, votacoes });
        } else {
            res.render('votacoes', { votacoes: [], candidatosChapa: [] });
        }
    } catch (error) {
        console.error('Erro ao buscar candidatosChapa:', error);
        res.render('error', { message: 'Erro ao buscar candidatosChapa', returnLink: '/welcome' });
    }
}

async function filterCandidatoChapa(req, res) {
    const { nome } = req.body;
    try {
        const candidatosChapa = await candidatoChapaModel.getCandidatoChapaByNome(nome);
        if (candidatosChapa.length === 0) {
            res.send('CandidatoChapa não encontrado');
        } else {
            res.render('candidatosChapa', { candidatosChapa });
        }
    } catch (error) {
        console.error('Erro ao filtrar candidatoChapa:', error);
        res.render('error', { message: 'Erro ao filtrar candidatoChapa', returnLink: '/welcome' });
    }
}

async function addCandidatoChapa(req, res) {
    const { chapa_id, cargo_id, candidato_id } = req.body;
    try {
        const id = await candidatoChapaModel.insertCandidatoChapa(chapa_id, cargo_id, candidato_id);
        res.redirect('/perguntas/prosseguirCandidatoChapa');
    } catch (error) {
        console.error('Erro ao inserir candidatoChapa:', error);
        res.render('error', { message: 'Erro ao inserir candidatoChapa', returnLink: '/welcome' });
    }
}

async function showCandidatoChapa(req, res) {
    const id = req.params.id;
    try {
        const candidatosChapa = await candidatoChapaModel.getCandidatoChapaById(id);
        if (candidatosChapa.length === 0) {
            res.send('CandidatoChapa não encontrado');
        } else {
            res.render('candidatosChapa', { candidatosChapa });
        }
    } catch (error) {
        console.error('Erro ao filtrar candidatoChapa:', error);
        res.render('error', { message: 'Erro ao filtrar candidatoChapa', returnLink: '/welcome' });
    }
}

async function deleteCandidatoChapa(req, res) {
    const id = req.params.id;
    try {
        await candidatoChapaModel.deleteCandidatoChapa(id);
        res.redirect('/candidatosChapa');
    } catch (error) {
        console.error('Erro ao excluir candidatoChapa:', error);
        res.status(500).send('Erro ao excluir candidatoChapa');
    }
}

async function showEditForm(req, res) {
    const id = req.params.id;
    try {
        const candidatoChapa = await candidatoChapaModel.getCandidatoChapaById(id);
        if (!candidatoChapa) {
            res.status(404).send('CandidatoChapa não encontrado');
            return;
        }
        res.render('editCandidatoChapa', { candidatoChapa });
    } catch (error) {
        console.error('Erro ao buscar candidatoChapa:', error);
        res.status(500).send('Erro ao buscar candidatoChapa');
    }
}

async function editCandidatoChapa(req, res) {
    const id = req.params.id;
    const { chapa_id, cargo_id, candidato_id } = req.body;
    try {
        await candidatoChapaModel.updateCandidatoChapa(chapa_id, cargo_id, candidato_id);
        res.redirect('/candidatosChapa');
    } catch (error) {
        console.error('Erro ao editar candidatoChapa:', error);
        res.status(500).send('Erro ao editar candidatoChapa');
    }
}

async function showConfirmDeleteForm(req, res) {
    const id = req.params.id;
    try {
        const candidatoChapa = await candidatoChapaModel.getCandidatoChapaById(id);
        if (!candidatoChapa) {
            res.status(404).send('CandidatoChapa não encontrado');
            return;
        }
        res.render('confirmDelete', { candidatoChapa });
    } catch (error) {
        console.error('Erro ao buscar candidatoChapa:', error);
        res.status(500).send('Erro ao buscar candidatoChapa');
    }
}

module.exports = {
    listCandidatosChapa,
    filterCandidatoChapa,
    addCandidatoChapa,
    showCandidatoChapa,
    showEditForm,
    editCandidatoChapa,
    showConfirmDeleteForm,
    deleteCandidatoChapa
};
