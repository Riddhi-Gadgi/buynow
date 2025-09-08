const express = require("express");
const Product = require("../models/Product");
const productsImport = require("../data/Product"); // your array

const router = express.Router();

const products = productsImport.default || productsImport;

router.post("/", async (req, res) => {
  try {
    const existing = await Product.countDocuments();
    if (existing > 0) {
      return res
        .status(400)
        .json({ message: "Products already exist. Seeding skipped." });
    }

    // Map fields to match updated schema
    const formattedProducts = products.map((p) => ({
      name: p.product_name || "Unnamed Product",
      type:
        p.type?.toLowerCase() === "top wear"
          ? "Top wear"
          : p.type?.toLowerCase() === "bottom wear"
          ? "Bottom wear"
          : "Accessories",
      price: Number(p.price) || 0,
      image: p.image || "/default.png", // fallback image
      description: p.description || "",
      owner: p.owner || null,
    }));

    const inserted = await Product.insertMany(formattedProducts);

    res
      .status(201)
      .json({ message: "Products seeded!", count: inserted.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
