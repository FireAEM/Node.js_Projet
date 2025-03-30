import React from "react";
import { Routes, Route } from "react-router-dom";

// Importation des pages Patient
import Soignants from "./Patient/Soignants";
import RendezVousPatient from "./Patient/RendezVous";
import DossierMedical from "./Patient/DossierMedical";

// Importation des pages Soignant
import Patients from "./Soignant/Patients";
import RendezVousSoignant from "./Soignant/RendezVous";
import Etablissement from "./Soignant/Etablissement";

// Importation des pages Administration
import Messages from "./Administration/Messages";


const DashboardContent = ({ type }) => {
    return (
        <Routes>
            {type === "patient" && (
                <>
                <Route path="patient/soignants" element={<Soignants />} />
                <Route path="patient/rendezvous" element={<RendezVousPatient />} />
                <Route path="patient/dossiermedical" element={<DossierMedical />} />
                </>
            )}
            {type === "soignant" && (
                <>
                <Route path="soignant/patients" element={<Patients />} />
                <Route path="soignant/rendezvous" element={<RendezVousSoignant />} />
                <Route path="soignant/etablissement" element={<Etablissement />} />
                </>
            )}
            {type === "administration" && (
                <>
                <Route path="admin/messages" element={<Messages />} />
                </>
            )}
        </Routes>
    );
};
  
export default DashboardContent;
