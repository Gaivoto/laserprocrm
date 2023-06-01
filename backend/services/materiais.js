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

                value2.forEach(m => {
                    materiais.push({ id: m.id, tipo: m.tipo, liga: m.liga, acabamento: m.acabamento, dimensoes: m.dimensoes, estado: m.estado });
                });

                info.materiais = materiais;

                resolve({ code: 200, info: info });
            })
            .catch(error => {
                console.log(error);
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
            } else if(!body.tipo || !body.liga || !body.acabamento || !body.dimensoes) {
                reject({ code: 400, error: { message: "Preencha todos os campos." } });
            } else {
                dbMate.getAllMateriais().then(value2 => {
                    
                    let existe = false;

                    value2.forEach(m => {
                        if(m.tipo == body.tipo && m.liga == body.liga && m.acabamento == body.acabamento && m.dimensoes == body.dimensoes) existe = true;
                    })

                    if (existe) {
                        reject({ code: 400, error: { message: "Este material já existe." } });
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
                            info.message = "Material criado com sucesso.";
                            resolve({ code: 201, info: info });
                        })
                        .catch(error => {
                            console.log(error);
                            reject({ code: 400, error: { message: "Ocorreu um problema. Tente novamente mais tarde." } });
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
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
            } else if(estado != 'Ativo' && estado != 'Inativo') {
                reject({ code: 400, error: { message: "Estado inválido." } });
            } else {
                dbMate.getAllMateriais().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(m => {
                        if(m.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "Este material não foi encontrado." } });
                    } else {
                        dbMate.toggleMaterial(id, estado).then(value3 => {
                            info.message = "Material alterado com sucesso.";
                            resolve({ code: 200, info: info });
                        })
                        .catch(error => {
                            console.log(error);
                            reject({ code: 400, error: { message: "Ocorreu um problema. Tente novamente mais tarde." } });
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
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
            } else if(!body.tipo || !body.liga || !body.acabamento || !body.dimensoes) {
                reject({ code: 400, error: { message: "Preencha todos os campos." } });
            } else {

                dbMate.getAllMateriais().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(m => {
                        if(m.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "Este material não foi encontrado." } });
                    } else {

                        let existe2 = false;

                        value2.forEach(m => {
                            if(m.id != id && (m.tipo == body.tipo && m.liga == body.liga && m.acabamento == body.acabamento && m.dimensoes == body.dimensoes && m.nif == body.nif)) existe2 = true;
                        });

                        if(existe2) {
                            reject({ code: 400, error: { message: "Este material já existe." } });
                        } else {
                            dbMate.editMaterial(body, id).then(value3 => {
                                info.message = "Material alterado com sucesso.";
                                resolve({ code: 200, info: info });
                            })
                            .catch(error => {
                                console.log(error);
                                reject({ code: 400, error: { message: "Ocorreu um problema. Tente novamente mais tarde." } });
                            });
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
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
    toggleMaterial: toggleMaterial
}