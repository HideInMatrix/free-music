"use client";

import { ListMusic } from "lucide-react";

import Image from "next/image";
import MusicMode from "./MusicMode";
import MusicPlayAction from "./MusicPlayAction";
import { AudioProvider } from "./AudioProvider";
import AudioVolume from "./AudioVolume";
import MusicList from "./MusicList";

type Props = {};

const Player = (props: Props) => {
  return (
    <AudioProvider musicSrc="https://aac.saavncdn.com/392/def9f6eb56e99c7619d9d46a62ef8b4e_96.mp4">
      <div className="items-center justify-start flex player h-24 px-4 mg:px-2 shadow-lg border-t">
        <div className="flex overflow-hidden flex-1">
          <div className="items-center max-w-full flex">
            <div className="arco-avatar arco-avatar-square arco-avatar-with-trigger-icon w-16 h-16 rounded-lg mr-4 flex-shrink-0">
              <Image
                src="https://img1.koowo.com/star/starheads/70/58/4/1354235485.jpg"
                alt="avatar"
                width={64}
                height={64}
                className="arco-avatar-image"></Image>
            </div>
            <div className="overflow-hidden flex flex-col">
              <div className="font-bold text-base">珊瑚海</div>
              <div className="text-sm mt-0.5">周杰伦</div>
            </div>
          </div>
          <div className="grow hidden lg:block h-1"></div>
        </div>
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
