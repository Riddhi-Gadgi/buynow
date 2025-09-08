const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const protect = require("../middleware/auth");

// Get user cart
router.get("/", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );
  res.json(cart || { items: [] });
});

// Add to cart
router.post("/", protect, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (i) => i.product.toString() === productId
    );
    if (itemIndex > -1) cart.items[itemIndex].quantity += quantity;
    else cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  const updatedCart = await cart.populate("items.product");
  res.json(updatedCart);
});

// Remove from cart
router.delete("/:id", protect, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });
  cart.items = cart.items.filter((i) => i._id.toString() !== req.params.id);
  await cart.save();
  const updatedCart = await cart.populate("items.product");
  res.json(updatedCart);
});

module.exports = router;
