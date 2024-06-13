const candidatoModel = require('../models/candidatoModel');

async function listCandidatos(req, res) {
    try {
        const candidatos = await candidatoModel.getAllCandidatos();
        res.render('candidatos', { candidatos });
    } catch (error) {
        console.error('Erro ao buscar candidatos:', error);
        res.render('error', { message: 'Erro ao buscar candidatos', returnLink: '/welcome' });
    }
}

async function filterCandidato(req, res) {
    const { nome } = req.body;
    try {
        const candidatos = await candidatoModel.getCandidatoByNome(nome);
        if (candidatos.length === 0) {
            res.send('Candidato não encontrado');
        } else {
            res.render('candidatos', { candidatos });
        }
    } catch (error) {
        console.error('Erro ao filtrar candidato:', error);
        res.render('error', { message: 'Erro ao filtrar candidato', returnLink: '/welcome' });
    }
}

async function addCandidato(req, res) {
    const { nome, cpf, endereco, email, senha_votacao } = req.body;
    try {
        const id = await candidatoModel.insertCandidato(nome, cpf, endereco, email, senha_votacao);
        res.redirect('/candidatos')
    } catch (error) {
        console.error('Erro ao inserir candidato:', error);
        res.render('error', { message: 'Erro ao inserir candidato', returnLink: '/welcome' });
    }
}

async function showCandidato(req, res) {
    const id = req.params.id;
    try {
        const candidatos = await candidatoModel.getCandidatoById(id);
        if (candidatos.length === 0) {
            res.send('Candidato não encontrado');
        } else {
            res.render('candidatos', { candidatos });
        }
    } catch (error) {
        console.error('Erro ao filtrar candidato:', error);
        res.render('error', { message: 'Erro ao filtrar candidato', returnLink: '/welcome' });
    }
}

async function deleteCandidato(req, res) {
    const id = req.params.id;
    try {
        await candidatoModel.deleteCandidato(id);
        res.redirect('/candidatos');
    } catch (error) {
        console.error('Erro ao excluir candidato:', error);
        res.status(500).send('Erro ao excluir candidato');
    }
}

async function showEditForm(req, res) {
    const id = req.params.id;
    try {
        const candidato = await candidatoModel.getCandidatoById(id);
        if (!candidato) {
            res.status(404).send('Candidato não encontrado');
            return;
        }
        res.render('editCandidato', { candidato });
    } catch (error) {
        console.error('Erro ao buscar candidato:', error);
        res.status(500).send('Erro ao buscar candidato');
    }
}

async function editCandidato(req, res) {
    const id = req.params.id;
    const { nome, cpf, endereco, email, senha_votacao } = req.body;
    try {
        await candidatoModel.updateCandidato(id, nome, cpf, endereco, email, senha_votacao);
        res.redirect('/candidatos');
    } catch (error) {
        console.error('Erro ao editar candidato:', error);
        res.status(500).send('Erro ao editar candidato');
    }
}

async function showConfirmDeleteForm(req, res) {
    const id = req.params.id;
    try {
        const candidato = await candidatoModel.getCandidatoById(id);
        if (!candidato) {
            res.status(404).send('Candidato não encontrado');
            return;
        }
        res.render('confirmDelete', { candidato });
    } catch (error) {
        console.error('Erro ao buscar candidato:', error);
        res.status(500).send('Erro ao buscar candidato');
    }
}

module.exports = {
    listCandidatos,
    filterCandidato,
    addCandidato,
    showCandidato,
    showEditForm,
    editCandidato,
    showConfirmDeleteForm,
    deleteCandidato
};
