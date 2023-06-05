const pg = require('pg');

const pool = new pg.Pool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPW,
    database: process.env.DBNAME
});

async function getAllPessoas() {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        const slct = `SELECT id, id_fornecedor, nome, contacto, email, cargo, estado FROM "Pessoas"`;
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

async function createPessoa(id, body) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO "Pessoas" (id, id_fornecedor, nome, email, contacto, cargo, estado)
         VALUES ($1, $2, $3, $4, $5, $6, 'Ativo')`;
        client.query(slct, [id, body.idFornecedor, body.nome, body.email, body.contacto, body.cargo], (err, res) => {
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

async function togglePessoa(id, estado) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        let slct = `UPDATE "Pessoas" SET estado = $1 WHERE id = $2`;
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

async function editPessoa(body, id) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        slct = `UPDATE "Pessoas" SET nome = $1, email = $2, contacto = $3, cargo = $4, id_fornecedor = $5 WHERE id = $6`;
        client.query(slct, [body.nome, body.email, body.contacto, body.cargo, body.idFornecedor, id], (err, res) => {
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
    getAllPessoas: getAllPessoas,
    createPessoa: createPessoa,
    editPessoa: editPessoa,
    togglePessoa: togglePessoa
}