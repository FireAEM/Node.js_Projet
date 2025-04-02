import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../components/Form/Form';
import Button from '../../../components/Button/Button';
import { AuthContext } from '../../../context/AuthContext';
import './Etablissement.css';

const Etablissement = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [soignantData, setSoignantData] = useState(null);
  const [etablissementData, setEtablissementData] = useState(null);
  const [typeOptions, setTypeOptions] = useState([]);

  const [formData, setFormData] = useState({
    nom: "",
    adresse: "",
    heure_ouverture: "",
    heure_fermeture: "",
    jours_ouverture: "", // sous forme de chaîne, ex: "1,2,3,4,5"
    id_type_etablissement: ""
  });
  const [message, setMessage] = useState("");

  // Récupérer les infos du soignant pour obtenir id_etablissement
  useEffect(() => {
    const fetchSoignantData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/soignant/utilisateur/${user.id_utilisateur}`);
        if (res.ok) {
          const data = await res.json();
          setSoignantData(data);
        } else {
          console.error("Erreur lors de la récupération du soignant");
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    fetchSoignantData();
  }, [user.id_utilisateur]);

  // Quand soignantData est disponible, charger l'établissement correspondant
  useEffect(() => {
    if (soignantData && soignantData.id_etablissement) {
      const fetchEtablissementData = async () => {
        try {
          const res = await fetch(`http://localhost:3000/etablissement/${soignantData.id_etablissement}`);
          if (res.ok) {
            const data = await res.json();
            setEtablissementData(data);
            setFormData({
              nom: data.nom || "",
              adresse: data.adresse || "",
              heure_ouverture: data.heure_ouverture || "",
              heure_fermeture: data.heure_fermeture || "",
              // Convertir l'array en chaîne de nombres séparés par une virgule
              jours_ouverture: data.jours_ouverture ? data.jours_ouverture.join(",") : "",
              id_type_etablissement: data.id_type_etablissement ? data.id_type_etablissement.toString() : ""
            });
          } else {
            console.error("Erreur lors de la récupération de l'établissement");
          }
        } catch (error) {
          console.error("Erreur :", error);
        }
      };
      fetchEtablissementData();
    }
  }, [soignantData]);

  // Récupérer les options de type d'établissement
  useEffect(() => {
    const fetchTypeOptions = async () => {
      try {
        const res = await fetch("http://localhost:3000/type_etablissement");
        if (res.ok) {
          const data = await res.json();
          const options = data.map(item => ({
            id: item.id_type_etablissement,
            nom: item.nom
          }));
          setTypeOptions(options);
        } else {
          console.error("Erreur lors de la récupération des types d'établissement");
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    fetchTypeOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Conversion du champ jours_ouverture (chaîne) en tableau de nombres
      const joursArray = formData.jours_ouverture
        .split(",")
        .map(s => parseInt(s.trim()))
        .filter(num => !isNaN(num));
      const payload = {
        nom: formData.nom,
        adresse: formData.adresse,
        heure_ouverture: formData.heure_ouverture,
        heure_fermeture: formData.heure_fermeture,
        jours_ouverture: joursArray,
        id_type_etablissement: parseInt(formData.id_type_etablissement)
      };
      const res = await fetch(`http://localhost:3000/etablissement/${soignantData.id_etablissement}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erreur lors de la mise à jour de l'établissement");
      }
      setMessage("Mise à jour réussie !");
    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
    }
  };

  const formConfig = {
    fields: [
      { id: "nom", label: "Nom", type: "text", value: formData.nom, onChange: handleChange, required: true },
      { id: "adresse", label: "Adresse", type: "text", value: formData.adresse, onChange: handleChange, required: true },
      { id: "heure_ouverture", label: "Heure d'ouverture", type: "time", value: formData.heure_ouverture, onChange: handleChange, required: true },
      { id: "heure_fermeture", label: "Heure de fermeture", type: "time", value: formData.heure_fermeture, onChange: handleChange, required: true },
      { id: "jours_ouverture", label: "Jours d'ouverture (ex: 1,2,3,...)", type: "text", value: formData.jours_ouverture, onChange: handleChange, required: true },
      { 
        id: "id_type_etablissement", 
        label: "Type d'établissement", 
        component: "select", 
        options: typeOptions, 
        value: formData.id_type_etablissement, 
        onChange: handleChange, 
        required: true,
        multiple: false 
      }
    ],
    buttons: [
      { textContent: "Enregistrer les modifications", type: "submit", class: "submitButton" }
    ]
  };

  return (
    <div className="etablissementPage">
      <h1>Etablissement</h1>
      <Form data={formConfig} onSubmit={handleSubmit} />
      {message && <p className='formMessage'>{message}</p>}
    </div>
  );
};

export default Etablissement;
