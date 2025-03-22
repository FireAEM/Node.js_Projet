import React from "react";
import LinkButton from "../LinkButton/LinkButton";

import './HeroSection.css';
import '../../index.css';


const HeroSection = () => {
    return (
        <div className="heroSection">
            <div>
                <h1>Accédez à la santé en toute simplicité</h1>
                <p>Avec Doctolink, prenez rendez-vous en ligne en quelques clics avec les meilleurs professionnels de santé. Découvrez une nouvelle manière de gérer votre santé, rapidement et efficacement.</p>
                <LinkButton
                    link=""
                    className="headerSoignantAccount"
                    text="Démarrer maintenant"
                    color="white"
                    backgroundColor="black"
                /> 
            </div>
            <img src="/images/logo.png" alt="Image hero"/>
        </div>
    );
};

export default HeroSection;