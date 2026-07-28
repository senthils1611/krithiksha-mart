"use client";

import { useEffect, useState } from "react";
import { Search, Grid2X2, Package, Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/api";

const COLOR_OPTIONS = [
  { label: "Primary", value: "bg-primary" },
  { label: "Secondary", value: "bg-secondary" },
  { label: "Highlight", value: "bg-highlight" },
  { label: "Accent", value: "bg-accent" },
  { label: "Success", value: "bg-success" },
  { label: "Danger", value: "bg-danger" },
];

type Category = {
  _id: string;
  name: string;
  description: string;
  color: string;
  isActive: boolean;
  productCount: number;
};

const emptyForm = { name: "", description: "", color: "bg-primary" };

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchCategories = () => {
    setLoading(true);
    getCategories()
      .then((data) => setCategories(data.categories ?? []))
      .catch(() => toast.error("Failed to load categories"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditingId(cat._id);
    setForm({
      name: cat.name,
      description: cat.description,
      color: cat.color,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      return toast.error("Category name is required");
    }

    try {
      setSaving(true);

      if (editingId) {
        const data = await updateCategory(editingId, form);
        toast.success(data.message || "Category updated");
      } else {
        await addCategory(form);
        toast.success("Category added");
      }

      setModalOpen(false);
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cat: Category) => {
    const warning =
      cat.productCount > 0
        ? `"${cat.name}" has ${cat.productCount} product(s). They will keep this category label, but it will no longer be managed. Delete anyway?`
        : `Delete category "${cat.name}"?`;

    if (!confirm(warning)) return;

    try {
      const data = await deleteCategory(cat._id);
      toast.success(data.message || "Category deleted");
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete category");
    }
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-2">
            Manage product categories.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary hover:opacity-90 text-white px-5 py-3 rounded-xl shadow"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="bg-surface rounded-2xl shadow p-5">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-4 text-muted-foreground"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full border border-border bg-background text-foreground rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="bg-surface rounded-2xl shadow p-14 text-center text-muted-foreground">
          Loading categories...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-surface rounded-2xl shadow p-14 text-center text-muted-foreground">
          No categories yet. Click "Add Category" to create one.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((category) => (
            <div
              key={category._id}
              className="bg-surface rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className={`${category.color} h-3`} />

              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div
                    className={`w-14 h-14 rounded-xl ${category.color} text-white flex items-center justify-center`}
                  >
                    <Grid2X2 size={28} />
                  </div>

                  {!category.isActive && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-danger/10 text-danger">
                      Inactive
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold mt-5 text-foreground">
                  {category.name}
                </h2>

                {category.description && (
                  <p className="text-muted-foreground mt-2 text-sm">
                    {category.description}
                  </p>
                )}

                <div className="flex items-center gap-2 mt-5 text-primary">
                  <Package size={18} />
                  <span className="font-semibold">
                    {category.productCount} Products
                  </span>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => openEdit(category)}
                    className="w-10 h-10 rounded-lg bg-success/10 text-success hover:bg-success/20 flex items-center justify-center"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(category)}
                    className="w-10 h-10 rounded-lg bg-danger/10 text-danger hover:bg-danger/20 flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">
                {editingId ? "Edit Category" : "Add Category"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-foreground">
                <X size={22} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Category Name"
                className="w-full border border-border bg-background text-foreground rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Description (optional)"
                rows={3}
                className="w-full border border-border bg-background text-foreground rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {COLOR_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm({ ...form, color: opt.value })}
                      className={`w-10 h-10 rounded-full ${opt.value} ${
                        form.color === opt.value
                          ? "ring-4 ring-offset-2 ring-primary"
                          : ""
                      }`}
                      title={opt.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-border">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-3 rounded-xl border border-border hover:bg-surface-muted text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-3 rounded-xl bg-primary text-white hover:opacity-90 disabled:opacity-60"
              >
                {saving ? "Saving..." : editingId ? "Update Category" : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}