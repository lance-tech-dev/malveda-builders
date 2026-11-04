
"use client";

import {
  createContext,
  useContext,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

type ThemeOrigin = {
  x: number;
  y: number;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: (origin?: ThemeOrigin) => void;
  isMounted: boolean;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (
    callback: () => void,
  ) => {
    finished: Promise<void>;
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "malveda-theme";

const themeListeners = new Set<() => void>();

function notifyThemeListeners() {
  themeListeners.forEach((listener) => listener());
}

function subscribeTheme(callback: () => void) {
  themeListeners.add(callback);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) {
      callback();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    themeListeners.delete(callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function getThemeSnapshot(): Theme {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "dark" || saved === "light") {
      return saved;
    }
  } catch {
    // Storage access may be restricted
  }
  return typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

const emptySubscribe = () => () => {};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const isTransitioningRef = useRef(false);

  function toggleTheme(origin?: ThemeOrigin) {
    if (!isMounted) return;
    if (isTransitioningRef.current) return;

    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    const updateTheme = () => {
      root.classList.toggle("dark", nextTheme === "dark");
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {
        // Theme still works for this session if storage is unavailable.
      }
      notifyThemeListeners();
    };

    const viewTransitionDocument =
      document as ViewTransitionDocument;

    if (
      !viewTransitionDocument.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      updateTheme();
      return;
    }

    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? window.innerHeight / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    root.style.setProperty("--theme-transition-x", `${x}px`);
    root.style.setProperty("--theme-transition-y", `${y}px`);
    root.style.setProperty(
      "--theme-transition-r",
      `${Math.ceil(endRadius) + 2}px`,
    );
    root.classList.add("theme-transition-active");
    isTransitioningRef.current = true;

    const cleanup = () => {
      root.classList.remove("theme-transition-active");
      root.style.removeProperty("--theme-transition-x");
      root.style.removeProperty("--theme-transition-y");
      root.style.removeProperty("--theme-transition-r");
      isTransitioningRef.current = false;
    };

    try {
      const transition =
        viewTransitionDocument.startViewTransition(() => {
          flushSync(updateTheme);
        });

      transition.finished.then(cleanup, cleanup);
    } catch {
      cleanup();
      updateTheme();
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isMounted,
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
