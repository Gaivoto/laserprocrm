const serPess = require('../services/pessoas.js');
 
async function createPessoa(req, res) {
    serPess.createPessoa(req.headers['authorization'], req.headers.refreshtoken, req.body).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function editPessoa(req, res) {
    serPess.editPessoa(req.headers['authorization'], req.headers.refreshtoken, req.params.id, req.body).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function togglePessoa(req, res) {
    serPess.togglePessoa(req.headers['authorization'], req.headers.refreshtoken, req.params.id, req.body.estado).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    createPessoa: createPessoa,
    editPessoa: editPessoa,
    togglePessoa: togglePessoa
}