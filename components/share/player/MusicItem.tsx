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
import { useSongStore } from "@/store/useSongStore";
import { cn } from "@/lib/utils";
import { useAudio } from "./AudioProvider";
import { useCallback } from "react";
type Props = {
  songInfo: Song;
};

const MusicItem = ({ songInfo }: Props) => {
  const { defaultSong, setCurrentSong, defaultSongList, setSongList } =
    useSongStore();
  const handleDeleteSong = useCallback(() => {
    console.log("delete render");

    // 找到要删除的歌曲在列表中的索引
    const index = defaultSongList.findIndex((item) => item.id === songInfo.id);

    // 如果找到了歌曲
    if (index > -1) {
      // 先更新歌曲列表
      const updatedSongList = [
        ...defaultSongList.slice(0, index),
        ...defaultSongList.slice(index + 1),
      ];
      setSongList(updatedSongList);

      // 如果删除的是当前播放的歌曲，选择新的歌曲来播放
      if (defaultSong.id === songInfo.id) {
        if (updatedSongList.length > 0) {
          // 如果更新后的列表不为空，设置当前歌曲为新的列表的第一个歌曲
          setCurrentSong(updatedSongList[0]);
        } else {
          // 如果列表为空，可以考虑清空当前播放的歌曲
          setCurrentSong(null);
        }
      }
    }
  }, []);
  const handleClick = useCallback(() => {
    if (defaultSong.id !== songInfo.id) {
      setCurrentSong(songInfo);
    }
  }, [defaultSong]);
  return (
    <div
      onClick={handleClick}
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
          {songInfo.artists?.map((item) => item.name).join("-")}
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
            <DropdownMenuItem onClick={handleClick}>
              <div className="flex items-center">
                <Play strokeWidth={1} className="w-4 h-4 mr-1" />
                播放
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteSong}>
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
            {/* <DropdownMenuItem>
              <div className="flex items-center">
                <CloudDownload strokeWidth={1} className="w-4 h-4 mr-1" />
                下载
              </div>
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MusicItem;
