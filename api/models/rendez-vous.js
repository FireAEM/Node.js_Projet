const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Rendez_vous {
    static async getAllRendez_vous() {
        const result = await pool.query('SELECT * FROM rendez_vous');
        return result.rows;
    }

    static async getRendez_vousById(id_rendez_vous) {
        const result = await pool.query('SELECT * FROM rendez_vous WHERE id_rendez_vous = $1', [id_rendez_vous]);
        return result.rows[0]
    }

    static async getRendez_vousByIdPatient(id_patient) {
        const result = await pool.query('SELECT * FROM rendez_vous WHERE id_patient = $1', [id_patient]);
        return result.rows[0]
    }

    static async getRendez_vousByIdSoignant(id_soignant) {
        const result = await pool.query('SELECT * FROM rendez_vous WHERE id_soignant = $1', [id_soignant]);
        return result.rows[0]
    }

    static async createRendez_vous({dateheure, statut, id_soignant, id_patient}) {
        const result = await pool.query(
            'INSERT INTO rendez_vous (dateheure, statut, id_soignant, id_patient) VALUES ($1, $2, $3, $4) RETURNING *',
            [dateheure, statut, id_soignant, id_patient]
        )
        return result.rows[0]
    }

    static async updateRendez_vous(id_rendez_vous, { dateheure, statut, id_soignant, id_patient }) {
        const result = await pool.query(
            'UPDATE rendez_vous SET dateheure = $1, statut = $2, id_soignant = $3, id_patient = $4 WHERE id_rendez_vous = $5 RETURNING *',
            [dateheure, statut, id_soignant, id_patient, id_rendez_vous]
        );
        return result.rows[0];
    }

    static async deleteRendez_vous(id_rendez_vous) {
        await pool.query(
            'DELETE FROM rendez_vous WHERE id_rendez_vous = $1',
            [id_rendez_vous]
        );
    }
}

module.exports = Rendez_vous;