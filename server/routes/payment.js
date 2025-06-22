const express = require("express");
const router = express.Router();

// Mock Telebirr payment integration (replace with real API if available)
router.post("/telebirr/pay", async (req, res) => {
  const { amount, orderId } = req.body;

  if (!amount || !orderId) {
    return res.status(400).json({ msg: "Amount and Order ID are required" });
  }

  // Normally you'd integrate Telebirr SDK or API here.
  // For now, return a mock payment URL.
  try {
    const paymentUrl = `https://telebirr.et/pay?amount=${amount}&orderId=${orderId}`;

    return res.status(200).json({
      msg: "Redirecting to Telebirr",
      paymentUrl,
    });
  } catch (err) {
    console.error("Payment initiation error:", err);
    return res.status(500).json({ msg: "Failed to initiate payment" });
  }
});

module.exports = router;
