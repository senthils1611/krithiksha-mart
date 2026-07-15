import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
        <Header />

      {/* Hero Section */}
      <Hero />
      <section className="bg-orange-500 text-white py-24 text-center">
        <h2 className="text-5xl font-bold">
          Everything You Need
        </h2> 

        <p className="mt-4 text-xl">
          Shop thousands of products at affordable prices.
        </p>

        <button className="mt-8 bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-200">
          Shop Now
        </button>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            "🏠 Home",
            "📱 Mobile",
            "👶 Baby",
            "👕 Fashion",
            "💄 Beauty",
            "🔌 Electronics",
          ].map((item) => (
            <div
              key={item}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer text-center"
            >
              <h3 className="font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      
      <FeaturedProducts />

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-8">
        © 2026 KRITHIKSHA Mart. All Rights Reserved.
      </footer>
    </main>
  );
}