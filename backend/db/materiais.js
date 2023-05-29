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

async function getAllMateriais() {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT id, tipo, acabamento, dimensoes, liga, estado FROM [Materiais]`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createMaterial(id, body) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO Materiais (id, tipo, liga, acabamento, dimensoes, estado)
         VALUES (@id, @tipo, @liga, @acabamento, @dimensoes, 'Ativo')`;
        pool.input('id', sql.VarChar(50), id).input('tipo', sql.VarChar(50), body.tipo).input('liga', sql.VarChar(50), body.liga).input('acabamento', sql.VarChar(50), body.acabamento).input('dimensoes', sql.VarChar(50), body.dimensoes).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function toggleMaterial(id, estado) {
    const pool = new sql.Request();
    console.log(id, estado)
    return new Promise((resolve, reject) => {
        let slct = `UPDATE Materiais SET [estado] = @estado WHERE [id] = @id`;
        pool.input('estado', sql.VarChar(50), estado).input('id', sql.VarChar(50), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function editMaterial(body, id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        slct = `UPDATE Materiais SET [tipo] = @tipo, [liga] = @liga, [acabamento] = @acabamento, [dimensoes] = @dimensoes WHERE [id] = @id`;
        pool.input('tipo', sql.VarChar(50), body.tipo).input('liga', sql.VarChar(50), body.liga).input('acabamento', sql.VarChar(50), body.acabamento).input('dimensoes', sql.VarChar(50), body.dimensoes).input('id', sql.VarChar(50), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
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