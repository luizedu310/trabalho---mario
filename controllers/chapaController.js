const chapaModel = require('../models/chapaModel');

async function listChapas(req, res) {
    try {
        const chapas = await chapaModel.getAllChapas();
        res.render('chapas', { chapas });
    } catch (error) {
        console.error('Erro ao buscar chapas:', error);
        res.render('error', { message: 'Erro ao buscar chapas', returnLink: '/welcome' });
    }
}

async function filterChapa(req, res) {
    const { nome } = req.body;
    try {
        const chapas = await chapaModel.getChapaByNome(nome);
        if (chapas.length === 0) {
            res.send('Chapa não encontrado');
        } else {
            res.render('chapas', { chapas });
        }
    } catch (error) {
        console.error('Erro ao filtrar chapa:', error);
        res.render('error', { message: 'Erro ao filtrar chapa', returnLink: '/welcome' });
    }
}

async function addChapa(req, res) {
    const { chapa, eleicao_id } = req.body;
    try {
        const id = await chapaModel.insertChapa(chapa, eleicao_id);
        res.redirect('/perguntas/prosseguirChapa');
    } catch (error) {
        console.error('Erro ao inserir chapa:', error);
        res.render('error', { message: 'Erro ao inserir chapa', returnLink: '/welcome' });
    }
}

async function showChapa(req, res) {
    const id = req.params.id;
    try {
        const chapas = await chapaModel.getChapaById(id);
        if (chapas.length === 0) {
            res.send('Chapa não encontrado');
        } else {
            res.render('chapas', { chapas });
        }
    } catch (error) {
        console.error('Erro ao filtrar chapa:', error);
        res.render('error', { message: 'Erro ao filtrar chapa', returnLink: '/welcome' });
    }
}

async function deleteChapa(req, res) {
    const id = req.params.id;
    try {
        await chapaModel.deleteChapa(id);
        res.redirect('/chapas');
    } catch (error) {
        console.error('Erro ao excluir chapa:', error);
        res.status(500).send('Erro ao excluir chapa');
    }
}

async function showEditForm(req, res) {
    const id = req.params.id;
    try {
        const chapa = await chapaModel.getChapaById(id);
        if (!chapa) {
            res.status(404).send('Chapa não encontrado');
            return;
        }
        res.render('editChapa', { chapa });
    } catch (error) {
        console.error('Erro ao buscar chapa:', error);
        res.status(500).send('Erro ao buscar chapa');
    }
}

async function editChapa(req, res) {
    const id = req.params.id;
    const { chapa, eleicao_id } = req.body;
    try {
        await chapaModel.updateChapa(chapa, eleicao_id);
        res.redirect('/chapas');
    } catch (error) {
        console.error('Erro ao editar chapa:', error);
        res.status(500).send('Erro ao editar chapa');
    }
}

async function showConfirmDeleteForm(req, res) {
    const id = req.params.id;
    try {
        const chapa = await chapaModel.getChapaById(id);
        if (!chapa) {
            res.status(404).send('Chapa não encontrado');
            return;
        }
        res.render('confirmDelete', { chapa });
    } catch (error) {
        console.error('Erro ao buscar chapa:', error);
        res.status(500).send('Erro ao buscar chapa');
    }
}

module.exports = {
    listChapas,
    filterChapa,
    addChapa,
    showChapa,
    showEditForm,
    editChapa,
    showConfirmDeleteForm,
    deleteChapa
};
