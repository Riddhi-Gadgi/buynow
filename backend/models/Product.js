const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["Top wear", "Bottom wear", "Accessories"],
      required: true,
    },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
