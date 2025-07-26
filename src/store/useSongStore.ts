import { AudioMode } from "@/entity/enum";
import { Song } from "@/entity/interface/song";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// import { createStore } from "zustand/vanilla";

export type SongState = {
  defaultSong: Song | null;
  defaultSongList: Song[];
  defaultMode: AudioMode;
};

export type SongAction = {
  setCurrentSong: (newVal: Song | null) => void;
  setSongList: (newVal: Song[]) => void;
  setMusicMode: (newVal: AudioMode) => void;
};

export type SongStore = SongAction & SongState;

export const defaultInitSong: SongState = {
  defaultSong: null,
  defaultSongList: [],
  defaultMode: AudioMode.ORDER,
};

export const useSongStore = create<SongStore>()(
  persist(
    (set, get) => ({
      defaultSong: get()?.defaultSong
        ? get().defaultSong
        : defaultInitSong.defaultSong,
      setCurrentSong: (newVal: Song | null) =>
        set((state: SongState) => ({
          defaultSong: (state.defaultSong = newVal as Song),
        })),

      defaultSongList: get()?.defaultSongList
        ? get().defaultSongList
        : defaultInitSong.defaultSongList,
      setSongList: (newVal: Song[]) =>
        set((state: SongState) => ({
          defaultSongList: (state.defaultSongList = newVal),
        })),

      defaultMode: get()?.defaultMode ? get().defaultMode : AudioMode.ORDER,
      setMusicMode: (newVal: AudioMode) =>
        set((state: SongState) => ({
          defaultMode: (state.defaultMode = newVal),
        })),
    }),
    {
      name: "song-info",
      storage: createJSONStorage(() => localStorage), // default localstorage
    }
  )
);
