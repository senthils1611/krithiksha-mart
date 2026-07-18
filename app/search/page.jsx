"use client";

import Link from "next/link";
import { Search, Star, ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Apple iPhone 16 Pro",
    category: "Smartphone",
    price: 129999,
    rating: 4.9,
    image: "/products/default.jpg",
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    category: "Headphones",
    price: 29999,
    rating: 4.8,
    image: "/products/default.jpg",
  },
];

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="mb-10">

          <p className="uppercase tracking-[4px] text-primary font-semibold">
            KRITHIKSHA MART
          </p>

          <h1 className="text-5xl font-extrabold mt-2">
            Search Results
          </h1>

          <p className="text-muted-foreground mt-2">
            Showing products matching your search.
          </p>

        </div>

        {/* Search */}

        <div className="relative mb-10">

          <Search
            className="absolute left-5 top-4 text-muted-foreground"
            size={22}
          />

          <input
            placeholder="Search products..."
            className="w-full h-14 rounded-2xl border-2 border-border pl-14 pr-5 outline-none focus:border-primary"
          />

        </div>

        {/* Products */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((item) => (

            <div
              key={item.id}
              className="bg-surface rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">

                <span className="text-sm text-primary font-semibold">
                  {item.category}
                </span>

                <h2 className="text-xl font-bold mt-2">
                  {item.name}
                </h2>

                <div className="flex items-center gap-2 mt-3">

                  <Star
                    className="fill-accent text-accent"
                    size={18}
                  />

                  {item.rating}

                </div>

                <p className="text-3xl font-bold text-primary mt-4">
                  ₹{item.price.toLocaleString()}
                </p>

                <div className="flex gap-3 mt-6">

                  <Link
                    href={`/products/${item.id}`}
                    className="flex-1 text-center border border-primary text-primary py-3 rounded-xl font-semibold hover:bg-primary/10"
                  >
                    View
                  </Link>

                  <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-highlight text-white py-3 rounded-xl font-semibold">

                    <ShoppingCart size={18} />

                    Cart

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}