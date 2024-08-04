"use client";

import { Slider } from "@/components/ui/slider";
import { useAudio } from "./AudioProvider";

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const MusicProcess = () => {
  const { currentTime, duration } = useAudio();

  return (
    <div className="flex items-center">
      <span className="w-10  grow">{formatTime(currentTime)}</span>
      <Slider
        className="flex-auto ml-3 mr-1"
        value={[(currentTime / duration) * 100]}
      />

      <span className="w-10  grow">{formatTime(duration)}</span>
    </div>
  );
};

export default MusicProcess;
