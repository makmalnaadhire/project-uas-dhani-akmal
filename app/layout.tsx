import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import AppProvider from "@/components/providers/AppProvider";
import UserProvider from "@/components/providers/UserProvider";
import LanguageProvider from "@/components/providers/LanguageProvider";

export const metadata: Metadata = {
  title: "LaptopPintar — Smart Laptop Catalog & Recommendation",
  description: "Platform cerdas pencarian, perbandingan, dan rekomendasi laptop oleh LaptopPintar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100">
        <UserProvider>
          <LanguageProvider>
            <AppProvider>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <ChatWidget />
            </AppProvider>
          </LanguageProvider>
        </UserProvider>
      </body>
    </html>
  );
}
