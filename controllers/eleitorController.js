const eleitorModel = require('../models/eleitorModel');

async function loginEleitor(req, res) {
    const { cpf, password, nome } = req.body;
    try {
        const user = await eleitorModel.getEleitorByUsernameAndPassword(cpf, password);
        if (user) {
            res.redirect('/welcomeEleitor?username=' + encodeURIComponent(user.nome) + '&tipo=' + encodeURIComponent(user.cpf));
        } else {
            res.redirect('/loginEleitores');
        }
    } catch (error) {
        console.error('Erro durante a autenticação:', error);
        res.status(500).send('Erro durante a autenticação');
    }
}

async function welcomeEleitor(req, res) {
    const { nome, cpf } = req.query;

    try {

        res.render('welcomeEleitor', { usuario: nome, tipo: cpf });

    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        res.status(500).send('Erro ao acessar o banco de dados');
    }
}

async function listEleitores(req, res) {
    try {
        const eleitores = await eleitorModel.getAllEleitores();
        res.render('eleitores', { eleitores });
    } catch (error) {
        console.error('Erro ao buscar eleitores:', error);
        res.render('error', { message: 'Erro ao buscar eleitores', returnLink: '/welcome' });
    }
}

async function filterEleitor(req, res) {
    const { nome } = req.body;
    try {
        const eleitores = await eleitorModel.getEleitorByNome(nome);
        if (eleitores.length === 0) {
            res.send('Eleitor não encontrado');
        } else {
            res.render('eleitores', { eleitores });
        }
    } catch (error) {
        console.error('Erro ao filtrar eleitor:', error);
        res.render('error', { message: 'Erro ao filtrar eleitor', returnLink: '/welcome' });
    }
}

async function addEleitor(req, res) {
    const { nome, cpf, endereco, senha, liberado } = req.body;
    try {
        const id = await eleitorModel.insertEleitor(nome, cpf, endereco, senha, liberado);
        res.redirect('/welcomeEleitor');
    } catch (error) {
        console.error('Erro ao inserir eleitor:', error);
        res.render('error', { message: 'Erro ao inserir eleitor', returnLink: '/welcome' });
    }
}

async function showEleitor(req, res) {
    const id = req.params.id;
    try {
        const eleitores = await eleitorModel.getEleitorById(id);
        if (eleitores.length === 0) {
            res.send('Eleitor não encontrado');
        } else {
            res.render('eleitores', { eleitores });
        }
    } catch (error) {
        console.error('Erro ao filtrar eleitor:', error);
        res.render('error', { message: 'Erro ao filtrar eleitor', returnLink: '/welcome' });
    }
}

async function deleteEleitor(req, res) {
    const id = req.params.id;
    try {
        await eleitorModel.deleteEleitor(id);
        res.redirect('/eleitores');
    } catch (error) {
        console.error('Erro ao excluir eleitor:', error);
        res.status(500).send('Erro ao excluir eleitor');
    }
}

async function showEditForm(req, res) {
    const id = req.params.id;
    try {
        const eleitor = await eleitorModel.getEleitorById(id);
        if (!eleitor) {
            res.status(404).send('Eleitor não encontrado');
            return;
        }
        res.render('editEleitor', { eleitor });
    } catch (error) {
        console.error('Erro ao buscar eleitor:', error);
        res.status(500).send('Erro ao buscar eleitor');
    }
}

async function editEleitor(req, res) {
    const id = req.params.id;
    const { nome, cpf, endereco, senha, liberado } = req.body;
    try {
        await eleitorModel.updateEleitor(nome, cpf, endereco, senha, liberado);
        res.redirect('/eleitores');
    } catch (error) {
        console.error('Erro ao editar eleitor:', error);
        res.status(500).send('Erro ao editar eleitor');
    }
}

async function showConfirmDeleteForm(req, res) {
    const id = req.params.id;
    try {
        const eleitor = await eleitorModel.getEleitorById(id);
        if (!eleitor) {
            res.status(404).send('Eleitor não encontrado');
            return;
        }
        res.render('confirmDelete', { eleitor });
    } catch (error) {
        console.error('Erro ao buscar eleitor:', error);
        res.status(500).send('Erro ao buscar eleitor');
    }
}

module.exports = {
    listEleitores,
    filterEleitor,
    addEleitor,
    showEleitor,
    showEditForm,
    editEleitor,
    showConfirmDeleteForm,
    deleteEleitor,
    loginEleitor,
    welcomeEleitor
};
