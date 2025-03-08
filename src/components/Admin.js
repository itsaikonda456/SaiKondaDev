import React, { useEffect, useState } from "react";

const Admin = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/appointments")
            .then((res) => res.json())
            .then((data) => setAppointments(data));
    }, []);

    const acceptAppointment = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/accept-appointment/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (data.success) {
                alert("Appointment Accepted!");
                setAppointments((prev) =>
                    prev.map((app) => (app._id === id ? { ...app, status: "Accepted" } : app))
                );
            }
        } catch (error) {
            console.error("Error accepting appointment:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Admin Panel - Manage Appointments</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((app) => (
                        <tr key={app._id}>
                            <td>{app.name}</td>
                            <td>{app.email}</td>
                            <td>{app.date}</td>
                            <td>{app.time}</td>
                            <td>{app.status}</td>
                            <td>
                                {app.status === "Pending" ? (
                                    <button className="btn btn-success" onClick={() => acceptAppointment(app._id)}>
                                        Accept
                                    </button>
                                ) : (
                                    <span className="text-success">Accepted</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;
