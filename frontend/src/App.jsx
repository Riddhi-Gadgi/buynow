import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import MyProducts from "./pages/MyProducts";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route
          path="/signup"
          element={
            <div className="bg-purple-50 min-h-screen">
              <Signup />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="bg-pink-50 min-h-screen">
              <Login />
            </div>
          }
        />
        <Route
          path="/cart"
          element={
            <div className="bg-green-50 min-h-screen">
              <Cart />
            </div>
          }
        />
        <Route
          path="/my-products"
          element={
            <div className="bg-yellow-50 min-h-screen">
              <MyProducts />
            </div>
          }
        />
      </Routes>
    </div>
  );
}
