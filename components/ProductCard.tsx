"use client";

import { Product } from "@/types/product";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold">{product.name}</h3>

      <p className="text-yellow-500 mt-2">⭐ {product.rating}</p>

      <p className="text-orange-600 text-2xl font-bold mt-2">
        ₹{product.price}
      </p>

      <div className="mt-4 flex gap-2">
        <Link
          href={`/products/${product.id}`}
          className="flex-1 text-center bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300"
        >
          View Details
        </Link>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
