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
    color: "text-secondary bg-secondary/10",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% secure payment gateway.",
    color: "text-success bg-success/10",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free returns.",
    color: "text-accent bg-accent/10",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Friendly customer support anytime.",
    color: "text-highlight bg-highlight/10",
  },
  {
    icon: CreditCard,
    title: "Multiple Payments",
    description: "UPI, Cards, Net Banking & Wallets.",
    color: "text-danger bg-danger/10",
  },
  {
    icon: BadgeCheck,
    title: "Quality Products",
    description: "Carefully selected premium brands.",
    color: "text-primary bg-primary/10",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-surface-muted py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Why Shop With Us?
          </span>

          <h2 className="mt-4 text-4xl font-bold text-foreground">
            Why Choose Krithiksha Mart?
          </h2>

          <p className="mt-3 text-muted-foreground">
            We make online shopping simple, secure and enjoyable.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-surface border border-border p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${feature.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-3 text-muted-foreground">
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