const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Administration {
    static async getAllAdmin() {
        const result = await pool.query('SELECT * FROM administration');
        return result.rows;
    }

    static async getAdminById(id_administration) {
        const result = await pool.query('SELECT * FROM administration WHERE id_administration = $1', [id_administration]);
        return result.rows[0]
    }

    static async getAdminByIdUtilisateur(id_utilisateur) {
        const result = await pool.query('SELECT * FROM administration WHERE id_utilisateur = $1', [id_utilisateur]);
        return result.rows[0]
    }

    static async createAdmin({id_utilisateur}) {
        const result = await pool.query(
            'INSERT INTO administration (id_utilisateur) VALUES ($1) RETURNING *',
            [id_utilisateur]
        )
        return result.rows[0]
    }
}

module.exports = Administration;