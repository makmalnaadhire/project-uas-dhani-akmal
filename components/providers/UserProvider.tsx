"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import {
  type MockUser,
  initOrFetchGoogleUser,
  patchStoredUser,
  readStoredUser,
  clearStoredUser,
  getAuthFlag,
  setAuthFlag,
  clearAuthFlag,
  DEFAULT_MOCK_USER,
} from "@/lib/auth";

type Language = "id" | "en";

interface UserContextType {
  user: MockUser | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  updateUser: (data: Partial<MockUser>) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [language, setLanguage] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  /* ── Hydration: restore session from localStorage ───── */
  useEffect(() => {
    setMounted(true);

    const storedLang = localStorage.getItem("laptoppintar-lang") as Language | null;
    if (storedLang) setLanguage(storedLang);

    if (getAuthFlag()) {
      const stored = readStoredUser();
      if (stored) {
        setUser(stored);
      } else {
        // Auth flag set but no data — seed fresh record
        const fresh = initOrFetchGoogleUser();
        setUser(fresh);
      }
    }
  }, []);

  /* ── Persist language preference ────────────────────── */
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("laptoppintar-lang", language);
  }, [language, mounted]);

  /* ── Google OAuth sign-in (mock) ────────────────────── */
  const login = useCallback(() => {
    // initOrFetchGoogleUser: returns stored record if exists,
    // otherwise seeds with DEFAULT_MOCK_USER and persists it.
    // This is the KEY fix — profile edits survive logout/login.
    const userData = initOrFetchGoogleUser();
    setUser(userData);
    setAuthFlag();
  }, []);

  /* ── Sign-out: clear auth flag only, keep profile data ─ */
  const logout = useCallback(() => {
    setUser(null);
    clearAuthFlag();
    // NOTE: We intentionally do NOT call clearStoredUser().
    // The persisted profile record stays in localStorage so that
    // the next login picks up the user's edits.
  }, []);

  /* ── Profile mutation: patch + persist ───────────────── */
  const updateUser = useCallback((data: Partial<MockUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = patchStoredUser(data);
      return updated;
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        updateUser,
        language,
        setLanguage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
