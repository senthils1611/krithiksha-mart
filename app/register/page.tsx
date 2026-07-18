"use client";

import Link from "next/link";
import { User, Mail, Lock, UserPlus, Phone } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { register as registerApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = async () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return toast.error("Please fill all fields");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      return toast.error("Please enter a valid mobile number");
    }

    try {
      setLoading(true);

      const data = await registerApi({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });

      login(data.token, data.user);

      toast.success("Registration Successful!");
      router.push("/");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-highlight/5 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-lg bg-surface rounded-3xl shadow-2xl border border-border overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-highlight to-primary p-8 text-center text-white">

          <h1 className="text-4xl font-extrabold">
            Create Account
          </h1>

          <p className="mt-2 text-white/90">
            Join KRITHIKSHA MART and start shopping today.
          </p>

        </div>

        {/* Form */}

        <div className="p-8 space-y-5">

          <div>
            <label className="block font-semibold text-foreground mb-2">
              Full Name
            </label>

            <div className="flex items-center border-2 border-border bg-background rounded-xl px-4 focus-within:border-primary">
              <User className="text-muted-foreground" size={20} />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-4 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-foreground mb-2">
              Email Address
            </label>

            <div className="flex items-center border-2 border-border bg-background rounded-xl px-4 focus-within:border-primary">
              <Mail className="text-muted-foreground" size={20} />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-4 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold text-foreground mb-2">
              Mobile Number
            </label>

            <div className="flex items-center border-2 border-border bg-background rounded-xl px-4 focus-within:border-primary">
              <Phone className="text-muted-foreground" size={20} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full p-4 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-foreground mb-2">
              Password
            </label>

            <div className="flex items-center border-2 border-border bg-background rounded-xl px-4 focus-within:border-primary">
              <Lock className="text-muted-foreground" size={20} />
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full p-4 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-foreground mb-2">
              Confirm Password
            </label>

            <div className="flex items-center border-2 border-border bg-background rounded-xl px-4 focus-within:border-primary">
              <Lock className="text-muted-foreground" size={20} />
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full p-4 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-highlight to-primary text-white py-4 rounded-2xl text-lg font-bold shadow-lg hover:scale-105 transition duration-300 disabled:opacity-60"
          >
            <UserPlus size={22} />

            {loading ? "Creating Account..." : "Create Account"}

          </button>

          <div className="text-center pt-4">

            <p className="text-muted-foreground">
              Already have an account?
            </p>

            <Link
              href="/login"
              className="inline-block mt-2 font-bold text-highlight hover:underline"
            >
              Login Here
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}