import { Slider } from "@/components/ui/slider";
import { useAudio } from "./AudioProvider";
import { formatTime } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";

const MusicProcess = () => {
  const { currentTime, duration, audioRef } = useAudio();
  const [process, setProcess] = useState(0);

  const userSetTimeRef = useRef<number | null>(null);


  useEffect(() => {
    if ((!userSetTimeRef.current || Math.abs(currentTime - userSetTimeRef.current) > 1)) {      
      setProcess((currentTime / duration) * 100);
      userSetTimeRef.current = null;
    }
  }, [currentTime, duration]);

  const handleValueChange = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {      
      audio.currentTime = value[0] * (duration / 100);
      setProcess(value[0]);
    }
  };

  return (
    <>
      {/* 桌面端进度条 */}
      <div className="lg:flex items-center hidden">
        <span className="w-10">{formatTime(currentTime)}</span>
        <div className="flex-auto ml-3 mr-1 relative">
          {/* 缓冲进度条 */}
          <Slider
            className=""
            value={[process]}
            onValueChange={handleValueChange}
            step={0.1}
            max={100}
          />
        </div>
        <span className="w-10">{formatTime(duration)}</span>
      </div>
    </>
  );
};

export default MusicProcess;
