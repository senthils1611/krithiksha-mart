"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-700 text-white">

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <div>

            <span className="inline-block bg-orange-500 px-4 py-2 rounded-full text-sm font-semibold mb-5">
              🔥 Summer Sale 2026
            </span>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Up to
              <span className="text-orange-400"> 70% OFF </span>
              on Electronics
            </h1>

            <p className="mt-6 text-lg text-blue-100 leading-8">
              Discover premium mobiles, laptops, fashion,
              home appliances and much more at unbeatable prices.
            </p>

            <div className="flex gap-4 mt-10">

              <Link
                href="/products"
                className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-xl font-semibold flex items-center gap-2"
              >
                Shop Now
                <ArrowRight size={20} />
              </Link>

              <Link
                href="/deals"
                className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition"
              >
                Explore Deals
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="hidden lg:flex justify-center">

            <img
              src="/hero-shopping.png"
              alt="Shopping"
              className="w-full max-w-lg drop-shadow-2xl"
            />

          </div>

        </div>

      </div>

      {/* Bottom Features */}

      <div className="bg-white text-gray-800">

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-8">

          <div className="flex items-center gap-3">
            <Truck className="text-blue-700" />
            <div>
              <h4 className="font-semibold">Free Delivery</h4>
              <p className="text-sm text-gray-500">
                On orders above ₹999
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="text-green-600" />
            <div>
              <h4 className="font-semibold">Secure Payment</h4>
              <p className="text-sm text-gray-500">
                100% Protected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw className="text-orange-500" />
            <div>
              <h4 className="font-semibold">Easy Returns</h4>
              <p className="text-sm text-gray-500">
                7 Day Return Policy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Headphones className="text-purple-600" />
            <div>
              <h4 className="font-semibold">24/7 Support</h4>
              <p className="text-sm text-gray-500">
                Dedicated Help
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}