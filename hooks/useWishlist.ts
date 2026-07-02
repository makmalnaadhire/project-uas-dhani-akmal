"use client";

import { useCallback, useSyncExternalStore } from "react";

type WishlistItem = {
  id: string;
  addedAt: number;
};

const STORAGE_KEY = "laptoppintar_wishlist";

function readWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeWishlist(items: WishlistItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

let cachedItems: WishlistItem[] = [];
let listeners: Array<() => void> = [];

function emitChange() {
  cachedItems = readWishlist();
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): WishlistItem[] {
  return cachedItems;
}

function getServerSnapshot(): WishlistItem[] {
  return [];
}

export function useWishlist() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const add = useCallback((id: string) => {
    const current = readWishlist();
    if (!current.some((i) => i.id === id)) {
      writeWishlist([...current, { id, addedAt: Date.now() }]);
      emitChange();
    }
  }, []);

  const remove = useCallback((id: string) => {
    writeWishlist(readWishlist().filter((i) => i.id !== id));
    emitChange();
  }, []);

  const toggle = useCallback((id: string) => {
    const current = readWishlist();
    const next = current.some((i) => i.id === id)
      ? current.filter((i) => i.id !== id)
      : [...current, { id, addedAt: Date.now() }];
    writeWishlist(next);
    emitChange();
  }, []);

  const has = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items]
  );

  return { items, add, remove, toggle, has, count: items.length, hydrated: true };
}
