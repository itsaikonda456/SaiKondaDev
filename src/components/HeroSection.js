import React from "react";
import "./HeroSection.css"; // Create this file for styling

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
      <div className="container text-white">
        <h1 className="fw-bold">SAI R.KONDA</h1>
        <p>I AM A FULL-STACK DEVELOPER</p>
        <button onClick={handleScroll} className="btn btn-success w-15 px-3 py-2"   href="">View Services</button>
      </div>
    </header>
  );
};

export default HeroSection;
