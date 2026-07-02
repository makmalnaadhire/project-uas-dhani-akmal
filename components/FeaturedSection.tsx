"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight, Cpu, MemoryStick, HardDrive, MonitorSmartphone } from "lucide-react";
import Link from "next/link";
import { staggerContainer, fadeInUp, hoverZoomWiggle } from "@/lib/motion";

const products = [
  {
    id: "macbook-pro-m3",
    title: 'MacBook Pro 14" M3',
    specs: {
      processor: "Apple M3",
      ram: "18GB Unified",
      storage: "512GB SSD",
      gpu: "Apple M3 GPU",
    },
    screen: '14.2" Liquid Retina XDR',
    price: 27,
    rating: 4.9,
    condition: "baru" as const,
  },
  {
    id: "asus-rog-strix-g16",
    title: "ASUS ROG Strix G16",
    specs: {
      processor: "Intel Core i7-14650HX",
      ram: "16GB DDR5",
      storage: "1TB SSD",
      gpu: "NVIDIA RTX 4060",
    },
    screen: '16" QHD 165Hz',
    price: 19,
    rating: 4.7,
    condition: "baru" as const,
  },
  {
    id: "lenovo-thinkpad-e14",
    title: "Lenovo ThinkPad E14",
    specs: {
      processor: "Intel Core i5-1335U",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      gpu: "Intel Iris Xe",
    },
    screen: '14" FHD IPS',
    price: 12,
    rating: 4.6,
    condition: "baru" as const,
  },
  {
    id: "lenovo-loq-15",
    title: "Lenovo LOQ 15",
    specs: {
      processor: "AMD Ryzen 7 7840HS",
      ram: "16GB DDR5",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 4050",
    },
    screen: '15.6" FHD 144Hz',
    price: 14,
    rating: 4.6,
    condition: "baru" as const,
  },
  {
    id: "asus-vivobook-15",
    title: "ASUS VivoBook 15",
    specs: {
      processor: "Intel Core i5-1335U",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      gpu: "Intel Iris Xe",
    },
    screen: '15.6" FHD IPS',
    price: 9,
    rating: 4.5,
    condition: "baru" as const,
  },
  {
    id: "macbook-air-m2",
    title: "MacBook Air M2",
    specs: {
      processor: "Apple M2",
      ram: "8GB Unified",
      storage: "256GB SSD",
      gpu: "Apple M2 GPU",
    },
    screen: '13.6" Liquid Retina',
    price: 17,
    rating: 4.8,
    condition: "baru" as const,
  },
];

export default function FeaturedSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Laptop Pilihan
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">
            Rekomendasi laptop terbaik untuk Anda
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeInUp}
              {...hoverZoomWiggle}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm cursor-pointer"
            >
              <div className="h-52 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center overflow-hidden">
                <div className="w-32 h-20 bg-gray-300 dark:bg-gray-500 rounded-lg" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {product.rating}
                  </span>
                  <span
                    className={`ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      product.condition === "baru"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                    }`}
                  >
                    {product.condition === "baru" ? "Baru" : "Second"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {product.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  {product.screen}
                </p>

                <div className="grid grid-cols-2 gap-1.5 mb-4">
                  <MiniSpec icon={Cpu} label={product.specs.processor} />
                  <MiniSpec icon={MemoryStick} label={product.specs.ram} />
                  <MiniSpec icon={HardDrive} label={product.specs.storage} />
                  <MiniSpec icon={MonitorSmartphone} label={product.specs.gpu} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    Rp {product.price.toLocaleString("id-ID")} jt
                  </span>
                  <Link
                    href={`/catalog/${product.id}`}
                    className="text-sm font-medium text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Detail <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-12"
        >
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30"
          >
            Lihat Semua Laptop
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function MiniSpec({ icon: Icon, label }: { icon: typeof Cpu; label: string }) {
  return (
    <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg px-2 py-1">
      <Icon className="w-3 h-3 text-gray-400 dark:text-gray-500 shrink-0" />
      <span className="text-[10px] text-gray-600 dark:text-gray-300 truncate">{label}</span>
    </div>
  );
}
