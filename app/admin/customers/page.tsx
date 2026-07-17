"use client";

import {
  Search,
  UserPlus,
  Eye,
  Pencil,
  Mail,
  Phone,
  MoreVertical,
} from "lucide-react";

const customers = [
  {
    id: 1,
    name: "Senthil Santhosh",
    email: "senthil@gmail.com",
    phone: "+91 9876543210",
    orders: 18,
    spent: "₹32,450",
    status: "Active",
    joined: "10 Jul 2026",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    phone: "+91 9876543211",
    orders: 10,
    spent: "₹18,600",
    status: "Active",
    joined: "09 Jul 2026",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Arun Prakash",
    email: "arun@gmail.com",
    phone: "+91 9876543212",
    orders: 6,
    spent: "₹8,900",
    status: "Blocked",
    joined: "05 Jul 2026",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Karthik",
    email: "karthik@gmail.com",
    phone: "+91 9876543213",
    orders: 25,
    spent: "₹52,200",
    status: "VIP",
    joined: "01 Jul 2026",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

export default function CustomersPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-5">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Customers
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your customers and their activity
          </p>
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow">
          <UserPlus size={18} />
          Add Customer
        </button>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            placeholder="Search customer..."
            className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-orange-400"
          />

        </div>

      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">Customer</th>
              <th className="text-left">Contact</th>
              <th className="text-left">Orders</th>
              <th className="text-left">Spent</th>
              <th className="text-left">Status</th>
              <th className="text-left">Joined</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {customers.map((customer) => (

              <tr
                key={customer.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="p-4">

                  <div className="flex items-center gap-4">

                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />

                    <div>

                      <h3 className="font-semibold">
                        {customer.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Customer #{customer.id}
                      </p>

                    </div>

                  </div>

                </td>

                <td>

                  <div className="space-y-1">

                    <div className="flex items-center gap-2 text-sm">

                      <Mail size={15} />

                      {customer.email}

                    </div>

                    <div className="flex items-center gap-2 text-sm">

                      <Phone size={15} />

                      {customer.phone}

                    </div>

                  </div>

                </td>

                <td>{customer.orders}</td>

                <td className="font-semibold">
                  {customer.spent}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : customer.status === "VIP"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>

                </td>

                <td>{customer.joined}</td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                      <Eye size={18} />
                    </button>

                    <button className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200">
                      <Pencil size={18} />
                    </button>

                    <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200">
                      <MoreVertical size={18} />
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