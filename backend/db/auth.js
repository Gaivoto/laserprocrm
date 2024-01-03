const pg = require('pg');

const pool = new pg.Pool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPW,
    database: process.env.DBNAME
});
 
async function authenticateUser(username) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM "Users" WHERE username = $1`, [username], (err, res) => {
            if(!err) {
                client.release();
                resolve(res.rows);
            } else {
                client.release();
                reject(err.message);
            }
        });
    });
}

async function createToken(token) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO "Tokens" (token) VALUES ($1)`, [token], (err, res) => {
            if (!err) {
                client.release();
                resolve(res.rows);
            } else {
                client.release();
                reject(err.message);
            }
        });
    });
}

async function checkToken(token) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM "Tokens" WHERE token = $1', [token], (err, res) => {
            if(!err) {
                client.release();
                resolve(res.rows);
            } else {
                client.release();
                reject(err.message);
            }
        });
    });
}

async function deleteToken(token) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM "Tokens" WHERE token = $1', [token], (err, res) => {
            if(!err) {
                client.release();
                resolve(res.rows);
            } else {
                client.release();
                reject(err.message);
            }
        });
    });
}

module.exports = {
    authenticateUser: authenticateUser,
    createToken: createToken,
    checkToken: checkToken,
    deleteToken: deleteToken
}