const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


const path = require("path");
const chatbotRoute = require("./routes/chatbot");

const paymentRoutes = require("./routes/payment");
app.use("/api/payment", paymentRoutes);

app.use('/uploads', express.static('uploads'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/books", require("./routes/books"));
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/purchases", require("./routes/purchases"));

app.use("/api/chatbot", chatbotRoute);
app.use("/uploads", express.static("uploads"));


// sk_6ec8a7a2-72ac-4a74-a5ea-f804af6eacd5_fae75807af03b36f27d6de743aa368edc070b9f17cc9571eb41c12f0f22e08c6
app.listen(5000, () => console.log("Server running on https://branaa-3.onrender.com"));
