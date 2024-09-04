"use client";

import { Slider } from "@/components/ui/slider";
import { useAudio } from "./AudioProvider";
import { throttle, formatTime } from "@/lib/utils";
import { useEffect, useState } from "react";

const MusicProcess = () => {
  const { currentTime, duration, audioRef } = useAudio();
  const [process, setProcess] = useState(0);

  useEffect(() => {
    setProcess((currentTime / duration) * 100);
  }, [currentTime, duration]);

  const handleValueChange = (value: number[]) => {
    setProcess(value[0]);
  };

  const handleValueCommit = throttle((value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (value[0] / 100) * duration;
    }
  }, 100);

  return (
    <div className="lg:flex items-center hidden">
      <span className="w-10 grow">{formatTime(currentTime)}</span>
      <Slider
        className="flex-auto ml-3 mr-1"
        value={[process]}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
      />
      <span className="w-10 grow">{formatTime(duration)}</span>
    </div>
  );
};

export default MusicProcess;
