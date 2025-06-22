const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const Purchase = require("../models/Purchase");
const Book = require("../models/Book");

// Create purchase (simulate Telebirr success)
router.post("/buy/:bookId", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.bookId;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ msg: "Book not found" });
    if (book.price === 0) return res.status(400).json({ msg: "Book is free" });

    // Check if already purchased
    const existing = await Purchase.findOne({ user: userId, book: bookId });
    if (existing) return res.status(400).json({ msg: "Book already purchased" });

    // TODO: Integrate real Telebirr API here for payment processing

    // Simulate immediate purchase success
    const purchase = new Purchase({ user: userId, book: bookId });
    await purchase.save();

    res.json({ msg: "Purchase successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all purchased books for user
router.get("/my-purchases", authMiddleware, async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user.id }).populate("book");
    res.json(purchases.map(p => p.book));
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
