import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '../../../components/Form/Form';
import SelectField from '../../../components/SelectField/SelectField';
import Button from '../../../components/Button/Button';
import { AuthContext } from '../../../context/AuthContext';


const PatientCompte = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [patientData, setPatientData] = useState({
        id_patient: "",
        sexe: "",
        date_de_naissance: ""
    });
    const [formData, setFormData] = useState({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        mot_de_passe: '',
        sexe: '',
        date_de_naissance: ''
    });
    const [message, setMessage] = useState('');

    const formatDate = (isoDate) => {
        return isoDate.split("T")[0];
    };

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/patient/utilisateur/${user.id_utilisateur}`);
                if (res.ok) {
                    const data = await res.json();
                    setPatientData(data);
                    // Initialiser les champs spécifiques avec les données récupérées
                    setFormData(prev => ({
                        ...prev,
                        sexe: data.sexe || "",
                        date_de_naissance: formatDate(data.date_de_naissance) || ""
                    }));
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du patient :", error);
            }
        };
        fetchPatientData();
    }, [user.id_utilisateur]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resUser = await fetch(`http://localhost:3000/utilisateur/${user.id_utilisateur}`, {
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
            if (!resUser.ok) {
                const err = await resUser.json();
                throw new Error(err.message || "Erreur lors de la mise à jour de l'utilisateur");
            }
        
            const resPatient = await fetch(`http://localhost:3000/patient/${patientData.id_patient}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sexe: formData.sexe,
                    date_de_naissance: formData.date_de_naissance
                })
            });
            if (!resPatient.ok) {
                const err = await resPatient.json();
                throw new Error(err.message || "Erreur lors de la mise à jour du patient");
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
            },
            { 
                id: "sexe", 
                label: "Sexe", 
                component: "select",
                value: formData.sexe, 
                onChange: handleChange, 
                required: true,
                options: [
                    { id: "Masculin", nom: "Masculin" },
                    { id: "Feminin", nom: "Féminin" }
                ]
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
                textContent: "Enregistrer les modifications", 
                type: "submit", 
                class: "submitButton" 
            }
        ]
    };

    return (
        <div>
            <h2>Mon Compte - Patient</h2>
            <Form data={formConfig} onSubmit={handleSubmit} />
            <Button
                text="Se déconnecter"
                onClick={handleLogout}
            />
            {message && <p>{message}</p>}
        </div>
    );
};

export default PatientCompte;
