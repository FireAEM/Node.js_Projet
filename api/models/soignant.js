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

    static async createSoignant({ rpps, id_etablissement, id_utilisateur, ids_specialite }) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Insertion dans la table soignant
            const result = await client.query(
                'INSERT INTO soignant (rpps, id_etablissement, id_utilisateur) VALUES ($1, $2, $3) RETURNING *',
                [rpps, id_etablissement, id_utilisateur]
            );
            const soignant = result.rows[0];

            // Insertion dans la table de jointure pour chaque spécialité
            for (const id_specialite of ids_specialite) {
                await client.query(
                    'INSERT INTO soignant_specialite (id_soignant, id_specialite) VALUES ($1, $2)',
                    [soignant.id_soignant, id_specialite]
                );
            }
            await client.query('COMMIT');
            return soignant;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    static async updateSoignant(id_soignant, { rpps, id_etablissement, id_utilisateur, ids_specialite }) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Mise à jour des informations du soignant
            const result = await client.query(
                'UPDATE soignant SET rpps = $1, id_etablissement = $2, id_utilisateur = $3 WHERE id_soignant = $4 RETURNING *',
                [rpps, id_etablissement, id_utilisateur, id_soignant]
            );

            // Suppression des anciennes associations de spécialités
            await client.query(
                'DELETE FROM soignant_specialite WHERE id_soignant = $1',
                [id_soignant]
            );

            // Insertion des nouvelles associations
            for (const id_specialite of ids_specialite) {
                await client.query(
                    'INSERT INTO soignant_specialite (id_soignant, id_specialite) VALUES ($1, $2)',
                    [id_soignant, id_specialite]
                );
            }
            await client.query('COMMIT');
            return result.rows[0];
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    static async getSoignantsBySpecialiteId(id_specialite) {
        const result = await pool.query(
            `SELECT soignant.* 
             FROM soignant 
             JOIN soignant_specialite ON soignant.id_soignant = soignant_specialite.id_soignant 
             WHERE soignant_specialite.id_specialite = $1`,
            [id_specialite]
        );
        return result.rows;
    }

    static async getSoignantsBySpecialiteName(nom_specialite) {
        const result = await pool.query(
            `SELECT soignant.* 
             FROM soignant 
             JOIN soignant_specialite ON soignant.id_soignant = soignant_specialite.id_soignant 
             JOIN specialite ON soignant_specialite.id_specialite = specialite.id_specialite 
             WHERE specialite.nom ILIKE $1`,
            [`%${nom_specialite}%`]
        );
        return result.rows;
    }
    

    // static async createSoignant({ rpps, id_etablissement, id_utilisateur }) {
    //     const result = await pool.query(
    //         'INSERT INTO soignant (rpps, id_etablissement, id_utilisateur) VALUES ($1, $2, $3) RETURNING *',
    //         [rpps, id_etablissement, id_utilisateur]
    //     )
    //     return result.rows[0]
    // }

    // static async updateSoignant(id_soignant, {rpps, id_etablissement, id_utilisateur }) {
    //     const result = await pool.query(
    //         'UPDATE soignant SET rpps = $1, id_etablissement = $2, id_utilisateur = $3 WHERE id_soignant = $4 RETURNING *',
    //         [rpps, id_etablissement, id_utilisateur, id_soignant]
    //     );
    //     return result.rows[0];
    // }

    
}

module.exports = Soignant;