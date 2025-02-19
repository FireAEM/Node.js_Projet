const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

class Patient {
    static async getAllPatient() {
        const result = await pool.query('SELECT * FROM patient');
        return result.rows;
    }

    static async getPatientById(id_patient) {
        const result = await pool.query('SELECT * FROM patient WHERE id_patient = $1', [id_patient]);
        return result.rows[0]
    }

    static async createPatient({sexe, date_de_naissance}) {
        const result = await pool.query(
            'INSERT INTO patient (sexe, date_de_naissance) VALUES ($1, $2) RETURNING *',
            [sexe, date_de_naissance]
        )
        return result.rows[0]
    }

    static async updatePatient(id_patient, {sexe, date_de_naissance}) {
        const result = await pool.query(
            'UPDATE patient SET sexe = $1, date_de_naissance = $2 WHERE id_patient = $3 RETURNING *',
            [sexe, date_de_naissance]
        );
    }
}

module.exports = Patient;