import React from "react";
import './LinkButton.css';

const LinkButton = ({ 
    link = "", 
    text = "Bouton", 
    target = "_self", 
    className = "", 
    color = "var(--text-color)", 
    backgroundColor = "var(--background-color2)"
}) => {

    const style = {
        color: color,
        backgroundColor: backgroundColor,
    };

    return (
        <a 
            href={link}
            target={target}
            className={`linkButton ${className}`}
            style={style}
        >
            {text}
        </a>
    );
};

export default LinkButton;


// import React from "react";
// import PropTypes from 'prop-types';

// import './LinkButton.css';
// import '../../index.css';

// const LinkButton = ({ link, className, title, color, backgroundColor }) => {
//     const style = {
//         color: color,
//         backgroundColor: backgroundColor,
//     };

//     return (
//         <a href={link} className={`linkButton ${className}`} style={style}>
//             {title}
//         </a>
//     );
// };

// LinkButton.propTypes = {
//     link: PropTypes.string.isRequired,
//     className: PropTypes.string,
//     title: PropTypes.string.isRequired,
//     color: PropTypes.string,
//     backgroundColor: PropTypes.string,
// };

// LinkButton.defaultProps = {
//     className: '',
//     color: 'var(--text-color)',
//     backgroundColor: 'var(--background-color2)',
// };

// export default LinkButton;