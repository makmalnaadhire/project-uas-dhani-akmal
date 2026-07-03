"use client";

import { useApp } from "@/components/providers/AppProvider";
import RecommendSection from "@/components/sections/RecommendSection";

export default function RecommendationsPage() {
  const { laptops, setSelectedLaptop } = useApp();

  return <RecommendSection laptops={laptops} setSelectedLaptop={setSelectedLaptop} />;
}
