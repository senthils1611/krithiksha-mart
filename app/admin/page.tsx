import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹2,48,550",
    change: "+12.8%",
    icon: IndianRupee,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Orders",
    value: "1,245",
    change: "+8.5%",
    icon: ShoppingCart,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Products",
    value: "325",
    change: "+15%",
    icon: Package,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Customers",
    value: "872",
    change: "+18%",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
  },
];

const recentOrders = [
  {
    id: "#1001",
    customer: "Senthil",
    amount: "₹2,450",
    status: "Delivered",
  },
  {
    id: "#1002",
    customer: "Rahul",
    amount: "₹980",
    status: "Processing",
  },
  {
    id: "#1003",
    customer: "Karthik",
    amount: "₹5,600",
    status: "Cancelled",
  },
  {
    id: "#1004",
    customer: "Arun",
    amount: "₹1,850",
    status: "Shipped",
  },
];

const topProducts = [
  {
    name: "Wireless Headphones",
    sold: 145,
  },
  {
    name: "Smart Watch",
    sold: 110,
  },
  {
    name: "Bluetooth Speaker",
    sold: 95,
  },
  {
    name: "Gaming Mouse",
    sold: 72,
  },
];

export default function AdminDashboard() {
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

        <button className="bg-orange-500 hover:bg-orange-600 transition px-5 py-3 rounded-xl text-white font-semibold shadow">
          + Add Product
        </button>

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
                  {item.value}
                </h2>

                <div className="flex items-center gap-1 mt-4 text-green-600">

                  <TrendingUp size={18} />

                  {item.change}

                </div>

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

        <div className="xl:col-span-2 bg-white rounded-2xl shadow p-6">

          <div className="flex justify-between">

            <h2 className="text-xl font-semibold">
              Revenue Overview
            </h2>

            <span className="text-green-600 font-semibold flex items-center gap-2">

              <TrendingUp size={18} />

              +24%

            </span>

          </div>

          <div className="h-72 flex items-center justify-center text-gray-400 text-lg">
            📈 Sales Chart (Recharts will be added next)
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Top Products
          </h2>

          <div className="space-y-5">

            {topProducts.map((product) => (

              <div
                key={product.name}
                className="flex justify-between items-center"
              >

                <div>

                  <p className="font-medium">
                    {product.name}
                  </p>

                  <span className="text-sm text-gray-500">
                    {product.sold} Sold
                  </span>

                </div>

                <span className="font-bold text-orange-500">
                  #{product.sold}
                </span>

              </div>

            ))}

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

            {recentOrders.map((order) => (

              <tr
                key={order.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="p-4 font-semibold">
                  {order.id}
                </td>

                <td>{order.customer}</td>

                <td>{order.amount}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm

                    ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}