import React from 'react';
import {homeHeroImages} from "../constants/data.ts";
import HeroCarousel from "./Carousel.tsx";

const Hero: React.FC = () => {
    const url: string = homeHeroImages[0];

    return (
        <div className="w-full h-full">
            {/*<img src={url} alt="Hero Image"/>*/}
            <HeroCarousel/>
            
        </div>
    );
};
export default Hero;
