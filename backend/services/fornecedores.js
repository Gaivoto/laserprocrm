const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbForn = require('../db/fornecedores.js');

async function getAllFornecedores(access_token, refresh_token) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;
            let fornecedores = [];

            dbForn.getAllFornecedores().then(value2 => {

                utils.createLog(value.user, 'Leitura', 'Fornecedores', null);
                utils.createLog(value.user, 'Leitura', 'Pessoas', null);
                
                value2.forEach(f => {
                    let existe = false;

                    fornecedores.forEach(forn => {
                        if(f.id == forn.id) existe = true; 
                    });

                    if(!existe) {
                        if(f.idpessoa) {
                            fornecedores.push({ id: f.id, nome: f.nome, morada: f.morada, email: f.email, contacto: f.contacto, nif: f.nif, estado: f.estado, pessoas: [ { id: f.idpessoa, nome: f.nomepessoa, email: f.emailpessoa, cargo: f.cargopessoa, contacto: f.contactopessoa, estado: f.estadopessoa } ] });
                        } else {
                            fornecedores.push({ id: f.id, nome: f.nome, morada: f.morada, email: f.email, contacto: f.contacto, nif: f.nif, estado: f.estado, pessoas: [] });
                        }
                    } else {
                        fornecedores.forEach(forn => {
                            if(forn.id == f.id) forn.pessoas.push({ id: f.idpessoa, nome: f.nomepessoa, email: f.emailpessoa, cargo: f.cargopessoa, contacto: f.contactopessoa, estado: f.estadopessoa });
                        })
                    }
                });

                info.fornecedores = fornecedores;

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

async function createFornecedor(access_token, refresh_token, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value1 => {
            let info = value1;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
                utils.createErrorLog(`Tentativa de criação de fornecedor falhada por falta de permissão. Apenas administradores e super-administradores podem efetuar esta operação`, value1.user, 403);
            } else if(!body.nome || !body.contacto || !body.email || !body.morada || !body.nif) {
                reject({ code: 400, error: { message: "Preencha todos os campos." } });
                utils.createErrorLog(`Tentativa de criação de fornecedor falhada por dados inválidos (campos vazios)`, value1.user, 400);
            } else {
                dbForn.getAllFornecedores().then(value2 => {
                    
                    let existe = false;

                    value2.forEach(f => {
                        if(f.nome == body.nome || f.contacto == body.contacto || f.email == body.email || f.morada == body.morada || f.nif == body.nif) existe = true;
                    })

                    if (existe) {
                        reject({ code: 400, error: { message: "Os dados do fornecedor devem ser únicos." } });
                        utils.createErrorLog(`Tentativa de criação de fornecedor falhada por dados inválidos (dados não únicos)`, value1.user, 400);
                    } else {

                        var existe2 = false;

                        do {
                            existe2 = false;
                            id = uuid.v4();

                            value2.forEach(u => {
                                if (u.id == id) existe2 = true;
                            });
                        } while (existe2)

                        dbForn.createFornecedor(id, body).then(value => {

                            utils.createLog(value1.user, 'Criação', 'Fornecedores', id);

                            info.message = "Fornecedor criado com sucesso.";
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

async function toggleFornecedor(access_token, refresh_token, id, estado) {
    return new Promise((resolve, reject) => {
        
        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
                utils.createErrorLog(`Tentativa de modificação (toggle) de fornecedor (id: '${id}') falhada por falta de permissão. Apenas administradores e super-administradores podem efetuar esta operação`, value.user, 403);
            } else if(estado != 'Ativo' && estado != 'Inativo') {
                reject({ code: 400, error: { message: "Estado inválido." } });
                utils.createErrorLog(`Tentativa de modificação (toggle) de fornecedor (id: '${id}') falhada por dados inválidos (estado inválido)`, value.user, 400);
            } else {
                dbForn.getAllFornecedores().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(f => {
                        if(f.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "Este fornecedor não foi encontrado." } });
                        utils.createErrorLog(`Tentativa de modificação (toggle) de fornecedor (id: '${id}') falhada por dados inválidos (fornecedor não encontrado)`, value.user, 404);
                    } else {
                        dbForn.toggleFornecedor(id, estado).then(value3 => {

                            let action = estado == 'Ativo' ? 'Modificação (ativar)' : 'Modificação (desativar)';
                            utils.createLog(value.user, action, 'Fornecedores', id);

                            info.message = "Fornecedor alterado com sucesso.";
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

async function editFornecedor(access_token, refresh_token, id, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
                utils.createErrorLog(`Tentativa de modificação de fornecedor (id: '${id}') falhada por falta de permissão. Apenas administradores e super-administradores podem efetuar esta operação`, value.user, 403);
            } else if(!body.nome || !body.contacto || !body.email || !body.morada || !body.nif) {
                reject({ code: 400, error: { message: "Preencha todos os campos." } });
                utils.createErrorLog(`Tentativa de modificação de fornecedor (id: '${id}') falhada por dados inválidos (campos vazios)`, value.user, 400);
            } else {

                dbForn.getAllFornecedores().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(f => {
                        if(f.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "Este fornecedor não foi encontrado." } });
                        utils.createErrorLog(`Tentativa de modificação de fornecedor (id: '${id}') falhada por dados inválidos (fornecedor não encontrado)`, value.user, 404);
                    } else {

                        let existe2 = false;

                        value2.forEach(f => {
                            if(f.id != id && (f.nome == body.nome || f.contacto == body.contacto || f.email == body.email || f.morada == body.morada || f.nif == body.nif)) existe2 = true;
                        });

                        if(existe2) {
                            reject({ code: 400, error: { message: "Os dados do fornecedor devem ser únicos." } });
                            utils.createErrorLog(`Tentativa de modificação de fornecedor (id: '${id}') falhada por dados inválidos (dados não únicos)`, value.user, 400);
                        } else {
                            dbForn.editFornecedor(body, id).then(value3 => {

                                utils.createLog(value.user, 'Modificação', 'Fornecedores', id);

                                info.message = "Fornecedor alterado com sucesso.";
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

module.exports = {
    getAllFornecedores: getAllFornecedores,
    createFornecedor: createFornecedor,
    editFornecedor: editFornecedor,
    toggleFornecedor: toggleFornecedor
}