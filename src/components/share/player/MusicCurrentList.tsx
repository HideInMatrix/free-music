import MusicItem from "./MusicItem";
import MusicListInfo from "./MusicListInfo";
import { useSongStore } from "@/store/useSongStore";

const MusicCurrentList = () => {
  let { defaultSongList } = useSongStore();

  return (
    <div className="h-full flex flex-col">
      <MusicListInfo />
      <div className="flex-auto overflow-y-auto no-scrollbar">
        {defaultSongList.map((item) => (
          <MusicItem songInfo={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default MusicCurrentList;
