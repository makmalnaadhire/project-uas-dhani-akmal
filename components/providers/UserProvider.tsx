"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

interface User {
  name: string;
  email: string;
  avatarInitials: string;
}

type Theme = "dark" | "light";
type Language = "id" | "en";

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}

const MOCK_USER: User = {
  name: "Dhani Akmal",
  email: "dhani.akmal@laptoppintar.id",
  avatarInitials: "DA",
};

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const [language, setLanguage] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("laptoppintar-theme") as Theme | null;
    const storedLang = localStorage.getItem("laptoppintar-lang") as Language | null;
    const storedAuth = localStorage.getItem("laptoppintar-auth");

    if (storedTheme) setTheme(storedTheme);
    if (storedLang) setLanguage(storedLang);
    if (storedAuth === "true") setUser(MOCK_USER);
  }, []);

  // Sync theme to <html> class + localStorage
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("laptoppintar-theme", theme);
  }, [theme, mounted]);

  // Sync language to localStorage
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("laptoppintar-lang", language);
  }, [language, mounted]);

  const login = useCallback(() => {
    setUser(MOCK_USER);
    localStorage.setItem("laptoppintar-auth", "true");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("laptoppintar-auth");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn: !!user, login, logout, theme, toggleTheme, language, setLanguage }}>
      {children}
    </UserContext.Provider>
  );
}
