import React from "react";

import './Advantage.css';


const Advantage = ({
    image = "/images/logo.png",
    title = "Avantage",
    description = "Description",
}) => {
    return (
        <div className="advantageItem">
            <div><img src={image} alt={title}></img></div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default Advantage;