import React from "react";
import './SelectField.css';

const SelectField = ({
    label = "Champ",
    id = "",
    options = [],
    name = "",
    required = false,
    value = [],
    onChange,
    multiple = false
}) => {
    return (
        <div className="formField selectField">
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                name={name}
                multiple={multiple}
                required={required}
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.nom}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectField;
