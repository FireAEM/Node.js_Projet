const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Type_etablissement {
    static async getAllType_etablissement() {
        const result = await pool.query('SELECT * FROM type_etablissement');
        return result.rows;
    }

    static async getType_etablissementById(id_type_etablissement) {
        const result = await pool.query('SELECT * FROM type_etablissement WHERE id_type_etablissement = $1', [id_type_etablissement]);
        return result.rows[0]
    }

    static async createType_etablissement({nom}) {
        const result = await pool.query(
            'INSERT INTO type_etablissement (nom) VALUES ($1) RETURNING *',
            [nom]
        )
        return result.rows[0]
    }

    static async updateType_etablissement(id_type_etablissement, { nom }) {
        const result = await pool.query(
            'UPDATE type_etablissement SET nom = $1 WHERE id_type_etablissement = $2 RETURNING *',
            [nom, id_type_etablissement]
        );
        return result.rows[0];
    }

    static async deleteType_etablissement(id_type_etablissement) {
        await pool.query(
            'DELETE FROM type_etablissement WHERE id_type_etablissement = $1',
            [id_type_etablissement]
        );
    }
}

module.exports = Type_etablissement;