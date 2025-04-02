import React from "react";
import './LinkButton.css';

const LinkButton = ({ 
    link = "", 
    text = "Bouton", 
    target = "_self", 
    className = "", 
    color = "var(--text-color)", 
    backgroundColor = "var(--background-color2)"
}) => {

    const style = {
        color: color,
        backgroundColor: backgroundColor,
    };

    return (
        <a 
            href={link}
            target={target}
            className={`linkButton ${className}`}
            style={style}
        >
            {text}
        </a>
    );
};

export default LinkButton;