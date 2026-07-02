"use client";

import { useState } from "react";
import type { Tab } from "./DharianApp";
import {
  LayoutDashboard,
  Monitor,
  Sparkles,
  BookOpen,
  MoreHorizontal,
  Heart,
  GitCompareArrows,
  Menu,
  X,
} from "lucide-react";

interface NavbarProps {
  activeTab: Tab;
  switchTab: (tab: Tab) => void;
  wishlistCount: number;
  compareCount: number;
}

const navItems: { id: Tab; label: string; icon: React.ReactNode; color: string }[] = [
  { id: "home", label: "Beranda", icon: <LayoutDashboard size={18} />, color: "text-white" },
  { id: "catalog", label: "Katalog", icon: <Monitor size={18} />, color: "text-[#2dd4bf]" },
  { id: "recommend", label: "Rekomendasi", icon: <Sparkles size={18} />, color: "text-[#f97316]" },
  { id: "education", label: "Edukasi", icon: <BookOpen size={18} />, color: "text-[#d946ef]" },
  { id: "other", label: "Lainnya", icon: <MoreHorizontal size={18} />, color: "text-[#06b6d4]" },
];

export default function Navbar({ activeTab, switchTab, wishlistCount, compareCount }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (tab: Tab) => {
    switchTab(tab);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => handleNav("home")} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2dd4bf] via-[#d946ef] to-[#f97316] flex items-center justify-center font-bold text-white text-sm font-[family-name:var(--font-display)]">
              D
            </div>
            <span className="text-lg font-bold font-[family-name:var(--font-display)] tracking-tight hidden sm:block">
              <span className="text-gradient-hero">Dharian</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? `bg-white/10 ${item.color}`
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {compareCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2dd4bf]/10 border border-[#2dd4bf]/30 text-[#2dd4bf] text-xs font-medium">
                <GitCompareArrows size={14} />
                <span>{compareCount}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ec4899]/10 border border-[#ec4899]/30 text-[#ec4899] text-xs font-medium cursor-pointer"
              onClick={() => handleNav("catalog")}
            >
              <Heart size={14} />
              <span>{wishlistCount}</span>
            </div>
            <button
              className="md:hidden p-2 text-slate-400 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/5">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? `bg-white/10 ${item.color}`
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
