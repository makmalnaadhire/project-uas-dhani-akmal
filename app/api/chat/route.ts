import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import laptopsData from "@/data/laptops.json";
import type { Laptop } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY belum dikonfigurasi di .env" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const messages = body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Field 'messages' harus berupa array dan tidak boleh kosong" },
        { status: 400 }
      );
    }

    const laptops = laptopsData as Laptop[];

    const laptopCatalog = laptops.map(l => {
      const isu = l.isu_diketahui ?? "Tidak ada isu yang dilaporkan";
      const harga = `Rp ${l.harga_min.toLocaleString("id-ID")} - Rp ${l.harga_max.toLocaleString("id-ID")}`;
      return `- ${l.nama} (${l.merek}, ${l.tahun}) | Harga: ${harga} | Kondisi: ${l.kondisi} | Kategori: ${l.kategori.join(", ")} | CPU: ${l.spesifikasi.processor} | RAM: ${l.spesifikasi.ram} | Storage: ${l.spesifikasi.storage} | GPU: ${l.spesifikasi.gpu} | Display: ${l.spesifikasi.display} | OS: ${l.spesifikasi.os} | Status: ${l.status} | Catatan: ${l.catatan ?? "Tidak ada catatan"} | Isu: ${isu}`;
    }).join("\n");

    const google = createGoogleGenerativeAI({ apiKey });

    const { text } = await generateText({
      model: google("gemini-3.5-flash"),
      system:
        "You are Ling AI, a friendly, smart, and helpful laptop consultant assistant for LaptopPintar. " +
        "Help users choose the best laptop based on their technical needs, specs, and budget dynamically. " +
        "Always refer to the platform as LaptopPintar when relevant. " +
        "You have access to the following laptop database:\n\n" +
        laptopCatalog + "\n\n" +
        "When recommending laptops, use the actual data above. Mention specific model names, prices in Rupiah, and key specs. " +
        "If a user asks about a specific brand or category, filter from this database. " +
        "Always respond in the same language the user writes in (Indonesian or English).",
      messages,
    });

    if (!text) {
      return NextResponse.json(
        { error: "Model mengembalikan respons kosong" },
        { status: 502 }
      );
    }

    return NextResponse.json({ content: text });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[/api/chat] Error:", message);

    if (message.includes("API key")) {
      return NextResponse.json(
        { error: "API key tidak valid atau tidak memiliki akses ke model ini" },
        { status: 401 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
