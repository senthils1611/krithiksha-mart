"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
    const wishlist = [
        {
            _id: "1",
            name: "Apple iPhone 16 Pro",
            category: "Smartphone",
            price: 129999,
            image: "/products/default.jpg",
        },
        {
            _id: "2",
            name: "Sony WH-1000XM5",
            category: "Headphones",
            price: 29999,
            image: "/products/default.jpg",
        },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-pink-50 py-12">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}

                <div className="mb-10">

                    <p className="text-pink-500 font-semibold uppercase tracking-[4px]">
                        KRITHIKSHA MART
                    </p>

                    <h1 className="text-5xl font-extrabold text-gray-900 mt-2">
                        My Wishlist
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Save your favourite products and shop them anytime.
                    </p>

                </div>

                {wishlist.length === 0 ? (

                    <div className="bg-white rounded-3xl shadow-xl p-14 text-center">

                        <div className="w-28 h-28 mx-auto rounded-full bg-pink-100 flex items-center justify-center">

                            <Heart
                                size={60}
                                className="text-pink-500"
                            />

                        </div>

                        <h2 className="text-4xl font-bold mt-8">
                            Your Wishlist is Empty
                        </h2>

                        <p className="text-gray-500 mt-4 max-w-md mx-auto">
                            Browse our latest collection and save your favourite products here.
                        </p>

                        <Link
                            href="/products"
                            className="inline-block mt-8 bg-gradient-to-r from-pink-500 to-red-500 text-white px-10 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition duration-300"
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
                                    className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition duration-300"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-60 object-cover"
                                    />

                                    <div className="p-6">

                                        <span className="inline-block px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-sm font-semibold">
                                            {item.category}
                                        </span>

                                        <h2 className="text-2xl font-bold mt-4 text-gray-900">
                                            {item.name}
                                        </h2>

                                        <p className="text-3xl font-extrabold text-orange-500 mt-4">
                                            ₹{item.price.toLocaleString()}
                                        </p>

                                        <div className="flex gap-3 mt-8">

                                            <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition">
                                                Move to Cart
                                            </button>

                                            <button className="px-5 border-2 border-red-500 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition">
                                                Remove
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