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
        const slct = `SELECT m.id as id, m.produto as produto, m.material as material, m.tipo as tipo, m.subtipo as subtipo, m.liga as liga, m.dimensoes as dimensoes, m.estado as estado, c.id as count FROM "Materiais" m LEFT JOIN "Compras" c ON m.id = c.id_material`;
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
        const slct = `INSERT INTO "Materiais" (id, produto, material, tipo, subtipo, liga, dimensoes, estado)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'Ativo')`;
        client.query(slct, [id, body.produto, body.material, body.tipo, body.subtipo, body.liga, body.dimensoes], (err, res) => {
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
        slct = `UPDATE "Materiais" SET produto = $1, material = $2, tipo = $3, subtipo = $4, liga = $5, dimensoes = $6 WHERE id = $7`;
        client.query(slct, [body.produto, body.material, body.tipo, body.subtipo, body.liga, body.dimensoes, id], (err, res) => {
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

async function deleteMaterial(id) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        slct = `DELETE FROM "Materiais" WHERE id = $1`;
        client.query(slct, [id], (err, res) => {
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
    toggleMaterial: toggleMaterial,
    deleteMaterial: deleteMaterial
}