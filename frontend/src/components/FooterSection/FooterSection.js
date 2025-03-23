import React from "react";
import './FooterSection.css';

const FooterSection = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="footerLinks">
                <div className="footerLogo">
                    <img src="/images/logo_clair.png" alt="Doctolink"></img>
                    <span>Doctolink</span>
                </div>
            </div>
            <div className="footerCopyright">
                <p>&copy; Doctolink {currentYear}</p>
            </div>
        </footer>
    );
};

export default FooterSection;