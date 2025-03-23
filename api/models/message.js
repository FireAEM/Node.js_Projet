const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

class Message {
    static async getAllMessage() {
        const result = await pool.query('SELECT * FROM message');
        return result.rows;
    }

    static async getMessageById(id_message) {
        const result = await pool.query('SELECT * FROM message WHERE id_message = $1', [id_message]);
        return result.rows[0];
    }

    static async createMessage({ nom, prenom, email, message }) {
        const result = await pool.query(
            'INSERT INTO message (nom, prenom, email, message) VALUES ($1, $2, $3, $4) RETURNING *',
            [nom, prenom, email, message]
        );
        return result.rows[0];
    }

    static async updateMessage(id_message, { nom, prenom, email, message }) {
        const result = await pool.query(
            'UPDATE message SET nom = $1, prenom = $2, email = $3, message = $4 WHERE id_message = $5 RETURNING *',
            [nom, prenom, email, message, id_message]
        );
        return result.rows[0];
    }

    static async deleteMessage(id_message) {
        await pool.query(
            'DELETE FROM message WHERE id_message = $1',
            [id_message]
        );
    }
}

module.exports = Message;
