"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Users,
  Layers3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
    } else if (user.role !== "admin") {
      router.push("/");
    }
  }, [loading, user, router]);

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Checking access...
      </div>
    );
  }

  const menus = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: ShoppingBag,
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: ClipboardList,
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: Users,
    },
    {
      title: "Categories",
      href: "/admin/categories",
      icon: Layers3,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-50 h-screen w-72 bg-slate-900 text-white shadow-2xl transform transition-transform duration-300

        ${
          open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-700">

          <div>

            <h1 className="text-3xl font-extrabold tracking-wide">
              <span className="text-orange-400">KM</span>
            </h1>

            <p className="text-xs text-gray-400 mt-1">
              KRITHIKSHA MART ADMIN
            </p>

          </div>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <X />
          </button>
        </div>

        <nav className="mt-8 px-4">

          {menus.map((menu) => {
            const Icon = menu.icon;

            const active =
              pathname === menu.href;

            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl mb-2 transition-all duration-200

                ${
                  active
                    ? "bg-orange-500 text-white shadow-lg"
                    : "hover:bg-slate-800 text-slate-300"
                }`}
              >
                <Icon size={22} />

                <span className="font-medium">
                  {menu.title}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-5 border-t border-slate-700">

          <button
            onClick={logout}
            className="flex items-center gap-3 text-red-400 hover:text-red-300"
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="sticky top-0 z-30 bg-white shadow-sm px-8 py-5 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              onClick={() => setOpen(true)}
              className="lg:hidden"
            >
              <Menu />
            </button>

            <h2 className="text-2xl font-bold">
              Admin Dashboard
            </h2>

          </div>

          <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-4 py-3 w-96">

            <Search
              size={18}
              className="text-gray-500"
            />

            <input
              placeholder="Search..."
              className="bg-transparent outline-none ml-3 w-full"
            />

          </div>

          <div className="flex items-center gap-6">

            <div className="relative">

              <Bell className="text-gray-600" />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>

            </div>

            <div className="flex items-center gap-3">

              <img
                src="https://i.pravatar.cc/100"
                alt="Admin"
                className="w-11 h-11 rounded-full"
              />

              <div className="hidden md:block">

                <h4 className="font-semibold">
                  {user.name}
                </h4>

                <p className="text-xs text-gray-500">
                  Administrator
                </p>

              </div>

            </div>

          </div>

        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}