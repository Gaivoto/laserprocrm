const jwt = require('jsonwebtoken');

const dbAuth = require('../db/auth.js');

async function validateToken(access_token, refresh_token){
    return new Promise((resolve, reject) => {
        jwt.verify(access_token, process.env.ACCESS_SECRET, (error, user) => {
            if(error){
                reject(error);
            } else {
                refreshToken({id: user.id, username: user.username, tipo: user.tipo}, refresh_token).then(value => resolve({user: {id: user.id, username: user.username, tipo: user.tipo}, access_token: value}))
                .catch(error => {
                    console.log(error);
                    resolve({user: {id: user.id, username: user.username, tipo: user.tipo}});
                });
            }
        });
    });
}

async function refreshToken(user, refresh_token){
    return new Promise((resolve, reject) => {
        dbAuth.checkToken(refresh_token).then(value => {
            if(value == 0) {
                reject({code: 401, message: "Token inválido."});
            } else {
                let access_token = jwt.sign(user, process.env.ACCESS_SECRET, {expiresIn: '240m'});
                resolve(access_token);
            }
        })
        .catch(error => {
            console.log(error);
            reject({code: 400, error: { message: "backendQueryError" } });
        });
    });
}

module.exports = {
    validateToken: validateToken,
    refreshToken: refreshToken
}