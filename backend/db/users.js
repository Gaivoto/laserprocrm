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

async function getAllUsers() {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT id, username, password, tipo, estado FROM [Users]`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createUser(id, body) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO Users (id, username, password, tipo, estado)
         VALUES (@id, @username, @password, 'user', 'Ativo')`;
        pool.input('id', sql.VarChar(50), id).input('username', sql.VarChar(50), body.username).input('password', sql.VarChar(100), body.password).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function toggleUser(id, estado) {
    const pool = new sql.Request();
    console.log(id, estado)
    return new Promise((resolve, reject) => {
        let slct = `UPDATE Users SET [estado] = @estado WHERE [id] = @id`;
        pool.input('estado', sql.VarChar(50), estado).input('id', sql.VarChar(50), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function editUser(body, id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        slct = `UPDATE Users SET [username] = @username, [password] = @password WHERE [id] = @id`;
        pool.input('username', sql.VarChar(50), body.username).input('password', sql.VarChar(100), body.password).input('id', sql.VarChar(50), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createAdm(id, body) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO Users (id, username, password, tipo, estado)
         VALUES (@id, @username, @password, 'adm', 'Ativo')`;
        pool.input('id', sql.VarChar(50), id).input('username', sql.VarChar(50), body.username).input('password', sql.VarChar(100), body.password).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

module.exports = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    editUser: editUser,
    toggleUser: toggleUser,
    createAdm: createAdm
}