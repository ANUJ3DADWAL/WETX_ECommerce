import React from 'react';

const ProductSection: React.FC = () => {
    return (
        <div>
            <section className="p-12 text-center bg-gray-900">
                <h2 className="text-3xl font-bold mb-8 text-white">OUR PRODUCTS</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {[
                        {src: "./images/p1.jpg", label: "Bath Accessories"},
                        {src: "./images/p2.jpg", label: "Faucets"},
                        {src: "./images/p3.jpg", label: "Kitchen Sink"},
                    ].map((item, index) => (
                        <div key={index} className="relative w-72">
                            <img
                                src={item.src}
                                alt={item.label}
                                className="w-full h-100 object-cover border border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                            />
                            <div
                                className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProductSection;
