import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './SoignantRegisterPage.css';

import Header from '../../components/Header/Header';
import Form from '../../components/Form/Form';
import FooterSection from '../../components/FooterSection/FooterSection';
import { AuthContext } from '../../context/AuthContext';


const SoignantRegisterPage = () => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        mot_de_passe: "",
        rpps: "",
        id_etablissement: "",
        ids_specialite: []
    });

    const [etablissements, setEtablissements] = useState([]);
    const [specialites, setSpecialites] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/dashboard/soignant");
        }
    }, [user, navigate]);

    useEffect(() => {
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
    
        fetchEtablissements();
        fetchSpecialites();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "ids_specialite") {
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
            setFormData({ ...formData, [name]: selectedOptions });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const utilisateurResponse = await fetch("http://localhost:3000/utilisateur", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nom: formData.nom,
                    prenom: formData.prenom,
                    email: formData.email,
                    mot_de_passe: formData.mot_de_passe,
                    id_role: 2
                })
            });
            if (!utilisateurResponse.ok) {
                const errorData = await utilisateurResponse.json();
                throw new Error(`Erreur utilisateur : ${errorData.message}`);
            }

            const newUser = await utilisateurResponse.json();
            const soignantResponse = await fetch("http://localhost:3000/soignant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rpps: parseInt(formData.rpps),
                    id_etablissement: parseInt(formData.id_etablissement),
                    id_utilisateur: newUser.newUser.id_utilisateur,
                    ids_specialite: formData.ids_specialite.map(id => parseInt(id))
                })
            });
            if (!soignantResponse.ok) {
                const errorData = await soignantResponse.json();
                throw new Error(`Erreur soignant : ${errorData.error || errorData.message}`);
            }
            await soignantResponse.json();
            login(newUser.newUser);
            setSuccessMessage("Inscription réussie !");
            navigate("/dashboard/soignant");
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
            <main className="registerSection">
                <div className="soignantRegisterContainer">
                    <h1>Inscription Soignant</h1>
                    <Form data={formConfig} onSubmit={handleSubmit} />
                    <p>Vous êtes patient ? <Link to="/register/patient/">Inscrivez-vous</Link> </p>
                    <p>Déjà un compte ? <Link to="/login/">Connectez-vous</Link> </p>
                    {successMessage && <p className="successMessage">{successMessage}</p>}
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                </div>
            </main>
            <FooterSection />
        </div>
    );
};

export default SoignantRegisterPage;
