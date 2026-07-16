import Link from "next/link";
import { ArrowRight, BadgePercent } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white">
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
              <span className="text-yellow-300"> 70% OFF</span>
            </h2>

            <p className="mt-6 text-lg text-orange-100 leading-8">
              Upgrade your lifestyle with the latest electronics,
              fashion, home appliances and much more.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-10 rounded-xl bg-white px-8 py-4 font-semibold text-orange-600 transition hover:scale-105"
            >
              Shop Now
              <ArrowRight size={20} />
            </Link>

          </div>

          {/* Right */}

          <div className="hidden lg:flex justify-center">

            <img
              src="/promo-shopping.png"
              alt="Mega Sale"
              className="w-full max-w-md drop-shadow-2xl"
            />

          </div>

        </div>

      </div>
    </section>
  );
}