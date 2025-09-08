import React, { useState } from "react";
import API from "../api";

export default function ProductForm({ product, onSaved }) {
  const [form, setForm] = useState({
    name: product?.name || "",
    type: product?.type || "Top wear",
    price: product?.price || "",
    description: product?.description || "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.type || !form.price) {
      alert("Please fill all required fields.");
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("type", form.type);
    fd.append("price", form.price);
    fd.append("description", form.description);
    if (file) fd.append("image", file);

    try {
      if (product) {
        await API.put(`/products/${product._id}`, fd);
      } else {
        await API.post("/products", fd);
      }
      onSaved();
    } catch (err) {
      alert("Failed to save product");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-lg"
        required
      />
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-lg"
        required
      >
        <option value="Top wear">Top Wear</option>
        <option value="Bottom wear">Bottom Wear</option>
        <option value="Accessories">Accessories</option>
      </select>
      <input
        name="price"
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-lg"
        required
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-lg"
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        type="submit"
        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Save
      </button>
    </form>
  );
}
