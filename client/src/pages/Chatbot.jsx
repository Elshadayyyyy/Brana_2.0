import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Chatbot() {
  const { t } = useTranslation();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await axios.post("https://brana-2-0.onrender.com/api/chatbot/ask", { question });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer(t("errorOccurred") || "An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5 text-white">
      <h2>{t("askQuestion") || "Ask a Question"}</h2>
      <textarea
        className="form-control mb-3"
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={t("typeYourQuestion") || "Type your question here..."}
      />
      <button className="btn btn-primary mb-3" onClick={handleAsk} disabled={loading}>
        {loading ? t("loading") || "Loading..." : t("ask") || "Ask"}
      </button>
      {answer && (
        <div className="card bg-dark p-3">
          <h5>{t("answer") || "Answer:"}</h5>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
