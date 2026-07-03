"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Laptop } from "@/lib/types";
import laptopsData from "@/data/laptops.json";
import CompareDrawer from "@/components/CompareDrawer";
import LaptopModal from "@/components/LaptopModal";

interface AppContextType {
  laptops: Laptop[];
  compareList: Laptop[];
  toggleCompare: (laptop: Laptop) => void;
  clearCompare: () => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  selectedLaptop: Laptop | null;
  setSelectedLaptop: (laptop: Laptop | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export default function AppProvider({ children }: { children: ReactNode }) {
  const laptops = laptopsData as Laptop[];
  const [compareList, setCompareList] = useState<Laptop[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("laptoppintar-wishlist");
    if (stored) {
      try { setWishlist(JSON.parse(stored)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("laptoppintar-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  const toggleCompare = useCallback((laptop: Laptop) => {
    setCompareList(prev => {
      const exists = prev.find(l => l.id === laptop.id);
      if (exists) return prev.filter(l => l.id !== laptop.id);
      if (prev.length >= 3) return prev;
      return [...prev, laptop];
    });
  }, []);

  const clearCompare = useCallback(() => setCompareList([]), []);

  return (
    <AppContext.Provider value={{
      laptops, compareList, toggleCompare, clearCompare,
      wishlist, toggleWishlist, selectedLaptop, setSelectedLaptop,
    }}>
      {children}
      <CompareDrawer items={compareList} onRemove={toggleCompare} onClose={clearCompare} />
      <LaptopModal
        laptop={selectedLaptop}
        onClose={() => setSelectedLaptop(null)}
        onCompare={toggleCompare}
        compareList={compareList}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
      />
    </AppContext.Provider>
  );
}
