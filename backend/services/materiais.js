const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbMate = require('../db/materiais.js');

async function getAllMateriais(access_token, refresh_token) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;
            let materiais = [];

            dbMate.getAllMateriais().then(value2 => {
                utils.createLog(value.user, 'Leitura', 'Materiais', null);

                value2.forEach(m => {
                    let existe = false;

                    materiais.forEach(mat => {
                        if(mat.id == m.id) existe = true;
                    });

                    if(existe) {
                        if(m.count) {
                            materiais.forEach(mat => {
                                if(mat.id == m.id) mat.delete = false;
                            });
                        }
                    } else {
                        if(m.count) {
                            materiais.push({ id: m.id, produto: m.produto, material: m.material, tipo: m.tipo, subtipo: m.subtipo, liga: m.liga, dimensoes: m.dimensoes, estado: m.estado, delete: false });
                        } else {
                            materiais.push({ id: m.id, produto: m.produto, material: m.material, tipo: m.tipo, subtipo: m.subtipo, liga: m.liga, dimensoes: m.dimensoes, estado: m.estado, delete: true });
                        }
                    }
                });

                info.materiais = materiais;

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

async function createMaterial(access_token, refresh_token, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value1 => {
            let info = value1;
            
            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
                utils.createErrorLog(`Tentativa de criação de material falhada por falta de permissão. Apenas administradores e super-administradores podem efetuar esta operação`, value1.user, 403);
            } else if(!body.tipo || !body.dimensoes || !body.produto || !body.material) {
                reject({ code: 400, error: { message: "Preencha todos os campos." } });
                utils.createErrorLog(`Tentativa de criação de material falhada por dados inválidos (campos vazios)`, value1.user, 400);
            } else {
                dbMate.getAllMateriais().then(value2 => {
                    
                    let existe = false;

                    value2.forEach(m => {
                        if(m.produto == body.produto && m.material == body.material && m.tipo == body.tipo && m.subtipo == body.subtipo && m.liga == body.liga && m.dimensoes == body.dimensoes) existe = true;
                    })

                    if (existe) {
                        reject({ code: 400, error: { message: "Este material já existe." } });
                        utils.createErrorLog(`Tentativa de criação de material falhada por dados inválidos (material não único)`, value1.user, 400);
                    } else {

                        var existe2 = false;

                        do {
                            existe2 = false;
                            id = uuid.v4();

                            value2.forEach(u => {
                                if (u.id == id) existe2 = true;
                            });
                        } while (existe2)

                        dbMate.createMaterial(id, body).then(value => {

                            utils.createLog(value1.user, 'Criação', 'Materiais', id);

                            info.message = "Material criado com sucesso.";
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

async function toggleMaterial(access_token, refresh_token, id, estado) {
    return new Promise((resolve, reject) => {
        
        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
                utils.createErrorLog(`Tentativa de modificação (toggle) de material (id: '${id}') falhada por falta de permissão. Apenas administradores e super-administradores podem efetuar esta operação`, value.user, 403);
            } else if(estado != 'Ativo' && estado != 'Inativo') {
                reject({ code: 400, error: { message: "Estado inválido." } });
                utils.createErrorLog(`Tentativa de modificação (toggle) de material (id: '${id}') falhada por dados inválidos (estado inválido)`, value.user, 400);
            } else {
                dbMate.getAllMateriais().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(m => {
                        if(m.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "Este material não foi encontrado." } });
                        utils.createErrorLog(`Tentativa de modificação (toggle) de material (id: '${id}') falhada por dados inválidos (material não encontrado)`, value.user, 404);
                    } else {
                        dbMate.toggleMaterial(id, estado).then(value3 => {

                            let action = estado == 'Ativo' ? 'Modificação (ativar)' : 'Modificação (desativar)';
                            utils.createLog(value.user, action, 'Materiais', id);

                            info.message = "Material alterado com sucesso.";
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

async function editMaterial(access_token, refresh_token, id, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
                utils.createErrorLog(`Tentativa de modificação de material (id: '${id}') falhada por falta de permissão. Apenas administradores e super-administradores podem efetuar esta operação`, value.user, 403);
            } else if(!body.tipo || !body.dimensoes || !body.produto || !body.material) {
                reject({ code: 400, error: { message: "Preencha todos os campos." } });
                utils.createErrorLog(`Tentativa de modificação de material (id: '${id}') falhada por dados inválidos (campos vazios)`, value.user, 400);
            } else {

                dbMate.getAllMateriais().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(m => {
                        if(m.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "Este material não foi encontrado." } });
                        utils.createErrorLog(`Tentativa de modificação de material (id: '${id}') falhada por dados inválidos (material não encontrado)`, value.user, 404);
                    } else {

                        let existe2 = false;

                        value2.forEach(m => {
                            if(m.id != id && (m.produto == body.produto && m.material == body.material && m.tipo == body.tipo && m.subtipo == body.subtipo && m.liga == body.liga && m.dimensoes == body.dimensoes)) existe2 = true;
                        });

                        if(existe2) {
                            reject({ code: 400, error: { message: "Este material já existe." } });
                            utils.createErrorLog(`Tentativa de modificação de material (id: '${id}') falhada por dados inválidos (material não único)`, value.user, 400);
                        } else {
                            dbMate.editMaterial(body, id).then(value3 => {

                                utils.createLog(value.user, 'Modificação', 'Materiais', id);

                                info.message = "Material alterado com sucesso.";
                                resolve({ code: 200, info: info });
                            })
                            .catch(error => {
                                console.log(error);
                                utils.createErrorLog(error, value.user, 400);
                                reject({ code: 400, error: { message: "Ocorreu um problema. Tente novamente mais tarde." } });
                            });
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

async function deleteMaterial(access_token, refresh_token, id) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo != "superadm") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
                utils.createErrorLog(`Tentativa de modificação de material (id: '${id}') falhada por falta de permissão. Apenas administradores e super-administradores podem efetuar esta operação`, value.user, 403);
            } else {

                dbMate.getAllMateriais().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(m => {
                        if(m.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "Este material não foi encontrado." } });
                        utils.createErrorLog(`Tentativa de modificação de material (id: '${id}') falhada por dados inválidos (material não encontrado)`, value.user, 404);
                    } else {
                        dbMate.deleteMaterial(id).then(value3 => {

                            utils.createLog(value.user, 'Eliminação', 'Materiais', id);

                            info.message = "Material eliminado com sucesso.";
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
    getAllMateriais: getAllMateriais,
    createMaterial: createMaterial,
    editMaterial: editMaterial,
    toggleMaterial: toggleMaterial,
    deleteMaterial: deleteMaterial
}