import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './PatientRegisterPage.css';

import Header from '../../components/Header/Header';
import Form from '../../components/Form/Form';
import FooterSection from '../../components/FooterSection/FooterSection';

const PatientRegisterPage = () => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        mot_de_passe: "",
        sexe: "",
        date_de_naissance: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const utilisateurResponse = await fetch("http://localhost:3000/utilisateur", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nom: formData.nom,
                    prenom: formData.prenom,
                    email: formData.email,
                    mot_de_passe: formData.mot_de_passe,
                    id_role: 3 // Rôle patient
                }),
            });

            if (!utilisateurResponse.ok) {
                const error = await utilisateurResponse.json();
                throw new Error(`Erreur utilisateur : ${error.message}`);
            }

            const newUser = await utilisateurResponse.json();

            const patientResponse = await fetch("http://localhost:3000/patient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sexe: formData.sexe,
                    date_de_naissance: formData.date_de_naissance,
                    id_utilisateur: newUser.newUser.id_utilisateur
                }),
            });

            if (!patientResponse.ok) {
                const error = await patientResponse.json();
                throw new Error(`Erreur patient : ${error.message}`);
            }

            setSuccessMessage("Inscription réussie ! Votre compte a été créé avec succès.");
            setFormData({ nom: "", prenom: "", email: "", mot_de_passe: "", sexe: "", date_de_naissance: "" });
        } catch (error) {
            setErrorMessage(`Une erreur s'est produite : ${error.message}`);
        }
    };

    const formConfig = {
        fields: [
            {
                id: "nom",
                label: "Nom",
                type: "text",
                value: formData.nom,
                onChange: handleChange,
                required: true
            },
            {
                id: "prenom",
                label: "Prénom",
                type: "text",
                value: formData.prenom,
                onChange: handleChange,
                required: true
            },
            {
                id: "email",
                label: "Email",
                type: "email",
                value: formData.email,
                onChange: handleChange,
                required: true
            },
            {
                id: "mot_de_passe",
                label: "Mot de passe",
                type: "password",
                value: formData.mot_de_passe,
                onChange: handleChange,
                required: true
            },
            {
                id: "sexe",
                label: "Sexe",
                type: "text",
                value: formData.sexe,
                onChange: handleChange,
                required: true
            },
            {
                id: "date_de_naissance",
                label: "Date de naissance",
                type: "date",
                value: formData.date_de_naissance,
                onChange: handleChange,
                required: true
            }
        ],
        buttons: [
            {
                textContent: "S'inscrire",
                type: "submit",
                class: "submitButton"
            }
        ]
    };

    return (
        <div>
            <Header />
            <main className='registerSection'>
                <div className="patientRegisterContainer">
                    <h1>Inscription</h1>
                    <Form data={formConfig} onSubmit={handleSubmit} />
                    <p>Vous êtes soignant ? <Link to="/register/soignant/">Inscrivez-vous</Link> </p>
                    <p>Déjà un compte ? <Link to="/login/">Connectez-vous</Link> </p>
                    {successMessage && <p className="successMessage">{successMessage}</p>}
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                </div>
            </main>
            <FooterSection />
        </div>
    );
};

export default PatientRegisterPage;
