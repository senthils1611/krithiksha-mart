"use client";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Grid2X2,
  Package,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Mobile, Laptop & Gadgets",
    products: 125,
    status: "Active",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Fashion",
    description: "Men & Women Clothing",
    products: 84,
    status: "Active",
    color: "bg-pink-500",
  },
  {
    id: 3,
    name: "Home Appliances",
    description: "Kitchen & Home",
    products: 63,
    status: "Active",
    color: "bg-orange-500",
  },
  {
    id: 4,
    name: "Beauty",
    description: "Cosmetics & Personal Care",
    products: 42,
    status: "Inactive",
    color: "bg-purple-500",
  },
  {
    id: 5,
    name: "Sports",
    description: "Fitness & Outdoor",
    products: 37,
    status: "Active",
    color: "bg-green-500",
  },
  {
    id: 6,
    name: "Books",
    description: "Educational & Story Books",
    products: 56,
    status: "Active",
    color: "bg-yellow-500",
  },
];

export default function CategoriesPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Categories
          </h1>

          <p className="text-slate-500 mt-2">
            Organize your products into categories.
          </p>

        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow">

          <Plus size={18} />

          Add Category

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
            type="text"
            placeholder="Search categories..."
            className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
          />

        </div>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {categories.map((category) => (

          <div
            key={category.id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden"
          >

            <div className={`${category.color} h-3`} />

            <div className="p-6">

              <div className="flex justify-between items-start">

                <div
                  className={`w-14 h-14 rounded-xl ${category.color} text-white flex items-center justify-center`}
                >
                  <Grid2X2 size={28} />
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    category.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {category.status}
                </span>

              </div>

              <h2 className="text-xl font-bold mt-5">
                {category.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {category.description}
              </p>

              <div className="flex items-center gap-2 mt-5 text-orange-500">

                <Package size={18} />

                <span className="font-semibold">
                  {category.products} Products
                </span>

              </div>

              <div className="flex justify-end gap-3 mt-6">

                <button className="w-10 h-10 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 flex items-center justify-center">

                  <Pencil size={18} />

                </button>

                <button className="w-10 h-10 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center">

                  <Trash2 size={18} />

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}