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

        <h3 className="text-lg font-bold text-foreground mb-4">
          Categories
        </h3>

        <div className="space-y-3">

          <button
            onClick={() => onSelect("All")}
            className={`w-full rounded-xl px-4 py-3 text-left transition font-medium ${
              selected === "All"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-surface-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
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
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-surface-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

      </div>

      {/* Price Filter (UI only for now) */}

      <div>

        <h3 className="text-lg font-bold text-foreground mb-4">
          Price Range
        </h3>

        <input
          type="range"
          min={0}
          max={100000}
          className="w-full accent-primary"
        />

        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>₹0</span>
          <span>₹100000</span>
        </div>

      </div>

    </div>
  );
}