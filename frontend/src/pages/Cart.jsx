import React, { useState, useEffect } from "react";
import API from "../api";

export default function Cart() {
  const [cart, setCart] = useState({ items: [] });

  const fetchCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data);
  };

  const removeItem = async (id) => {
    await API.delete(`/cart/${id}`);
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.items.length === 0 && <p>Cart is empty</p>}
      <div className="flex flex-col gap-4">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="card flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div>
                <h3 className="font-bold">{item.product.name}</h3>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold">
                ₹{item.product.price * item.quantity}
              </p>
              <button
                onClick={() => removeItem(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-full mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
