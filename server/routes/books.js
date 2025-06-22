const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");
const Book = require("../models/Book");

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname).toLowerCase() !== ".epub") {
      return cb(new Error("Only EPUB files are allowed"));
    }
    cb(null, true);
  }
});

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("owner", "name email");
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ msg: "Failed to fetch books" });
  }
});

// Get one book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("owner", "name email");
    if (!book) return res.status(404).json({ msg: "Book not found" });
    
    res.json({
      _id: book._id,
      title: book.title,
      price: book.price,
      description: book.description || "",
      filePath: book.filePath,
      owner: book.owner,
      createdAt: book.createdAt,
    });
  } catch (err) {
    console.error("Failed to fetch book:", err);
    res.status(500).json({ msg: "Server error fetching book" });
  }
});

// Upload a book (only for authenticated users)
router.post("/upload", authMiddleware, upload.single("epub"), async (req, res) => {
  try {
    const { title, price } = req.body;

    if (!req.file) return res.status(400).json({ msg: "EPUB file is required" });

    const book = new Book({
      title,
      price,
      filePath: req.file.path,
      owner: req.user.id,
    });

    await book.save();
    res.json({ msg: "Book uploaded successfully", book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Upload failed" });
  }
});

module.exports = router;
