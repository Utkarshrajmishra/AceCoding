import { create } from "zustand";

interface UserState {
  isLogin: boolean,
  changeAuthState: () => void,
}

export const useAuthStore = create<UserState>((set) => ({
  isLogin: false,
  changeAuthState: () => set((state) => ({ isLogin: !state.isLogin })),
}));
