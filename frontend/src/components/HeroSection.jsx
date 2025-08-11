import React from 'react'
import video1 from '../asset/video11.mp4';
import video2 from '../asset/video22.mp4';
import { Menu, X } from "lucide-react";
import { useState } from "react";


const HeroSection = () => {
  return (
    <div>
    <div className="flex flex-col items-center mt-6 lg:mt-20">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
            Virtual build tool 
            <span className='bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>{" "}for Farmer</span>
          </h1>
          <p className='mt-10 text-lg text-center text-neutral-500 max-w-4xl'>
           Empower rural growth and streamline fertilizer access with our smart distribution platform.
          Get started today and experience the future of transparent and efficient agricultural services.
          </p>
          <div className="flex justify-center my-10">
            <a href='#' className='bg-gradient-to-r from-orange-500 to bg-orange-800 py-3 px-4 mx-3 rounded-md'>
                take deep dive
            </a>

            <a href='#' className= 'py-3 px-4 mx-3 rounded-md'/>
          </div>

          <div className='flex mt-10 justify-center ml-8 mr-8'>
            <video autoPlay loop muted className='rounded-lg w-1/2 border-orange-700 shadow-orange-700 mx-2 my-4'>
              <source src={video1} type='video/mp4' />
              your browser does not support the video tag.
             </video>
               <video autoPlay loop muted className='bg-black rounded-lg w-1/2 border-orange-700 shadow-orange-700 mx-2 my-4'>
              <source src={video2} type='video/mp4'  />
              your browser does not support the video tag.
             </video>
          </div>
    </div>
    </div>
  )
}

export default HeroSection;
