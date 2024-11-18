import React from "react";

const HeroSection = () => {
  return (
    <div>
<section className="product-section py-16">
    
    {/* Title Section */}
    <div className="container mx-auto text-center">
      
      <h2 className="text-4xl font-bold leading-relaxed text-gray-800">
        Exceptionally designed <br /> products for your home
      </h2>
      <hr className="w-1/4 mx-auto my-6 border-t-2 border-gray-400" />
    </div>

    {/* Product Cards */}
    <div className="container mx-auto mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="card-box bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl">
          <img
            src="https://www.aquantindia.com/images/Aquant-Pune-Display-Showroom-1.jpg"
            alt="Style"
            className="mx-auto mb-6 rounded-md w-48"
          />
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Style</h3>
          <p className="text-gray-600 mb-6">
            Hunky dory barney fanny around up the duff no biggie loo cup of tea jolly good ruddy say arse!
          </p>
          <div className="flex justify-center">
            <a
              href="#service"
              className="icon-span flex justify-center items-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card-box bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl">
          <img
            src="https://www.aquantindia.com/images/Aquant-4-Finish-Options-Faucets-1-491x800.jpg"
            alt="Innovation"
            className="mx-auto mb-6 rounded-md w-48"
          />
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Innovation</h3>
          <p className="text-gray-600 mb-6">
            Hunky dory barney fanny around up the duff no biggie loo cup of tea jolly good ruddy say arse!
          </p>
          <div className="flex justify-center">
            <a
              href="#service"
              className="icon-span flex justify-center items-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card-box bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl">
          <img
            src="https://www.aquantindia.com/images/Aquant-BlackRose-Gold-WCBasins-491x800.jpg"
            alt="Leadership"
            className="mx-auto mb-6 rounded-md w-48"
          />
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Leadership</h3>
          <p className="text-gray-600 mb-6">
            Hunky dory barney fanny around up the duff no biggie loo cup of tea jolly good ruddy say arse!
          </p>
          <div className="flex justify-center">
            <a
              href="#service"
              className="icon-span flex justify-center items-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
    </div>
  );
};

export default HeroSection;