import { Slider } from "@/components/ui/slider";
import { useAudio } from "./AudioProvider";
import { formatTime } from "@/lib/utils";
import { useEffect, useState } from "react";

const MusicProcess = () => {
  const { currentTime, duration, audioRef } = useAudio();
  const [process, setProcess] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) {
      setProcess((currentTime / duration) * 100);
    }
  }, [currentTime, duration, isDragging]);

  const handleValueChange = (value: number[]) => {
    setIsDragging(true);
    setProcess(value[0]);
    
    // 在拖拽过程中也更新音频播放位置，实现实时预览
    if (audioRef.current) {
      audioRef.current.currentTime = (value[0] / 100) * duration;
    }
  };

  const handleValueCommit = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (value[0] / 100) * duration;
    }
    
    // 拖拽结束后短暂延时再允许外部更新进度条
    setTimeout(() => {
      setIsDragging(false);
    }, 300);
  };

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
