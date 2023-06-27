const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const utils = require('../utils/index.js');
const dbAuth = require('../db/auth.js');

async function login(username, password) {
    return new Promise((resolve, reject) => {
        if (username == "" || password == "") {
            utils.createErrorLog(`Tentativa de autenticação falhada por falta de dados.`, null, 400);
            reject({ code: 400, error: { message: 'Preencha todos os campos.' }});
        } else {
            dbAuth.authenticateUser(username, password).then(async value => {
                try {
                    if (value.length == 0) {
                        utils.createErrorLog(`Tentativa de autenticação falhada para username ${username} (username não existe)`, null, 401);
                        reject({ code: 401, error: { message: 'Nome de utilizador/palavra-passe errados.' } });
                    } else if (value[0].estado == "Inativo") {
                        utils.createErrorLog(`Tentativa de autenticação falhada para user ${username} que se encontra inativo.`, null, 401);
                        reject({ code: 401, error: { message: 'Este utilizador está inativo.' } });
                    } else {
                        if (await bcrypt.compare(password, value[0].password)) {
                            let user = { id: value[0].id, username: value[0].username, tipo: value[0].tipo };
                            let access_token = jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: '120m' });
                            let refresh_token = jwt.sign(user, process.env.REFRESH_SECRET);

                            dbAuth.createToken(refresh_token).then(value2 => {
                                utils.createLog(value[0], 'Login', null, null);
                                resolve({ code: 201, info: { user: user, access_token: access_token, refresh_token: refresh_token } });
                            })
                            .catch(error => {
                                console.log(error);
                                utils.createErrorLog(error, null, 400);
                                reject({ code: 400, error: { message: 'Ocorreu um problema. Tente novamente mais tarde.' } });
                            });
                        } else {
                            utils.createErrorLog(`Tentativa de autenticação falhada para username ${username} (password errada para username)`, null, 401);
                            reject({ code: 401, error: { message: 'Nome de utilizador/palavra-passe errados.' } });
                        }
                    }
                } catch {
                    utils.createErrorLog(error, null, 400);
                    reject({ code: 400, error: { message: 'Ocorreu um problema. Tente novamente mais tarde.' } });
                }
            })
            .catch(error => {
                console.log(error, null, 400);
                reject({ code: 400, error: { message: 'Ocorreu um problema. Tente novamente mais tarde.' } });
            });
        }
    });
}

async function logout(refresh_token) {
    return new Promise((resolve, reject) => {
        dbAuth.deleteToken(refresh_token).then(value => {
            if (value.length == 0) {
                resolve({ code: 200 });
            } else {
                reject({ code: 401, error: { message: 'Sessão expirou.' } });
            }
        })
        .catch(error => {
            reject({ code: 400, error: { message: 'Ocorreu um problema. Tente novamente mais tarde.' } });
            console.log(error);
        });
    });
}

module.exports = {
    login: login,
    logout: logout
}