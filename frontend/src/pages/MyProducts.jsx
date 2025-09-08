import React, { useState, useEffect } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";
import ProductForm from "./ProductForm";

export default function MyProducts() {
  const [items, setItems] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch logged-in user's products
  const fetchMine = async () => {
    try {
      const res = await API.get("/products/my");
      setItems(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch your products.");
    }
  };

  useEffect(() => {
    fetchMine();
  }, []);

  // Handle Edit
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Handle Add
  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await API.delete(`/products/${id}`);
      setItems(items.filter((p) => p._id !== id)); // remove from UI
      alert("Product deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  // Called after saving from ProductForm
  const handleSaved = () => {
    setShowForm(false);
    fetchMine();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={handleAdd}
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        Add Product
      </button>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <ProductForm product={editingProduct} onSaved={handleSaved} />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {items.length === 0 ? (
        <p className="mt-6 text-gray-500">You have no products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
              isOwner={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
