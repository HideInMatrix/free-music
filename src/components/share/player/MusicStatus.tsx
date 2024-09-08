"use client";
import { Pause, Play } from "lucide-react";
import { useAudio } from "./AudioProvider";
import StopPropagation from "../StopPropagation";

const MusicStatus = () => {
  // console.log("music status render");
  const { musicStatus, handleMusicStatus } = useAudio();

  return (
    <StopPropagation
      onClick={() => {
        handleMusicStatus(!musicStatus);
      }}>
      {musicStatus ? (
        <Pause strokeWidth={1} className="w-9 h-9" />
      ) : (
        <Play strokeWidth={1} className="w-9 h-9" />
      )}
    </StopPropagation>
  );
};

export default MusicStatus;
