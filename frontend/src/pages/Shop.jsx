import React, { useState, useEffect } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    type: "All",
    min: "",
    max: "",
  });

  // Fetch products with optional filters
  const fetchProducts = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await API.get(`/products?${query}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      alert("Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  // Add product to cart
  const addToCart = async (id) => {
    try {
      await API.post("/cart", { productId: id, quantity: 1 });
      alert("Added to cart!");
    } catch {
      alert("Please login first!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <FilterBar filters={filters} setFilters={setFilters} />

      {products.length === 0 ? (
        <p className="mt-6 text-gray-500 text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              addToCart={addToCart}
              isOwner={false} // shop view: no edit/delete
            />
          ))}
        </div>
      )}
    </div>
  );
}
