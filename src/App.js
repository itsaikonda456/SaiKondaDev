import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import SkillsSection from "./components/SkillsSection";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScheduleAppointment from "./components/ScheduleAppointment";
import "./App.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const MainContent = () => {
  return (
    <>
      <div id="HeroSection">
        <HeroSection />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="skillsSection">
        <SkillsSection />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        
        <Contact />
      </div>
    </>
  );
};

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);

  const location = useLocation();
  const isSchedulePage = location.pathname === "/schedule-appointment";

  return (
    <>
      <Navbar />
      {!isSchedulePage && <MainContent />}
      <Routes>
        <Route  path="/schedule-appointment" element={<ScheduleAppointment />} />
      </Routes>
      <Footer />
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
