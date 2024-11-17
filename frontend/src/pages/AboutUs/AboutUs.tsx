import React from "react";

const AboutUs = () => {
  return (
    <main className="bg-black text-white font-sans">
      {/* About Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between p-12 border-b border-gray-800">
        <div className="lg:w-1/2 border-2 border-gray-700 p-8 text-center mx-4">
          <h1 className="text-4xl font-bold mb-4">ABOUT WETX</h1>
          <p className="font-semibold mb-4">Crafting Excellence in Sanitary Solutions</p>
          <p className="text-gray-400 text-left">
            Since 2008, we have been shaping the future of sanitary ware. Dedicated to quality and
            innovation, we provide timeless solutions for modern spaces. Our products combine
            elegance with functionality, ensuring they not only enhance the aesthetics of your
            spaces but also offer unmatched durability. At Wetx, we take pride in delivering
            cutting-edge designs that cater to evolving customer needs while maintaining a strong
            focus on sustainability.
          </p>
        </div>
        <div className="lg:w-1/2 mx-4">
          <img
            src="./images/img1.jpg"
            alt="About Wetx"
            className="w-full h-96 object-cover border border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          />
        </div>
      </section>

      {/* Legacy Section */}
      <section className="flex flex-col lg:flex-row-reverse items-center justify-between p-12 border-b border-gray-800">
      <div className="lg:w-1/2 border-2 border-gray-700 p-8 text-center mx-4">
          <h1 className="text-4xl font-bold mb-4">OUR LEGACY</h1>
          <p className="text-gray-400 text-left">
            Rooted in the vision of our founder, Malkeet Singh, Wetx began as a humble venture in
            Jalandhar, Punjab, and has grown into a trusted name across Himachal Pradesh,
            Uttarakhand, and parts of Jammu. For over a decade, we have dedicated ourselves to
            providing exceptional products that enhance lives and spaces.
          </p>
        </div>
        <div className="lg:w-1/2 mx-4">
          <img
            src="./images/img2.jpg"
            alt="Eco Products"
            className="w-full h-96 object-cover border border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="p-12 text-center">
        <h2 className="text-3xl font-bold mb-8">OUR PRODUCTS</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { src: "./images/p1.jpg", label: "Accessories" },
            { src: "./images/p2.jpg", label: "Faucets" },
            { src: "./images/p3.jpg", label: "Kitchen Sink" },
          ].map((item, index) => (
            <div key={index} className="relative w-72">
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-100 object-cover border border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              />
              <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
