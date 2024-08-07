"use client";

import { ListMusic } from "lucide-react";

import MusicMode from "./MusicMode";
import MusicPlayAction from "./MusicPlayAction";
import { AudioProvider } from "./AudioProvider";
import AudioVolume from "./AudioVolume";
import MusicList from "./MusicList";
import MusicInfo from "./MusicInfo";

type Props = {};

const Player = (props: Props) => {
  return (
    <AudioProvider>
      <div className="items-center justify-start flex player h-24 px-4 mg:px-2 shadow-lg border-t">
        <MusicInfo />
        <MusicPlayAction></MusicPlayAction>

        <div className="flex-1 px-[6px] justify-evenly flex">
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
