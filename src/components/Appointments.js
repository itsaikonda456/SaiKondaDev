import React, { useState, useEffect } from "react";
import "./Appointments.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [rejectedAppointments, setRejectedAppointments] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  // API URL - make sure this matches your server
  const API_URL = "http://localhost:5000"; // Change this if your server is running on a different port or URL

  useEffect(() => {
    // Fetch appointments from localStorage or your API
    const fetchAppointments = () => {
      // For localStorage approach
      const savedAppointments = localStorage.getItem("appointments");
      if (savedAppointments) {
        setAppointments(JSON.parse(savedAppointments));
      }
      
      const savedAccepted = localStorage.getItem("acceptedAppointments");
      if (savedAccepted) {
        setAcceptedAppointments(JSON.parse(savedAccepted));
      }
      
      const savedRejected = localStorage.getItem("rejectedAppointments");
      if (savedRejected) {
        setRejectedAppointments(JSON.parse(savedRejected));
      }
    };

    fetchAppointments();
  }, []);

  // Show notification helper
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };

  const handleAccept = async (index) => {
    if (isProcessing) return; // Prevent multiple submissions
    setIsProcessing(true);
    
    const acceptedAppointment = appointments[index];
    
    try {
      console.log(`Sending API request to ${API_URL}/api/appointments/${index}/accept`);
      
      // First update the UI state
      setAcceptedAppointments(prev => [...prev, acceptedAppointment]);
      const updatedAppointments = appointments.filter((_, i) => i !== index);
      setAppointments(updatedAppointments);
      
      // Update localStorage
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      localStorage.setItem("acceptedAppointments", 
        JSON.stringify([...acceptedAppointments, acceptedAppointment]));
      
      // API call to accept appointment and send email
      // Make sure we're sending the full appointment data to server
      const response = await fetch(`${API_URL}/api/appointments/${index}/accept`, {
        method: "PUT", // Your server is using PUT method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(acceptedAppointment) // Send the complete appointment object
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Show success notification
        showNotification("Appointment accepted and confirmation email sent!", "success");
      } else {
        // Show partial success - appointment accepted but email failed
        showNotification("Appointment accepted, but email notification couldn't be sent. Please contact the client manually.", "warning");
        console.error("Email sending failed:", data.message);
      }
    } catch (error) {
      console.error("Error in accept process:", error);
      // Still show acceptance was successful since we updated the UI
      showNotification("Appointment accepted, but there was an issue with the email notification. Client may need to be contacted manually.", "warning");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (index) => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    const rejectedAppointment = appointments[index];
    
    try {
      // First update the UI state
      setRejectedAppointments(prev => [...prev, rejectedAppointment]);
      const updatedAppointments = appointments.filter((_, i) => i !== index);
      setAppointments(updatedAppointments);
      
      // Update localStorage
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      localStorage.setItem("rejectedAppointments", 
        JSON.stringify([...rejectedAppointments, rejectedAppointment]));
      
      // API call to reject appointment and send email
      const response = await fetch(`${API_URL}/api/appointments/${index}/reject`, {
        method: "PUT", // Your server is using PUT method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rejectedAppointment) // Send the complete appointment object
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Show success notification
        showNotification("Appointment rejected and notification email sent!", "success");
      } else {
        // Show partial success
        showNotification("Appointment rejected, but email notification couldn't be sent. Please contact the client manually.", "warning");
        console.error("Email sending failed:", data.message);
      }
    } catch (error) {
      console.error("Error in reject process:", error);
      showNotification("Appointment rejected, but there was an issue with the email notification. Client may need to be contacted manually.", "warning");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Appointment Management</h1>
      
      {/* Notification Alert */}
      {notification.show && (
        <div className={`alert alert-${notification.type === "success" ? "success" : notification.type === "warning" ? "warning" : "danger"} alert-dismissible fade show`} role="alert">
          {notification.message}
          <button type="button" className="btn-close" onClick={() => setNotification({...notification, show: false})}></button>
        </div>
      )}
      
      <h2 className="text-center mt-4 mb-3">Pending Appointments</h2>
      <div className="row">
        {appointments.length === 0 ? (
          <div className="col-12 text-center">
            <p className="text-muted">No pending appointments</p>
          </div>
        ) : (
          appointments.map((appointment, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="appointment-card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Appointment Request</h5>
                  <span className="badge bg-warning text-dark">Pending</span>
                </div>
                <div className="card-body">
                  <div className="appointment-info">
                    <p><i className="bi bi-person-fill me-2"></i><strong>Name:</strong> {appointment.name}</p>
                    <p><i className="bi bi-envelope-fill me-2"></i><strong>Email:</strong> {appointment.email}</p>
                    <p><i className="bi bi-telephone-fill me-2"></i><strong>Phone:</strong> {appointment.phone}</p>
                    <p><i className="bi bi-calendar-event-fill me-2"></i><strong>Date:</strong> {appointment.date}</p>
                    <p><i className="bi bi-clock-fill me-2"></i><strong>Time:</strong> {appointment.time}</p>
                    {appointment.services && appointment.services.length > 0 && (
                      <p>
                        <i className="bi bi-gear-fill me-2"></i>
                        <strong>Services:</strong> {appointment.services.join(", ")}
                      </p>
                    )}
                    {appointment.message && (
                      <div className="mt-2">
                        <p><strong>Message:</strong></p>
                        <p className="message-text">{appointment.message}</p>
                      </div>
                    )}
                  </div>
                  <div className="action-buttons mt-3">
                    <button 
                      className="btn btn-success me-2" 
                      onClick={() => handleAccept(index)}
                      disabled={isProcessing}
                    >
                      <i className="bi bi-check-circle me-1"></i> Accept
                    </button>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleReject(index)}
                      disabled={isProcessing}
                    >
                      <i className="bi bi-x-circle me-1"></i> Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Accepted and Rejected appointments sections */}
      {acceptedAppointments.length > 0 && (
        <>
          <h2 className="text-center mt-5 mb-3">Accepted Appointments</h2>
          <div className="row">
            {acceptedAppointments.map((appointment, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="appointment-card accepted">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Appointment</h5>
                    <span className="badge bg-success">Accepted</span>
                  </div>
                  <div className="card-body">
                    <p><strong>Name:</strong> {appointment.name}</p>
                    <p><strong>Email:</strong> {appointment.email}</p>
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {rejectedAppointments.length > 0 && (
        <>
          <h2 className="text-center mt-5 mb-3">Rejected Appointments</h2>
          <div className="row">
            {rejectedAppointments.map((appointment, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="appointment-card rejected">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Appointment</h5>
                    <span className="badge bg-danger">Rejected</span>
                  </div>
                  <div className="card-body">
                    <p><strong>Name:</strong> {appointment.name}</p>
                    <p><strong>Email:</strong> {appointment.email}</p>
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Appointments;