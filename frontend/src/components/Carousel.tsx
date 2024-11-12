// import React from 'react';
//
// const Carousel: React.FC = () => {
//     return (
//         <div>Carousel</div>
//     );
// };
// export default Carousel;
import React, {useState, useEffect} from 'react';
import {homeHeroImages} from '../constants/data';

const Carousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % homeHeroImages.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + homeHeroImages.length) % homeHeroImages.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % homeHeroImages.length);
    };

    return (
        <div className="relative w-full h-[40rem] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-between z-10">
                <button onClick={prevSlide} className="p-6 bg-neutral-600 shadow bg-opacity-90 text-white">
                    &#10094;
                </button>
                <button onClick={nextSlide} className="p-6 bg-neutral-600 shadow bg-opacity-90 text-white">
                    &#10095;
                </button>
            </div>
            <div className="h-full flex transition-transform duration-500"
                 style={{transform: `translateX(-${currentIndex * 100}%)`}}>
                {homeHeroImages.map((image, index) => (
                    <img key={index} src={image} alt={`Slide ${index}`}
                         className="w-full h-full object-cover object-center flex-shrink-0"/>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
