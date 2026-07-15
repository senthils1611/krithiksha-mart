export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome to KRITHIKSHA Mart
          </h1>

          <p className="mt-6 text-lg">
            Everything you need in one place. Shop Home, Electronics, Fashion,
            Baby Products, Beauty and much more.
          </p>

          <button className="mt-8 bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
            Shop Now
          </button>
        </div>

        <div className="mt-12 md:mt-0">
          <img
            src="https://placehold.co/500x350?text=KRITHIKSHA+Mart"
            alt="Hero Banner"
            className="rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}