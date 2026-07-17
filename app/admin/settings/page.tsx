"use client";

import {
  Store,
  Mail,
  Phone,
  MapPin,
  BadgeIndianRupee,
  Truck,
  Bell,
  Shield,
  Save,
  Image as ImageIcon,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Store Settings
          </h1>
          <p className="text-slate-500 mt-2">
            Manage your store information and preferences.
          </p>
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg">
          <Save size={18} />
          Save Settings
        </button>
      </div>

      {/* Store Information */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <Store className="text-orange-500" />
          <h2 className="text-xl font-bold">Store Information</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Store Name"
            defaultValue="KRITHIKSHA Mart"
            className="border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="border rounded-xl pl-10 p-3 w-full focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Phone"
              className="border rounded-xl pl-10 p-3 w-full focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Address"
              className="border rounded-xl pl-10 p-3 w-full focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Branding */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <ImageIcon className="text-orange-500" />
          <h2 className="text-xl font-bold">Branding</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="font-medium">Store Logo</label>
            <input
              type="file"
              className="mt-2 w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="font-medium">Favicon</label>
            <input
              type="file"
              className="mt-2 w-full border rounded-xl p-3"
            />
          </div>
        </div>
      </div>

      {/* Currency & Shipping */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <BadgeIndianRupee className="text-orange-500" />
            <h2 className="text-xl font-bold">Currency & Tax</h2>
          </div>

          <div className="space-y-4">
            <select className="border rounded-xl p-3 w-full">
              <option>Indian Rupee (₹)</option>
              <option>US Dollar ($)</option>
            </select>

            <input
              type="number"
              placeholder="GST (%)"
              className="border rounded-xl p-3 w-full"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Truck className="text-orange-500" />
            <h2 className="text-xl font-bold">Shipping</h2>
          </div>

          <div className="space-y-4">
            <input
              type="number"
              placeholder="Free Shipping Above ₹"
              className="border rounded-xl p-3 w-full"
            />

            <input
              type="number"
              placeholder="Delivery Charge"
              className="border rounded-xl p-3 w-full"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-orange-500" />
          <h2 className="text-xl font-bold">Notifications</h2>
        </div>

        <div className="space-y-4">
          {[
            "Email Notifications",
            "Order Notifications",
            "Low Stock Alerts",
          ].map((item) => (
            <label
              key={item}
              className="flex items-center justify-between border rounded-xl p-4"
            >
              <span>{item}</span>

              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 accent-orange-500"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-orange-500" />
          <h2 className="text-xl font-bold">Security</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="password"
            placeholder="New Password"
            className="border rounded-xl p-3"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="border rounded-xl p-3"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl flex items-center gap-2 shadow-lg">
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}