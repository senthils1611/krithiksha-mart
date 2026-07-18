"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  CalendarDays,
  CircleDollarSign,
  Truck,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getMyOrders } from "@/lib/api";

type Order = {
  _id: string;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
};

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      getMyOrders()
        .then((data) => setOrders(data.orders))
        .catch(() => setOrders([]))
        .finally(() => setLoading(false));
    }
  }, [authLoading, user, router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="mb-10">

          <p className="text-primary font-semibold uppercase tracking-[4px]">
            KRITHIKSHA MART
          </p>

          <h1 className="text-5xl font-extrabold text-foreground mt-2">
            My Orders
          </h1>

          <p className="text-muted-foreground mt-3">
            Track and manage all your purchases in one place.
          </p>

        </div>

        {loading || authLoading ? (

          <div className="bg-surface border border-border rounded-3xl shadow-xl p-14 text-center text-muted-foreground">
            Loading your orders...
          </div>

        ) : orders.length === 0 ? (

          <div className="bg-surface border border-border rounded-3xl shadow-xl p-14 text-center">

            <Package
              size={80}
              className="mx-auto text-primary"
            />

            <h2 className="text-3xl font-bold mt-6 text-foreground">
              No Orders Yet
            </h2>

            <p className="text-muted-foreground mt-4">
              Start shopping to see your orders here.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-8 bg-gradient-to-r from-primary to-highlight text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
            >
              Shop Now
              <ArrowRight size={20} />
            </Link>

          </div>

        ) : (

          <div className="space-y-8">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-surface rounded-3xl shadow-xl border border-border hover:shadow-2xl transition-all duration-300 p-8"
              >

                <div className="grid md:grid-cols-4 gap-8">

                  {/* Order ID */}

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package className="text-primary" />
                    </div>

                    <div>

                      <p className="text-sm text-muted-foreground">
                        Order ID
                      </p>

                      <h3 className="font-bold text-lg text-foreground">
                        KM{order._id.slice(-8).toUpperCase()}
                      </h3>

                    </div>

                  </div>

                  {/* Date */}

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
                      <CalendarDays className="text-secondary" />
                    </div>

                    <div>

                      <p className="text-sm text-muted-foreground">
                        Order Date
                      </p>

                      <h3 className="font-semibold text-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </h3>

                    </div>

                  </div>

                  {/* Total */}

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center">
                      <CircleDollarSign className="text-success" />
                    </div>

                    <div>

                      <p className="text-sm text-muted-foreground">
                        Total Amount
                      </p>

                      <h3 className="font-bold text-primary text-xl">
                        ₹{order.totalAmount.toLocaleString()}
                      </h3>

                    </div>

                  </div>

                  {/* Status */}

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-highlight/10 flex items-center justify-center">
                      <Truck className="text-highlight" />
                    </div>

                    <div>

                      <p className="text-sm text-muted-foreground">
                        Status
                      </p>

                      <span
                        className={`inline-flex mt-1 px-4 py-2 rounded-full text-sm font-semibold ${
                          order.orderStatus === "Delivered"
                            ? "bg-success/10 text-success"
                            : order.orderStatus === "Cancelled"
                            ? "bg-danger/10 text-danger"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        {order.orderStatus}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </main>
  );
}
