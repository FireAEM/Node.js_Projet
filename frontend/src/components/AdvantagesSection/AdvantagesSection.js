import React from "react";

import './AdvantagesSection.css';

import Advantage from './Advantage/Advantage';

const AdvantageSection = () => {
    return (
        <div className="advantagesContainer">
            <h1>Nos avantages</h1>
            <div className="advantages">
            <Advantage 
                image="/images/facile.png"
                title="Prise de rendez-vous simplifiée"
                description="Créez des comptes épargne et courants. Gérez jusqu'à 5 comptes par utilisateur. Possibilité de découvert jusqu'à 200€"
            />

            <Advantage 
                image="/images/reseau.png"
                title="Large réseau de professionnels"
                description="Effectuez des dépôts, retraits, et virements. Historique détaillé des transactions."
            />

            <Advantage 
                image="/images/dossier.png"
                title="Gestion des dossiers médicaux"
                description="Chiffrement des mots de passe. Validation des données utilisateurs. Support client disponible 24/7"
            />
            </div>
        </div>
    );
};

export default AdvantageSection;