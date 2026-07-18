"use client";

import { Home, Plus, Pencil, Trash2 } from "lucide-react";

export default function AddressPage() {
  const addresses = [
    {
      id: 1,
      name: "Senthil Santhosh",
      phone: "+91 9876543210",
      address:
        "12, Main Road, Pollachi, Coimbatore, Tamil Nadu - 642001",
      default: true,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">

          <div>

            <p className="text-primary uppercase tracking-[4px] font-semibold">
              KRITHIKSHA MART
            </p>

            <h1 className="text-5xl font-extrabold mt-2">
              My Addresses
            </h1>

          </div>

          <button className="flex items-center gap-2 bg-gradient-to-r from-primary to-highlight text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition">

            <Plus size={20} />

            Add Address

          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {addresses.map((item) => (

            <div
              key={item.id}
              className="bg-surface rounded-3xl shadow-xl p-8 border border-border"
            >

              <div className="flex justify-between">

                <div className="flex items-center gap-3">

                  <Home className="text-primary" />

                  <h2 className="font-bold text-xl">
                    {item.name}
                  </h2>

                </div>

                {item.default && (
                  <span className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-semibold">
                    Default
                  </span>
                )}

              </div>

              <p className="mt-5 text-muted-foreground">
                {item.phone}
              </p>

              <p className="mt-3 text-muted-foreground leading-7">
                {item.address}
              </p>

              <div className="flex gap-4 mt-8">

                <button className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl hover:opacity-90">

                  <Pencil size={18} />

                  Edit

                </button>

                <button className="flex items-center gap-2 border border-danger text-danger px-5 py-3 rounded-xl hover:bg-danger/10">

                  <Trash2 size={18} />

                  Delete

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </main>
  );
}