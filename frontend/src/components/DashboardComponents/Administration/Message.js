import React from "react";

import './Message.css';


const Message = ({
    lastName = "Nom",
    firstName = "Prénom",
    email = "Email",
    message = "Message",
}) => {
    return (
        <div className="messageItem">
            <div>
                <h2>{lastName} {firstName}</h2>
                <a href={`mailto:${email}`}>{email}</a>
            </div>
            <p>{message}</p>
        </div>
    );
};

export default Message;