const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Synthese_medicale {
    static async getAllSynthese_medicale() {
        const result = await pool.query('SELECT * FROM synthese_medicale');
        return result.rows;
    }

    static async getSynthese_medicaleById(id_synthese_medicale) {
        const result = await pool.query('SELECT * FROM synthese_medicale WHERE id_synthese_medicale = $1', [id_synthese_medicale]);
        return result.rows[0]
    }

    static async getSynthese_medicaleByIdType_synthese_medicale(id_type_synthese_medicale) {
        const result = await pool.query('SELECT * FROM synthese_medicale WHERE id_type_synthese_medicale = $1', [id_type_synthese_medicale]);
        return result.rows[0]
    }

    static async getSynthese_medicaleByIdDossier_medical(id_dossier_medical) {
        const result = await pool.query('SELECT * FROM synthese_medicale WHERE id_dossier_medical = $1', [id_dossier_medical]);
        return result.rows[0]
    }

    static async createSynthese_medicale({ titre, id_type_synthese_medicale, description, id_soignant, id_dossier_medical}) {
        const result = await pool.query(
            'INSERT INTO synthese_medicale ( titre, id_type_synthese_medicale, description, id_soignant, id_dossier_medical) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [ titre, id_type_synthese_medicale, description, id_soignant, id_dossier_medical]
        )
        return result.rows[0]
    }

    static async updateSynthese_medicale(id_synthese_medicale, {  titre, id_type_synthese_medicale, description, id_soignant, id_dossier_medical }) {
        const result = await pool.query(
            'UPDATE synthese_medicale SET  titre = $1, id_type_synthese_medicale = $2, description = $3, id_soignant = $4, id_dossier_medical = $5 WHERE id_synthese_medicale = $6 RETURNING *',
            [ titre, id_type_synthese_medicale, description, id_soignant, id_dossier_medical, id_synthese_medicale]
        );
        return result.rows[0];
    }

    static async deleteSynthese_medicale(id_synthese_medicale) {
        await pool.query(
            'DELETE FROM synthese_medicale WHERE id_synthese_medicale = $1',
            [id_synthese_medicale]
        );
    }
}

module.exports = Synthese_medicale;