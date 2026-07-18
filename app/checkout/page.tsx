"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please login to continue checkout");
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name ?? prev.fullName,
        email: user.email ?? prev.email,
        phone: user.phone ?? prev.phone,
      }));
    }
  }, [user]);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      return toast.error("Please fill all required delivery details");
    }

    if (cart.length === 0) {
      return toast.error("Your cart is empty");
    }

    try {
      setPlacing(true);

      const data = await createOrder({
        customer: formData,
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.images?.[0] ?? "",
        })),
        totalAmount: total,
      });

      clearCart();
      router.push(`/order-success?orderId=${data.order._id}`);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to place order"
      );
    } finally {
      setPlacing(false);
    }
  };



  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-10">
          <p className="text-primary font-semibold uppercase tracking-[4px]">
            KRITHIKSHA MART
          </p>

          <h1 className="text-5xl font-extrabold text-foreground mt-2">
            Secure Checkout
          </h1>

          <p className="text-muted-foreground mt-3">
            Complete your order by entering your delivery information.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Delivery Details */}

          <div className="lg:col-span-2 bg-surface rounded-3xl shadow-xl border border-border p-8">

            <h2 className="text-3xl font-bold text-foreground mb-8">
              Delivery Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <label className="block mb-2 text-sm font-semibold text-foreground">
                Full Name
              </label>

              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="h-14 w-full rounded-xl border-2 border-border bg-background px-5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
              />

              <label className="block mb-2 text-sm font-semibold text-foreground">
                Email Address
              </label>

              <input
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="h-14 w-full rounded-xl border-2 border-border bg-background px-5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
              />

              <label className="block mb-2 text-sm font-semibold text-foreground">
                Mobile Number
              </label>


              <input
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                className="h-14 w-full rounded-xl border-2 border-border bg-background px-5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
              />
              <label className="block mb-2 text-sm font-semibold text-foreground">
                City
              </label>

              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="h-14 w-full rounded-xl border-2 border-border bg-background px-5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
              />

            </div>
            <label className="block mb-2 text-sm font-semibold text-foreground">
              Delivery Address
            </label>
            <textarea
              name="address"
              placeholder="Complete Delivery Address"
              value={formData.address}
              onChange={handleChange}
              rows={5}
              className="w-full mt-6 rounded-xl border-2 border-border bg-background p-5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
            />

            <label className="block mb-2 text-sm font-semibold text-foreground">
              Pincode
            </label>

            <input
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="h-14 w-full rounded-xl border-2 border-border bg-background px-5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
            />

            <label className="block mb-2 text-sm font-semibold text-foreground">
              Order Notes (Optional)
            </label>

            <textarea
              name="notes"
              placeholder="Order Notes (Optional)"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full mt-6 rounded-xl border-2 border-border bg-background p-5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
            />

          </div>

          {/* Order Summary */}

          <div className="sticky top-24 h-fit">

            <div className="bg-surface rounded-3xl shadow-xl border border-border p-8">

              <h2 className="text-3xl font-bold text-foreground mb-8">
                Order Summary
              </h2>

              <div className="space-y-5">

                {cart.map((item) => (

                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b border-border pb-4"
                  >

                    <div>

                      <h3 className="font-semibold text-foreground">
                        {item.name}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        Qty : {item.quantity}
                      </p>

                    </div>

                    <p className="font-bold text-primary">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>

                  </div>

                ))}

              </div>

              <div className="border-t border-border mt-8 pt-6 space-y-4 text-foreground">

                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-success font-semibold">
                    FREE
                  </span>
                </div>

                <div className="flex justify-between text-2xl font-bold">

                  <span>Total</span>

                  <span className="text-primary">
                    ₹{total.toLocaleString()}
                  </span>

                </div>

              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="w-full mt-8 h-14 rounded-2xl bg-gradient-to-r from-highlight via-primary to-secondary text-white text-lg font-bold shadow-lg hover:scale-105 transition duration-300 disabled:opacity-60"
              >
                {placing ? "Placing Order..." : "Place Order"}
              </button>

              <div className="mt-8 rounded-2xl bg-success/10 border border-success/30 p-4">

                <p className="font-semibold text-success">
                  🔒 Secure Checkout
                </p>

                <p className="text-sm text-success/90 mt-1">
                  Your payment and personal information are protected with secure encryption.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}