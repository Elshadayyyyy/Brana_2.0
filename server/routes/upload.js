const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth, authorizeRole } = require("../middleware/auth");

// Configure multer storage and file filter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // make sure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only epub files
  if (file.mimetype === "application/epub+zip") {
    cb(null, true);
  } else {
    cb(new Error("Only EPUB files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Route to upload book
router.post(
  "/upload",
  auth,
  authorizeRole("author"),
  upload.single("bookFile"),
  async (req, res) => {
    try {
      // Access file and form data
      const { title, description, price } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ msg: "No file uploaded" });
      }
      if (!title || !price) {
        return res.status(400).json({ msg: "Title and price are required" });
      }

      // Save book info to DB here, example with Mongoose:
      const Book = require("../models/Book");
      const newBook = new Book({
        title,
        description,
        price,
        filePath: file.path,
        author: req.user.id,
      });
      await newBook.save();

      res.status(201).json({ msg: "Book uploaded successfully", book: newBook });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
