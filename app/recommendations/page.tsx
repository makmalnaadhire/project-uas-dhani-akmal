"use client";

import { useApp } from "@/components/providers/AppProvider";
import RecommendSection from "@/components/sections/RecommendSection";

export default function RecommendationsPage() {
  const { laptops, setSelectedLaptop } = useApp();

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <RecommendSection laptops={laptops} setSelectedLaptop={setSelectedLaptop} />
    </div>
  );
}
