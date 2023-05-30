const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbUser = require('../db/users.js');

async function getAllUsers(access_token, refresh_token) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;
            let users = [];

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "forbidden" } });
            } else {
                dbUser.getAllUsers().then(value2 => {

                    value2.forEach(u => {
                        users.push({ id: u.id, tipo: u.tipo, username: u.username, password: u.password, estado: u.estado });
                    });
    
                    info.users = users;
    
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
            reject({ code: 401, error: { message: "invalidToken" } });
        });
    });
}

async function createUser(access_token, refresh_token, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value1 => {
            let info = value1;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "forbidden" } });
            } else if(!body.username || !body.password) {
                reject({ code: 400, error: { message: "emptyFields" } });
            } else {
                dbUser.getAllUsers().then(value2 => {
                    
                    let existe = false;

                    value2.forEach(u => {
                        if(u.username == body.username) existe = true;
                    });

                    if (existe) {
                        reject({ code: 400, error: { message: "fieldTaken" } });
                    } else {

                        var existe2 = false;

                        do {
                            existe2 = false;
                            id = uuid.v4();

                            value2.forEach(u => {
                                if (u.id == id) existe2 = true;
                            });
                        } while (existe2)

                        dbUser.createUser(id, body).then(value => {
                            info.message = "Utilizador criado com sucesso.";
                            resolve({ code: 201, info: info });
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

async function toggleUser(access_token, refresh_token, id, estado) {
    return new Promise((resolve, reject) => {
        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;
            
            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "forbidden" } });
            } else if(estado != 'Ativo' && estado != 'Inativo') {
                reject({ code: 400, error: { message: "invalidState" } });
            } else {
                dbUser.getAllUsers().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(u => {
                        if(u.id == id && u.tipo == 'user') existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "noUser" } });
                    } else {
                        dbUser.toggleUser(id, estado).then(value3 => {
                            info.message = "Utilizador alterado com sucesso.";
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

async function editUser(access_token, refresh_token, id, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo == "user") {
                reject({ code: 403, error: { message: "forbidden" } });
            } else if(!body.username || !body.password) {
                reject({ code: 400, error: { message: "emptyFields" } });
            } else {

                dbUser.getAllUsers().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(u => {
                        if(u.id == id && u.tipo == 'user') existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "noUser" } });
                    } else {

                        let existe2 = false;

                        value2.forEach(u => {
                            if(u.id != id && u.username == body.username) existe2 = true;
                        });

                        if(existe2) {
                            reject({ code: 400, error: { message: "fieldTaken" } });
                        } else {
                            dbUser.editUser(body, id).then(value3 => {
                                info.message = "Utilizador alterado com sucesso.";
                                resolve({ code: 200, info: info });
                            })
                            .catch(error => {
                                console.log(error);
                                reject({ code: 400, error: { message: "backendQueryError" } });
                            });
                        }
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

async function createAdm(access_token, refresh_token, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value1 => {
            let info = value1;

            if(info.user.tipo != "superadm") {
                reject({ code: 403, error: { message: "forbidden" } });
            } else if(!body.username || !body.password) {
                reject({ code: 400, error: { message: "emptyFields" } });
            } else {
                dbUser.getAllUsers().then(value2 => {
                    
                    let existe = false;

                    value2.forEach(u => {
                        if(u.username == body.username) existe = true;
                    });

                    if (existe) {
                        reject({ code: 400, error: { message: "fieldTaken" } });
                    } else {

                        var existe2 = false;

                        do {
                            existe2 = false;
                            id = uuid.v4();

                            value2.forEach(u => {
                                if (u.id == id) existe2 = true;
                            });
                        } while (existe2)

                        dbUser.createAdm(id, body).then(value => {
                            info.message = "Administrador criado com sucesso.";
                            resolve({ code: 201, info: info });
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

async function toggleAdm(access_token, refresh_token, id, estado) {
    return new Promise((resolve, reject) => {
        
        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;
            
            if(info.user.tipo != "superadm") {
                reject({ code: 403, error: { message: "forbidden" } });
            } else if(estado != 'Ativo' && estado != 'Inativo') {
                reject({ code: 400, error: { message: "invalidState" } });
            } else {
                dbUser.getAllUsers().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(u => {
                        if(u.id == id && u.tipo == 'adm') existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "noUser" } });
                    } else {
                        dbUser.toggleUser(id, estado).then(value3 => {
                            info.message = "Utilizador alterado com sucesso.";
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

async function editAdm(access_token, refresh_token, id, body) {
    return new Promise((resolve, reject) => {

        if(access_token) access_token = access_token.split(" ")[1];

        utils.validateToken(access_token, refresh_token).then(value => {
            let info = value;

            if(info.user.tipo != "superadm") {
                reject({ code: 403, error: { message: "forbidden" } });
            } else if(!body.username || !body.password) {
                reject({ code: 400, error: { message: "emptyFields" } });
            } else {

                dbUser.getAllUsers().then(value2 => {

                    let existe = false;
                            
                    value2.forEach(u => {
                        if(u.id == id && u.tipo == 'adm') existe = true;
                    })

                    if (!existe) {
                        reject({ code: 404, error: { message: "noUser" } });
                    } else {

                        let existe2 = false;

                        value2.forEach(u => {
                            if(u.id != id && u.username == body.username) existe2 = true;
                        });

                        if(existe2) {
                            reject({ code: 400, error: { message: "fieldTaken" } });
                        } else {
                            dbUser.editUser(body, id).then(value3 => {
                                info.message = "Utilizador alterado com sucesso.";
                                resolve({ code: 200, info: info });
                            })
                            .catch(error => {
                                console.log(error);
                                reject({ code: 400, error: { message: "backendQueryError" } });
                            });
                        }
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
    getAllUsers: getAllUsers,
    createUser: createUser,
    editUser: editUser,
    toggleUser: toggleUser,
    createAdm: createAdm,
    editAdm: editAdm,
    toggleAdm: toggleAdm
}