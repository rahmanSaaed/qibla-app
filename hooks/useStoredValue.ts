"use client";

import { useCallback, useSyncExternalStore } from "react";

const CHANGE_EVENT = "stored-value-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

export function readStoredValue(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStoredValue(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (e.g. private mode); the value just won't persist.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Reads a localStorage string that stays in sync across components and tabs. Null during SSR. */
export function useStoredValue(key: string) {
  const value = useSyncExternalStore(
    subscribe,
    () => readStoredValue(key),
    () => null,
  );
  const setValue = useCallback((next: string) => writeStoredValue(key, next), [key]);
  return [value, setValue] as const;
}
