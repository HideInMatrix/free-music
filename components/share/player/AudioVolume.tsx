"use client";
import { Slider } from "@/components/ui/slider";
import { Volume2 } from "lucide-react";
import { useAudio } from "./AudioProvider";
import { throttle } from "@/lib/utils";
import { useEffect } from "react";

const AudioVolume = () => {
  const { audioRef } = useAudio();
  const defaultVolume = 30;
  const handleValueCommit = throttle((value: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  }, 100);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = defaultVolume / 100;
    }
  }, []);
  return (
    <div className="lg:flex hidden">
      <Volume2 className="mr-1" />
      <Slider
        defaultValue={[defaultVolume]}
        step={1}
        max={100}
        className="w-[70px]"
        onValueChange={handleValueCommit}
      />
    </div>
  );
};

export default AudioVolume;
