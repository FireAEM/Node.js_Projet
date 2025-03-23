import React, { useState } from "react";

import './ContactSection.css';

import IconLink from '../IconLink/IconLink';
import InputField from "../InputField/InputField";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";

const ContactSection = () => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        message: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        try {
            const response = await fetch("http://localhost:3000/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage("Votre message a été envoyé avec succès !");
                setFormData({ nom: "", prenom: "", email: "", message: "" }); // Réinitialise le formulaire
            } else {
                const error = await response.json();
                setErrorMessage(`Une erreur s'est produite : ${error.error}`);
            }
        } catch (error) {
            setErrorMessage("Une erreur réseau s'est produite. Veuillez réessayer plus tard.");
        }
    };

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
            <form className="contactForm" onSubmit={handleSubmit}>
                <InputField 
                    label="Nom"
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required={true}
                />

                <InputField 
                    label="Prénom"
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required={true}
                />

                <InputField 
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required={true}
                />

                <TextArea 
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required={true}
                />

                <Button 
                    text="Envoyer"
                    type="submit"
                    className="submitButton"
                />

                {successMessage && <p className="successMessage">{successMessage}</p>}
                {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default ContactSection;