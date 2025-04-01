import React from "react";
import './IconInformation.css';

const IconInformation = ({ 
    image = "/images/logo.png",
    imageAlt = "Image",
    text = "Information"
}) => {
    return (
        <div className="iconInformation">
            <div>
                <img src={image} alt={imageAlt}></img>
            </div>
            <p>{text}</p>
        </div>
    );
};

export default IconInformation;