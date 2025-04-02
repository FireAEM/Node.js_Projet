import React, { useState, useEffect } from 'react';

import './Soignants.css';

import SoignantItem from '../../../components/DashboardComponents/Patient/Soignant';

const Soignants = () => {
    const [soignants, setSoignants] = useState([]);
    const [etablissements, setEtablissements] = useState([]);
    const [specialites, setSpecialites] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Charger la liste des soignants
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

    // Charger les établissements
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

    // Charger les spécialités
    useEffect(() => {
        const fetchSpecialites = async () => {
            try {
                const res = await fetch("http://localhost:3000/specialite");
                if (res.ok) {
                    const data = await res.json();
                    setSpecialites(data);
                } else {
                    console.error("Erreur lors de la récupération des spécialités");
                }
            } catch (error) {
                console.error("Erreur :", error);
            }
        };
        fetchSpecialites();
    }, []);

    // Charger tous les utilisateurs pour avoir nom et prénom
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

    // Filtrer les soignants selon le nom/prénom ou spécialité
    const filteredSoignants = soignants.filter(s => {
        const userForSoignant = utilisateurs.find(u => u.id_utilisateur === s.id_utilisateur);
        const nom = userForSoignant ? userForSoignant.nom.toLowerCase() : "";
        const prenom = userForSoignant ? userForSoignant.prenom.toLowerCase() : "";
        // On suppose que s.ids_specialite existe ; sinon, il faut ajuster (vous pouvez faire un appel complémentaire)
        const specNames = specialites
            .filter(spec => s.ids_specialite && s.ids_specialite.includes(spec.id_specialite))
            .map(spec => spec.nom.toLowerCase())
            .join(" ");
        const query = searchQuery.toLowerCase();
        return nom.includes(query) || prenom.includes(query) || specNames.includes(query);
    });

    return (
        <div className="soignantsPage">
            <h1>Soignants</h1>
            <div className="dashboardSearch">
                <input 
                    type="text" 
                    placeholder="Recherche..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img src="/images/recherche.png" alt="Recherche" />
            </div>
            <div className="soignants">
                {filteredSoignants.length > 0 ? (
                    filteredSoignants.map(s => {
                        const userForSoignant = utilisateurs.find(u => u.id_utilisateur === s.id_utilisateur);
                        const lastName = userForSoignant ? userForSoignant.nom : "Nom";
                        const firstName = userForSoignant ? userForSoignant.prenom : "Prénom";
                        const specialties = specialites
                            .filter(spec => s.ids_specialite && s.ids_specialite.includes(spec.id_specialite))
                            .map(spec => spec.nom)
                            .join(", ");
                        const etab = etablissements.find(e => e.id_etablissement === s.id_etablissement);
                        const nameEstablishment = etab ? etab.nom : "Etablissement";
                        const adressEstablishment = etab ? etab.adresse : "Adresse";
                        // Pour générer les horaires, on passe les heures d'ouverture et fermeture et jours d'ouverture
                        const openingTime = etab ? etab.heure_ouverture : "00:00:00";
                        const closingTime = etab ? etab.heure_fermeture : "00:00:00";
                        const openDays = etab ? etab.jours_ouverture : [];
                        
                        return (
                            <SoignantItem
                                key={s.id_soignant}
                                id_soignant={s.id_soignant}
                                lastName={lastName}
                                firstName={firstName}
                                specialties={specialties}
                                nameEstablishment={nameEstablishment}
                                adressEstablishment={adressEstablishment}
                                openingTime={openingTime}
                                closingTime={closingTime}
                                openDays={openDays}
                                rpps={s.rpps}
                            />
                        );
                    })
                ) : (
                    <p>Aucun soignant trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default Soignants;