import React from "react";
import './InputField.css';

const InputField = ({
    label = "Champ",
    type = "text",
    name = "",
    required = false,
    value = "",
    onChange
}) => {
    return (
        <div className="formField inputField">
            <label htmlFor={name}>{label}</label>
            <input 
                id={name}
                type={type}
                name={name}
                placeholder={label}
                required={required}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default InputField;