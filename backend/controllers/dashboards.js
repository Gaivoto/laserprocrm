const serDash = require('../services/dashboards.js');
 
async function getAllDashboards(req, res) {
    serDash.getAllDashboards(req.headers['authorization'], req.headers.refreshtoken).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function toggleDashboard(req, res) {
    serDash.toggleDashboard(req.headers['authorization'], req.headers.refreshtoken, req.params.id, req.body.estado).then(value => {
        res.status(value.code).send(value.info)
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    getAllDashboards: getAllDashboards,
    toggleDashboard: toggleDashboard
}