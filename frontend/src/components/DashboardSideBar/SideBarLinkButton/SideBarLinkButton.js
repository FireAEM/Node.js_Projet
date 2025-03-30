import React from "react";
import { Link } from "react-router-dom";
import './SideBarLinkButton.css';

const SideBarLinkButton = ({ 
    link = "", 
    text = "Bouton", 
    image = "/images/logo_clair.png",
    target = "_self", 
    className = "",
    border,
    children
}) => {
    const style = {
        ...(border && { border: border }),
    };

    return (
        <Link
            to={link}
            target={target}
            className={`sideBarLinkButton ${className}`}
            style={style}
        >   
            <img src={image} alt={text} />
            {children ? children : <p>{text}</p>}
        </Link>
    );
};

export default SideBarLinkButton;
