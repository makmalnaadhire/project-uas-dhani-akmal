"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X, Heart, Laptop } from "lucide-react";

const navItems = [
  {
    label: "Katalog",
    href: "/catalog",
    children: [
      { label: "Daftar Laptop", href: "/catalog" },
      { label: "Detail Laptop", href: "/catalog/detail" },
      { label: "Bandingkan Laptop", href: "/catalog/compare" },
      { label: "Harga", href: "/catalog/harga" },
    ],
  },
  {
    label: "Rekomendasi",
    href: "/recommendations",
    badge: "Baru",
    children: [
      { label: "Kebutuhan", href: "/recommendations?step=kebutuhan" },
      { label: "Budget", href: "/recommendations?step=budget" },
      { label: "Kondisi (Baru/Second)", href: "/recommendations?step=kondisi" },
      { label: "Lihat Hasil", href: "/recommendations?step=hasil" },
    ],
  },
  {
    label: "Edukasi",
    href: "/education",
    children: [
      { label: "Blog Tips Laptop", href: "/education/blog" },
      { label: "FAQ", href: "/education/faq" },
      { label: "Kamus Teknologi", href: "/education/dictionary" },
      { label: "Estimasi Jual/Beli", href: "/education/estimasi" },
      { label: "Panduan Laptop Second", href: "/education/panduan-second" },
      { label: "Cek Umur Laptop", href: "/education/umur-laptop" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <Laptop className="w-6 h-6 text-emerald-500" />
            LaptopPintar
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith(item.href)
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded-full font-semibold">
                      {item.badge}
                    </span>
                  )}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {openDropdown === item.label && item.children && (
                  <div className="absolute top-full left-0 mt-1.5 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Heart className="w-4 h-4" />
              Wishlist
            </Link>
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/recommendations"
              className="hidden md:block bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Mulai Cari →
            </Link>
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <div key={item.label}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-3 mb-1 px-2">
                {item.label}
              </p>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="pt-3 border-t border-gray-200">
            <Link
              href="/wishlist"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              <Heart className="w-4 h-4" /> Wishlist
            </Link>
            <Link
              href="/recommendations"
              className="mt-2 block text-center bg-emerald-500 text-white text-sm font-semibold px-4 py-2.5 rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              Mulai Cari →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}