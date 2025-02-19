const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Type_synthese_medicale {
    static async getAllType_synthese_medicale() {
        const result = await pool.query('SELECT * FROM type_synthese_medicale');
        return result.rows;
    }

    static async getType_synthese_medicaleById(id_type_synthese_medicale) {
        const result = await pool.query('SELECT * FROM type_synthese_medicale WHERE id_type_synthese_medicale = $1', [id_type_synthese_medicale]);
        return result.rows[0]
    }

    static async createType_synthese_medicale({ nom }) {
        const result = await pool.query(
            'INSERT INTO type_synthese_medicale (nom) VALUES ($1) RETURNING *',
            [nom]
        )
        return result.rows[0]
    }
}

module.exports = Type_synthese_medicale;