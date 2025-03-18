import React, { useState } from "react";
import './Project.css';
import './common.css';

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleProjectClick = (project, index) => {
    setSelectedProject(project);
    setCurrentIndex(index);
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <section id="projects">
      <div className="container" data-aos="fade-up">
        <div className="heading-container">
          <h2 className="projects-heading section-heading">Projects</h2>
        </div>
        <div className="row">
          {projects.map((project, index) => (
            <div key={index} className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay={index * 100}>
              <div
                className="project-card h-100"
                style={{
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onClick={() => handleProjectClick(project, index)}
              >
                <img src={project.image} className="project-image" alt={project.title} />
                <div className="card-body d-flex flex-column p-4">
                  <h5 className="project-title">{project.title}</h5>
                  <p className="project-description flex-grow-1">{project.description}</p>
                  <div>
                    <a 
                      href={project.link} 
                      className="project-link" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProject(null)}>&times;</button>
            <div className="modal-content">
              <img src={selectedProject.image} className="modal-image" alt={selectedProject.title} />
              <div className="modal-text">
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.details}</p>
                <a 
                  href={selectedProject.link}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              </div>
            </div>
            <div className="modal-navigation">
              <span onClick={handlePrevious} style={{ cursor: 'pointer', marginRight: '10px' }}>
                &lt; {currentIndex + 1} / {projects.length}
              </span>
              <span onClick={handleNext} style={{ cursor: 'pointer' }}>
                &gt;
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
