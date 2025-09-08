import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Define colors for each route (Blink-It effect)
  const linkColors = {
    "/": "bg-blue-500 text-white",
    "/login": "bg-pink-500 text-white",
    "/signup": "bg-purple-500 text-white",
    "/cart": "bg-green-500 text-white",
    "/my-products": "bg-yellow-500 text-white",
  };

  const getLinkClass = (path) => {
    const base = "px-4 py-1 rounded-full transition-colors";
    return location.pathname === path
      ? `${base} ${linkColors[path]}`
      : `${base} text-blue-600 hover:text-white hover:bg-blue-500`;
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md rounded-b-2xl">
      <Link to="/" className="font-bold text-2xl text-blue-600">
        BuyNow
      </Link>

      <div className="flex gap-3 items-center">
        {/* Explore always visible */}
        <Link to="/" className={getLinkClass("/")}>
          Explore
        </Link>

        {token && (
          <Link to="/my-products" className={getLinkClass("/my-products")}>
            My Products
          </Link>
        )}

        <Link to="/cart" className={getLinkClass("/cart")}>
          <ShoppingCart className="w-5 h-5 inline-block" />
        </Link>

        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className={getLinkClass("/login")}>
              Login
            </Link>
            <Link to="/signup" className={getLinkClass("/signup")}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
