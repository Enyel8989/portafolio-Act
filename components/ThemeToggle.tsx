"use client";

import { useSyncExternalStore } from "react";

const themeKey = "portfolio-theme";
const themeEvent = "portfolio-theme-change";
const getTheme = () => document.documentElement.dataset.theme ?? "dark";
const getServerTheme = () => "dark";

function subscribe(onChange: () => void) {
  window.addEventListener(themeEvent, onChange);
  return () => window.removeEventListener(themeEvent, onChange);
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(themeKey, next); } catch {}
    window.dispatchEvent(new Event(themeEvent));
  }

  return (
    <button className="button secondary theme-toggle" type="button" onClick={toggleTheme}>
      {theme === "light" ? "Modo oscuro" : "Modo claro"}
    </button>
  );
}
