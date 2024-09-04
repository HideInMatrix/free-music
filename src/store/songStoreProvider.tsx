// import { useStore } from "zustand";
// import { type SongStore, createSongStore } from "./useSongStore";
// import { createContext, ReactNode, useContext, useRef } from "react";

// export type SongStoreApi = ReturnType<typeof createSongStore>;
// export const SongStoreContext = createContext<SongStoreApi | undefined>(
//   undefined
// );
// export interface SongStoreProviderProps {
//   children: ReactNode;
// }

// export const SongStoreProvider = ({ children }: SongStoreProviderProps) => {
//   const storeRef = useRef<SongStoreApi>();
//   if (!storeRef.current) {
//     storeRef.current = createSongStore();
//   }
//   return (
//     <SongStoreContext.Provider value={storeRef.current}>
//       {children}
//     </SongStoreContext.Provider>
//   );
// };

// export const useSongStore = () => {
//   const songStoreContext = useContext(SongStoreContext);

//   if (!songStoreContext) {
//     throw new Error(`useCounterStore must be used within CounterStoreProvider`);
//   }

//   return useStore(songStoreContext, (state) => state);
// };
