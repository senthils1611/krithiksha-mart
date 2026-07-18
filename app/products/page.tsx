"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { SlidersHorizontal, ChevronRight } from "lucide-react";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    list = list.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;

      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return list;
  }, [products, search, selectedCategory, sortBy]);

  return (
    <main className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Breadcrumb */}

        <div className="flex items-center text-sm text-muted-foreground mb-5">
          Home
          <ChevronRight size={16} className="mx-2" />
          Products
        </div>

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-10">

          <div>

            <h1 className="text-5xl font-extrabold text-foreground">
              Explore Products
            </h1>

            <p className="mt-3 text-muted-foreground">
              <span className="font-semibold text-primary">
                {filteredProducts.length}
              </span>{" "}
              Products Found
            </p>

          </div>

          <div className="flex flex-col md:flex-row gap-4">

            <SearchBar
              value={search}
              onChange={setSearch}
            />

            <div className="flex items-center rounded-xl bg-surface border border-border shadow px-4">

              <SlidersHorizontal size={18} className="text-muted-foreground" />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent px-3 py-4 outline-none text-foreground"
              >
                <option value="latest">Newest</option>
                <option value="price-low">
                  Price: Low → High
                </option>
                <option value="price-high">
                  Price: High → Low
                </option>
                <option value="name">
                  Name (A-Z)
                </option>
              </select>

            </div>

          </div>

        </div>

        {/* Layout */}

        <div className="grid lg:grid-cols-12 gap-10">

          {/* Sidebar */}

          <aside className="lg:col-span-3">

            <div className="sticky top-24 rounded-3xl bg-surface border border-border shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Filters
              </h2>

              <CategoryFilter
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />

            </div>

          </aside>

          {/* Products */}

          <section className="lg:col-span-9">

            {loading ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

                {Array.from({ length: 6 }).map((_, index) => (

                  <div
                    key={index}
                    className="h-96 rounded-3xl bg-surface animate-pulse"
                  />

                ))}

              </div>

            ) : filteredProducts.length === 0 ? (

              <div className="rounded-3xl bg-surface border border-border p-20 shadow text-center">

                <h2 className="text-3xl font-bold text-foreground">
                  No Products Found
                </h2>

                <p className="mt-4 text-muted-foreground">
                  Try another category or search term.
                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

                {filteredProducts.map((product) => (

                  <ProductCard
                    key={product._id}
                    product={product}
                  />

                ))}

              </div>

            )}

          </section>

        </div>

      </div>

    </main>
  );
}