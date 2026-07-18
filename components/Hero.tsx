"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary via-highlight to-accent text-white">

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <div>

            <span className="inline-block bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold mb-5">
              🔥 Summer Sale 2026
            </span>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Up to
              <span className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]"> 70% OFF </span>
              on Electronics
            </h1>

            <p className="mt-6 text-lg text-white/90 leading-8">
              Discover premium mobiles, laptops, fashion,
              home appliances and much more at unbeatable prices.
            </p>

            <div className="flex gap-4 mt-10">

              <Link
                href="/products"
                className="bg-white text-primary hover:scale-105 transition px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-lg"
              >
                Shop Now
                <ArrowRight size={20} />
              </Link>

              <Link
                href="/deals"
                className="border-2 border-white/70 px-8 py-4 rounded-xl hover:bg-white hover:text-primary transition font-semibold"
              >
                Explore Deals
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="hidden lg:flex justify-center">

            <div className="relative flex h-80 w-80 items-center justify-center rounded-full bg-white/15 backdrop-blur">
              <div className="flex h-56 w-56 items-center justify-center rounded-full bg-white/20 text-8xl">
                🛍️
              </div>
              <span className="absolute -top-2 right-6 text-4xl">🎉</span>
              <span className="absolute bottom-4 -left-4 text-4xl">✨</span>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Features */}

      <div className="bg-surface text-foreground">

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-8">

          <div className="flex items-center gap-3">
            <Truck className="text-secondary" />
            <div>
              <h4 className="font-semibold">Free Delivery</h4>
              <p className="text-sm text-muted-foreground">
                On orders above ₹999
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="text-success" />
            <div>
              <h4 className="font-semibold">Secure Payment</h4>
              <p className="text-sm text-muted-foreground">
                100% Protected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw className="text-accent" />
            <div>
              <h4 className="font-semibold">Easy Returns</h4>
              <p className="text-sm text-muted-foreground">
                7 Day Return Policy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Headphones className="text-highlight" />
            <div>
              <h4 className="font-semibold">24/7 Support</h4>
              <p className="text-sm text-muted-foreground">
                Dedicated Help
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}