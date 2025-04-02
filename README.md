# Doctolink - Node.js_Projet

Doctolink est une application médicale moderne développée avec Node.js, React.js et PostgreSQL. Ce projet combine un backend robuste et un frontend interactif pour offrir une expérience utilisateur fluide.  

---

## **Installation et Configuration**  

### **Pré-requis**  
- [Node.js](https://nodejs.org) et npm doivent être installés.  
- [PostgreSQL](https://www.postgresql.org) doit être configuré sur votre machine.  

---

### **Étapes pour lancer l’application**  

#### 1. **Cloner le projet**  
```bash
git clone https://github.com/FireAEM/Node.js_Projet
cd Node.js_Projet
```

#### 2. **Créer un fichier `.env` dans `/api`**  
Ajoutez les informations suivantes dans un fichier `.env` à la racine du dossier `/api` :  
```plaintext
DB_HOST=[à compléter]
DB_USER=[à compléter]
DB_PASSWORD=[à compléter]
DB_NAME=doctolink_nodejs
DB_PORT=5432
```

#### 3. **Installer les dépendances**  
- Backend :  
  ```bash
  cd api
  npm install
  ```  
- Frontend :  
  ```bash
  cd ../frontend
  npm install
  ```

#### 4. **Configurer la base de données**  
1. Ouvrez **pgAdmin 4** et connectez-vous à votre serveur PostgreSQL.  
2. Créez une base de données appelée `doctolink_nodejs` (ou utilisez le nom défini dans votre fichier `.env`).  
3. Créez les tables en exécutant le script `/bdd/doctolink.sql` dans le *Query Tool* de pgAdmin 4.  
   Si des erreurs surviennent, exécutez les tables une par une.  
4. **Facultatif** : Ajoutez les données de test en exécutant le script `/bdd/doctolink_data_test.sql`. Là encore, vous pouvez insérer les données table par table si nécessaire.  

#### 5. **Démarrer le backend**  
Assurez-vous d’être dans le dossier `/api` :  
```bash
cd ../api
node index.js
```

#### 6. **Démarrer le frontend**  
Passez au dossier `/frontend` et lancez l’application React :  
```bash
cd ../frontend
npm start
Y
```

#### 7. **Accéder à l’application**  
Ouvrez votre navigateur et rendez-vous à l’adresse suivante :  
```
http://localhost:3001
```

---

## **Technologies utilisées**  
- **Backend** : Node.js  
- **Frontend** : React.js  
- **Base de données** : PostgreSQL  