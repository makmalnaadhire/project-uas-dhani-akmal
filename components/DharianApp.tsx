"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Navbar from "./Navbar";
import HeroSection from "./sections/HeroSection";
import CatalogSection from "./sections/CatalogSection";
import RecommendSection from "./sections/RecommendSection";
import EducationSection from "./sections/EducationSection";
import OtherSection from "./sections/OtherSection";
import LaptopModal from "./LaptopModal";
import CompareDrawer from "./CompareDrawer";
import Footer from "./Footer";
import laptopsData from "@/data/laptops.json";

export type Tab = "home" | "catalog" | "recommend" | "education" | "other";

export interface Laptop {
  id: number;
  name: string;
  brand: string;
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  price: number;
  condition: string;
  category: string;
}

export default function DharianApp() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null);
  const [compareList, setCompareList] = useState<Laptop[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionDir, setTransitionDir] = useState<"left" | "right">("right");

  const laptops = useMemo(() => laptopsData as Laptop[], []);

  useEffect(() => {
    const stored = localStorage.getItem("dharian-wishlist");
    if (stored) {
      try { setWishlist(JSON.parse(stored)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dharian-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const tabOrder: Tab[] = ["home", "catalog", "recommend", "education", "other"];

  const switchTab = useCallback((tab: Tab) => {
    if (tab === activeTab) return;
    const fromIdx = tabOrder.indexOf(activeTab);
    const toIdx = tabOrder.indexOf(tab);
    setTransitionDir(toIdx > fromIdx ? "right" : "left");
    setTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 250);
  }, [activeTab]);

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

  const renderSection = () => {
    const props = { laptops, wishlist, toggleWishlist, compareList, toggleCompare, setSelectedLaptop, switchTab };
    switch (activeTab) {
      case "home": return <HeroSection {...props} />;
      case "catalog": return <CatalogSection {...props} />;
      case "recommend": return <RecommendSection {...props} />;
      case "education": return <EducationSection {...props} />;
      case "other": return <OtherSection {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar
        activeTab={activeTab}
        switchTab={switchTab}
        wishlistCount={wishlist.length}
        compareCount={compareList.length}
      />

      <main
        className={`transition-all duration-300 ease-out ${
          transitioning
            ? "opacity-0 translate-x-8"
            : "opacity-100 translate-x-0"
        }`}
      >
        {renderSection()}
      </main>

      <Footer switchTab={switchTab} />

      <LaptopModal
        laptop={selectedLaptop}
        onClose={() => setSelectedLaptop(null)}
        onCompare={toggleCompare}
        compareList={compareList}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
      />

      <CompareDrawer
        items={compareList}
        onRemove={toggleCompare}
        onClose={() => setCompareList([])}
      />
    </div>
  );
}
