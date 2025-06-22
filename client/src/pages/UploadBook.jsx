import React, { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an EPUB file to upload.");
      return;
    }
    if (!title.trim()) {
      alert("Please enter a book title.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("epub", file); 
    try {
      setLoading(true);
      await axios.post("https://branaa-3.onrender.com/api/books/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      alert("Book uploaded successfully!");
      setTitle("");
      setDescription("");
      setPrice(0);
      setFile(null);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 text-white">
      <h2>Upload Book</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3" style={{ maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-control"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
        <input
          type="number"
          min="0"
          placeholder="Price in ETB"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="form-control"
          required
        />
        <input
          type="file"
          accept=".epub"
          onChange={handleFileChange}
          className="form-control"
          required
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Uploading..." : "Upload Book"}
        </button>
      </form>
    </div>
  );
}
