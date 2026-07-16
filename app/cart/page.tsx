"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-lg">

          <ShoppingCart
            size={80}
            className="mx-auto text-blue-600"
          />

          <h1 className="text-4xl font-bold mt-6">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mt-4">
            Looks like you haven't added any products yet.
          </p>

          <Link
            href="/products"
            className="inline-block mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 py-12">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Cart Items */}

          <div className="lg:col-span-2 space-y-6">

            {cart.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center"
              >

                <img
                  src={item.images?.[0] || "/products/default.jpg"}
                  alt={item.name}
                  className="w-36 h-36 object-cover rounded-2xl"
                />

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {item.category}
                  </p>

                  <p className="text-orange-600 text-3xl font-bold mt-4">
                    ₹{item.price.toLocaleString()}
                  </p>

                </div>

                <div className="flex flex-col items-center gap-5">

                  <div className="flex items-center border rounded-xl overflow-hidden">

                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="p-3 hover:bg-gray-100"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="px-5 font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="p-3 hover:bg-gray-100"
                    >
                      <Plus size={18} />
                    </button>

                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* Summary */}

          <div>

            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24">

              <h2 className="text-3xl font-bold mb-8">
                Order Summary
              </h2>

              <div className="space-y-5 text-lg">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>

                  {shipping === 0 ? (
                    <span className="text-green-600">
                      FREE
                    </span>
                  ) : (
                    <span>
                      ₹{shipping}
                    </span>
                  )}
                </div>

                <hr />

                <div className="flex justify-between text-2xl font-bold">

                  <span>Total</span>

                  <span className="text-orange-600">
                    ₹{total.toLocaleString()}
                  </span>

                </div>

              </div>

              <Link
                href="/checkout"
                className="block text-center mt-8 bg-orange-500 text-white py-4 rounded-xl text-lg font-semibold hover:bg-orange-600 transition"
              >
                Proceed to Checkout
              </Link>

              {/* Trust */}

              <div className="border-t mt-8 pt-6 space-y-4 text-gray-600">

                <div className="flex items-center gap-3">
                  <Truck className="text-blue-600" />
                  Free Delivery above ₹999
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-green-600" />
                  100% Secure Payments
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}