const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const protect = require("../middleware/auth");
const multer = require("multer");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // folder to save images
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, Date.now() + "." + ext);
  },
});
const upload = multer({ storage });

// GET all products (with filters)
router.get("/", async (req, res) => {
  try {
    const { search, type, min, max } = req.query;
    let filter = {};
    if (search) filter.name = { $regex: search, $options: "i" };
    if (type && type !== "All") filter.type = type;
    if (min || max) filter.price = {};
    if (min) filter.price.$gte = Number(min);
    if (max) filter.price.$lte = Number(max);

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET products of logged-in user
router.get("/my", protect, async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user._id });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE product
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { name, type, price, description } = req.body;

    if (!name || !type || !price || !req.file) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const product = new Product({
      name,
      type,
      price,
      description: description || "",
      image: `/uploads/${req.file.filename}`,
      owner: req.user._id,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE product
router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const { name, type, price, description } = req.body;
    const updateData = { name, type, price, description };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE product
router.delete("/:id", protect, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
