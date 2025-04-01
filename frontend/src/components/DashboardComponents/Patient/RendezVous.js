import React from "react";

import './RendezVous.css';

import IconInformation from "../../IconInformation/IconInformation";


const RendezVous = ({
    dateHeure = "Date heure",
    statut = "Statut",
    soignant = "Soignant",
    adresse = "Adresse"
}) => {
    return (
        <div className="appointmentItem">
            <IconInformation
                image="/images/horloge.png"
                imageAlt="Date heure"
                text={`${dateHeure}`}
            />
            <IconInformation
                image="/images/information.png"
                imageAlt="Statut"
                text={statut}
            />
            <IconInformation
                image="/images/soignant.png"
                imageAlt="Soignant"
                text={soignant}
            />
            <IconInformation
                image="/images/marqueur.png"
                imageAlt="Adresse"
                text={adresse}
            />
        </div>
    );
};

export default RendezVous;