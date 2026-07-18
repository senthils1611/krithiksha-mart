import Link from "next/link";
import { ArrowRight, BadgePercent } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-highlight via-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left */}

          <div>

            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
              <BadgePercent size={20} />
              <span className="font-semibold">
                Limited Time Offer
              </span>
            </div>

            <h2 className="text-5xl font-extrabold leading-tight">
              Mega Sale
              <br />
              Up to
              <span className="text-accent"> 70% OFF</span>
            </h2>

            <p className="mt-6 text-lg text-white/90 leading-8">
              Upgrade your lifestyle with the latest electronics,
              fashion, home appliances and much more.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-10 rounded-xl bg-white px-8 py-4 font-semibold text-highlight transition hover:scale-105 shadow-lg"
            >
              Shop Now
              <ArrowRight size={20} />
            </Link>

          </div>

          {/* Right */}

          <div className="hidden lg:flex justify-center">

            <div className="relative flex h-72 w-72 items-center justify-center rounded-full bg-white/15 backdrop-blur">
              <div className="flex h-48 w-48 items-center justify-center rounded-full bg-white/20 text-7xl">
                🏷️
              </div>
              <span className="absolute -top-2 left-6 text-4xl">🎁</span>
              <span className="absolute bottom-2 -right-4 text-4xl">💫</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}