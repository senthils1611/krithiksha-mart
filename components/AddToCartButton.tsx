"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  toast.success(`${product.name} added to cart`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
    >
      Add to Cart
    </button>
  );
}
