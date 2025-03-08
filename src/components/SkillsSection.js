import React from "react";
import { ProgressBar, Card, Button } from "react-bootstrap";

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
    title: "Mastering UI/UX",
    description: "Best practices for designing user-friendly interfaces.",
    image:
      "https://media.licdn.com/dms/image/v2/D5612AQHWm_AnD4_3Vg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1710673165484?e=2147483647&v=beta&t=b8sV7pyC3dJRkLZv6JgE56L98v88uzu64bD_o_JEt6w",
    link: "https://www.linkedin.com/pulse/mastering-uiux-design-creating-seamless-digital-experiences-s-2hi6c/",
  },
];

const SkillsSection = () => {
  return (
    <section id="skillsSection" className="py-5">
      <div className="container" data-aos="fade-up">
        {/* Skills Section */}
        <h2 className="text-center mb-4">Skills</h2>
        <div className="row">
  {skills.map((skill, index) => (
    <div key={index} className="col-md-6">
      <Card
        className="mb-3 p-3 shadow skill-card"
        style={{
          transition: "transform 0.3s ease-in-out", // Smooth transition for scale effect
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} // Scale up on hover
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // Scale back to normal when mouse leaves
      >
        <h5>{skill.name}</h5>
        <div>
          <ProgressBar
            now={skill.level}
            animated
            style={{
              height: "10px", // Increased height for better text visibility
              backgroundColor: "#e0e0e0",
              position: "relative",
              borderRadius: "5px",
              overflow: "hidden",
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
                borderRadius: "5px",
              }}
            />
          </ProgressBar>
        </div>
      </Card>
    </div>
  ))}
</div>

        {/* Blog Section */}
        <h2 className="text-center mt-5 mb-4">Latest Blogs</h2>
        <div className="row" data-aos="zoom-in">
          {blogs.map((blog, index) => (
            <div key={index} className="col-md-4 d-flex align-items-stretch">
              <Card
                className="mb-3 p-3 shadow blog-card w-100"
                style={{
                  transition: "transform 0.3s ease-in-out",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <Card.Img
                  variant="top"
                  src={blog.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mt-2">{blog.title}</Card.Title>
                  <Card.Text>{blog.description}</Card.Text>
                  <Button
                    variant="primary"
                    href={blog.link}
                    className="mt-auto"
                    style={{ width: "fit-content", padding: "4px 8px" }}
                  >
                    Read More
                  </Button>
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
