import { create } from 'zustand';

export const usePageStore = create((set) => ({
  counter: {},
  loggedIn: false,
  setCounter: (state) => set({ counter: state }),
  setLoggedIn: (state) => set({ loggedIn: state }),
}));
