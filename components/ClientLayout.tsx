"use client";

import ThemeProvider from "./ThemeProvider";
import { LanguageProvider } from "@/lib/LanguageContext";
import Navbar from "./Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Navbar />
        <main>{children}</main>
      </LanguageProvider>
    </ThemeProvider>
  );
}
