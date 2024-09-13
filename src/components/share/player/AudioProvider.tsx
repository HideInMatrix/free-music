"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useSongStore } from "@/store/useSongStore";
import { throttle } from "@/lib/utils";

interface AudioContextProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  currentTime: number;
  duration: number;
  musicStatus: boolean;
  setMusicStatus: Function;
  handleMusicStatus: Function;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  // console.log("provider change");
  const { defaultSong } = useSongStore();

  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [musicStatus, setMusicStatus] = useState(false);

  const handleMusicStatus = useCallback((value: boolean) => {
    setMusicStatus(value);
    value ? audioRef.current?.play() : audioRef.current?.pause();
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = defaultSong.url;
    }

    // console.log("MusicProcess render useEffect");
    const timeupdate = throttle(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 200);

    if (audioRef.current) {
      audioRef.current.ontimeupdate = timeupdate;
      // audioRef.current.onloadedmetadata = () => {
      //   if (audioRef.current) {
      //     setDuration(audioRef.current.duration);
      //     if (musicStatus) {
      //       handleMusicStatus(true);
      //     }
      //   }
      // };
      audioRef.current.oncanplaythrough = () => {
        // 缓存可以播放的时候播放
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
          if (musicStatus) {
            handleMusicStatus(true);
          }
        }
      };

      //音频播放时缓冲不够而暂停时触发
      // audioRef.current.onwaiting = () => {
      //   console.log("涨停了");
      // };

      // 处理数据获取停止的情况，重试加载
      // audioRef.current.onstalled = () => {
      //   console.log("数据获取停止");
      // };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null;
        // audioRef.current.onloadedmetadata = null;
        audioRef.current.oncanplaythrough = null;
        // audioRef.current.onstalled = null;
        // audioRef.current.onwaiting = null;
      }
    };
  }, [defaultSong?.url, audioRef.current]);

  const value = {
    audioRef,

    currentTime,
    duration,
    musicStatus,
    setMusicStatus,
    handleMusicStatus,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};
