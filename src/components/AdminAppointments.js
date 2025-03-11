import React, { useState, useEffect } from "react";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  }, []);

  const handleAction = (id, status) => {
    fetch(`http://localhost:5000/api/appointment/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then(() => {
        setAppointments(appointments.filter((appt) => appt._id !== id));
      });
  };

  return (
    <div>
      <h2>Admin Appointments</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>
            {appt.name} - {appt.date} {appt.time} - {appt.services.join(", ")}
            <button onClick={() => handleAction(appt._id, "approved")}>Approve</button>
            <button onClick={() => handleAction(appt._id, "rejected")}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminAppointments;
