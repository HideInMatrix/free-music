"use client";

import { Slider } from "@/components/ui/slider";
import { useAudio } from "./AudioProvider";
import { useEffect, useState } from "react";
import { throttle } from "@/lib/utils";

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const MusicProcess = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { audioRef } = useAudio();
  useEffect(() => {
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
        }
      };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null;
        audioRef.current.onloadedmetadata = null;
      }
    };
  }, [audioRef.current?.src]);
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
