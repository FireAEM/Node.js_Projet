import React from 'react';

import '../../index.css';
import './Header.css';

import LinkButton from '../LinkButton/LinkButton';


const Header = () => {
    return (
        <header>
            <a href="">
                <img src="/images/logo.png" alt="Square Logo" className="headerLogo" />
            </a>

            <div className="headerContainer">
                <LinkButton
                    link=""
                    className="headerSoignantAccount"
                    text="🧑‍⚕️ Espace soignant"
                />

                <LinkButton
                    link=""
                    className="headerPatientAccount"
                    text="🧔 Compte"
                    color="white"
                    backgroundColor="black"
                />
            </div>
        </header>
    );
};

export default Header;
