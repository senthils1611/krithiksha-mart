import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";

export default async function FeaturedProducts() {
  let products: Product[] = [];

  try {
    const data = await getProducts();
    products = data.products || [];
  } catch {
    products = [];
  }

  return (
    <section className="bg-gray-50 py-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row items-center justify-between mb-12">

          <div>

            <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
              🔥 Trending Collection
            </span>

            <h2 className="mt-4 text-4xl font-bold text-gray-900">
              Featured Products
            </h2>

            <p className="mt-3 text-gray-500">
              Discover our latest and most popular products.
            </p>

          </div>

          <Link
            href="/products"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 rounded-xl border border-blue-600 px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-700 hover:text-white"
          >
            View All
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* Empty */}

        {products.length === 0 ? (

          <div className="rounded-3xl bg-white p-16 text-center shadow">

            <h3 className="text-3xl font-bold">
              No Products Available
            </h3>

            <p className="mt-3 text-gray-500">
              Please add products from the admin dashboard.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        )}

      </div>

    </section>
  );
}