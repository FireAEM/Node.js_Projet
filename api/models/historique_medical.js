const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Historique_medicale {
    static async getAllHistorique_medicale() {
        const result = await pool.query('SELECT * FROM historique_medicale');
        return result.rows;
    }

    static async getHistorique_medicaleById(id_historique_medicale) {
        const result = await pool.query('SELECT * FROM historique_medicale WHERE id_historique_medicale = $1', [id_historique_medicale]);
        return result.rows[0]
    }

    static async getHistorique_medicaleByIdDossier_medical(id_dossier_medical) {
        const result = await pool.query('SELECT * FROM historique_medicale WHERE id_dossier_medical = $1', [id_dossier_medical]);
        return result.rows[0]
    }

    static async createHistorique_medicale({ titre, date_historique, description, id_soignant, id_dossier_medical}) {
        const result = await pool.query(
            'INSERT INTO historique_medicale ( titre, date_historique, description, id_soignant, id_dossier_medical) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [ titre, date_historique, description, id_soignant, id_dossier_medical]
        )
        return result.rows[0]
    }

    static async updateHistorique_medicale(id_historique_medicale, {  titre, date_historique, description, id_soignant, id_dossier_medical }) {
        const result = await pool.query(
            'UPDATE historique_medicale SET  titre = $1, date_historique = $2, description = $3, id_soignant = $4, id_dossier_medical = $5 WHERE id_historique_medicale = $6 RETURNING *',
            [ titre, date_historique, description, id_soignant, id_dossier_medical, id_historique_medicale]
        );
        return result.rows[0];
    }

    static async deleteHistorique_medicale(id_historique_medicale) {
        await pool.query(
            'DELETE FROM historique_medicale WHERE id_historique_medicale = $1',
            [id_historique_medicale]
        );
    }
}

module.exports = Historique_medicale;