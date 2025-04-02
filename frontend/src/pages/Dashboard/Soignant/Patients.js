import React, { useState, useEffect } from 'react';

const Patient = () => {
    const [patients, setPatients] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState({});

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await fetch('http://localhost:3000/patient');
                if (res.ok) {
                    const data = await res.json();
                    setPatients(data);

                    const utilisateurPromises = data.map(patient =>
                        fetch(`http://localhost:3000/utilisateur/${patient.id_utilisateur}`)
                    );
                    const utilisateurResponses = await Promise.all(utilisateurPromises);
                    const utilisateurData = await Promise.all(utilisateurResponses.map(res => res.json()));

                    const utilisateurMap = utilisateurData.reduce((acc, utilisateur) => {
                        acc[utilisateur.id_utilisateur] = utilisateur;
                        return acc;
                    }, {});

                    setUtilisateurs(utilisateurMap);
                } else {
                    console.error('Erreur lors de la récupération des patients');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des patients:', error);
            }
        };

        fetchPatients();
    }, []);

    return (
        <div className="LP">
            <h1>Liste des Patients</h1>
            <ul>
                {patients.map(patient => (
                    <li key={patient.id_patient}>
                        Nom : &nbsp; {utilisateurs[patient.id_utilisateur]?.nom} {utilisateurs[patient.id_utilisateur]?.prenom} <br></br> 
                        Email : &nbsp; ({utilisateurs[patient.id_utilisateur]?.email}) <br></br> 
                        Sexe: &nbsp; {patient.sexe} <br></br> 
                        Date de naissance: &nbsp; {patient.date_de_naissance} <br></br>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Patient;
