import Link from "next/link";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import PromoBanner from "@/components/PromoBanner";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      <section className="bg-gradient-to-r from-secondary via-secondary to-primary text-secondary-foreground py-24 text-center">
        <h2 className="text-5xl font-bold">Everything You Need</h2>

        <p className="mt-4 text-xl opacity-90">
          Shop thousands of products at affordable prices.
        </p>

        <Link
          href="/products"
          className="inline-block mt-8 bg-surface text-primary px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Categories */}
      <Categories />

      <FeaturedProducts />
      <PromoBanner />
      <WhyChooseUs />
      {/* Footer */}
      <Footer />
    </main>
  );
}
