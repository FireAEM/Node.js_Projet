import React from "react";
import './Button.css';

const Button = ({
    text = "Bouton",
    type = "button",
    onClick,
    className = "",
    color = "var(--button-text-color)", 
    backgroundColor = "var(--button-background)"
}) => {

    const style = {
        color: color,
        backgroundColor: backgroundColor,
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`button ${className}`}
            style={style}
        >
            {text}
        </button>
    );
};

export default Button;
