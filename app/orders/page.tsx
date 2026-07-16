"use client";

import Link from "next/link";
import {
  Package,
  CalendarDays,
  CircleDollarSign,
  Truck,
  ArrowRight,
} from "lucide-react";

const orders = [
  {
    id: "KM100001",
    date: "16 Jul 2026",
    total: 79999,
    status: "Processing",
  },
  {
    id: "KM100002",
    date: "10 Jul 2026",
    total: 2499,
    status: "Delivered",
  },
];

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="mb-10">

          <p className="text-orange-500 font-semibold uppercase tracking-[4px]">
            KRITHIKSHA MART
          </p>

          <h1 className="text-5xl font-extrabold text-gray-900 mt-2">
            My Orders
          </h1>

          <p className="text-gray-500 mt-3">
            Track and manage all your purchases in one place.
          </p>

        </div>

        {orders.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-xl p-14 text-center">

            <Package
              size={80}
              className="mx-auto text-orange-500"
            />

            <h2 className="text-3xl font-bold mt-6">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-4">
              Start shopping to see your orders here.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-8 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
            >
              Shop Now
              <ArrowRight size={20} />
            </Link>

          </div>

        ) : (

          <div className="space-y-8">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 p-8"
              >

                <div className="grid md:grid-cols-4 gap-8">

                  {/* Order ID */}

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
                      <Package className="text-orange-500" />
                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Order ID
                      </p>

                      <h3 className="font-bold text-lg">
                        {order.id}
                      </h3>

                    </div>

                  </div>

                  {/* Date */}

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                      <CalendarDays className="text-blue-600" />
                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Order Date
                      </p>

                      <h3 className="font-semibold">
                        {order.date}
                      </h3>

                    </div>

                  </div>

                  {/* Total */}

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                      <CircleDollarSign className="text-green-600" />
                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Total Amount
                      </p>

                      <h3 className="font-bold text-orange-500 text-xl">
                        ₹{order.total.toLocaleString()}
                      </h3>

                    </div>

                  </div>

                  {/* Status */}

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                      <Truck className="text-purple-600" />
                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Status
                      </p>

                      <span
                        className={`inline-flex mt-1 px-4 py-2 rounded-full text-sm font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Buttons */}

                <div className="flex flex-wrap gap-4 mt-8">

                  <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:scale-105 transition">
                    View Details
                  </button>

                  <button className="px-6 py-3 rounded-xl border-2 border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 transition">
                    Track Order
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </main>
  );
}