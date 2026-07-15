"use client";

import { Search, ShoppingCart, Heart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Header() {
  const { cartCount } = useCart();
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-3xl font-bold">
          KRITHIKSHA <span className="text-orange-400">Mart</span>
        </h1>

        {/* Search */}
        <div className="hidden md:flex items-center bg-white rounded-lg overflow-hidden w-96">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 text-black outline-none"
          />
          <button className="bg-orange-500 px-4 py-2 hover:bg-orange-600">
            <Search size={20} />
          </button>
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-6">
          <Link href="/login">
            Login
          </Link>

          <button className="flex items-center gap-2 hover:text-orange-400">
            <Heart size={22} />
            <span>Wishlist</span>
          </button>

          <Link
            href="/cart"
            className="flex items-center gap-2 hover:text-orange-400"
          >
            🛒 Cart ({cartCount})
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-blue-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-orange-400">
            Home
          </a>
          <a href="#" className="hover:text-orange-400">
            Categories
          </a>
          <a href="#" className="hover:text-orange-400">
            Today's Deals
          </a>
          <a href="#" className="hover:text-orange-400">
            New Arrivals
          </a>
          <a href="#" className="hover:text-orange-400">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
