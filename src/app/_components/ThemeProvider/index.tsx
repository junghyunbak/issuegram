"use client";

import React, { createContext, useState } from "react";

type ThemeValue = "dark" | null;

type ThemeContextState = {
  theme: ThemeValue;
  setTheme: React.Dispatch<React.SetStateAction<ThemeValue>>;
};

export const themeContext = createContext<ThemeContextState>(
  {} as ThemeContextState,
);

interface ThemeProviderProps {
  defaultTheme: ThemeValue;
  children: React.ReactNode;
}

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
}
