"use client";

import {
  ShoppingBag,
  Target,
  Eye,
  HeartHandshake,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-orange-50 py-12">

      <div className="max-w-7xl mx-auto px-6">

        {/* Hero */}

        <div className="text-center mb-14">

          <p className="uppercase tracking-[4px] text-orange-500 font-semibold">
            KRITHIKSHA MART
          </p>

          <h1 className="text-5xl font-extrabold mt-3">
            About Us
          </h1>

          <p className="text-gray-500 mt-4 max-w-3xl mx-auto text-lg">
            KRITHIKSHA MART is your trusted online shopping destination,
            bringing quality products, affordable prices, and fast delivery
            together in one place.
          </p>

        </div>

        {/* About Card */}

        <div className="bg-white rounded-3xl shadow-xl p-10 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">

              <ShoppingBag
                size={38}
                className="text-orange-500"
              />

            </div>

            <div>

              <h2 className="text-3xl font-bold">
                Who We Are
              </h2>

              <p className="text-gray-600 mt-3 leading-8">
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

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">

              <Target
                className="text-blue-600"
                size={30}
              />

            </div>

            <h2 className="text-2xl font-bold">
              Our Mission
            </h2>

            <p className="text-gray-600 mt-4 leading-8">
              To make online shopping simple, affordable, and
              accessible for everyone while maintaining excellent
              quality and customer satisfaction.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">

              <Eye
                className="text-green-600"
                size={30}
              />

            </div>

            <h2 className="text-2xl font-bold">
              Our Vision
            </h2>

            <p className="text-gray-600 mt-4 leading-8">
              To become one of India's most trusted online shopping
              platforms by delivering value, innovation, and
              outstanding customer experiences.
            </p>

          </div>

        </div>

        {/* Why Choose */}

        <div className="bg-white rounded-3xl shadow-xl p-10 mt-10">

          <div className="flex items-center gap-5 mb-6">

            <HeartHandshake
              className="text-red-500"
              size={40}
            />

            <h2 className="text-3xl font-bold">
              Why Choose KRITHIKSHA MART?
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-orange-50 rounded-2xl p-5">
              ✅ High Quality Products
            </div>

            <div className="bg-orange-50 rounded-2xl p-5">
              ✅ Affordable Prices
            </div>

            <div className="bg-orange-50 rounded-2xl p-5">
              ✅ Secure Payments
            </div>

            <div className="bg-orange-50 rounded-2xl p-5">
              ✅ Fast Delivery
            </div>

            <div className="bg-orange-50 rounded-2xl p-5">
              ✅ Easy Returns
            </div>

            <div className="bg-orange-50 rounded-2xl p-5">
              ✅ 24×7 Customer Support
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}