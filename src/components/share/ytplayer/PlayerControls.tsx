import { Play, Pause, Volume2, Volume1, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { useYtPlayer } from './YtPlayerContext';

export const PlayerControls = () => {
  const {
    playing,
    volume,
    muted,
    handlePlayPause,
    handleVolumeChange,
    handleMute,
    handleSkipBack,
    handleSkipForward,
  } = useYtPlayer();

  return (
    <div className="player-wrapper">
      {/* Control Panel */}
      <div className="control-panel">
        <button onClick={handleSkipBack}><SkipBack /></button>
        <button onClick={handlePlayPause}>{playing ? <Pause /> : <Play />}</button>
        <button onClick={handleSkipForward}><SkipForward /></button>
      </div>

      {/* Volume Control */}
      <div className="volume-control">
        <button onClick={handleMute}>
          {muted ? <VolumeX /> : volume > 0.5 ? <Volume2 /> : <Volume1 />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};