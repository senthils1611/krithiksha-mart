"use client";

import { useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getAllOrders, updateOrderStatus, deleteOrder } from "@/lib/api";

type Order = {
  _id: string;
  user?: { name: string; email: string };
  customer: { fullName: string; email: string };
  totalAmount: number;
  paymentMethod: string;
  orderStatus: string;
  createdAt: string;
};

const STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const loadOrders = () => {
    setLoading(true);
    getAllOrders()
      .then((data) => setOrders(data.orders ?? []))
      .catch(() => toast.error("Failed to load orders"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (order: Order, status: string) => {
    try {
      await updateOrderStatus(order._id, status);
      setOrders((prev) =>
        prev.map((o) =>
          o._id === order._id ? { ...o, orderStatus: status } : o
        )
      );
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update order status");
    }
  };

  const handleDelete = async (order: Order) => {
    if (!confirm(`Delete order KM${order._id.slice(-8).toUpperCase()}?`)) return;

    try {
      await deleteOrder(order._id);
      setOrders((prev) => prev.filter((o) => o._id !== order._id));
      toast.success("Order deleted");
    } catch {
      toast.error("Failed to delete order");
    }
  };

  const filtered = orders.filter((order) => {
    const matchesSearch =
      order.customer?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      order.customer?.email?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-5">

        <div>

          <h1 className="text-3xl font-bold">
            Orders
          </h1>

          <p className="text-muted-foreground mt-2">
            Manage customer orders
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="bg-surface p-5 rounded-2xl shadow">

        <div className="flex flex-col lg:flex-row gap-4">

          <div className="flex-1 relative">

            <Search
              size={18}
              className="absolute left-4 top-4 text-muted-foreground"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer name or email..."
              className="w-full border border-border bg-background text-foreground rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-primary"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-border bg-background text-foreground rounded-xl px-5"
          >

            <option>All Status</option>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}

          </select>

        </div>

      </div>

      {/* Table */}

      <div className="bg-surface rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-surface-muted">

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

            {loading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                  Loading orders...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                  No orders found.
                </td>
              </tr>
            ) : (
              filtered.map((order) => (

                <tr
                  key={order._id}
                  className="border-b border-border hover:bg-surface-muted"
                >

                  <td className="p-4 font-semibold">
                    KM{order._id.slice(-8).toUpperCase()}
                  </td>

                  <td>

                    <div>

                      <h3 className="font-medium">
                        {order.customer?.fullName}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {order.customer?.email}
                      </p>

                    </div>

                  </td>

                  <td className="font-semibold">
                    ₹{order.totalAmount.toLocaleString()}
                  </td>

                  <td className="text-sm text-muted-foreground">
                    {order.paymentMethod}
                  </td>

                  <td>

                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-sm border-none outline-none
                      ${
                        order.orderStatus === "Delivered"
                          ? "bg-success/10 text-success"
                          : order.orderStatus === "Processing"
                          ? "bg-accent/10 text-accent"
                          : order.orderStatus === "Shipped"
                          ? "bg-secondary/10 text-secondary"
                          : order.orderStatus === "Cancelled"
                          ? "bg-danger/10 text-danger"
                          : "bg-surface-muted text-foreground"
                      }`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                  </td>

                  <td>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => handleDelete(order)}
                        className="bg-danger/10 p-2 rounded-lg text-danger hover:bg-danger/20"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

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
