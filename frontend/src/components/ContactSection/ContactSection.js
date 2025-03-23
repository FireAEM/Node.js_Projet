import React from "react";

import './ContactSection.css';

import IconLink from '../IconLink/IconLink';
import InputField from "../InputField/InputField";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";

const ContactSection = () => {
    return (
        <div className="contactContainer">
            <div className="contactLinks">
                <h2>Contactez-nous</h2>
                <IconLink
                    image="/images/telephone.png"
                    imageAlt="Nous appeler"
                    text="01 23 45 67 89"
                    link="tel:0123456789"
                />

                <IconLink
                    image="/images/email.png"
                    imageAlt="Nous envoyer un mail"
                    text="contact@doctolink.com"
                    link="mailto:contact@doctolink.com"
                />

                <IconLink
                    image="/images/marqueur.png"
                    imageAlt="Notre adresse"
                    text="30-32 Avenue de la République, 94800 Villejuif, France"
                    link="https://maps.app.goo.gl/GrxUgo7nCGEDNADZA"
                    target="blank"
                />
            </div>
            <form className="contactForm">
                <InputField 
                    label="Nom"
                    type="text"
                    name="nom"
                    required = {true}
                />

                <InputField 
                    label="Prénom"
                    type="text"
                    name="prenom"
                    required = {true}
                />

                <InputField 
                    label="Email"
                    type="email"
                    name="email"
                    required = {true}
                />

                <TextArea 
                    label="Message"
                    name="message"
                    required={true}
                />

                <Button 
                    text="Envoyer"
                    type="submit"
                    className="submitButton"
                />
            </form>
        </div>
    );
};

export default ContactSection;