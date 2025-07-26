// src/store.ts
import create from 'zustand';

type PlayerState = {
  src: string;
  playing: boolean;
  volume: number;
  muted: boolean;
  played: number;
  duration: number;
  loop: boolean;
  pip: boolean;
  controls: boolean;
  setPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  setSrc: (src: string) => void;
  setLoop: (loop: boolean) => void;
  setPip: (pip: boolean) => void;
  setControls: (controls: boolean) => void;
  setPlayed: (played: number) => void;
  setDuration: (duration: number) => void;
};

export const usePlayerStore = create<PlayerState>((set) => ({
  src: "",
  playing: false,
  volume: 1,
  muted: false,
  played: 0,
  duration: 0,
  loop: false,
  pip: false,
  controls: false,
  setPlaying: (playing) => set({ playing }),
  setVolume: (volume) => set({ volume }),
  setMuted: (muted) => set({ muted }),
  setSrc: (src) => set({ src }),
  setLoop: (loop) => set({ loop }),
  setPip: (pip) => set({ pip }),
  setControls: (controls) => set({ controls }),
  setPlayed: (played) => set({ played }),
  setDuration: (duration) => set({ duration }),
}));
