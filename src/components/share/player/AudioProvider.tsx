import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactPlayer from 'react-player';

import { useSongStore } from "@/store/useSongStore";
import { usePlayerStore } from "@/store/playerStore";
import PlayerDrawer from './PlayerDrawer';


interface AudioContextProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  currentTime: number;
  duration: number;
  musicStatus: boolean;
  playing: boolean;
  volume: number;
  muted: boolean;
  loop: boolean;
  controls: boolean;
  buffered: number; // 添加缓冲进度状态
  isEnded: boolean; // 添加歌曲结束状态
  setIsOpen: (value: boolean) => void; // 显式定义参数类型
  setVolume: (value: number) => void; // 显式定义参数类型
  setMuted: (value: boolean) => void; // 显式定义参数类型
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

  // const audioRef = useRef<HTMLAudioElement>(new Audio());
  const audioRef = useRef<HTMLVideoElement | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [musicStatus, setMusicStatus] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [buffered, setBuffered] = useState(0); // 添加缓冲进度状态
  const [isOpen, setIsOpen] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const {
    loop,
    controls,
  } = usePlayerStore((state) => state);

  const handleMusicStatus = useCallback((value: boolean) => {
    setMusicStatus(value);
    if (value) {
      setPlaying(true);
      setIsEnded(false);
    } else {
      setPlaying(false);
    }
  }, []);

  const setPlayerRef = useCallback((player: HTMLVideoElement) => {
    if (!player) return;
    audioRef.current = player;
  }, []);

  const handleDurationChange = () => {
    const player = audioRef.current;
    if (!player) return;
    setDuration(player.duration);
  }

  const handleProgress = () => {
    const player = audioRef.current;
    if (!player || !player.buffered?.length) return;
    setBuffered(player.buffered?.end(player.buffered?.length - 1));
  };

  const handleTimeUpdate = () => {
    const player = audioRef.current;
    if (!player || !player.currentTime) return;
    setCurrentTime(player.currentTime);
  }

  const handleEnded = () => {
    setIsEnded(true)
  }

  const value = {
    playing,
    volume,
    muted,
    loop,
    controls,
    audioRef,
    currentTime,
    duration,
    musicStatus,
    buffered,
    isEnded,
    setIsOpen,
    setMusicStatus,
    handleMusicStatus,
    setVolume,
    setMuted,
  };

  useEffect(() => {
    setDuration(0);
    setCurrentTime(0);
  }, [defaultSong?.url])

  return (
    <AudioContext.Provider value={value}>
      <PlayerDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {defaultSong && (
          <ReactPlayer
            ref={setPlayerRef}
            style={{ width: '100%', height: '60vh' }}
            crossOrigin="anonymous"
            src={defaultSong.url}
            playing={playing}
            volume={volume}
            muted={muted}
            controls={controls}
            loop={loop}
            pip={true}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onDurationChange={handleDurationChange}
            onProgress={handleProgress}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
          />
        )}
      </PlayerDrawer>
      {children}
    </AudioContext.Provider>
  );
};
