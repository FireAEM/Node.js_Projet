import React from "react";
import './IconLink.css';

const IconLink = ({ 
    image = "/images/logo.png",
    imageAlt = "Image",
    text = "Information",
    link = "",
    target= "_self"
}) => {
    return (
        <a href={link} target={target} className="iconLink">
            <div>
                <img src={image} alt={imageAlt}></img>
            </div>
            <p>{text}</p>
        </a>
    );
};

export default IconLink;