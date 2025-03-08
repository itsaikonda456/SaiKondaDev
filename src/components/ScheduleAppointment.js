import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ScheduleAppointment.css";

const ScheduleAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [],
    message: "",
  });

  const timeSlots = [
    "2:00–2:30 pm",
    "2:30–3:00 pm",
    "3:00–3:30 pm",
    "3:30–4:00 pm",
    "4:00–4:30 pm",
    "4:30–5:00 pm",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceSelection = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      services: checked
        ? [...prev.services, value]
        : prev.services.filter((service) => service !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = {
      date: selectedDate,
      time: selectedTime,
      ...formData,
    };

    try {
      const response = await fetch("http://localhost:5000/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Appointment Scheduled Successfully!");
        setFormData({ name: "", email: "", phone: "", services: [], message: "" });
        setSelectedDate(null);
        setSelectedTime(null);
      }
    } catch (error) {
      console.error("Error scheduling appointment", error);
      alert("Failed to schedule appointment.");
    }
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="form-container w-75">
        <h2 className="text-success fs-4  text-center">MEETING REQUEST FORM</h2>
        <h3 className="text-center fs-6">We look forward to meeting with you</h3>

        <div className="row">
          <div className="col-md-6">
            <label  for='selectdate' className="form-label mt-3">Select a date *</label>
            <input
              type="date"
              id="selectdate"
              className="form-control mt-0 border border-black"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label for='timeslot' className="form-label mt-3">Select time slot *</label>
            <select
              className="form-control mt-0 border border-black"
              id="timeslot"
              onChange={(e) => setSelectedTime(e.target.value)}
              value={selectedTime}
              required
            >
              <option value="">Select a time</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <form className="mt-2" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-2">
                <label for='name' className="form-label">Name *</label>
                <input
                  type="text"
                  className="form-control border border-black"
                  name="name"
                  id="name"
                  placeholder="Jane Smith"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-2">
                <label for='email' className="form-label">Email address *</label>
                <input
                  type="email"
                  className="form-control border border-black"
                  name="email"
                  id="email"
                  placeholder="email@website.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-2">
            <label for='phone' className="form-label">Phone number *</label>
            <input
              type="tel"
              className="form-control border border-black"
              name="phone"
              id="phone"
              placeholder="555-555-5555"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Which services are you interested in?</label>
            <div>
              <input
                type="checkbox"
                value="Full-Stack Development"
                id="f"
                className="me-2"
                onChange={handleServiceSelection}
              />
              <label for='f'>Full-Stack Development</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="AI Solutions"
                id="ai"
                className="me-2"
                onChange={handleServiceSelection}
              />
              <label for='ai'>AI Solutions</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="Responsive UI Design"
                id="ui"
                className="me-2"
                onChange={handleServiceSelection}
              />
              <label for='ui'>Responsive UI Design</label>
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label">Message</label>
            <textarea
              className="form-control border border-black"
              rows="3"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success w-100">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAppointment;
