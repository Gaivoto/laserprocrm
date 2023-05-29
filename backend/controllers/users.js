const serUser = require('../services/users.js');

async function getAllUsers(req, res) {
    serUser.getAllUsers(req.headers['authorization'], req.headers.refreshtoken).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function createUser(req, res) {
    serUser.createUser(req.headers['authorization'], req.headers.refreshtoken, req.body).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function editUser(req, res) {
    serUser.editFornecedor(req.headers['authorization'], req.headers.refreshtoken, req.params.id, req.body).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function toggleUser(req, res) {
    serUser.toggleUser(req.headers['authorization'], req.headers.refreshtoken, req.params.id, req.body.estado).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function createAdm(req, res) {
    serUser.createAdm(req.headers['authorization'], req.headers.refreshtoken, req.body).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function editAdm(req, res) {
    serUser.editAdm(req.headers['authorization'], req.headers.refreshtoken, req.params.id, req.body).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function toggleAdm(req, res) {
    serUser.toggleAdm(req.headers['authorization'], req.headers.refreshtoken, req.params.id, req.body.estado).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    editUser: editUser,
    toggleUser: toggleUser,
    createAdm: createAdm,
    editAdm: editAdm,
    toggleAdm: toggleAdm
}