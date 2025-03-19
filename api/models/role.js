const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Role {
    static async getAllRole() {
        const result = await pool.query('SELECT * FROM role');
        return result.rows;
    }

    static async getRoleById(id_role) {
        const result = await pool.query('SELECT * FROM role WHERE id_role = $1', [id_role]);
        return result.rows[0]
    }

    static async createRole({nom}) {
        const result = await pool.query(
            'INSERT INTO role (nom) VALUES ($1) RETURNING *',
            [nom]
        )
        return result.rows[0]
    }

    static async updateRole(id_role, { nom }) {
        const result = await pool.query(
            'UPDATE role SET nom = $1 WHERE id_role = $2 RETURNING *',
            [nom, id_role]
        );
        return result.rows[0];
    }

    static async deleteRole(id_role) {
        await pool.query(
            'DELETE FROM role WHERE id_role = $1',
            [id_role]
        );
    }
}

module.exports = Role;