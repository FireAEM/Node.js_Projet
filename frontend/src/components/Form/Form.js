import React from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import SelectField from "../SelectField/SelectField";
import "./Form.css";

const Form = ({ data, onSubmit }) => {
    return (
        <form className="form" onSubmit={onSubmit}>
            {data.fields.map((field, index) => {
                if (field.component && field.component === "select") {
                    return (
                        <SelectField
                            key={index}
                            label={field.label}
                            id={field.id}
                            name={field.id}
                            options={field.options || []}
                            required={field.required}
                            value={field.value || (field.multiple ? [] : "")}
                            onChange={field.onChange}
                            multiple={field.multiple}
                            size={field.size || 3}
                        />
                    );
                }
                return (
                    <InputField
                        key={index}
                        label={field.label}
                        type={field.type || "text"}
                        name={field.id}
                        required={field.required}
                        value={field.value || ""}
                        onChange={field.onChange}
                    />
                );
            })}
            
            {data.buttons.map((button, index) => (
                <Button
                    key={index}
                    text={button.textContent}
                    type={button.type || "button"}
                    className={button.class || ""}
                    onClick={button.onClick}
                    color={button.color}
                    backgroundColor={button.backgroundColor}
                />
            ))}
        </form>
    );
};

export default Form;
