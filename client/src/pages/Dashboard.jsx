import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    if (token) {
      axios.get("https://branaa-3.onrender.com/api/purchases/my-purchases", {
        headers: { Authorization: token },
      })
      .then(res => setPurchases(res.data))
      .catch(() => setPurchases([]));
    }
  }, [token]);

  if (!user) return <div className="container mt-5 text-white">Please login</div>;

  return (
    <div className="container mt-5 text-white">
      <h2>Dashboard</h2>
      <div className="mb-4">
        <h4>User Info</h4>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      {user.role === "author" && (
        <div className="mb-4">
          <a href="/upload" className="btn btn-light">Upload New Book</a>
        </div>
      )}
      <div>
        <h4>Purchased Books</h4>
        {purchases.length === 0 ? (
          <p>No purchased books yet.</p>
        ) : (
          <ul className="list-group">
            {purchases.map(book => (
              <li key={book._id} className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center">
                {book.title}
                <button className="btn btn-sm btn-light" onClick={() => window.location.href = `/read/${book._id}`}>Read</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
