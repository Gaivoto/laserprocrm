const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbPess = require('../db/pessoas.js');
const dbForn = require('../db/fornecedores.js');

async function createPessoa(access_token, refresh_token, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value1 => {
            let info = value1;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
            } else if(!body.idFornecedor || !body.contacto || !body.nome || !body.email || body.cargo == null) {
                reject({ code: 400, error: { message: "Preencha todos os campos." } });
            } else {
                dbForn.getAllFornecedores().then(value2 => {

                    let existe = false;

                    value2.forEach(f => {
                        if(f.id == body.idFornecedor) existe = true;
                    });

                    if(!existe) {
                        reject({ code: 404, error: { message: "Este fornecedor não foi encontrado." } });
                    } else {
                        dbPess.getAllPessoas().then(value3 => {
                    
                            let existe2 = false;
        
                            value3.forEach(p => {
                                if(p.email == body.email || p.contacto == body.contacto) existe2 = true;
                            })
        
                            if (existe2) {
                                reject({ code: 400, error: { message: "Os dados da pessoa de contacto devem ser únicos." } });
                            } else {
        
                                var existe3 = false;
        
                                do {
                                    existe3 = false;
                                    id = uuid.v4();
        
                                    value3.forEach(u => {
                                        if (u.id == id) existe3 = true;
                                    });
                                } while (existe3)
        
                                dbPess.createPessoa(id, body).then(value => {
                                    info.message = "Pessoa de contacto criada com sucesso.";
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

async function togglePessoa(access_token, refresh_token, id, estado) {
    return new Promise((resolve, reject) => {
        
        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
            } else if(estado != 'Ativo' && estado != 'Inativo') {
                reject({ code: 400, error: { message: "Estado inválido." } });
            } else {
                dbPess.getAllPessoas().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(p => {
                        if(p.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "Esta pessoa não foi encontrada." } });
                    } else {
                        dbPess.togglePessoa(id, estado).then(value3 => {
                            info.message = "Pessoa de contacto alterada com sucesso.";
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

async function editPessoa(access_token, refresh_token, id, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
            } else if(!body.idFornecedor || !body.contacto || !body.nome || !body.email || body.cargo == null) {
                reject({ code: 400, error: { message: "Preencha todos os campos." } });
            } else {

                dbForn.getAllFornecedores().then(value2 => {

                    let existe = false;

                    value2.forEach(f => {
                        if(f.id == body.idFornecedor) existe = true;
                    });

                    if(!existe) {
                        reject({ code: 404, error: { message: "Este fornecedor não foi encontrado." } });
                    } else {
                        dbPess.getAllPessoas().then(value2 => {

                            let existe = false;
                                    
                            value2.forEach(p => {
                                if(p.id == id) existe = true;
                            })
        
                            if (!existe) {
                                reject({ code: 404, error: { message: "Esta pessoa não foi encontrada." } });
                            } else {
        
                                let existe2 = false;
        
                                value2.forEach(p => {
                                    if(p.id != id && (p.contacto == body.contacto || p.email == body.email)) existe2 = true;
                                });
        
                                if(existe2) {
                                    reject({ code: 400, error: { message: "Os dados da pessoa de contacto devem ser únicos." } });
                                } else {
                                    dbPess.editPessoa(body, id).then(value3 => {
                                        info.message = "Pessoa de contacto alterada com sucesso.";
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
    createPessoa: createPessoa,
    editPessoa: editPessoa,
    togglePessoa: togglePessoa
}