"use client";

import { useState } from "react";
import { Scale, X, Plus, Cpu, MemoryStick, HardDrive, MonitorSmartphone } from "lucide-react";
import laptopsData from "@/data/laptops.json";

type Laptop = {
  id: string;
  name: string;
  brand: string;
  price: number;
  condition: "baru" | "second";
  needs: string[];
  specs: { processor: string; ram: string; storage: string; gpu: string };
  screen: string;
  rating: number;
  description: string;
};

const laptops = laptopsData as Laptop[];

export default function ComparePage() {
  const [selected, setSelected] = useState<Laptop[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  const addLaptop = (laptop: Laptop) => {
    if (selected.length < 3 && !selected.some((l) => l.id === laptop.id)) {
      setSelected((prev) => [...prev, laptop]);
    }
    setShowPicker(false);
  };

  const removeLaptop = (id: string) => {
    setSelected((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <Scale className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Bandingkan
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Bandingkan Laptop</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Pilih maksimal 3 laptop untuk melihat perbandingan spesifikasi.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {selected.length === 0 ? (
          <div className="text-center py-20">
            <Scale className="w-16 h-16 text-gray-300 mx-auto" />
            <h2 className="mt-4 text-lg font-semibold text-gray-700">Belum ada laptop dipilih</h2>
            <p className="mt-1 text-sm text-gray-500">Klik tombol di bawah untuk menambahkan laptop.</p>
            <button
              onClick={() => setShowPicker(true)}
              className="mt-6 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" /> Tambah Laptop
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex gap-3">
              {selected.map((l) => (
                <div
                  key={l.id}
                  className="flex-1 border border-gray-200 bg-white rounded-2xl p-4 relative"
                >
                  <button
                    onClick={() => removeLaptop(l.id)}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                  <h3 className="text-sm font-semibold text-gray-900 pr-6">{l.name}</h3>
                  <p className="text-xs text-gray-500">{l.brand}</p>
                  <p className="text-base font-bold text-gray-900 mt-2">
                    Rp {l.price.toLocaleString("id-ID")} jt
                  </p>
                </div>
              ))}
              {selected.length < 3 && (
                <button
                  onClick={() => setShowPicker(true)}
                  className="flex-1 border-2 border-dashed border-gray-200 rounded-2xl p-4 flex items-center justify-center text-gray-400 hover:border-emerald-300 hover:text-emerald-500 transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Comparison Table */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "Processor", key: "processor", icon: Cpu },
                    { label: "RAM", key: "ram", icon: MemoryStick },
                    { label: "Storage", key: "storage", icon: HardDrive },
                    { label: "GPU", key: "gpu", icon: MonitorSmartphone },
                    { label: "Layar", key: "screen" },
                    { label: "Kondisi", key: "condition" },
                    { label: "Rating", key: "rating" },
                  ].map((row, i) => (
                    <tr key={row.key} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-4 py-3 font-medium text-gray-600 w-36">{row.label}</td>
                      {selected.map((l) => (
                        <td key={l.id} className="px-4 py-3 text-gray-900">
                          {row.key === "rating"
                            ? `${l.rating} / 5`
                            : row.key === "condition"
                            ? l.condition === "baru" ? "Baru" : "Second"
                            : row.key === "screen"
                            ? l.screen
                            : row.key === "processor"
                            ? l.specs.processor
                            : row.key === "ram"
                            ? l.specs.ram
                            : row.key === "storage"
                            ? l.specs.storage
                            : row.key === "gpu"
                            ? l.specs.gpu
                            : ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Picker Modal */}
        {showPicker && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Pilih Laptop</h2>
                <button onClick={() => setShowPicker(false)} className="p-1 rounded-full hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="overflow-y-auto max-h-[60vh] p-4 space-y-2">
                {laptops
                  .filter((l) => !selected.some((s) => s.id === l.id))
                  .map((l) => (
                    <button
                      key={l.id}
                      onClick={() => addLaptop(l)}
                      className="w-full text-left border border-gray-200 rounded-xl p-3 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all"
                    >
                      <p className="text-sm font-semibold text-gray-900">{l.name}</p>
                      <p className="text-xs text-gray-500">{l.brand} - Rp {l.price.toLocaleString("id-ID")} jt</p>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
