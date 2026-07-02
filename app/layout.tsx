import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dharian — Laptop Catalog & Recommendation",
  description: "Platform cerdas pencarian, perbandingan, dan rekomendasi laptop",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
