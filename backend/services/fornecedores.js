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
            } else if(!body.nome || !body.contacto || !body.email || !body.morada || !body.nif) {
                reject({ code: 400, error: { message: "Preencha todos os campos." } });
            } else {
                dbForn.getAllFornecedores().then(value2 => {
                    
                    let existe = false;

                    value2.forEach(f => {
                        if(f.nome == body.nome || f.contacto == body.contacto || f.email == body.email || f.morada == body.morada || f.nif == body.nif) existe = true;
                    })

                    if (existe) {
                        reject({ code: 400, error: { message: "Os dados do fornecedor devem ser únicos." } });
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
                            info.message = "Fornecedor criado com sucesso.";
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

async function toggleFornecedor(access_token, refresh_token, id, estado) {
    return new Promise((resolve, reject) => {
        
        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
            } else if(estado != 'Ativo' && estado != 'Inativo') {
                reject({ code: 400, error: { message: "Estado inválido." } });
            } else {
                dbForn.getAllFornecedores().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(f => {
                        if(f.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "Este fornecedor não foi encontrado." } });
                    } else {
                        dbForn.toggleFornecedor(id, estado).then(value3 => {
                            info.message = "Fornecedor alterado com sucesso.";
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

async function editFornecedor(access_token, refresh_token, id, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
            } else if(!body.nome || !body.contacto || !body.email || !body.morada || !body.nif) {
                reject({ code: 400, error: { message: "Preencha todos os campos." } });
            } else {

                dbForn.getAllFornecedores().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(f => {
                        if(f.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "Este fornecedor não foi encontrado." } });
                    } else {

                        let existe2 = false;

                        value2.forEach(f => {
                            if(f.id != id && (f.nome == body.nome || f.contacto == body.contacto || f.email == body.email || f.morada == body.morada || f.nif == body.nif)) existe2 = true;
                        });

                        if(existe2) {
                            reject({ code: 400, error: { message: "Os dados do fornecedor devem ser únicos." } });
                        } else {
                            dbForn.editFornecedor(body, id).then(value3 => {
                                info.message = "Fornecedor alterado com sucesso.";
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
    getAllFornecedores: getAllFornecedores,
    createFornecedor: createFornecedor,
    editFornecedor: editFornecedor,
    toggleFornecedor: toggleFornecedor
}