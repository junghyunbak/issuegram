import { type StateCreator } from "zustand";

type SnackbarSlice = {
  copiedSnackbar: symbol;
  fireCopiedSnackbar: () => void;
};

export const createSnackbarSlice: StateCreator<SnackbarSlice> = (
  set,
): SnackbarSlice => ({
  copiedSnackbar: Symbol(),
  fireCopiedSnackbar: () => {
    set((state) => ({
      ...state,
      copiedSnackbar: Symbol(),
    }));
  },
});
