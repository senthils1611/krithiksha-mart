"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Product } from "@/types/product";
import { useAuth } from "@/context/AuthContext";
import {
  getWishlist,
  addToWishlistApi,
  removeFromWishlistApi,
} from "@/lib/api";

interface WishlistContextType {
  wishlist: Product[];
  wishlistCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType>(
  {} as WishlistContextType
);

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading: authLoading } = useAuth();
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Guest wishlist: localStorage
  useEffect(() => {
    if (authLoading || user) return;

    const data = localStorage.getItem("wishlist");

    if (data) {
      setWishlist(JSON.parse(data));
    }
  }, [authLoading, user]);

  useEffect(() => {
    if (user) return;

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist, user]);

  // Logged-in wishlist: backend
  useEffect(() => {
    if (!user) return;

    getWishlist()
      .then((data) => setWishlist(data.wishlist ?? []))
      .catch(() => {});
  }, [user]);

  const addToWishlist = (product: Product) => {
    if (wishlist.some((item) => item._id === product._id)) return;

    setWishlist((prev) => [...prev, product]);

    if (user) {
      addToWishlistApi(product._id).catch(() => {});
    }
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item._id !== id));

    if (user) {
      removeFromWishlistApi(id).catch(() => {});
    }
  };

  const isWishlisted = (id: string) => {
    return wishlist.some((item) => item._id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
