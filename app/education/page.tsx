"use client";

import { useApp } from "@/components/providers/AppProvider";
import EducationSection from "@/components/sections/EducationSection";

export default function EducationPage() {
  const { laptops } = useApp();

  return <EducationSection laptops={laptops} />;
}
