"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const wishlisted = isWishlisted(product._id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product._id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const originalPrice = Math.round(product.price * 1.2);

  return (
    <div className="group bg-surface rounded-2xl border border-border shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden">

      {/* Image */}

      <div className="relative overflow-hidden bg-surface-muted">

        <img
          src={product.images?.[0] || "/products/default.jpg"}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Discount */}

        <div className="absolute left-4 top-4 bg-highlight text-highlight-foreground text-xs font-semibold px-3 py-1 rounded-full">
          20% OFF
        </div>

        {/* Wishlist */}

        <button
          onClick={handleToggleWishlist}
          className="absolute right-4 top-4 bg-surface p-2 rounded-full shadow hover:scale-110 transition"
        >
          <Heart
            size={18}
            className={
              wishlisted ? "fill-highlight text-highlight" : "text-muted-foreground"
            }
          />
        </button>

      </div>

      {/* Content */}

      <div className="p-5">

        <p className="text-sm uppercase tracking-wide text-secondary font-semibold">
          {product.category}
        </p>

        <h3 className="mt-2 text-lg font-bold text-foreground line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}

        <div className="flex items-center gap-1 mt-3">

          {[1,2,3,4,5].map((item) => (
            <Star
              key={item}
              size={16}
              className="fill-accent text-accent"
            />
          ))}

          <span className="text-sm text-muted-foreground ml-2">
            (120)
          </span>

        </div>

        {/* Price */}

        <div className="mt-4 flex items-center gap-3">

          <span className="text-3xl font-bold text-primary">
            ₹{product.price}
          </span>

          <span className="line-through text-muted-foreground">
            ₹{originalPrice}
          </span>

        </div>

        {/* Stock */}

        <div className="mt-3">

          {product.stock > 0 ? (
            <span className="text-success font-medium">
              ✔ In Stock
            </span>
          ) : (
            <span className="text-danger font-medium">
              Out of Stock
            </span>
          )}

        </div>

        {/* Buttons */}

        <div className="mt-6 flex gap-3">

          <Link
            href={`/products/${product._id}`}
            className="flex-1 flex items-center justify-center gap-2 border border-border rounded-xl py-3 hover:bg-surface-muted transition text-foreground"
          >
            <Eye size={18} />
            View
          </Link>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3 hover:opacity-90 transition disabled:opacity-40"
          >
            <ShoppingCart size={18} />
            Add
          </button>

        </div>

      </div>

    </div>
  );
}
