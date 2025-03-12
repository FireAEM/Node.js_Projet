const express = require('express');
const Utilisateur = require('./models/utilisateur');
const Patient = require('./models/patient');
const Administration = require('./models/administration');
const Specialite = require('./models/specialite');
const Type_etablissement = require('./models/type_etablissement');
const Type_synthese_medicale = require('./models/type_synthese_medicale');
const Mode_de_paiement = require('./models/mode_de_paiement');
const Etablissement = require('./models/etablissement');

const Assurance_sante = require('./models/assurance_sante');
require('dotenv').config();

const app = express();
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



// Endpoints administration

app.post('/administration', async (req, res) => {
    try {
        const newAdministration = await Administration.createAdmin(req.body);
        res.status(201).json({ newAdministration });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/administration', async (req, res) => {
    try {
        const administration = await Administration.getAllAdmin();
        res.status(200).json(administration);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/administration/:id_administration', async (req, res) => {
    try {
        const administration = await Administration.getAdminById(req.params.id_administration);
        administration ? res.status(200).json(administration) : res.status(404).json({ message: "Administration non trouvé" });
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



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});