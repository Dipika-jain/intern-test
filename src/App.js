import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import AppointmentList from "./components/AppointmentList";
import PaymentPage from "./components/PaymentPage";
import './App.css'; 
function App() {
  const [mentors, setMentors] = useState([]);
  const [areasOfInterest, setAreasOfInterest] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setMentors(data.mentors);
        setAreasOfInterest(data.areasOfInterest);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddAppointment = (student, areaOfInterest, preferredMentorId, duration, date, timeSlot) => {
    let selectedMentor = preferredMentorId
      ? mentors.find(mentor => mentor.id === parseInt(preferredMentorId, 10))
      : null;

    if (!selectedMentor && !preferredMentorId) {
      const availableMentors = mentors.filter(mentor =>
        mentor.roles.includes(areaOfInterest) &&
        mentor.schedule.some(schedule =>
          schedule.date === date && schedule.timeSlot === timeSlot
        )
      );

      if (availableMentors.length > 0) {
        selectedMentor = availableMentors[0];
      }
    }

    if (selectedMentor) {
      const newAppointment = {
        id: appointments.length + 1,
        student,
        mentor: selectedMentor,
        duration,
        isPremium: preferredMentorId !== "",
        paymentAmount: calculatePayment(duration, preferredMentorId !== ""),
        date,
        timeSlot
      };
      setAppointments([...appointments, newAppointment]);
      setSelectedAppointment(newAppointment);
    } else {
      alert("No available mentor for the selected area of interest and time slot.");
    }
  };

  const calculatePayment = (duration, isPremium) => {
    const baseRates = {
      30: 2000,
      45: 3000,
      60: 4000,
    };
    const baseAmount = baseRates[duration];
    const premiumAmount = isPremium ? 1000 : 0;
    return baseAmount + premiumAmount;
  };

  return (
    <div className="App">
      <h1>CAREER CARVE</h1>
      {!selectedAppointment ? (
        <StudentForm
          mentors={mentors}
          areasOfInterest={areasOfInterest}
          onAddAppointment={handleAddAppointment}
        />
      ) : (
        <PaymentPage appointment={selectedAppointment} onPaymentComplete={() => setSelectedAppointment(null)} />
      )}
      <AppointmentList appointments={appointments} />
    </div>
  );
}

export default App;
