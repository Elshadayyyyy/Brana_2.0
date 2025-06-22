import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">{t("Brana") || "Brana"}</Link>

      <div className="ms-auto d-flex align-items-center">
        {/* Language toggle buttons */}
        <button onClick={() => changeLanguage("en")} className="btn btn-outline-light me-2">EN</button>
        <button onClick={() => changeLanguage("am")} className="btn btn-outline-light me-2">አማ</button>

        {/* User navigation links */}
        {user && user.role === "author" && (
          <Link to="/upload" className="btn btn-outline-light me-2">{t("uploadBook") || "Upload Book"}</Link>
        )}

        {!user && (
          <>
            <Link to="/login" className="btn btn-outline-light me-2">{t("login") || "Login"}</Link>
            <Link to="/register" className="btn btn-light me-2">{t("register") || "Register"}</Link>
             <Link to="/dashboard" className="btn btn-outline-light me-2">Dashboard</Link>
          </>
        )}


        {/* Show Books link to all users */}
        <Link to="/books" className="btn btn-outline-light">{t("books") || "Books"}</Link>
        <Link to="/chatbot" className="btn btn-outline-light me-2">{t("chatbot") || "Chatbot"}</Link>

      </div>
    </nav>
  );
}
