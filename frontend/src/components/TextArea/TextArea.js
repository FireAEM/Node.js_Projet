import React from "react";
import './TextArea.css';

const TextArea = ({ 
    label = "Texte", 
    name = "",
    value = "", 
    onChange, 
    rows = 5, 
    required = false 
}) => {
    return (
        <div className="textArea">
            <label htmlFor={name}>{label}</label>
            <textarea 
                id={name}
                name={name}
                placeholder={label}
                value={value}
                onChange={onChange}
                rows={rows}
                required={required}
            />
        </div>
    );
};

export default TextArea;