INSERT INTO type_etablissement (nom) VALUES 
('Hôpital'),
('Clinique'),
('Cabinet médical');

INSERT INTO role (nom) VALUES 
('Administrateur'),
('Soignant'),
('Patient');

INSERT INTO specialite (nom) VALUES 
('Cardiologie'),
('Dermatologie'),
('Pédiatrie');

INSERT INTO type_synthese_medicale (nom) VALUES 
('Allergie'),
('Traitement'),
('Suivi post-opératoire');

INSERT INTO mode_de_paiement (nom) VALUES 
('Carte bancaire'),
('Espèces'),
('Chèque');

INSERT INTO assurance_sante (nom) VALUES 
('Mutuelle Générale'),
('Caisse Primaire Assurance Maladie'),
('Allianz Santé');

INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, id_role) VALUES 
('Dupont', 'Jean', 'jean.dupont@example.com', 'hashed_password1', 1),
('Martin', 'Sophie', 'sophie.martin@example.com', 'hashed_password2', 2),
('Durand', 'Paul', 'paul.durand@example.com', 'hashed_password3', 3);

INSERT INTO etablissement (nom, adresse, heure_ouverture, heure_fermeture, jours_ouverture, id_type_etablissement) VALUES 
('Hôpital Saint-Louis', '1 Avenue Claude Vellefaux, Paris', '08:00:00', '20:00:00', ARRAY[1,2,3,4,5], 1),
('Clinique Pasteur', '32 Rue de Rivoli, Paris', '09:00:00', '19:00:00', ARRAY[1,2,3,4,5,6], 2),
('Cabinet Médical des Champs', '124 Avenue des Champs-Élysées, Paris', '10:00:00', '18:00:00', ARRAY[1,2,3,4,5], 3);

INSERT INTO soignant (rpps, id_etablissement, id_utilisateur) VALUES 
(123456789, 1, 2),
(987654321, 2, 1),
(456789123, 3, 3);

INSERT INTO patient (sexe, date_de_naissance, id_utilisateur) VALUES 
('Masculin', '1980-05-15', 1),
('Féminin', '1992-11-23', 2),
('Masculin', '2000-08-10', 3);

INSERT INTO dossier_medical (id_patient) VALUES 
(1),
(2),
(3);

INSERT INTO rendez_vous (dateheure, statut, id_soignant, id_patient) VALUES 
('2025-03-20 10:00:00+01', 'Confirmé', 1, 1),
('2025-03-21 11:30:00+01', 'Annulé', 2, 2),
('2025-03-22 09:00:00+01', 'En attente', 3, 3);

INSERT INTO facturation (montant, id_mode_de_paiement, id_rendez_vous, id_assurance_sante) VALUES 
(150.00, 1, 1, 1),
(80.00, 2, 2, 2),
(100.00, 3, 3, 3);

INSERT INTO historique_medicale (titre, date_historique, description, id_soignant, id_dossier_medical) VALUES 
('Examen sanguin complet', '2023-02-15', 'Résultats : Cholestérol élevé et glycémie normale.', 1, 1),
('Radiographie thoracique', '2023-07-10', 'Résultats : Aucune anomalie détectée.', 2, 2),
('Antécédent de fracture', '2022-05-25', 'Fracture de la cheville droite traitée par immobilisation.', 3, 3);

INSERT INTO synthese_medicale (titre, description, id_soignant, id_dossier_medical, id_type_synthese_medicale) VALUES 
('Allergies connues', 'Patient allergique à la pénicilline. Aucun traitement récent en cours.', 1, 1, 1),
('Suivi post-opératoire', 'Rétablissement complet après intervention chirurgicale. Aucun signe de complications.', 2, 2, 3),
('Traitement chronique', 'Patient sous traitement antihypertenseur. Bonne tolérance au traitement.', 3, 3, 2);

INSERT INTO soignant_specialite (id_soignant, id_specialite) VALUES 
(1, 1),
(2, 2),
(3, 3);