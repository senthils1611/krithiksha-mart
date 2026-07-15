import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-10">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}