import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ScheduleAppointment.css";

const ScheduleAppointment = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [],
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

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
      id: Date.now(), // Add a unique ID
      status: "pending"
    };

    try {
      // Option 1: Store in localStorage for client-side persistence
      const existingAppointments = localStorage.getItem("appointments");
      const appointments = existingAppointments 
        ? JSON.parse(existingAppointments) 
        : [];
      
      appointments.push(appointmentData);
      localStorage.setItem("appointments", JSON.stringify(appointments));
      
      // Option 2: Send to backend API (uncomment if using)
      /*
      const response = await fetch("http://localhost:5000/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();
      if (data.success) {
        // Handle success
      }
      */
      
      // Show success message and reset form
      setShowSuccess(true);
      
      // Reset form after submission
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({ name: "", email: "", phone: "", services: [], message: "" });
        setSelectedDate("");
        setSelectedTime("");
      }, 3000);
    } catch (error) {
      console.error("Error scheduling appointment", error);
      alert("Failed to schedule appointment.");
    }
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="form-container w-75">
        <h2 className="text-success fs-4 text-center">MEETING REQUEST FORM</h2>
        <h3 className="text-center fs-6">We look forward to meeting with you</h3>

        {showSuccess && (
          <div className="alert alert-success mt-3" role="alert">
            Appointment scheduled successfully! Your request has been submitted.
          </div>
        )}

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="selectdate" className="form-label mt-3">Select a date *</label>
            <input
              type="date"
              id="selectdate"
              className="form-control mt-0 border border-black"
              onChange={(e) => setSelectedDate(e.target.value)}
              value={selectedDate}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="timeslot" className="form-label mt-3">Select time slot *</label>
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
                <label htmlFor="name" className="form-label">Name *</label>
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
                <label htmlFor="email" className="form-label">Email address *</label>
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
            <label htmlFor="phone" className="form-label">Phone number *</label>
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
                checked={formData.services.includes("Full-Stack Development")}
                onChange={handleServiceSelection}
              />
              <label htmlFor="f">Full-Stack Development</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="AI Solutions"
                id="ai"
                className="me-2"
                checked={formData.services.includes("AI Solutions")}
                onChange={handleServiceSelection}
              />
              <label htmlFor="ai">AI Solutions</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="Responsive UI Design"
                id="ui"
                className="me-2"
                checked={formData.services.includes("Responsive UI Design")}
                onChange={handleServiceSelection}
              />
              <label htmlFor="ui">Responsive UI Design</label>
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