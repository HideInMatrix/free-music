import { Slider } from "@/components/ui/slider";
import { Volume2 } from "lucide-react";
import { useAudio } from "./AudioProvider";

const AudioVolume = () => {
  const { setVolume,volume } = useAudio();
  const defaultVolume = volume * 100;
  const handleValueCommit =(value: number[]) => {
    setVolume(value[0] / 100);
  };

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
