import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EpubReader from "../components/EpubReader";

const ReadBook = () => {
  const { id } = useParams();
  const [bookUrl, setBookUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!id) {
      console.error("❌ No book ID found in URL.");
      return;
    }

    axios
      .get(`https://brana-2-0.onrender.com/api/books/${id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log("✅ Book response:", res.data);
        const relativePath = res.data.filePath?.replace(/\\/g, "/"); // Handle Windows backslashes
        if (relativePath) {
          const fullUrl = `https://brana-2-0.onrender.com/${relativePath}`;
          console.log("📘 Full EPUB File URL:", fullUrl);
          setBookUrl(fullUrl);
        } else {
          console.warn("⚠️ No filePath in response.");
        }
      })
      .catch((err) => {
        console.error("❌ Failed to fetch book:", err);
        alert("Failed to load book");
      })
      .finally(() => setLoading(false));
  }, [id, token]);

  if (loading) return <div className="text-white p-4">Loading EPUB...</div>;
  if (!bookUrl) return <div className="text-danger p-4">❌ Book URL not available.</div>;

  return <EpubReader url={bookUrl} />;
};

export default ReadBook;
