import React from 'react';
import { features } from '../constant';


const FeatureSection = () => {
  return (
    <div>
    <div className="relative mt-20 border-b border-neutral-800 min-h-[800px]">
     <div className="flex flex-col items-center text-center">
  {/* Features badge */}
  <div className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium py-1 px-3 uppercase inline-block mx-auto">
    Feature
  </div>

  {/* Heading */}
  <h2 className="text-center text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 font-bold leading-tight">
    Book{" "}
    <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
      your Fertilizer
    </span>
  </h2>
</div>


      <div className="flex flex-wrap mt-10 lg:mt-20">
        {features.map((feature, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 mb-16 px-4">
            <div className="flex h-12 w-12 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full text-xl">
              {feature.icon}
            </div>
            <h5 className="mt-4 text-xl font-semibold text-white">{feature.text}</h5>
            <p className="text-md mt-2 text-neutral-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FeatureSection;
