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
      className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold hover:opacity-90 transition"
    >
      Add to Cart
    </button>
  );
}
