"use client";

const categories = [
  "Electronics",
  "Mobiles",
  "Fashion",
  "Home",
  "Sports",
  "Beauty",
];

export default function ProductFilter() {
  return (
    <aside className="rounded-2xl bg-white p-6 shadow-md">

      <h2 className="mb-6 text-2xl font-bold">
        Filters
      </h2>

      <div>

        <h3 className="mb-3 font-semibold">
          Categories
        </h3>

        <div className="space-y-3">

          {categories.map((category) => (

            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                className="h-4 w-4"
              />

              {category}

            </label>

          ))}

        </div>

      </div>

      <div className="mt-8">

        <h3 className="mb-3 font-semibold">
          Price Range
        </h3>

        <input
          type="range"
          min="0"
          max="100000"
          className="w-full"
        />

      </div>

    </aside>
  );
}