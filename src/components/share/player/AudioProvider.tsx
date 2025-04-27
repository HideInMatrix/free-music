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
  setMusicStatus: React.Dispatch<React.SetStateAction<boolean>>; // 显式定义参数类型和返回类型
  handleMusicStatus: (value: boolean) => void; // 如果没有参数且没有返回值，可以这样定义
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
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
    if (value) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, []);
  useEffect(() => {
    const currentAudioRef = audioRef.current; // 将 audioRef.current 保存为一个变量
    if (currentAudioRef) {
      currentAudioRef.src = defaultSong.url;
    }

    // console.log("MusicProcess render useEffect");
    const timeupdate = throttle(() => {
      if (currentAudioRef) {
        setCurrentTime(currentAudioRef.currentTime);
      }
    }, 200);

    if (currentAudioRef) {
      currentAudioRef.ontimeupdate = timeupdate;
      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
          if (musicStatus) {
            handleMusicStatus(true);
          }
        }
      };
      currentAudioRef.oncanplaythrough = () => {
        // 缓存可以播放的时候播放
        if (currentAudioRef) {
          setDuration(currentAudioRef.duration);
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
      if (currentAudioRef) {
        currentAudioRef.oncanplaythrough = null;
        currentAudioRef.ontimeupdate = null;
        // audioRef.current.onloadedmetadata = null;
        // audioRef.current.onstalled = null;
        // audioRef.current.onwaiting = null;
      }
    };
  }, [defaultSong?.url, musicStatus, handleMusicStatus]);

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
