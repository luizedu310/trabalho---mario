const eleicaoModel = require('../models/eleicaoModel');

async function listEleicoes(req, res) {
    try {
        const eleicoes = await eleicaoModel.getAllEleicoes();
        res.render('eleicoes', { eleicoes });
    } catch (error) {
        console.error('Erro ao buscar eleicoes:', error);
        res.render('error', { message: 'Erro ao buscar eleicoes', returnLink: '/welcome' });
    }
}

async function filterEleicao(req, res) {
    const { nome } = req.body;
    try {
        const eleicoes = await eleicaoModel.getEleicaoByNome(nome);
        if (eleicoes.length === 0) {
            res.send('Eleicao não encontrado');
        } else {
            res.render('eleicoes', { eleicoes });
        }
    } catch (error) {
        console.error('Erro ao filtrar eleicao:', error);
        res.render('error', { message: 'Erro ao filtrar eleicao', returnLink: '/welcome' });
    }
}

async function addEleicao(req, res) {
    const { data, local, nome } = req.body;
    try {
        
        const id = await eleicaoModel.insertEleicao(data, local, nome);
        res.redirect('/cargos/cadastrar')
    } catch (error) {
        console.error('Erro ao inserir eleicao:', error);
        res.render('error', { message: 'Erro ao inserir eleicao', returnLink: '/welcome' });
    }
}

async function showEleicao(req, res) {
    const id = req.params.id;
    try {
        const eleicoes = await eleicaoModel.getEleicaoById(id);
        if (eleicoes.length === 0) {
            res.send('Eleicao não encontrado');
        } else {
            res.render('eleicoes', { eleicoes });
        }
    } catch (error) {
        console.error('Erro ao filtrar eleicao:', error);
        res.render('error', { message: 'Erro ao filtrar eleicao', returnLink: '/welcome' });
    }
}

async function deleteEleicao(req, res) {
    const id = req.params.id;
    try {
        await eleicaoModel.deleteEleicao(id);
        res.redirect('/eleicoes');
    } catch (error) {
        console.error('Erro ao excluir eleicao:', error);
        res.status(500).send('Erro ao excluir eleicao');
    }
}

async function showEditForm(req, res) {
    const id = req.params.id;
    try {
        const eleicao = await eleicaoModel.getEleicaoById(id);
        if (!eleicao) {
            res.status(404).send('Eleicao não encontrado');
            return;
        }
        res.render('editEleicao', { eleicao });
    } catch (error) {
        console.error('Erro ao buscar eleicao:', error);
        res.status(500).send('Erro ao buscar eleicao');
    }
}

async function editEleicao(req, res) {
    const id = req.params.id;
    const { eleicao, eleicao_id } = req.body;
    try {
        await eleicaoModel.updateEleicao(eleicao, eleicao_id);
        res.redirect('/eleicoes');
    } catch (error) {
        console.error('Erro ao editar eleicao:', error);
        res.status(500).send('Erro ao editar eleicao');
    }
}

async function showConfirmDeleteForm(req, res) {
    const id = req.params.id;
    try {
        const eleicao = await eleicaoModel.getEleicaoById(id);
        if (!eleicao) {
            res.status(404).send('Eleicao não encontrado');
            return;
        }
        res.render('confirmDelete', { eleicao });
    } catch (error) {
        console.error('Erro ao buscar eleicao:', error);
        res.status(500).send('Erro ao buscar eleicao');
    }
}

module.exports = {
    listEleicoes,
    filterEleicao,
    addEleicao,
    showEleicao,
    showEditForm,
    editEleicao,
    showConfirmDeleteForm,
    deleteEleicao
};
