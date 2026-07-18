"use client";

import { Heart } from "lucide-react";
import { Product } from "@/types/product";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

type Props = {
  product: Product;
};

export default function WishlistButton({ product }: Props) {
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const wishlisted = isWishlisted(product._id);

  const handleToggle = () => {
    if (wishlisted) {
      removeFromWishlist(product._id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center justify-center gap-2 rounded-xl border-2 border-border px-6 py-4 font-semibold text-foreground hover:border-highlight transition"
    >
      <Heart
        size={20}
        className={wishlisted ? "fill-highlight text-highlight" : "text-muted-foreground"}
      />
      {wishlisted ? "Wishlisted" : "Wishlist"}
    </button>
  );
}
