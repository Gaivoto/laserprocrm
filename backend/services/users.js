const utils = require('../utils/index.js');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const dbUser = require('../db/users.js');

async function getAllUsers(access_token, refresh_token) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;
            let users = [];
 
            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
                utils.createErrorLog(`Tentativa de leitura de utilizadores falhada por falta de permissão. Apenas administradores e super-administradores podem efetuar esta operação`, value.user, 403);
            } else {
                utils.createLog(value.user, 'Leitura', 'Users', null);

                dbUser.getAllUsers().then(value2 => {

                    value2.forEach(u => {
                        users.push({ id: u.id, tipo: u.tipo, username: u.username, estado: u.estado });
                    });
    
                    info.users = users;
    
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
            reject({ code: 401, error: { message: "Sessão expirou." } });
        });
    });
}

async function createUser(access_token, refresh_token, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value1 => {
            let info = value1;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
                utils.createErrorLog(`Tentativa de criação de utilizador tipo user falhada por falta de permissão. Apenas administradores e super-administradores podem efetuar esta operação`, value1.user, 403);
            } else if(!body.username || !body.password || !body.tipo) {
                reject({ code: 400, error: { message: "Preencha todos os campos." } });
                utils.createErrorLog(`Tentativa de criação de utilizador tipo ${body.tipo} falhada por dados inválidos (campos vazios)`, value1.user, 400);
            } else if(body.tipo == "adm" && info.user.tipo != "superadm") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
                utils.createErrorLog(`Tentativa de criação de utilizador tipo adm falhada por falta de permissão. Apenas super-administradores podem efetuar esta operação`, value1.user, 403);
            } else {
                dbUser.getAllUsers().then(async value2 => {
                    
                    let existe = false;

                    value2.forEach(u => {
                        if(u.username == body.username) existe = true;
                    });

                    if (existe) {
                        reject({ code: 400, error: { message: "O nome de utilizador deve ser único." } });
                        utils.createErrorLog(`Tentativa de criação de utilizador tipo ${body.tipo} falhada por dados inválidos (nome de utilizador não único)`, value1.user, 400);
                    } else {

                        var existe2 = false;

                        do {
                            existe2 = false;
                            id = uuid.v4();

                            value2.forEach(u => {
                                if (u.id == id) existe2 = true;
                            });
                        } while (existe2)

                        body.password = await bcrypt.hash(body.password, 10);

                        utils.createLog(value1.user, 'Criação', 'Users', id);

                        dbUser.createUser(id, body).then(value => {
                            info.message = "Utilizador criado com sucesso.";
                            resolve({ code: 201, info: info });
                        })
                        .catch(error => {
                            console.log(error);
                            utils.createErrorLog(error, value1.user, 400);
                            reject({ code: 400, error: { message: "Ocorreu um problema. Tente novamente mais tarde." } });
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    utils.createErrorLog(error, value1.user, 400);
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

async function toggleUser(access_token, refresh_token, id, body) {
    return new Promise((resolve, reject) => {
        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;
            
            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
                utils.createErrorLog(`Tentativa de modificação (toggle) de utilizador tipo user (id: '${id}') falhada por falta de permissão. Apenas administradores e super-administradores podem efetuar esta operação`, value.user, 403);
            } else if(body.tipo == "adm" && info.user.tipo != "superadm") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
                utils.createErrorLog(`Tentativa de modificação (toggle) de utilizador tipo adm (id: '${id}') falhada por falta de permissão. Apenas super-administradores podem efetuar esta operação`, value.user, 403);
            } else if(body.estado != 'Ativo' && body.estado != 'Inativo') {
                reject({ code: 400, error: { message: "Estado inválido." } });
                utils.createErrorLog(`Tentativa de modificação (toggle) de utilizador tipo ${body.tipo} (id: '${id}') falhada por dados inválidos (estado inválido)`, value.user, 400);
            } else {
                dbUser.getAllUsers().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(u => {
                        if(u.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "Este utiilizador não foi encontrado." } });
                        utils.createErrorLog(`Tentativa de modificação (toggle) de utilizador tipo ${body.tipo} (id: '${id}') falhada por dados inválidos (utilizador não encontrado)`, value.user, 404);
                    } else {
                        let action = body.estado == 'Ativo' ? 'Modificação (ativar)' : 'Modificação (desativar)';
                        utils.createLog(value.user, action, 'Users', id);

                        dbUser.toggleUser(id, body.estado).then(value3 => {
                            info.message = "Utilizador alterado com sucesso.";
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

async function editUser(access_token, refresh_token, id, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
                utils.createErrorLog(`Tentativa de modificação de utilizador tipo user (id: '${id}') falhada por falta de permissão. Apenas administradores e super-administradores podem efetuar esta operação`, value.user, 403);
            } else if(!body.username || !body.tipo) {
                reject({ code: 400, error: { message: "Preencha todos os campos." } });
                utils.createErrorLog(`Tentativa de modificação de utilizador tipo: ${body.tipo} (id: '${id}') falhada por dados inválidos (campos vazios)`, value.user, 400);
            } else if(body.tipo == "adm" && info.user.tipo != "superadm") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
                utils.createErrorLog(`Tentativa de modificação de utilizador tipo adm (id: '${id}') falhada por falta de permissão. Apenas super-administradores podem efetuar esta operação`, value.user, 403);
            } else {

                dbUser.getAllUsers().then(async value2 => {

                    let existe = false;
                            
                    value2.forEach(u => {
                        if(u.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "Este utilizador não foi encontrado." } });
                        utils.createErrorLog(`Tentativa de modificação de utilizador tipo ${body.tipo} (id: '${id}') falhada por dados inválidos (utilizador não encontrado)`, value.user, 404);
                    } else {

                        let existe2 = false;

                        value2.forEach(u => {
                            if(u.id != id && u.username == body.username) existe2 = true;
                        });

                        if(existe2) {
                            reject({ code: 400, error: { message: "O nome de utilizador deve ser único." } });
                            utils.createErrorLog(`Tentativa de modificação de utilizador tipo ${body.tipo} (id: '${id}') falhada por dados inválidos (nome de utilizador não único)`, value.user, 400);
                        } else {
                            utils.createLog(value.user, 'Modificação', 'Users', id);

                            if(body.password) {

                                body.password = await bcrypt.hash(body.password, 10);

                                dbUser.editUserPass(body, id).then(value3 => {
                                    info.message = "Utilizador alterado com sucesso.";
                                    resolve({ code: 200, info: info });
                                })
                                .catch(error => {
                                    console.log(error);
                                    utils.createErrorLog(error, value.user, 400);
                                    reject({ code: 400, error: { message: "Ocorreu um problema. Tente novamente mais tarde." } });
                                });  
                            } else {
                                dbUser.editUser(body, id).then(value3 => {
                                    info.message = "Utilizador alterado com sucesso.";
                                    resolve({ code: 200, info: info });
                                })
                                .catch(error => {
                                    console.log(error);
                                    utils.createErrorLog(error, value.user, 400);
                                    reject({ code: 400, error: { message: "Ocorreu um problema. Tente novamente mais tarde." } });
                                });    
                            }
                        }
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
    getAllUsers: getAllUsers,
    createUser: createUser,
    editUser: editUser,
    toggleUser: toggleUser
}