import { Button } from "@/components/ui/button";
import { useSongStore } from "@/store/useSongStore";
import MusicMode from "./MusicMode";

const MusicListInfo = () => {
  const { defaultSongList } = useSongStore();
  return (
    <div className="flex items-center">
      <span>共{defaultSongList.length}首</span>
      <MusicMode className="md:hidden block ml-auto"></MusicMode>
      <Button variant="ghost" size="icon" className="ml-1 w-min">
        清空列表
      </Button>
    </div>
  );
};

export default MusicListInfo;
