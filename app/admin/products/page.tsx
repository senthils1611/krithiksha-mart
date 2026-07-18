"use client";

import { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/api";
import { Product } from "@/types/product";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  brand: "",
  stock: "",
  images: "",
  isFeatured: false,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadProducts = () => {
    setLoading(true);
    getProducts()
      .then((data) => setProducts(data.products ?? []))
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      category: product.category,
      brand: product.brand ?? "",
      stock: String(product.stock ?? 0),
      images: (product.images ?? []).join(", "),
      isFeatured: !!product.isFeatured,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.category || !form.description) {
      return toast.error("Name, description, category and price are required");
    }

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      brand: form.brand,
      stock: Number(form.stock) || 0,
      images: form.images
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      isFeatured: form.isFeatured,
    };

    try {
      setSaving(true);
      if (editing) {
        await updateProduct(editing._id, payload);
        toast.success("Product updated");
      } else {
        await createProduct(payload);
        toast.success("Product added");
      }
      setModalOpen(false);
      loadProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"?`)) return;

    try {
      await deleteProduct(product._id);
      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">

        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Products
          </h1>

          <p className="text-muted-foreground mt-2">
            Manage all products in your store.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="bg-primary hover:opacity-90 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow"
        >
          <Plus size={18} />
          Add Product
        </button>

      </div>

      {/* Search */}

      <div className="bg-surface rounded-2xl shadow p-5">

        <div className="relative">

          <Search
            className="absolute left-4 top-3.5 text-muted-foreground"
            size={18}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full border border-border bg-background text-foreground rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-surface rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-surface-muted">

            <tr>

              <th className="text-left p-4">Product</th>
              <th className="text-left">Category</th>
              <th className="text-left">Price</th>
              <th className="text-left">Stock</th>
              <th className="text-left">Status</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  Loading products...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No products found.
                </td>
              </tr>
            ) : (
              filtered.map((product) => {
                const status =
                  product.stock === 0
                    ? "Out of Stock"
                    : product.stock < 10
                    ? "Low Stock"
                    : "Active";

                return (
                  <tr
                    key={product._id}
                    className="border-b border-border hover:bg-surface-muted"
                  >

                    <td className="p-4">

                      <div className="flex items-center gap-4">

                        <img
                          src={product.images?.[0] || "https://picsum.photos/80"}
                          alt={product.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />

                        <div>

                          <h3 className="font-semibold">
                            {product.name}
                          </h3>

                          <p className="text-sm text-muted-foreground">
                            ID #{product._id.slice(-6)}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td>{product.category}</td>

                    <td className="font-semibold">
                      ₹{product.price.toLocaleString()}
                    </td>

                    <td>{product.stock}</td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          status === "Active"
                            ? "bg-success/10 text-success"
                            : status === "Low Stock"
                            ? "bg-accent/10 text-accent"
                            : "bg-danger/10 text-danger"
                        }`}
                      >
                        {status}
                      </span>

                    </td>

                    <td>

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() => openEdit(product)}
                          className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(product)}
                          className="p-2 rounded-lg bg-danger/10 text-danger hover:bg-danger/20"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })
            )}

          </tbody>

        </table>

      </div>

      {/* Add / Edit Modal */}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editing ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setModalOpen(false)}>
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-border bg-background text-foreground rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="w-full border border-border bg-background text-foreground rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="border border-border bg-background text-foreground rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  type="number"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="border border-border bg-background text-foreground rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="border border-border bg-background text-foreground rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  placeholder="Brand"
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  className="border border-border bg-background text-foreground rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <input
                placeholder="Image URLs (comma separated)"
                value={form.images}
                onChange={(e) => setForm({ ...form, images: e.target.value })}
                className="w-full border border-border bg-background text-foreground rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) =>
                    setForm({ ...form, isFeatured: e.target.checked })
                  }
                />
                Featured Product
              </label>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-primary hover:opacity-90 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
              >
                {saving ? "Saving..." : editing ? "Update Product" : "Add Product"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
