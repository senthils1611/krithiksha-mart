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
  Sun,
  Moon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

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
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur border-b border-border shadow-sm">

      {/* Top Header */}

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <div className="h-20 flex items-center justify-between gap-4">

          {/* Logo */}

          <Link href="/">
            <h1 className="text-3xl font-extrabold tracking-wide">
              <span className="text-primary">
                KRITHIKSHA
              </span>

              <span className="text-highlight">
                {" "}Mart
              </span>
            </h1>
          </Link>

          {/* Search */}

          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 max-w-xl mx-6"
          >

            <div className="flex w-full overflow-hidden rounded-full border-2 border-border bg-background focus-within:border-primary transition">

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-5 py-3 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
              />

              <button
                type="submit"
                className="bg-primary px-5 text-primary-foreground hover:opacity-90 transition"
              >

                <Search size={20} />

              </button>

            </div>

          </form>

          {/* Desktop Icons */}

          <div className="hidden md:flex items-center gap-5">

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-muted-foreground hover:text-accent transition"
            >
              {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            <Link
              href="/wishlist"
              className="relative text-foreground hover:text-highlight transition"
            >
              <Heart />

              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-highlight text-highlight-foreground text-xs h-5 w-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative text-foreground hover:text-secondary transition"
            >

              <ShoppingCart />

              {cartCount > 0 && (

                <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs h-5 w-5 rounded-full flex items-center justify-center">

                  {cartCount}

                </span>

              )}

            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="text-sm font-semibold text-primary hover:text-highlight transition"
                  >
                    Admin
                  </Link>
                )}

                <Link
                  href="/profile"
                  className="text-foreground hover:text-accent transition"
                  title={user.name}
                >
                  <User />
                </Link>

                <button
                  onClick={logout}
                  className="text-sm font-medium text-muted-foreground hover:text-highlight transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-foreground hover:text-accent transition"
              >
                <User />
              </Link>
            )}

          </div>

          {/* Mobile Button */}

          <div className="flex items-center gap-3 md:hidden">

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-muted-foreground"
            >
              {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="text-foreground"
            >

              {mobileMenu ? <X /> : <Menu />}

            </button>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <div className="hidden md:block border-t border-border bg-surface-muted">

        <div className="max-w-7xl mx-auto">

          <nav className="flex justify-center gap-10 py-4">

            {navItems.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition ${pathname === item.href
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground hover:text-highlight"
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

        <div className="md:hidden bg-surface border-t border-border">

          <nav className="flex flex-col">

            {navItems.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className="px-6 py-4 border-b border-border hover:bg-surface-muted text-foreground"
              >

                {item.name}

              </Link>

            ))}

            <Link
              href="/wishlist"
              className="px-6 py-4 border-b border-border text-foreground"
            >
              Wishlist
            </Link>

            <Link
              href="/profile"
              className="px-6 py-4 border-b border-border text-foreground"
            >
              Profile
            </Link>

            <Link
              href="/cart"
              className="px-6 py-4 border-b border-border text-foreground"
            >
              Cart ({cartCount})
            </Link>

            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenu(false)}
                    className="px-6 py-4 border-b border-border text-foreground"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenu(false);
                    logout();
                  }}
                  className="px-6 py-4 text-left text-highlight"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenu(false)}
                className="px-6 py-4 text-foreground"
              >
                Login
              </Link>
            )}

          </nav>

        </div>

      )}

    </header>
  );
}
