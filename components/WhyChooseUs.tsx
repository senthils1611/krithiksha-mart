import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  CreditCard,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Free shipping on orders above ₹999.",
    color: "text-blue-600 bg-blue-100",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% secure payment gateway.",
    color: "text-green-600 bg-green-100",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free returns.",
    color: "text-orange-600 bg-orange-100",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Friendly customer support anytime.",
    color: "text-purple-600 bg-purple-100",
  },
  {
    icon: CreditCard,
    title: "Multiple Payments",
    description: "UPI, Cards, Net Banking & Wallets.",
    color: "text-red-600 bg-red-100",
  },
  {
    icon: BadgeCheck,
    title: "Quality Products",
    description: "Carefully selected premium brands.",
    color: "text-indigo-600 bg-indigo-100",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Why Shop With Us?
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            Why Choose Krithiksha Mart?
          </h2>

          <p className="mt-3 text-gray-500">
            We make online shopping simple, secure and enjoyable.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${feature.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}