INSERT INTO role (nom) VALUES 
('Administrateur'),
('Soignant'),
('Patient');

INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, id_role) VALUES 
('Dupont', 'Jean', 'jean.dupont@example.com', 'hashed_password1', 1),
('Martin', 'Sophie', 'sophie.martin@example.com', 'hashed_password2', 2),
('Durand', 'Paul', 'paul.durand@example.com', 'hashed_password3', 3);

INSERT INTO type_etablissement (nom) VALUES 
('Hôpital'),
('Clinique'),
('Cabinet médical');

INSERT INTO etablissement (nom, adresse, heure_ouverture, heure_fermeture, jours_ouverture, id_type_etablissement) VALUES 
('Hôpital Saint-Louis', '1 Avenue Claude Vellefaux, Paris', '08:00:00', '20:00:00', ARRAY[1,2,3,4,5], 1),
('Clinique Pasteur', '32 Rue de Rivoli, Paris', '09:00:00', '19:00:00', ARRAY[1,2,3,4,5,6], 2),
('Cabinet Médical des Champs', '124 Avenue des Champs-Élysées, Paris', '10:00:00', '18:00:00', ARRAY[1,2,3,4,5], 3);

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

INSERT INTO soignant (rpps, id_etablissement, id_utilisateur) VALUES 
(123456789, 1, 2);

INSERT INTO patient (sexe, date_de_naissance, id_utilisateur) VALUES 
('Féminin', '1992-11-23', 3);

INSERT INTO dossier_medical (id_patient) VALUES 
(1);

INSERT INTO rendez_vous (dateheure, statut, id_soignant, id_patient) VALUES 
('2025-03-20 10:00:00+01', 'Confirmé', 1, 1);

INSERT INTO facturation (montant, id_mode_de_paiement, id_rendez_vous, id_assurance_sante) VALUES 
(150.00, 1, 1, 1);

INSERT INTO historique_medicale (titre, date_historique, description, id_soignant, id_dossier_medical) VALUES 
('Examen sanguin complet', '2023-02-15', 'Résultats : Cholestérol élevé et glycémie normale.', 1, 1);

INSERT INTO synthese_medicale (titre, description, id_soignant, id_dossier_medical, id_type_synthese_medicale) VALUES 
('Allergies connues', 'Patient allergique à la pénicilline. Aucun traitement récent en cours.', 1, 1, 1);

INSERT INTO soignant_specialite (id_soignant, id_specialite) VALUES 
(1, 1);

INSERT INTO message (nom, prenom, email, message) VALUES
('Durand', 'Sophie', 'sophie.durand@exemple.fr', 'Bonjour, je rencontre un problème pour planifier un rendez-vous.'),
('Bernard', 'Lucas', 'lucas.bernard@exemple.fr', 'Je ne parviens pas à accéder à mon compte, que dois-je faire ?'),
('Petit', 'Emma', 'emma.petit@exemple.fr', 'Le médecin a annulé mon rendez-vous, puis-je en réserver un autre rapidement ?');