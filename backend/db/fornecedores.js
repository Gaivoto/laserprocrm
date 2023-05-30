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

async function getAllFornecedores() {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT f.id as id, f.nome as nome, f.email as email, f.estado as estado, f.nif as nif, f.morada as morada, f.contacto as contacto, p.id as idPessoa, p.nome as nomePessoa, p.email AS emailPessoa, p.contacto as contactoPessoa, p.cargo as cargoPessoa FROM [Fornecedores] f LEFT JOIN [Pessoas] p ON f.id = p.id_fornecedor`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createFornecedor(id, body) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO Fornecedores (id, nome, nif, morada, email, contacto, estado)
         VALUES (@id, @nome, @nif, @morada, @email, @contacto, 'Ativo')`;
        pool.input('id', sql.VarChar(50), id).input('nome', sql.VarChar(50), body.nome).input('nif', sql.VarChar(50), body.nif).input('morada', sql.VarChar(200), body.morada).input('email', sql.VarChar(50), body.email).input('contacto', sql.VarChar(50), body.contacto).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function toggleFornecedor(id, estado) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        let slct = `UPDATE Fornecedores SET [estado] = @estado WHERE [id] = @id`;
        pool.input('estado', sql.VarChar(50), estado).input('id', sql.VarChar(50), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function editFornecedor(body, id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        slct = `UPDATE Fornecedores SET [nome] = @nome, [nif] = @nif, [morada] = @morada, [email] = @email, [contacto] = @contacto WHERE [id] = @id`;
        pool.input('nome', sql.VarChar(50), body.nome).input('nif', sql.VarChar(50), body.nif).input('morada', sql.VarChar(200), body.morada).input('email', sql.VarChar(50), body.email).input('contacto', sql.VarChar(50), body.contacto).input('id', sql.VarChar(50), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
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