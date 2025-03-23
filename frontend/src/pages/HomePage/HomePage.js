import React from 'react';
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import AdvantageSection from '../../components/AdvantagesSection/AdvantagesSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import FooterSection from '../../components/FooterSection/FooterSection';

const HomePage = () => {
    return (
        <div>
            <Header />
            <main>
                <HeroSection />
                <AdvantageSection />
                <ContactSection />
            </main>
            <FooterSection />
        </div>
    );
};

export default HomePage;
