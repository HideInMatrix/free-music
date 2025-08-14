import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MusicSourcePlugin, SourceCapability } from "@/entity/interface/source";

type SourceState = {
  plugins: MusicSourcePlugin[];
  activeSourceId: string | null;
};

type SourceAction = {
  setPlugins: (plugins: MusicSourcePlugin[]) => void;
  setActiveSourceId: (id: string) => void;
};

export type SourceStore = SourceState & SourceAction;

export const useSourceStore = create<SourceStore>()(
  persist(
    (set, get) => ({
      plugins: [],
      activeSourceId: null,
      setPlugins: (plugins: MusicSourcePlugin[]) => {
        const currentActive = get().activeSourceId;
        const exists = plugins.some((p) => p.manifest.id === currentActive);
        set({ plugins, activeSourceId: exists ? currentActive : plugins[0]?.manifest.id ?? null });
      },
      setActiveSourceId: (id: string) => set({ activeSourceId: id }),
    }),
    {
      name: "music-sources",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ activeSourceId: state.activeSourceId }),
    }
  )
);

export function getActivePlugin(): MusicSourcePlugin | null {
  const { plugins, activeSourceId } = useSourceStore.getState();
  return plugins.find((p) => p.manifest.id === activeSourceId) ?? null;
}

export function getPluginByCapability(capability: SourceCapability): MusicSourcePlugin | null {
  const { plugins, activeSourceId } = useSourceStore.getState();
  const active = plugins.find((p) => p.manifest.id === activeSourceId) ?? null;
  if (active && active.manifest.capabilities.includes(capability)) return active;
  return (
    plugins.find((p) => p.manifest.capabilities.includes(capability)) ?? null
  );
}


