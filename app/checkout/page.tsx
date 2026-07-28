"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  createOrder,
  createRazorpayOrder,
  verifyRazorpayPayment,
  getAddresses,
  addAddress,
} from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MapPin, Plus, Wallet, CreditCard } from "lucide-react";
import Script from "next/script";

type Address = {
  _id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  isDefault: boolean;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "razorpay">("cod");

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | "new">("new");
  const [saveNewAddress, setSaveNewAddress] = useState(false);

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

  useEffect(() => {
    if (!user) return;

    getAddresses()
      .then((data) => {
        const list: Address[] = data.addresses ?? [];
        setAddresses(list);

        const defaultAddr = list.find((a) => a.isDefault) ?? list[0];

        if (defaultAddr) {
          setSelectedAddressId(defaultAddr._id);
          setFormData((prev) => ({
            ...prev,
            fullName: defaultAddr.fullName,
            phone: defaultAddr.phone,
            address: defaultAddr.address,
            city: defaultAddr.city,
            pincode: defaultAddr.pincode,
          }));
        }
      })
      .catch(() => {});
  }, [user]);

  const selectAddress = (addr: Address) => {
    setSelectedAddressId(addr._id);
    setFormData((prev) => ({
      ...prev,
      fullName: addr.fullName,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      pincode: addr.pincode,
    }));
  };

  const selectNewAddress = () => {
    setSelectedAddressId("new");
    setFormData((prev) => ({
      ...prev,
      fullName: user?.name ?? "",
      phone: user?.phone ?? "",
      address: "",
      city: "",
      pincode: "",
    }));
  };

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

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      toast.error("Please fill all required delivery details");
      return false;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return false;
    }

    return true;
  };

  const maybeSaveNewAddress = () => {
    if (selectedAddressId === "new" && saveNewAddress) {
      addAddress({
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        isDefault: addresses.length === 0,
      }).catch(() => {});
    }
  };

  const cartItemsPayload = () =>
    cart.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

  const handleCodOrder = async () => {
    try {
      setPlacing(true);

      const data = await createOrder({
        customer: formData,
        items: cartItemsPayload(),
      });

      maybeSaveNewAddress();
      clearCart();
      router.push(`/order-success?orderId=${data.order._id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  const handleRazorpayOrder = async () => {
    try {
      setPlacing(true);

      const items = cartItemsPayload();
      const rzpData = await createRazorpayOrder(items);

      const options = {
        key: rzpData.keyId,
        amount: rzpData.amount,
        currency: rzpData.currency,
        name: "KRITHIKSHA MART",
        description: "Order Payment",
        order_id: rzpData.razorpayOrderId,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#f97316",
        },
        handler: async function (response: any) {
          try {
            const verifyData = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customer: formData,
              items,
            });

            maybeSaveNewAddress();
            clearCart();
            router.push(`/order-success?orderId=${verifyData.order._id}`);
          } catch (error: any) {
            toast.error(
              error.response?.data?.message || "Payment verification failed"
            );
          } finally {
            setPlacing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setPlacing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to start payment"
      );
      setPlacing(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    if (paymentMethod === "cod") {
      await handleCodOrder();
    } else {
      await handleRazorpayOrder();
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

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

              {addresses.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Choose a saved address
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <button
                        key={addr._id}
                        type="button"
                        onClick={() => selectAddress(addr)}
                        className={`text-left rounded-xl border-2 p-4 transition ${
                          selectedAddressId === addr._id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 font-semibold text-foreground">
                          <MapPin size={16} className="text-primary" />
                          {addr.fullName}
                          {addr.isDefault && (
                            <span className="text-xs font-normal bg-success/10 text-success px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {addr.address}, {addr.city} - {addr.pincode}
                        </p>
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={selectNewAddress}
                      className={`flex items-center justify-center gap-2 rounded-xl border-2 border-dashed p-4 transition font-semibold ${
                        selectedAddressId === "new"
                          ? "border-primary text-primary bg-primary/5"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <Plus size={18} />
                      Use a New Address
                    </button>
                  </div>
                </div>
              )}

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

              {selectedAddressId === "new" && (
                <label className="flex items-center gap-2 mt-6 text-foreground">
                  <input
                    type="checkbox"
                    checked={saveNewAddress}
                    onChange={(e) => setSaveNewAddress(e.target.checked)}
                  />
                  Save this address for future orders
                </label>
              )}

              <label className="block mb-2 mt-6 text-sm font-semibold text-foreground">
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

              {/* Payment Method */}
              <h3 className="text-xl font-bold text-foreground mt-10 mb-4">
                Payment Method
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center gap-3 rounded-xl border-2 p-5 transition ${
                    paymentMethod === "cod"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Wallet
                    className={
                      paymentMethod === "cod" ? "text-primary" : "text-muted-foreground"
                    }
                  />
                  <div className="text-left">
                    <p className="font-semibold text-foreground">
                      Cash on Delivery
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Pay when your order arrives
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`flex items-center gap-3 rounded-xl border-2 p-5 transition ${
                    paymentMethod === "razorpay"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <CreditCard
                    className={
                      paymentMethod === "razorpay" ? "text-primary" : "text-muted-foreground"
                    }
                  />
                  <div className="text-left">
                    <p className="font-semibold text-foreground">
                      Pay Online
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Card, UPI, Netbanking & more
                    </p>
                  </div>
                </button>
              </div>

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
                  {placing
                    ? "Processing..."
                    : paymentMethod === "razorpay"
                    ? "Pay & Place Order"
                    : "Place Order"}
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
    </>
  );
}