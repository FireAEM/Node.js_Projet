const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Utilisateur {
    static async getAllUser() {
        const result = await pool.query('SELECT * FROM utilisateur');
        return result.rows;
    }

    static async getUserById(id_utilisateur) {
        const result = await pool.query('SELECT * FROM utilisateur WHERE id_utilisateur = $1', [id_utilisateur]);
        return result.rows[0]
    }

    static async getUserByEmail(email) {
        const result = await pool.query('SELECT * FROM utilisateur WHERE email = $1', [email]);
        return result.rows[0]
    }

    static async getUserRoleById(id_utilisateur) {
        const result = await pool.query(
            `SELECT role.nom AS nom_du_role FROM utilisateur JOIN role ON utilisateur.id_role = role.id_role WHERE utilisateur.id_utilisateur = $1`, [id_utilisateur]);
        return result.rows[0]?.nom_du_role;
    }

    static async createUser({ nom, prenom, email, mot_de_passe, id_role }) {
        const result = await pool.query(
            'INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, id_role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nom, prenom, email, mot_de_passe, id_role]
        );
        return result.rows[0];
    }

    static async updateUser(id_utilisateur, { nom, prenom, email, mot_de_passe, id_role }) {
        const result = await pool.query(
            'UPDATE utilisateur SET nom = $1, prenom = $2, email = $3, mot_de_passe = $4, id_role = $5 WHERE id_utilisateur = $6 RETURNING *',
            [nom, prenom, email, mot_de_passe, id_role, id_utilisateur]
        );
    }

    static async deleteUser(id_utilisateur) {
        await pool.query(
            'DELETE FROM utilisateur WHERE id_utilisateur = $1',
            [id_utilisateur]
        );
    }
}

module.exports = Utilisateur;