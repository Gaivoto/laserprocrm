const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbComp = require('../db/compras.js');
const dbForn = require('../db/fornecedores.js');
const dbMate = require('../db/materiais.js');

async function getAllCompras(access_token, refresh_token) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;
            let compras = [];

            dbComp.getAllCompras().then(value2 => {

                value2.forEach(c => {
                    compras.push({ id: c.id, data: c.data, valor: c.valor, quantidade: c.quantidade, fornecedor: { id: c.idfornecedor, nome: c.nomefornecedor, email: c.emailfornecedor, nif: c.niffornecedor, morada: c.moradafornecedor, contacto: c.contactofornecedor }, material: { id: c.idmaterial, tipo: c.tipomaterial, liga: c.ligamaterial, acabamento: c.acabamentomaterial, dimensoes: c.dimensoesmaterial } });
                });

                info.compras = compras;

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

async function createCompra(access_token, refresh_token, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value1 => {
            let info = value1;

            if(!body.valor || !body.quantidade || !body.data || !body.idFornecedor || !body.idMaterial || parseFloat(body.valor) <= 0 || parseFloat(body.quantidade) <= 0) {
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
                        dbMate.getAllMateriais().then(value3 => {
                            let existe2 = false;

                            value3.forEach(m => {
                                if(m.id == body.idMaterial) existe2 = true;
                            });
        
                            if(!existe2) {
                                reject({ code: 404, error: { message: "Este material não foi encontrado." } });
                            } else {
                                dbComp.getAllCompras().then(value4 => {
                    
                                    let existe3 = false;
                
                                    do {
                                        existe3 = false;
                                        id = uuid.v4();
            
                                        value4.forEach(c => {
                                            if (c.id == id) existe3 = true;
                                        });
                                    } while (existe3)
            
                                    dbComp.createCompra(id, body).then(value => {
                                        info.message = "Compra criada com sucesso.";
                                        resolve({ code: 201, info: info });
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        reject({ code: 400, error: { message: "Ocorreu um problema. Tente novamente mais tarde." } });
                                    });
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

async function editCompra(access_token, refresh_token, id, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
            } else if(!body.valor || !body.quantidade || !body.data || !body.idFornecedor || !body.idMaterial || parseFloat(body.valor) <= 0 || parseFloat(body.quantidade) <= 0) {
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
                        dbMate.getAllMateriais().then(value3 => {
                            let existe2 = false;

                            value3.forEach(m => {
                                if(m.id == body.idMaterial) existe2 = true;
                            });
        
                            if(!existe2) {
                                reject({ code: 404, error: { message: "Este material não foi encontrado." } });
                            } else {
                                dbComp.getAllCompras().then(value4 => {

                                    let existe3 = false;
                                            
                                    value4.forEach(c => {
                                        if(c.id == id) existe3 = true;
                                    })
                
                                    if (!existe3) {
                                        reject({ code: 404, error: { message: "Esta compra não foi encontrada." } });
                                    } else {
                
                                        dbComp.editCompra(body, id).then(value5 => {
                                            info.message = "Compra alterada com sucesso.";
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

async function deleteCompra(access_token, refresh_token, id) {
    return new Promise((resolve, reject) => {
        
        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "Este utilizador não tem permissão para efetuar esta operação." } });
            } else {
                dbComp.getAllCompras().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(c => {
                        if(c.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "Esta compra não foi encontrada." } });
                    } else {
                        dbComp.deleteCompra(id).then(value3 => {
                            info.message = "Compra apagada com sucesso.";
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

module.exports = {
    getAllCompras: getAllCompras,
    createCompra: createCompra,
    editCompra: editCompra,
    deleteCompra: deleteCompra
}