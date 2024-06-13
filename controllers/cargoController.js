const cargoModel = require('../models/cargoModel');

async function listCargos(req, res) {
    try {
        const cargos = await cargoModel.getAllCargos();
        res.render('cargos', { cargos });
    } catch (error) {
        console.error('Erro ao buscar cargos:', error);
        res.render('error', { message: 'Erro ao buscar cargos', returnLink: '/welcome' });
    }
}

async function filterCargo(req, res) {
    const { nome } = req.body;
    try {
        const cargos = await cargoModel.getCargoByNome(nome);
        if (cargos.length === 0) {
            res.send('Cargo não encontrado');
        } else {
            res.render('cargos', { cargos });
        }
    } catch (error) {
        console.error('Erro ao filtrar cargo:', error);
        res.render('error', { message: 'Erro ao filtrar cargo', returnLink: '/welcome' });
    }
}

async function addCargo(req, res) {
    const { cargo, eleicao_id } = req.body;
    try {
        const id = await cargoModel.insertCargo(cargo, eleicao_id);
        res.redirect('/cargos')
    } catch (error) {
        console.error('Erro ao inserir cargo:', error);
        res.render('error', { message: 'Erro ao inserir cargo', returnLink: '/welcome' });
    }
}

async function showCargo(req, res) {
    const id = req.params.id;
    try {
        const cargos = await cargoModel.getCargoById(id);
        if (cargos.length === 0) {
            res.send('Cargo não encontrado');
        } else {
            res.render('cargos', { cargos });
        }
    } catch (error) {
        console.error('Erro ao filtrar cargo:', error);
        res.render('error', { message: 'Erro ao filtrar cargo', returnLink: '/welcome' });
    }
}

async function deleteCargo(req, res) {
    const id = req.params.id;
    try {
        await cargoModel.deleteCargo(id);
        res.redirect('/cargos');
    } catch (error) {
        console.error('Erro ao excluir cargo:', error);
        res.status(500).send('Erro ao excluir cargo');
    }
}

async function showEditForm(req, res) {
    const id = req.params.id;
    try {
        const cargo = await cargoModel.getCargoById(id);
        if (!cargo) {
            res.status(404).send('Cargo não encontrado');
            return;
        }
        res.render('editCargo', { cargo });
    } catch (error) {
        console.error('Erro ao buscar cargo:', error);
        res.status(500).send('Erro ao buscar cargo');
    }
}

async function editCargo(req, res) {
    const id = req.params.id;
    const { cargo, eleicao_id } = req.body;
    try {
        await cargoModel.updateCargo(cargo, eleicao_id);
        res.redirect('/cargos');
    } catch (error) {
        console.error('Erro ao editar cargo:', error);
        res.status(500).send('Erro ao editar cargo');
    }
}

async function showConfirmDeleteForm(req, res) {
    const id = req.params.id;
    try {
        const cargo = await cargoModel.getCargoById(id);
        if (!cargo) {
            res.status(404).send('Cargo não encontrado');
            return;
        }
        res.render('confirmDelete', { cargo });
    } catch (error) {
        console.error('Erro ao buscar cargo:', error);
        res.status(500).send('Erro ao buscar cargo');
    }
}

module.exports = {
    listCargos,
    filterCargo,
    addCargo,
    showCargo,
    showEditForm,
    editCargo,
    showConfirmDeleteForm,
    deleteCargo
};
