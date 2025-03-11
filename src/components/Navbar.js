import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; // Import custom CSS
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const elementPosition = element.offsetTop - navbarHeight - 20;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top py-4">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">SAI R.KONDA</a>
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link custom-hover" href="#" onClick={(e) => { e.preventDefault(); handleScroll("HeroSection"); }}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="#" onClick={(e) => { e.preventDefault(); handleScroll("about"); }}>About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="#" onClick={(e) => { e.preventDefault(); handleScroll("skillsSection"); }}>Skills</a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="#" onClick={(e) => { e.preventDefault(); handleScroll("projects"); }}>Projects</a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="#" onClick={(e) => { e.preventDefault(); handleScroll("contact"); }}>Contact</a>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
