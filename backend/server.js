require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer setup (temporary local storage)
const upload = multer({ dest: "temp/" });

// Upload endpoint
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "my-products", // Folder in Cloudinary
    });

    // Delete temporary local file
    fs.unlinkSync(req.file.path);

    res.json({ imageUrl: result.secure_url }); // Return Cloudinary URL
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/seed", require("./routes/seed"));

// Health check
app.get("/", (req, res) => res.send("BuyNow API is running..."));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
