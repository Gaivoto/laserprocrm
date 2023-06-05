const pg = require('pg');

const pool = new pg.Pool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPW,
    database: process.env.DBNAME
});

async function getAllMateriais() {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        const slct = `SELECT id, tipo, acabamento, dimensoes, liga, estado FROM "Materiais"`;
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

async function createMaterial(id, body) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO "Materiais" (id, tipo, liga, acabamento, dimensoes, estado)
         VALUES ($1, $2, $3, $4, $5, 'Ativo')`;
        client.query(slct, [id, body.tipo, body.liga, body.acabamento, body.dimensoes], (err, res) => {
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

async function toggleMaterial(id, estado) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        let slct = `UPDATE "Materiais" SET estado = $1 WHERE id = $2`;
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

async function editMaterial(body, id) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        slct = `UPDATE "Materiais" SET tipo = $1, liga = $2, acabamento = $3, dimensoes = $4 WHERE id = $5`;
        client.query(slct, [body.tipo, body.liga, body.acabamento, body.dimensoes, id], (err, res) => {
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
    getAllMateriais: getAllMateriais,
    createMaterial: createMaterial,
    editMaterial: editMaterial,
    toggleMaterial: toggleMaterial
}