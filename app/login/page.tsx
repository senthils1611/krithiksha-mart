"use client";

import Link from "next/link";
import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center text-white">

          <h1 className="text-4xl font-extrabold">
            Welcome Back
          </h1>

          <p className="mt-2 text-orange-100">
            Login to continue shopping with
          </p>

          <p className="font-bold text-xl mt-1">
            KRITHIKSHA MART
          </p>

        </div>

        {/* Form */}

        <div className="p-8">

          <div className="mb-5">

            <label className="block mb-2 font-semibold text-gray-700">
              Email Address
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 focus-within:border-orange-500 transition">

              <Mail className="text-gray-400" size={20} />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-4 outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
              />

            </div>

          </div>

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Password
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 focus-within:border-orange-500 transition">

              <Lock className="text-gray-400" size={20} />

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-4 outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
              />

            </div>

          </div>

          <div className="flex justify-end mt-4">

            <Link
              href="/forgot-password"
              className="text-orange-500 font-medium hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          <button
            className="w-full mt-8 flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition duration-300"
          >

            <LogIn size={22} />

            Login

          </button>

          <div className="mt-8 text-center">

            <p className="text-gray-600">
              Don't have an account?
            </p>

            <Link
              href="/register"
              className="inline-block mt-3 text-orange-500 font-bold hover:underline"
            >
              Create a New Account
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}