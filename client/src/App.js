import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatbotWidget from "./components/Chatbot";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UploadBook from "./pages/UploadBook";
import BooksList from "./pages/BooksList";
import ReadBook from "./pages/ReadBook";
import Chatbot from "./pages/Chatbot";
import Dashboard from "./pages/Dashboard";
import TelebirrPayment from "./pages/TelebirrPayment";


import './i18n'; 
function App() {
  return (
    <Router>
      <div className="bg-black text-white min-vh-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Chatbot />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
  path="/upload"
  element={
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).role === "author" ? (
      <UploadBook />
    ) : (
      <div className="container mt-5 text-white"><h3>Access denied. Authors only.</h3></div>
    )
  }
/>
           <Route path="/books" element={<BooksList />} />
           <Route path="/chatbot" element={<Chatbot />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/pay" element={<TelebirrPayment />} />
           <Route path="/Chatbot" element={<ChatbotWidget />} />
           <Route path="/read/:id" element={<ReadBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
