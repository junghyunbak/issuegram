"use client";

import React, { createContext, useEffect, useState } from "react";

type ThemeValue = "dark" | null;

type ThemeContextState = {
  theme: ThemeValue;
  setTheme: React.Dispatch<React.SetStateAction<ThemeValue>>;
};

export const themeContext = createContext<ThemeContextState>(
  {} as ThemeContextState,
);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeValue>(null);

  useEffect(() => {
    const curTheme = localStorage.getItem("theme");

    if (curTheme === "dark") {
      setTheme("dark");

      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
}
