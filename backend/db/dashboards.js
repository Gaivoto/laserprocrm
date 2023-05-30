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

async function getAllDashboards() {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT id, estado FROM [Dashboards]`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function toggleDashboard(id, estado) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        let slct = `UPDATE Dashboards SET [estado] = @estado WHERE [id] = @id`;
        pool.input('estado', sql.VarChar(50), estado).input('id', sql.VarChar(50), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

module.exports = {
    getAllDashboards: getAllDashboards,
    toggleDashboard: toggleDashboard
}