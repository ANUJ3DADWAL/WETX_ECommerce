import React from 'react';

const DigitalSection = () =>{
    return(
        <div>
                <section
      className="bg-fixed bg-cover bg-center bg-no-repeat py-24 overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(rgba(22,22,22,0.7), rgba(22,22,22,0.9)), url("https://images.pexels.com/photos/316093/pexels-photo-316093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          {/* Image Section */}
          <div className="hidden lg:block lg:w-1/2 relative">
            <figure className="relative">
              <img
                src="./images/finder2.jpg"
                alt="phone digital"
                className="w-[60%] h-auto"
              />
            </figure>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-white">
            <h1 className="font-bold text-4xl lg:text-5xl mb-6">
              Steps to Create a <br />
              Successful Digital Presence for Sanitaryware Products
            </h1>
            <p className="mt-3 mb-5 text-light-grey leading-relaxed">
              Step into the world of Kohler at our Experience Centres. Explore our
              exquisite products, plan your projects, and stay updated with the latest
              in design and innovation.
              <br />
              <br />
              Experience the pinnacle of luxury firsthand.
            </p>
            <div className="text-center w-full lg:text-left">
              <button
                className="btn bg-blue-500 text-white px-5 py-2 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
                data-bs-toggle="tooltip"
                data-bs-title="Default tooltip"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
</section>
        </div>
    );
};
export default DigitalSection;