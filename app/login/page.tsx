"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  LogIn,
  Eye,
  EyeOff,
} from "lucide-react";
import { login as loginApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";


export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

const [loading, setLoading] = useState(false);

const [showPassword, setShowPassword] = useState(false);

const [formData, setFormData] = useState({
  email: "",
  password: "",
});

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleLogin = async () => {
  if (!formData.email || !formData.password) {
    return toast.error("Please fill all fields");
  }

  try {
    setLoading(true);

    const data = await loginApi(formData.email, formData.password);

    login(data.token, data.user);

    toast.success("Login Successful");

    router.push("/");
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
      "Login Failed"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md bg-surface rounded-3xl shadow-2xl border border-border overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-primary to-highlight p-8 text-center text-white">

          <h1 className="text-4xl font-extrabold">
            Welcome Back
          </h1>

          <p className="mt-2 text-white/90">
            Login to continue shopping with
          </p>

          <p className="font-bold text-xl mt-1">
            KRITHIKSHA MART
          </p>

        </div>

        {/* Form */}

        <div className="p-8">

          <div className="mb-5">

            <label className="block mb-2 font-semibold text-foreground">
              Email Address
            </label>

            <div className="flex items-center border-2 border-border bg-background rounded-xl px-4 focus-within:border-primary transition">

              <Mail className="text-muted-foreground" size={20} />

            <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter your email"
  className="w-full p-4 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
/>
            </div>

          </div>

          <div>

            <label className="block mb-2 font-semibold text-foreground">
              Password
            </label>

            <div className="flex items-center border-2 border-border bg-background rounded-xl px-4 focus-within:border-primary transition">

              <Lock className="text-muted-foreground" size={20} />

             <input
  type={showPassword ? "text" : "password"}
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Enter your password"
  className="w-full p-4 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
/>

<button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? (
    <EyeOff className="text-muted-foreground" size={20} />
  ) : (
    <Eye className="text-muted-foreground" size={20} />
  )}
</button>
            </div>

          </div>

          <div className="flex justify-end mt-4">

            <Link
              href="/forgot-password"
              className="text-primary font-medium hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          <button
  onClick={handleLogin}
  disabled={loading}
  className="w-full mt-8 flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-highlight text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition duration-300 disabled:opacity-60"
>
<LogIn size={22} />

{loading ? "Logging In..." : "Login"}

          </button>

          <div className="mt-8 text-center">

            <p className="text-muted-foreground">
              Don't have an account?
            </p>

            <Link
              href="/register"
              className="inline-block mt-3 text-primary font-bold hover:underline"
            >
              Create a New Account
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}