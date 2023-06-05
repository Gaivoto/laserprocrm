const pg = require('pg');

const pool = new pg.Pool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPW,
    database: process.env.DBNAME
});

async function getAllDashboards() {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        client.query('SELECT id, estado FROM "Dashboards"', (err, res) => {
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


async function toggleDashboard(id, estado) {
    const client = await pool.connect();
    return new Promise((resolve, reject) => {
        let slct = `UPDATE "Dashboards" SET estado = $1 WHERE id = $2`;
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

module.exports = {
    getAllDashboards: getAllDashboards,
    toggleDashboard: toggleDashboard
}