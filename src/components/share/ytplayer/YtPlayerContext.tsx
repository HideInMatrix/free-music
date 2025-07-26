import { createContext, useContext } from 'react';

interface YtPlayerContextType {
  src: string;
  playing: boolean;
  volume: number;
  muted: boolean;
  loop: boolean;
  pip: boolean;
  controls: boolean;
  handlePlayPause: () => void;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMute: () => void;
  handleSkipBack: () => void;
  handleSkipForward: () => void;
}

export const YtPlayerContext = createContext<YtPlayerContextType | undefined>(undefined);

export const useYtPlayer = () => {
  const context = useContext(YtPlayerContext);
  if (!context) {
    throw new Error('useYtPlayer must be used within a YtPlayerProvider');
  }
  return context;
};