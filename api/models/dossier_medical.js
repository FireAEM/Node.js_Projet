const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Dossier_medical {
    static async getAllDossier_medical() {
        const result = await pool.query('SELECT * FROM dossier_medical');
        return result.rows;
    }

    static async getDossier_medicalById(id_dossier_medical) {
        const result = await pool.query('SELECT * FROM dossier_medical WHERE id_dossier_medical = $1', [id_dossier_medical]);
        return result.rows[0]
    }

    static async createDossier_medical({ id_patient }) {
        const result = await pool.query(
            'INSERT INTO dossier_medical (id_patient) VALUES ($1) RETURNING *',
            [id_patient]
        )
        return result.rows[0]
    }

    static async updateDossier_medical(id_dossier_medical, {id_patient }) {
        const result = await pool.query(
            'UPDATE dossier_medical SET id_patient = $1 WHERE id_dossier_medical = $2 RETURNING *',
            [id_patient, id_dossier_medical]
        );
        return result.rows[0];
    }

    static async deleteDossier_medical(id_dossier_medical) {
        await pool.query(
            'DELETE FROM dossier_medical WHERE id_dossier_medical = $1',
            [id_dossier_medical]
        );
    }
}

module.exports = Dossier_medical;