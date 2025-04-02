import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '../../../components/Form/Form';
import Button from '../../../components/Button/Button';
import { AuthContext } from '../../../context/AuthContext';


const AdminCompte = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        mot_de_passe: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/utilisateur/${user.id_utilisateur}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nom: formData.nom,
                    prenom: formData.prenom,
                    email: formData.email,
                    mot_de_passe: formData.mot_de_passe ? formData.mot_de_passe : user.mot_de_passe,
                    id_role: user.id_role
                })
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Erreur lors de la mise à jour");
            }
            setMessage("Mise à jour réussie !");
        } catch (error) {
            setMessage(`Erreur : ${error.message}`);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
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
            }
        ],
        buttons: [
            { 
                textContent: "Enregistrer les modifications", 
                type: "submit", 
                class: "submitButton" 
            }
        ]
    };

    return (
        <div className='accountPage'>
            <h1>Mon Compte - Administration</h1>
            <Form data={formConfig} onSubmit={handleSubmit} />
            <Button
                text="Se déconnecter"
                onClick={handleLogout}
            />
            {message && <p className='formMessage'>{message}</p>}
        </div>
    );
};

export default AdminCompte;
