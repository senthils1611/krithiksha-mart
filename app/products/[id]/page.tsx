import Link from "next/link";
import { Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { getProductById } from "@/lib/api";
import AddToCartButton from "@/components/AddToCartButton";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductDetails({ params }: Props) {
  const data = await getProductById(params.id);
  const product = data.product;

  if (!product) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
      </div>
    );
  }

  const originalPrice = Math.round(product.price * 1.2);

  return (
    <main className="bg-slate-100 min-h-screen py-12">

      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}

        <div className="text-sm text-gray-500 mb-8">

          <Link href="/">Home</Link>

          <span className="mx-2">/</span>

          <Link href="/products">Products</Link>

          <span className="mx-2">/</span>

          <span className="text-blue-700">
            {product.name}
          </span>

        </div>

        {/* Main */}

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Image */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <img
              src={product.images?.[0] || "/products/default.jpg"}
              alt={product.name}
              className="w-full h-[550px] object-contain"
            />

          </div>

          {/* Details */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <span className="inline-block rounded-full bg-blue-100 text-blue-700 px-4 py-1 font-medium">
              {product.category}
            </span>

            <h1 className="mt-5 text-5xl font-bold">
              {product.name}
            </h1>

            <p className="mt-4 text-gray-600">
              Brand :
              <span className="font-semibold">
                {" "}
                {product.brand}
              </span>
            </p>

            {/* Rating */}

            <div className="flex items-center gap-2 mt-6">

              {[1,2,3,4,5].map((item) => (

                <Star
                  key={item}
                  size={20}
                  className="fill-yellow-400 text-yellow-400"
                />

              ))}

              <span className="text-gray-500">
                (120 Reviews)
              </span>

            </div>

            {/* Price */}

            <div className="flex items-center gap-4 mt-8">

              <span className="text-5xl font-bold text-orange-600">
                ₹{product.price}
              </span>

              <span className="text-2xl text-gray-400 line-through">
                ₹{originalPrice}
              </span>

              <span className="bg-red-500 text-white rounded-full px-3 py-1 text-sm">
                20% OFF
              </span>

            </div>

            {/* Description */}

            <p className="mt-8 leading-8 text-gray-700">

              {product.description}

            </p>

            {/* Stock */}

            <div className="mt-8">

              {product.stock > 0 ? (

                <span className="text-green-600 font-semibold text-lg">
                  ✔ In Stock ({product.stock} Available)
                </span>

              ) : (

                <span className="text-red-600 font-semibold">
                  Out of Stock
                </span>

              )}

            </div>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <div className="flex-1">

                <AddToCartButton product={product} />

              </div>

              <button className="flex-1 rounded-xl bg-orange-500 text-white py-4 font-semibold hover:bg-orange-600 transition">
                Buy Now
              </button>

            </div>

            {/* Features */}

            <div className="grid grid-cols-3 gap-6 mt-12 border-t pt-8">

              <div className="text-center">

                <Truck className="mx-auto text-blue-700" />

                <p className="mt-3 text-sm">
                  Free Delivery
                </p>

              </div>

              <div className="text-center">

                <RotateCcw className="mx-auto text-orange-500" />

                <p className="mt-3 text-sm">
                  Easy Return
                </p>

              </div>

              <div className="text-center">

                <ShieldCheck className="mx-auto text-green-600" />

                <p className="mt-3 text-sm">
                  Secure Payment
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}