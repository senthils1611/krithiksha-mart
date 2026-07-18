"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Home, Plus, Pencil, Trash2, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "@/lib/api";

const emptyForm = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
  isDefault: false,
};

export default function AddressPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;

    getAddresses()
      .then((data) => setAddresses(data.addresses ?? []))
      .catch(() => toast.error("Failed to load addresses"))
      .finally(() => setLoading(false));
  }, [user]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (addr) => {
    setEditingId(addr._id);
    setForm({
      fullName: addr.fullName,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      pincode: addr.pincode,
      isDefault: addr.isDefault,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.fullName || !form.phone || !form.address || !form.city || !form.pincode) {
      return toast.error("Please fill all address fields");
    }

    try {
      setSaving(true);

      const data = editingId
        ? await updateAddress(editingId, form)
        : await addAddress(form);

      setAddresses(data.addresses ?? []);
      setModalOpen(false);
      toast.success(editingId ? "Address updated" : "Address added");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save address");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (addr) => {
    if (!confirm(`Delete address for ${addr.fullName}?`)) return;

    try {
      const data = await deleteAddress(addr._id);
      setAddresses(data.addresses ?? []);
      toast.success("Address deleted");
    } catch {
      toast.error("Failed to delete address");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">

          <div>

            <p className="text-primary uppercase tracking-[4px] font-semibold">
              KRITHIKSHA MART
            </p>

            <h1 className="text-5xl font-extrabold mt-2 text-foreground">
              My Addresses
            </h1>

          </div>

          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-highlight text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
          >

            <Plus size={20} />

            Add Address

          </button>

        </div>

        {loading || authLoading ? (

          <div className="bg-surface border border-border rounded-3xl shadow-xl p-14 text-center text-muted-foreground">
            Loading addresses...
          </div>

        ) : addresses.length === 0 ? (

          <div className="bg-surface border border-border rounded-3xl shadow-xl p-14 text-center">

            <Home size={64} className="mx-auto text-primary" />

            <h2 className="text-3xl font-bold mt-6 text-foreground">
              No Addresses Yet
            </h2>

            <p className="text-muted-foreground mt-3">
              Add a delivery address to speed up checkout.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-8">

            {addresses.map((item) => (

              <div
                key={item._id}
                className="bg-surface rounded-3xl shadow-xl p-8 border border-border"
              >

                <div className="flex justify-between">

                  <div className="flex items-center gap-3">

                    <Home className="text-primary" />

                    <h2 className="font-bold text-xl text-foreground">
                      {item.fullName}
                    </h2>

                  </div>

                  {item.isDefault && (
                    <span className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-semibold">
                      Default
                    </span>
                  )}

                </div>

                <p className="mt-5 text-muted-foreground">
                  {item.phone}
                </p>

                <p className="mt-3 text-muted-foreground leading-7">
                  {item.address}, {item.city} - {item.pincode}
                </p>

                <div className="flex gap-4 mt-8">

                  <button
                    onClick={() => openEdit(item)}
                    className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl hover:opacity-90"
                  >

                    <Pencil size={18} />

                    Edit

                  </button>

                  <button
                    onClick={() => handleDelete(item)}
                    className="flex items-center gap-2 border border-danger text-danger px-5 py-3 rounded-xl hover:bg-danger/10"
                  >

                    <Trash2 size={18} />

                    Delete

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Add / Edit Modal */}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                {editingId ? "Edit Address" : "Add Address"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-foreground">
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <input
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full border border-border bg-background text-foreground rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              <input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-border bg-background text-foreground rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              <textarea
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={3}
                className="w-full border border-border bg-background text-foreground rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="border border-border bg-background text-foreground rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  className="border border-border bg-background text-foreground rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <label className="flex items-center gap-2 text-foreground">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                />
                Set as default address
              </label>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-gradient-to-r from-primary to-highlight text-white py-3 rounded-xl font-semibold disabled:opacity-60"
              >
                {saving ? "Saving..." : editingId ? "Update Address" : "Add Address"}
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
