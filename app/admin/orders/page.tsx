"use client";

import {
  Search,
  Filter,
  Eye,
  Printer,
  Download,
} from "lucide-react";

const orders = [
  {
    id: "#1001",
    customer: "Senthil",
    email: "senthil@gmail.com",
    amount: "₹2,450",
    payment: "Paid",
    status: "Delivered",
    date: "16 Jul 2026",
  },
  {
    id: "#1002",
    customer: "Rahul",
    email: "rahul@gmail.com",
    amount: "₹1,180",
    payment: "Pending",
    status: "Processing",
    date: "15 Jul 2026",
  },
  {
    id: "#1003",
    customer: "Arun",
    email: "arun@gmail.com",
    amount: "₹4,560",
    payment: "Paid",
    status: "Shipped",
    date: "14 Jul 2026",
  },
  {
    id: "#1004",
    customer: "Karthik",
    email: "karthik@gmail.com",
    amount: "₹890",
    payment: "Refunded",
    status: "Cancelled",
    date: "13 Jul 2026",
  },
];

export default function OrdersPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-5">

        <div>

          <h1 className="text-3xl font-bold">
            Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Manage customer orders
          </p>

        </div>

        <div className="flex gap-3">

          <button className="border rounded-xl px-5 py-3 hover:bg-gray-100 flex items-center gap-2">

            <Download size={18} />

            Export

          </button>

          <button className="bg-orange-500 text-white rounded-xl px-5 py-3 hover:bg-orange-600">

            Today's Orders

          </button>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white p-5 rounded-2xl shadow">

        <div className="flex flex-col lg:flex-row gap-4">

          <div className="flex-1 relative">

            <Search
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              placeholder="Search Order..."
              className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>

          <select className="border rounded-xl px-5">

            <option>All Status</option>
            <option>Delivered</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Cancelled</option>

          </select>

          <button className="border rounded-xl px-5 flex items-center gap-2 hover:bg-gray-100">

            <Filter size={18} />

            Filter

          </button>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">
                Order
              </th>

              <th className="text-left">
                Customer
              </th>

              <th className="text-left">
                Amount
              </th>

              <th className="text-left">
                Payment
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Date
              </th>

              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="p-4 font-semibold">
                  {order.id}
                </td>

                <td>

                  <div>

                    <h3 className="font-medium">
                      {order.customer}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {order.email}
                    </p>

                  </div>

                </td>

                <td className="font-semibold">
                  {order.amount}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm

                    ${
                      order.payment === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.payment === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.payment}
                  </span>

                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm

                    ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>

                </td>

                <td>
                  {order.date}
                </td>

                <td>

                  <div className="flex justify-center gap-3">

                    <button className="bg-blue-100 p-2 rounded-lg text-blue-600 hover:bg-blue-200">
                      <Eye size={18} />
                    </button>

                    <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
                      <Printer size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}