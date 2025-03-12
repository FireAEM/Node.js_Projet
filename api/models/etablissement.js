const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Etablissement {
    static async getAllEtablissement() {
        const result = await pool.query('SELECT * FROM etablissement');
        return result.rows;
    }

    static async getEtablissementById(id_etablissement) {
        const result = await pool.query('SELECT * FROM etablissement WHERE id_etablissement = $1', [id_etablissement]);
        return result.rows[0]
    }

    static async createEtablissement({nom, adresse, horaires, id_type_etablissement}) {
        const result = await pool.query(
            'INSERT INTO etablissement (nom, adresse, horaires, id_type_etablissement) VALUES ($1, $2, $3, $4) RETURNING *',
            [nom, adresse, horaires, id_type_etablissement]
        )
        return result.rows[0]
    }

    static async updateEtablissement(id_etablissement, { nom, adresse, horaires, id_type_etablissement }) {
        const result = await pool.query(
            'UPDATE etablissement SET nom = $1, adresse = $2, horaires = $3, id_type_etablissement = $4 WHERE id_etablissement = $5 RETURNING *',
            [nom, adresse, horaires, id_type_etablissement, id_etablissement]
        );
        return result.rows[0];
    }

    static async deleteEtablissement(id_etablissement) {
        await pool.query(
            'DELETE FROM etablissement WHERE id_etablissement = $1',
            [id_etablissement]
        );
    }
}

module.exports = Etablissement;