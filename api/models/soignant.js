const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Soignant {
    static async getAllSoignant() {
        const result = await pool.query('SELECT * FROM soignant');
        return result.rows;
    }

    static async getSoignantById(id_soignant) {
        const result = await pool.query('SELECT * FROM soignant WHERE id_soignant = $1', [id_soignant]);
        return result.rows[0]
    }

    static async getSoignantByIdUtilisateur(id_utilisateur) {
        const result = await pool.query('SELECT * FROM soignant WHERE id_utilisateur = $1', [id_utilisateur]);
        return result.rows[0]
    }

    static async createSoignant({ rpps, id_etablissement, id_utilisateur }) {
        const result = await pool.query(
            'INSERT INTO soignant (rpps, id_etablissement, id_utilisateur) VALUES ($1, $2, $3) RETURNING *',
            [rpps, id_etablissement, id_utilisateur]
        )
        return result.rows[0]
    }

    static async updateSoignant(id_soignant, {rpps, id_etablissement, id_utilisateur }) {
        const result = await pool.query(
            'UPDATE soignant SET rpps = $1, id_etablissement = $2, id_utilisateur = $3 WHERE id_soignant = $4 RETURNING *',
            [rpps, id_etablissement, id_utilisateur, id_soignant]
        );
        return result.rows[0];
    }

    
}

module.exports = Soignant;