import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CloudDownload, Ellipsis, ExternalLink, Files, Play, Trash } from "lucide-react";
import { Song } from "@/entity/interface/song";
import { useSongStore } from "@/store/useSongStore";
import StopPropagation from "../StopPropagation";
import MusicDropActionFn from "@/components/share/player/MusicDropActionFn";
import MusicSharePanel from "./MusicSharePanel";
import { useState } from "react";

type Props = {
  songInfo: Song;
};

const MusicDropAction = ({ songInfo }: Props) => {
  const { defaultSongList } = useSongStore();
  const { updateSongListFn, handleDownload, copyMusicName } = MusicDropActionFn(
    { songInfo }
  );
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleShareClick = () => {
    setIsShareOpen(true);
  };

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Ellipsis className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <StopPropagation>
            <DropdownMenuItem onClick={() => updateSongListFn({ type: "add" })}>
              <div className="flex items-center">
                <Play strokeWidth={1} className="w-4 h-4 mr-1" />
                播放
              </div>
            </DropdownMenuItem>
          </StopPropagation>

          {defaultSongList.some((song) => song.id === songInfo.id) ? (
            <StopPropagation>
              <DropdownMenuItem
                onClick={() => updateSongListFn({ type: "del" })}>
                <div className="flex items-center">
                  <Trash strokeWidth={1} className="w-4 h-4 mr-1" />
                  删除
                </div>
              </DropdownMenuItem>
            </StopPropagation>
          ) : (
            <></>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <StopPropagation>
            <DropdownMenuItem onClick={copyMusicName}>
              <div className="flex items-center">
                <Files strokeWidth={1} className="w-4 h-4 mr-1" />
                复制歌名
              </div>
            </DropdownMenuItem>
          </StopPropagation>
          <StopPropagation>
            <DropdownMenuItem onClick={handleDownload}>
              <div className="flex items-center">
                <CloudDownload strokeWidth={1} className="w-4 h-4 mr-1" />
                下载
              </div>
            </DropdownMenuItem>
          </StopPropagation>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <StopPropagation>
            <DropdownMenuItem onClick={handleShareClick}>
              <div className="flex items-center">
                <ExternalLink strokeWidth={1} className="w-4 h-4 mr-1" />
                分享歌曲
              </div>
            </DropdownMenuItem>
          </StopPropagation> 
      </DropdownMenuContent>
    </DropdownMenu>
    
    <MusicSharePanel 
      isOpen={isShareOpen} 
      onOpenChange={setIsShareOpen} 
      songInfo={songInfo} 
    />
    </>
  );
};

export default MusicDropAction;
