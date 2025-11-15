import { create } from "zustand";

interface UserStore {
  accessToken: string | null;
  telegramId: number | null;
  role: string | null;
  setAccessToken: (token: string) => void;
  setTelegramId: (id: number) => void;
  setRole: (role: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  accessToken: null,
  telegramId: null,
  role: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setTelegramId: (id) => set({ telegramId: id }),
  setRole: (role) => set({ role }),
}));
