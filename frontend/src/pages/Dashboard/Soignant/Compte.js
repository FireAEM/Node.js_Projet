import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '../../../components/Form/Form';
import Button from '../../../components/Button/Button';
import { AuthContext } from '../../../context/AuthContext';


const SoignantCompte = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [soignantData, setSoignantData] = useState({
        id_soignant: "",
        rpps: "",
        id_etablissement: "",
        ids_specialite: []
    });
    const [etablissements, setEtablissements] = useState([]);
    const [specialites, setSpecialites] = useState([]);

    const [formData, setFormData] = useState({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        mot_de_passe: "",
        rpps: "",
        id_etablissement: "",
        ids_specialite: []
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchSoignantData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/soignant/utilisateur/${user.id_utilisateur}`);
                if (res.ok) {
                    const data = await res.json();
                    setSoignantData(data);
                    setFormData(prev => ({
                        ...prev,
                        rpps: data.rpps || "",
                        id_etablissement: data.id_etablissement || "",
                        ids_specialite: data.ids_specialite || []
                    }));
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du soignant :", error);
            }
        };

        const fetchEtablissements = async () => {
            try {
                const res = await fetch("http://localhost:3000/etablissement");
                const data = await res.json();
                const etabOptions = data.map(etab => ({
                    id: etab.id_etablissement,
                    nom: `${etab.nom} - ${etab.adresse}`
                }));
                setEtablissements(etabOptions);
            } catch (error) {
                console.error("Erreur chargement établissements :", error);
            }
        };
        
        const fetchSpecialites = async () => {
            try {
                const res = await fetch("http://localhost:3000/specialite");
                const data = await res.json();
                const specOptions = data.map(spec => ({
                    id: spec.id_specialite,
                    nom: spec.nom
                }));
                setSpecialites(specOptions);
            } catch (error) {
                console.error("Erreur chargement spécialités :", error);
            }
        };
    
        fetchSoignantData();
        fetchEtablissements();
        fetchSpecialites();
    }, [user.id_utilisateur]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "ids_specialite") {
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
            setFormData(prev => ({ ...prev, [name]: selectedOptions }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
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

            const resSoignant = await fetch(`http://localhost:3000/soignant/${soignantData.id_soignant}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rpps: parseInt(formData.rpps),
                    id_etablissement: parseInt(formData.id_etablissement),
                    id_utilisateur: user.id_utilisateur,
                    // Conversion en nombres pour chaque spécialité
                    ids_specialite: formData.ids_specialite.map(id => parseInt(id))
                })
            });
            if (!resSoignant.ok) {
                const err = await resSoignant.json();
                throw new Error(err.message || "Erreur lors de la mise à jour du soignant");
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
                id: "rpps", 
                label: "RPPS", 
                type: "number", 
                value: formData.rpps, 
                onChange: handleChange, 
                required: true 
            },
            {
                id: "id_etablissement",
                label: "Établissement",
                component: "select",
                options: etablissements,
                value: formData.id_etablissement,
                onChange: handleChange,
                required: true,
                multiple: false
            },
            {
                id: "ids_specialite",
                label: "Spécialités",
                component: "select",
                options: specialites,
                value: formData.ids_specialite,
                onChange: handleChange,
                required: true,
                multiple: true,
                size: 4
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
            <h1>Mon Compte - Soignant</h1>
            <Form data={formConfig} onSubmit={handleSubmit} />
            <Button
                text="Se déconnecter"
                onClick={handleLogout}
            />
            {message && <p className='formMessage'>{message}</p>}
        </div>
    );
};

export default SoignantCompte;
