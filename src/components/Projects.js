import React, { useState } from "react";
import './Project.css';

import "bootstrap/dist/css/bootstrap.min.css";
import ecommerce from '../utilities/ecommerce.png';
import lamabooking from '../utilities/lamabooking.png';
import texttwister from '../utilities/texttwister.png';
import justspace from '../utilities/justspace.png';
import signpad from '../utilities/signpad.png';
import icoder from '../utilities/icoder.png';

const projects = [
  {
    title: "E-commerce web application",
    description: "An interactive e-commerce platform for enhanced shopping experiences.",
    details: "Developed a fully functional e-commerce web application that allows users to browse products, add them to their cart, and complete purchases seamlessly...",
    image: ecommerce,
    link: "https://github.com/itsaikonda456/80kShoes",
  },
  {
    title: "Lamabooking platform",
    description: "Lamabooking is a platform that serves both hotel reservation and real estate booking purposes.",
    details: "Lamabooking allows users to search and book hotels, offering real estate listings for properties...",
    image: lamabooking,
    link: "https://github.com/itsaikonda456/lamabooking",
  },
  {
    title: "TextTwister - TextEditor",
    description: "A versatile text editing tool for customizing and styling text content.",
    details: "TextTwister - TextEditor is a versatile tool that allows users to manipulate and customize their text in various ways...",
    image: texttwister,
    link: "https://github.com/itsaikonda456/TextTwist",
  },
  {
    title: "JustSpace: Your Gateway to Exploring the Universe",
    description: "JustSpace is an informative website dedicated to exploring the wonders of space.",
    details: "JustSpace is a website dedicated to space exploration, offering detailed information on celestial bodies, space missions, and astronomical events...",
    image: justspace,
    link: "https://github.com/itsaikonda456/justspace",
  },
  {
    title: "Digital Signature Pad",
    description: "A digital signature pad for capturing electronic signatures securely.",
    details: "Digital Signature Pad is an online tool allowing users to create, sign, and store digital signatures for documents...",
    image: signpad,
    link: "https://digitalsignaturepad.netlify.app/",
  },
  {
    title: "iCoderBlog: Tech, Coding, and Fun Insights",
    description: "A blog website featuring insightful and engaging content on technology and coding.",
    details: "iCoderBlog is a platform for tech enthusiasts to explore coding tutorials, industry insights, and engaging discussions...",
    image: icoder,
    link: "https://icoderblogs.netlify.app/",
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="container py-5" data-aos="fade-up">
      <h2 className="text-center fw-bold mb-4">Projects</h2>
      <div className="row projectcard-gap">
        {projects.map((project, index) => (
          <div key={index} className="col-md-4">
            <div
              className="card border-0 shadow-sm project-card h-100"
              onClick={() => setSelectedProject(project)}
            >
              <img src={project.image} className="card-img-top" alt={project.title} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{project.title}</h5>
                <p className="card-text flex-grow-1">{project.description}</p>
                <a href={project.link} className="text-decoration-none fw-bold" target="_blank" rel="noopener noreferrer">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
  <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
      <button className="close-btn" onClick={() => setSelectedProject(null)}>&times;</button>
      <div className="modal-content">
        {/* Image on Top */}
        <img src={selectedProject.image} className="modal-image img-fluid" alt={selectedProject.title} />
        
        {/* Text Below */}
        <div className="modal-text">
          <h5 className="fw-bold">{selectedProject.title}</h5>
          <p>{selectedProject.details}</p>
        </div>
      </div>
    </div>
  </div>
)}



      <style>
        {`
          .project-card {
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }
          .project-card:hover {
            transform: scale(1.05);
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
          }
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1050;
          }
          .modal-container {
            background: white;
            width: 60%;
            max-width: 900px;
            padding: 20px;
            border-radius: 10px;
            position: relative;
          }
          .close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            background: none;
            border: none;
            cursor: pointer;
          }
          .modal-content {
            display: flex;
            align-items: center;
            text-align: left;
          }
          .modal-image {
            width: 40%;
            margin-right: 20px;
          }
          .modal-text {
            flex: 1;
          }
          @media (max-width: 768px) {
            .modal-container {
              width: 90%;
            }
            .modal-content {
              flex-direction: column;
              text-align: center;
            }
            .modal-image {
              width: 80%;
              margin-bottom: 15px;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Projects;
