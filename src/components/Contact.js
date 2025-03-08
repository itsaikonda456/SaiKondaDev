import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      toast.success("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "", message: "", consent: false });
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <>
{/*   
    <Container fluid className="py-5" id="contact" data-aos="fade-up">
                    <ToastContainer position="top-right" autoClose={3000} />

      <Row className="justify-content-center">
        <Col md={4} className="p-4">
         
        </Col>
        <Col md={4} className=" p-4 m-lg-5">
          
        </Col>
      </Row>
    </Container> */}

    <div className="container-fluid mb-5" data-aos="fade-up">
      <div className="row">
        <div className="col-md-2">
          
        </div>
        <div className="col-md-5">
        <h6 className="text-success">GET IN TOUCH</h6>
          <h2 className="fw-bold connectwithcollab">Connect with me for collaborations!</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-4">
              <Form.Label>Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                className="border border-dark"
                type="text" 
                placeholder="Jane Smith"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address <span className="text-danger">*</span></Form.Label>
              <Form.Control
                className="border border-dark"
                type="email"
                placeholder="email@website.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone number <span className="text-danger">*</span></Form.Label>
              <Form.Control
                className="border border-dark"
                type="text"
                placeholder="555-555-5555"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                className="border border-dark"
                as="textarea"
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="consent"
                label="I allow this website to store my submission so they can respond to my inquiry."
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                for='consent'
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">SUBMIT</Button>
          </Form>
        </div>
        <div className="col-md-1">

        </div>
        <div className="col-md-2 getintouchdiv bg-light">
          <div className="">
          <h5 className="fw-bold">Get in touch</h5>
          <p className="fs-5">📧 <a href="mailto:itsaikonda@gmail.com" className="text-dark text-decoration-none">itsaikonda@gmail.com</a></p>
          <h5 className="fw-bold">Location</h5>
          <p className="fs-5">📍 <a href="https://maps.app.goo.gl/13A9DstEBAZAZWrG9" className="text-dark text-decoration-none">Bhiwandi,Thane MH 04</a></p>
          <h5 className="fw-bold">Hours</h5>
          <p>Monday : 9:00am - 10:00pm</p>
          <p>Tuesday : 9:00am - 10:00pm</p>
          <p>Wednesday : 9:00am - 10:00pm</p>
          <p>Thursday : 9:00am - 10:00pm</p>
          <p>Friday : 9:00am - 10:00pm</p>
          <p>Saturday : 9:00am - 6:00pm</p>
          <p>Sunday : Not Available</p>
          </div>
        </div>
        <div className="col-md-2">

        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
