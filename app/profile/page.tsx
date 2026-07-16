"use client";

import { User, Mail, Phone, MapPin, Pencil } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-orange-50 py-12">
      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}

          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-10 text-white text-center">

            <div className="w-28 h-28 mx-auto rounded-full bg-white flex items-center justify-center shadow-xl">

              <User size={60} className="text-orange-500" />

            </div>

            <h1 className="text-4xl font-extrabold mt-6">
              My Profile
            </h1>

            <p className="text-orange-100 mt-2">
              Manage your account information
            </p>

          </div>

          {/* Details */}

          <div className="p-8 grid md:grid-cols-2 gap-6">

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <User className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <h3 className="font-bold text-lg">Senthil Santhosh</h3>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <Mail className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <h3 className="font-bold text-lg">
                    senthil@example.com
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <Phone className="text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Mobile</p>
                  <h3 className="font-bold text-lg">
                    +91 9876543210
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <MapPin className="text-red-500" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <h3 className="font-bold text-lg">
                    Pollachi, Tamil Nadu
                  </h3>
                </div>
              </div>
            </div>

          </div>

          <div className="px-8 pb-8">
            <button className="flex items-center justify-center gap-2 w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition">

              <Pencil size={20} />

              Edit Profile

            </button>
          </div>

        </div>

      </div>
    </main>
  );
}