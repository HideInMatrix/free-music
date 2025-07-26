import { Slider } from "@/components/ui/slider";
import { useAudio } from "./AudioProvider";
import { formatTime } from "@/lib/utils";
import { useEffect, useState } from "react";

const MusicProcess = () => {
  const { currentTime, duration, audioRef } = useAudio();
  const [process, setProcess] = useState(0);
  // const [budderedPercent, setBudderedPercent] = useState(0);

  useEffect(() => {
    if (currentTime > 1) {
      setProcess((currentTime / duration) * 100);
    }
  }, [currentTime, duration]);

  const handleValueChange = (value: number[]) => {
    if(!audioRef.current){
      return;
    }
    const newTime = (value[0] / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProcess(value[0]); 
  };

  return (
    <>
      <div className="lg:flex items-center hidden">
        <span className="w-10">{formatTime(currentTime)}</span>
        <div className="flex-auto ml-3 mr-1 relative">
          <Slider
            className="relative z-10"
            value={[process]}
            onValueChange={handleValueChange}
            step={0.1}
            max={100}
          />
          {/* <ProgressBar
            currentTime={currentTime}
            duration={duration}
            bufferedTime={buffered}
          /> */}
        </div>
        <span className="w-10">{formatTime(duration)}</span>
      </div>
    </>
  );
};

export default MusicProcess;
