"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Mail, Phone, Shield, Pencil, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { updateMe } from "@/lib/api";

export default function ProfilePage() {
  const { user, loading, login, token } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }

    if (user) {
      setForm({ name: user.name ?? "", phone: user.phone ?? "" });
    }
  }, [loading, user, router]);

  const handleSave = async () => {
    if (!token) return;

    try {
      setSaving(true);
      const data = await updateMe(form);
      login(token, data.user);
      toast.success("Profile updated");
      setEditing(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-surface rounded-3xl shadow-2xl border border-border overflow-hidden">

          {/* Header */}

          <div className="bg-gradient-to-r from-primary to-highlight p-10 text-white text-center">

            <div className="w-28 h-28 mx-auto rounded-full bg-white flex items-center justify-center shadow-xl">

              <User size={60} className="text-primary" />

            </div>

            <h1 className="text-4xl font-extrabold mt-6">
              My Profile
            </h1>

            <p className="text-white/90 mt-2">
              Manage your account information
            </p>

          </div>

          {/* Details */}

          <div className="p-8 grid md:grid-cols-2 gap-6">

            <div className="bg-surface-muted rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <User className="text-primary" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  {editing ? (
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="font-bold text-lg w-full bg-surface text-foreground rounded-lg border border-border px-2 py-1 mt-1 outline-none focus:border-primary"
                    />
                  ) : (
                    <h3 className="font-bold text-lg text-foreground">{user.name}</h3>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-surface-muted rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <Mail className="text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <h3 className="font-bold text-lg text-foreground">{user.email}</h3>
                </div>
              </div>
            </div>

            <div className="bg-surface-muted rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <Phone className="text-success" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Mobile</p>
                  {editing ? (
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="font-bold text-lg w-full bg-surface text-foreground rounded-lg border border-border px-2 py-1 mt-1 outline-none focus:border-primary"
                    />
                  ) : (
                    <h3 className="font-bold text-lg text-foreground">
                      {user.phone || "Not set"}
                    </h3>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-surface-muted rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <Shield className="text-highlight" />
                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <h3 className="font-bold text-lg capitalize text-foreground">
                    {user.role}
                  </h3>
                </div>
              </div>
            </div>

          </div>

          <div className="px-8 pb-8">
            {editing ? (
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center justify-center gap-2 w-full md:w-auto bg-gradient-to-r from-primary to-highlight text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition disabled:opacity-60"
              >
                <Save size={20} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center justify-center gap-2 w-full md:w-auto bg-gradient-to-r from-primary to-highlight text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
              >
                <Pencil size={20} />
                Edit Profile
              </button>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
