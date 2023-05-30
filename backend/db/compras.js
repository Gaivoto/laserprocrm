const sql = require("mssql");

const config = {
    user: process.env.DBUSER,
    password: process.env.DBPW,
    server: process.env.DBHOST,
    database: process.env.DBNAME,
    trustServerCertificate: true,
    encrypt: true
};

sql.connect(config, function (err) {
    if (err) throw err;
});

async function getAllCompras() {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT c.id as id, c.valor as valor, c.data as data, c.quantidade as quantidade,
        f.id as idFornecedor, f.nome as nomeFornecedor, f.email as emailFornecedor, f.morada as moradaFornecedor, f.contacto as contactoFornecedor, f.nif as nifFornecedor,
        m.id as idMaterial, m.liga as ligaMaterial, m.tipo as tipoMaterial, m.acabamento as acabamentoMaterial, m.dimensoes as dimensoesMaterial
        FROM [Compras] c LEFT JOIN [Fornecedores] f ON c.id_fornecedor = f.id LEFT JOIN [Materiais] m ON c.id_material = m.id`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createCompra(id, body) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO Compras (id, valor, quantidade, data, id_fornecedor, id_material)
         VALUES (@id, @valor, @quantidade, @data, @idFornecedor, @idMaterial)`;
        pool.input('id', sql.VarChar(50), id).input('valor', sql.VarChar(50), body.valor).input('quantidade', sql.VarChar(50), body.quantidade).input('data', sql.VarChar(50), body.data).input('idFornecedor', sql.VarChar(50), body.idFornecedor).input('idMaterial', sql.VarChar(50), body.idMaterial).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function editCompra(body, id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        slct = `UPDATE Compras SET [valor] = @valor, [quantidade] = @quantidade, [data] = @data, [id_fornecedor] = @idFornecedor, [id_material] = @idMaterial WHERE [id] = @id`;
        pool.input('valor', sql.VarChar(50), body.valor).input('quantidade', sql.VarChar(50), body.quantidade).input('data', sql.VarChar(50), body.data).input('idFornecedor', sql.VarChar(50), body.idFornecedor).input('idMaterial', sql.VarChar(50), body.idMaterial).input('id', sql.VarChar(50), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function deleteCompra(id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        let slct = `DELETE Compras WHERE [id] = @id`;
        pool.input('id', sql.VarChar(50), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
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