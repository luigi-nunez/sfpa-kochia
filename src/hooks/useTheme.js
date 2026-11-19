import { useEffect, useState } from "react";

const KEY = "kochia-theme";
const META_COLORS = { light: "#00796B", dark: "#0F1F1D" };

function systemTheme() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function storedTheme() {
  try {
    const v = localStorage.getItem(KEY);
    return v === "dark" || v === "light" ? v : null;
  } catch {
    return null;
  }
}

// Follows the OS setting until the user picks a theme, then remembers that choice.
export default function useTheme() {
  const [theme, setTheme] = useState(() => storedTheme() ?? systemTheme());
  const [userChose, setUserChose] = useState(() => storedTheme() !== null);

  useEffect(() => {
    const root = document.documentElement;
    if (userChose) root.setAttribute("data-theme", theme);
    else root.removeAttribute("data-theme");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META_COLORS[theme]);
  }, [theme, userChose]);

  // Track OS changes while the user has not made an explicit choice.
  useEffect(() => {
    if (userChose || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setTheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [userChose]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setUserChose(true);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode or storage blocked: choice lasts for this session only */
    }
  }

  return [theme, toggleTheme];
}
