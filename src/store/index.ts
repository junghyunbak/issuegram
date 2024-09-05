import { create } from "zustand";
import { shallow } from "zustand/shallow";

import { createSnackbarSlice } from "./slices/snackbar";

export type StoreState = ReturnType<typeof createSnackbarSlice>;

const useStoreBase = create<StoreState>()((...a) => ({
  ...createSnackbarSlice(...a),
}));

const useStore = <T>(selector: (state: StoreState) => T) => {
  return useStoreBase(selector, shallow);
};

export default useStore;
