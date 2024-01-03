const serComp = require('../services/compras.js');
 
async function getAllCompras(req, res) {
    serComp.getAllCompras(req.headers['authorization'], req.headers.refreshtoken).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function createCompra(req, res) {
    serComp.createCompra(req.headers['authorization'], req.headers.refreshtoken, req.body).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function editCompra(req, res) {
    serComp.editCompra(req.headers['authorization'], req.headers.refreshtoken, req.params.id, req.body).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function deleteCompra(req, res) {
    serComp.deleteCompra(req.headers['authorization'], req.headers.refreshtoken, req.params.id).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    getAllCompras: getAllCompras,
    createCompra: createCompra,
    editCompra: editCompra,
    deleteCompra: deleteCompra
}