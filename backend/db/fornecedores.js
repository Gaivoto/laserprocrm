const pg = require('pg');

const pool = new pg.Pool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPW,
    database: process.env.DBNAME
});
 
async function getAllFornecedores() {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        const slct = `SELECT f.id as id, f.nome as nome, f.email as email, f.estado as estado, f.nif as nif, f.morada as morada, f.contacto as contacto, p.id as idPessoa, p.nome as nomePessoa, p.email AS emailPessoa, p.contacto as contactoPessoa, p.cargo as cargoPessoa, p.estado as estadoPessoa FROM "Fornecedores" f LEFT JOIN "Pessoas" p ON f.id = p.id_fornecedor`;
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

async function createFornecedor(id, body) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO "Fornecedores" (id, nome, nif, morada, email, contacto, estado)
         VALUES ($1, $2, $3, $4, $5, $6, 'Ativo')`;
        client.query(slct, [id, body.nome, body.nif, body.morada, body.email, body.contacto], (err, res) => {
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

async function toggleFornecedor(id, estado) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        let slct = `UPDATE "Fornecedores" SET estado = $1 WHERE id = $2`;
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

async function editFornecedor(body, id) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        slct = `UPDATE "Fornecedores" SET nome = $1, nif = $2, morada = $3, email = $4, contacto = $5 WHERE id = $6`;
        client.query(slct, [body.nome, body.nif, body.morada, body.email, body.contacto, id], (err, res) => {
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
    getAllFornecedores: getAllFornecedores,
    createFornecedor: createFornecedor,
    editFornecedor: editFornecedor,
    toggleFornecedor: toggleFornecedor
}