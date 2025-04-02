CREATE TABLE role(
   id_role SERIAL PRIMARY KEY,
   nom VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE utilisateur(
   id_utilisateur SERIAL PRIMARY KEY,
   nom VARCHAR(255) NOT NULL,
   prenom VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL UNIQUE,
   mot_de_passe VARCHAR(1000) NOT NULL,
   id_role INT NOT NULL,
   FOREIGN KEY(id_role) REFERENCES role(id_role) ON DELETE CASCADE
);

CREATE TABLE specialite(
   id_specialite SERIAL PRIMARY KEY,
   nom VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE type_etablissement(
   id_type_etablissement SERIAL PRIMARY KEY,
   nom VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE type_synthese_medicale(
   id_type_synthese_medicale SERIAL PRIMARY KEY,
   nom VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE mode_de_paiement(
   id_mode_de_paiement SERIAL PRIMARY KEY,
   nom VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE assurance_sante(
   id_assurance_sante SERIAL PRIMARY KEY,
   nom VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE etablissement(
   id_etablissement SERIAL PRIMARY KEY,
   nom VARCHAR(255) NOT NULL,
   adresse VARCHAR(255) NOT NULL,
   heure_ouverture TIME NOT NULL,
   heure_fermeture TIME NOT NULL,
   jours_ouverture INTEGER[] NOT NULL,
   id_type_etablissement INT NOT NULL,
   FOREIGN KEY(id_type_etablissement) REFERENCES type_etablissement(id_type_etablissement)
);

CREATE TABLE soignant(
   id_soignant SERIAL PRIMARY KEY,
   rpps INT NOT NULL UNIQUE,
   id_etablissement INT NOT NULL,
   id_utilisateur INT NOT NULL UNIQUE,
   FOREIGN KEY(id_etablissement) REFERENCES etablissement(id_etablissement),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE
);

CREATE TABLE patient(
   id_patient SERIAL PRIMARY KEY,
   sexe VARCHAR(50) NOT NULL,
   date_de_naissance DATE NOT NULL,
   id_utilisateur INT NOT NULL UNIQUE,
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE
);

CREATE TABLE dossier_medical(
   id_dossier_medical SERIAL PRIMARY KEY,
   id_patient INT NOT NULL,
   FOREIGN KEY(id_patient) REFERENCES patient(id_patient) ON DELETE CASCADE
);

CREATE TABLE rendez_vous(
   id_rendez_vous SERIAL PRIMARY KEY,
   dateheure TIMESTAMPTZ NOT NULL,
   statut VARCHAR(50) NOT NULL,
   id_soignant INT NOT NULL,
   id_patient INT NOT NULL,
   FOREIGN KEY(id_soignant) REFERENCES soignant(id_soignant) ON DELETE CASCADE,
   FOREIGN KEY(id_patient) REFERENCES patient(id_patient) ON DELETE CASCADE
);

CREATE TABLE facturation(
   id_facturation SERIAL PRIMARY KEY,
   montant NUMERIC(10, 2) NOT NULL,
   id_mode_de_paiement INT NOT NULL,
   id_rendez_vous INT NOT NULL UNIQUE,
   id_assurance_sante INT,
   FOREIGN KEY(id_mode_de_paiement) REFERENCES mode_de_paiement(id_mode_de_paiement),
   FOREIGN KEY(id_rendez_vous) REFERENCES rendez_vous(id_rendez_vous) ON DELETE CASCADE,
   FOREIGN KEY(id_assurance_sante) REFERENCES assurance_sante(id_assurance_sante)
);

CREATE TABLE historique_medicale(
   id_historique_medicale SERIAL PRIMARY KEY,
   titre VARCHAR(255) NOT NULL,
   date_historique DATE NOT NULL,
   description TEXT NOT NULL,
   id_soignant INT NOT NULL,
   id_dossier_medical INT NOT NULL,
   FOREIGN KEY(id_soignant) REFERENCES soignant(id_soignant),
   FOREIGN KEY(id_dossier_medical) REFERENCES dossier_medical(id_dossier_medical) ON DELETE CASCADE
);

CREATE TABLE synthese_medicale(
   id_synthese_medicale SERIAL PRIMARY KEY,
   titre VARCHAR(255) NOT NULL,
   description TEXT NOT NULL,
   id_soignant INT NOT NULL,
   id_dossier_medical INT NOT NULL,
   id_type_synthese_medicale INT NOT NULL,
   FOREIGN KEY(id_soignant) REFERENCES soignant(id_soignant),
   FOREIGN KEY(id_dossier_medical) REFERENCES dossier_medical(id_dossier_medical) ON DELETE CASCADE,
   FOREIGN KEY(id_type_synthese_medicale) REFERENCES type_synthese_medicale(id_type_synthese_medicale)
);

CREATE TABLE soignant_specialite(
   id_soignant INT,
   id_specialite INT,
   PRIMARY KEY(id_soignant, id_specialite),
   FOREIGN KEY(id_soignant) REFERENCES soignant(id_soignant) ON DELETE CASCADE,
   FOREIGN KEY(id_specialite) REFERENCES specialite(id_specialite) ON DELETE CASCADE
);

CREATE TABLE message(
   id_message SERIAL PRIMARY KEY,
   nom VARCHAR(255) NOT NULL,
   prenom VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   message TEXT NOT NULL
);