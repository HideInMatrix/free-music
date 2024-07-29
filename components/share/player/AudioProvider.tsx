"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface AudioContextProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  playMode: string;
  setPlayMode: Function;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider = ({
  musicSrc,
  children,
}: {
  musicSrc: string;
  children: ReactNode;
}) => {
  // console.log("provider change");

  const audioRef = useRef<HTMLAudioElement>(null);

  const [playMode, setPlayMode] = useState("order"); // random intro

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = musicSrc;
    }
  }, [musicSrc]);

  const value = {
    audioRef,
    playMode,
    setPlayMode,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
      <audio className="hidden" ref={audioRef}></audio>
    </AudioContext.Provider>
  );
};
