"use client";
import { Slider } from "@/components/ui/slider";
import { Volume2 } from "lucide-react";
import { useAudio } from "./AudioProvider";
import { throttle } from "@/lib/utils";
type Props = {};

const AudioVolume = (props: Props) => {
  const { audioRef } = useAudio();

  const handleValueCommit = throttle((value: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  }, 100);
  return (
    <div className="flex">
      <Volume2 className="mr-1" />
      <Slider
        defaultValue={[30]}
        step={1}
        max={100}
        className="w-[70px]"
        onValueChange={handleValueCommit}
      />
    </div>
  );
};

export default AudioVolume;
