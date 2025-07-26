import React, { useEffect, ReactNode } from 'react';
import ReactPlayer from 'react-player';
import { usePlayerStore } from '@/store/playerStore';
import { YtPlayerContext } from './YtPlayerContext';
import { useSongStore } from '@/store/useSongStore';

interface Props {
  children: ReactNode;
}

export const YtPlayerProvider = ({ children }: Props) => {
  const { defaultSong } = useSongStore();
  const {
    src,
    playing,
    volume,
    muted,
    loop,
    pip,
    controls,
    setPlaying,
    setVolume,
    setMuted,
    setSrc,
    setLoop,
    setPip,
    setControls,
    setPlayed,
    setDuration,
  } = usePlayerStore((state) => state);

  const handlePlayPause = () => setPlaying(!playing);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  const handleMute = () => setMuted(!muted);

  const handleSkipBack = () => {
    // Logic to skip back, e.g., 10 seconds
  };

  const handleSkipForward = () => {
    // Logic to skip forward, e.g., 10 seconds
  };

  useEffect(() => {
    if (src) {
      handlePlayPause();
    }
  },[src])

  useEffect(() => {
    setPlaying(true)
  },[defaultSong.url])

  const value = {
    src,
    playing,
    volume,
    muted,
    loop,
    pip,
    controls,
    handlePlayPause,
    handleVolumeChange,
    handleMute,
    handleSkipBack,
    handleSkipForward,
  };

  return (
    <YtPlayerContext.Provider value={value}>
      <ReactPlayer
        style={{display:'none'}}
        src={defaultSong.url}
        playing={playing}
        volume={volume}
        muted={muted}
        controls={controls}
        loop={loop}
        pip={pip}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {children}
    </YtPlayerContext.Provider>
  );
};
