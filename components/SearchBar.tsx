"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-border bg-surface text-foreground placeholder:text-muted-foreground rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
}