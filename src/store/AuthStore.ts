import { create } from "zustand";

interface UserState {
  isLoging: boolean;
  changeAuthState: () => void;
}

export const useAuthStore = create<UserState>((set) => ({
  isLoging: false,
  changeAuthState: () => set((state) => ({ isLoging: !state.isLoging })),
}));
