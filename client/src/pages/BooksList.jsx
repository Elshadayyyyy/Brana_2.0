import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import PaymentButton from "../components/PaymentButton";
import { useNavigate } from "react-router-dom";

export default function BooksList() {
  const { t } = useTranslation();
  const [books, setBooks] = useState([]);
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthor = user?.role === "author";

  useEffect(() => {
    // Fetch all books
    axios.get("https://branaa-3.onrender.com/api/books")
      .then(res => setBooks(res.data))
      .catch(() => setBooks([]));

    // Fetch user purchases
    if (token) {
      axios.get("https://branaa-3.onrender.com/api/purchases/my-purchases", {
        headers: { Authorization: token }
      })
      .then(res => setPurchasedBooks(res.data))
      .catch(() => setPurchasedBooks([]))
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleBuyFreeBook = async (bookId) => {
    try {
      await axios.post(`https://branaa-3.onrender.com/api/purchases/buy/${bookId}`, {}, {
        headers: { Authorization: token }
      });
      alert(t("purchaseSuccess") || "Purchase successful!");
      const res = await axios.get("https://branaa-3.onrender.com/api/purchases/my-purchases", {
        headers: { Authorization: token }
      });
      setPurchasedBooks(res.data);
    } catch (err) {
      alert(err.response?.data?.msg || t("purchaseFailed") || "Purchase failed");
    }
  };

  const isPurchased = (bookId) => purchasedBooks.some(b => b._id === bookId);

  if (loading) return <div className="container mt-5 text-white">{t("loadingBooks") || "Loading books..."}</div>;

  return (
    <div className="container mt-5 text-white">
      <h2>{t("availableBooks") || "Available Books"}</h2>

      {isAuthor && (
        <div className="mb-4">
          <a href="/upload" className="btn btn-success">
            📚 {t("uploadNewBook") || "Upload New Book"}
          </a>
        </div>
      )}

      {books.length === 0 && <p>{t("noBooksFound") || "No books found."}</p>}

      <div className="row">
        {books.map(book => {
          const canRead = book.price === 0 || isPurchased(book._id);
          const authorName = book.owner?.name || t("unknownAuthor") || "Unknown";
          const fileUrl = `https://branaa-3.onrender.com/${book.filePath.replace(/\\/g, "/")}`;

          return (
            <div key={book._id} className="col-md-4 mb-4">
              <div className="card bg-dark text-white h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {t("by") || "By"}: {authorName}
                  </h6>
                  <p className="card-text flex-grow-1">
                    {book.description || (t("noDescription") || "No description")}
                  </p>
                  <p className="card-text">
                    {t("price") || "Price"}: {book.price === 0 ? (t("free") || "Free") : `${book.price} ETB`}
                  </p>

                  {canRead ? (
                    <div className="d-flex gap-2 mt-auto">
                      <button
                        className="btn btn-light"
                        onClick={() => window.location.href = `/read/${book._id}`}
                      >
                        {t("read") || "Read"}
                      </button>
                      <a
                        href={fileUrl}
                        download
                        className="btn btn-outline-info"
                      >
                        {t("download") || "Download"}
                      </a>
                    </div>
                  ) : (
                    book.price === 0 ? (
                      <button
                        className="btn btn-warning mt-auto"
                        onClick={() => handleBuyFreeBook(book._id)}
                      >
                        {t("claim") || "Claim"}
                      </button>
                    ) : (
                      <PaymentButton amount={book.price} orderId={book._id} />
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
