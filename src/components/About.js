import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";
import abtImg from "../utilities/photo1.jpeg";

const About = () => {
  return (
    <section id="about" className="about-section container" data-aos="zoom-in">
      <div className="row align-items-center">
        {/* Left Text Section */}
        <div className="col-lg-6 ">
          <p className="about-subheading">WHO I AM</p>
          <h2 className="about-heading">Your trusted tech partner</h2>
          <p className="about-text">
            As a full-stack developer and AI expert based in Bhiwandi, I combine
            creativity with technical expertise to deliver innovative solutions.
            My journey through the tech world has equipped me with the skills
            to work on diverse projects, from web applications to machine
            learning models.
          </p>
          <p className="about-text">
            I am passionate about transforming ideas into reality, ensuring
            that every project I undertake meets the highest standards of
            quality and functionality. Let's collaborate to bring your vision
            to life!
          </p>
          <a href="#contact" className="about-link text-decoration-none text-dark">
            Get in touch
          </a>
        </div>

        {/* Right Image Section */}
        {/* https://img.freepik.com/free-photo/3d-illustration-young-businessman-with-eyeglasses-business-suit_1057-44638.jpg?t=st=1741257109~exp=1741260709~hmac=ebba24803ae4094f7b8f8dd1f85f88c5db960dbf8cefed2f5a593384240c06c9&w=500 */}
        <div className="col-lg-6  text-center about-image-container">
          <img
            src={abtImg}
            alt="Work Desk"
            className="img-fluid rounded about-image w-50"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
