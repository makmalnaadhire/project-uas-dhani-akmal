"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

interface User {
  name: string;
  email: string;
  avatarInitials: string;
  username: string;
  major: string;
}

type Language = "id" | "en";

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
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
  username: "dhani",
  major: "S1 Sistem Informasi",
};

function loadSession(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("user_session");
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

function saveSession(user: User) {
  if (typeof window === "undefined") return;
  localStorage.setItem("user_session", JSON.stringify(user));
}

function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user_session");
}

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLang = localStorage.getItem("laptoppintar-lang") as Language | null;
    if (storedLang) setLanguage(storedLang);

    const session = loadSession();
    if (session) {
      setUser(session);
    } else {
      const storedAuth = localStorage.getItem("laptoppintar-auth");
      if (storedAuth === "true") {
        setUser(MOCK_USER);
        saveSession(MOCK_USER);
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("laptoppintar-lang", language);
  }, [language, mounted]);

  const login = useCallback(() => {
    const existing = loadSession();
    const userData = existing ?? MOCK_USER;
    setUser(userData);
    saveSession(userData);
    localStorage.setItem("laptoppintar-auth", "true");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    clearSession();
    localStorage.removeItem("laptoppintar-auth");
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      saveSession(updated);
      return updated;
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn: !!user, login, logout, updateUser, language, setLanguage }}>
      {children}
    </UserContext.Provider>
  );
}
