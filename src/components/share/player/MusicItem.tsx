import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Song } from "@/entity/interface/song";
import { useSongStore } from "@/store/useSongStore";
import { cn } from "@/lib/utils";
import MusicDropAction from "./MusicDropAction";
import StopPropagation from "../StopPropagation";
import { HTMLProps, useEffect, useRef } from "react";

type Props = {
  songInfo: Song;
} & HTMLProps<HTMLDivElement>;

const MusicItem = ({ songInfo }: Props) => {
  const { defaultSong, setCurrentSong } = useSongStore();
  const musicItemRef = useRef(null);
  const handleClick = () => {
    if (defaultSong.id !== songInfo.id) {
      setCurrentSong(songInfo);
    }
  };
  useEffect(() => {
    if (defaultSong.id == songInfo.id) {
      const musicItemDom = musicItemRef.current
        ? (musicItemRef.current as HTMLDivElement)
        : null;
      musicItemDom?.scrollIntoView({
        behavior: "smooth", // Smooth scroll
        block: "center", // Align the item to the center})
      });
    }
  }, [musicItemRef, defaultSong, songInfo]);
  return (
    <div ref={musicItemRef}>
      <StopPropagation
        onClick={handleClick}
        className={cn(
          "flex px-2 items-center p-1 rounded-md",
          defaultSong.id == songInfo.id ? "bg-blue-500" : ""
        )}>
        <div className="w-8 h-8">
          <Avatar className="w-8 h-8">
            <AvatarImage src={songInfo.image} alt="song name" />
            <AvatarFallback className="truncate">
              {songInfo.name}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="overflow-hidden ml-2 flex-auto">
          <h1 className="text-sm">{songInfo.name}</h1>
          <span className="text-xs">
            {songInfo.artists?.map((item) => item.name).join("-")}
          </span>
        </div>
        <MusicDropAction songInfo={songInfo}></MusicDropAction>
      </StopPropagation>
    </div>
  );
};

export default MusicItem;
