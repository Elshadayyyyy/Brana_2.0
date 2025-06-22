import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TelebirrPayment() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const bookId = query.get("bookId");

  const handlePayment = () => {
    // Simulate payment success
    const purchased = JSON.parse(localStorage.getItem("purchased") || "[]");
    if (!purchased.includes(bookId)) {
      purchased.push(bookId);
    }
    localStorage.setItem("purchased", JSON.stringify(purchased));

    // Redirect back to book list
    alert("✅ Payment successful!");
    navigate("/books");
  };

  return (
    <div className="container text-white text-center mt-5">
      <h2>🧾 Mock Telebirr Payment</h2>
      <p>You’re about to pay for Book ID: <strong>{bookId}</strong></p>
      <button className="btn btn-success" onClick={handlePayment}>
        Complete Payment
      </button>
    </div>
  );
}
