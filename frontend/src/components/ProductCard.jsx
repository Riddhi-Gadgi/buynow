import React from "react";

export default function ProductCard({
  product,
  isOwner,
  onEdit,
  onDelete,
  addToCart,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col items-center p-4">
      <img
        src={product.image || "/default.png"}
        alt={product.name || "Product"}
        className="h-48 w-full object-cover rounded-2xl mb-3"
      />
      <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
      <p className="text-gray-500 mt-1">{product.type}</p>
      <p className="text-green-600 font-semibold mt-1 text-lg">
        ₹{product.price}
      </p>

      {isOwner && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onEdit(product)}
            className="px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="px-4 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      )}

      {!isOwner && addToCart && (
        <button
          onClick={() => addToCart(product._id)}
          className="mt-3 px-4 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
