"use client";

import { useEffect, useState } from "react";
import { Search, Grid2X2, Package } from "lucide-react";
import { toast } from "sonner";
import { getProducts } from "@/lib/api";

const COLORS = [
  "bg-primary",
  "bg-secondary",
  "bg-highlight",
  "bg-accent",
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts()
      .then((data) => {
        const counts = new Map<string, number>();
        (data.products ?? []).forEach((p: { category: string }) => {
          counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
        });
        setCategories(
          Array.from(counts.entries()).map(([name, count]) => ({ name, count }))
        );
      })
      .catch(() => toast.error("Failed to load categories"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">

        <div>

          <h1 className="text-3xl font-bold text-foreground">
            Categories
          </h1>

          <p className="text-muted-foreground mt-2">
            Categories are derived from your product listings.
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="bg-surface rounded-2xl shadow p-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-muted-foreground"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full border border-border bg-background text-foreground rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />

        </div>

      </div>

      {/* Cards */}

      {loading ? (
        <div className="bg-surface rounded-2xl shadow p-14 text-center text-muted-foreground">
          Loading categories...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-surface rounded-2xl shadow p-14 text-center text-muted-foreground">
          No categories yet. Add products with a category to see them here.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filtered.map((category, i) => (

            <div
              key={category.name}
              className="bg-surface rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden"
            >

              <div className={`${COLORS[i % COLORS.length]} h-3`} />

              <div className="p-6">

                <div
                  className={`w-14 h-14 rounded-xl ${COLORS[i % COLORS.length]} text-white flex items-center justify-center`}
                >
                  <Grid2X2 size={28} />
                </div>

                <h2 className="text-xl font-bold mt-5">
                  {category.name}
                </h2>

                <div className="flex items-center gap-2 mt-5 text-primary">

                  <Package size={18} />

                  <span className="font-semibold">
                    {category.count} Products
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}
