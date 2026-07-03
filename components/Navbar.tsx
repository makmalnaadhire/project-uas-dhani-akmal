"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useApp } from "@/components/providers/AppProvider";
import { useUser } from "@/components/providers/UserProvider";
import { useTranslation } from "@/components/providers/LanguageProvider";
import {
  LayoutDashboard,
  Monitor,
  Sparkles,
  BookOpen,
  Users,
  Mail,
  Heart,
  GitCompareArrows,
  Menu,
  X,
  LogIn,
  LogOut,
  Globe,
  ChevronDown,
  User as UserIcon,
} from "lucide-react";

interface NavItem {
  href: string;
  labelKey: "navHome" | "navCatalog" | "navRecommend" | "navEducation" | "navAbout" | "navContact";
  label: string;
  icon: React.ReactNode;
  color: string;
}

const navItemDefs: Omit<NavItem, "label">[] = [
  { href: "/", labelKey: "navHome", icon: <LayoutDashboard size={18} />, color: "text-white" },
  { href: "/catalog", labelKey: "navCatalog", icon: <Monitor size={18} />, color: "text-[#2dd4bf]" },
  { href: "/recommendations", labelKey: "navRecommend", icon: <Sparkles size={18} />, color: "text-[#f97316]" },
  { href: "/education", labelKey: "navEducation", icon: <BookOpen size={18} />, color: "text-[#d946ef]" },
  { href: "/about", labelKey: "navAbout", icon: <Users size={18} />, color: "text-[#06b6d4]" },
  { href: "/contact", labelKey: "navContact", icon: <Mail size={18} />, color: "text-[#ec4899]" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { wishlist, compareList } = useApp();
  const { user, isLoggedIn, login, logout, language, setLanguage } = useUser();
  const { t } = useTranslation();

  const navItems: NavItem[] = navItemDefs.map((item) => ({
    ...item,
    label: t[item.labelKey],
  }));

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/Logo.png"
              alt="LaptopPintar Logo"
              width={40}
              height={40}
              className="rounded-lg object-cover"
              priority
            />
            <span className="text-lg font-bold font-[family-name:var(--font-display)] tracking-tight hidden sm:block">
              <span className="text-gradient-hero">LaptopPintar.id</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? `bg-white/10 ${item.color}`
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {compareList.length > 0 && (
              <Link
                href="/catalog"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2dd4bf]/10 border border-[#2dd4bf]/30 text-[#2dd4bf] text-xs font-medium cursor-pointer hover:bg-[#2dd4bf]/20 hover:border-[#2dd4bf]/50 transition-all"
              >
                <GitCompareArrows size={14} />
                <span>{compareList.length}</span>
              </Link>
            )}
            <Link
              href="/wishlist"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ec4899]/10 border border-[#ec4899]/30 text-[#ec4899] text-xs font-medium cursor-pointer hover:bg-[#ec4899]/20 hover:border-[#ec4899]/50 transition-all"
            >
              <Heart size={14} />
              <span>{wishlist.length}</span>
            </Link>

            <div className="relative" ref={dropdownRef}>
              {isLoggedIn ? (
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#3b82f6] flex items-center justify-center text-white text-xs font-bold">
                    {user?.avatarInitials}
                  </div>
                  <span className="text-sm text-slate-300 hidden lg:block max-w-[100px] truncate">{user?.name?.split(" ")[0]}</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#2dd4bf] to-[#3b82f6] text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all duration-200 active:scale-95"
                >
                  <LogIn size={16} />
                  <span className="hidden sm:inline">{t.navLogin}</span>
                </Link>
              )}

              {isLoggedIn && dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl glass shadow-2xl shadow-black/40 border border-white/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-5 py-4 bg-white/[0.03] border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#3b82f6] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {user?.avatarInitials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={() => setDropdownOpen(false)}
                      className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <UserIcon size={16} className="text-slate-400" />
                      {t.navProfile}
                    </button>

                    <div className="my-1 border-t border-white/5" />

                    <button
                      onClick={() => setLanguage(language === "id" ? "en" : "id")}
                      className="w-full flex items-center justify-between px-5 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <Globe size={16} className="text-[#06b6d4]" />
                        {t.navLang}
                      </span>
                      <span className="text-xs text-slate-500 bg-white/5 px-2.5 py-1 rounded-md">
                        {language === "id" ? t.navLangId : t.navLangEn}
                      </span>
                    </button>

                    <div className="my-1 border-t border-white/5" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut size={16} />
                      {t.navLogout}
                    </button>
                  </div>
                </div>
              )}
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
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? `bg-white/10 ${item.color}`
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
