/**
 * Mock persistence layer for simulated Google OAuth user session.
 *
 * localStorage key: "laptop_pintar_user_session"
 * Stores the full user record so profile edits survive logout/login cycles.
 */

export interface MockUser {
  name: string;
  email: string;
  avatarInitials: string;
  username: string;
  major: string;
  provider: "google" | "credentials";
  image: string | null;
}

const STORAGE_KEY = "laptop_pintar_user_session";
const AUTH_FLAG_KEY = "laptoppintar-auth";

export const DEFAULT_MOCK_USER: MockUser = {
  name: "Dhani Akmal",
  email: "dhani.akmal@laptoppintar.id",
  avatarInitials: "DA",
  username: "dhani",
  major: "S1 Sistem Informasi",
  provider: "google",
  image: null,
};

/* ── Read ─────────────────────────────────────────────── */

export function readStoredUser(): MockUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as MockUser;
  } catch {
    return null;
  }
}

/* ── Write ────────────────────────────────────────────── */

export function writeStoredUser(user: MockUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

/* ── Delete ───────────────────────────────────────────── */

export function clearStoredUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/* ── Auth flag (login state only, not profile data) ──── */

export function getAuthFlag(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_FLAG_KEY) === "true";
}

export function setAuthFlag(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_FLAG_KEY, "true");
}

export function clearAuthFlag(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_FLAG_KEY);
}

/* ── Core: init-or-fetch ──────────────────────────────── */

/**
 * On Google sign-in:
 *  1. If a persisted user record exists → return it (edits survive).
 *  2. Otherwise → seed with DEFAULT_MOCK_USER, persist, return it.
 */
export function initOrFetchGoogleUser(): MockUser {
  const existing = readStoredUser();
  if (existing) return existing;

  const fresh = { ...DEFAULT_MOCK_USER };
  writeStoredUser(fresh);
  return fresh;
}

/**
 * Merge partial updates into the stored user record.
 * Returns the full updated record.
 */
export function patchStoredUser(patch: Partial<MockUser>): MockUser {
  const current = readStoredUser() ?? DEFAULT_MOCK_USER;
  const updated = { ...current, ...patch };
  writeStoredUser(updated);
  return updated;
}
