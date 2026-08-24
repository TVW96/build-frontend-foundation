"use client";

import { useLayoutEffect } from "react";

import styles from "./SiteHeader.module.css";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  try {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
  } catch {
    // Fall through to the operating-system preference when storage is blocked.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle() {
  useLayoutEffect(() => {
    applyTheme(getPreferredTheme());
  }, []);

  function toggleTheme() {
    const currentTheme =
      document.documentElement.dataset.theme ?? getPreferredTheme();
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // The visual toggle still works when storage is unavailable.
    }
  }

  return (
    <button
      className={styles.themeToggle}
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
    >
      <svg
        className={styles.moonIcon}
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path d="M20.2 15.3A8.4 8.4 0 0 1 8.7 3.8a8.5 8.5 0 1 0 11.5 11.5Z" />
      </svg>
      <svg
        className={styles.sunIcon}
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
