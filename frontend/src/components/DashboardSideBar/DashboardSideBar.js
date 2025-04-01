import React from 'react';
import { Link } from 'react-router-dom';

import './DashboardSideBar.css';

import SideBarLinkButton from './SideBarLinkButton/SideBarLinkButton';


const DashboardSideBar = ({ type, user }) => {
    let navLinks = [];
    if (type === "patient") {
        navLinks = [
            { link: "/dashboard/patient/soignants", text: "Soignants", image: "/images/soignant_clair.png" },
            { link: "/dashboard/patient/rendezvous", text: "Rendez-vous", image: "/images/calendrier_clair.png" },
            { link: "/dashboard/patient/dossiermedical", text: "Dossier Médical", image: "/images/dossier_clair.png" }
        ];
    } else if (type === "soignant") {
        navLinks = [
            { link: "/dashboard/soignant/patients", text: "Patients", image: "/images/utilisateur_clair.png" },
            { link: "/dashboard/soignant/rendezvous", text: "Rendez-vous", image: "/images/calendrier_clair.png" },
            { link: "/dashboard/soignant/etablissement", text: "Etablissement", image: "/images/logo_clair.png" }
        ];
    } else if (type === "administration") {
        navLinks = [
            { link: "/dashboard/administration/messages", text: "Messages", image: "/images/email_clair.png" }
        ];
    }

    const accountLink = `/dashboard/${type}/account`;

    return (
        <header className='dashboardSideBar'>
            <Link to="/" className='dashboardSideBarLogo'>
                <img src="/images/logo_clair.png" alt="Doctolink Logo" />
                Doctolink
            </Link>
            
            <nav className='dashboardSideBarNav'>
                {navLinks.map((navItem, index) => (
                    <SideBarLinkButton
                        key={index}
                        link={navItem.link}
                        text={navItem.text}
                        image={navItem.image}
                    />
                ))}
            </nav>

            <SideBarLinkButton
                link={accountLink}
                className='dashboardSideBarAccount'
                image="/images/utilisateur_clair.png"
                border={"1px solid var(--main-color1)"}
            >
                <div>
                    {user ? (
                        <>
                            <p>{user.nom} {user.prenom}</p>
                            <p>{user.email}</p>
                        </>
                    ) : "Compte"}
                </div>
            </SideBarLinkButton>
        </header>
    );
};

export default DashboardSideBar;
