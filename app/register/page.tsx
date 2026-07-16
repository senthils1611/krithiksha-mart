"use client";

import Link from "next/link";
import { User, Mail, Lock, UserPlus } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center text-white">

          <h1 className="text-4xl font-extrabold">
            Create Account
          </h1>

          <p className="mt-2 text-orange-100">
            Join KRITHIKSHA MART and start shopping today.
          </p>

        </div>

        {/* Form */}

        <div className="p-8 space-y-5">

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Full Name
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 focus-within:border-orange-500">
              <User className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-4 outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 focus-within:border-orange-500">
              <Mail className="text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-4 outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Password
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 focus-within:border-orange-500">
              <Lock className="text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Create a password"
                className="w-full p-4 outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 focus-within:border-orange-500">
              <Lock className="text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full p-4 outline-none bg-transparent"
              />
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl text-lg font-bold shadow-lg hover:scale-105 transition duration-300">

            <UserPlus size={22} />

            Create Account

          </button>

          <div className="text-center pt-4">

            <p className="text-gray-600">
              Already have an account?
            </p>

            <Link
              href="/login"
              className="inline-block mt-2 font-bold text-orange-500 hover:underline"
            >
              Login Here
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}