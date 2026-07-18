"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.products ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const results = useMemo(() => {
    if (!initialQuery) return products;

    return products.filter((product) =>
      product.name.toLowerCase().includes(initialQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(initialQuery.toLowerCase())
    );
  }, [products, initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="mb-10">

          <p className="uppercase tracking-[4px] text-primary font-semibold">
            KRITHIKSHA MART
          </p>

          <h1 className="text-5xl font-extrabold mt-2 text-foreground">
            Search Results
          </h1>

          <p className="text-muted-foreground mt-2">
            {initialQuery
              ? `Showing results for "${initialQuery}"`
              : "Showing all products."}
          </p>

        </div>

        {/* Search */}

        <form onSubmit={handleSubmit} className="relative mb-10">

          <Search
            className="absolute left-5 top-4 text-muted-foreground"
            size={22}
          />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full h-14 rounded-2xl border-2 border-border bg-surface text-foreground placeholder:text-muted-foreground pl-14 pr-5 outline-none focus:border-primary"
          />

        </form>

        {/* Products */}

        {loading ? (

          <div className="bg-surface border border-border rounded-3xl shadow-xl p-16 text-center text-muted-foreground">
            Loading products...
          </div>

        ) : results.length === 0 ? (

          <div className="bg-surface border border-border rounded-3xl shadow-xl p-16 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              No Products Found
            </h2>
            <p className="mt-4 text-muted-foreground">
              Try a different search term.
            </p>
          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {results.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}

          </div>

        )}

      </div>

    </main>
  );
}
