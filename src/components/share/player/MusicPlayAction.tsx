"use client";
import { StepBack, StepForward } from "lucide-react";

import MusicStatus from "./MusicStatus";
import MusicProcess from "./MusicProcess";
import { useSongStore } from "@/store/useSongStore";
import StopPropagation from "../StopPropagation";

const MusicPlayAction = () => {
  // console.log("MusicPlayAction render");
  const { setCurrentSong, defaultSong, defaultSongList } = useSongStore();

  const handlePreSong = () => {
    let index = defaultSongList.findIndex((item) => item.id == defaultSong.id);
    if (index > -1) {
      if (index === 0) {
        setCurrentSong(defaultSongList[defaultSongList.length - 1]);
      } else {
        setCurrentSong(defaultSongList[index - 1]);
      }
    }
  };

  const handleNexSong = () => {
    let index = defaultSongList.findIndex((item) => item.id == defaultSong.id);
    if (index > -1) {
      if (index === defaultSongList.length - 1) {
        setCurrentSong(defaultSongList[0]);
      } else {
        setCurrentSong(defaultSongList[index + 1]);
      }
    }
  };

  return (
    <div className="flex flex-col flex-[0_0_37.5%] w-[37.5%] lg:flex-auto px-[6px] h-full justify-evenly">
      <div className="flex items-center justify-center">
        <StopPropagation>
          <StepBack
            strokeWidth={1}
            className="w-9 h-9 lg:block hidden"
            onClick={handlePreSong}
          />
        </StopPropagation>
        <StopPropagation>
          <MusicStatus />
        </StopPropagation>
        <StopPropagation>
          <StepForward
            strokeWidth={1}
            className="w-9 h-9"
            onClick={handleNexSong}
          />
        </StopPropagation>
      </div>
      <MusicProcess />
    </div>
  );
};

export default MusicPlayAction;
