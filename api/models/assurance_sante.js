const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Assurance_sante {
    static async getAllAssurance_sante() {
        const result = await pool.query('SELECT * FROM assurance_sante');
        return result.rows;
    }

    static async getAssurance_santeById(id_assurance_sante) {
        const result = await pool.query('SELECT * FROM assurance_sante WHERE id_assurance_sante = $1', [id_assurance_sante]);
        return result.rows[0]
    }

    static async createAssurance_sante({ nom }) {
        const result = await pool.query(
            'INSERT INTO assurance_sante (nom) VALUES ($1) RETURNING *',
            [nom]
        )
        return result.rows[0]
    }

    static async updateAssurance_sante(id_assurance_sante, { nom }) {
        const result = await pool.query(
            'UPDATE assurance_sante SET nom = $1 WHERE id_assurance_sante = $2 RETURNING *',
            [nom, id_assurance_sante]
        );
        return result.rows[0];
    }

    static async deleteAssurance_sante(id_assurance_sante) {
        await pool.query(
            'DELETE FROM assurance_sante WHERE id_assurance_sante = $1',
            [id_assurance_sante]
        );
    }
}

module.exports = Assurance_sante;