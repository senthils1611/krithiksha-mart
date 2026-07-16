"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  stock: number;
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const originalPrice = Math.round(product.price * 1.2);

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden">

      {/* Image */}

      <div className="relative overflow-hidden">

        <img
          src={product.images?.[0] || "/products/default.jpg"}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Discount */}

        <div className="absolute left-4 top-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          20% OFF
        </div>

        {/* Wishlist */}

        <button
          onClick={() => setWishlist(!wishlist)}
          className="absolute right-4 top-4 bg-white p-2 rounded-full shadow hover:scale-110 transition"
        >
          <Heart
            size={18}
            className={
              wishlist ? "fill-red-500 text-red-500" : "text-gray-600"
            }
          />
        </button>

      </div>

      {/* Content */}

      <div className="p-5">

        <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
          {product.category}
        </p>

        <h3 className="mt-2 text-lg font-bold text-gray-800 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}

        <div className="flex items-center gap-1 mt-3">

          {[1,2,3,4,5].map((item) => (
            <Star
              key={item}
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}

          <span className="text-sm text-gray-500 ml-2">
            (120)
          </span>

        </div>

        {/* Price */}

        <div className="mt-4 flex items-center gap-3">

          <span className="text-3xl font-bold text-orange-600">
            ₹{product.price}
          </span>

          <span className="line-through text-gray-400">
            ₹{originalPrice}
          </span>

        </div>

        {/* Stock */}

        <div className="mt-3">

          {product.stock > 0 ? (
            <span className="text-green-600 font-medium">
              ✔ In Stock
            </span>
          ) : (
            <span className="text-red-600 font-medium">
              Out of Stock
            </span>
          )}

        </div>

        {/* Buttons */}

        <div className="mt-6 flex gap-3">

          <Link
            href={`/products/${product._id}`}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-3 hover:bg-gray-100 transition"
          >
            <Eye size={18} />
            View
          </Link>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-700 text-white rounded-xl py-3 hover:bg-blue-800 transition disabled:bg-gray-400"
          >
            <ShoppingCart size={18} />
            Add
          </button>

        </div>

      </div>

    </div>
  );
}