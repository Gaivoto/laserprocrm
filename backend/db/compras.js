const pg = require('pg');

const pool = new pg.Pool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPW,
    database: process.env.DBNAME
});
 
async function getAllCompras() {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        const slct = `SELECT c.id as id, c.valor as valor, c.data as data, c.quantidade as quantidade,
        f.id as idFornecedor, f.nome as nomeFornecedor, f.email as emailFornecedor, f.morada as moradaFornecedor, f.contacto as contactoFornecedor, f.nif as nifFornecedor,
        m.id as idMaterial, m.liga as ligaMaterial, m.tipo as tipoMaterial, m.subtipo as subtipoMaterial, m.dimensoes as dimensoesMaterial, m.material as materialMaterial, m.produto as produtoMaterial
        FROM "Compras" c LEFT JOIN "Fornecedores" f ON c.id_fornecedor = f.id LEFT JOIN "Materiais" m ON c.id_material = m.id`;
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

async function createCompra(id, body) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO "Compras" (id, valor, quantidade, data, id_fornecedor, id_material)
         VALUES ($1, $2, $3, $4, $5, $6)`;
        client.query(slct, [id, body.valor, body.quantidade, body.data, body.idFornecedor, body.idMaterial], (err, res) => {
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

async function editCompra(body, id) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        slct = `UPDATE "Compras" SET valor = $1, quantidade = $2, data = $3, id_fornecedor = $4, id_material = $5 WHERE id = $6`;
        client.query(slct, [body.valor, body.quantidade, body.data, body.idFornecedor, body.idMaterial, id], (err, res) => {
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

async function deleteCompra(id) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        let slct = `DELETE FROM "Compras" WHERE id = $1`;
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
    getAllCompras: getAllCompras,
    createCompra: createCompra,
    editCompra: editCompra,
    deleteCompra: deleteCompra
}