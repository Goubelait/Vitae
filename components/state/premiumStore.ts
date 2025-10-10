import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PremiumState = {
  isPremium: boolean;
  setPremium: (value: boolean) => void;
};

export const usePremium = create<PremiumState>()(
  persist(
    (set) => ({
      isPremium: false,
      setPremium: (value) => set({ isPremium: value }),
    }),
    {
      name: "premium-status",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
