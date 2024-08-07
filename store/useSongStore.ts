import { Song } from "@/entity/interface/song";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// import { createStore } from "zustand/vanilla";

export type SongState = {
  defaultSong: Song;
  defaultSongList: Song[];
};

export type SongAction = {
  setCurrentSong: (newVal: Song | null) => void;
  setSongList: (newVal: Song[]) => void;
};

export type SongStore = SongAction & SongState;

export const defaultInitSong: SongState = {
  defaultSong: {
    id: "3",
    name: "听妈妈的话",
    artists: [{ id: "1", name: "周杰伦", image: [] }],
    url: "https://aac.saavncdn.com/162/7b2023add5e2938c1ffe013302cf6658_160.mp4",
  },
  defaultSongList: [
    {
      id: "3",
      name: "听妈妈的话",
      artists: [{ id: "1", name: "周杰伦", image: [] }],
      url: "https://aac.saavncdn.com/162/7b2023add5e2938c1ffe013302cf6658_160.mp4",
    },
  ],
};

// export const createSongStore = (initState: SongState = defaultInitSong) => {
//   return createStore<SongStore>()(
//     persist(
//       (set) => ({
//         ...initState,
//         setCurrentSong: (newVal) => {
//           set((state) => ({ defaultSong: (state.defaultSong = newVal) }));
//         },
//         setSongList: (newVal) => {
//           set(() => ({ defaultSongList: [...newVal] }));
//         },
//       }),
//       {
//         name: "song-info",
//         storage: createJSONStorage(() => localStorage), // default localstorage
//       }
//     )
//   );
// };

export const useSongStore = create<SongStore>()(
  persist(
    (set, get) => ({
      defaultSong: get()?.defaultSong
        ? get().defaultSong
        : defaultInitSong.defaultSong,
      defaultSongList: get()?.defaultSongList
        ? get().defaultSongList
        : defaultInitSong.defaultSongList,
      setCurrentSong: (newVal: any) =>
        set((state: SongState) => {
          console.log("seh", newVal);

          return {
            defaultSong: (state.defaultSong = newVal),
          };
        }),
      setSongList: (newVal: any) =>
        set((state: SongState) => ({
          defaultSongList: (state.defaultSongList = newVal),
        })),
    }),
    {
      name: "song-info",
      storage: createJSONStorage(() => localStorage), // default localstorage
    }
  )
);
