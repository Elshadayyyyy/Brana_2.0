import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ChatbotWidget  = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("https://branaa-3.onrender.com/api/chat", {
        message: userMsg,
      });

      const botResponse = res.data.response;
      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, an error occurred." },
      ]);
    }

    setLoading(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="container mt-4">
      <h4 className="text-white mb-3">{t("chatbot")}</h4>

      <div className="bg-dark rounded p-3 mb-3" style={{ minHeight: "300px", maxHeight: "400px", overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === "user" ? "text-end" : "text-start"}`}>
            <span className={`badge ${msg.role === "user" ? "bg-primary" : "bg-secondary"}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && (
          <div className="text-secondary">
            <em>Thinking...</em>
          </div>
        )}
      </div>

      <div className="input-group">
        <input
          className="form-control bg-dark text-white border-light"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnter}
          placeholder={t("askPlaceholder")}
        />
        <button className="btn btn-outline-light" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotWidget;
