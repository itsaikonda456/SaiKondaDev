import React from "react";
import { ProgressBar, Card, Button } from "react-bootstrap";
import "./SkillsSection.css";
import "./common.css";

const skills = [
  { name: "HTML", level: 90, color: "rgb(255, 85, 0)" },
  { name: "React", level: 90, color: "rgba(23, 162, 184, 0.7)" },
  { name: "JavaScript", level: 85, color: "rgb(255, 255, 2)" },
  { name: "Bootstrap, CSS", level: 80, color: "rgba(131, 0, 192, 0.98)" },
  { name: "Node.js", level: 75, color: "rgba(220, 53, 69, 0.7)" },
  { name: "Express.js", level: 55, color: "rgba(108, 117, 125, 0.7)" },
  { name: "MongoDB, SQL", level: 88, color: "rgba(40, 167, 69, 0.7)" },
  { name: "JAVA", level: 75, color: "rgba(255, 153, 0, 0.7)" },
];

const blogs = [
  {
    title: "Building Scalable Web Apps",
    description: "A guide to designing scalable React applications.",
    image:
      "https://miro.medium.com/v2/resize:fit:800/1*-ROMDdYeb3OHXQHbep8wfg.jpeg",
    link: "https://javascript.plainenglish.io/how-to-build-a-scalable-web-app-for-business-from-scratch-its-challenges-and-solution-a7cec4d076cc",
  },
  {
    title: "AI in Web Development",
    description: "How AI is transforming the future of frontend development.",
    image:
      "https://eluminoustechnologies.com/blog/wp-content/uploads/2023/08/How-to-Use-AI-in-Web-Development.webp",
    link: "https://eluminoustechnologies.com/blog/how-to-use-ai-in-web-development/",
  },
  {
    title: "Modern JavaScript Practices",
    description: "Best practices for writing clean, maintainable JavaScript code.",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*ahpxPO0jLGb9EWrY2qQPhg.jpeg",
    link: "https://medium.com/@alexdevero/7-modern-javascript-practices-you-should-use-in-your-projects-44b916e35f8",
  },
];

const SkillsSection = () => {
  return (
    <section id="skillsSection">
      <div className="container" data-aos="fade-up">
        {/* Skills Section */}
        <div className="heading-container">
          <h2 className="skills-heading section-heading">Skills</h2>
        </div>
        <div className="row">
          {skills.map((skill, index) => (
            <div key={index} className="col-md-6" data-aos="zoom-in" data-aos-delay={index * 50}>
              <Card 
                className="mb-3 p-3 shadow skill-card"
                style={{
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <h5 className="skill-name">{skill.name}</h5>
                <div className="progress-container">
                  <ProgressBar
                    now={skill.level}
                    animated
                    style={{
                      height: "10px",
                      backgroundColor: "#e0e0e0",
                      borderRadius: "5px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "10px",
                        lineHeight: "10px", // Matches height for perfect centering
                      }}
                    >
                      {`${skill.level}%`}
                    </div>
                    <div
                      style={{
                        width: `${skill.level}%`,
                        height: "100%",
                        backgroundColor: skill.color,
                      }}
                    />
                  </ProgressBar>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Blog Section */}
        <div className="heading-container">
          <h3 className="section-title section-heading">Latest Blogs</h3>
        </div>
        <div className="row">
          {blogs.map((blog, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4" data-aos="zoom-in" data-aos-delay={index * 100}>
              <Card 
                className="blog-card h-100"
                style={{
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <Card.Img
                  variant="top"
                  src={blog.image}
                  alt={blog.title}
                  className="blog-image"
                />
                <Card.Body>
                  <Card.Title className="blog-title">{blog.title}</Card.Title>
                  <Card.Text className="blog-description">{blog.description}</Card.Text>
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-link hover-underline"
                  >
                    Read More
                  </a>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
