const express = require('express');
const cors = require('cors');

const Utilisateur = require('./models/utilisateur');
const Patient = require('./models/patient');
const Role = require('./models/role');
const Specialite = require('./models/specialite');
const Type_etablissement = require('./models/type_etablissement');
const Type_synthese_medicale = require('./models/type_synthese_medicale');
const Mode_de_paiement = require('./models/mode_de_paiement');
const Etablissement = require('./models/etablissement');
const Soignant = require('./models/soignant');
const Dossier_medical = require('./models/dossier_medical');
const Rendez_vous = require('./models/rendez-vous');
const Facturation = require('./models/facturation');
const Historique_medicale = require('./models/historique_medical');
const Synthese_medicale = require('./models/synthese_medicale');
const Message = require('./models/message');

const Assurance_sante = require('./models/assurance_sante');

require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());



// Endpoints utilisateur

app.get('/utilisateur', async (req, res) => {
    try {
        const utilisateur = await Utilisateur.getAllUser();
        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/utilisateur/:id_utilisateur', async (req, res) => {
    try {
        const utilisateur = await Utilisateur.getUserById(req.params.id_utilisateur);
        utilisateur ? res.status(200).json(utilisateur) : res.status(404).json({ message: "Utilisateur non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/utilisateur/connexion', async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;
        const utilisateur = await Utilisateur.getUserByEmail(email);

        if (utilisateur && utilisateur.mot_de_passe === mot_de_passe) {
            res.status(200).json({ message: "Connexion réussie", utilisateur });
        } else {
            res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ajouter /utilisateur/deconnexion

app.post('/utilisateur', async (req, res) => {
    try {
        const newUser = await Utilisateur.createUser(req.body);
        res.status(201).json({ newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/utilisateur/:id_utilisateur', async (req, res) => {
    try {
        const updateuser = await Utilisateur.updateUser(req.params.id_utilisateur, req.body);
        res.status(200).json({ updateuser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/utilisateur/:id_utilisateur', async (req, res) => {
    try {
        await Utilisateur.deleteUser(req.params.id_utilisateur);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/utilisateur/:id_utilisateur/role', async (req, res) => {
    try {
        const role = await Utilisateur.getUserRoleById(req.params.id_utilisateur);
        if (role) {
            res.status(200).json({ role });
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Endpoints patient

app.post('/patient', async (req, res) => {
    try {
        const newPatient = await Patient.createPatient(req.body);
        res.status(201).json({ newPatient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/patient/:id_patient', async (req, res) => {
    try {
        const updatepatient = await Patient.updatePatient(req.params.id_patient, req.body);
        res.status(200).json({ updatepatient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/patient', async (req, res) => {
    try {
        const patient = await Patient.getAllPatient();
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/patient/:id_patient', async (req, res) => {
    try {
        const patient = await Patient.getPatientById(req.params.id_patient);
        patient ? res.status(200).json(patient) : res.status(404).json({ message: "Patient non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/patient/utilisateur/:id_utilisateur', async (req, res) => {
    try {
        const patient = await Patient.getPatientByIdUtilisateur(req.params.id_utilisateur);
        patient ? res.status(200).json(patient) : res.status(404).json({ message: "Patient avec cet id utilisateur non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Endpoints role

app.post('/role', async (req, res) => {
    try {
        const newRole = await Role.createRole(req.body);
        res.status(201).json({ newRole });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/role', async (req, res) => {
    try {
        const role = await Role.getAllRole();
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/role/:id_role', async (req, res) => {
    try {
        const role = await Role.getRoleById(req.params.id_role);
        role ? res.status(200).json(role) : res.status(404).json({ message: "Role non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/role/:id_role', async (req, res) => {
    try {
        const updatedRole = await Role.updateRole(req.params.id_role, req.body);
        res.status(200).json({ updatedRole });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/role/:id_role', async (req, res) => {
    try {
        await Role.deleteRole(req.params.id_role);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Endpoints specialite

app.post('/specialite', async (req, res) => {
    try {
        const newSpecialite = await Specialite.createSpecialite(req.body);
        res.status(201).json({ newSpecialite });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/specialite', async (req, res) => {
    try {
        const specialite = await Specialite.getAllSpecialite();
        res.status(200).json(specialite);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/specialite/:id_specialite', async (req, res) => {
    try {
        const specialite = await Specialite.getSpecialiteById(req.params.id_specialite);
        specialite ? res.status(200).json(specialite) : res.status(404).json({ message: "Specialite non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/specialite/soignant/:id_soignant', async (req, res) => {
    try {
        const specialite = await Specialite.getSpecialiteBySoignantId(req.params.id_soignant);
        specialite ? res.status(200).json(specialite) : res.status(404).json({ message: "Specialite avec cet id soignant non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.put('/specialite/:id_specialite', async (req, res) => {
    try {
        const updatedSpecialite = await Specialite.updateSpecialite(req.params.id_specialite, req.body);
        res.status(200).json({ updatedSpecialite });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/specialite/:id_specialite', async (req, res) => {
    try {
        await Specialite.deleteSpecialite(req.params.id_specialite);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//EndPoint type_etablissement

app.post('/type_etablissement', async (req, res) => {
    try {
        const newType_etablissement = await Type_etablissement.createType_etablissement(req.body);
        res.status(201).json({ newType_etablissement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/type_etablissement', async (req, res) => {
    try {
        const type_etablissement = await Type_etablissement.getAllType_etablissement();
        res.status(200).json(type_etablissement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/type_etablissement/:id_type_etablissement', async (req, res) => {
    try {
        const type_etablissement = await Type_etablissement.getType_etablissementById(req.params.id_type_etablissement);
        type_etablissement ? res.status(200).json(type_etablissement) : res.status(404).json({ message: "Type etablissement non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/type_etablissement/:id_type_etablissement', async (req, res) => {
    try {
        const updatedType_etablissement = await Type_etablissement.updateType_etablissement(req.params.id_type_etablissement, req.body);
        res.status(200).json({ updatedType_etablissement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/type_etablissement/:id_type_etablissement', async (req, res) => {
    try {
        await Type_etablissement.deleteType_etablissement(req.params.id_type_etablissement);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Endpoints type_synthese_medicale

app.post('/type_synthese_medicale', async (req, res) => {
    try {
        const newType_synthese_medicale = await Type_synthese_medicale.createType_synthese_medicale(req.body);
        res.status(201).json({ newType_synthese_medicale });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/type_synthese_medicale', async (req, res) => {
    try {
        const type_synthese_medicale = await Type_synthese_medicale.getAllType_synthese_medicale();
        res.status(200).json(type_synthese_medicale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/type_synthese_medicale/:id_type_synthese_medicale', async (req, res) => {
    try {
        const type_synthese_medicale = await Type_synthese_medicale.getType_synthese_medicaleById(req.params.id_type_synthese_medicale);
        type_synthese_medicale ? res.status(200).json(type_synthese_medicale) : res.status(404).json({ message: "Type_synthese_medicale non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/type_synthese_medicale/:id_type_synthese_medicale', async (req, res) => {
    try {
        const updatedType_synthese_medicale = await Type_synthese_medicale.updateType_synthese_medicale(req.params.id_type_synthese_medicale, req.body);
        res.status(200).json({ updatedType_synthese_medicale });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/type_synthese_medicale/:id_type_synthese_medicale', async (req, res) => {
    try {
        await Type_synthese_medicale.deleteType_synthese_medicale(req.params.id_type_synthese_medicale);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Endpoint mode de paiement

app.post('/mode_de_paiement', async (req, res) => {
    try {
        const newMode_de_paiement = await Mode_de_paiement.createPaiement(req.body);
        res.status(201).json({ newMode_de_paiement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/mode_de_paiement', async (req, res) => {
    try {
        const mode_de_paiement = await Mode_de_paiement.getAllPaiement();
        res.status(200).json(mode_de_paiement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/mode_de_paiement/:id_mode_de_paiement', async (req, res) => {
    try {
        const mode_de_paiement = await Mode_de_paiement.getPaiementById(req.params.id_mode_de_paiement);
        mode_de_paiement ? res.status(200).json(mode_de_paiement) : res.status(404).json({ message: "mode de paiement non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/mode_de_paiement/:id_mode_de_paiement', async (req, res) => {
    try {
        await Mode_de_paiement.deletePaiement(req.params.id_mode_de_paiement);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/mode_de_paiement/:id_mode_de_paiement', async (req, res) => {
    try {
        const updatepaiement = await Mode_de_paiement.updatePaiement(req.params.id_mode_de_paiement, req.body);
        res.status(200).json({ updatepaiement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Endpoints assurance_sante

app.post('/assurance_sante', async (req, res) => {
    try {
        const newAssurance_sante = await Assurance_sante.createAssurance_sante(req.body);
        res.status(201).json({ newAssurance_sante });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/assurance_sante', async (req, res) => {
    try {
        const assurance_sante = await Assurance_sante.getAllAssurance_sante();
        res.status(200).json(assurance_sante);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/assurance_sante/:id_assurance_sante', async (req, res) => {
    try {
        const assurance_sante = await Assurance_sante.getAssurance_santeById(req.params.id_assurance_sante);
        assurance_sante ? res.status(200).json(assurance_sante) : res.status(404).json({ message: "Assurance_sante non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/assurance_sante/:id_assurance_sante', async (req, res) => {
    try {
        const updateAssurance_sante = await Assurance_sante.updateAssurance_sante(req.params.id_assurance_sante, req.body);
        res.status(200).json({ updateAssurance_sante });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/assurance_sante/:id_assurance_sante', async (req, res) => {
    try {
        await Assurance_sante.deleteAssurance_sante(req.params.id_assurance_sante);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//Endpoint etablissement

app.post('/etablissement', async (req, res) => {
    try {
        const newEtablissement = await Etablissement.createEtablissement(req.body);
        res.status(201).json({ newEtablissement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/etablissement', async (req, res) => {
    try {
        const etablissement = await Etablissement.getAllEtablissement();
        res.status(200).json(etablissement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/etablissement/:id_etablissement', async (req, res) => {
    try {
        const etablissement = await Etablissement.getEtablissementById(req.params.id_etablissement);
        etablissement ? res.status(200).json(etablissement) : res.status(404).json({ message: "Etablissement non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/etablissement/:id_etablissement', async (req, res) => {
    try {
        const updatedEtablissement = await Etablissement.updateEtablissement(req.params.id_etablissement, req.body);
        res.status(200).json({ updatedEtablissement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/etablissement/:id_etablissement', async (req, res) => {
    try {
        await Etablissement.deleteEtablissement(req.params.id_etablissement);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//Endpoint soignant

app.post('/soignant', async (req, res) => {
    try {
        const newSoignant = await Soignant.createSoignant(req.body);
        res.status(201).json({ newSoignant });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/soignant', async (req, res) => {
    try {
        const soignant = await Soignant.getAllSoignant();
        res.status(200).json(soignant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/soignant/:id_soignant', async (req, res) => {
    try {
        const soignant = await Soignant.getSoignantById(req.params.id_soignant);
        soignant ? res.status(200).json(soignant) : res.status(404).json({ message: "Soignant non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/soignant/utilisateur/:id_utilisateur', async (req, res) => {
    try {
        const soignant = await Soignant.getSoignantByIdUtilisateur(req.params.id_utilisateur);
        soignant ? res.status(200).json(soignant) : res.status(404).json({ message: "Soignant avec cet id utilisateur non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/soignant/specialite/id/:id_specialite', async (req, res) => {
    try {
        const soignants = await Soignant.getSoignantsBySpecialiteId(req.params.id_specialite);
        soignants.length ? res.status(200).json(soignants) : res.status(404).json({ message: "Aucun soignant trouvé pour cette spécialité" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/soignant/specialite/nom/:nom_specialite', async (req, res) => {
    try {
        const soignants = await Soignant.getSoignantsBySpecialiteName(req.params.nom_specialite);
        soignants.length ? res.status(200).json(soignants) : res.status(404).json({ message: "Aucun soignant trouvé pour cette spécialité" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/soignant/:id_soignant', async (req, res) => {
    try {
        const updatedSoignant = await Soignant.updateSoignant(req.params.id_soignant, req.body);
        res.status(200).json({ updatedSoignant });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//Endpoint dossier_medical

app.post('/dossier_medical', async (req, res) => {
    try {
        const newDossier_medical = await Dossier_medical.createDossier_medical(req.body);
        res.status(201).json({ newDossier_medical });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/dossier_medical', async (req, res) => {
    try {
        const dossier_medical = await Dossier_medical.getAllDossier_medical();
        res.status(200).json(dossier_medical);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/dossier_medical/:id_dossier_medical', async (req, res) => {
    try {
        const dossier_medical = await Dossier_medical.getDossier_medicalById(req.params.id_dossier_medical);
        dossier_medical ? res.status(200).json(dossier_medical) : res.status(404).json({ message: "Dossier médical non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/dossier_medical/patient/:id_patient', async (req, res) => {
    try {
        const dossier_medical = await Dossier_medical.getDossier_medicalByIdPatient(req.params.id_patient);
        dossier_medical ? res.status(200).json(dossier_medical) : res.status(404).json({ message: "Dossier_medical de ce patient non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/dossier_medical/:id_dossier_medical', async (req, res) => {
    try {
        const updatedDossier_medical = await Dossier_medical.updateDossier_medical(req.params.id_dossier_medical, req.body);
        res.status(200).json({ updatedDossier_medical });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/dossier_medical/:id_dossier_medical', async (req, res) => {
    try {
        await Dossier_medical.deleteDossier_medical(req.params.id_dossier_medical);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//Endpoint rendez_vous

app.post('/rendez_vous', async (req, res) => {
    try {
        const newRendez_vous = await Rendez_vous.createRendez_vous(req.body);
        res.status(201).json({ newRendez_vous });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/rendez_vous', async (req, res) => {
    try {
        const rendez_vous = await Rendez_vous.getAllRendez_vous();
        res.status(200).json(rendez_vous);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/rendez_vous/:id_rendez_vous', async (req, res) => {
    try {
        const rendez_vous = await Rendez_vous.getRendez_vousById(req.params.id_rendez_vous);
        rendez_vous ? res.status(200).json(rendez_vous) : res.status(404).json({ message: "Rendez-vous non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/rendez_vous/patient/:id_patient', async (req, res) => {
    try {
        const rendez_vous = await Rendez_vous.getRendez_vousByIdPatient(req.params.id_patient);
        rendez_vous ? res.status(200).json(rendez_vous) : res.status(404).json({ message: "Rendez-vous du patient non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/rendez_vous/soignant/:id_soignant', async (req, res) => {
    try {
        const rendez_vous = await Rendez_vous.getRendez_vousByIdSoignant(req.params.id_soignant);
        rendez_vous ? res.status(200).json(rendez_vous) : res.status(404).json({ message: "Rendez-vous du soignant non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/rendez_vous/:id_rendez_vous', async (req, res) => {
    try {
        const updatedRendez_vous = await Rendez_vous.updateRendez_vous(req.params.id_rendez_vous, req.body);
        res.status(200).json({ updatedRendez_vous });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/rendez_vous/:id_rendez_vous', async (req, res) => {
    try {
        await Rendez_vous.deleteRendez_vous(req.params.id_rendez_vous);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//Endpoint facturation

app.post('/facturation', async (req, res) => {
    try {
        const newFacturation = await Facturation.createFacturation(req.body);
        res.status(201).json({ newFacturation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/facturation', async (req, res) => {
    try {
        const facturation = await Facturation.getAllFacturation();
        res.status(200).json(facturation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/facturation/:id_facturation', async (req, res) => {
    try {
        const facturation = await Facturation.getFacturationById(req.params.id_facturation);
        facturation ? res.status(200).json(facturation) : res.status(404).json({ message: "Facturation non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/facturation/rendez_vous/:id_rendez_vous', async (req, res) => {
    try {
        const facturation = await Facturation.getFacturationByIdRendez_vous(req.params.id_rendez_vous);
        facturation ? res.status(200).json(facturation) : res.status(404).json({ message: "Facturation du rendez-vous non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/facturation/:id_facturation', async (req, res) => {
    try {
        const updatedFacturation = await Facturation.updateFacturation(req.params.id_facturation, req.body);
        res.status(200).json({ updatedFacturation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/facturation/:id_facturation', async (req, res) => {
    try {
        await Facturation.deleteFacturation(req.params.id_facturation);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//Endpoint historique_medicale

app.post('/historique_medicale', async (req, res) => {
    try {
        const newHistorique_medicale = await Historique_medicale.createHistorique_medicale(req.body);
        res.status(201).json({ newHistorique_medicale });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/historique_medicale', async (req, res) => {
    try {
        const historique_medicale = await Historique_medicale.getAllHistorique_medicale();
        res.status(200).json(historique_medicale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/historique_medicale/:id_historique_medicale', async (req, res) => {
    try {
        const historique_medicale = await Historique_medicale.getHistorique_medicaleById(req.params.id_historique_medicale);
        historique_medicale ? res.status(200).json(historique_medicale) : res.status(404).json({ message: "Historique médicale non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/historique_medicale/dossier_medical/:id_dossier_medical', async (req, res) => {
    try {
        const historique_medicale = await Historique_medicale.getHistorique_medicaleByIdDossier_medical(req.params.id_dossier_medical);
        historique_medicale ? res.status(200).json(historique_medicale) : res.status(404).json({ message: "Historique médicale du dossier médical non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/historique_medicale/:id_historique_medicale', async (req, res) => {
    try {
        const updatedHistorique_medicale = await Historique_medicale.updateHistorique_medicale(req.params.id_historique_medicale, req.body);
        res.status(200).json({ updatedHistorique_medicale });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/historique_medicale/:id_historique_medicale', async (req, res) => {
    try {
        await Historique_medicale.deleteHistorique_medicale(req.params.id_historique_medicale);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//Endpoint synthese_medicale

app.post('/synthese_medicale', async (req, res) => {
    try {
        const newSynthese_medicale = await Synthese_medicale.createSynthese_medicale(req.body);
        res.status(201).json({ newSynthese_medicale });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/synthese_medicale', async (req, res) => {
    try {
        const synthese_medicale = await Synthese_medicale.getAllSynthese_medicale();
        res.status(200).json(synthese_medicale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/synthese_medicale/:id_synthese_medicale', async (req, res) => {
    try {
        const synthese_medicale = await Synthese_medicale.getSynthese_medicaleById(req.params.id_synthese_medicale);
        synthese_medicale ? res.status(200).json(synthese_medicale) : res.status(404).json({ message: "Synthese médicale non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/synthese_medicale/dossier_medical/:id_dossier_medical', async (req, res) => {
    try {
        const synthese_medicale = await Synthese_medicale.getSynthese_medicaleByIdDossier_medical(req.params.id_dossier_medical);
        synthese_medicale ? res.status(200).json(synthese_medicale) : res.status(404).json({ message: "Synthese médicale du dossier médical non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/synthese_medicale/type_synthese_medicale/:id_type_synthese_medicale', async (req, res) => {
    try {
        const synthese_medicale = await Synthese_medicale.getSynthese_medicaleByIdType_synthese_medicale(req.params.id_type_synthese_medicale);
        synthese_medicale ? res.status(200).json(synthese_medicale) : res.status(404).json({ message: "Synthese médicale du type synthèse médicale non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/synthese_medicale/:id_synthese_medicale', async (req, res) => {
    try {
        const updatedSynthese_medicale = await Synthese_medicale.updateSynthese_medicale(req.params.id_synthese_medicale, req.body);
        res.status(200).json({ updatedSynthese_medicale });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/synthese_medicale/:id_synthese_medicale', async (req, res) => {
    try {
        await Synthese_medicale.deleteSynthese_medicale(req.params.id_synthese_medicale);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Endpoints message

app.post('/message', async (req, res) => {
    try {
        const newMessage = await Message.createMessage(req.body);
        res.status(201).json({ newMessage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/message', async (req, res) => {
    try {
        const messages = await Message.getAllMessage();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/message/:id_message', async (req, res) => {
    try {
        const message = await Message.getMessageById(req.params.id_message);
        message ? res.status(200).json(message) : res.status(404).json({ message: "Message non trouvé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/message/:id_message', async (req, res) => {
    try {
        const updatedMessage = await Message.updateMessage(req.params.id_message, req.body);
        res.status(200).json({ updatedMessage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/message/:id_message', async (req, res) => {
    try {
        await Message.deleteMessage(req.params.id_message);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});