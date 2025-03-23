import React from "react";
import './IconInformation.css';

const IconInformation = ({ 
    image = "/images/logo.png",
    imageAlt = "Image",
    texts = ["Information"]
}) => {
    return (
        <div className="iconInformation">
            <div>
                <img src={image} alt={imageAlt}></img>
            </div>
            <p>{texts.join(" ")}</p>
        </div>
    );
};

export default IconInformation;