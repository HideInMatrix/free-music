"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Song } from "@/entity/interface/song";
import { useSongStore } from "@/store/useSongStore";
import { cn } from "@/lib/utils";
import MusicDropAction from "./MusicDropAction";
import { useAudio } from "./AudioProvider";

type Props = {
  songInfo: Song;
};

const MusicItem = ({ songInfo }: Props) => {
  const { defaultSong, setCurrentSong } = useSongStore();
  const handleClick = () => {
    if (defaultSong.id !== songInfo.id) {
      setCurrentSong(songInfo);
    }
  };
  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex px-2 items-center p-1 rounded-md",
        defaultSong.id == songInfo.id ? "bg-blue-500" : ""
      )}>
      <div className="w-8 h-8">
        <Avatar className="w-8 h-8">
          <AvatarImage src={songInfo.image} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="overflow-hidden ml-2 flex-auto">
        <h1 className="text-sm">{songInfo.name}</h1>
        <span className="text-xs">
          {songInfo.artists?.map((item) => item.name).join("-")}
        </span>
      </div>
      <MusicDropAction songInfo={songInfo}></MusicDropAction>
    </div>
  );
};

export default MusicItem;
