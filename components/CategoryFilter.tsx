"use client";

type Props = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="space-y-8">

      {/* Categories */}

      <div>

        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Categories
        </h3>

        <div className="space-y-3">

          <button
            onClick={() => onSelect("All")}
            className={`w-full rounded-xl px-4 py-3 text-left transition font-medium ${
              selected === "All"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            All Products
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`w-full rounded-xl px-4 py-3 text-left transition font-medium ${
                selected === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

      </div>

      {/* Price Filter (UI only for now) */}

      <div>

        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Price Range
        </h3>

        <input
          type="range"
          min={0}
          max={100000}
          className="w-full accent-blue-600"
        />

        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>₹0</span>
          <span>₹100000</span>
        </div>

      </div>

    </div>
  );
}