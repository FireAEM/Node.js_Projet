import React from "react";
import { Routes, Route } from "react-router-dom";

// Importation des pages Patient
import Soignants from "./Patient/Soignants";
import RendezVousPatient from "./Patient/RendezVous";
import DossierMedical from "./Patient/DossierMedical";
import PatientCompte from './Patient/Compte';

// Importation des pages Soignant
import Patients from "./Soignant/Patients";
import RendezVousSoignant from "./Soignant/RendezVous";
import Etablissement from "./Soignant/Etablissement";
import SoignantCompte from './Soignant/Compte';

// Importation des pages Administration
import Messages from "./Administration/Messages";
import AdministrationCompte from './Administration/Compte';


const DashboardContent = ({ type }) => {
    return (
        <Routes>
            {type === "patient" && (
                <>
                    <Route path="patient/soignant" element={<Soignants />} />
                    <Route path="patient/rendezvous" element={<RendezVousPatient />} />
                    <Route path="patient/dossiermedical" element={<DossierMedical />} />
                    <Route path="patient/account" element={<PatientCompte />} />
                </>
            )}
            {type === "soignant" && (
                <>
                    <Route path="soignant/patients" element={<Patients />} />
                    <Route path="soignant/rendezvous" element={<RendezVousSoignant />} />
                    <Route path="soignant/etablissement" element={<Etablissement />} />
                    <Route path="soignant/account" element={<SoignantCompte />} />
                </>
            )}
            {type === "administration" && (
                <>
                    <Route path="administration/messages" element={<Messages />} />
                    <Route path="administration/account" element={<AdministrationCompte />} />
                </>
            )}
        </Routes>
    );
};
  
export default DashboardContent;
