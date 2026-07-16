import Link from "next/link";
import {
  Laptop,
  Shirt,
  House,
  Smartphone,
  Watch,
  Dumbbell,
  ChefHat,
  Gamepad2,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    icon: Laptop,
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Mobiles",
    icon: Smartphone,
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Fashion",
    icon: Shirt,
    color: "bg-pink-100 text-pink-700",
  },
  {
    name: "Home",
    icon: House,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "Watches",
    icon: Watch,
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Sports",
    icon: Dumbbell,
    color: "bg-red-100 text-red-700",
  },
  {
    name: "Kitchen",
    icon: ChefHat,
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    color: "bg-indigo-100 text-indigo-700",
  },
];

export default function Categories() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            Browse Categories
          </span>

          <h2 className="text-4xl font-bold mt-4">
            Shop by Category
          </h2>

          <p className="text-gray-500 mt-3">
            Find products from your favourite categories.
          </p>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/products?category=${category.name}`}
                className="group"
              >
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                  <div
                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${category.color}`}
                  >
                    <Icon size={36} />
                  </div>

                  <h3 className="mt-6 text-center text-xl font-semibold">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-center text-sm text-gray-500">
                    Explore Products
                  </p>

                </div>
              </Link>
            );
          })}
        </div>

      </div>

    </section>
  );
}