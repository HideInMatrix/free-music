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
      audioRef.current?.play().catch(err => {
        console.error("播放失败:", err);
        setMusicStatus(false);
      });
    } else {
      audioRef.current?.pause();
    }
  }, []);
  
  useEffect(() => {
    const currentAudioRef = audioRef.current; // 将 audioRef.current 保存为一个变量
    if (currentAudioRef) {
      // 设置跨域属性，解决某些iOS跨域问题
      currentAudioRef.crossOrigin = "anonymous";
      // 设置预加载模式为metadata，减少iOS上的加载问题
      currentAudioRef.preload = "metadata";
      // 然后设置新的源
      currentAudioRef.src = defaultSong.url;
      
    }

    // console.log("MusicProcess render useEffect");
    const timeupdate = () => {
      if (currentAudioRef) {
        setCurrentTime(currentAudioRef.currentTime);
        
        // 添加额外的结束检测逻辑
        // 当播放进度非常接近结尾时（小于0.5秒），主动触发结束事件
        if (currentAudioRef.duration > 0 && 
            currentAudioRef.currentTime > 0 && 
            currentAudioRef.duration - currentAudioRef.currentTime < 0.5) {
          // 确保音频确实已经播放了大部分内容（至少90%）
          if (currentAudioRef.currentTime / currentAudioRef.duration > 0.9) {
            // 手动触发ended事件
            const endEvent = new Event('ended');
            currentAudioRef.dispatchEvent(endEvent);
          }
        }
      }
    };

    if (currentAudioRef) {
      currentAudioRef.ontimeupdate = timeupdate;
      
      // 确保onended事件处理程序被正确设置
      // currentAudioRef.onended = (_event) => {
      //   // 触发MusicMode组件中的onended处理逻辑
      //   // 这里不需要实现具体逻辑，因为MusicMode组件已经处理了
      //   console.log("音频播放结束");
      // };
      
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

      // 添加错误处理
      currentAudioRef.onerror = (_e) => {
        console.error("音频加载错误:", _e);
        // 可以在这里添加错误处理逻辑
      };

      //音频播放时缓冲不够而暂停时触发
      currentAudioRef.onwaiting = () => {
        console.log("音频缓冲中");
      };

      // 处理数据获取停止的情况，重试加载
      currentAudioRef.onstalled = () => {
        console.log("数据获取停止");
        // // 尝试重新加载
        // if (currentAudioRef.networkState === 2) { // NETWORK_LOADING
        //   currentAudioRef.load();
        // }
      };
    }

    return () => {
      if (currentAudioRef) {
        currentAudioRef.oncanplaythrough = null;
        currentAudioRef.ontimeupdate = null;
        currentAudioRef.onended = null;
        currentAudioRef.onerror = null;
        currentAudioRef.onwaiting = null;
        currentAudioRef.onstalled = null;
      }
    };
  }, [defaultSong?.url, handleMusicStatus]);

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
