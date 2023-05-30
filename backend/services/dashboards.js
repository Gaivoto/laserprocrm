const utils = require('../utils/index.js');

const dbDash = require('../db/dashboards.js');

async function getAllDashboards(access_token, refresh_token) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;
            let dashboards = [];

            dbDash.getAllDashboards().then(value2 => {

                value2.forEach(d => {
                    dashboards.push({ id: d.id, estado: d.estado });
                });

                info.dashboards = dashboards;

                resolve({ code: 200, info: info });
            })
            .catch(error => {
                console.log(error);
                reject({ code: 400, error: { message: "backendQueryError" } });
            });
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "invalidToken" } });
        });
    });
}

async function toggleDashboard(access_token, refresh_token, id, estado) {
    return new Promise((resolve, reject) => {
        
        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "forbidden" } });
            } else if(estado != 'Ativo' && estado != 'Inativo') {
                reject({ code: 400, error: { message: "invalidState" } });
            } else {
                dbDash.getAllDashboards().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(d => {
                        if(d.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "noDashboard" } });
                    } else {
                        dbDash.toggleDashboard(id, estado).then(value3 => {
                            info.message = "Dashboard alterada com sucesso.";
                            resolve({ code: 200, info: info });
                        })
                        .catch(error => {
                            console.log(error);
                            reject({ code: 400, error: { message: "backendQueryError" } });
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: "backendQueryError" } });
                });
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "invalidToken" } })
        });
    });
}

module.exports = {
    getAllDashboards: getAllDashboards,
    toggleDashboard: toggleDashboard
}