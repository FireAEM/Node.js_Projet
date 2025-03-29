import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './LoginPage.css';

import Header from '../../components/Header/Header';
import FooterSection from '../../components/FooterSection/FooterSection';
import Form from '../../components/Form/Form';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        mot_de_passe: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/utilisateur/connexion", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                email: formData.email,
                mot_de_passe: formData.mot_de_passe
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur de connexion');
            }

            const data = await response.json();
            setSuccessMessage('Connexion réussie !');
            setErrorMessage('');
            // On peut ensuite stocker le token, rediriger l'utilisateur, etc.
        } catch (error) {
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    };

    const formConfig = {
        fields: [
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
            }
        ],
        buttons: [
            {
                textContent: "Se connecter",
                type: "submit",
                class: "submitButton"
            }
        ]
    };

    return (
        <div>
            <Header />
            <main className="loginSection">
                <div className="loginContainer">
                    <h1>Connexion</h1>
                    <Form data={formConfig} onSubmit={handleSubmit} />
                    <p>Pas encore de compte ? <Link to="/register/patient/">Inscrivez-vous</Link> </p>
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                    {successMessage && <p className="successMessage">{successMessage}</p>}
                </div>
            </main>
            <FooterSection />
        </div>
    );
};

export default LoginPage;
