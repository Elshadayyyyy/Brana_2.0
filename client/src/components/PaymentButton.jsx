import React from "react";

const PaymentButton = ({ amount, orderId }) => {
  const handlePayment = async () => {
    try {
      const res = await fetch("https://branaa-3.onrender.com/api/payment/telebirr/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, orderId }),
      });

      const data = await res.json();

      // Redirect to Telebirr page
      window.open(data.paymentUrl, "_blank");
    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to initiate payment.");
    }
  };

  return (
    <button className="btn btn-warning mt-auto" onClick={handlePayment}>
      Pay {amount} ETB
    </button>
  );
};

export default PaymentButton;
