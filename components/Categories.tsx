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
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Mobiles",
    icon: Smartphone,
    color: "bg-secondary/10 text-secondary",
  },
  {
    name: "Fashion",
    icon: Shirt,
    color: "bg-highlight/10 text-highlight",
  },
  {
    name: "Home",
    icon: House,
    color: "bg-accent/10 text-accent",
  },
  {
    name: "Watches",
    icon: Watch,
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Sports",
    icon: Dumbbell,
    color: "bg-highlight/10 text-highlight",
  },
  {
    name: "Kitchen",
    icon: ChefHat,
    color: "bg-accent/10 text-accent",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    color: "bg-secondary/10 text-secondary",
  },
];

export default function Categories() {
  return (
    <section className="py-20 bg-background">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
            Browse Categories
          </span>

          <h2 className="text-4xl font-bold mt-4 text-foreground">
            Shop by Category
          </h2>

          <p className="text-muted-foreground mt-3">
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
                <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                  <div
                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${category.color}`}
                  >
                    <Icon size={36} />
                  </div>

                  <h3 className="mt-6 text-center text-xl font-semibold text-foreground">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-center text-sm text-muted-foreground">
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