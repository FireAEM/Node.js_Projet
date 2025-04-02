import React, { useState, useContext } from 'react';

import './Soignant.css';

import { AuthContext } from '../../../context/AuthContext';
import IconInformation from '../../IconInformation/IconInformation';


const Soignant = ({
        id_soignant,
        lastName = "Nom",
        firstName = "Prénom",
        specialties = "Spécialités",
        nameEstablishment = "Nom établissement",
        adressEstablishment = "Adresse établissement",
        openingTime = "07:00:00",
        closingTime = "17:00:00",
        openDays = [1,2,3,4,5],
        rpps = "RPPS",
    }) => {
        const { user } = useContext(AuthContext); // Pour obtenir l'id_patient
        const [selectedTab, setSelectedTab] = useState(0);
        const [bookingMessage, setBookingMessage] = useState("");

        // Tableau des 7 prochains jours
        const getNext7Days = () => {
            const days = [];
            const today = new Date();
            for (let i = 0; i < 7; i++) {
                const d = new Date(today);
                d.setDate(today.getDate() + i);
                days.push(d);
            }
            return days;
        };
        const daysArray = getNext7Days();

        // Convertir une chaîne d'heure en objet Date (en se basant sur une date donnée)
        const parseTime = (timeStr, baseDate) => {
            const [hours, minutes, seconds] = timeStr.split(':').map(Number);
            const d = new Date(baseDate);
            d.setHours(hours, minutes, seconds || 0, 0);
            return d;
        };

    const selectedDate = daysArray[selectedTab];
    // En JavaScript, getDay() renvoie 0 pour dimanche, 1 pour lundi, donc on convertit :
    const dayNumber = selectedDate.getDay() === 0 ? 7 : selectedDate.getDay();
    const isOpen = openDays.includes(dayNumber);

    const generateTimeSlots = () => {
        if (!isOpen) return [];
        const slots = [];
        const baseDate = new Date(selectedDate);
        const openDt = parseTime(openingTime, baseDate);
        const closeDt = parseTime(closingTime, baseDate);
        let current = new Date(openDt);
        while (current < closeDt) {
            slots.push(new Date(current));
            current.setMinutes(current.getMinutes() + 15);
        }
        return slots;
    };
    const timeSlots = generateTimeSlots();

    const handleBook = async (slot) => {
        const confirmBooking = window.confirm(`Prendre rendez-vous le ${slot.toLocaleString()} ?`);
        if (!confirmBooking) return;
        try {
            // Vérifier si l'id_patient est présent dans le contexte
            let patientId = user.id_patient;
            if (!patientId) {
                // Sinon, le récupérer via l'endpoint patient
                const resPatient = await fetch(`http://localhost:3000/patient/utilisateur/${user.id_utilisateur}`);
                if (resPatient.ok) {
                    const data = await resPatient.json();
                    patientId = data.id_patient;
                } else {
                    throw new Error("Impossible de récupérer l'identifiant du patient");
                }
            }
            
            const payload = {
                dateheure: slot.toISOString(),
                statut: "A confirmer",
                id_soignant: id_soignant,
                id_patient: patientId
            };

            const res = await fetch("http://localhost:3000/rendez_vous", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Erreur lors de la prise de rendez-vous");
            }
            setBookingMessage("Rendez-vous réservé avec succès !");
        } catch (error) {
            setBookingMessage(`Erreur : ${error.message}`);
        }
    };


    return (
        <div className="soignantItem">
            <div className="soignantItemLeft">
                <div>
                    <h2>{lastName} {firstName}</h2>
                    <p>{specialties}</p>
                </div>
                <div>
                    <IconInformation
                        image="/images/marqueur.png"
                        imageAlt="Etablissement"
                        text={`${nameEstablishment} ${adressEstablishment}`}
                    />
                    <IconInformation
                        image="/images/marqueur.png"
                        imageAlt="Horaires"
                        text={`${openingTime} - ${closingTime}, Jours: ${openDays.join(", ")}`}
                    />
                    <IconInformation
                        image="/images/numero.png"
                        imageAlt="RPPS"
                        text={rpps}
                    />
                </div>
            </div>
            <div className="soignantItemRight">
                <div className="tabs">
                    {daysArray.map((day, index) => (
                        <button
                        key={index}
                        className={selectedTab === index ? "active" : ""}
                        onClick={() => { setSelectedTab(index); setBookingMessage(""); }}
                        >
                        {day.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}
                        </button>
                    ))}
                </div>
                <div className="timeSlots">
                    {isOpen ? (
                        timeSlots.length > 0 ? (
                            timeSlots.map((slot, index) => (
                                <button key={index} onClick={() => handleBook(slot)}>
                                    {slot.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                </button>
                            ))
                        ) : (
                            <p>Aucun horaire disponible</p>
                        )
                    ) : (
                        <p>Fermé</p>
                    )}
                </div>
                {bookingMessage && <p className="bookingMessage">{bookingMessage}</p>}
            </div>
        </div>
    );
};

export default Soignant;
