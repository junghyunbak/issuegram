import { type StateCreator } from "zustand";

type ThemeSlice = {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
};

export const createThemeSlice: StateCreator<ThemeSlice> = (
  set,
): ThemeSlice => ({
  isDark: false,
  setIsDark: (isDark: boolean) => {
    set((state) => ({
      ...state,
      isDark,
    }));
  },
});
