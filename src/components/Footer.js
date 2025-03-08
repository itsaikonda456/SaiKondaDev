import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="text-light py-5 bg-success">
      <div className="container">
        <div className="row justify-content-center justify-content-md-start text-center text-md-start">
          <div className="col-12 col-md-auto mb-3 mb-md-0">
            <a href="/schedule-appointment" className="text-light fw-bold text-decoration-none">
              Schedule Appointment
            </a>
          </div>
          <div className="col-12 col-md-auto">
            <a href="#" className="text-light fw-bold text-decoration-none">
              Complete Intake
            </a>
          </div>
        </div>
        <div className="row mt-4 text-center text-md-start">
          <div className="col">
            <p className="mb-0">
              <a href="#" className="text-light text-decoration-none">
                Its <strong>SaiKonda@gmail.com</strong>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
