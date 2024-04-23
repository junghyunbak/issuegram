import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { createSnackbarSlice } from "./slices/snackbar";
import { createThemeSlice } from "./slices/theme";

export type StoreState = ReturnType<typeof createSnackbarSlice> &
  ReturnType<typeof createThemeSlice>;

const useStoreBase = create<StoreState>()((...a) => ({
  ...createSnackbarSlice(...a),
  ...createThemeSlice(...a),
}));

const useStore = <T>(selector: (state: StoreState) => T) => {
  return useStoreBase(selector, shallow);
};

export default useStore;
