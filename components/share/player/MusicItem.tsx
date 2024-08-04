"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CloudDownload, Ellipsis, Files, Play, Trash } from "lucide-react";
import { Song } from "@/entity/interface/song";
import { useSongStore } from "@/store/songStoreProvider";
import { cn } from "@/lib/utils";
import { useAudio } from "./AudioProvider";
type Props = {
  onDeleted: Function;
  songInfo: Song;
};

const MusicItem = ({ onDeleted, songInfo }: Props) => {
  const { defaultSong, setCurrentSong } = useSongStore();
  return (
    <div
      onClick={() => setCurrentSong(songInfo)}
      className={cn(
        "flex px-2 items-center p-1 rounded-md",
        defaultSong.id == songInfo.id ? "bg-blue-500" : ""
      )}>
      <div className="w-8 h-8">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="overflow-hidden ml-2 flex-auto">
        <h1 className="text-sm">{songInfo.name}</h1>
        <span className="text-xs">
          {songInfo.artist.map((item) => item.name).join("-")}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Ellipsis className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setCurrentSong(songInfo)}>
              <div className="flex items-center">
                <Play strokeWidth={1} className="w-4 h-4 mr-1" />
                播放
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDeleted()}>
              <div className="flex items-center">
                <Trash strokeWidth={1} className="w-4 h-4 mr-1" />
                删除
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <div className="flex items-center">
                <Files strokeWidth={1} className="w-4 h-4 mr-1" />
                复制歌名
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center">
                <CloudDownload strokeWidth={1} className="w-4 h-4 mr-1" />
                下载
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MusicItem;
