const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Mode_de_paiement {
    static async getAllPaiement() {
        const result = await pool.query('SELECT * FROM mode_de_paiement ');
        return result.rows;
    }

    static async getPaiementById(id_mode_de_paiement) {
        const result = await pool.query('SELECT * FROM mode_de_paiement WHERE id_mode_de_paiement = $1', [id_mode_de_paiement]);
        return result.rows[0]
    }

    static async createPaiement({nom}) {
        const result = await pool.query(
            'INSERT INTO mode_de_paiement (nom) VALUES ($1) RETURNING *',
            [nom]
        )
        return result.rows[0]
    }

    static async deletePaiement(id_mode_de_paiement) {
        await pool.query(
            'DELETE FROM mode_de_paiement WHERE id_mode_de_paiement = $1',
            [id_mode_de_paiement]
        );
    }

    static async updatePaiement(id_mode_de_paiement, {nom}) {
        const result = await pool.query(
            'UPDATE mode_de_paiement SET nom = $1 WHERE id_mode_de_paiement = $2 RETURNING *',
            [nom,id_mode_de_paiement]
        );
    }
}

module.exports = Mode_de_paiement;