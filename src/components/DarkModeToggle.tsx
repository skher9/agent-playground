"use client";

import { useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";

// localStorage is the source of truth, read through useSyncExternalStore: no
// set-state-in-an-effect, and the server snapshot keeps the first render
// (always light) deterministic so hydration never mismatches.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === "dark";
}

function getServerSnapshot() {
  return false;
}

export default function DarkModeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function toggle() {
    localStorage.setItem(STORAGE_KEY, isDark ? "light" : "dark");
    listeners.forEach((listener) => listener());
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed right-4 top-4 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
    >
      {isDark ? "Light mode" : "Dark mode"}
    </button>
  );
}
