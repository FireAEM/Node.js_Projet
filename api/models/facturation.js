const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Facturation {
    static async getAllFacturation() {
        const result = await pool.query('SELECT * FROM facturation');
        return result.rows;
    }

    static async getFacturationById(id_facturation) {
        const result = await pool.query('SELECT * FROM facturation WHERE id_facturation = $1', [id_facturation]);
        return result.rows[0]
    }

    static async getFacturationByIdRendez_vous(id_rendez_vous) {
        const result = await pool.query('SELECT * FROM facturation WHERE id_rendez_vous = $1', [id_rendez_vous]);
        return result.rows[0]
    }

    static async createFacturation({montant, id_mode_de_paiement, id_rendez_vous, id_assurance_sante}) {
        const result = await pool.query(
            'INSERT INTO facturation (montant, id_mode_de_paiement, id_rendez_vous, id_assurance_sante) VALUES ($1, $2, $3, $4) RETURNING *',
            [montant, id_mode_de_paiement, id_rendez_vous, id_assurance_sante]
        )
        return result.rows[0]
    }

    static async updateFacturation(id_facturation, { montant, id_mode_de_paiement, id_rendez_vous, id_assurance_sante }) {
        const result = await pool.query(
            'UPDATE facturation SET montant = $1, id_mode_de_paiement = $2, id_rendez_vous = $3, id_assurance_sante = $4 WHERE id_facturation = $5 RETURNING *',
            [montant, id_mode_de_paiement, id_rendez_vous, id_assurance_sante, id_facturation]
        );
        return result.rows[0];
    }

    static async deleteFacturation(id_facturation) {
        await pool.query(
            'DELETE FROM facturation WHERE id_facturation = $1',
            [id_facturation]
        );
    }
}

module.exports = Facturation;