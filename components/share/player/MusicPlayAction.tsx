"use client";
import { StepBack, StepForward } from "lucide-react";

import MusicStatus from "./MusicStatus";
import MusicProcess from "./MusicProcess";
import { useSongStore } from "@/store/songStoreProvider";

const MusicPlayAction = () => {
  // console.log("MusicPlayAction render");
  const {defaultSong} = useSongStore();

  const handleChangeSong = (type:string)=>{

  }

  return (
    <div className="flex flex-col flex-[0_0_37.5%] w-[37.5%] lg:flex-auto px-[6px] h-full justify-evenly">
      <div className="flex items-center justify-center">
        <StepBack strokeWidth={1} className="w-9 h-9" />
        <MusicStatus />
        <StepForward strokeWidth={1} className="w-9 h-9" />
      </div>
      <MusicProcess />
    </div>
  );
};

export default MusicPlayAction;
