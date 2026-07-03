"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

interface User {
  name: string;
  email: string;
  avatarInitials: string;
}

type Language = "id" | "en";

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
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
  const [language, setLanguage] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLang = localStorage.getItem("laptoppintar-lang") as Language | null;
    const storedAuth = localStorage.getItem("laptoppintar-auth");

    if (storedLang) setLanguage(storedLang);
    if (storedAuth === "true") setUser(MOCK_USER);
  }, []);

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

  return (
    <UserContext.Provider value={{ user, isLoggedIn: !!user, login, logout, language, setLanguage }}>
      {children}
    </UserContext.Provider>
  );
}
