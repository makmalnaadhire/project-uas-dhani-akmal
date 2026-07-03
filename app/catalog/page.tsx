"use client";

import { useApp } from "@/components/providers/AppProvider";
import CatalogSection from "@/components/sections/CatalogSection";

export default function CatalogPage() {
  const { laptops, wishlist, toggleWishlist, compareList, toggleCompare, setSelectedLaptop } = useApp();

  return (
    <CatalogSection
      laptops={laptops}
      wishlist={wishlist}
      toggleWishlist={toggleWishlist}
      compareList={compareList}
      toggleCompare={toggleCompare}
      setSelectedLaptop={setSelectedLaptop}
    />
  );
}
