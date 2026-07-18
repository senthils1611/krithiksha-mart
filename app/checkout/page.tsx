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
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-10">
          <p className="text-orange-500 font-semibold uppercase tracking-[4px]">
            KRITHIKSHA MART
          </p>

          <h1 className="text-5xl font-extrabold text-gray-900 mt-2">
            Secure Checkout
          </h1>

          <p className="text-gray-500 mt-3">
            Complete your order by entering your delivery information.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Delivery Details */}

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Delivery Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="h-14 w-full rounded-xl border-2 border-gray-200 bg-white px-5 text-gray-800 placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300"
              />

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <input
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="h-14 w-full rounded-xl border-2 border-gray-200 bg-white px-5 text-gray-800 placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300"
              />

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Mobile Number
              </label>


              <input
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                className="h-14 w-full rounded-xl border-2 border-gray-200 bg-white px-5 text-gray-800 placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300"
              />
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                City
              </label>

              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="h-14 w-full rounded-xl border-2 border-gray-200 bg-white px-5 text-gray-800 placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300"
              />

            </div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Delivery Address
            </label>
            <textarea
              name="address"
              placeholder="Complete Delivery Address"
              value={formData.address}
              onChange={handleChange}
              rows={5}
              className="w-full mt-6 rounded-xl border-2 border-gray-200 bg-white p-5 text-gray-800 placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300"
            />

            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Pincode
            </label>

            <input
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="h-14 w-full rounded-xl border-2 border-gray-200 bg-white px-5 text-gray-800 placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300"
            />

            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Order Notes (Optional)
            </label>

            <textarea
              name="notes"
              placeholder="Order Notes (Optional)"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full mt-6 rounded-xl border-2 border-gray-200 bg-white p-5 text-gray-800 placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300"
            />

          </div>

          {/* Order Summary */}

          <div className="sticky top-24 h-fit">

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Order Summary
              </h2>

              <div className="space-y-5">

                {cart.map((item) => (

                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b pb-4"
                  >

                    <div>

                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Qty : {item.quantity}
                      </p>

                    </div>

                    <p className="font-bold text-orange-500">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>

                  </div>

                ))}

              </div>

              <div className="border-t mt-8 pt-6 space-y-4">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">
                    FREE
                  </span>
                </div>

                <div className="flex justify-between text-2xl font-bold">

                  <span>Total</span>

                  <span className="text-orange-500">
                    ₹{total.toLocaleString()}
                  </span>

                </div>

              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="w-full mt-8 h-14 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-lg font-bold shadow-lg hover:scale-105 transition duration-300 disabled:opacity-60"
              >
                {placing ? "Placing Order..." : "Place Order"}
              </button>

              <div className="mt-8 rounded-2xl bg-green-50 border border-green-200 p-4">

                <p className="font-semibold text-green-700">
                  🔒 Secure Checkout
                </p>

                <p className="text-sm text-green-600 mt-1">
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