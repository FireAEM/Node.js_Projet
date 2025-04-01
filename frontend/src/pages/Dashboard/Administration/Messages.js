import React, { useState, useEffect } from 'react';

import './Messages.css';

import Message from '../../../components/DashboardComponents/Administration/Message';


const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Récupérer tous les messages depuis l'API
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch("http://localhost:3000/message");
                if (res.ok) {
                    const data = await res.json();
                    setMessages(data);
                } else {
                    console.error("Erreur lors de la récupération des messages");
                }
            } catch (error) {
                console.error("Erreur :", error);
            }
        };

        fetchMessages();
    }, []);

    const filteredMessages = messages.filter(msg => {
        const nom = msg.nom.toLowerCase();
        const prenom = msg.prenom.toLowerCase();
        const query = searchQuery.toLowerCase();
        return nom.includes(query) || prenom.includes(query);
    });

    return (
        <div className="messagesPage">
            <h1>Messages</h1>
            
            <div className="dashboardSearch">
                <input 
                    type="text" 
                    placeholder="Recherche..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img src="/images/recherche.png" alt="Recherche" />
            </div>

            <div className="messages">
                {filteredMessages.length > 0 ? (
                    filteredMessages.map((msg) => (
                        <Message 
                            key={msg.id_message}
                            lastName={msg.nom}
                            firstName={msg.prenom}
                            email={msg.email}
                            message={msg.message}
                        />
                    ))
                ) : (
                    <p>Aucun message trouvé</p>
                )}
            </div>
        </div>
    );
};

export default Messages;
