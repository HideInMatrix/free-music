"use client";

import { ListMusic } from "lucide-react";

import MusicMode from "./MusicMode";
import MusicPlayAction from "./MusicPlayAction";
import { AudioProvider } from "./AudioProvider";
import AudioVolume from "./AudioVolume";
import MusicList from "./MusicList";
import MusicInfo from "./MusicInfo";
import { Suspense } from "react";

const Player = () => {
  return (
    <AudioProvider>
      <div className="items-center justify-start flex player px-4 py-2 mg:py-0 mg:px-2 shadow-lg border-t sticky bottom-0 bg-white">
        <Suspense>
          <MusicInfo />
        </Suspense>
        <MusicPlayAction></MusicPlayAction>

        <div className="flex-1 px-[6px] justify-evenly flex gap-1">
          <MusicMode />
          <AudioVolume />
          <MusicList>
            <ListMusic />
          </MusicList>
        </div>
      </div>
    </AudioProvider>
  );
};

export default Player;
