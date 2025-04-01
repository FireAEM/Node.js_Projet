import React, { useState, useEffect } from 'react';

const Soignant = () => {
    const [soignants, setSoignants] = useState([]);
    const [etablissements, setEtablissements] = useState({});
    const [utilisateurs, setUtilisateurs] = useState({});

    useEffect(() => {
        const fetchSoignants = async () => {
            try {
                const res = await fetch('http://localhost:3000/soignant');
                if (res.ok) {
                    const data = await res.json();
                    setSoignants(data);

                    // Fetch établissement and utilisateur details
                    const etablissementPromises = data.map(soignant => 
                        fetch(`http://localhost:3000/etablissement/${soignant.id_etablissement}`)
                    );
                    const utilisateurPromises = data.map(soignant => 
                        fetch(`http://localhost:3000/utilisateur/${soignant.id_utilisateur}`)
                    );

                    const etablissementResponses = await Promise.all(etablissementPromises);
                    const utilisateurResponses = await Promise.all(utilisateurPromises);

                    const etablissementData = await Promise.all(etablissementResponses.map(res => res.json()));
                    const utilisateurData = await Promise.all(utilisateurResponses.map(res => res.json()));

                    const etablissementMap = etablissementData.reduce((acc, etablissement) => {
                        acc[etablissement.id_etablissement] = etablissement;
                        return acc;
                    }, {});

                    const utilisateurMap = utilisateurData.reduce((acc, utilisateur) => {
                        acc[utilisateur.id_utilisateur] = utilisateur;
                        return acc;
                    }, {});

                    setEtablissements(etablissementMap);
                    setUtilisateurs(utilisateurMap);
                } else {
                    console.error('Erreur lors de la récupération des soignants');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des soignants:', error);
            }
        };

        fetchSoignants();
    }, []);

    return (
        <div>
            <h1>Liste des Soignants</h1>
            <ul>
                {soignants.map(soignant => (
                    <li key={soignant.id_soignant}>
                        Nom : &nbsp; {utilisateurs[soignant.id_utilisateur]?.nom} {utilisateurs[soignant.id_utilisateur]?.prenom} - établissement : &nbsp;
                        {etablissements[soignant.id_etablissement]?.nom} - 
                        {etablissements[soignant.id_etablissement]?.adresse} - 
                        {etablissements[soignant.id_etablissement]?.heure_ouverture} à {etablissements[soignant.id_etablissement]?.heure_fermeture} - Rpps: &nbsp;
                        {soignant.rpps}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Soignant;