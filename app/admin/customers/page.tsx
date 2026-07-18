"use client";

import { useEffect, useState } from "react";
import { Search, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { getAllUsers } from "@/lib/api";

type Customer = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  createdAt: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllUsers()
      .then((data) => setCustomers(data.users ?? []))
      .catch(() => toast.error("Failed to load customers"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-5">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Customers
          </h1>

          <p className="text-slate-500 mt-2">
            All registered accounts on the store
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer by name or email..."
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
              <th className="text-left">Role</th>
              <th className="text-left">Joined</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  Loading customers...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            ) : (
              filtered.map((customer) => (

                <tr
                  key={customer._id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-4">

                    <div className="flex items-center gap-4">

                      <img
                        src={`https://i.pravatar.cc/150?u=${customer._id}`}
                        alt={customer.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />

                      <div>

                        <h3 className="font-semibold">
                          {customer.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          ID #{customer._id.slice(-6)}
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

                      {customer.phone && (
                        <div className="flex items-center gap-2 text-sm">

                          <Phone size={15} />

                          {customer.phone}

                        </div>
                      )}

                    </div>

                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize
                      ${
                        customer.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {customer.role}
                    </span>

                  </td>

                  <td>
                    {new Date(customer.createdAt).toLocaleDateString()}
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
