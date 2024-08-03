import { Song } from "@/entity/interface/song";
import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";

export type SongState = {
  defaultSong: Song;
};

export type SongAction = {
  setCurrentSong: (newVal: Song) => void;
};

export type SongStore = SongAction & SongState;

export const defaultInitSong: SongState = {
  defaultSong: {
    id: "1",
    name: "珊瑚海",
    artist: [],
    url: "https://aac.saavncdn.com/392/def9f6eb56e99c7619d9d46a62ef8b4e_320.mp4",
  },
};

export const createSongStore = (initState: SongState = defaultInitSong) => {
  return createStore<SongStore>()((set) => ({
    ...initState,
    setCurrentSong: (newVal) => {
      set((state) => ({ defaultSong: (state.defaultSong = newVal) }));
    },
  }));
};
