"use client";

import ThemeProvider from "./ThemeProvider";
import Navbar from "./Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Navbar />
      <main>{children}</main>
    </ThemeProvider>
  );
}
