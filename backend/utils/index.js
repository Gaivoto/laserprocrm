const jwt = require('jsonwebtoken');
const fs = require('fs');

const dbAuth = require('../db/auth.js');

async function validateToken(access_token, refresh_token){
    return new Promise((resolve, reject) => {
        jwt.verify(access_token, process.env.ACCESS_SECRET, (error, user) => {
            if(error){
                reject(error);
                createErrorLog(error.message)
            } else {
                refreshToken({id: user.id, username: user.username, tipo: user.tipo}, refresh_token).then(value => resolve({user: {id: user.id, username: user.username, tipo: user.tipo}, access_token: value}))
                .catch(error => {
                    resolve({user: {id: user.id, username: user.username, tipo: user.tipo}});
                });
            }
        });
    });
}

async function refreshToken(user, refresh_token){
    return new Promise((resolve, reject) => {
        dbAuth.checkToken(refresh_token).then(value => {
            if(value.length == 0) {
                reject({code: 401, message: "Refresh token inválido."});
                createErrorLog("Refresh token inválido", user);
            } else {
                let access_token = jwt.sign(user, process.env.ACCESS_SECRET, {expiresIn: '120m'});
                resolve(access_token);
            }
        })
        .catch(error => {
            console.log(error);
            createErrorLog(error)
            reject({code: 400, error: { message: "Ocorreu um problema. Tente novamente mais tarde." } });
        });
    });
}

function createLog(user, action, table, id) {
    let date = String(new Date().getDate()).padStart(2, '0') + "-" + String(new Date().getMonth() + 1).padStart(2, '0') + "-" + new Date().getFullYear();
    let file = `./logs/${date}.txt`;
    let content = `[${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}] - Utilizador '${user.username}' (tipo: '${user.tipo}'; id: '${user.id}') efetuou ação do tipo '${action}'`;

    if(table) content += ` na tabela '${table}'`;

    if(id) content += ` na entrada de ID '${id}'`;
    content += `\n`;

    fs.access(file, fs.constants.W_OK, (err) => {
        if(err) {
            fs.writeFile(file, content, error => {
                if(err) console.log(error);
            });
        } else {
            fs.appendFile(file, content, error => {
                if(err) console.log(error);
            });
        }
    });
}

function createErrorLog(error, user, code) {
    let date = String(new Date().getDate()).padStart(2, '0') + "-" + String(new Date().getMonth() + 1).padStart(2, '0') + "-" + new Date().getFullYear();
    let file = `./logs/${date}-errors.txt`;
    let content = `[${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}] - ERROR`;
    
    if(code) content += `(${code})`;
    content += `: ${error}`;
    if(user) content += `; Utilizador '${user.username}' (tipo: '${user.tipo}'; id: '${user.id}')`;
    content += `\n`;

    fs.access(file, fs.constants.W_OK, (err) => {
        if(err) {
            fs.writeFile(file, content, error => {
                if(err) console.log(error);
            });
        } else {
            fs.appendFile(file, content, error => {
                if(err) console.log(error);
            });
        }
    });
}

module.exports = {
    validateToken: validateToken,
    refreshToken: refreshToken,
    createLog: createLog,
    createErrorLog: createErrorLog
}