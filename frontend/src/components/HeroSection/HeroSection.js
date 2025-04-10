import React from "react";
import LinkButton from "../LinkButton/LinkButton";

import './HeroSection.css';


const HeroSection = () => {
    return (
        <div className="heroSection">
            <div>
                <h1>Accédez à la santé en toute simplicité</h1>
                <p>Avec Doctolink, prenez rendez-vous en ligne en quelques clics avec les meilleurs professionnels de santé. Découvrez une nouvelle manière de gérer votre santé, rapidement et efficacement.</p>
                <LinkButton
                    link="/register/patient/"
                    className="headerSoignantAccount"
                    text="Démarrer maintenant"
                    color="white"
                    backgroundColor="black"
                /> 
            </div>
            <div><img src="/images/image_hero.png" alt="Image hero"/></div>
        </div>
    );
};

export default HeroSection;