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
    id: "_omffwy9",
    name: "Take Me Hand",
    artists: [
      {
        id: "1020286",
        name: "Daishi Dance",
        image: [
          "https://c.saavncdn.com/590/Don-t-Leave-Without-Me-English-2012-500x500.jpg",
        ],
      },
    ],
    duration: 259,
    album: {
      id: "19507542",
      name: "Take Me Hand",
    },
    url: "https://aac.saavncdn.com/905/cd9e9025f87d15120cac77986afc7f3c_320.mp4",
    image:
      "https://c.saavncdn.com/905/Take-Me-Hands-English-2020-20200505122820-500x500.jpg",
  },
  defaultSongList: [
    {
      id: "_omffwy9",
      name: "Take Me Hand",
      artists: [
        {
          id: "1020286",
          name: "Daishi Dance",
          image: [
            "https://c.saavncdn.com/590/Don-t-Leave-Without-Me-English-2012-500x500.jpg",
          ],
        },
      ],
      duration: 259,
      album: {
        id: "19507542",
        name: "Take Me Hand",
      },
      url: "https://aac.saavncdn.com/905/cd9e9025f87d15120cac77986afc7f3c_320.mp4",
      image:
        "https://c.saavncdn.com/905/Take-Me-Hands-English-2020-20200505122820-500x500.jpg",
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
        set((state: SongState) => ({
          defaultSong: (state.defaultSong = newVal),
        })),
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
