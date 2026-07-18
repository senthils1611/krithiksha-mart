"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ShoppingBag,
  PackageCheck,
  Truck,
} from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <OrderSuccessContent />
    </Suspense>
  );
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const rawOrderId = searchParams.get("orderId");
  const orderId = rawOrderId
    ? "KM" + rawOrderId.slice(-8).toUpperCase()
    : "N/A";

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full bg-white rounded-[30px] shadow-2xl border border-gray-100 overflow-hidden">

        {/* Success Header */}

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-10 text-center text-white">

          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl">

            <CheckCircle2
              size={70}
              className="text-green-600"
            />

          </div>

          <h1 className="text-4xl font-extrabold mt-6">
            Order Confirmed!
          </h1>

          <p className="mt-3 text-green-100 text-lg">
            Thank you for shopping with
            <span className="font-bold">
              {" "}KRITHIKSHA Mart
            </span>
          </p>

        </div>

        {/* Order Details */}

        <div className="p-8">

          <div className="grid sm:grid-cols-2 gap-5">

            <div className="rounded-2xl bg-orange-50 border border-orange-100 p-5">

              <div className="flex items-center gap-3">

                <ShoppingBag className="text-orange-500" />

                <div>

                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <h3 className="font-bold text-lg text-gray-800">
                    {orderId}
                  </h3>

                </div>

              </div>

            </div>

            <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">

              <div className="flex items-center gap-3">

                <Truck className="text-blue-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Estimated Delivery
                  </p>

                  <h3 className="font-bold text-lg text-gray-800">
                    {deliveryDate.toLocaleDateString()}
                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* Success Message */}

          <div className="mt-8 rounded-2xl bg-green-50 border border-green-200 p-6">

            <div className="flex gap-4">

              <PackageCheck
                size={40}
                className="text-green-600"
              />

              <div>

                <h3 className="font-bold text-lg text-green-700">
                  Your order has been placed successfully.
                </h3>

                <p className="text-gray-600 mt-2 leading-7">
                  We have received your order and started processing it.
                  You'll receive shipping updates on your registered email
                  and mobile number.
                </p>

              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="grid sm:grid-cols-2 gap-4 mt-10">

            <Link
              href="/products"
              className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 font-bold text-lg shadow-lg hover:scale-105 transition duration-300"
            >
              Continue Shopping
            </Link>

            <Link
              href="/orders"
              className="flex items-center justify-center rounded-2xl border-2 border-orange-500 text-orange-600 py-4 font-bold text-lg hover:bg-orange-50 transition duration-300"
            >
              View My Orders
            </Link>

          </div>

          {/* Footer */}

          <div className="mt-10 text-center">

            <p className="text-gray-500">
              Need help? Contact our support team anytime.
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Thank you for choosing KRITHIKSHA Mart ❤️
            </p>

          </div>

        </div>

      </div>
    </main>
  );
}