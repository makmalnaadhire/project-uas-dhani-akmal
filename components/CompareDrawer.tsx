"use client";

import type { Laptop } from "@/lib/types";
import { X, Trash2, ChevronUp, ChevronDown, Cpu, MemoryStick, HardDrive, Monitor, Tag } from "lucide-react";
import { useState } from "react";

interface Props {
  items: Laptop[];
  onRemove: (l: Laptop) => void;
  onClose: () => void;
}

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

export default function CompareDrawer({ items, onRemove, onClose }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  const specRows = [
    { label: "Brand", key: "brand", icon: <Tag size={13} /> },
    { label: "Processor", key: "cpu", icon: <Cpu size={13} /> },
    { label: "RAM", key: "ram", icon: <MemoryStick size={13} /> },
    { label: "Storage", key: "storage", icon: <HardDrive size={13} /> },
    { label: "GPU", key: "gpu", icon: <Monitor size={13} /> },
    { label: "Harga", key: "price", icon: <Tag size={13} /> },
    { label: "Kondisi", key: "condition", icon: null },
    { label: "Kategori", key: "category", icon: null },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 compare-drawer ${items.length > 0 ? "open" : ""}`}>
      <div className="glass border-t border-[#2dd4bf]/20 max-w-7xl mx-auto">
        {/* Mini bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#2dd4bf]">
              Perbandingan ({items.length}/3)
            </span>
            <div className="flex gap-2">
              {items.map(l => (
                <span key={l.id} className="flex items-center gap-1 px-2 py-1 rounded bg-[#2dd4bf]/10 text-[#2dd4bf] text-[10px] font-medium">
                  {l.name}
                  <button onClick={() => onRemove(l)} className="ml-0.5 hover:text-white transition-colors">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors"
            >
              {expanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-red-400 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Expanded comparison */}
        {expanded && items.length >= 2 && (
          <div className="px-4 pb-4 overflow-x-auto slide-up">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr>
                  <th className="text-left text-xs text-slate-500 font-medium py-2 pr-4 w-32">Spesifikasi</th>
                  {items.map(l => (
                    <th key={l.id} className="text-left text-xs text-white font-medium py-2 px-3">
                      {l.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="text-[11px] text-slate-500 py-2.5 pr-4 flex items-center gap-1.5">
                      {row.icon}
                      {row.label}
                    </td>
                    {items.map(l => (
                      <td key={l.id} className="text-xs text-white py-2.5 px-3">
                        {row.key === "price" ? formatRupiah(l[row.key as keyof Laptop] as number) :
                         row.key === "condition" ? (l[row.key as keyof Laptop] === "New" ? "Baru" : "Bekas") :
                         String(l[row.key as keyof Laptop])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {expanded && items.length < 2 && (
          <div className="px-4 pb-4 text-center">
            <p className="text-xs text-slate-500">Pilih minimal 2 laptop untuk memulai perbandingan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
