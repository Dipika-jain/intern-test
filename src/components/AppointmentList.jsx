import React from "react";

const AppointmentList = ({ appointments }) => {
  return (
    <div className="AppointmentList">
      <h2>Scheduled Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <strong>Student:</strong> {appointment.student} | 
            <strong> Mentor:</strong> {appointment.mentor.name} | 
            <strong> Duration:</strong> {appointment.duration} minutes | 
            <strong> Premium:</strong> {appointment.isPremium ? "Yes" : "No"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
