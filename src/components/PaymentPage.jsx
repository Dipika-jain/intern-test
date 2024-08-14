import React from "react";

const PaymentPage = ({ appointment, onPaymentComplete }) => {
  const handlePayment = () => {
    // Simulate payment completion
    alert("Payment successful!");
    onPaymentComplete();
  };

  return (
    <div>
      <h2>Payment Details</h2>
      <p><strong>Student:</strong> {appointment.student}</p>
      <p><strong>Mentor:</strong> {appointment.mentor.name}</p>
      <p><strong>Duration:</strong> {appointment.duration} minutes</p>
      <p><strong>Premium:</strong> {appointment.isPremium ? "Yes" : "No"}</p>
      <p><strong>Total Amount:</strong> ₹{appointment.paymentAmount}</p>
      <button onClick={handlePayment}>Complete Payment</button>
    </div>
  );
};

export default PaymentPage;
