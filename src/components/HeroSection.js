import React from "react";
import "./HeroSection.css"; // Create this file for styling
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {

  const handleScroll = (id) => {
    const element = document.getElementById("skillsSection");
    if (element) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const elementPosition = element.offsetTop - navbarHeight - 20; // Offset adjustment
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  return (
    <header id="HeroSection" className="hero-section d-flex align-items-center">
      <div className="container-fluid text-white">
        <h1 className="hero-title">SAI R.KONDA</h1>
        <div className="developer-text">
          <span>I AM A</span>
          <TypeAnimation
            sequence={[
              'FULL', // Types 'FULL'
              400, // Waits 0.4s
              'FULL-STACK', // Types 'FULL-STACK'
              400, // Waits 0.4s
              'FULL-STACK DEVELOPER', // Types 'FULL-STACK DEVELOPER'
              2000, // Waits 2s
              '', // Deletes everything
              400, // Waits 0.4s
              // Repeat
            ]}
            wrapper="span"
            speed={60}
            className="animated-text"
            repeat={Infinity}
          />
        </div>
        <button 
          onClick={handleScroll} 
          className="btn btn-success hero-button" 
          aria-label="View Services"
        >
          View Services
        </button>
      </div>
    </header>
  );
};

export default HeroSection;