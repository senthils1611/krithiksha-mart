"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
} from "lucide-react";
import { getAllOrders, getProducts, getAllUsers } from "@/lib/api";

type Order = {
  _id: string;
  customer: { fullName: string };
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  items: { name: string; quantity: number }[];
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllOrders(), getProducts(), getAllUsers()])
      .then(([orderData, productData, userData]) => {
        setOrders(orderData.orders ?? []);
        setProductCount(productData.products?.length ?? 0);
        setCustomerCount(userData.users?.length ?? 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Orders",
      value: orders.length.toString(),
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Products",
      value: productCount.toString(),
      icon: Package,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Customers",
      value: customerCount.toString(),
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const productSales = new Map<string, number>();
  orders.forEach((order) => {
    order.items?.forEach((item) => {
      productSales.set(
        item.name,
        (productSales.get(item.name) ?? 0) + item.quantity
      );
    });
  });

  const topProducts = Array.from(productSales.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8">

      {/* Heading */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome back 👋
          </p>

        </div>

        <Link
          href="/admin/products"
          className="bg-orange-500 hover:bg-orange-600 transition px-5 py-3 rounded-xl text-white font-semibold shadow"
        >
          + Add Product
        </Link>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition"
          >
            <div className="flex justify-between">

              <div>

                <p className="text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-3">
                  {loading ? "…" : item.value}
                </h2>

              </div>

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.color}`}
              >
                <item.icon size={28} />
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Overview */}

      <div className="grid xl:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow p-6 xl:col-span-3">

          <h2 className="text-xl font-semibold mb-5">
            Top Selling Products
          </h2>

          <div className="space-y-5">

            {topProducts.length === 0 ? (
              <p className="text-gray-400">No sales data yet.</p>
            ) : (
              topProducts.map(([name, sold]) => (

                <div
                  key={name}
                  className="flex justify-between items-center"
                >

                  <p className="font-medium">
                    {name}
                  </p>

                  <span className="font-bold text-orange-500">
                    {sold} Sold
                  </span>

                </div>

              ))
            )}

          </div>

        </div>

      </div>

      {/* Orders */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-xl font-semibold">
            Recent Orders
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">Order ID</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  {loading ? "Loading orders..." : "No orders yet."}
                </td>
              </tr>
            ) : (
              recentOrders.map((order) => (

                <tr
                  key={order._id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-4 font-semibold">
                    KM{order._id.slice(-8).toUpperCase()}
                  </td>

                  <td>{order.customer?.fullName}</td>

                  <td>₹{order.totalAmount.toLocaleString()}</td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm

                      ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : order.orderStatus === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : order.orderStatus === "Processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
