import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './LoginPage.css';

import Header from '../../components/Header/Header';
import FooterSection from '../../components/FooterSection/FooterSection';
import Form from '../../components/Form/Form';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        mot_de_passe: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            let userType = "";
            switch (user.id_role) {
                case 1:
                    userType = "administration";
                    break;
                case 2:
                    userType = "soignant";
                    break;
                case 3:
                    userType = "patient";
                    break;
                default:
                    userType = "patient";
            }
            navigate(`/dashboard/${userType}`);
        }
    }, [user, navigate]);
    
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
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur de connexion");
            }
            const data = await response.json();
            login(data.utilisateur);
            let userType = "";
            switch (data.utilisateur.id_role) {
                case 1:
                    userType = "administration";
                    break;
                case 2:
                    userType = "soignant";
                    break;
                case 3:
                    userType = "patient";
                    break;
                default:
                    userType = "patient";
            }
            navigate(`/dashboard/${userType}`);
        } catch (error) {
            setErrorMessage(error.message);
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
                    <p>Pas encore de compte ? <Link to="/register/patient">Inscrivez-vous</Link></p>
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                </div>
            </main>
            <FooterSection />
        </div>
    );
};

export default LoginPage;
