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

async function getAllPessoas() {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT id, id_fornecedor, nome, contacto, email, cargo, estado FROM [Pessoas]`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createPessoa(id, body) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO Pessoas (id, id_fornecedor, nome, email, contacto, cargo, estado)
         VALUES (@id, @id_fornecedor, @nome, @email, @contacto, @cargo, 'Ativo')`;
        pool.input('id', sql.VarChar(50), id).input('id_fornecedor', sql.VarChar(50), body.idFornecedor).input('nome', sql.VarChar(200), body.nome).input('email', sql.VarChar(50), body.email).input('contacto', sql.VarChar(50), body.contacto).input('cargo', sql.VarChar(50), body.cargo).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function togglePessoa(id, estado) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        let slct = `UPDATE Pessoas SET [estado] = @estado WHERE [id] = @id`;
        pool.input('estado', sql.VarChar(50), estado).input('id', sql.VarChar(50), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function editPessoa(body, id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        slct = `UPDATE Pessoas SET [nome] = @nome, [email] = @email, [contacto] = @contacto, [cargo] = @cargo, [id_fornecedor] = @idFornecedor WHERE [id] = @id`;
        pool.input('nome', sql.VarChar(200), body.nome).input('email', sql.VarChar(50), body.email).input('contacto', sql.VarChar(50), body.contacto).input('cargo', sql.VarChar(50), body.cargo).input('idFornecedor', sql.VarChar(50), body.idFornecedor).input('id', sql.VarChar(50), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
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