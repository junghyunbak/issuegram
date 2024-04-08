import { type StateCreator } from "zustand";

type SnackbarSlice = {
  copied: {
    isOpen: boolean;
  };
  setCopiedSnackbarIsOpen: (copiedSnackbarIsOpen: boolean) => void;
};

export const createSnackbarSlice: StateCreator<SnackbarSlice> = (
  set,
): SnackbarSlice => ({
  copied: {
    isOpen: false,
  },
  setCopiedSnackbarIsOpen: (isOpen: boolean) => {
    set((state) => ({
      ...state,
      copied: {
        isOpen,
      },
    }));
  },
});
