"use client";
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

type Props = {
  songInfo: Song;
};

const MusicDropAction = ({ songInfo }: Props) => {
  const { defaultSong, setCurrentSong, defaultSongList, setSongList } =
    useSongStore();

  const updateSongListFn = ({ type }: { type: "add" | "del" }) => {
    const index = defaultSongList.findIndex((item) => item.id === songInfo.id);
    // 如果找到了歌曲

    if ((type = "del") && index > -1) {
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
    } else if ((type = "add") && index == -1) {
      const updatedSongList = [
        ...defaultSongList.slice(0, index),
        songInfo,
        ...defaultSongList.slice(index + 1),
      ];
      setSongList(updatedSongList);
      if (defaultSong.id !== songInfo.id) {
        setCurrentSong(songInfo);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Ellipsis className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => updateSongListFn({ type: "add" })}>
            <div className="flex items-center">
              <Play strokeWidth={1} className="w-4 h-4 mr-1" />
              播放
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateSongListFn({ type: "del" })}>
            <div className="flex items-center">
              <Trash strokeWidth={1} className="w-4 h-4 mr-1" />
              删除
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div
              className="flex items-center"
              onClick={() => navigator.clipboard.writeText(songInfo.name)}>
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
  );
};

export default MusicDropAction;
