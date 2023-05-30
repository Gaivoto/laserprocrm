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
                    compras.push({ id: c.id, data: c.data, valor: c.valor, quantidade: c.quantidade, fornecedor: { id: c.idFornecedor, nome: c.nomeFornecedor, email: c.emailFornecedor, nif: c.nifFornecedor, morada: c.moradaFornecedor, contacto: c.contactoFornecedor }, material: { id: c.idMaterial, tipo: c.tipoMaterial, liga: c.ligaMaterial, acabamento: c.acabamentoMaterial, dimensoes: c.dimensoesMaterial } });
                });

                info.compras = compras;

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

async function createCompra(access_token, refresh_token, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value1 => {
            let info = value1;

            if(!body.valor || !body.quantidade || !body.data || !body.idFornecedor || !body.idMaterial || parseFloat(body.valor) <= 0 || parseFloat(body.quantidade) <= 0) {
                reject({ code: 400, error: { message: "emptyFields" } });
            } else {
                dbForn.getAllFornecedores().then(value2 => {

                    let existe = false;

                    value2.forEach(f => {
                        if(f.id == body.idFornecedor) existe = true;
                    });

                    if(!existe) {
                        reject({ code: 404, error: { message: "noFornecedor" } });
                    } else {
                        dbMate.getAllMateriais().then(value3 => {
                            let existe2 = false;

                            value3.forEach(m => {
                                if(m.id == body.idMaterial) existe2 = true;
                            });
        
                            if(!existe2) {
                                reject({ code: 404, error: { message: "noMaterial" } });
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
                                        reject({ code: 400, error: { message: "backendQueryError" } });
                                    });
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

async function editCompra(access_token, refresh_token, id, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "forbidden" } });
            } else if(!body.valor || !body.quantidade || !body.data || !body.idFornecedor || !body.idMaterial || parseFloat(body.valor) <= 0 || parseFloat(body.quantidade) <= 0) {
                reject({ code: 400, error: { message: "emptyFields" } });
            } else {
                dbForn.getAllFornecedores().then(value2 => {

                    let existe = false;

                    value2.forEach(f => {
                        if(f.id == body.idFornecedor) existe = true;
                    });

                    if(!existe) {
                        reject({ code: 404, error: { message: "noFornecedor" } });
                    } else {
                        dbMate.getAllMateriais().then(value3 => {
                            let existe2 = false;

                            value3.forEach(m => {
                                if(m.id == body.idMaterial) existe2 = true;
                            });
        
                            if(!existe2) {
                                reject({ code: 404, error: { message: "noMaterial" } });
                            } else {
                                dbComp.getAllCompras().then(value4 => {

                                    let existe3 = false;
                                            
                                    value4.forEach(c => {
                                        if(c.id == id) existe3 = true;
                                    })
                
                                    if (!existe3) {
                                        reject({ code: 404, error: { message: "noCompra" } });
                                    } else {
                
                                        dbComp.editCompra(body, id).then(value5 => {
                                            info.message = "Compra alterada com sucesso.";
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

async function deleteCompra(access_token, refresh_token, id) {
    return new Promise((resolve, reject) => {
        
        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "forbidden" } });
            } else {
                dbComp.getAllCompras().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(c => {
                        if(c.id == id) existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "noCompra" } });
                    } else {
                        dbComp.deleteCompra(id).then(value3 => {
                            info.message = "Compra apagada com sucesso.";
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
    getAllCompras: getAllCompras,
    createCompra: createCompra,
    editCompra: editCompra,
    deleteCompra: deleteCompra
}