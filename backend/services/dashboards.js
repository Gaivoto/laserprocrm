const utils = require('../utils/index.js');

const dbDash = require('../db/dashboards.js');

async function getAllDashboards(access_token, refresh_token) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;
            let dashboards = [];

            dbDash.getAllDashboards().then(value2 => {

                utils.createLog(value.user, 'Leitura', 'Dashboards', null);

                value2.forEach(d => {
                    dashboards.push({ id: d.id, estado: d.estado });
                });

                info.dashboards = dashboards;

                resolve({ code: 200, info: info });
            })
            .catch(error => {
                console.log(error);
                utils.createErrorLog(error, value.user, 400);
                reject({ code: 400, error: { message: "Ocorreu um problema. Tente novamente mais tarde." } });
            });
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "Sessão expirou." } });
        });
    });
}
 
async function toggleDashboard(access_token, refresh_token, id, estado) {
    return new Promise((resolve, reject) => {
        
        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
                utils.createErrorLog(`Tentativa de modificação (toggle) de dashboard (id: '${id}') falhada por falta de permissão. Apenas administradores e super-administradores podem efetuar esta operação`, value.user, 403);
            } else if(estado != 'Ativo' && estado != 'Inativo') {
                reject({ code: 400, error: { message: "Estado inválido." } });
                utils.createErrorLog(`Tentativa de modificação (toggle) de dashboard (id: '${id}') falhada por dados inválidos (estado inválido)`, value.user, 400);
            } else {
                dbDash.getAllDashboards().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(d => {
                        if(d.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "Esta dashboard não foi encontrada." } });
                        utils.createErrorLog(`Tentativa de modificação (toggle) de dashboard (id: '${id}') falhada por dados inválidos (dashboard não encontrada)`, value.user, 404);
                    } else {
                        dbDash.toggleDashboard(id, estado).then(value3 => {

                            let action = estado == 'Ativo' ? 'Modificação (ativar)' : 'Modificação (desativar)';
                            utils.createLog(value.user, action, 'Dashboards', id);
                        
                            info.message = "Dashboard alterada com sucesso.";
                            resolve({ code: 200, info: info });
                        })
                        .catch(error => {
                            console.log(error);
                            utils.createErrorLog(error, value.user, 400);
                            reject({ code: 400, error: { message: "Ocorreu um problema. Tente novamente mais tarde." } });
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    utils.createErrorLog(error, value.user, 400);
                    reject({ code: 400, error: { message: "Ocorreu um problema. Tente novamente mais tarde." } });
                });
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "Sessão expirou." } })
        });
    });
}

module.exports = {
    getAllDashboards: getAllDashboards,
    toggleDashboard: toggleDashboard
}