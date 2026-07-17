"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "Today's Deals", href: "/deals" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();
  const pathname = usePathname();

  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">

      {/* Top Header */}

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}

          <Link href="/">
            <h1 className="text-3xl font-extrabold tracking-wide">
              <span className="text-blue-700">
                KRITHIKSHA
              </span>

              <span className="text-orange-500">
                {" "}Mart
              </span>
            </h1>
          </Link>

          {/* Search */}

          <div className="hidden lg:flex flex-1 max-w-xl mx-10">

            <div className="flex w-full overflow-hidden rounded-full border border-gray-300 shadow-sm">

              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-5 py-3 outline-none"
              />

              <button className="bg-orange-500 px-5 text-white hover:bg-orange-600 transition">

                <Search size={20} />

              </button>

            </div>

          </div>

          {/* Desktop Icons */}

          <div className="hidden md:flex items-center gap-6">

            <Link
              href="/wishlist"
              className="relative hover:text-orange-500 transition"
            >
              <Heart />

              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative hover:text-orange-500 transition"
            >

              <ShoppingCart />

              {cartCount > 0 && (

                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">

                  {cartCount}

                </span>

              )}

            </Link>

            <Link
              href="/profile"
              className="hover:text-orange-500 transition"
            >
              <User />
            </Link>

          </div>

          {/* Mobile Button */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden"
          >

            {mobileMenu ? <X /> : <Menu />}

          </button>

        </div>

      </div>

      {/* Navigation */}

      <div className="hidden md:block border-t bg-gray-50">

        <div className="max-w-7xl mx-auto">

          <nav className="flex justify-center gap-10 py-4">

            {navItems.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition ${pathname === item.href
                    ? "text-blue-700 border-b-2 border-blue-700 pb-1"
                    : "text-gray-700 hover:text-orange-500"
                  }`}
              >

                {item.name}

              </Link>

            ))}

          </nav>

        </div>

      </div>

      {/* Mobile Menu */}

      {mobileMenu && (

        <div className="md:hidden bg-white border-t">

          <nav className="flex flex-col">

            {navItems.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className="px-6 py-4 border-b hover:bg-gray-50"
              >

                {item.name}

              </Link>

            ))}

            <Link
              href="/wishlist"
              className="px-6 py-4 border-b"
            >
              Wishlist
            </Link>

            <Link
              href="/profile"
              className="px-6 py-4 border-b"
            >
              Profile
            </Link>

            <Link
              href="/cart"
              className="px-6 py-4"
            >
              Cart ({cartCount})
            </Link>

          </nav>

        </div>

      )}

    </header>
  );
}