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
type Props = {};

const MusicItem = (props: Props) => {
  return (
    <div className="flex px-2 items-center">
      <div className="w-8 h-8">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="overflow-hidden ml-2 flex-auto">
        <h1 className="text-sm">珊瑚海</h1>
        <span className="text-xs">周杰伦</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Ellipsis className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <div className="flex items-center">
                <Play strokeWidth={1} className="w-4 h-4 mr-1" />
                播放
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
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
