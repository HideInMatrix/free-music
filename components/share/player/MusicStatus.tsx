"use client";
import { Pause, Play } from "lucide-react";
import { useAudio } from "./AudioProvider";

const MusicStatus = () => {
  // console.log("music status render");
  const { musicStatus, handleMusicStatus } = useAudio();

  return (
    <div
      onClick={() => {
        handleMusicStatus(!musicStatus);
      }}>
      {musicStatus ? (
        <Pause strokeWidth={1} className="w-9 h-9" />
      ) : (
        <Play strokeWidth={1} className="w-9 h-9" />
      )}
    </div>
  );
};

export default MusicStatus;
