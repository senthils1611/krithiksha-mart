"use client";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Filter,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "₹2,499",
    stock: 42,
    status: "Active",
    image: "https://picsum.photos/80?1",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Wearables",
    price: "₹3,999",
    stock: 8,
    status: "Low Stock",
    image: "https://picsum.photos/80?2",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    category: "Audio",
    price: "₹1,699",
    stock: 0,
    status: "Out of Stock",
    image: "https://picsum.photos/80?3",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    category: "Accessories",
    price: "₹1,299",
    stock: 55,
    status: "Active",
    image: "https://picsum.photos/80?4",
  },
];

export default function ProductsPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Products
          </h1>

          <p className="text-slate-500 mt-2">
            Manage all products in your store.
          </p>
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow">
          <Plus size={18} />
          Add Product
        </button>

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex flex-col lg:flex-row gap-4">

          <div className="flex-1 relative">

            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>

          <select className="border rounded-xl px-5 py-3">

            <option>All Categories</option>
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Wearables</option>

          </select>

          <button className="border rounded-xl px-5 py-3 flex items-center gap-2 hover:bg-slate-100">

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

              <th className="text-left p-4">Product</th>
              <th className="text-left">Category</th>
              <th className="text-left">Price</th>
              <th className="text-left">Stock</th>
              <th className="text-left">Status</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="p-4">

                  <div className="flex items-center gap-4">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />

                    <div>

                      <h3 className="font-semibold">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Product ID #{product.id}
                      </p>

                    </div>

                  </div>

                </td>

                <td>{product.category}</td>

                <td className="font-semibold">
                  {product.price}
                </td>

                <td>{product.stock}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium

                    ${
                      product.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : product.status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-3">

                    <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                      <Eye size={18} />
                    </button>

                    <button className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200">
                      <Pencil size={18} />
                    </button>

                    <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200">
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* Pagination */}

        <div className="flex justify-between items-center p-5 border-t">

          <p className="text-gray-500">
            Showing 1–4 of 325 Products
          </p>

          <div className="flex gap-2">

            <button className="border px-4 py-2 rounded-lg hover:bg-slate-100">
              Previous
            </button>

            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
              1
            </button>

            <button className="border px-4 py-2 rounded-lg hover:bg-slate-100">
              2
            </button>

            <button className="border px-4 py-2 rounded-lg hover:bg-slate-100">
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}