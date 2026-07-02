"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistButton({ laptopId }: { laptopId: string }) {
  const { toggle, has, hydrated } = useWishlist();
  const isWishlisted = hydrated && has(laptopId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(laptopId);
      }}
      className={`p-2 rounded-full transition-all ${
        isWishlisted
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
      }`}
      aria-label={isWishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"}
    >
      <Heart
        className={`w-4 h-4 ${isWishlisted ? "fill-red-500" : ""}`}
      />
    </button>
  );
}
