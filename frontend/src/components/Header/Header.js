import React from 'react';
import { Link } from 'react-router-dom';

import '../../index.css';
import './Header.css';

import LinkButton from '../LinkButton/LinkButton';


const Header = () => {
    return (
        <header>
            <Link to="/">
                <img src="/images/logo.png" alt="Square Logo" className="headerLogo" />
            </Link>

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
