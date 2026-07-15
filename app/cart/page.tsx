"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>₹{item.price}</p>
              </div>

              <div>
                Qty: {item.quantity}
              </div>

              <div className="font-bold">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}

          <div className="text-right mt-8">
            <h2 className="text-3xl font-bold">
              Total: ₹{total}
            </h2>

            <button className="mt-6 bg-orange-500 text-white px-8 py-3 rounded-lg">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}