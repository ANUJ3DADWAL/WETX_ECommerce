import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white">
            {/* Contact Details */}
            {/*Optional: If you want to remove it, please do so. The .gif images are causing the page to lag when scrolling. */}
            <div className="py-10">
                <div className="container mx-auto px-5">
                    <div className="flex flex-wrap">
                        {/* Support Section */}
                        <div className="w-full lg:w-1/3 flex flex-col items-center text-center p-5">
                            <div className="bg-gray-700 rounded-full flex items-center justify-center w-20 h-20 mb-3">
                                <img
                                    src="/images/speaker.gif"
                                    alt="GIF Image"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p>Support: (+91) 1234 5678910</p>
                        </div>

                        {/* Gmail Section */}
                        <div className="w-full lg:w-1/3 flex flex-col items-center text-center p-5">
                            <div className="bg-gray-700 rounded-full flex items-center justify-center w-20 h-20 mb-3">
                                <img
                                    src="/images/phone.gif"
                                    alt="GIF Image"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p>Gmail: wetx_industries@gmail.com</p>
                        </div>

                        {/* Pin Code Section */}
                        <div className="w-full lg:w-1/3 flex flex-col items-center text-center p-5">
                            <div className="bg-gray-700 rounded-full flex items-center justify-center w-20 h-20 mb-3">
                                <img
                                    src="/images/map.gif"
                                    alt="GIF Image"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p>Pin Code: 144000451</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Links */}
            <div className="py-10 bg-gray-900 p-12">
                <div className="container mx-auto px-5">
                    <div className="flex flex-wrap">
                        {/* Stores */}
                        <div className="w-full md:w-1/6 mb-5 md:mb-0">
                            <h4 className="mb-3 text-lg font-semibold">Stores</h4>
                            <ul className="text-gray-400 space-y-2">
                                <li>Wetx Experience Centres</li>
                                <li>Find a Store</li>
                                <li>Dealership Enquiry</li>
                                <li>Our Story</li>
                            </ul>
                        </div>

                        {/* Help */}
                        <div className="w-full md:w-1/6 mb-5 md:mb-0">
                            <h4 className="mb-3 text-lg font-semibold">Help</h4>
                            <ul className="text-gray-400 space-y-2">
                                <li>Product Enquiry</li>
                                <li>Contact Us</li>
                                <li>Warranty</li>
                                <li>Product Registration</li>
                                <li>Privacy Policy</li>
                                <li>Terms of Service</li>
                            </ul>
                        </div>

                        {/* About */}
                        <div className="w-full md:w-1/6 mb-5 md:mb-0">
                            <h4 className="mb-3 text-lg font-semibold">About</h4>
                            <ul className="text-gray-400 space-y-2">
                                <li>16th Anniversary</li>
                                <li>Who We Are</li>
                                <li>Heritage</li>
                                <li>Social Impact</li>
                                <li>Sustainability</li>
                            </ul>
                        </div>

                        {/* Subscribe */}
                        <div className="w-full md:w-1/2">
                            <h4 className="mb-3 text-lg font-semibold">Subscribe</h4>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 rounded-l-lg border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none"
                                />
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="container mx-auto px-6 py-5 border-t border-gray-700">
                <div className="flex flex-wrap justify-between items-center">
                    {/* Copyright */}
                    <div className="text-gray-400 text-sm">
                        Copyright ©2024 All rights reserved.
                    </div>

                    {/* Social Media */}
                    <div className="flex space-x-5 mt-3 md:mt-0">
                        <a href="#" className="text-blue-400">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-green-500">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                        <a href="#" className="text-blue-300">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
