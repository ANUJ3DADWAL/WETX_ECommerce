import React from 'react';
import Hero from "../../components/Hero.tsx";
import HeroSection from '../../components/HeroSection.tsx';
import DigitalSection from '../../components/DigitalSection.tsx';
import ProductSection from '../../components/ProductSection.tsx';

const Home: React.FC = () => {
    return (
        <div>
            <Hero/>
            <HeroSection/>
            <DigitalSection/>
            <ProductSection/>
        </div>
    );
};

export default Home;
