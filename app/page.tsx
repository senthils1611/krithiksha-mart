import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import PromoBanner from "@/components/PromoBanner";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      <section className="bg-orange-500 text-white py-24 text-center">
        <h2 className="text-5xl font-bold">Everything You Need</h2>

        <p className="mt-4 text-xl">
          Shop thousands of products at affordable prices.
        </p>

        <button className="mt-8 bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-200">
          Shop Now
        </button>
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
