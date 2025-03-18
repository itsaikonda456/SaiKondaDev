import React from "react";
import "./Education.css";
import "./common.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Education = () => {
  const educationData = [
    {
      degree: "High School",
      institution: "PR High School",
      location: "Bhiwandi, Thane",
      duration: "2011 - 2021",
      description: "I Complted my SSC from PR High School. I was a good student and scored 87% in SSC.",
      achievements: [
        "Scored 87% in SSC",
        "Participated in school sports and cultural events",
        "Was a member of the school debate team"
      ]
    },
    {
      degree: "Diploma In Information Technology",
      institution: "Shivajirao S.Jondhle Polytechnic,Asangaon",
      location: "Asangoan, Shahpur Thane",
      duration: "2022 - 2024",
      description: "Completed coursework in Data Structures, Algorithms, Computer Systems, and Web Development.",
      achievements: [
        "Completed project on 'Web Development using React and Node.js'",
        "Participated in Hackathons and coding challenges",
        "Collaborated with team members on group projects",
        "Developed a strong foundation in programming fundamentals"
      ]
    },
    {
      degree: "BE In Artificial Intelligence & Data Science",
      institution: "Datta Meghe Collage Of Engineering (DMCE)",
      location: "Airoli, Navi-Mumbai",
      duration: "2024-2027",
      description: "Currently pursuing my degree in Artificial Intelligence & Data Science.",
      achievements: [
        "Currently pursuing my degree in Artificial Intelligence & Data Science."
      ]
    }
  ];

  return (
    <section id="education">
      <div className="container" data-aos="fade-up">
        <div className="heading-container">
          <h2 className="education-heading section-heading">Education</h2>
        </div>
        
        <div className="timeline">
          {educationData.map((item, index) => (
            <div 
              key={index} 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={index * 100}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-date">{item.duration}</div>
                <h3 className="timeline-title">{item.degree}</h3>
                <h4 className="timeline-subtitle">{item.institution}</h4>
                <p className="timeline-location">{item.location}</p>
                <p className="timeline-description">{item.description}</p>
                
                {item.achievements && item.achievements.length > 0 && (
                  <div>
                    <h5 className="timeline-subtitle">Achievements</h5>
                    <ul className="timeline-achievements">
                      {item.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education; 