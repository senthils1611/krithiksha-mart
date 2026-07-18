"use client";

import {
  ShoppingBag,
  Target,
  Eye,
  HeartHandshake,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">

      <div className="max-w-7xl mx-auto px-6">

        {/* Hero */}

        <div className="text-center mb-14">

          <p className="uppercase tracking-[4px] text-primary font-semibold">
            KRITHIKSHA MART
          </p>

          <h1 className="text-5xl font-extrabold mt-3">
            About Us
          </h1>

          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
            KRITHIKSHA MART is your trusted online shopping destination,
            bringing quality products, affordable prices, and fast delivery
            together in one place.
          </p>

        </div>

        {/* About Card */}

        <div className="bg-surface rounded-3xl shadow-xl p-10 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">

              <ShoppingBag
                size={38}
                className="text-primary"
              />

            </div>

            <div>

              <h2 className="text-3xl font-bold">
                Who We Are
              </h2>

              <p className="text-muted-foreground mt-3 leading-8">
                We are committed to delivering a secure, seamless,
                and enjoyable online shopping experience. Our goal
                is to provide customers with quality products,
                competitive prices, and exceptional customer service.
              </p>

            </div>

          </div>

        </div>

        {/* Mission & Vision */}

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-surface rounded-3xl shadow-xl p-8">

            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6">

              <Target
                className="text-secondary"
                size={30}
              />

            </div>

            <h2 className="text-2xl font-bold">
              Our Mission
            </h2>

            <p className="text-muted-foreground mt-4 leading-8">
              To make online shopping simple, affordable, and
              accessible for everyone while maintaining excellent
              quality and customer satisfaction.
            </p>

          </div>

          <div className="bg-surface rounded-3xl shadow-xl p-8">

            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-6">

              <Eye
                className="text-success"
                size={30}
              />

            </div>

            <h2 className="text-2xl font-bold">
              Our Vision
            </h2>

            <p className="text-muted-foreground mt-4 leading-8">
              To become one of India's most trusted online shopping
              platforms by delivering value, innovation, and
              outstanding customer experiences.
            </p>

          </div>

        </div>

        {/* Why Choose */}

        <div className="bg-surface rounded-3xl shadow-xl p-10 mt-10">

          <div className="flex items-center gap-5 mb-6">

            <HeartHandshake
              className="text-danger"
              size={40}
            />

            <h2 className="text-3xl font-bold">
              Why Choose KRITHIKSHA MART?
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-primary/5 rounded-2xl p-5">
              ✅ High Quality Products
            </div>

            <div className="bg-primary/5 rounded-2xl p-5">
              ✅ Affordable Prices
            </div>

            <div className="bg-primary/5 rounded-2xl p-5">
              ✅ Secure Payments
            </div>

            <div className="bg-primary/5 rounded-2xl p-5">
              ✅ Fast Delivery
            </div>

            <div className="bg-primary/5 rounded-2xl p-5">
              ✅ Easy Returns
            </div>

            <div className="bg-primary/5 rounded-2xl p-5">
              ✅ 24×7 Customer Support
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}