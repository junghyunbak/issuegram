import { create } from "zustand";

import { createSnackbarSlice } from "./slices/snackbar";

export type StoreState = ReturnType<typeof createSnackbarSlice>;

const useStore = create<StoreState>()((...a) => ({
  ...createSnackbarSlice(...a),
}));

export default useStore;
