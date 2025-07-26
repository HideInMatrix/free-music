import { useState, useEffect, useCallback } from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  bufferedTime: number;
  onSeek?: (time: number) => void;
}

const ProgressBar = ({ 
  currentTime, 
  duration, 
  bufferedTime,
  onSeek 
}: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const [bufferedProgress, setBufferedProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);

  // 更新播放进度
  useEffect(() => {
    if (duration > 0 && !isDragging) {
      setProgress((currentTime / duration) * 100);
    }
  }, [currentTime, duration, isDragging]);

  // 更新缓存进度
  useEffect(() => {
    if (duration > 0) {
      setBufferedProgress((bufferedTime / duration) * 100);
    }
  }, [bufferedTime, duration]);

  // 处理拖动开始
  const handleDragStart = () => {
    setIsDragging(true);
  };

  // 处理拖动过程
  const handleDrag = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    
    setDragProgress(percentage);
    setProgress(percentage);
  }, [isDragging]);

  // 处理拖动结束
  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    if (onSeek) {
      const newTime = (dragProgress / 100) * duration;
      onSeek(newTime);
    }
  };

  // 处理点击跳转
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = (x / width) * 100;
    
    if (onSeek) {
      const newTime = (percentage / 100) * duration;
      onSeek(newTime);
    }
  };

  return (
    <div 
      className="relative w-full h-1.5 group bg-gray-200/50 rounded-full cursor-pointer"
      onClick={handleClick}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {/* 缓存进度条 */}
      <div
        style={{
          width: `${bufferedProgress}%`,
        }}
        className="absolute top-0 left-0 h-full bg-white/20 rounded-full transition-all"
      />

      {/* 播放进度条 */}
      <div
        style={{
          width: `${progress}%`,
        }}
        className="absolute top-0 left-0 h-full bg-cyan-500 rounded-full transition-all"
      >
        {/* 进度条拖动按钮 */}
        <div 
          className={`absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 
            w-3 h-3 bg-white rounded-full shadow-md 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-200
            ${isDragging ? 'opacity-100 scale-110' : ''}
          `}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
