const serForn = require('../services/fornecedores.js');

async function getAllFornecedores(req, res) {
    serForn.getAllFornecedores(req.headers['authorization'], req.headers.refreshtoken).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function createFornecedor(req, res) {
    serForn.createFornecedor(req.headers['authorization'], req.headers.refreshtoken, req.body).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function editFornecedor(req, res) {
    serForn.editFornecedor(req.headers['authorization'], req.headers.refreshtoken, req.params.id, req.body).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function toggleFornecedor(req, res) {
    serForn.toggleFornecedor(req.headers['authorization'], req.headers.refreshtoken, req.params.id, req.body.estado).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    getAllFornecedores: getAllFornecedores,
    createFornecedor: createFornecedor,
    editFornecedor: editFornecedor,
    toggleFornecedor: toggleFornecedor
}