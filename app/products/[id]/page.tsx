import { products } from "@/data/products";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default function ProductDetails({ params }: Props) {
  const product = products.find(
    (p) => p.id === Number(params.id)
  );

  if (!product) {
    return <h1 className="text-center mt-10">Product Not Found</h1>;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="text-blue-600 hover:underline"
      >
        ← Back to Home
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-8">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl shadow-lg w-full"
        />

        <div>
          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-yellow-500 mt-4">
            ⭐ {product.rating}
          </p>

          <h2 className="text-3xl font-bold text-orange-600 mt-4">
            ₹{product.price}
          </h2>

          <p className="mt-6 text-gray-600">
            {product.description}
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>

            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}