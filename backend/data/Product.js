const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const protect = require("../middleware/auth");

// GET products with filters
router.get("/", async (req, res) => {
  const { search, type, min, max } = req.query;
  let filter = {};
  if (search) filter.name = { $regex: search, $options: "i" };
  if (type && type !== "All") filter.type = type;
  if (min || max) filter.price = {};
  if (min) filter.price.$gte = Number(min);
  if (max) filter.price.$lte = Number(max);

  const products = await Product.find(filter);
  res.json(products);
});

// CRUD routes (auth required)
router.post("/", protect, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

router.put("/:id", protect, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(product);
});

router.delete("/:id", protect, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
