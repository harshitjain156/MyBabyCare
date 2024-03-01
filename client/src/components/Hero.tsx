import React from 'react';
import heroImage from "../assets/Hero-image.jpg";

const Hero: React.FC = () => {
  return (
    <section className="container hidden md:flex bg-cover bg-center border-4 bg-gray-800 items-center p-8" style={{backgroundImage: `url(${heroImage})`}}>
      <div className="text-gray-600 w-full h-[100%]"> 
        <h1 className="text-5xl font-bold mb-4">Welcome to BabyCare for busy mothers</h1>
        <p className="text-lg mb-6">When it comes to keeping your baby clean,<br/>there's a dizzying array of options to choose from, whether it's baby soaps, shampoos, or body washes.</p>
        {/* <a href="#services" className="btn"></a> */}
      </div>
    </section> 
  );
}

export default Hero;
