const jwt = require('jsonwebtoken');

const dbAuth = require('../db/auth.js');

async function login(username, password) {
    return new Promise((resolve, reject) => {
        if (username == "" || password == "") {
            reject({ code: 400, error: { message: 'Preencha todos os campos.' }});
        } else {
            dbAuth.authenticateUser(username, password).then(async value => {
                try {
                    if (value.length == 0) {
                        reject({ code: 401, error: { message: 'Nome de utilizador/palavra-passe errados.' } });
                    } else if (value[0].estado == "Inativo") {
                        reject({ code: 401, error: { message: 'Este utilizador está inativo.' } });
                    } else {
                        let user = { id: value[0].id, username: value[0].username, tipo: value[0].tipo };
                        let access_token = jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: '240m' });
                        let refresh_token = jwt.sign(user, process.env.REFRESH_SECRET);
                        dbAuth.createToken(refresh_token).then(value => {
                            resolve({ code: 201, info: { user: user, access_token: access_token, refresh_token: refresh_token } });
                        })
                        .catch(error => {
                            console.log(error);
                            reject({ code: 400, error: { message: 'Ocorreu um problema. Tente novamente mais tarde.' } });
                        });
                    }
                } catch {
                    reject({ code: 400, error: { message: 'Ocorreu um problema. Tente novamente mais tarde.' } });
                }
            })
            .catch(error => {
                console.log(error);
                reject({ code: 400, error: { message: 'Ocorreu um problema. Tente novamente mais tarde.' } });
            });
        }
    });
}

async function logout(refresh_token) {
    return new Promise((resolve, reject) => {
        dbAuth.deleteToken(refresh_token).then(value => {
            if (value.rowsAffected[0] == 0) {
                reject({ code: 401, error: { message: 'Sessão expirou.' } });
            } else {
                resolve({ code: 200 });
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