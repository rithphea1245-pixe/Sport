"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
    // Keep native UI (scrollbars, date pickers, form controls) in sync.
    root.style.colorScheme = t;
  };

  useEffect(() => {
    // The blocking script in layout.tsx already painted the correct theme
    // before first paint, so here we only sync React state to the DOM.
    const saved = localStorage.getItem("sporthub_theme") as Theme | null;
    const initial: Theme =
      saved === "dark" || saved === "light"
        ? saved
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    setThemeState(initial);
    applyTheme(initial);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("sporthub_theme", newTheme);

    const root = document.documentElement;

    if (
      typeof document !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme(newTheme);
      return;
    }

    // Transitions are enabled only for the duration of the switch, so
    // hover/state colour changes elsewhere stay instant instead of
    // animating behind every click.
    root.classList.add("theme-animating");
    applyTheme(newTheme);

    window.setTimeout(() => {
      root.classList.remove("theme-animating");
    }, 320);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isDark: theme === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
