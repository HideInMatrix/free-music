import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AccessesState = {
  token: string;
  setToken: (newVal: string) => void;
};

const useAccessStore = create<AccessesState>()(
  persist(
    (set, get) => ({
      token: get()?.token || "",
      setToken: (newVal: any) => set(() => ({ token: newVal })),
    }),
    {
      name: "token",
      storage: createJSONStorage(() => localStorage), // default localstorage
    }
  )
);

export default useAccessStore;
