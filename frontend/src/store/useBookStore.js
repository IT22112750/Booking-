import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  selectedBook: null,
};

const store = (set) => ({
  ...initialState,
  setSelectedBook: (book) => set({ selectedBook: book }),
});

export const useBookStore = create(devtools(store, "bookStore"));
