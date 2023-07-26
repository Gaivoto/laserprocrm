const serMate = require('../services/materiais.js');

async function getAllMateriais(req, res) {
    serMate.getAllMateriais(req.headers['authorization'], req.headers.refreshtoken).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function createMaterial(req, res) {
    serMate.createMaterial(req.headers['authorization'], req.headers.refreshtoken, req.body).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function editMaterial(req, res) {
    serMate.editMaterial(req.headers['authorization'], req.headers.refreshtoken, req.params.id, req.body).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function toggleMaterial(req, res) {
    serMate.toggleMaterial(req.headers['authorization'], req.headers.refreshtoken, req.params.id, req.body.estado).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function deleteMaterial(req, res) {
    serMate.deleteMaterial(req.headers['authorization'], req.headers.refreshtoken, req.params.id).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    getAllMateriais: getAllMateriais,
    createMaterial: createMaterial,
    editMaterial: editMaterial,
    toggleMaterial: toggleMaterial,
    deleteMaterial: deleteMaterial
}