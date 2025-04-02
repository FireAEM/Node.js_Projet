import React, { useState, useEffect, useContext } from 'react';

import './RendezVous.css';

import { AuthContext } from '../../../context/AuthContext';
import RendezVousItem from '../../../components/DashboardComponents/Patient/RendezVous';


const RendezVous = () => {
    const { user } = useContext(AuthContext);
    const [patientId, setPatientId] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [soignants, setSoignants] = useState([]);
    const [etablissements, setEtablissements] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Récupérer l'id du patient via l'endpoint GET /patient/utilisateur/:id_utilisateur
    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const res = await fetch(`http://localhost:3000/patient/utilisateur/${user.id_utilisateur}`);
                if (res.ok) {
                    const data = await res.json();
                    setPatientId(data.id_patient);
                } else {
                    console.error("Erreur de récupération du patient");
                }
            } catch (error) {
                console.error("Erreur :", error);
            }
        };
        fetchPatient();
    }, [user.id_utilisateur]);

    // Récupérer les rendez-vous pour le patient
    useEffect(() => {
        if (!patientId) return;
        const fetchAppointments = async () => {
            try {
                const res = await fetch(`http://localhost:3000/rendez_vous/patient/${patientId}`);
                if (res.ok) {
                    const data = await res.json();
                    // Si l'API renvoie un objet unique, on le convertir en tableau
                    const appointmentsArray = Array.isArray(data) ? data : (data ? [data] : []);
                    setAppointments(appointmentsArray);
                } else {
                    console.error("Erreur lors de la récupération des rendez-vous");
                }
            } catch (error) {
                console.error("Erreur :", error);
            }
        };
        fetchAppointments();
    }, [patientId]);

    // Récupérer tous les soignants
    useEffect(() => {
        const fetchSoignants = async () => {
            try {
                const res = await fetch("http://localhost:3000/soignant");
                if (res.ok) {
                    const data = await res.json();
                    setSoignants(data);
                } else {
                    console.error("Erreur lors de la récupération des soignants");
                }
            } catch (error) {
                console.error("Erreur :", error);
            }
        };
        fetchSoignants();
    }, []);

    // Récupérer tous les établissements
    useEffect(() => {
        const fetchEtablissements = async () => {
            try {
                const res = await fetch("http://localhost:3000/etablissement");
                if (res.ok) {
                    const data = await res.json();
                    setEtablissements(data);
                } else {
                    console.error("Erreur lors de la récupération des établissements");
                }
            } catch (error) {
                console.error("Erreur :", error);
            }
        };
        fetchEtablissements();
    }, []);

    // Récupérer tous les utilisateurs (pour associer aux soignants)
    useEffect(() => {
        const fetchUtilisateurs = async () => {
            try {
                const res = await fetch("http://localhost:3000/utilisateur");
                if (res.ok) {
                    const data = await res.json();
                    setUtilisateurs(data);
                } else {
                    console.error("Erreur lors de la récupération des utilisateurs");
                }
            } catch (error) {
                console.error("Erreur :", error);
            }
        };
        fetchUtilisateurs();
    }, []);

    // Enrichir chaque rendez-vous avec les informations du soignant et l'adresse de son établissement
    const enrichedAppointments = appointments.map(app => {
        // Trouver le soignant correspondant dans la liste des soignants
        const soignant = soignants.find(s => s.id_soignant === app.id_soignant);
        let soignantName = "Soignant";
        let etablissementAdresse = "Inconnue";
        if (soignant) {
            // Rechercher l'utilisateur correspondant pour obtenir le nom/prénom
            const userForSoignant = utilisateurs.find(u => u.id_utilisateur === soignant.id_utilisateur);
            if (userForSoignant) {
                soignantName = `${userForSoignant.nom} ${userForSoignant.prenom}`;
            }
            // Trouver l'établissement correspondant
            const etab = etablissements.find(e => e.id_etablissement === soignant.id_etablissement);
            if (etab) {
                etablissementAdresse = etab.adresse;
            }
        }
        return {
            ...app,
            soignantName,
            etablissementAdresse
        };
    });

    const filteredAppointments = enrichedAppointments.filter(app => {
        const query = searchQuery.toLowerCase();
        return app.soignantName.toLowerCase().includes(query);
    });

    return (
        <div className="rendezVousPage">
            <h1>Rendez-vous</h1>
            
            <div className="dashboardSearch">
                <input 
                    type="text" 
                    placeholder="Recherche..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img src="/images/recherche.png" alt="Recherche" />
            </div>

            <div className="rendezVous">
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map(app => (
                        <RendezVousItem 
                        key={app.id_rendez_vous}
                        dateHeure={new Date(app.dateheure).toLocaleString()}
                        statut={app.statut}
                        soignant={app.soignantName}
                        adresse={app.etablissementAdresse}
                        />
                    ))
                ) : (
                    <p>Aucun rendez-vous trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default RendezVous;
