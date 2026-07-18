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
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-success/5 flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full bg-surface rounded-[30px] shadow-2xl border border-border overflow-hidden">

        {/* Success Header */}

        <div className="bg-gradient-to-r from-success to-secondary p-10 text-center text-white">

          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl">

            <CheckCircle2
              size={70}
              className="text-success"
            />

          </div>

          <h1 className="text-4xl font-extrabold mt-6">
            Order Confirmed!
          </h1>

          <p className="mt-3 text-white/90 text-lg">
            Thank you for shopping with
            <span className="font-bold">
              {" "}KRITHIKSHA Mart
            </span>
          </p>

        </div>

        {/* Order Details */}

        <div className="p-8">

          <div className="grid sm:grid-cols-2 gap-5">

            <div className="rounded-2xl bg-primary/10 border border-primary/20 p-5">

              <div className="flex items-center gap-3">

                <ShoppingBag className="text-primary" />

                <div>

                  <p className="text-sm text-muted-foreground">
                    Order ID
                  </p>

                  <h3 className="font-bold text-lg text-foreground">
                    {orderId}
                  </h3>

                </div>

              </div>

            </div>

            <div className="rounded-2xl bg-secondary/10 border border-secondary/20 p-5">

              <div className="flex items-center gap-3">

                <Truck className="text-secondary" />

                <div>

                  <p className="text-sm text-muted-foreground">
                    Estimated Delivery
                  </p>

                  <h3 className="font-bold text-lg text-foreground">
                    {deliveryDate.toLocaleDateString()}
                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* Success Message */}

          <div className="mt-8 rounded-2xl bg-success/10 border border-success/30 p-6">

            <div className="flex gap-4">

              <PackageCheck
                size={40}
                className="text-success"
              />

              <div>

                <h3 className="font-bold text-lg text-success">
                  Your order has been placed successfully.
                </h3>

                <p className="text-muted-foreground mt-2 leading-7">
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
              className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-highlight text-white py-4 font-bold text-lg shadow-lg hover:scale-105 transition duration-300"
            >
              Continue Shopping
            </Link>

            <Link
              href="/orders"
              className="flex items-center justify-center rounded-2xl border-2 border-primary text-primary py-4 font-bold text-lg hover:bg-primary/10 transition duration-300"
            >
              View My Orders
            </Link>

          </div>

          {/* Footer */}

          <div className="mt-10 text-center">

            <p className="text-muted-foreground">
              Need help? Contact our support team anytime.
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Thank you for choosing KRITHIKSHA Mart ❤️
            </p>

          </div>

        </div>

      </div>
    </main>
  );
}
