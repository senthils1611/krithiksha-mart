"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
export default function WishlistPage() {
    const {
        wishlist,
        removeFromWishlist,
    } = useWishlist();

    const { addToCart } = useCart();
    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-highlight/5 py-12">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}

                <div className="mb-10">

                    <p className="text-highlight font-semibold uppercase tracking-[4px]">
                        KRITHIKSHA MART
                    </p>

                    <h1 className="text-5xl font-extrabold text-foreground mt-2">
                        My Wishlist
                    </h1>

                    <p className="text-muted-foreground mt-3">
                        Save your favourite products and shop them anytime.
                    </p>

                </div>

                {wishlist.length === 0 ? (

                    <div className="bg-surface border border-border rounded-3xl shadow-xl p-14 text-center">

                        <div className="w-28 h-28 mx-auto rounded-full bg-highlight/10 flex items-center justify-center">

                            <Heart
                                size={60}
                                className="text-highlight"
                            />

                        </div>

                        <h2 className="text-4xl font-bold mt-8 text-foreground">
                            Your Wishlist is Empty
                        </h2>

                        <p className="text-muted-foreground mt-4 max-w-md mx-auto">
                            Browse our latest collection and save your favourite products here.
                        </p>

                        <Link
                            href="/products"
                            className="inline-block mt-8 bg-gradient-to-r from-highlight to-primary text-white px-10 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition duration-300"
                        >
                            Explore Products
                        </Link>

                    </div>

                ) : (

                    <div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {wishlist.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-surface rounded-3xl shadow-xl border border-border overflow-hidden hover:shadow-2xl transition duration-300"
                                >
                                    <Image
    src={item.images?.[0] || "/products/default.jpg"}
    alt={item.name}
    width={500}
    height={400}
    className="w-full h-60 object-cover bg-surface-muted"
/>

                                    <div className="p-6">

                                        <span className="inline-block px-3 py-1 rounded-full bg-highlight/10 text-highlight text-sm font-semibold">
                                            {item.category}
                                        </span>

                                        <h2 className="text-2xl font-bold mt-4 text-foreground">
                                            {item.name}
                                        </h2>

                                        <p className="text-3xl font-extrabold text-primary mt-4">
                                            ₹{item.price.toLocaleString()}
                                        </p>

                                        <div className="flex gap-3 mt-8">

                                            <button
                                                onClick={() => {
                                                    addToCart(item);
                                                    removeFromWishlist(item._id);
                                                }}
                                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-highlight to-primary text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
                                            >
                                                <ShoppingCart size={18} />
                                                Move to Cart
                                            </button>

                                            <button
                                                onClick={() => removeFromWishlist(item._id)}
                                                className="px-5 border-2 border-danger text-danger rounded-xl hover:bg-danger/10 transition flex items-center justify-center"
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                )}

            </div>
        </main>
    );
}
