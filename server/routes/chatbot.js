const express = require("express");
const router = express.Router();

const API_KEY = process.env.ADDIS_AI_API_KEY; // Make sure to set this in your .env

router.use(express.json());

router.post("/ask", async (req, res) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message) {
    return res.status(400).json({ msg: "Message is required" });
  }

  try {
    const response = await fetch("https://api.addisassistant.com/api/v1/chat_generate", {
      method: "POST",
      headers: {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: message,
        target_language: "am",
        conversation_history: conversationHistory,
        generation_config: { temperature: 0.7 },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ msg: "API error", detail: errorText });
    }

    const data = await response.json();

    res.json({ response_text: data.response_text });
  } catch (err) {
    console.error("Error calling Addis AI:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
