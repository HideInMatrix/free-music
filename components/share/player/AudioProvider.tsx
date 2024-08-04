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

import { useSongStore } from "@/store/songStoreProvider";
import { throttle } from "@/lib/utils";
import { AudioMode } from "@/entity/enum";

interface AudioContextProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  playMode: string;
  setPlayMode: Function;
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

const getRandomSong = (defaultSongList: any[], currentIndex: number) => {
  // 过滤掉当前正在播放的歌曲
  const filteredList = defaultSongList.filter(
    (_, index) => index !== currentIndex
  );

  if (filteredList.length === 0) {
    return null; // 如果过滤后的列表为空，返回 null
  }

  // 从过滤后的列表中随机选择一首歌
  const randomIndex = Math.floor(Math.random() * filteredList.length);
  return filteredList[randomIndex];
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  // console.log("provider change");
  const { defaultSong, defaultSongList, setCurrentSong } = useSongStore();

  const audioRef = useRef<HTMLAudioElement>(null);

  const [playMode, setPlayMode] = useState("order"); // random intro
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
    }, 1000);

    if (audioRef.current) {
      audioRef.current.ontimeupdate = timeupdate;
      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
          if (musicStatus) {
            handleMusicStatus(true);
          }
        }
      };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null;
        audioRef.current.onloadedmetadata = null;
      }
    };
  }, [defaultSong?.url]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        console.log("defaultSongList", defaultSongList);

        let index = defaultSongList.findIndex(
          (item) => item.id == defaultSong.id
        );
        if (playMode == AudioMode.CIRCULATION) {
          if (index !== -1) {
            index == defaultSongList.length
              ? setCurrentSong(defaultSongList[0])
              : setCurrentSong(defaultSongList[index + 1]);
          }
        } else if (playMode == AudioMode.ORDER) {
          if (index !== -1 && index <= defaultSongList.length - 1) {
            setCurrentSong(defaultSongList[index + 1]);
          } else {
            handleMusicStatus(false);
          }
        } else if (playMode === AudioMode.RANDOM) {
          const randomSong = getRandomSong(defaultSongList, index);
          setCurrentSong(randomSong);
        } else {
          handleMusicStatus(false);
        }
        console.log("index", index);
      };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.onended = null;
      }
    };
  }, [playMode, defaultSongList, defaultSong]);

  const value = {
    audioRef,
    playMode,
    setPlayMode,
    currentTime,
    duration,
    musicStatus,
    setMusicStatus,
    handleMusicStatus,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
      <audio className="hidden" ref={audioRef}></audio>
    </AudioContext.Provider>
  );
};
