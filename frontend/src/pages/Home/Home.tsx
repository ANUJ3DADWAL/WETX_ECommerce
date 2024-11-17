import React from 'react';
import Hero from "../../components/Hero.tsx";
import HeroSection from '../../components/HeroSection.tsx';
import DigitalSection from '../../components/DigitalSection.tsx';
import ProductSection from '../../components/ProductSection.tsx';
import ContactUs from '../../components/ContactUs.tsx';
const Home: React.FC = () => {
    return (
        <div>
            <Hero/>
        <HeroSection></HeroSection>
    {/* Digital Section */}
        <DigitalSection></DigitalSection>
{/* Product Section */}
        <ProductSection></ProductSection>
{/* Contact Us */}
        <ContactUs></ContactUs>
        
        </div>
    );
};

export default Home;
