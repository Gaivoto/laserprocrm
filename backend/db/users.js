const pg = require('pg');

const pool = new pg.Pool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPW,
    database: process.env.DBNAME
});

async function getAllUsers() {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        const slct = `SELECT id, username, tipo, estado FROM "Users"`;
        client.query(slct, (err, res) => {
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

async function createUser(id, body) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO "Users" (id, username, password, tipo, estado)
         VALUES ($1, $2, $3, 'user', 'Ativo')`;
        client.query(slct, [id, body.username, body.password], (err, res) => {
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

async function toggleUser(id, estado) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        let slct = `UPDATE "Users" SET estado = $1 WHERE id = $2`;
        client.query(slct, [estado, id], (err, res) => {
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

async function editUser(body, id) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        slct = `UPDATE "Users" SET username = $1 WHERE id = $2`;
        client.query(slct, [body.username, id], (err, res) => {
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

async function editUserPass(body, id) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        slct = `UPDATE "Users" SET username = $1, password = $2 WHERE id = $3`;
        client.query(slct, [body.username, body.password, id], (err, res) => {
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

async function createAdm(id, body) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO "Users" (id, username, password, tipo, estado)
         VALUES ($1, $2, $3, 'adm', 'Ativo')`;
        client.query(slct, [id, body.username, body.password], (err, res) => {
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
    getAllUsers: getAllUsers,
    createUser: createUser,
    editUser: editUser,
    editUserPass: editUserPass,
    toggleUser: toggleUser,
    createAdm: createAdm
}