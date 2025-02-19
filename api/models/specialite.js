const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Specialite {
    static async getAllSpecialite() {
        const result = await pool.query('SELECT * FROM specialite');
        return result.rows;
    }

    static async getSpecialiteById(id_specialite) {
        const result = await pool.query('SELECT * FROM specialite WHERE id_specialite = $1', [id_specialite]);
        return result.rows[0]
    }

    static async createSpecialite({nom}) {
        const result = await pool.query(
            'INSERT INTO specialite (nom) VALUES ($1) RETURNING *',
            [nom]
        )
        return result.rows[0]
    }

    static async updateSpecialite(id_specialite, { nom }) {
        const result = await pool.query(
            'UPDATE specialite SET nom = $1 WHERE id_specialite = $2 RETURNING *',
            [nom, id_specialite]
        );
        return result.rows[0];
    }

    static async deleteSpecialite(id_specialite) {
        await pool.query(
            'DELETE FROM specialite WHERE id_specialite = $1',
            [id_specialite]
        );
    }
}

module.exports = Specialite;