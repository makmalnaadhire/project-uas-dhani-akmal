"use client";

import type { Laptop } from "@/lib/types";
import { X, Trash2, ChevronUp, ChevronDown, Cpu, MemoryStick, HardDrive, Monitor, Tag, FileDown } from "lucide-react";
import { useState, useRef, useCallback } from "react";

interface Props {
  items: Laptop[];
  onRemove: (l: Laptop) => void;
  onClose: () => void;
}

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

function getValue(laptop: Laptop, key: string): string {
  switch (key) {
    case "merek": return laptop.merek;
    case "processor": return laptop.spesifikasi.processor;
    case "ram": return laptop.spesifikasi.ram;
    case "storage": return laptop.spesifikasi.storage;
    case "gpu": return laptop.spesifikasi.gpu;
    case "harga": return `${formatRupiah(laptop.harga_min)} - ${formatRupiah(laptop.harga_max)}`;
    case "kondisi": return laptop.kondisi;
    case "kategori": return laptop.kategori.join(", ");
    case "tahun": return String(laptop.tahun);
    case "display": return laptop.spesifikasi.display;
    case "isu_diketahui": return laptop.isu_diketahui || "-";
    default: return "";
  }
}

const specRows = [
  { label: "Merek", key: "merek", icon: <Tag size={13} /> },
  { label: "Tahun", key: "tahun", icon: null },
  { label: "Processor", key: "processor", icon: <Cpu size={13} /> },
  { label: "RAM", key: "ram", icon: <MemoryStick size={13} /> },
  { label: "Storage", key: "storage", icon: <HardDrive size={13} /> },
  { label: "GPU", key: "gpu", icon: <Monitor size={13} /> },
  { label: "Display", key: "display", icon: null },
  { label: "Harga", key: "harga", icon: <Tag size={13} /> },
  { label: "Kondisi", key: "kondisi", icon: null },
  { label: "Kategori", key: "kategori", icon: null },
  { label: "Isu Diketahui", key: "isu_diketahui", icon: null },
];

export default function CompareDrawer({ items, onRemove, onClose }: Props) {
  const [expanded, setExpanded] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = useCallback(() => {
    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) return;

    const rows = specRows.map(row => {
      const cells = items.map(l => `<td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#1e293b;">${getValue(l, row.key)}</td>`).join("");
      return `<tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;font-size:13px;color:#475569;width:160px;">${row.label}</td>${cells}</tr>`;
    }).join("");

    const headers = items.map(l => `<th style="padding:10px 14px;text-align:left;font-size:13px;font-weight:700;color:#0f172a;border-bottom:2px solid #2dd4bf;">${l.nama}</th>`).join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head><title>Perbandingan Laptop - LaptopPintar</title></head>
      <body style="font-family:'Segoe UI',system-ui,sans-serif;padding:40px;max-width:800px;margin:0 auto;">
        <h1 style="font-size:20px;color:#0f172a;margin-bottom:4px;">LaptopPintar - Perbandingan Spesifikasi</h1>
        <p style="font-size:12px;color:#94a3b8;margin-bottom:24px;">Dicetak pada ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
        <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <thead><tr><th style="padding:10px 14px;text-align:left;font-size:13px;font-weight:700;color:#475569;border-bottom:2px solid #e5e7eb;width:160px;">Spesifikasi</th>${headers}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <p style="font-size:11px;color:#94a3b8;margin-top:24px;text-align:center;">LaptopPintar &mdash; Temukan Laptop yang Tepat untuk Kamu</p>
        <script>window.onload=function(){window.print();}<\/script>
      </body>
      </html>
    `);
    printWindow.document.close();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 compare-drawer ${items.length > 0 ? "open" : ""}`}>
      <div className="glass border-t border-[#2dd4bf]/20 max-w-7xl mx-auto rounded-t-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-xs font-semibold text-[#2dd4bf] whitespace-nowrap">
              Perbandingan ({items.length}/3)
            </span>
            <div className="flex gap-2 overflow-x-auto flex-1 min-w-0">
              {items.map(l => (
                <span key={l.id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2dd4bf]/10 text-[#2dd4bf] text-[10px] font-medium whitespace-nowrap">
                  {l.nama}
                  <button onClick={() => onRemove(l)} className="ml-0.5 hover:text-white transition-colors rounded-full p-0.5 hover:bg-white/10">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6366f1]/10 text-[#818cf8] text-[10px] font-medium border border-[#6366f1]/20 hover:bg-[#6366f1]/20 transition-all"
            >
              <FileDown size={12} />
              Cetak PDF
            </button>
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

        {expanded && items.length >= 2 && (
          <div ref={tableRef} className="px-5 pb-5 overflow-x-auto slide-up" id="compare-table">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-[11px] text-slate-500 font-semibold py-2.5 pr-4 w-36 uppercase tracking-wider">Spesifikasi</th>
                  {items.map(l => (
                    <th key={l.id} className="text-left text-xs text-white font-semibold py-2.5 px-3 border-b border-[#2dd4bf]/20">
                      <span className="block truncate max-w-[200px]">{l.nama}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, i) => {
                  const isHighlight = row.key === "harga";
                  const isWarning = row.key === "isu_diketahui";
                  return (
                    <tr key={i} className={`border-t border-white/5 ${isHighlight ? "bg-[#2dd4bf]/[0.03]" : ""}`}>
                      <td className={`text-[11px] py-2.5 pr-4 flex items-center gap-1.5 font-medium ${isHighlight ? "text-[#2dd4bf]" : isWarning ? "text-amber-400/70" : "text-slate-500"}`}>
                        {row.icon}
                        {row.label}
                      </td>
                      {items.map(l => (
                        <td key={l.id} className={`text-xs py-2.5 px-3 ${isHighlight ? "font-bold text-[#2dd4bf]" : isWarning ? "text-amber-400/80 text-[11px] max-w-[200px]" : "text-slate-200"}`}>
                          {isWarning && getValue(l, row.key) !== "-"
                            ? <span className="line-clamp-2">{getValue(l, row.key)}</span>
                            : getValue(l, row.key)
                          }
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {expanded && items.length < 2 && (
          <div className="px-5 pb-5 text-center">
            <p className="text-xs text-slate-500">Pilih minimal 2 laptop untuk memulai perbandingan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
