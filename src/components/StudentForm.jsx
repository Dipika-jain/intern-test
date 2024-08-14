import React, { useState, useEffect } from "react";

const StudentForm = ({ mentors, areasOfInterest, onAddAppointment }) => {
  const [studentName, setStudentName] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [preferredMentorId, setPreferredMentorId] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    if (date && duration) {
      const slots = [];
      const start = new Date(`2024-08-15T19:00:00`); // Start at 7:00 PM
      const end = new Date(`2024-08-15T22:30:00`); // End at 10:30 PM
      const durationInMs = duration * 60 * 1000;

      for (let current = start; current < end; current = new Date(current.getTime() + durationInMs)) {
        const slotEnd = new Date(current.getTime() + durationInMs);
        if (slotEnd <= end) {
          const slotStart = current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const slotEndStr = slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          slots.push(`${slotStart} - ${slotEndStr}`);
        }
      }
      setAvailableTimeSlots(slots);
    }
  }, [date, duration]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAppointment(studentName, areaOfInterest, preferredMentorId, duration, date, timeSlot);
    setStudentName("");
    setAreaOfInterest("");
    setPreferredMentorId("");
    setDuration("");
    setDate("");
    setTimeSlot("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Student Details</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Area of Interest:</label>
        <select
          value={areaOfInterest}
          onChange={(e) => setAreaOfInterest(e.target.value)}
          required
        >
          <option value="">Select Area of Interest</option>
          {areasOfInterest.map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Preferred Mentor (Optional):</label>
        <select
          value={preferredMentorId}
          onChange={(e) => setPreferredMentorId(e.target.value)}
        >
          <option value="">Select Mentor (or leave empty for any available)</option>
          {mentors.map((mentor) => (
            <option key={mentor.id} value={mentor.id}>
              {mentor.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Duration:</label>
        <select value={duration} onChange={(e) => setDuration(e.target.value)} required>
          <option value="">Select Duration</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">60 minutes</option>
        </select>
      </div>
      {duration && (
        <div>
          <label>Time Slot:</label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          >
            <option value="">Select Time Slot</option>
            {availableTimeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      )}
      <button type="submit">Schedule Appointment</button>
    </form>
  );
};

export default StudentForm;
